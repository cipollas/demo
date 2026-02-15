import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { paymentId } = await req.json()
    const res = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: "POST",
      headers: { Authorization: `Key ${process.env.PI_API_KEY}` },
    })
    if (!res.ok) return NextResponse.json({ error: "Errore approvazione" }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Errore del server" }, { status: 500 })
  }
}
