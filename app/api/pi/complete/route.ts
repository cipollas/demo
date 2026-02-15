import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { paymentId, txid } = await req.json()
    const res = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
      method: "POST",
      headers: {
        Authorization: `Key ${process.env.PI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ txid }),
    })
    if (!res.ok) return NextResponse.json({ error: "Errore completamento" }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Errore del server" }, { status: 500 })
  }
}
