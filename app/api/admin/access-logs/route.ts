import { NextResponse } from "next/server"
import { getAdmin, APP_SOURCE, ADMIN_USERNAME } from "@/lib/supabase/admin"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const adminUsername = searchParams.get("adminUsername")
    const date = searchParams.get("date") // Format: YYYY-MM-DD

    if (adminUsername !== ADMIN_USERNAME) {
      return NextResponse.json({ error: "Non autorizzato" }, { status: 403 })
    }

    const supabase = getAdmin()

    // Costruisce range giornaliero come stringhe pure YYYY-MM-DD
    // per evitare problemi di timezone server vs client.
    // Supabase confronta TIMESTAMPTZ con stringhe ISO — usiamo T00:00:00 e T23:59:59
    // con offset +00:00 (UTC) cosi' copriamo l'intera giornata indipendentemente dal fuso.
    const targetDateStr = date || new Date().toISOString().split("T")[0]
    const startOfDay = `${targetDateStr}T00:00:00+00:00`
    const endOfDay   = `${targetDateStr}T23:59:59.999+00:00`

    // Strategia di query doppia:
    // Prima tenta con "logged_at" (script 006), poi fallback su "created_at" (script 002).
    // In questo modo funziona sia prima che dopo l'esecuzione dello script 006.
    let data: Array<{
      id: string
      pi_uid: string
      username: string
      logged_at: string | null
      created_at?: string | null
      app_source: string
    }> | null = null
    let usedColumn = "logged_at"

    const { data: d1, error: e1 } = await supabase
      .from("access_logs")
      .select("id, pi_uid, username, logged_at, app_source")
      .eq("app_source", APP_SOURCE)
      .gte("logged_at", startOfDay)
      .lte("logged_at", endOfDay)
      .order("logged_at", { ascending: false })

    if (e1) {
      // logged_at non esiste — fallback su created_at
      usedColumn = "created_at"
      const { data: d2, error: e2 } = await supabase
        .from("access_logs")
        .select("id, pi_uid, username, created_at, app_source")
        .eq("app_source", APP_SOURCE)
        .gte("created_at", startOfDay)
        .lte("created_at", endOfDay)
        .order("created_at", { ascending: false })

      if (e2) {
        return NextResponse.json({ error: "Errore database: " + e2.message }, { status: 500 })
      }
      data = (d2 || []).map((r) => ({ ...r, logged_at: r.created_at ?? null }))
    } else {
      // logged_at esiste ma alcuni record potrebbero avere logged_at NULL (inseriti prima dello script 006)
      // In quel caso eseguiamo una query aggiuntiva senza filtro data per i NULL e li includiamo se la data corrisponde a created_at
      data = d1 || []

      // Se ci sono pochi risultati, proviamo anche a recuperare record con logged_at NULL usando created_at
      const { data: nullData } = await supabase
        .from("access_logs")
        .select("id, pi_uid, username, created_at, app_source")
        .eq("app_source", APP_SOURCE)
        .is("logged_at", null)
        .gte("created_at", startOfDay)
        .lte("created_at", endOfDay)

      if (nullData && nullData.length > 0) {
        const normalized = nullData.map((r) => ({ ...r, logged_at: r.created_at ?? null }))
        data = [...data, ...normalized].sort((a, b) =>
          (b.logged_at || "") > (a.logged_at || "") ? 1 : -1
        )
      }
    }

    // Espone "user_id" come alias di "pi_uid" per compatibilita' con i componenti frontend
    const logs = data.map((log) => ({
      ...log,
      user_id: log.pi_uid,
      logged_at: log.logged_at || log.created_at || null,
    }))

    // Count unique users (basato su pi_uid)
    const uniqueUsers = new Set(data.map((log) => log.pi_uid))

    console.log("[v0] access-logs query:", { targetDateStr, usedColumn, count: logs.length })

    return NextResponse.json({
      logs,
      totalAccesses: logs.length,
      uniqueUsers: uniqueUsers.size,
      date: targetDateStr,
      app: APP_SOURCE,
    })
  } catch (err) {
    console.log("[v0] access-logs error:", err)
    return NextResponse.json({ error: "Errore del server" }, { status: 500 })
  }
}
