/**
 * German (de) EUDR page content. Highest-volume EUDR market (Germany, ~19K
 * monthly searches). Same shape as eudrContentEN.
 *
 * Untranslated by rule: CN codes, TRACES, GeoJSON, Bindu, and the NUMBER of
 * every regulation, article, annex and date. The words around them follow
 * EUR-Lex German: Verordnung (EU) 2023/1115, Artikel 9 Absatz 1 Buchstabe d,
 * Anhang I, and dates in German format. The DDS acronym is kept; its
 * expansion is localized once as "Sorgfaltserklärung (DDS)". No em-dash.
 */

import type { EudrContent } from "./eudr-content";

export const eudrContentDE: EudrContent = {
  lang: "de",
  hero: {
    label: "EUDR: was erfassen, und bis wann",
    code: "Verordnung (EU) 2023/1115 · EUDR · Große Marktteilnehmer 30. Dez. 2026",
    title: "EUDR: Was Sie erfassen müssen, und bis wann.",
    sub: "Sieben Rohstoffe, ein Stichtag: **31. Dezember 2020**. Bevor eine Lieferung den Zoll passiert, muss jedes Grundstück geolokalisiert und jede Charge legal sein, gedeckt durch eine **Sorgfaltserklärung (DDS)**.",
    cta: "30-Minuten-Demo buchen",
    ctaSecondary: "Die fünf Schritte ansehen",
  },
  problem: {
    ariaLabel: "Das Problem",
    eyebrow: "EUDR-Betreiberpflichten",
    heading: "Der Nachweis entsteht auf dem Grundstück, die Haftung trägt der Importeur.",
    lead: "Ein Sack Kakao durchläuft einen Bauern, eine Kooperative und einen Exporteur, bevor ihn ein EU-Importeur überhaupt zu sehen bekommt. Der Nachweis, den das Gesetz verlangt, das genaue Grundstück, auf dem er wuchs, und dass die Fläche weder nach dem **31. Dezember 2020** gerodet noch entgegen lokalem Recht bewirtschaftet wurde, entsteht bei der ersten Hand und muss jede weitere überstehen. Reißt die Kette irgendwo, trägt der **Importeur** die Strafe.",
    nodes: [
      { name: "Grundstück", tier: "Bauer" },
      { name: "Kooperative", tier: "Bindeglied" },
      { name: "Exporteur", tier: "Händler" },
      { name: "Importeur", tier: "Reicht die DDS ein" },
    ],
    lostLabel:
      "Wo die Daten abreißen: Koordinaten, Landtitel und Ernteaufzeichnungen fehlen",
    flowCaption:
      "Der Importeur reicht ein, doch der Nachweis entsteht am Grundstück. Koordinaten, Landtitel, Ernteaufzeichnungen: geht etwas davon bei einer Übergabe verloren, bleibt der Container an der Grenze stehen.",
    stats: [
      "Rohstoffe, die jetzt eine geolokalisierte, legale Herkunft brauchen",
      "des EU-weiten Umsatzes, bis dorthin können Bußgelder reichen",
      "Wald pro Jahr verloren, laut FAO; etwa ein Zehntel geht auf EU-Nachfrage zurück",
      "Toleranz für Vermischung. Ein ungeprüfter Sack kostet den ganzen Container die Freigabe",
    ],
    verdictQuote:
      "Jahrzehntelang brachte Vertrauen die Container nach Europa. Das Wort eines Lieferanten, ein Zertifikatslogo, mehr brauchte es nicht. Jetzt sagt das Gesetz: Zeigt uns den Boden, auf dem die Ware gewachsen ist.",
    verdictCite: "EUDR · Verordnung (EU) 2023/1115 · im Klartext",
  },
  journey: {
    ariaLabel: "Der Weg",
    eyebrow: "EUDR-Einreichung",
    heading: "Die EUDR-Sorgfaltserklärung (DDS) in fünf Schritten.",
    sub: "Rinder, Kakao, Kaffee, Ölpalme, Kautschuk, Soja, Holz: bringen Sie eines davon auf den EU-Markt, stellt die EU-Entwaldungsverordnung **fünf Fragen**. Hier ist jede Anforderung und der Screen in Bindu, der sie beantwortet. Echtes Produkt, eine Kaffeelieferung, vom Start bis zur Einreichung.",
    codes:
      "Wichtigste CN-Positionen aus Anhang I: Kaffee 0901 · Kakao 1801 · Soja 1201 · Ölpalme 1511 · Rinder 0102 · Kautschuk 4001 · Holz 4401.",
    steps: [
      {
        ask: "Wo ist er gewachsen?",
        art: "Art. 9 Abs. 1 Buchst. d",
        law: "Koordinaten für jedes Grundstück, das die Charge gespeist hat, keine Stichprobe: ein Punkt mit sechs Nachkommastellen unter 4 Hektar, eine nachgezeichnete Grenze darüber. Rinder sind der einzige Rohstoff, für den ein einzelner Punkt nie genügt.",
        caption:
          "Karte durchsuchen, Punkte setzen, Grenzen nachziehen oder GeoJSON hochladen. Grundstücke (Parzellen) werden einmal gespeichert und bei jeder weiteren Lieferung wiederverwendet.",
        alt: "Bindu-Screen zur Grundstückskartierung: Kaffee-Grundstücke bei Badulla, Sri Lanka, als GPS-Punkte und nachgezeichnete Grenze erfasst, jeweils mit sechs Nachkommastellen.",
      },
      {
        ask: "War es am 31. Dezember 2020 Wald?",
        art: "Art. 3 Buchst. a",
        law: "Nichts, das auf nach dem Stichtag entwaldeter Fläche wuchs, darf auf den EU-Markt gelangen, unabhängig davon, ob die Rodung dort legal war.",
        caption:
          "Drei unabhängige Satellitenprüfungen pro Grundstück, Minuten pro Charge. Sie markieren Risiko; die rechtliche Schlussfolgerung bleibt bei Ihnen.",
        alt: "Bindu-Ergebnistabelle der Waldprüfung: vier Grundstücke kamen sauber zurück, ein Grundstück mit dem Satellitenbefund und einer Aktion zum Klären markiert.",
      },
      {
        ask: "Wurde er legal angebaut?",
        art: "Art. 2 Nr. 40",
        law: "Legal nach dem Recht des Erzeugerlandes, über acht Bereiche: Landrechte, Umwelt, Forstvorschriften, Rechte Dritter, Arbeit, Menschenrechte, FPIC, Steuern und Handel.",
        caption:
          "Acht Fragen pro Erklärung, Nachweise angehängt, wo Sie sie haben. Ein Nein braucht einen Grund; Landrechte brauchen ein Dokument.",
        alt: "Bindu-Legalitäts-Checkliste: die acht Rechtsbereiche nach Artikel 2 Nummer 40 beantwortet, mit hochgeladenen Nachweisdokumenten.",
      },
      {
        ask: "Wer unterschreibt dafür?",
        art: "Art. 4 Abs. 2",
        law: "Der Marktteilnehmer erklärt in einer Sorgfaltserklärung, dass das Risiko eines Verstoßes vernachlässigbar ist, und haftet für das, was die Erklärung behauptet.",
        caption:
          "Die Erklärung setzt sich aus Ihren Grundstücken, Ernten und Prüfungen selbst zusammen. Sie lesen sie, korrigieren sie, bestätigen sie.",
        alt: "Bindu-Erklärungs-Screen: die erzeugte EUDR-Sorgfaltszusammenfassung mit Produkt, Grundstücken, Prüfergebnissen und Legalitätsbestätigungen.",
      },
      {
        ask: "Wie erreicht er die Grenze?",
        art: "Art. 33",
        law: "Die Erklärung wird in TRACES, dem EUDR-Informationssystem, eingereicht, bevor die Ware auf den Markt gebracht oder ausgeführt wird.",
        caption:
          "Ein Klick nach TRACES. Die Referenznummer kommt zurück und wandert auf die Zollanmeldung.",
        alt: "Bindu-Einreichungs-Screen: die Sorgfaltserklärung, bereit zur Übermittlung an das EU-System TRACES.",
      },
    ],
  },
  chain: {
    ariaLabel: "Die Kette",
    eyebrow: "Lieferantendaten",
    heading: "Eine Partei reicht die DDS ein. Die Daten kommen aus der ganzen Kette.",
    sub: "Haften muss am Ende nur eine Partei, doch der Nachweis liegt verstreut bei fünf. Das ist die Kette, für die Bindu gebaut wird. Der Teil, über den diese Parteien einander Nachweise übergeben, ist noch in Aufbau: heute entsteht ein Dossier in einem einzigen Workspace, und nichts wandert zu einem anderen Unternehmen.",
    subhead: "Wer die DDS einreicht, und wer die Daten liefert",
    filesBadge: "Reicht die DDS ein",
    noFilesBadge: "Keine eigene DDS",
    roles: [
      {
        role: "Solo-Marktteilnehmer",
        body: "Importiert und hält bereits die ganze Kette: Farmkarten, Ernteaufzeichnungen, Legalität. Nichts bei anderen einzusammeln.",
      },
      {
        role: "Marktteilnehmer",
        body: "Bringt die Ware als Erster auf den EU-Markt. Sammelt Karten und Aufzeichnungen von seinen Lieferanten ein und reicht dann die DDS ein.",
      },
      {
        role: "Händler",
        body: "Kauft und verkauft bereits auf dem Markt befindliche Ware, unverändert. Bewahrt die DDS-Referenzen seiner Lieferanten auf und gibt sie weiter.",
      },
      {
        role: "Nachgelagerter Hersteller",
        body: "Verarbeitet die Ware zu einem anderen Produkt, bevor er es weiterverkauft. Führt die vorgelagerten DDS-Referenzen mit dem neuen Artikel mit.",
      },
      {
        role: "Erzeuger (Farm oder Kooperative)",
        body: "Baut den Rohstoff an. Bündelt seine Grundstücks- und Legalitätsaufzeichnungen als Datenpaket für den einreichenden Käufer.",
      },
    ],
    invite: {
      heading: "Laden Sie Ihre Lieferanten ein, ihre Daten zu teilen.",
      body: "**In Aufbau.** Der Marktteilnehmer öffnet ein Dossier, und die Kette ist schon da. Ein Erzeuger oder Händler, der ein Paket geteilt hat, erscheint unter **Mit Ihnen geteilt**, mit einem Klick nutzbar. Noch kein Lieferant hinterlegt? Legen Sie dessen Rechnung ab, und Bindu liest sie und verschickt die Einladung. Der Exporteur jagt niemandem per E-Mail hinterher. Das ist noch nicht live.",
    },
    supplierShot: {
      alt: "Bindu-Kettenschritt eines EUDR-Dossiers: Datenpakete, die ein Erzeuger bereits geteilt hat und die zur Nutzung bereitstehen, neben einer Rechnungs-Dropzone, die den Lieferanten ausliest und einlädt.",
      caption:
        "Das Paket des Partners wartet schon: ein Klick, kein Abtippen. Oder legen Sie die Rechnung ab, und Bindu liest den Lieferanten aus und lädt ihn in die Kette ein. Noch nicht live.",
    },
    share: {
      heading: "Geben Sie einem Käufer Zugriff, ohne eine Kopie zu senden.",
      body: "**In Aufbau.** Jedes Grundstück, jede Rechnung und jedes Dokument bleibt in dem Workspace, der es erstellt hat. Eine Freigabe gewährt dem Käufer dauerhaften Zugriff, sie sendet nie eine Kopie: sein Workspace zieht das Paket, oder er lädt das ZIP herunter. So kann eine Farm als risikoarmer Lieferant auftreten, ohne ihre Koordinaten preiszugeben. Das ist noch nicht live, und bis dahin verlässt keine einzige Angabe Ihren Workspace.",
    },
    shareShot: {
      alt: "Bindu-Freigabe-Panel: dem Workspace eines Käufers dauerhaften Zugriff auf ein Datenpaket gewähren oder das Nachweispaket als ZIP herunterladen.",
      caption:
        "Der Lieferant teilt aus seinem eigenen Workspace; der Workspace des Käufers zieht das Paket. Die rohen Farmdaten verlassen nie die Partei, der sie gehören. Noch nicht live.",
    },
  },
  scan: {
    ariaLabel: "Länder-Risikostufen",
    eyebrow: "EUDR-Risikobewertung",
    heading: "Das Herkunftsland bestimmt, wie viel Sorgfaltspflicht Sie trifft.",
    sub: "Artikel 29 sortiert jedes Land in drei Risikostufen, und die Stufe entscheidet, wie viel Sorgfalt erforderlich ist und wie oft Sie geprüft werden. Wählen Sie eine Stufe und sehen Sie, wie sich Ihre Pflichten ändern.",
    tierAria: "Risikostufe",
    tiers: {
      low: "Niedriges Risiko",
      standard: "Standardrisiko",
      high: "Hohes Risiko",
    },
    fields: {
      low: [
        "140 Länder im Anwendungsbereich",
        "Die ganze EU, die USA, China",
        "Daten erfassen, DDS einreichen",
        "Keine Risikobewertung erforderlich",
        "Keine Risikominderung erforderlich",
        "Etwa 1 % der Marktteilnehmer geprüft",
      ],
      standard: [
        "Rund 50 Länder",
        "Brasilien, Côte d'Ivoire, Indonesien",
        "Volle Risikobewertung, jede Charge",
        "Risikominderung, wo Risiko besteht",
        "Keine vereinfachte Erklärung",
        "Etwa 3 % der Marktteilnehmer kontrolliert",
      ],
      high: [
        "4 Länder",
        "Belarus, Myanmar, Nordkorea, Russland",
        "Das volle Sorgfaltsprogramm",
        "Mindestens 9 % der Marktteilnehmer geprüft",
        "Mindestens 9 % der Mengen geprüft",
        "Lieferungen gestoppt und untersucht",
      ],
    },
    caption:
      "Die Liste ist das Länder-Benchmarking vom Mai 2025 (Durchführungsverordnung (EU) 2025/1093). Standardrisiko ist der Regelfall und erhält keine vereinfachte Erklärung.",
    facts: {
      low: "140 Länder, darunter jeder EU-Staat, die USA und China. Daten erfassen und DDS einreichen; keine Risikobewertung, keine Risikominderung erforderlich. Etwa 1 % der Marktteilnehmer geprüft.",
      standard:
        "Rund 50 Länder, darunter Brasilien, Côte d'Ivoire und Indonesien. Volle Risikobewertung bei jeder Charge, Risikominderung, wo Risiko besteht. Etwa 3 % der Marktteilnehmer kontrolliert.",
      high: "Belarus, Myanmar, Nordkorea, Russland. Das volle Sorgfaltsprogramm, mindestens 9 % der Marktteilnehmer und Mengen geprüft, Lieferungen gestoppt und untersucht.",
    },
  },
  flag: {
    ariaLabel: "Satellitenalarme",
    eyebrow: "Entwaldungswarnungen",
    heading: "Wenn ein Satellitenalarm ein konformes Grundstück markiert.",
    lead: "Aus dem Orbit sieht alltägliche Farmarbeit wie Entwaldung aus. Eine konforme Farm kann trotzdem einen Alarm auslösen.",
    text: "Schattenschnitt, Auf-den-Stock-Setzen zur Verjüngung, eine zu nah am Waldrand gezogene Grenze, tropische Wolkendecke: all das liest sich als Verlust an Baumbestand. Das Gesetz verlangt hier eine Begründung, keine Perfektion. Wählen Sie den Grund, hängen Sie den Registereintrag oder das alte Luftbild an, und Ihre Begründung wandert in die Erklärung, die die Behörde liest. Die meisten Alarme klären sich mit ein paar Zeilen an einem Schreibtisch. Genau dafür ist dieser Screen da.",
    reasons: [
      "Schattenschnitt",
      "Auf-den-Stock-Setzen",
      "Geometriefehler",
      "Wolkendecke",
      "angrenzender Wald",
      "Anbau vor 2020",
    ],
    shot: {
      alt: "Bindu-Screen zum Klären eines markierten Grundstücks: ein Satellitenbefund auf einem Grundstück, der Grund, warum das Grundstück dennoch gemeldet werden soll, angehängte Nachweise und die Begründung des Marktteilnehmers für die Behörde.",
      caption:
        "Ein markiertes Grundstück, an einem Schreibtisch geklärt: Grund gewählt, Registereintrag angehängt, Begründung in die Erklärung getragen, die die Behörde liest.",
    },
  },
  calendar: {
    ariaLabel: "Die geltenden Fristen",
    eyebrow: "EUDR-Fristen",
    heading: "Die Fristen, die jetzt gelten.",
    sub: "Die Verordnung wurde zweimal verschoben und einmal vereinfacht. Ignorieren Sie die Fristen für 2024 und Anfang 2025, die Sie vielleicht gelesen haben. Diese hier gelten, und die Frist ist nah. Für Kleinst- und Kleinunternehmen fällt sie später: 30. Juni 2027.",
    rows: [
      {
        when: "31. Dez. 2020",
        flag: "Der Stichtag",
        body: "Der Stichtag. Nach diesem Datum gerodete Fläche ist nicht konform, unabhängig davon, ob die Rodung lokal legal war. Daran ändert auch ein Besitzerwechsel nichts.",
      },
      {
        when: "29. Juni 2023",
        body: "Verordnung (EU) 2023/1115 tritt in Kraft, ersetzt die alte Holzverordnung und setzt die Übergangsfristen in Gang.",
      },
      {
        when: "22. Mai 2025",
        body: "Die erste Länder-Benchmarking-Liste wird veröffentlicht (Durchführungsverordnung (EU) 2025/1093) und sortiert Herkünfte in niedriges, Standard- und hohes Risiko.",
      },
      {
        when: "23. Dez. 2025",
        body: "Verordnung (EU) 2025/2650: eine zweite Verschiebung plus echte Vereinfachung. Jährliche Erklärungen, Druckerzeugnisse aus dem Anwendungsbereich gestrichen, nachgelagerte Marktteilnehmer nutzen die vorgelagerte Referenznummer wieder.",
      },
      {
        when: "30. Dez. 2026",
        flag: "Die Frist",
        body: "Geltungsbeginn für große und mittlere Marktteilnehmer. Die eigentliche Frist, und sie ist nah.",
      },
      {
        when: "30. Juni 2027",
        body: "Geltungsbeginn für Kleinst- und Kleinunternehmen.",
      },
    ],
  },
  close: {
    ariaLabel: "Der Beleg",
    eyebrow: "TRACES-Referenznummer",
    heading: "Die Erklärung endet mit zwei Nummern von TRACES.",
    sub: "Eine Referenznummer für den Zoll und eine Verifizierungsnummer für die Akte, von TRACES im Moment der Einreichung erzeugt. Bindu führt dahinter das fünfjährige Nachweisarchiv und aktualisiert Ihre Dossiers, wenn sich die Regeln erneut ändern. Der Nutzen: Jeder europäische Käufer sieht auf einen Blick, dass Sie risikoarm liefern.",
    shot: {
      alt: "Bindu-TRACES-Beleg: die angenommene Sorgfaltserklärung, mit der DDS-Referenznummer für den Zoll und der Verifizierungsnummer für die Akte.",
      caption:
        "Von TRACES angenommen. Die Referenznummer reist mit der Lieferung; der Nachweis dahinter bleibt fünf Jahre aufbewahrt.",
    },
    badges: [
      { head: "Keine Vermischung", body: "geprüfte und ungeprüfte Lose getrennt gehalten" },
      { head: "5-Jahre-Archiv", body: "hash-verkettete Nachweise, jeder Akteur" },
      { head: "Regeln verfolgt", body: "Dossiers aktualisiert, wenn sich das Gesetz ändert" },
    ],
    demo: {
      heading: "30-Minuten-Demo buchen",
      body: "Bringen Sie einen Lieferanten mit. Am Ende sind seine Grundstücke validiert.",
    },
    cbam: {
      heading: "CBAM",
      body: "Die andere Kohlenstoffregel an der Grenze, auf einer eigenen Seite.",
    },
  },
  pricing: {
    locale: "de-DE",
    ariaLabel: "Preis",
    eyebrow: "Preis",
    heading: "Was ein EUDR-Dossier kostet.",
    cta: "30-Minuten-Demo buchen",
    planEyebrow: "EUDR · Sorgfalts-Dossier",
    unit: (p) =>
      `pro Dossier. ${p.eudrFiling} für die Einreichung, ${p.eudrRetain5} für die Aufbewahrung.`,
    badge: "Pro Einreichung",
    vs: "keine Plätze, keine Jahreslizenz",
    lines: (p) => [
      `${p.eudrFiling} reicht die DDS bei TRACES ein und liefert die Referenznummer, die der Zoll verlangt.`,
      `${p.eudrRetain5} bewahrt sie die fünf Jahre auf, die das Gesetz verlangt.`,
      `${p.eudrRetain10} bewahrt sie die vollen zehn Jahre auf.`,
      `${p.workspaceMonth} im Monat halten Ihren Workspace einsatzbereit zum Einreichen.`,
    ],
    industryLabel: "Branche:",
    industry:
      "Die Alternativen rechnen pro Platz oder pro Jahr ab. Bindu rechnet pro eingereichtem Dossier ab.",
    note: (p) =>
      `Ihren Workspace einsatzbereit zu halten kostet ${p.workspaceMonth} im Monat. EU-gehostet, DSGVO-konform. Preise zzgl. MwSt.`,
  },
  faqBand: {
    ariaLabel: "Häufige Fragen",
    heading: "Häufige Fragen zur EUDR.",
  },
  seo: {
    title: "EUDR: EU-Entwaldungsverordnung, Fristen, Geolokalisierung",
    description:
      "EUDR, die EU-Entwaldungsverordnung (Verordnung (EU) 2023/1115): sieben Rohstoffe, Geolokalisierung, TRACES-Sorgfaltserklärung und die geltenden Fristen.",
    ogTitle: "EUDR für Importeure: was erfassen, und bis wann",
    ogDescription:
      "Sieben Rohstoffe, Geolokalisierung auf Grundstücksebene, Länder-Risikostufen und die TRACES-Sorgfaltserklärung. Die Fristen, die nach zwei Verschiebungen tatsächlich gelten.",
    ogImageAlt: "Walddach neben gerodeter Fläche",
    jsonLd: {
      headline: "EUDR für Importeure: was erfassen, und bis wann",
      description:
        "Die EU-Entwaldungsverordnung (Verordnung (EU) 2023/1115) für Importeure: die sieben erfassten Rohstoffe, Geolokalisierung der Grundstücke, die TRACES-Sorgfaltserklärung, das Länder-Benchmarking und die Fristen, die nach zwei Verschiebungen gelten.",
      faq: [
        {
          question: "Welche Rohstoffe erfasst die EUDR?",
          answer:
            "Sieben: Rinder, Kakao, Kaffee, Ölpalme, Kautschuk, Soja und Holz, plus eine definierte Liste daraus abgeleiteter Erzeugnisse (Leder, Schokolade, Möbel, Papier, Reifen und mehr). Festgelegt in Verordnung (EU) 2023/1115.",
        },
        {
          question: "Ab wann gilt die EUDR?",
          answer:
            "Für große und mittlere Marktteilnehmer und Händler ab dem 30. Dezember 2026; für natürliche Personen sowie Kleinst- und Kleinunternehmen ab dem 30. Juni 2027. Diese Fristen wurden durch Verordnung (EU) 2025/2650 (Artikel 38) festgelegt, die zweite Verschiebung der ursprünglichen Frist von 2024.",
        },
        {
          question: "Was ist eine EUDR-Sorgfaltserklärung (DDS)?",
          answer:
            "Eine Erklärung, die im EUDR-Informationssystem TRACES eingereicht wird, bevor erfasste Ware auf den EU-Markt gebracht oder aus ihm ausgeführt wird. Sie bestätigt, dass Sorgfalt ausgeübt wurde und das Entwaldungsrisiko vernachlässigbar ist, und sie verweist auf die Geolokalisierung der Grundstücke. Die Einreichung gibt eine DDS-Referenznummer zurück, die beim Zoll verwendet wird.",
        },
        {
          question: "Welche Geolokalisierungsdaten verlangt die EUDR?",
          answer:
            "Geografische Koordinaten (Breite und Länge) jedes Grundstücks, auf dem der Rohstoff erzeugt wurde: ein einzelner Punkt für Grundstücke unter 4 Hektar und ein Polygon für Grundstücke von 4 Hektar oder mehr. Die Koordinaten werden nach Artikel 9 bereitgestellt.",
        },
        {
          question: "Welche Strafen drohen bei EUDR-Verstößen?",
          answer:
            "Artikel 25 setzt das Mindestmaß, das die Mitgliedstaaten vorsehen müssen, nicht die Höhe der Geldbuße im Einzelfall: Der Höchstbetrag der Geldbuße muss mindestens 4 % des gesamten jährlichen EU-weiten Umsatzes des Marktteilnehmers betragen, dazu Einziehung der Ware und der daraus erzielten Erlöse sowie vorübergehender Ausschluss von öffentlicher Auftragsvergabe und öffentlicher Förderung.",
        },
        {
          question: "Wer reicht die EUDR-Sorgfaltserklärung ein?",
          answer:
            "Der Marktteilnehmer (der die Ware als Erster auf den EU-Markt bringt) oder ein Solo-Marktteilnehmer, der importiert und die ganze Kette hält. Händler, nachgelagerte Hersteller und Erzeuger reichen keine eigene DDS ein: sie führen die Daten mit oder liefern sie und nutzen die vorgelagerte DDS-Referenznummer wieder.",
        },
        {
          question: "Kann ein Händler die DDS-Referenz eines Lieferanten wiederverwenden?",
          answer:
            "Ja. Ein Händler, der bereits auf dem EU-Markt befindliche Ware unverändert kauft und verkauft, reicht keine neue Erklärung ein. Er bewahrt die DDS-Referenznummern seiner Lieferanten auf und gibt sie weiter. Nachgelagerte Hersteller führen die vorgelagerten Referenzen ebenso mit dem umgewandelten Produkt mit.",
        },
        {
          question: "Wie teilen Lieferanten EUDR-Daten, ohne die Kontrolle darüber zu verlieren?",
          answer:
            "Bindu baut ein Teilen, bei dem jede Partei ihre Grundstücke, Rechnungen und Dokumente im eigenen Workspace behält und ihrem Käufer Zugriff auf ein Datenpaket gewährt, statt eine Kopie zu mailen; rohe Farmdaten verlassen so nie die Partei, der sie gehören. Dieses Teilen ist noch nicht live. Bis dahin laden Sie, was Lieferanten Ihnen schicken, in Ihr eigenes Sorgfalts-Dossier, und keine einzige Angabe verlässt Ihren Workspace.",
        },
        {
          question: "Was ist die EUDR?",
          answer:
            "Die EU-Entwaldungsverordnung, Verordnung (EU) 2023/1115. Sie verbietet es, sieben waldgefährdende Rohstoffe und daraus gewonnene Erzeugnisse auf dem EU-Markt in Verkehr zu bringen oder aus ihm auszuführen, sofern sie nicht entwaldungsfrei sind, im Ursprungsland legal erzeugt wurden und von einer Sorgfaltserklärung (DDS) abgedeckt sind. Entwaldungsfrei heißt: erzeugt auf Flächen, die nach dem 31. Dezember 2020 nicht entwaldet wurden.",
        },
        {
          question: "Wurde die EUDR erneut verschoben?",
          answer:
            "Ja, zum zweiten Mal. Die Verordnung (EU) 2025/2650, veröffentlicht am 23. Dezember 2025, verschiebt den Geltungsbeginn auf den 30. Dezember 2026 für große und mittlere Marktteilnehmer und auf den 30. Juni 2027 für Kleinst- und Kleinunternehmen, und vereinfacht zugleich einige Pflichten für nachgelagerte Akteure.",
        },
        {
          question: "Wie erfüllt man die EUDR?",
          answer:
            "Vier Schritte. Erstens: jede Erzeugungsfläche geolokalisieren, ab 4 Hektar als Polygon. Zweitens: belegen, dass die Fläche nach dem 31. Dezember 2020 nicht entwaldet wurde und die Erzeugung dem Recht des Ursprungslands entspricht. Drittens: Risiko bewerten und, wo nötig, mindern. Viertens: die Sorgfaltserklärung (DDS) in TRACES einreichen, bevor die Ware den Zoll passiert, und die Nachweise fünf Jahre aufbewahren.",
        },
        {
          question: "Was bedeutet der Stichtag 31. Dezember 2020?",
          answer:
            "Er ist die Entwaldungs-Grenzlinie der Verordnung. Ware ist nur dann entwaldungsfrei, wenn die Fläche, auf der sie erzeugt wurde, nach diesem Datum nicht entwaldet und bei Holz nicht geschädigt wurde. Der Stichtag verschiebt sich nicht mit den Geltungsterminen: auch bei späterem Geltungsbeginn bleibt der 31. Dezember 2020 maßgeblich.",
        },
        {
          question: "Kann ich nicht einfach direkt in TRACES einreichen?",
          answer:
            "Ja. TRACES ist kostenlos und ohnehin das Ziel jeder Einreichung. Bindu ist das Aktensystem davor: Ihr Dossier ist die Arbeitsakte, die Sorgfaltserklärung (DDS) ist, was daraus eingereicht wird. Bindu validiert die Plot-Geometrie, bevor TRACES sie ablehnt, verwendet die Flächen bei jeder weiteren Lieferung wieder, statt sie neu einzutippen, und führt das fünfjährige Nachweisarchiv, auf das die Referenznummer verweist.",
        },
      ],
    },
  },
};
