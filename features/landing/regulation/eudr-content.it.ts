/**
 * Italian (it) EUDR page content. Third market by EUDR search volume (Italy,
 * ~3.9K monthly). Same shape as eudrContentEN.
 *
 * Untranslated by rule: CN codes, TRACES, GeoJSON, Bindu, and the NUMBER of
 * every regulation, article, annex and date. The words around them follow
 * EUR-Lex Italian: regolamento (UE) 2023/1115, articolo 9, paragrafo 1,
 * lettera d, allegato I, and dates in Italian format. Register is formal (Lei)
 * throughout. The DDS acronym is kept; its expansion is localized once as
 * "dichiarazione di dovuta diligenza (DDS)". No em-dash anywhere.
 */

import type { EudrContent } from "./eudr-content";

export const eudrContentIT: EudrContent = {
  lang: "it",
  hero: {
    label: "EUDR: cosa raccogliere, e quando",
    code: "regolamento (UE) 2023/1115 · EUDR · Grandi operatori 30 dic. 2026",
    title: "EUDR: che cosa raccogliere, ed entro quando.",
    sub: "Sette materie prime, una data limite: **31 dicembre 2020**. Ogni appezzamento geolocalizzato, ogni lotto legale, ogni spedizione coperta da una **dichiarazione di dovuta diligenza (DDS)** prima di passare la dogana.",
    cta: "Prenota una demo di 30 minuti",
    ctaSecondary: "Guardi i cinque passaggi",
  },
  problem: {
    ariaLabel: "Il problema",
    eyebrow: "Responsabilità dell'operatore EUDR",
    heading: "La prova nasce nell'appezzamento, ma la responsabilità è dell'importatore.",
    lead: "Un sacco di cacao passa per un agricoltore, una cooperativa e un esportatore prima che un importatore UE lo veda. La prova che la legge vuole, l'esatto appezzamento su cui è cresciuto e che la terra non è stata disboscata dopo il **31 dicembre 2020** né coltivata contro la legge locale, nasce alla prima mano e deve sopravvivere a ogni mano successiva. Basta spezzare la staffetta in un punto qualsiasi e l'**importatore** paga la multa.",
    nodes: [
      { name: "Appezzamento", tier: "Agricoltore" },
      { name: "Cooperativa", tier: "Ponte" },
      { name: "Esportatore", tier: "Commerciante" },
      { name: "Importatore", tier: "Presenta la DDS" },
    ],
    lostLabel:
      "Dove i dati si interrompono: mancano le coordinate, il titolo fondiario o i registri",
    flowCaption:
      "A presentare è l'importatore, ma la prova nasce nel campo. Se lungo la strada saltano le coordinate, il titolo fondiario o un registro di raccolta, il container si ferma in dogana.",
    stats: [
      "materie prime che ora richiedono un'origine geolocalizzata e legale",
      "del fatturato UE, il livello che possono raggiungere le sanzioni",
      "di foresta persa all'anno, secondo la FAO; circa un decimo riconducibile alla domanda UE",
      "mescolanza tollerata. Un sacco non verificato boccia l'intero container",
    ],
    verdictQuote:
      "Per decenni è bastato fidarsi per far arrivare i container in Europa: la parola di un fornitore, il logo di una certificazione, e via. Ora la legge chiede di mostrare la terra su cui la merce è cresciuta.",
    verdictCite: "EUDR · regolamento (UE) 2023/1115 · in parole semplici",
  },
  journey: {
    ariaLabel: "Il percorso",
    eyebrow: "Processo di presentazione EUDR",
    heading: "La presentazione EUDR in cinque passaggi.",
    sub: "Bovini, cacao, caffè, olio di palma, gomma, soia, legno: immetta uno qualsiasi sul mercato UE e il regolamento sulla deforestazione chiede **cinque cose**. Ecco ogni richiesta e la schermata dentro Bindu che vi risponde. Prodotto reale, una spedizione di caffè, dall'inizio alla presentazione.",
    codes:
      "Principali voci CN dell'allegato I: caffè 0901 · cacao 1801 · soia 1201 · olio di palma 1511 · bovini 0102 · gomma 4001 · legno 4401.",
    steps: [
      {
        ask: "Dove è cresciuto?",
        art: "Art. 9, par. 1, lett. d)",
        law: "Coordinate per ogni appezzamento che ha alimentato il lotto, senza campionamento: un punto a sei decimali sotto i 4 ettari, un confine tracciato sopra. I bovini sono l'unica materia prima per cui un singolo punto non basta mai.",
        caption:
          "Cerchi sulla mappa, aggiunga punti, tracci confini o carichi un GeoJSON. Gli appezzamenti si salvano una volta e si riutilizzano a ogni spedizione successiva.",
        alt: "Schermata di mappatura delle aziende in Bindu: appezzamenti di caffè vicino a Badulla, Sri Lanka, catturate come punti GPS e un confine tracciato, ciascuno con coordinate a sei decimali.",
      },
      {
        ask: "Era foresta il 31 dicembre 2020?",
        art: "Art. 3, lett. a)",
        law: "Nulla di coltivato su terra disboscata dopo la data limite può entrare nel mercato UE, che il disboscamento fosse o meno legale dove è avvenuto.",
        caption:
          "Tre controlli satellitari indipendenti per appezzamento, minuti per lotto. Segnalano il rischio; la conclusione legale resta a Lei.",
        alt: "Tabella dei risultati del controllo foresta in Bindu: quattro appezzamenti sono risultati puliti, uno segnalato con il riscontro satellitare e un'azione Risolvi.",
      },
      {
        ask: "È stato coltivato legalmente?",
        art: "Art. 2, punto 40)",
        law: "Legale secondo la legge del paese di produzione, su otto aree: diritti fondiari, ambiente, norme forestali, diritti dei terzi, lavoro, diritti umani, FPIC, fiscalità e commercio.",
        caption:
          "Otto domande per presentazione, prova allegata dove la possiede. Un no richiede un motivo; i diritti fondiari richiedono un documento.",
        alt: "Lista di controllo della legalità in Bindu: le otto aree legali dell'articolo 2, punto 40, con le risposte e i documenti di prova caricati.",
      },
      {
        ask: "Chi ne risponde?",
        art: "Art. 4, par. 2",
        law: "L'operatore attesta, in una dichiarazione di dovuta diligenza, che il rischio di non conformità è trascurabile, e resta responsabile di quanto la dichiarazione afferma.",
        caption:
          "La dichiarazione si compone da sola dai Suoi appezzamenti, raccolte e controlli. La legge, la corregge, la conferma.",
        alt: "Schermata della dichiarazione in Bindu: il riepilogo di dovuta diligenza EUDR generato, con prodotto, appezzamenti, risultati dei controlli e attestazioni di legalità.",
      },
      {
        ask: "Come arriva alla frontiera?",
        art: "Art. 33",
        law: "La dichiarazione è presentata in TRACES, il sistema informativo EUDR, prima che la merce sia immessa sul mercato o esportata.",
        caption:
          "Un clic verso TRACES. Il numero di riferimento torna indietro e viaggia sulla dichiarazione doganale.",
        alt: "Schermata di presentazione in Bindu: la dichiarazione di dovuta diligenza pronta per l'invio al sistema UE TRACES.",
      },
    ],
  },
  chain: {
    ariaLabel: "La catena",
    eyebrow: "Dati dei fornitori",
    heading: "Una sola parte presenta la DDS. I dati arrivano da tutta la filiera.",
    sub: "A rispondere davanti alla legge è una parte sola, ma i dati che reggono la presentazione passano per cinque mani. Questa è la catena per cui Bindu è costruito. La parte che permette a questi soggetti di passarsi le prove è ancora in costruzione: oggi una presentazione si compone dentro un solo workspace e nulla passa a un'altra azienda.",
    subhead: "Chi presenta la DDS, e chi fornisce i dati",
    filesBadge: "Presenta la DDS",
    noFilesBadge: "Nessuna DDS propria",
    roles: [
      {
        role: "Operatore singolo",
        body: "Importa e detiene già l'intera catena: mappe delle aziende, registri di raccolta, legalità. Niente da raccogliere da nessun altro.",
      },
      {
        role: "Operatore",
        body: "Primo a immettere la merce sul mercato UE. Raccoglie mappe e registri dai suoi fornitori, poi presenta la DDS.",
      },
      {
        role: "Commerciante",
        body: "Compra e vende merce già sul mercato, invariata. Conserva e trasmette i numeri di riferimento DDS dei suoi fornitori.",
      },
      {
        role: "Fabbricante a valle",
        body: "Trasforma la merce in un altro prodotto prima di rivenderla. Porta con sé i riferimenti DDS a monte insieme al nuovo articolo.",
      },
      {
        role: "Produttore (azienda o cooperativa)",
        body: "Coltiva la materia prima. Impacchetta i suoi appezzamenti e i registri di legalità come pacchetto dati per l'acquirente che presenta.",
      },
    ],
    invite: {
      heading: "Invita i fornitori a condividere i loro dati.",
      body: "**In costruzione.** L'operatore apre una presentazione e la catena è già lì. Un produttore o commerciante che ha condiviso un pacchetto appare sotto **Condiviso con Lei**, pronto all'uso con un clic. Nessun fornitore ancora in archivio? Trascini qui la sua fattura e Bindu la legge e invia l'invito. L'esportatore non insegue nessuno via email. Non è ancora attivo.",
    },
    supplierShot: {
      alt: "Passaggio di catena di una presentazione EUDR in Bindu: pacchetti dati che un produttore ha già condiviso in attesa di essere usati, accanto a un'area dove trascinare la fattura, che legge il fornitore e lo invita.",
      caption:
        "Il pacchetto del partner è già in attesa: un clic, senza riscrivere. Oppure trascini la fattura e Bindu legge il fornitore e lo invita nella catena. Non è ancora attivo.",
    },
    share: {
      heading: "Dare accesso a un acquirente senza inviare una copia.",
      body: "**In costruzione.** Ogni appezzamento, fattura e documento resta nel workspace che l'ha creato. Condividere significa dare all'acquirente un accesso permanente, non mandargli una copia: è il suo workspace a recuperare il pacchetto, oppure lo scarica come ZIP. Così un'azienda può presentarsi come fornitore a basso rischio senza consegnare le proprie coordinate. Non è ancora attivo.",
    },
    shareShot: {
      alt: "Pannello di condivisione in Bindu: conceda al workspace di un acquirente l'accesso permanente a un pacchetto dati, o scarichi il pacchetto di prove come ZIP.",
      caption:
        "Il fornitore condivide dal proprio workspace; il workspace dell'acquirente recupera il pacchetto. I dati grezzi dell'azienda non lasciano mai la parte che ne è proprietaria. Non è ancora attivo.",
    },
  },
  scan: {
    ariaLabel: "Livelli di rischio per paese",
    eyebrow: "Classificazione del rischio EUDR",
    heading: "Il livello di rischio del paese d'origine determina gli obblighi.",
    sub: "L'articolo 29 ordina ogni paese in tre livelli di rischio, e il livello decide quanta dovuta diligenza serve e quanto spesso viene controllato. Ne scelga uno e osservi come cambiano i suoi obblighi.",
    tierAria: "Livello di rischio",
    tiers: {
      low: "Rischio basso",
      standard: "Rischio standard",
      high: "Rischio alto",
    },
    fields: {
      low: [
        "140 paesi in ambito",
        "Tutta l'UE, gli USA, la Cina",
        "Raccolga i dati, presenti la DDS",
        "Nessuna valutazione del rischio richiesta",
        "Nessuna mitigazione richiesta",
        "Circa l'1% degli operatori controllati",
      ],
      standard: [
        "Circa 50 paesi",
        "Brasile, Costa d'Avorio, Indonesia",
        "Valutazione del rischio completa, ogni lotto",
        "Mitigazione dove si trova il rischio",
        "Nessuna dichiarazione semplificata",
        "Circa il 3% degli operatori ispezionati",
      ],
      high: [
        "4 paesi",
        "Bielorussia, Myanmar, Corea del Nord, Russia",
        "Il programma completo di dovuta diligenza",
        "Almeno il 9% degli operatori controllati",
        "Almeno il 9% dei volumi controllati",
        "Spedizioni fermate ed esaminate",
      ],
    },
    caption:
      "L'elenco è il benchmarking dei paesi di maggio 2025 (regolamento di esecuzione (UE) 2025/1093). Il rischio standard è la regola, e non prevede dichiarazione semplificata.",
    facts: {
      low: "140 paesi, inclusi ogni Stato UE, gli USA e la Cina. Raccolga i dati e presenti la DDS; nessuna valutazione del rischio, nessuna mitigazione richiesta. Circa l'1% degli operatori controllati.",
      standard:
        "Circa 50 paesi, tra cui Brasile, Costa d'Avorio e Indonesia. Valutazione del rischio completa su ogni lotto, mitigazione dove si trova il rischio. Circa il 3% degli operatori ispezionati.",
      high: "Bielorussia, Myanmar, Corea del Nord, Russia. Il programma completo di dovuta diligenza, almeno il 9% degli operatori e dei volumi controllati, spedizioni fermate ed esaminate.",
    },
  },
  flag: {
    ariaLabel: "Allarmi satellitari",
    eyebrow: "Allerte di deforestazione",
    heading: "Quando un allarme satellitare segnala un appezzamento conforme.",
    lead: "Dall'orbita, il normale lavoro agricolo sembra deforestazione. Un'azienda conforme può comunque far scattare un allarme.",
    text: "Potatura d'ombreggiamento, ceduazione per la rigenerazione, un confine tracciato troppo vicino al margine della foresta, la copertura nuvolosa tropicale: dall'alto tutto assomiglia a una perdita di copertura arborea. La legge chiede una spiegazione documentata. Scelga il motivo, alleghi la voce di registro o la vecchia foto aerea, e la sua spiegazione entra nella dichiarazione che l'autorità legge. Quasi tutti gli allarmi si chiudono a una scrivania, ed è questa.",
    reasons: [
      "potatura d'ombreggiamento",
      "ceduazione",
      "errore di geometria",
      "copertura nuvolosa",
      "foresta adiacente",
      "coltura pre-2020",
    ],
    shot: {
      alt: "Schermata di risoluzione di un appezzamento segnalato in Bindu: un riscontro satellitare su un appezzamento, il motivo per cui l'appezzamento dovrebbe comunque essere presentato, la prova allegata e la spiegazione dell'operatore per l'autorità.",
      caption:
        "Un appezzamento segnalato, risolto a una scrivania: motivo scelto, voce di registro allegata, spiegazione portata nella dichiarazione che l'autorità legge.",
    },
  },
  calendar: {
    ariaLabel: "Le date che si applicano",
    eyebrow: "Scadenze EUDR",
    heading: "Le scadenze che si applicano ora.",
    sub: "Il regolamento è stato rinviato due volte e semplificato una. Ignori le scadenze del 2024 e inizio 2025 che potrebbe aver letto. Queste sono quelle in vigore, e la scadenza è vicina.",
    rows: [
      {
        when: "31 dic. 2020",
        flag: "La data limite",
        body: "La data limite. La terra disboscata dopo questa data non è conforme, che il disboscamento fosse o meno legale localmente, e non si azzera quando la terra cambia proprietario.",
      },
      {
        when: "29 giu. 2023",
        body: "Il regolamento (UE) 2023/1115 entra in vigore, sostituendo il vecchio regolamento sul legno e avviando l'orologio della conformità.",
      },
      {
        when: "22 mag. 2025",
        body: "Viene pubblicato il primo elenco di benchmarking dei paesi (regolamento di esecuzione (UE) 2025/1093), che ordina le origini in rischio basso, standard e alto.",
      },
      {
        when: "23 dic. 2025",
        body: "Regolamento (UE) 2025/2650: un secondo rinvio più una reale semplificazione. Dichiarazioni annuali, stampati tolti dall'ambito, gli operatori a valle riutilizzano il numero di riferimento a monte.",
      },
      {
        when: "30 dic. 2026",
        flag: "La scadenza",
        body: "Data di applicazione per i grandi e medi operatori. La vera scadenza, ed è vicina.",
      },
      {
        when: "30 giu. 2027",
        body: "Data di applicazione per i micro e piccoli operatori.",
      },
    ],
  },
  close: {
    ariaLabel: "La ricevuta",
    eyebrow: "Numero di riferimento TRACES",
    heading: "La presentazione si chiude con due numeri di TRACES.",
    sub: "Un numero di riferimento per la dogana e un numero di verifica per l'archivio, generati da TRACES nel momento in cui presenta. Dietro di essi Bindu custodisce il caveau delle prove a cinque anni e aggiorna le sue presentazioni ogni volta che le regole cambiano. In cambio, davanti agli acquirenti europei si presenta come fornitore a basso rischio.",
    shot: {
      alt: "Ricevuta TRACES in Bindu: la dichiarazione di dovuta diligenza accettata, con il numero di riferimento DDS per la dogana e il numero di verifica per l'archivio.",
      caption:
        "Accettata da TRACES. Il numero di riferimento viaggia con la spedizione; la prova dietro di esso resta conservata per cinque anni.",
    },
    badges: [
      { head: "Zero mescolanza", body: "lotti verificati e non verificati tenuti separati" },
      { head: "Caveau a 5 anni", body: "prove concatenate con hash, ogni attore" },
      { head: "Regole tracciate", body: "presentazioni aggiornate quando la legge cambia" },
    ],
    demo: {
      heading: "Prenota una demo di 30 minuti",
      body: "Porti un fornitore. Esca con i suoi appezzamenti convalidati.",
    },
    cbam: {
      heading: "CBAM",
      body: "L'altra regola del carbonio alla frontiera, già online su una pagina dedicata.",
    },
  },
  pricing: {
    locale: "it-IT",
    ariaLabel: "Prezzo",
    eyebrow: "Prezzo",
    heading: "Quanto costa un dossier EUDR.",
    cta: "Prenota una demo di 30 minuti",
    planEyebrow: "EUDR · dossier di dovuta diligenza",
    unit: (p) =>
      `a dossier. ${p.eudrFiling} per presentare, ${p.eudrRetain5} per conservare.`,
    badge: "Per deposito",
    vs: "nessuna postazione, nessuna licenza annuale",
    lines: (p) => [
      `${p.eudrFiling} presenta la DDS in TRACES e restituisce il riferimento richiesto dalla dogana.`,
      `${p.eudrRetain5} la conserva i cinque anni richiesti dalla legge.`,
      `${p.eudrRetain10} la conserva per tutti e dieci gli anni.`,
      `${p.workspaceMonth} al mese mantengono il suo workspace pronto per presentare.`,
    ],
    industryLabel: "Settore:",
    industry:
      "Le alternative fatturano per postazione o all'anno. Bindu fattura per fascicolo depositato.",
    note: (p) =>
      `Mantenere il suo workspace attivo costa ${p.workspaceMonth} al mese. Ospitato nell'UE, conforme al GDPR. Prezzi IVA esclusa.`,
  },
  faqBand: {
    ariaLabel: "Domande frequenti",
    heading: "Domande frequenti sull'EUDR.",
  },
  seo: {
    title: "Regolamento EUDR: cos'è, obblighi e dichiarazione TRACES",
    description:
      "Regolamento EUDR (2023/1115): sette materie prime, geolocalizzazione degli appezzamenti, dichiarazione di dovuta diligenza in TRACES e scadenze dopo i rinvii.",
    ogTitle: "EUDR per importatori: cosa raccogliere, e quando",
    ogDescription:
      "Sette materie prime, geolocalizzazione a livello di appezzamento, livelli di rischio per paese e la dichiarazione di dovuta diligenza in TRACES. Le date che si applicano davvero dopo due rinvii.",
    ogImageAlt: "Chioma della foresta accanto a terra disboscata",
    jsonLd: {
      headline: "EUDR per importatori: cosa raccogliere, e quando",
      description:
        "Il regolamento sulla deforestazione (regolamento (UE) 2023/1115) per importatori: le sette materie prime coperte, la geolocalizzazione degli appezzamenti, la dichiarazione di dovuta diligenza in TRACES, il benchmarking dei paesi e le date che si applicano dopo due rinvii.",
      faq: [
        {
          question: "Quali materie prime copre l'EUDR?",
          answer:
            "Sette: bovini, cacao, caffè, olio di palma, gomma, soia e legno, più un elenco definito di prodotti da esse derivati (cuoio, cioccolato, mobili, carta, pneumatici e altro). Stabilito nel regolamento (UE) 2023/1115.",
        },
        {
          question: "Da quando inizia ad applicarsi l'EUDR?",
          answer:
            "Per i grandi e medi operatori e commercianti, dal 30 dicembre 2026; per le persone fisiche e le micro e piccole imprese, dal 30 giugno 2027. Queste date sono state fissate dal regolamento (UE) 2025/2650 (articolo 38), il secondo rinvio della scadenza originaria del 2024.",
        },
        {
          question: "Cos'è una dichiarazione di dovuta diligenza EUDR (DDS)?",
          answer:
            "Una dichiarazione presentata nel sistema informativo EUDR TRACES prima che la merce coperta sia immessa sul mercato UE o da esso esportata. Conferma che la dovuta diligenza è stata svolta e il rischio di deforestazione è trascurabile, e rinvia alla geolocalizzazione degli appezzamenti. La presentazione restituisce un numero di riferimento DDS usato in dogana.",
        },
        {
          question: "Quali dati di geolocalizzazione richiede l'EUDR?",
          answer:
            "Coordinate geografiche (latitudine e longitudine) di ogni appezzamento su cui la materia prima è stata prodotta: un singolo punto per appezzamenti sotto i 4 ettari e un poligono per appezzamenti di 4 ettari o più. Le coordinate sono fornite ai sensi dell'articolo 9.",
        },
        {
          question: "Quali sono le sanzioni per la non conformità EUDR?",
          answer:
            "L'articolo 25 fissa il minimo che gli Stati membri devono prevedere, non l'importo della multa: l'importo massimo della multa deve essere almeno il 4% del fatturato annuo totale dell'operatore in tutta l'Unione, con la confisca della merce e dei ricavi che ne derivano, e l'esclusione temporanea dagli appalti pubblici e dai finanziamenti pubblici.",
        },
        {
          question: "Chi presenta la dichiarazione di dovuta diligenza EUDR?",
          answer:
            "L'operatore (il primo a immettere la merce sul mercato UE) o un operatore singolo che importa e detiene l'intera catena. Commercianti, fabbricanti a valle e produttori non presentano una propria DDS: portano o forniscono i dati e riutilizzano il numero di riferimento DDS a monte.",
        },
        {
          question: "Un commerciante può riutilizzare il riferimento DDS di un fornitore?",
          answer:
            "Sì. Un commerciante che compra e vende merce già sul mercato UE, invariata, non presenta una nuova dichiarazione. Conserva e trasmette i numeri di riferimento DDS dei suoi fornitori. Anche i fabbricanti a valle portano i riferimenti a monte con il prodotto trasformato.",
        },
        {
          question: "Come condividono i fornitori i dati EUDR senza perderne il controllo?",
          answer:
            "Bindu sta costruendo una condivisione in cui ogni parte tiene i suoi appezzamenti, fatture e documenti nel proprio workspace e concede al suo acquirente l'accesso a un pacchetto dati invece di inviarne una copia via email; i dati grezzi dell'azienda non lasciano così mai la parte che ne è proprietaria. Questa condivisione non è ancora attiva. Fino ad allora caricate ciò che i fornitori vi inviano nel vostro dossier, e nulla lascia il vostro workspace.",
        },
      ],
    },
  },
};
