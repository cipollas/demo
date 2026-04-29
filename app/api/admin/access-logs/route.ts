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

    let query = supabase
      .from("access_logs")
      .select("id, user_id, username, logged_at, app_source")
      .eq("app_source", APP_SOURCE)
      .order("logged_at", { ascending: false })

    if (date) {
      // Fix timezone: usa date string diretta per evitare conversioni UTC errate
      // Es: date="2026-04-28" → filtra tra "2026-04-28T00:00:00" e "2026-04-28T23:59:59"
      query = query
        .gte("logged_at", `${date}T00:00:00.000Z`)
        .lte("logged_at", `${date}T23:59:59.999Z`)
    } else {
      // Senza data: mostra gli ultimi 100 accessi di tutti i giorni
      query = query.limit(100)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: "Errore database: " + error.message }, { status: 500 })
    }

    // Count unique users
    const uniqueUsers = new Set(data?.map(log => log.user_id) || [])

    return NextResponse.json({
      logs: data || [],
      totalAccesses: data?.length || 0,
      uniqueUsers: uniqueUsers.size,
      date: date || null,
      app: APP_SOURCE,
    })
  } catch {
    return NextResponse.json({ error: "Errore del server" }, { status: 500 })
  }
}
