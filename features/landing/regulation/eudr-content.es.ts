/**
 * Spanish (es) EUDR page content. Phase-2 locale.
 *
 * Spain uses "EUDR" as the dominant search term (RDUE has little volume there),
 * so EUDR leads and "reglamento de deforestación" supports it. Untranslated by
 * rule: CN codes, TRACES, GeoJSON, Bindu, and the NUMBER of every regulation,
 * article, annex and date. The words around them follow EUR-Lex Spanish:
 * Reglamento (UE) 2023/1115, artículo 9, apartado 1, letra d, anexo I, and
 * dates in Spanish format. Register is formal (usted) throughout. The DDS
 * acronym is kept; its expansion is localized once as "declaración de
 * diligencia debida (DDS)". No em-dash.
 */

import type { EudrContent } from "./eudr-content";

export const eudrContentES: EudrContent = {
  lang: "es",
  hero: {
    label: "EUDR: qué recopilar, y cuándo",
    code: "Reglamento (UE) 2023/1115 · EUDR · Grandes operadores 30 dic. 2026",
    title: "EUDR: qué recopilar, y para cuándo.",
    sub: "Siete materias primas, una fecha límite: **31 de diciembre de 2020**. A partir de ahí, cada parcela debe geolocalizarse y cada lote demostrarse legal antes de que una **declaración de diligencia debida (DDS)** haga pasar el envío por la aduana.",
    cta: "Reservar una demo de 30 minutos",
    ctaSecondary: "Ver los cinco pasos",
  },
  problem: {
    ariaLabel: "El problema",
    eyebrow: "Responsabilidad del operador EUDR",
    heading: "La prueba nace en el campo, pero la responsabilidad recae en el importador.",
    lead: "Un saco de cacao pasa por un agricultor, una cooperativa y un exportador antes de que un importador de la UE lo vea. La prueba que la ley exige, la parcela exacta en la que creció y que la tierra no se taló después del **31 de diciembre de 2020** ni se cultivó contra la ley local, nace en la primera mano y tiene que sobrevivir a todas las siguientes. Rompa la cadena en cualquier punto y es el **importador** quien paga la multa.",
    nodes: [
      { name: "Parcela", tier: "Agricultor" },
      { name: "Cooperativa", tier: "Enlace" },
      { name: "Exportador", tier: "Comerciante" },
      { name: "Importador", tier: "Presenta la DDS" },
    ],
    lostLabel:
      "Donde se rompen los datos: una coordenada que falta, un título perdido, registros que nadie llevó",
    flowCaption:
      "El importador presenta, pero la prueba nace en la parcela. Coordenadas, título de la tierra, registros de cosecha: pierda cualquiera de ellos en un traspaso y el contenedor se detiene en la frontera.",
    stats: [
      "materias primas que ahora necesitan un origen geolocalizado y legal",
      "del volumen de negocio en la UE, el nivel que pueden alcanzar las multas",
      "de bosque perdido al año, según la FAO; cerca de una décima parte ligada a la demanda de la UE",
      "mezcla tolerada. Un solo saco sin verificar hace fallar todo el contenedor",
    ],
    verdictQuote:
      "Durante décadas bastó la confianza para meter contenedores en Europa: la palabra de un proveedor, el logo de un sello, y listo. Ahora la ley quiere ver la tierra en la que creció la mercancía.",
    verdictCite: "EUDR · Reglamento (UE) 2023/1115 · en palabras sencillas",
  },
  journey: {
    ariaLabel: "El recorrido",
    eyebrow: "Proceso de presentación EUDR",
    heading: "La presentación EUDR en cinco pasos.",
    sub: "Ganado bovino, cacao, café, aceite de palma, caucho, soja, madera: ponga cualquiera en el mercado de la UE y el reglamento de deforestación hace **cinco preguntas**. Aquí está cada exigencia y la pantalla de Bindu que la responde, seguidas a través de un envío real de café, del campo a la presentación.",
    codes:
      "Principales partidas CN del anexo I: café 0901 · cacao 1801 · soja 1201 · aceite de palma 1511 · ganado 0102 · caucho 4001 · madera 4401.",
    steps: [
      {
        ask: "¿Dónde creció?",
        art: "Art. 9.1.d)",
        law: "Coordenadas para cada parcela que alimentó el lote, sin muestreo: un punto de seis decimales por debajo de 4 hectáreas, un límite trazado por encima. El ganado bovino es la única materia prima para la que un punto único nunca basta.",
        caption:
          "Busque en el mapa, coloque puntos, trace límites o suba un GeoJSON. Las parcelas se guardan una vez y se reutilizan en cada envío posterior.",
        alt: "Pantalla de mapeo de explotaciones en Bindu: parcelas de café cerca de Badulla, Sri Lanka, capturadas como puntos GPS y un límite trazado, cada una con coordenadas de seis decimales.",
      },
      {
        ask: "¿Era bosque el 31 de diciembre de 2020?",
        art: "Art. 3.a)",
        law: "Nada cultivado en tierra deforestada después de la fecha límite puede entrar en el mercado de la UE, fuese o no legal la tala allí donde ocurrió.",
        caption:
          "Tres comprobaciones satelitales independientes por parcela, minutos por lote. Señalan el riesgo; la conclusión jurídica sigue siendo suya.",
        alt: "Tabla de resultados de la comprobación forestal en Bindu: cuatro parcelas salieron limpias, una parcela señalada con el hallazgo satelital y una acción Resolver.",
      },
      {
        ask: "¿Se cultivó legalmente?",
        art: "Art. 2.40",
        law: "Legal según la ley del país de producción, en ocho ámbitos: derechos sobre la tierra, medio ambiente, normas forestales, derechos de terceros, trabajo, derechos humanos, CLPI, fiscalidad y comercio.",
        caption:
          "Ocho preguntas por presentación, prueba adjunta donde la tenga. Un no necesita un motivo; los derechos sobre la tierra necesitan un documento.",
        alt: "Lista de verificación de legalidad en Bindu: los ocho ámbitos legales del artículo 2, apartado 40, respondidos, con los documentos de prueba subidos.",
      },
      {
        ask: "¿Quién responde por ello?",
        art: "Art. 4.2",
        law: "El operador declara, en una declaración de diligencia debida, que el riesgo de incumplimiento es insignificante, y sigue siendo responsable de lo que la declaración afirma.",
        caption:
          "La declaración se compone sola a partir de sus parcelas, cosechas y comprobaciones. La revisa, corrige lo que no cuadre y confirma.",
        alt: "Pantalla de declaración en Bindu: el resumen de diligencia debida EUDR generado, con producto, parcelas, resultados de las comprobaciones y declaraciones de legalidad.",
      },
      {
        ask: "¿Cómo llega a la frontera?",
        art: "Art. 33",
        law: "La declaración se presenta en TRACES, el sistema de información EUDR, antes de que la mercancía se ponga en el mercado o se exporte.",
        caption:
          "Un clic hacia TRACES. El número de referencia vuelve y viaja en la declaración aduanera.",
        alt: "Pantalla de presentación en Bindu: la declaración de diligencia debida lista para enviarse al sistema TRACES de la UE.",
      },
    ],
  },
  chain: {
    ariaLabel: "La cadena",
    eyebrow: "Datos de proveedores",
    heading: "Una sola parte presenta la DDS. Los datos vienen de toda la cadena.",
    sub: "Una sola parte es responsable, pero la prueba que necesita está repartida entre cinco. Esta es la cadena para la que se construye Bindu. La parte que permite a esos actores entregarse pruebas todavía está en construcción: hoy una presentación se arma dentro de un solo espacio de trabajo y nada pasa a otra empresa.",
    subhead: "Quién presenta la DDS y quién aporta los datos",
    filesBadge: "Presenta la DDS",
    noFilesBadge: "Sin DDS propia",
    roles: [
      {
        role: "Operador único",
        body: "Importa y ya tiene toda la cadena: mapas de las explotaciones, registros de cosecha, legalidad. Nada que recoger de nadie más.",
      },
      {
        role: "Operador",
        body: "El primero en poner la mercancía en el mercado de la UE. Recoge los mapas y registros de sus proveedores y luego presenta la DDS.",
      },
      {
        role: "Comerciante",
        body: "Compra y vende mercancía ya en el mercado, sin cambios. Conserva y transmite los números de referencia DDS de sus proveedores.",
      },
      {
        role: "Fabricante posterior",
        body: "Transforma la mercancía en otro producto antes de revenderlo. Lleva consigo las referencias DDS anteriores con el nuevo artículo.",
      },
      {
        role: "Productor (explotación o cooperativa)",
        body: "Cultiva la materia prima. Empaqueta sus parcelas y registros de legalidad como un paquete de datos para el comprador que presenta.",
      },
    ],
    invite: {
      heading: "Invita a tus proveedores a compartir sus datos.",
      body: "**En construcción.** El operador abre una presentación y la cadena ya está ahí. Un productor o comerciante que compartió un paquete aparece en **Compartido con usted**, listo con un clic. ¿Aún no hay proveedor registrado? Suelte su factura y Bindu la lee y envía la invitación. El exportador no persigue a nadie por correo. Todavía no está activo.",
    },
    supplierShot: {
      alt: "Paso de cadena de una presentación EUDR en Bindu: paquetes de datos que un productor ya compartió esperando a usarse, junto a una zona de soltado de factura que lee al proveedor y lo invita.",
      caption:
        "El paquete del socio ya está esperando: un clic, sin volver a teclear. O suelte la factura y Bindu lee al proveedor y lo invita a la cadena. Todavía no está activo.",
    },
    share: {
      heading: "Da acceso a un comprador sin enviar una copia.",
      body: "**En construcción.** Cada parcela, factura y documento se queda en el espacio de trabajo que lo creó. Una autorización de acceso concede al comprador acceso permanente, nunca envía una copia: su espacio de trabajo tira del paquete, o se lleva el ZIP sin conexión. Así una explotación demuestra a sus compradores que es de bajo riesgo sin entregar sus coordenadas. Todavía no está activo.",
    },
    shareShot: {
      alt: "Panel de uso compartido en Bindu: conceder al espacio de trabajo de un comprador acceso permanente a un paquete de datos, o descargar el paquete de pruebas en ZIP.",
      caption:
        "El proveedor comparte desde su propio espacio de trabajo; el espacio del comprador tira del paquete. Los datos brutos de la explotación nunca abandonan a la parte que es su propietaria. Todavía no está activo.",
    },
  },
  scan: {
    ariaLabel: "Niveles de riesgo por país",
    eyebrow: "Clasificación de riesgo EUDR",
    heading: "El nivel de riesgo del país de origen determina tus obligaciones.",
    sub: "El artículo 29 clasifica cada país en tres niveles de riesgo, y el nivel decide cuánta diligencia se exige y con qué frecuencia le controlan. Elija un nivel. Vea cómo cambia lo que se exige.",
    tierAria: "Nivel de riesgo",
    tiers: {
      low: "Riesgo bajo",
      standard: "Riesgo estándar",
      high: "Riesgo alto",
    },
    fields: {
      low: [
        "140 países en el ámbito",
        "Toda la UE, EE. UU., China",
        "Recopile los datos, presente la DDS",
        "Sin evaluación de riesgos requerida",
        "Sin medidas de mitigación requeridas",
        "Alrededor del 1 % de operadores controlados",
      ],
      standard: [
        "Alrededor de 50 países",
        "Brasil, Costa de Marfil, Indonesia",
        "Evaluación de riesgos completa, cada lote",
        "Mitigación donde se encuentre riesgo",
        "Sin declaración simplificada",
        "Alrededor del 3 % de operadores inspeccionados",
      ],
      high: [
        "4 países",
        "Bielorrusia, Myanmar, Corea del Norte, Rusia",
        "El programa completo de diligencia debida",
        "Al menos el 9 % de operadores controlados",
        "Al menos el 9 % de volúmenes controlados",
        "Envíos detenidos y examinados",
      ],
    },
    caption:
      "La lista es la clasificación de países de mayo de 2025 (Reglamento de Ejecución (UE) 2025/1093). El riesgo estándar es el valor por defecto y no da derecho a la declaración simplificada.",
    facts: {
      low: "140 países, incluidos cada Estado de la UE, EE. UU. y China. Recopile los datos y presente la DDS; sin evaluación de riesgos, sin mitigación requerida. Alrededor del 1 % de operadores controlados.",
      standard:
        "Alrededor de 50 países, entre ellos Brasil, Costa de Marfil e Indonesia. Evaluación de riesgos completa en cada lote, mitigación donde se encuentre riesgo. Alrededor del 3 % de operadores inspeccionados.",
      high: "Bielorrusia, Myanmar, Corea del Norte, Rusia. El programa completo de diligencia debida, al menos el 9 % de operadores y volúmenes controlados, envíos detenidos y examinados.",
    },
  },
  flag: {
    ariaLabel: "Alertas satelitales",
    eyebrow: "Alertas de deforestación",
    heading: "Cuando una alerta satelital señala una parcela conforme.",
    lead: "Desde la órbita, el trabajo agrícola rutinario parece deforestación. Una explotación conforme puede aun así disparar una alerta.",
    text: "Poda de sombra, recepa para la regeneración, un límite trazado demasiado cerca del borde del bosque, una capa de nubes tropicales: todo se lee como pérdida de cubierta arbórea. Lo que la ley pide es un motivo documentado; elíjalo, adjunte el asiento del registro o la vieja foto aérea, y su explicación pasa a la declaración que lee la autoridad. La mayoría de estas alertas se resuelven en un escritorio. Este es ese escritorio.",
    reasons: [
      "poda de sombra",
      "recepa",
      "error de geometría",
      "capa de nubes",
      "bosque adyacente",
      "cultivo anterior a 2020",
    ],
    shot: {
      alt: "Pantalla de resolución de una parcela señalada en Bindu: un hallazgo satelital en una parcela, el motivo por el que la parcela debe presentarse igualmente, la prueba adjunta y la explicación del operador para la autoridad.",
      caption:
        "Una parcela señalada, resuelta en un escritorio: motivo elegido, asiento del registro adjunto, explicación llevada a la declaración que lee la autoridad.",
    },
  },
  calendar: {
    ariaLabel: "Las fechas que aplican",
    eyebrow: "Plazos EUDR",
    heading: "Los plazos que aplican ahora.",
    sub: "El reglamento se aplazó dos veces y se simplificó una. Ignore los plazos de 2024 y principios de 2025 que haya podido leer. Estos son los que están en vigor, y el plazo está cerca.",
    rows: [
      {
        when: "31 dic. 2020",
        flag: "La fecha límite",
        body: "La fecha límite. La tierra talada después de esta fecha es no conforme, fuese o no legal la tala localmente, y no se reinicia cuando la tierra cambia de manos.",
      },
      {
        when: "29 jun. 2023",
        body: "El Reglamento (UE) 2023/1115 entra en vigor. Sustituye al antiguo reglamento de la madera y pone en marcha el reloj del cumplimiento.",
      },
      {
        when: "22 may. 2025",
        body: "Se publica la primera lista de clasificación de países (Reglamento de Ejecución (UE) 2025/1093). Clasifica los orígenes en riesgo bajo, estándar y alto.",
      },
      {
        when: "23 dic. 2025",
        body: "Reglamento (UE) 2025/2650: un segundo aplazamiento junto con una simplificación real. Declaraciones anuales, impresos retirados del ámbito, los operadores posteriores reutilizan el número de referencia anterior.",
      },
      {
        when: "30 dic. 2026",
        flag: "El plazo",
        body: "Fecha de aplicación para grandes y medianos operadores. El plazo de verdad, y está cerca.",
      },
      {
        when: "30 jun. 2027",
        body: "Fecha de aplicación para micro y pequeños operadores.",
      },
    ],
  },
  close: {
    ariaLabel: "El recibo",
    eyebrow: "Número de referencia TRACES",
    heading: "La presentación termina con dos números de TRACES.",
    sub: "Un número de referencia para la aduana y un número de verificación para el expediente, emitidos por TRACES en el momento en que presenta. Bindu mantiene detrás la caja fuerte de pruebas a cinco años y actualiza sus presentaciones cuando las reglas vuelven a cambiar. El beneficio: cualquier comprador europeo ve de un vistazo que es de bajo riesgo.",
    shot: {
      alt: "Recibo de TRACES en Bindu: la declaración de diligencia debida aceptada, con el número de referencia DDS para la aduana y el número de verificación para el expediente.",
      caption:
        "Aceptada por TRACES. El número de referencia viaja con el envío; la prueba que hay detrás se conserva durante cinco años.",
    },
    badges: [
      { head: "Cero mezcla", body: "lotes verificados y sin verificar separados" },
      { head: "Caja fuerte 5 años", body: "pruebas encadenadas por hash, cada actor" },
      { head: "Reglas seguidas", body: "presentaciones actualizadas cuando la ley cambia" },
    ],
    demo: {
      heading: "Reservar una demo de 30 minutos",
      body: "Traiga un proveedor. Salga con sus parcelas validadas.",
    },
    cbam: {
      heading: "CBAM",
      body: "La otra regla del carbono en la frontera, en vivo en su propia página.",
    },
  },
  pricing: {
    locale: "es-ES",
    ariaLabel: "Precio",
    eyebrow: "Precio",
    heading: "Lo que cuesta un expediente EUDR.",
    cta: "Reservar una demo de 30 minutos",
    planEyebrow: "EUDR · expediente de diligencia debida",
    unit: (p) =>
      `por expediente. ${p.eudrFiling} para presentar, ${p.eudrRetain5} para conservar.`,
    badge: "Por presentación",
    vs: "sin puestos, sin licencia anual",
    lines: (p) => [
      `${p.eudrFiling} presenta la DDS en TRACES y devuelve la referencia que pide la aduana.`,
      `${p.eudrRetain5} la conserva los cinco años que exige la ley.`,
      `${p.eudrRetain10} la conserva los diez años completos.`,
      `${p.workspaceMonth} al mes mantienen su workspace activo para presentar.`,
    ],
    industryLabel: "Sector:",
    industry:
      "Las alternativas facturan por puesto o por año. Bindu factura por expediente presentado.",
    note: (p) =>
      `Mantener su workspace activo cuesta ${p.workspaceMonth} al mes. Alojado en la UE, conforme al RGPD. Precios sin IVA.`,
  },
  faqBand: {
    ariaLabel: "Preguntas frecuentes",
    heading: "Preguntas frecuentes sobre el EUDR.",
  },
  seo: {
    title: "EUDR: reglamento de deforestación, plazos y diligencia",
    description:
      "El EUDR, reglamento de la UE sobre deforestación (2023/1115): siete materias primas, geolocalización, diligencia debida en TRACES y los plazos que aplican.",
    ogTitle: "EUDR para importadores: qué recopilar, y cuándo",
    ogDescription:
      "Siete materias primas, geolocalización a nivel de parcela, niveles de riesgo por país y la declaración de diligencia debida en TRACES. Las fechas que de verdad aplican tras dos aplazamientos.",
    ogImageAlt: "Dosel forestal junto a tierra talada",
    jsonLd: {
      headline: "EUDR para importadores: qué recopilar, y cuándo",
      description:
        "El reglamento de la UE sobre deforestación (Reglamento (UE) 2023/1115) para importadores: las siete materias primas cubiertas, la geolocalización de parcelas, la declaración de diligencia debida en TRACES, la clasificación de países y las fechas que aplican tras dos aplazamientos.",
      faq: [
        {
          question: "¿Qué materias primas cubre el EUDR?",
          answer:
            "Siete: ganado bovino, cacao, café, aceite de palma, caucho, soja y madera, más una lista definida de productos derivados de ellas (cuero, chocolate, muebles, papel, neumáticos y más). Fijado en el Reglamento (UE) 2023/1115.",
        },
        {
          question: "¿Desde cuándo se aplica el EUDR?",
          answer:
            "Para grandes y medianos operadores y comerciantes, el 30 de diciembre de 2026; para personas físicas y micro y pequeñas empresas, el 30 de junio de 2027. Estas fechas las fijó el Reglamento (UE) 2025/2650 (artículo 38), el segundo aplazamiento del plazo original de 2024.",
        },
        {
          question: "¿Qué es una declaración de diligencia debida EUDR (DDS)?",
          answer:
            "Una declaración presentada en el sistema de información TRACES de la UE antes de que la mercancía cubierta se ponga en el mercado de la UE o se exporte desde él. Confirma que se ejerció la diligencia debida y que el riesgo de deforestación es insignificante, y remite a la geolocalización de las parcelas. La presentación devuelve un número de referencia DDS que se usa en la aduana.",
        },
        {
          question: "¿Qué datos de geolocalización exige el EUDR?",
          answer:
            "Las coordenadas geográficas (latitud y longitud) de cada parcela donde se produjo la materia prima: un único punto para parcelas de menos de 4 hectáreas y un polígono para parcelas de 4 hectáreas o más. Las coordenadas se aportan conforme al artículo 9.",
        },
        {
          question: "¿Cuáles son las sanciones por incumplir el EUDR?",
          answer:
            "El artículo 25 fija el mínimo que los Estados miembros deben prever, no el importe de la multa que usted recibiría: el importe máximo de la multa debe ser al menos el 4 % del volumen de negocio anual total del operador en toda la Unión, con el decomiso de la mercancía y de los ingresos obtenidos de ella, y la exclusión temporal de la contratación pública y de la financiación pública.",
        },
        {
          question: "¿Quién presenta la declaración de diligencia debida EUDR?",
          answer:
            "El operador (el primero en poner la mercancía en el mercado de la UE) o un operador único que importa y tiene toda la cadena. Comerciantes, fabricantes posteriores y productores no presentan su propia DDS: llevan o aportan los datos y reutilizan el número de referencia DDS anterior.",
        },
        {
          question: "¿Puede un comerciante reutilizar la referencia DDS de un proveedor?",
          answer:
            "Sí. Un comerciante que compra y vende mercancía ya en el mercado de la UE, sin cambios, no presenta una nueva declaración. Conserva y transmite los números de referencia DDS de sus proveedores. Los fabricantes posteriores llevan igualmente las referencias anteriores con el producto transformado.",
        },
        {
          question: "¿Cómo comparten los proveedores los datos EUDR sin perder su control?",
          answer:
            "Bindu está construyendo un modo de compartir en el que cada parte guarda sus parcelas, facturas y documentos en su propio espacio de trabajo y concede a su comprador acceso a un paquete de datos en lugar de enviar una copia por correo; así los datos brutos de la explotación nunca abandonan a la parte que es su propietaria. Ese modo de compartir todavía no está activo. Hasta entonces, usted carga lo que le envían sus proveedores en su propio dossier, y nada sale de su espacio de trabajo.",
        },
      ],
    },
  },
};
