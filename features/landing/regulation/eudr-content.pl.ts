/**
 * Polish (pl) EUDR page content. Second market by EUDR search volume (Poland,
 * ~4.9K monthly). Same shape as eudrContentEN.
 *
 * Untranslated by rule: CN codes, TRACES, GeoJSON, Bindu, and the NUMBER of
 * every regulation, article, annex and date. The words around them follow
 * EUR-Lex Polish: rozporządzenie (UE) 2023/1115, art. 9 ust. 1 lit. d,
 * załącznik I, and dates in Polish format. Register is impersonal or Państwo,
 * never the gender-marking second person singular. "Podmiot handlowy" is the
 * legal role; "handlowiec" (a sales rep) is not. The DDS acronym is kept; its
 * expansion is localized once as "oświadczenie o należytej staranności (DDS)".
 * No em-dash anywhere.
 */

import type { EudrContent } from "./eudr-content";

export const eudrContentPL: EudrContent = {
  lang: "pl",
  hero: {
    label: "EUDR: co zebrać i do kiedy",
    code: "Rozporządzenie (UE) 2023/1115 · EUDR · Duże podmioty 30 gru 2026",
    title: "EUDR: co zebrać i do kiedy.",
    sub: "Siedem towarów i jedna data graniczna: **31 grudnia 2020**. Zanim dostawa przejdzie odprawę celną, każda działka musi być zgeolokalizowana, partia legalna, a całość objęta **oświadczeniem o należytej staranności (DDS)**.",
    cta: "Umów 30-minutowe demo",
    ctaSecondary: "Zobacz pięć kroków",
  },
  problem: {
    ariaLabel: "Problem",
    eyebrow: "Odpowiedzialność operatora EUDR",
    heading: "Dowód powstaje na działce, ale odpowiedzialność ponosi importer.",
    lead: "Worek kakao przechodzi przez rolnika, spółdzielnię i eksportera, zanim w ogóle zobaczy go unijny importer. Dowód, którego wymaga prawo, czyli konkretna działka, na której wyrosło, i potwierdzenie, że ziemi nie wykarczowano po **31 grudnia 2020** ani nie uprawiano wbrew lokalnemu prawu, powstaje w pierwszej ręce i musi przejść przez wszystkie kolejne. Jeśli sztafeta gdzieś się urwie, karę zapłaci **importer**.",
    nodes: [
      { name: "Działka", tier: "Rolnik" },
      { name: "Spółdzielnia", tier: "Ogniwo" },
      { name: "Eksporter", tier: "Podmiot handlowy" },
      { name: "Importer", tier: "Składa DDS" },
    ],
    lostLabel:
      "Gdzie urywają się dane: gdy brakuje współrzędnych, tytułu do ziemi albo zapisów",
    flowCaption:
      "Składa importer, ale dowód powstaje na działce. Wystarczy zgubić przy jednym przekazaniu współrzędne, tytuł do ziemi lub zapisy zbiorów, żeby kontener utknął na granicy.",
    stats: [
      "towarów, które potrzebują teraz zgeolokalizowanego, legalnego pochodzenia",
      "obrotu w całej UE, do tego poziomu mogą sięgać kary",
      "lasu traconego rocznie, według FAO; około jedna dziesiąta wiązana z popytem UE",
      "tolerancji dla mieszania. Jeden niezweryfikowany worek oblewa cały kontener",
    ],
    verdictQuote:
      "Przez dekady kontenery wprowadzało do Europy zaufanie: słowo dostawcy, logo systemu certyfikacji, gotowe. Teraz prawo mówi: pokażcie nam ziemię, na której wyrósł towar.",
    verdictCite: "EUDR · rozporządzenie (UE) 2023/1115 · prostymi słowami",
  },
  journey: {
    ariaLabel: "Droga",
    eyebrow: "Proces składania EUDR",
    heading: "Zgłoszenie EUDR w pięciu krokach.",
    sub: "Bydło, kakao, kawa, olej palmowy, kauczuk, soja, drewno: wprowadzenie któregokolwiek z nich na rynek UE uruchamia **pięć pytań** rozporządzenia o wylesianiu. Oto każde wymaganie i ekran w Bindu, który na nie odpowiada. Prawdziwy produkt, jedna dostawa kawy, od startu do złożenia.",
    codes:
      "Główne pozycje CN z załącznika I: kawa 0901 · kakao 1801 · soja 1201 · olej palmowy 1511 · bydło 0102 · kauczuk 4001 · drewno 4401.",
    steps: [
      {
        ask: "Gdzie wyrosło?",
        art: "Art. 9 ust. 1 lit. d",
        law: "Współrzędne dla każdej działki, która zasiliła partię, bez próbkowania: punkt z sześcioma miejscami po przecinku poniżej 4 hektarów, obrys granicy powyżej. Bydło to jedyny towar, dla którego pojedynczy punkt nigdy nie wystarcza.",
        caption:
          "Wyszukiwanie na mapie, stawianie punktów, obrys granic lub wgranie pliku GeoJSON. Działki zapisuje się raz i wykorzystuje ponownie przy każdej kolejnej dostawie.",
        alt: "Ekran mapowania gospodarstw w Bindu: działki kawy koło Badulli, Sri Lanka, uchwycone jako punkty GPS i obrysowana granica, każde z sześcioma miejscami po przecinku.",
      },
      {
        ask: "Czy 31 grudnia 2020 był to las?",
        art: "Art. 3 lit. a",
        law: "Nic, co wyrosło na ziemi wylesionej po dacie granicznej, nie może wejść na rynek UE, niezależnie od tego, czy karczowanie było tam legalne.",
        caption:
          "Trzy niezależne kontrole satelitarne na działkę, minuty na partię. Sygnalizują ryzyko; wniosek prawny pozostaje po stronie podmiotu.",
        alt: "Tabela wyników kontroli lasu w Bindu: cztery działki wróciły czyste, jedna oznaczona z ustaleniem satelitarnym i akcją Rozwiąż.",
      },
      {
        ask: "Czy wyrosło legalnie?",
        art: "Art. 2 pkt 40",
        law: "Legalnie według prawa kraju produkcji, w ośmiu obszarach: prawa do gruntu, środowisko, przepisy leśne, prawa osób trzecich, praca, prawa człowieka, FPIC, podatki i handel.",
        caption:
          "Osiem pytań na zgłoszenie, dowód załączony tam, gdzie jest dostępny. Każde „nie” wymaga uzasadnienia; prawa do gruntu wymagają dokumentu.",
        alt: "Lista kontrolna legalności w Bindu: odpowiedzi we wszystkich ośmiu obszarach prawnych z art. 2 pkt 40, z wgranymi dokumentami dowodowymi.",
      },
      {
        ask: "Kto się pod tym podpisze?",
        art: "Art. 4 ust. 2",
        law: "Podmiot poświadcza w oświadczeniu o należytej staranności, że ryzyko niezgodności jest znikome, i odpowiada za to, co oświadczenie stwierdza.",
        caption:
          "Oświadczenie składa się samo z działek, zbiorów i kontroli. Wystarczy je przeczytać, poprawić i zatwierdzić.",
        alt: "Ekran oświadczenia w Bindu: wygenerowane podsumowanie należytej staranności EUDR z produktem, działkami, wynikami kontroli i poświadczeniami legalności.",
      },
      {
        ask: "Jak dociera do granicy?",
        art: "Art. 33",
        law: "Oświadczenie składa się w TRACES, systemie informacyjnym EUDR, zanim towar zostanie wprowadzony na rynek lub wywieziony.",
        caption:
          "Jedno kliknięcie do TRACES. Numer referencyjny wraca i wędruje na zgłoszenie celne.",
        alt: "Ekran składania w Bindu: oświadczenie o należytej staranności gotowe do przesłania do unijnego systemu TRACES.",
      },
    ],
  },
  chain: {
    ariaLabel: "Łańcuch",
    eyebrow: "Dane dostawców",
    heading: "DDS składa jedna strona. Dane pochodzą z całego łańcucha.",
    sub: "Za zgłoszenie odpowiada jeden podmiot, choć dowody rozsiane są po pięciu firmach. To jest łańcuch, dla którego powstaje Bindu. Część, dzięki której te strony przekazują sobie dowody, jest jeszcze w budowie: dziś zgłoszenie powstaje w jednym workspace i nic nie trafia do innej firmy.",
    subhead: "Kto składa DDS, a kto dostarcza dane",
    filesBadge: "Składa DDS",
    noFilesBadge: "Brak własnego DDS",
    roles: [
      {
        role: "Podmiot solo",
        body: "Importuje i już trzyma cały łańcuch: mapy gospodarstw, zapisy zbiorów, legalność. Nie ma nic do zebrania od innych.",
      },
      {
        role: "Podmiot",
        body: "Pierwszy wprowadza towar na rynek UE. Zbiera mapy i zapisy od swoich dostawców, a następnie składa DDS.",
      },
      {
        role: "Podmiot handlowy",
        body: "Kupuje i sprzedaje towar już obecny na rynku, bez zmian. Zachowuje i przekazuje dalej numery referencyjne DDS swoich dostawców.",
      },
      {
        role: "Przetwórca na dalszym etapie",
        body: "Przetwarza towar w inny produkt przed dalszą sprzedażą. Przenosi numery referencyjne DDS z wcześniejszego etapu wraz z nowym artykułem.",
      },
      {
        role: "Producent (gospodarstwo lub spółdzielnia)",
        body: "Uprawia towar. Pakuje swoje działki i zapisy legalności jako pakiet danych dla kupującego, który składa.",
      },
    ],
    invite: {
      heading: "Zaproś dostawców, aby udostępnili swoje dane.",
      body: "**W budowie.** Podmiot otwiera zgłoszenie, a łańcuch już tam jest. Producent lub podmiot handlowy, który udostępnił pakiet, pojawia się pod **Udostępnione Państwu**, gotowy do użycia jednym kliknięciem. Brak dostawcy w kartotece? Wystarczy wrzucić jego fakturę, a Bindu ją odczyta i wyśle zaproszenie. Eksporter nikogo nie goni mailem. To jeszcze nie działa.",
    },
    supplierShot: {
      alt: "Krok łańcucha zgłoszenia EUDR w Bindu: pakiety danych, które producent już udostępnił, czekające do użycia, obok strefy zrzutu faktury, która odczytuje dostawcę i go zaprasza.",
      caption:
        "Pakiet partnera już czeka: jedno kliknięcie, bez przepisywania. Albo wystarczy wrzucić fakturę, a Bindu odczyta dostawcę i zaprosi go do łańcucha. Jeszcze nie działa.",
    },
    share: {
      heading: "Daj kupującemu dostęp bez wysyłania kopii.",
      body: "**W budowie.** Każda działka, faktura i dokument pozostają w workspace, który je utworzył. Udostępnienie daje kupującemu stały dostęp bez wysyłania kopii: jego workspace pobiera pakiet albo zapisuje ZIP na dysk. Dzięki temu gospodarstwo może pokazać kupującym niskie ryzyko, nie wydając im swoich współrzędnych. To jeszcze nie działa.",
    },
    shareShot: {
      alt: "Panel udostępniania w Bindu: przyznaj workspace kupującego stały dostęp do pakietu danych lub pobierz pakiet dowodowy jako ZIP.",
      caption:
        "Dostawca udostępnia z własnego workspace; workspace kupującego pobiera pakiet. Surowe dane gospodarstwa nigdy nie opuszczają strony, która jest ich właścicielem. Jeszcze nie działa.",
    },
  },
  scan: {
    ariaLabel: "Poziomy ryzyka krajów",
    eyebrow: "Klasyfikacja ryzyka EUDR",
    heading: "Poziom ryzyka kraju pochodzenia określa zakres obowiązków.",
    sub: "Artykuł 29 przypisuje każdy kraj do jednego z trzech poziomów ryzyka, a poziom decyduje, ile należytej staranności jest wymagane i jak często odbywają się kontrole. Wystarczy wybrać poziom, aby zobaczyć, jak zmieniają się obowiązki.",
    tierAria: "Poziom ryzyka",
    tiers: {
      low: "Niskie ryzyko",
      standard: "Ryzyko standardowe",
      high: "Wysokie ryzyko",
    },
    fields: {
      low: [
        "140 krajów w zakresie",
        "Cała UE, USA, Chiny",
        "Zebrać dane, złożyć DDS",
        "Ocena ryzyka niewymagana",
        "Środki ograniczające niewymagane",
        "Około 1% podmiotów sprawdzanych",
      ],
      standard: [
        "Około 50 krajów",
        "Brazylia, Wybrzeże Kości Słoniowej, Indonezja",
        "Pełna ocena ryzyka, każda partia",
        "Środki ograniczające, gdy wykryto ryzyko",
        "Brak uproszczonego oświadczenia",
        "Około 3% podmiotów kontrolowanych",
      ],
      high: [
        "4 kraje",
        "Białoruś, Mjanma, Korea Północna, Rosja",
        "Pełny program należytej staranności",
        "Co najmniej 9% podmiotów sprawdzanych",
        "Co najmniej 9% wolumenów sprawdzanych",
        "Dostawy zatrzymywane i badane",
      ],
    },
    caption:
      "Lista to benchmarking krajów z maja 2025 (rozporządzenie wykonawcze (UE) 2025/1093). Ryzyko standardowe jest regułą, bez uproszczonego oświadczenia.",
    facts: {
      low: "140 krajów, w tym każde państwo UE, USA i Chiny. Zebrać dane i złożyć DDS; brak wymogu oceny ryzyka i środków ograniczających. Około 1% podmiotów sprawdzanych.",
      standard:
        "Około 50 krajów, wśród nich Brazylia, Wybrzeże Kości Słoniowej i Indonezja. Pełna ocena ryzyka przy każdej partii, środki ograniczające tam, gdzie wykryto ryzyko. Około 3% podmiotów kontrolowanych.",
      high: "Białoruś, Mjanma, Korea Północna, Rosja. Pełny program należytej staranności, co najmniej 9% podmiotów i wolumenów sprawdzanych, dostawy zatrzymywane i badane.",
    },
  },
  flag: {
    ariaLabel: "Alerty satelitarne",
    eyebrow: "Alerty o wylesianiu",
    heading: "Gdy alert satelitarny oznacza zgodną działkę.",
    lead: "Z orbity rutynowa praca w gospodarstwie wygląda jak wylesienie. Zgodne z prawem gospodarstwo i tak może wywołać alert.",
    text: "Przycinanie drzew cieniujących, cięcie na pniaki dla odnowienia, granica poprowadzona zbyt blisko skraju lasu, tropikalna pokrywa chmur: satelita odczytuje to wszystko jako utratę pokrywy drzewnej. Dlatego prawo pozwala się wytłumaczyć, zamiast wymagać zerowej liczby alertów. Wystarczy wybrać powód i załączyć wpis z rejestru lub stare zdjęcie lotnicze, a wyjaśnienie trafia do oświadczenia, które czyta organ. Tu, przy biurku, gasną prawie wszystkie alerty.",
    reasons: [
      "przycinanie cieniujących",
      "cięcie na pniaki",
      "błąd geometrii",
      "pokrywa chmur",
      "sąsiadujący las",
      "uprawa sprzed 2020",
    ],
    shot: {
      alt: "Ekran rozwiązywania oznaczonej działki w Bindu: ustalenie satelitarne na jednej działce, powód, dla którego działka mimo to powinna zostać zgłoszona, załączony dowód i wyjaśnienie podmiotu dla organu.",
      caption:
        "Jedna oznaczona działka, rozwiązana przy biurku: powód wybrany, wpis z rejestru załączony, wyjaśnienie przeniesione do oświadczenia, które czyta organ.",
    },
  },
  calendar: {
    ariaLabel: "Terminy, które obowiązują",
    eyebrow: "Terminy EUDR",
    heading: "Terminy, które obowiązują teraz.",
    sub: "Rozporządzenie przesunięto dwa razy i raz uproszczono. Terminy z 2024 i początku 2025 nie obowiązują. Poniżej są te, które obowiązują, a termin jest blisko.",
    rows: [
      {
        when: "31 gru 2020",
        flag: "Data graniczna",
        body: "Data graniczna. Ziemia wykarczowana po tej dacie jest niezgodna, niezależnie od tego, czy karczowanie było lokalnie legalne, i nie resetuje się, gdy ziemia zmienia właściciela.",
      },
      {
        when: "29 cze 2023",
        body: "Rozporządzenie (UE) 2023/1115 wchodzi w życie, zastępując dawne rozporządzenie w sprawie drewna i uruchamiając zegar zgodności.",
      },
      {
        when: "22 maja 2025",
        body: "Publikowana jest pierwsza lista benchmarkingu krajów (rozporządzenie wykonawcze (UE) 2025/1093), dzieląca pochodzenia na niskie, standardowe i wysokie ryzyko.",
      },
      {
        when: "23 gru 2025",
        body: "Rozporządzenie (UE) 2025/2650: drugie przesunięcie plus realne uproszczenie. Oświadczenia roczne, druki usunięte z zakresu, podmioty na dalszym etapie ponownie wykorzystują numer referencyjny z wcześniejszego etapu.",
      },
      {
        when: "30 gru 2026",
        flag: "Termin",
        body: "Data rozpoczęcia stosowania dla dużych i średnich podmiotów. Prawdziwy termin, i jest blisko.",
      },
      {
        when: "30 cze 2027",
        body: "Data rozpoczęcia stosowania dla mikro- i małych podmiotów.",
      },
    ],
  },
  close: {
    ariaLabel: "Potwierdzenie",
    eyebrow: "Numer referencyjny TRACES",
    heading: "Zgłoszenie kończy się dwoma numerami z TRACES.",
    sub: "Numer referencyjny dla cła i numer weryfikacyjny do akt, nadane przez TRACES w chwili złożenia. Za nimi Bindu prowadzi pięcioletni skarbiec dowodów i aktualizuje Państwa zgłoszenia, gdy przepisy znów się zmienią. W efekcie łatwiej pokazać unijnym kupującym, że są Państwo dostawcą niskiego ryzyka.",
    shot: {
      alt: "Potwierdzenie TRACES w Bindu: przyjęte oświadczenie o należytej staranności, z numerem referencyjnym DDS dla cła i numerem weryfikacyjnym do akt.",
      caption:
        "Przyjęte przez TRACES. Numer referencyjny podróżuje z dostawą; dowód za nim pozostaje przechowywany przez pięć lat.",
    },
    badges: [
      { head: "Zero mieszania", body: "partie zweryfikowane i niezweryfikowane trzymane osobno" },
      { head: "Skarbiec 5-letni", body: "dowody powiązane hashem, każdy aktor" },
      { head: "Przepisy śledzone", body: "zgłoszenia aktualizowane, gdy prawo się zmienia" },
    ],
    demo: {
      heading: "Umów 30-minutowe demo",
      body: "Wystarczy przyprowadzić jednego dostawcę: jego działki wyjdą z demo już zwalidowane.",
    },
    cbam: {
      heading: "CBAM",
      body: "Drugi mechanizm węglowy na granicy, na żywo na osobnej stronie.",
    },
  },
  pricing: {
    locale: "pl-PL",
    ariaLabel: "Cena",
    eyebrow: "Cena",
    heading: "Ile kosztuje dokumentacja EUDR.",
    cta: "Umów 30-minutowe demo",
    planEyebrow: "EUDR · dokumentacja należytej staranności",
    unit: (p) =>
      `za dokumentację. ${p.eudrFiling} za złożenie, ${p.eudrRetain5} za przechowanie.`,
    badge: "Za zgłoszenie",
    vs: "bez stanowisk, bez rocznej licencji",
    lines: (p) => [
      `${p.eudrFiling} składa DDS w TRACES i zwraca numer referencyjny wymagany przez urząd celny.`,
      `${p.eudrRetain5} przechowuje je przez pięć lat wymaganych przez prawo.`,
      `${p.eudrRetain10} przechowuje je przez pełne dziesięć lat.`,
      `${p.workspaceMonth} miesięcznie utrzymuje workspace w gotowości do składania.`,
    ],
    industryLabel: "Branża:",
    industry:
      "Alternatywy rozliczają się za stanowisko lub za rok. Bindu rozlicza się za złożone dossier.",
    note: (p) =>
      `Utrzymanie aktywnego workspace kosztuje ${p.workspaceMonth} miesięcznie. Hostowane w UE, zgodne z RODO. Ceny bez VAT.`,
  },
  faqBand: {
    ariaLabel: "Częste pytania",
    heading: "Częste pytania o EUDR.",
  },
  seo: {
    title: "Rozporządzenie EUDR: co to, kogo dotyczy i od kiedy",
    description:
      "Rozporządzenie EUDR, czyli rozporządzenie (UE) 2023/1115: co to, kogo dotyczy, jakie produkty, obowiązki importera i od kiedy obowiązuje. Zgłoszenie w TRACES.",
    ogTitle: "EUDR dla importerów: co zebrać i do kiedy",
    ogDescription:
      "Siedem towarów, geolokalizacja na poziomie działki, poziomy ryzyka krajów i oświadczenie o należytej staranności w TRACES. Terminy, które naprawdę obowiązują po dwóch przesunięciach.",
    ogImageAlt: "Korona lasu obok wykarczowanego terenu",
    jsonLd: {
      headline: "EUDR dla importerów: co zebrać i do kiedy",
      description:
        "Rozporządzenie o wylesianiu (UE) 2023/1115 dla importerów: siedem objętych towarów, geolokalizacja działek, oświadczenie o należytej staranności w TRACES, benchmarking krajów i terminy obowiązujące po dwóch przesunięciach.",
      faq: [
        {
          question: "Jakie towary obejmuje EUDR?",
          answer:
            "Siedem: bydło, kakao, kawa, olej palmowy, kauczuk, soja i drewno, plus określona lista wyrobów z nich pochodnych (skóra, czekolada, meble, papier, opony i więcej). Ustalone w rozporządzeniu (UE) 2023/1115.",
        },
        {
          question: "Od kiedy EUDR zaczyna obowiązywać?",
          answer:
            "Dla dużych i średnich podmiotów oraz podmiotów handlowych od 30 grudnia 2026; dla osób fizycznych oraz mikro- i małych przedsiębiorstw od 30 czerwca 2027. Terminy te ustaliło rozporządzenie (UE) 2025/2650 (art. 38), drugie przesunięcie pierwotnego terminu z 2024.",
        },
        {
          question: "Czym jest oświadczenie o należytej staranności EUDR (DDS)?",
          answer:
            "Oświadczenie składane w systemie informacyjnym EUDR TRACES, zanim objęty towar zostanie wprowadzony na rynek UE lub z niego wywieziony. Potwierdza, że dochowano należytej staranności i ryzyko wylesienia jest znikome, oraz odsyła do geolokalizacji działek. Złożenie zwraca numer referencyjny DDS używany przy odprawie celnej.",
        },
        {
          question: "Jakich danych geolokalizacji wymaga EUDR?",
          answer:
            "Współrzędnych geograficznych (szerokość i długość) każdej działki, na której wyprodukowano towar: pojedynczego punktu dla działek poniżej 4 hektarów i poligonu dla działek 4 hektary lub większych. Współrzędne podaje się zgodnie z art. 9.",
        },
        {
          question: "Jakie są kary za niezgodność z EUDR?",
          answer:
            "Artykuł 25 wyznacza minimum, które muszą przewidzieć państwa członkowskie, a nie wysokość konkretnej kary: maksymalna wysokość grzywny musi wynosić co najmniej 4% całkowitego rocznego obrotu podmiotu w Unii, do tego konfiskata towaru i uzyskanych z niego przychodów oraz czasowe wykluczenie z zamówień publicznych i finansowania publicznego.",
        },
        {
          question: "Kto składa oświadczenie o należytej staranności EUDR?",
          answer:
            "Podmiot (pierwszy wprowadzający towar na rynek UE) lub podmiot solo, który importuje i trzyma cały łańcuch. Podmioty handlowe, przetwórcy na dalszym etapie i producenci nie składają własnego DDS: przenoszą lub dostarczają dane i ponownie wykorzystują numer referencyjny DDS z wcześniejszego etapu.",
        },
        {
          question: "Czy podmiot handlowy może ponownie wykorzystać numer referencyjny DDS dostawcy?",
          answer:
            "Tak. Podmiot handlowy kupujący i sprzedający towar już obecny na rynku UE, bez zmian, nie składa nowego oświadczenia. Zachowuje i przekazuje dalej numery referencyjne DDS swoich dostawców. Przetwórcy na dalszym etapie tak samo przenoszą numery z wcześniejszego etapu wraz z przetworzonym produktem.",
        },
        {
          question: "Jak dostawcy dzielą się danymi EUDR, nie tracąc nad nimi kontroli?",
          answer:
            "Bindu buduje udostępnianie, w którym każda strona trzyma swoje działki, faktury i dokumenty we własnym workspace i przyznaje kupującemu dostęp do pakietu danych zamiast wysyłać kopię mailem; surowe dane gospodarstwa nigdy nie opuszczają wtedy strony, która jest ich właścicielem. To udostępnianie nie jest jeszcze dostępne. Do tego czasu wgrywasz to, co przysyłają dostawcy, do własnego dossier, i nic nie opuszcza Twojego workspace.",
        },
      ],
    },
  },
};
