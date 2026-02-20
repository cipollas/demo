export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold text-foreground">Termini di Servizio</h1>
        <p className="mt-2 text-sm text-muted-foreground">Ultimo aggiornamento: 20 Febbraio 2026</p>

        <div className="mt-6 space-y-6 text-sm leading-relaxed text-foreground">
          <section>
            <h2 className="text-lg font-semibold">1. Accettazione dei Termini</h2>
            <p className="mt-2">
              {"Utilizzando Chat Pionieri (\"l'App\"), accetti di essere vincolato da questi Termini di Servizio. Se non accetti questi termini, ti preghiamo di non utilizzare l'app."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">2. Descrizione del Servizio</h2>
            <p className="mt-2">
              Chat Pionieri offre una piattaforma di messaggistica per i Pionieri di Pi Network
              con KYC approvato e migrazione al Mainnet completata. Il servizio include chat
              in tempo reale e la possibilita' di effettuare donazioni tramite Pi.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">3. Requisiti di accesso</h2>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Account Pi Network attivo e verificato</li>
              <li>KYC approvato su Pi Network</li>
              <li>Prima migrazione al Mainnet completata</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold">4. Regole di condotta</h2>
            <p className="mt-2">Gli utenti si impegnano a:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Non inviare messaggi offensivi, volgari o discriminatori</li>
              <li>Non fare spam o inviare contenuti pubblicitari non autorizzati</li>
              <li>Non tentare di compromettere la sicurezza dell'app</li>
              <li>Rispettare gli altri utenti della community</li>
              <li>Non condividere informazioni personali di altri utenti</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold">5. Moderazione</h2>
            <p className="mt-2">
              L'amministratore si riserva il diritto di eliminare messaggi e bannare utenti
              che violano le regole di condotta. Le decisioni di moderazione sono insindacabili.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">6. Donazioni</h2>
            <p className="mt-2">
              Le donazioni in Pi sono volontarie e non obbligatorie. Una volta effettuata,
              la donazione non e' rimborsabile. Le donazioni vengono utilizzate per il supporto
              e l'aggiornamento dell'app.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">7. Limitazione di responsabilita'</h2>
            <p className="mt-2">
              L'app viene fornita "cosi' com'e'", senza garanzie di alcun tipo. L'amministratore
              non e' responsabile per eventuali danni derivanti dall'uso dell'app, inclusa la perdita
              di dati o interruzioni del servizio.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">8. Modifiche ai Termini</h2>
            <p className="mt-2">
              Ci riserviamo il diritto di modificare questi Termini di Servizio in qualsiasi momento.
              Le modifiche saranno effettive immediatamente dopo la pubblicazione sulla piattaforma.
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
