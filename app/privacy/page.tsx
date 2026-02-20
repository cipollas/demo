export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold text-foreground">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Ultimo aggiornamento: 20 Febbraio 2026</p>

        <div className="mt-6 space-y-6 text-sm leading-relaxed text-foreground">
          <section>
            <h2 className="text-lg font-semibold">1. Introduzione</h2>
            <p className="mt-2">
              {"Chat Pionieri (\"l'App\") rispetta la tua privacy. Questa Privacy Policy descrive come raccogliamo, utilizziamo e proteggiamo le tue informazioni personali quando utilizzi la nostra applicazione."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">2. Dati raccolti</h2>
            <p className="mt-2">Raccogliamo le seguenti informazioni:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Username Pi Network (fornito tramite Pi SDK durante il login)</li>
              <li>UID Pi Network (identificatore univoco del tuo account Pi)</li>
              <li>Messaggi inviati nella chat (testo, data e ora)</li>
              <li>Informazioni sulle transazioni Pi effettuate tramite l'app</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold">3. Utilizzo dei dati</h2>
            <p className="mt-2">I tuoi dati vengono utilizzati esclusivamente per:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Autenticazione e accesso all'app</li>
              <li>Visualizzazione dei messaggi nella chat</li>
              <li>Gestione delle donazioni Pi</li>
              <li>Moderazione della community (solo admin)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold">4. Conservazione dei dati</h2>
            <p className="mt-2">
              I messaggi e i dati utente vengono conservati su server sicuri tramite Supabase.
              I dati vengono conservati per tutta la durata del servizio. Puoi richiedere la cancellazione
              dei tuoi dati contattando l'amministratore dell'app.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">5. Condivisione dei dati</h2>
            <p className="mt-2">
              Non vendiamo, scambiamo o trasferiamo a terzi le tue informazioni personali.
              I dati possono essere condivisi solo con Pi Network per l'autenticazione e
              l'elaborazione dei pagamenti.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">6. Sicurezza</h2>
            <p className="mt-2">
              Utilizziamo misure di sicurezza tecniche e organizzative per proteggere i tuoi dati,
              inclusa la crittografia dei dati in transito e l'accesso limitato ai dati personali.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">7. Contatti</h2>
            <p className="mt-2">
              Per qualsiasi domanda riguardante la privacy, contatta l'amministratore
              dell'app tramite la chat o su Pi Network.
            </p>
          </section>
        </div>

        <a href="/" className="mt-8 inline-block text-sm text-[#F7A800] underline">
          Torna alla Home
        </a>
      </div>
    </div>
  )
}
