import { NextResponse } from "next/server"
import { getAdmin, APP_SOURCE, ADMIN_USERNAME } from "@/lib/supabase/admin"

// Colonne tabella access_logs: id, user_id, username, logged_at, app_source (NO pi_uid)
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
      // Filtra per data locale: allarga il range di ±1 giorno per coprire timezone UTC+1/+2
      // es: date="2026-04-24" → filtra da "2026-04-23T22:00:00Z" a "2026-04-24T23:59:59Z"
      query = query
        .gte("logged_at", `${date}T00:00:00+02:00`)
        .lte("logged_at", `${date}T23:59:59+02:00`)
    } else {
      // Senza data: mostra tutti gli ultimi 200 accessi
      query = query.limit(200)
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
