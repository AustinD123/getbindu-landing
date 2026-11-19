/**
 * Dutch (nl) EUDR page content. Major EU import hub (Netherlands, Rotterdam).
 * Same shape as eudrContentEN.
 *
 * Untranslated by rule: CN codes, TRACES, GeoJSON, Bindu, and the NUMBER of
 * every regulation, article, annex and date. The words around them follow
 * EUR-Lex Dutch: Verordening (EU) 2023/1115, artikel 9, lid 1, punt d,
 * bijlage I, and dates in Dutch format. Register is formal (u) throughout, and
 * "partij" is reserved for the legal party: a batch is a "zending". The DDS
 * acronym is kept; its expansion is localized once as
 * "zorgvuldigheidsverklaring (DDS)". No em-dash anywhere.
 */

import type { EudrContent } from "./eudr-content";

export const eudrContentNL: EudrContent = {
  lang: "nl",
  hero: {
    label: "EUDR: wat verzamelen, en wanneer",
    code: "Verordening (EU) 2023/1115 · EUDR · Grote marktdeelnemers 30 dec. 2026",
    title: "EUDR: wat u moet verzamelen, en wanneer.",
    sub: "Zeven grondstoffen delen dezelfde peildatum: **31 december 2020**. Voordat een zending de douane passeert moet elk perceel gegeolokaliseerd zijn, de zending legaal, en het geheel gedekt door een **zorgvuldigheidsverklaring (DDS)**.",
    cta: "Demo van 30 minuten boeken",
    ctaSecondary: "Bekijk de vijf stappen",
  },
  problem: {
    ariaLabel: "Het probleem",
    eyebrow: "Aansprakelijkheid marktdeelnemer",
    heading: "Het bewijs ontstaat op het perceel, maar de importeur draagt de aansprakelijkheid.",
    lead: "Een zak cacao passeert een boer, een coöperatie en een exporteur voordat een EU-importeur hem ooit ziet. Het bewijs dat de wet vraagt, het precieze perceel waarop hij groeide plus de zekerheid dat die grond niet na **31 december 2020** is gekapt en niet tegen lokaal recht is bewerkt, ontstaat bij de eerste schakel en moet elke schakel daarna doorstaan. Valt de keten ergens stil, dan betaalt de **importeur** de boete.",
    nodes: [
      { name: "Perceel", tier: "Boer" },
      { name: "Coöperatie", tier: "Schakel" },
      { name: "Exporteur", tier: "Handelaar" },
      { name: "Importeur", tier: "Dient de DDS in" },
    ],
    lostLabel:
      "Waar de data afbreekt: coördinaten, eigendomsakte of registers die ontbreken",
    flowCaption:
      "De importeur dient in, maar het bewijs ontstaat op het perceel. Raak bij een overdracht de coördinaten, de eigendomsakte of de oogstregisters kwijt, en de container blijft aan de grens staan.",
    stats: [
      "grondstoffen die nu een gegeolokaliseerde, legale oorsprong nodig hebben",
      "van de EU-brede omzet, het niveau dat boetes kunnen bereiken",
      "bos per jaar verloren, volgens de FAO; ongeveer een tiende herleid tot EU-vraag",
      "menging getolereerd. Eén ongeverifieerde zak keurt de hele container af",
    ],
    verdictQuote:
      "Decennialang verscheepten we op vertrouwen containers naar Europa. Het woord van een leverancier, een keurmerklogo, en klaar was je. Nu zegt de wet: laat ons de grond zien waarop de waar groeide.",
    verdictCite: "EUDR · Verordening (EU) 2023/1115 · in gewone taal",
  },
  journey: {
    ariaLabel: "De weg",
    eyebrow: "EUDR-indieningsproces",
    heading: "De EUDR-indiening in vijf stappen.",
    sub: "Runderen, cacao, koffie, oliepalm, rubber, soja, hout: breng een ervan op de EU-markt en de ontbossingsverordening vraagt **vijf dingen**. Hier is elke eis en het scherm in Bindu dat hem beantwoordt. Echt product, één koffiezending, van start tot indiening.",
    codes:
      "Belangrijkste CN-posten uit bijlage I: koffie 0901 · cacao 1801 · soja 1201 · oliepalm 1511 · runderen 0102 · rubber 4001 · hout 4401.",
    steps: [
      {
        ask: "Waar groeide het?",
        art: "Art. 9, lid 1, punt d",
        law: "Coördinaten voor elk perceel dat de zending voedde, geen steekproef: een punt met zes decimalen onder 4 hectare, een getekende grens erboven. Runderen zijn de enige grondstof waarvoor één punt nooit volstaat.",
        caption:
          "Doorzoek de kaart, plaats punten, teken grenzen of upload GeoJSON. Percelen worden één keer opgeslagen en bij elke volgende zending hergebruikt.",
        alt: "Bindu-scherm voor het in kaart brengen van boerderijen: koffiepercelen bij Badulla, Sri Lanka, vastgelegd als GPS-punten en een getekende grens, elk met zes decimalen.",
      },
      {
        ask: "Was het bos op 31 december 2020?",
        art: "Art. 3, punt a",
        law: "Niets dat groeide op grond die na de peildatum is ontbost mag de EU-markt op, of de kap daar nu legaal was of niet.",
        caption:
          "Drie onafhankelijke satellietcontroles per perceel, minuten per zending. Ze markeren risico; de juridische conclusie blijft van u.",
        alt: "Bindu-resultatentabel van de boscontrole: vier percelen kwamen schoon terug, één perceel gemarkeerd met de satellietbevinding en een Oplossen-actie.",
      },
      {
        ask: "Werd het legaal geteeld?",
        art: "Art. 2, punt 40",
        law: "Legaal volgens het recht van het productieland, over acht gebieden: grondrechten, milieu, bosregels, rechten van derden, arbeid, mensenrechten, FPIC, belasting en handel.",
        caption:
          "Acht vragen per indiening, bewijs bijgevoegd waar u het hebt. Een nee vereist een reden; grondrechten vereisen een document.",
        alt: "Bindu-legaliteitschecklist: de acht juridische gebieden van artikel 2, punt 40, beantwoord, met geüploade bewijsdocumenten.",
      },
      {
        ask: "Wie tekent ervoor?",
        art: "Art. 4, lid 2",
        law: "De marktdeelnemer verklaart, in een zorgvuldigheidsverklaring, dat het risico op niet-naleving verwaarloosbaar is, en blijft aansprakelijk voor wat de verklaring beweert.",
        caption:
          "De verklaring stelt zichzelf samen uit uw percelen, oogsten en controles. U leest ze na, corrigeert waar nodig en bevestigt.",
        alt: "Bindu-verklaringsscherm: de gegenereerde EUDR-zorgvuldigheidssamenvatting met product, percelen, controleresultaten en legaliteitsverklaringen.",
      },
      {
        ask: "Hoe bereikt het de grens?",
        art: "Art. 33",
        law: "De verklaring wordt ingediend in TRACES, het EUDR-informatiesysteem, voordat de waar op de markt wordt gebracht of uitgevoerd.",
        caption:
          "Eén klik naar TRACES. Het referentienummer komt terug en reist mee op de douaneaangifte.",
        alt: "Bindu-indieningsscherm: de zorgvuldigheidsverklaring klaar om in te dienen bij het EU-systeem TRACES.",
      },
    ],
  },
  chain: {
    ariaLabel: "De keten",
    eyebrow: "Leveranciersgegevens",
    heading: "Eén partij dient de DDS in. De data komt uit de hele keten.",
    sub: "De aansprakelijkheid komt op één bureau terecht, terwijl het bewijs verspreid zit over vijf partijen. Dit is de keten waarvoor Bindu wordt gebouwd. Het deel waarmee die partijen elkaar bewijs overhandigen is nog in aanbouw: vandaag komt een indiening in één workspace tot stand en gaat er niets naar een ander bedrijf.",
    subhead: "Wie dient de DDS in, en wie levert de data",
    filesBadge: "Dient de DDS in",
    noFilesBadge: "Geen eigen DDS",
    roles: [
      {
        role: "Solo-marktdeelnemer",
        body: "Importeert en houdt al de hele keten: boerderijkaarten, oogstregisters, legaliteit. Niets bij anderen te verzamelen.",
      },
      {
        role: "Marktdeelnemer",
        body: "Eerste die de waar op de EU-markt brengt. Verzamelt de kaarten en registers van zijn leveranciers en dient dan de DDS in.",
      },
      {
        role: "Handelaar",
        body: "Koopt en verkoopt waar die al op de markt is, ongewijzigd. Bewaart en geeft de DDS-referenties van zijn leveranciers door.",
      },
      {
        role: "Stroomafwaartse fabrikant",
        body: "Verwerkt de waar tot een ander product voordat hij het doorverkoopt. Draagt de stroomopwaartse DDS-referenties mee met het nieuwe artikel.",
      },
      {
        role: "Producent (boerderij of coöperatie)",
        body: "Teelt de grondstof. Verpakt zijn percelen en legaliteitsregisters als datapakket voor de koper die indient.",
      },
    ],
    invite: {
      heading: "Nodig leveranciers uit om hun data te delen.",
      body: "**In aanbouw.** De marktdeelnemer opent een indiening en de keten is er al. Een producent of handelaar die een pakket deelde verschijnt onder **Met u gedeeld**, met één klik te gebruiken. Nog geen leverancier in het bestand? Sleep zijn factuur binnen en Bindu leest die uit en verstuurt de uitnodiging. De exporteur jaagt niemand achterna per e-mail. Dit is nog niet live.",
    },
    supplierShot: {
      alt: "Bindu-ketenstap van een EUDR-indiening: datapakketten die een producent al deelde en klaarstaan voor gebruik, naast een factuurzone die de leverancier uitleest en uitnodigt.",
      caption:
        "Het pakket van de partner staat al klaar: één klik, geen overtypen. Of sleep de factuur binnen en Bindu leest de leverancier uit en nodigt hem uit in de keten. Nog niet live.",
    },
    share: {
      heading: "Geef een koper toegang zonder een kopie te sturen.",
      body: "**In aanbouw.** Percelen, facturen en documenten blijven in de workspace die ze aanmaakte. Een deling geeft de koper permanente toegang zonder ooit een kopie te versturen: zijn workspace haalt het pakket op, of downloadt de ZIP. Zo bewijst een boerderij haar kopers dat ze laag risico is, zonder haar coördinaten uit handen te geven. Dit is nog niet live.",
    },
    shareShot: {
      alt: "Bindu-deelpaneel: geef de workspace van een koper permanente toegang tot een datapakket, of download het bewijspakket als ZIP.",
      caption:
        "De leverancier deelt vanuit zijn eigen workspace; de workspace van de koper haalt het pakket op. De ruwe boerderijdata verlaat nooit de partij die er eigenaar van is. Nog niet live.",
    },
  },
  scan: {
    ariaLabel: "Risicoklassen per land",
    eyebrow: "EUDR-risicoclassificatie",
    heading: "De risicoklasse van het herkomstland bepaalt uw verplichtingen.",
    sub: "Artikel 29 sorteert elk land in drie risiconiveaus, en het niveau bepaalt hoeveel zorgvuldigheid vereist is en hoe vaak u wordt gecontroleerd. Kies een niveau en kijk hoe uw verplichtingen veranderen.",
    tierAria: "Risiconiveau",
    tiers: {
      low: "Laag risico",
      standard: "Standaardrisico",
      high: "Hoog risico",
    },
    fields: {
      low: [
        "140 landen binnen het toepassingsgebied",
        "De hele EU, de VS, China",
        "Verzamel de data, dien de DDS in",
        "Geen risicobeoordeling vereist",
        "Geen risicobeperking vereist",
        "Ongeveer 1% van de marktdeelnemers gecontroleerd",
      ],
      standard: [
        "Rond 50 landen",
        "Brazilië, Ivoorkust, Indonesië",
        "Volledige risicobeoordeling, elke zending",
        "Risicobeperking waar risico wordt gevonden",
        "Geen vereenvoudigde verklaring",
        "Ongeveer 3% van de marktdeelnemers geïnspecteerd",
      ],
      high: [
        "4 landen",
        "Belarus, Myanmar, Noord-Korea, Rusland",
        "Het volledige zorgvuldigheidsprogramma",
        "Minstens 9% van de marktdeelnemers gecontroleerd",
        "Minstens 9% van de volumes gecontroleerd",
        "Zendingen gestopt en onderzocht",
      ],
    },
    caption:
      "De lijst is de landenbenchmarking van mei 2025 (Uitvoeringsverordening (EU) 2025/1093). Standaardrisico is de regel en krijgt geen vereenvoudigde verklaring.",
    facts: {
      low: "140 landen, waaronder elke EU-staat, de VS en China. Verzamel de data en dien de DDS in; geen risicobeoordeling, geen risicobeperking vereist. Ongeveer 1% van de marktdeelnemers gecontroleerd.",
      standard:
        "Rond 50 landen, waaronder Brazilië, Ivoorkust en Indonesië. Volledige risicobeoordeling bij elke zending, risicobeperking waar risico wordt gevonden. Ongeveer 3% van de marktdeelnemers geïnspecteerd.",
      high: "Belarus, Myanmar, Noord-Korea, Rusland. Het volledige zorgvuldigheidsprogramma, minstens 9% van de marktdeelnemers en volumes gecontroleerd, zendingen gestopt en onderzocht.",
    },
  },
  flag: {
    ariaLabel: "Satellietmeldingen",
    eyebrow: "Ontbossingswaarschuwingen",
    heading: "Wanneer een satellietmelding een conform perceel markeert.",
    lead: "Vanuit de ruimte lijkt routinematig boerderijwerk op ontbossing. Een conforme boerderij kan toch een alarm doen afgaan.",
    text: "Schaduwsnoei, afzetten voor verjonging, een grens te dicht bij de bosrand getrokken, tropische bewolking: het leest allemaal als verlies van boombedekking. Daarom vraagt de wet om rechtvaardiging in plaats van perfectie. Kies de reden, voeg de registerinvoer of de oude luchtfoto toe, en uw uitleg reist mee in de verklaring die de autoriteit leest. De meeste alarmen worden gewoon aan een bureau afgehandeld, en dit is dat bureau.",
    reasons: [
      "schaduwsnoei",
      "afzetten",
      "geometriefout",
      "bewolking",
      "aangrenzend bos",
      "teelt van vóór 2020",
    ],
    shot: {
      alt: "Bindu-scherm voor het oplossen van een gemarkeerd perceel: een satellietbevinding op één perceel, de reden waarom het perceel toch moet worden ingediend, bijgevoegd bewijs en de uitleg van de marktdeelnemer voor de autoriteit.",
      caption:
        "Eén gemarkeerd perceel, opgelost aan een bureau: reden gekozen, registerinvoer bijgevoegd, uitleg meegedragen in de verklaring die de autoriteit leest.",
    },
  },
  calendar: {
    ariaLabel: "De deadlines die gelden",
    eyebrow: "EUDR-termijnen",
    heading: "De deadlines die nu gelden.",
    sub: "De verordening werd twee keer uitgesteld en één keer vereenvoudigd. Negeer de deadlines van 2024 en begin 2025 die u misschien las. Dit zijn de geldende, en de deadline is dichtbij.",
    rows: [
      {
        when: "31 dec. 2020",
        flag: "De peildatum",
        body: "De peildatum. Grond die na deze datum is gekapt is niet-conform, of de kap lokaal nu legaal was of niet, en het reset niet wanneer de grond van eigenaar wisselt.",
      },
      {
        when: "29 jun. 2023",
        body: "Verordening (EU) 2023/1115 treedt in werking, vervangt de oude houtverordening en start de nalevingsklok.",
      },
      {
        when: "22 mei 2025",
        body: "De eerste landenbenchmarkinglijst wordt gepubliceerd (Uitvoeringsverordening (EU) 2025/1093) en sorteert oorsprongen in laag, standaard en hoog risico.",
      },
      {
        when: "23 dec. 2025",
        body: "Verordening (EU) 2025/2650: een tweede uitstel plus echte vereenvoudiging. Jaarlijkse verklaringen, drukwerk uit het toepassingsgebied gehaald, stroomafwaartse marktdeelnemers hergebruiken het stroomopwaartse referentienummer.",
      },
      {
        when: "30 dec. 2026",
        flag: "De deadline",
        body: "Toepassingsdatum voor grote en middelgrote marktdeelnemers. De echte deadline, en hij is dichtbij.",
      },
      {
        when: "30 jun. 2027",
        body: "Toepassingsdatum voor micro- en kleine marktdeelnemers.",
      },
    ],
  },
  close: {
    ariaLabel: "Het bewijs",
    eyebrow: "TRACES-referentienummer",
    heading: "De indiening eindigt met twee nummers van TRACES.",
    sub: "Een referentienummer voor de douane en een verificatienummer voor het dossier, aangemaakt door TRACES op het moment dat u indient. Bindu houdt daarachter de vijfjarige bewijskluis en werkt uw indieningen bij wanneer de regels opnieuw veranderen. Wat dat oplevert: elke Europese koper ziet in één oogopslag dat u laag risico bent.",
    shot: {
      alt: "Bindu-TRACES-bewijs: de aanvaarde zorgvuldigheidsverklaring, met het DDS-referentienummer voor de douane en het verificatienummer voor het dossier.",
      caption:
        "Aanvaard door TRACES. Het referentienummer reist mee met de zending; het bewijs erachter blijft vijf jaar bewaard.",
    },
    badges: [
      { head: "Geen vermenging", body: "geverifieerde en ongeverifieerde zendingen apart gehouden" },
      { head: "5-jarige kluis", body: "met hash geketend bewijs, elke actor" },
      { head: "Regels gevolgd", body: "indieningen bijgewerkt wanneer de wet verschuift" },
    ],
    demo: {
      heading: "Demo van 30 minuten boeken",
      body: "Breng één leverancier mee en vertrek met gevalideerde percelen.",
    },
    cbam: {
      heading: "CBAM",
      body: "De andere koolstofregel aan de grens, live op een eigen pagina.",
    },
  },
  pricing: {
    locale: "nl-NL",
    ariaLabel: "Prijs",
    eyebrow: "Prijs",
    heading: "Wat een EUDR-dossier kost.",
    cta: "Demo van 30 minuten boeken",
    planEyebrow: "EUDR · zorgvuldigheidsdossier",
    unit: (p) =>
      `per dossier. ${p.eudrFiling} om in te dienen, ${p.eudrRetain5} om te bewaren.`,
    badge: "Per indiening",
    vs: "geen gebruikers, geen jaarlicentie",
    lines: (p) => [
      `${p.eudrFiling} dient de DDS in bij TRACES en levert de referentie die de douane vraagt.`,
      `${p.eudrRetain5} bewaart hem de vijf jaar die de wet vereist.`,
      `${p.eudrRetain10} bewaart hem de volle tien jaar.`,
      `${p.workspaceMonth} per maand houdt uw workspace klaar om in te dienen.`,
    ],
    industryLabel: "Branche:",
    industry:
      "De alternatieven rekenen per gebruiker of per jaar af. Bindu rekent af per ingediend dossier.",
    note: (p) =>
      `Uw workspace actief houden kost ${p.workspaceMonth} per maand. EU-gehost, AVG-conform. Prijzen exclusief btw.`,
  },
  faqBand: {
    ariaLabel: "Veelgestelde vragen",
    heading: "Veelgestelde vragen over de EUDR.",
  },
  seo: {
    title: "EUDR-wetgeving en uitstel: indienen in TRACES",
    description:
      "EUDR-wetgeving voor importeurs onder Verordening (EU) 2023/1115: de zorgvuldigheidsverklaring in TRACES, geolocatie van percelen en de deadlines na uitstel.",
    ogTitle: "EUDR voor importeurs: wat verzamelen, en wanneer",
    ogDescription:
      "Zeven grondstoffen, geolocatie op perceelniveau, landenrisiconiveaus en de zorgvuldigheidsverklaring in TRACES. De data die echt gelden na twee uitstellen.",
    ogImageAlt: "Boskroon naast gekapte grond",
    jsonLd: {
      headline: "EUDR voor importeurs: wat verzamelen, en wanneer",
      description:
        "De ontbossingsverordening (Verordening (EU) 2023/1115) voor importeurs: de zeven gedekte grondstoffen, geolocatie van percelen, de zorgvuldigheidsverklaring in TRACES, de landenbenchmarking en de data die gelden na twee uitstellen.",
      faq: [
        {
          question: "Welke grondstoffen dekt de EUDR?",
          answer:
            "Zeven: runderen, cacao, koffie, oliepalm, rubber, soja en hout, plus een vastgestelde lijst van daarvan afgeleide producten (leer, chocolade, meubels, papier, banden en meer). Vastgelegd in Verordening (EU) 2023/1115.",
        },
        {
          question: "Vanaf wanneer is de EUDR van toepassing?",
          answer:
            "Voor grote en middelgrote marktdeelnemers en handelaren vanaf 30 december 2026; voor natuurlijke personen en micro- en kleine ondernemingen vanaf 30 juni 2027. Deze data zijn vastgesteld door Verordening (EU) 2025/2650 (artikel 38), het tweede uitstel van de oorspronkelijke deadline van 2024.",
        },
        {
          question: "Wat is een EUDR-zorgvuldigheidsverklaring (DDS)?",
          answer:
            "Een verklaring die wordt ingediend in het EUDR-informatiesysteem TRACES voordat gedekte waar op de EU-markt wordt gebracht of eruit wordt uitgevoerd. Ze bevestigt dat zorgvuldigheid is betracht en het ontbossingsrisico verwaarloosbaar is, en verwijst naar de geolocatie van de percelen. Indiening geeft een DDS-referentienummer terug dat bij de douane wordt gebruikt.",
        },
        {
          question: "Welke geolocatiegegevens vereist de EUDR?",
          answer:
            "Geografische coördinaten (breedte en lengte) van elk perceel waar de grondstof is geproduceerd: één punt voor percelen onder 4 hectare en een polygoon voor percelen van 4 hectare of meer. Coördinaten worden verstrekt op grond van artikel 9.",
        },
        {
          question: "Wat zijn de sancties voor EUDR-niet-naleving?",
          answer:
            "Artikel 25 legt het minimum vast dat de lidstaten moeten voorzien, niet de boete die u zou krijgen: de maximale boete moet ten minste 4% van de totale jaarlijkse omzet van de marktdeelnemer in de Unie bedragen, met verbeurdverklaring van de waar en van de daaruit verkregen opbrengsten, en tijdelijke uitsluiting van openbare aanbestedingen en publieke financiering.",
        },
        {
          question: "Wie dient de EUDR-zorgvuldigheidsverklaring in?",
          answer:
            "De marktdeelnemer (de eerste die de waar op de EU-markt brengt) of een solo-marktdeelnemer die importeert en de hele keten houdt. Handelaren, stroomafwaartse fabrikanten en producenten dienen geen eigen DDS in: zij dragen of leveren de data en hergebruiken het stroomopwaartse DDS-referentienummer.",
        },
        {
          question: "Kan een handelaar de DDS-referentie van een leverancier hergebruiken?",
          answer:
            "Ja. Een handelaar die waar die al op de EU-markt is ongewijzigd koopt en verkoopt, dient geen nieuwe verklaring in. Hij bewaart en geeft de DDS-referentienummers van zijn leveranciers door. Stroomafwaartse fabrikanten dragen de stroomopwaartse referenties eveneens mee met het verwerkte product.",
        },
        {
          question: "Hoe delen leveranciers EUDR-data zonder de controle erover te verliezen?",
          answer:
            "Bindu bouwt aan delen waarbij elke partij haar percelen, facturen en documenten in haar eigen workspace houdt en haar koper toegang geeft tot een datapakket in plaats van een kopie te mailen; ruwe boerderijdata verlaat zo nooit de partij die er eigenaar van is. Dat delen is nog niet live. Tot die tijd laadt u wat leveranciers u sturen in uw eigen dossier, en verlaat niets uw workspace.",
        },
      ],
    },
  },
};
