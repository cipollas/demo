"use client"

import { useState } from "react"

export default function PaymentPage() {
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handlePayment() {
    const Pi = (window as unknown as Record<string, unknown>).Pi as {
      init: (config: { version: string; sandbox: boolean }) => void
      authenticate: (scopes: string[], onIncomplete: () => void) => Promise<unknown>
      createPayment: (data: Record<string, unknown>, callbacks: Record<string, unknown>) => void
    } | undefined

    if (!Pi) {
      setErrorMsg("Pi SDK non disponibile. Apri nel Pi Browser.")
      setStatus("error")
      return
    }

    setStatus("processing")
    setErrorMsg("")

    try {
      Pi.init({ version: "2.0", sandbox: false })
      await Pi.authenticate(["payments", "username"], () => {})

      Pi.createPayment(
        { amount: 0.01, memo: "Supporto Chat Pionieri", metadata: { purpose: "user-to-app" } },
        {
          onReadyForServerApproval: async (paymentId: string) => {
            await fetch("/api/pi/approve", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paymentId }),
            })
          },
          onReadyForServerCompletion: async (paymentId: string, txid: string) => {
            await fetch("/api/pi/complete", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paymentId, txid }),
            })
            setStatus("success")
          },
          onCancel: () => setStatus("idle"),
          onError: (err: Error) => {
            setErrorMsg(err?.message || "Errore durante il pagamento")
            setStatus("error")
          },
        }
      )
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Errore sconosciuto")
      setStatus("error")
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex items-center gap-3 border-b border-border bg-card px-4 py-3">
        <a href="/chat" className="rounded-lg border border-border px-3 py-1 text-sm text-foreground">Indietro</a>
        <h1 className="text-lg font-bold text-foreground">Pagamento Pi</h1>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F7A800]">
          <span className="text-3xl font-bold text-card">Pi</span>
        </div>
        <h2 className="mt-4 text-xl font-bold text-foreground">Supporta la Community</h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Effettua un pagamento User-to-App per confermare la configurazione della tua app Pi Network.
        </p>

        <button
          onClick={handlePayment}
          disabled={status === "processing" || status === "success"}
          className="mt-6 w-full max-w-xs rounded-xl bg-[#F7A800] px-6 py-4 text-lg font-bold text-foreground disabled:opacity-50"
        >
          {status === "processing" ? "Elaborazione..." : status === "success" ? "Pagamento completato!" : "Paga 0.01 Pi"}
        </button>

        {errorMsg && <p className="mt-3 text-center text-sm text-destructive">{errorMsg}</p>}
        {status === "success" && <p className="mt-3 text-center text-sm text-green-600">Pagamento completato con successo!</p>}
      </div>
    </div>
  )
}
