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

    // Get start and end of the requested day (or today)
    const targetDate = date ? new Date(date) : new Date()
    const startOfDay = new Date(targetDate)
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date(targetDate)
    endOfDay.setHours(23, 59, 59, 999)

    // Only get access logs for this specific app
    // Colonne reali nel DB (script 002 + 006):
    //   pi_uid      — identificativo Pi dell'utente (NON "user_id")
    //   username    — username Pi
    //   created_at  — timestamp inserimento
    //   logged_at   — alias di created_at aggiunto dallo script 006
    //   app_source  — separazione multi-app
    const { data, error } = await supabase
      .from("access_logs")
      .select("id, pi_uid, username, logged_at, app_source")
      .eq("app_source", APP_SOURCE)
      .gte("logged_at", startOfDay.toISOString())
      .lte("logged_at", endOfDay.toISOString())
      .order("logged_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: "Errore database: " + error.message }, { status: 500 })
    }

    // Espone "user_id" come alias di "pi_uid" per compatibilita' con i componenti frontend
    const logs = (data || []).map((log) => ({
      ...log,
      user_id: log.pi_uid,
    }))

    // Count unique users (basato su pi_uid)
    const uniqueUsers = new Set((data || []).map((log) => log.pi_uid))

    return NextResponse.json({
      logs,
      totalAccesses: logs.length,
      uniqueUsers: uniqueUsers.size,
      date: targetDate.toISOString().split("T")[0],
      app: APP_SOURCE,
    })
  } catch {
    return NextResponse.json({ error: "Errore del server" }, { status: 500 })
  }
}
