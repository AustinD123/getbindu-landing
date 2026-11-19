/**
 * French (fr) EUDR page content. Phase-2 locale.
 *
 * French uses its own acronym RDUE (Règlement Déforestation de l'Union
 * Européenne), which carries real search volume alongside EUDR, so both appear.
 * Untranslated by rule: CN codes, TRACES, GeoJSON, Bindu, and the NUMBER of
 * every regulation, article, annex and date. The words around them follow
 * EUR-Lex French: règlement (UE) 2023/1115, article 9, paragraphe 1, point d,
 * annexe I, and dates in French format. The DDS acronym is kept; its expansion
 * is localized once as "déclaration de diligence raisonnée (DDS)". No em-dash.
 */

import type { EudrContent } from "./eudr-content";

export const eudrContentFR: EudrContent = {
  lang: "fr",
  hero: {
    label: "RDUE : quoi collecter, et quand",
    code: "règlement (UE) 2023/1115 · RDUE · Grands opérateurs 30 déc. 2026",
    title: "RDUE : ce qu'il faut collecter, et quand.",
    sub: "Sept matières premières, une date butoir : **31 décembre 2020**. À partir de là, chaque parcelle doit être géolocalisée et chaque lot prouvé légal avant qu'une **déclaration de diligence raisonnée (DDS)** ne fasse passer l'expédition en douane.",
    cta: "Réserver une démo de 30 minutes",
    ctaSecondary: "Voir les cinq étapes",
  },
  problem: {
    ariaLabel: "Le problème",
    eyebrow: "Responsabilité de l'opérateur EUDR",
    heading: "La preuve naît au champ, mais c'est l'importateur qui est responsable.",
    lead: "Un sac de cacao passe par un producteur, une coopérative et un exportateur avant qu'un importateur de l'UE ne le voie. La preuve que la loi exige, la parcelle exacte où il a poussé et le fait que la terre n'a pas été défrichée après le **31 décembre 2020** ni cultivée contre le droit local, naît dès la première main et doit survivre à toutes les suivantes. Rompez la chaîne quelque part et c'est l'**importateur** qui paie l'amende.",
    nodes: [
      { name: "Parcelle", tier: "Producteur" },
      { name: "Coopérative", tier: "Relais" },
      { name: "Exportateur", tier: "Commerçant" },
      { name: "Importateur", tier: "Dépose la DDS" },
    ],
    lostLabel:
      "Là où les données se brisent : une coordonnée manquante, un titre perdu, des registres jamais tenus",
    flowCaption:
      "L'importateur dépose, mais la preuve naît à la parcelle. Coordonnées, titre foncier, registres de récolte : perdez-en un seul lors d'un transfert et le conteneur reste bloqué à la frontière.",
    stats: [
      "matières premières qui exigent désormais une origine géolocalisée et légale",
      "du chiffre d'affaires dans l'UE, le niveau que peuvent atteindre les amendes",
      "de forêt perdue par an, selon la FAO ; environ un dixième lié à la demande de l'UE",
      "mélange toléré. Un seul sac non vérifié fait échouer tout le conteneur",
    ],
    verdictQuote:
      "Pendant des décennies, la confiance a suffi à faire entrer les conteneurs en Europe : la parole d'un fournisseur, le logo d'un label, et c'était réglé. Aujourd'hui, la loi veut voir la terre où la marchandise a poussé.",
    verdictCite: "RDUE · règlement (UE) 2023/1115 · en clair",
  },
  journey: {
    ariaLabel: "Le parcours",
    eyebrow: "Processus de déclaration EUDR",
    heading: "Le dépôt RDUE en cinq étapes.",
    sub: "Bovins, cacao, café, huile de palme, caoutchouc, soja, bois : mettez l'un d'eux sur le marché de l'UE et le règlement sur la déforestation pose **cinq questions**. Voici chaque exigence et l'écran de Bindu qui y répond, suivis à travers une véritable expédition de café, du champ au dépôt.",
    codes:
      "Principales positions CN de l'annexe I : café 0901 · cacao 1801 · soja 1201 · huile de palme 1511 · bovins 0102 · caoutchouc 4001 · bois 4401.",
    steps: [
      {
        ask: "Où a-t-il poussé ?",
        art: "Art. 9, § 1, d)",
        law: "Des coordonnées pour chaque parcelle qui a alimenté le lot, sans échantillonnage : un point à six décimales sous 4 hectares, une limite tracée au-dessus. Les bovins sont la seule matière première pour laquelle un point unique ne suffit jamais.",
        caption:
          "Cherchez sur la carte, posez des points, tracez des limites ou importez un GeoJSON. Les parcelles sont enregistrées une fois et réutilisées à chaque expédition suivante.",
        alt: "Écran de cartographie des exploitations dans Bindu : parcelles de café près de Badulla, Sri Lanka, saisies comme points GPS et limite tracée, chacune avec des coordonnées à six décimales.",
      },
      {
        ask: "Était-ce une forêt le 31 décembre 2020 ?",
        art: "Art. 3, a)",
        law: "Rien de cultivé sur une terre déboisée après la date limite ne peut entrer sur le marché de l'UE, que le défrichement ait été légal ou non là où il a eu lieu.",
        caption:
          "Trois vérifications satellitaires indépendantes par parcelle, quelques minutes par lot. Elles signalent le risque ; la conclusion juridique reste la vôtre.",
        alt: "Tableau des résultats de la vérification forestière dans Bindu : quatre parcelles ressorties saines, une parcelle signalée avec le constat satellitaire et une action Résoudre.",
      },
      {
        ask: "A-t-il été cultivé légalement ?",
        art: "Art. 2, 40)",
        law: "Légal au regard du droit du pays de production, sur huit domaines : droits fonciers, environnement, règles forestières, droits des tiers, travail, droits humains, CLIP (consentement libre, informé et préalable), fiscalité et commerce.",
        caption:
          "Huit questions par dépôt, une preuve jointe là où vous la détenez. Un non demande un motif ; les droits fonciers demandent un document.",
        alt: "Liste de contrôle de légalité dans Bindu : les huit domaines juridiques de l'article 2, point 40, renseignés, avec les pièces justificatives téléversées.",
      },
      {
        ask: "Qui en répond ?",
        art: "Art. 4, § 2",
        law: "L'opérateur atteste, dans une déclaration de diligence raisonnée, que le risque de non-conformité est négligeable, et reste responsable de ce que la déclaration affirme.",
        caption:
          "La déclaration se compose d'elle-même à partir de vos parcelles, récoltes et vérifications. Vous la relisez, corrigez ce qui cloche, puis confirmez.",
        alt: "Écran de déclaration dans Bindu : le résumé de diligence raisonnée RDUE généré, avec produit, parcelles, résultats des vérifications et attestations de légalité.",
      },
      {
        ask: "Comment arrive-t-il à la frontière ?",
        art: "Art. 33",
        law: "La déclaration est déposée dans TRACES, le système d'information RDUE, avant que la marchandise ne soit mise sur le marché ou exportée.",
        caption:
          "Un clic vers TRACES. Le numéro de référence revient et voyage sur la déclaration en douane.",
        alt: "Écran de dépôt dans Bindu : la déclaration de diligence raisonnée prête à être soumise au système TRACES de l'UE.",
      },
    ],
  },
  chain: {
    ariaLabel: "La chaîne",
    eyebrow: "Données fournisseurs",
    heading: "Une seule partie dépose la DDS. Les données viennent de toute la chaîne.",
    sub: "Une seule partie est responsable, mais la preuve dont elle a besoin est répartie sur cinq. C'est la chaîne pour laquelle Bindu est conçu. La partie qui permet à ces acteurs de se transmettre les preuves est encore en construction : aujourd'hui un dépôt se constitue dans un seul espace de travail, et rien ne passe à une autre entreprise.",
    subhead: "Qui dépose la DDS, et qui fournit les données",
    filesBadge: "Dépose la DDS",
    noFilesBadge: "Pas de DDS propre",
    roles: [
      {
        role: "Opérateur unique",
        body: "Importe et détient déjà toute la chaîne : cartes des exploitations, registres de récolte, légalité. Rien à collecter auprès de qui que ce soit.",
      },
      {
        role: "Opérateur",
        body: "Premier à mettre la marchandise sur le marché de l'UE. Collecte les cartes et les registres de ses fournisseurs, puis dépose la DDS.",
      },
      {
        role: "Commerçant",
        body: "Achète et revend une marchandise déjà sur le marché, inchangée. Conserve et transmet les numéros de référence DDS de ses fournisseurs.",
      },
      {
        role: "Fabricant en aval",
        body: "Transforme la marchandise en un autre produit avant de le revendre. Reporte les références DDS amont sur le nouvel article.",
      },
      {
        role: "Producteur (exploitation ou coopérative)",
        body: "Cultive la matière première. Regroupe ses parcelles et ses registres de légalité en un paquet de données pour l'acheteur qui dépose.",
      },
    ],
    invite: {
      heading: "Invitez vos fournisseurs à partager leurs données.",
      body: "**En construction.** L'opérateur ouvre un dépôt et la chaîne est déjà là. Un producteur ou un commerçant qui a partagé un paquet apparaît sous **Partagé avec vous**, prêt en un clic. Aucun fournisseur enregistré ? Déposez sa facture et Bindu la lit et envoie l'invitation. L'exportateur ne court après personne par e-mail. Ce n'est pas encore en service.",
    },
    supplierShot: {
      alt: "Étape de chaîne d'un dépôt RDUE dans Bindu : des paquets de données qu'un producteur a déjà partagés et qui attendent d'être utilisés, à côté d'une zone de dépôt de facture qui lit le fournisseur et l'invite.",
      caption:
        "Le paquet du partenaire attend déjà : un clic, aucune ressaisie. Ou déposez la facture et Bindu lit le fournisseur et l'invite dans la chaîne. Pas encore en service.",
    },
    share: {
      heading: "Donnez accès à un acheteur sans envoyer de copie.",
      body: "**En construction.** Chaque parcelle, facture et document reste dans l'espace de travail qui l'a créé. Un partage accorde à l'acheteur un accès permanent, il n'envoie jamais de copie : son espace de travail tire le paquet, ou emporte le ZIP hors ligne. C'est ainsi qu'une exploitation prouve à ses acheteurs qu'elle est à faible risque sans livrer ses coordonnées. Ce n'est pas encore en service.",
    },
    shareShot: {
      alt: "Panneau de partage dans Bindu : accorder à l'espace de travail d'un acheteur un accès permanent à un paquet de données, ou télécharger le dossier de preuves en ZIP.",
      caption:
        "Le fournisseur partage depuis son propre espace de travail ; l'espace de l'acheteur tire le paquet. Les données brutes de l'exploitation ne quittent jamais la partie qui en est propriétaire. Pas encore en service.",
    },
  },
  scan: {
    ariaLabel: "Niveaux de risque par pays",
    eyebrow: "Classification des risques EUDR",
    heading: "Le niveau de risque du pays d'origine détermine vos obligations.",
    sub: "L'article 29 classe chaque pays en trois niveaux de risque, et le niveau décide de la diligence requise et de la fréquence des contrôles. Choisissez un niveau. Regardez changer ce qui est requis.",
    tierAria: "Niveau de risque",
    tiers: {
      low: "Risque faible",
      standard: "Risque standard",
      high: "Risque élevé",
    },
    fields: {
      low: [
        "140 pays concernés",
        "Toute l'UE, les États-Unis, la Chine",
        "Collectez les données, déposez la DDS",
        "Aucune évaluation des risques requise",
        "Aucune mesure d'atténuation requise",
        "Environ 1 % des opérateurs contrôlés",
      ],
      standard: [
        "Environ 50 pays",
        "Brésil, Côte d'Ivoire, Indonésie",
        "Évaluation complète des risques, chaque lot",
        "Atténuation là où un risque est trouvé",
        "Pas de déclaration simplifiée",
        "Environ 3 % des opérateurs inspectés",
      ],
      high: [
        "4 pays",
        "Biélorussie, Myanmar, Corée du Nord, Russie",
        "Le programme complet de diligence raisonnée",
        "Au moins 9 % des opérateurs contrôlés",
        "Au moins 9 % des volumes contrôlés",
        "Expéditions arrêtées et examinées",
      ],
    },
    caption:
      "La liste est le classement des pays de mai 2025 (règlement d'exécution (UE) 2025/1093). Le risque standard est la valeur par défaut, et il n'ouvre pas droit à la déclaration simplifiée.",
    facts: {
      low: "140 pays, dont chaque État de l'UE, les États-Unis et la Chine. Collectez les données et déposez la DDS ; aucune évaluation des risques, aucune atténuation requise. Environ 1 % des opérateurs contrôlés.",
      standard:
        "Environ 50 pays, dont le Brésil, la Côte d'Ivoire et l'Indonésie. Évaluation complète des risques à chaque lot, atténuation là où un risque est trouvé. Environ 3 % des opérateurs inspectés.",
      high: "Biélorussie, Myanmar, Corée du Nord, Russie. Le programme complet de diligence raisonnée, au moins 9 % des opérateurs et des volumes contrôlés, expéditions arrêtées et examinées.",
    },
  },
  flag: {
    ariaLabel: "Alertes satellite",
    eyebrow: "Alertes de déforestation",
    heading: "Quand une alerte satellite signale une parcelle conforme.",
    lead: "Depuis l'orbite, un travail agricole ordinaire ressemble à de la déforestation. Une exploitation conforme peut tout de même déclencher une alerte.",
    text: "Taille d'ombrage, recépage pour la régénération, une limite tracée trop près de la lisière, une couverture nuageuse tropicale : tout cela se lit comme une perte de couvert arboré. Ce que la loi demande, c'est un motif documenté ; choisissez-le, joignez l'extrait de registre ou l'ancienne photo aérienne, et votre explication passe dans la déclaration que lit l'autorité. La plupart de ces alertes se règlent à un bureau. C'est ce bureau.",
    reasons: [
      "taille d'ombrage",
      "recépage",
      "erreur de géométrie",
      "couverture nuageuse",
      "forêt adjacente",
      "culture antérieure à 2020",
    ],
    shot: {
      alt: "Écran de résolution d'une parcelle signalée dans Bindu : un constat satellitaire sur une parcelle, le motif pour lequel la parcelle doit tout de même être déposée, les preuves jointes et l'explication de l'opérateur pour l'autorité.",
      caption:
        "Une parcelle signalée, réglée à un bureau : motif choisi, extrait de registre joint, explication portée dans la déclaration que lit l'autorité.",
    },
  },
  calendar: {
    ariaLabel: "Les dates qui s'appliquent",
    eyebrow: "Échéances EUDR",
    heading: "Les échéances qui s'appliquent aujourd'hui.",
    sub: "Le règlement a été reporté deux fois et simplifié une fois. Ignorez les échéances de 2024 et du début 2025 que vous avez pu lire. Voici celles en vigueur, et l'échéance approche.",
    rows: [
      {
        when: "31 déc. 2020",
        flag: "La date butoir",
        body: "La date butoir. Une terre défrichée après cette date est non conforme, que le défrichement ait été légal localement ou non, et elle ne se réinitialise pas quand la terre change de mains.",
      },
      {
        when: "29 juin 2023",
        body: "Le règlement (UE) 2023/1115 entre en vigueur. Il remplace l'ancien règlement Bois et lance le compte à rebours de la conformité.",
      },
      {
        when: "22 mai 2025",
        body: "La première liste de classement des pays est publiée (règlement d'exécution (UE) 2025/1093). Elle classe les origines en risque faible, standard et élevé.",
      },
      {
        when: "23 déc. 2025",
        body: "Règlement (UE) 2025/2650 : un second report accompagné d'une vraie simplification. Déclarations annuelles, imprimés retirés du champ, les opérateurs en aval réutilisent le numéro de référence amont.",
      },
      {
        when: "30 déc. 2026",
        flag: "L'échéance",
        body: "Date d'application pour les grands et moyens opérateurs. La véritable échéance, et elle approche.",
      },
      {
        when: "30 juin 2027",
        body: "Date d'application pour les micro et petits opérateurs.",
      },
    ],
  },
  close: {
    ariaLabel: "Le reçu",
    eyebrow: "Numéro de référence TRACES",
    heading: "Le dépôt se termine par deux numéros TRACES.",
    sub: "Un numéro de référence pour la douane et un numéro de vérification pour le dossier, générés par TRACES à l'instant du dépôt. Bindu tient derrière eux le coffre de preuves à cinq ans et met à jour vos dépôts quand les règles changent encore. Le bénéfice : n'importe quel acheteur européen voit d'un coup d'œil que vous êtes à faible risque.",
    shot: {
      alt: "Reçu TRACES dans Bindu : la déclaration de diligence raisonnée acceptée, avec le numéro de référence DDS pour la douane et le numéro de vérification pour le dossier.",
      caption:
        "Acceptée par TRACES. Le numéro de référence voyage avec l'expédition ; la preuve derrière lui reste conservée cinq ans.",
    },
    badges: [
      { head: "Aucun mélange", body: "lots vérifiés et non vérifiés tenus à part" },
      { head: "Coffre 5 ans", body: "preuves chaînées par hachage, chaque acteur" },
      { head: "Règles suivies", body: "dépôts mis à jour quand la loi évolue" },
    ],
    demo: {
      heading: "Réserver une démo de 30 minutes",
      body: "Amenez un fournisseur. Repartez avec ses parcelles validées.",
    },
    cbam: {
      heading: "CBAM",
      body: "L'autre règle carbone à la frontière, en ligne sur sa propre page.",
    },
  },
  pricing: {
    locale: "fr-FR",
    ariaLabel: "Prix",
    eyebrow: "Prix",
    heading: "Ce que coûte un dossier EUDR.",
    cta: "Réserver une démo de 30 minutes",
    planEyebrow: "EUDR · dossier de diligence raisonnée",
    unit: (p) =>
      `par dossier. ${p.eudrFiling} pour déposer, ${p.eudrRetain5} pour conserver.`,
    badge: "Par dépôt",
    vs: "pas d'utilisateurs, pas de licence annuelle",
    lines: (p) => [
      `${p.eudrFiling} dépose la DDS dans TRACES et renvoie la référence que la douane demande.`,
      `${p.eudrRetain5} la conserve les cinq ans qu'exige la loi.`,
      `${p.eudrRetain10} la conserve les dix ans complets.`,
      `${p.workspaceMonth} par mois gardent votre workspace prêt à déposer.`,
    ],
    industryLabel: "Secteur :",
    industry:
      "Les alternatives facturent par utilisateur ou à l'année. Bindu facture par dossier déposé.",
    note: (p) =>
      `Garder votre workspace prêt coûte ${p.workspaceMonth} par mois. Hébergé dans l'UE, conforme au RGPD. Prix hors TVA.`,
  },
  faqBand: {
    ariaLabel: "Questions fréquentes",
    heading: "Questions fréquentes sur le RDUE.",
  },
  seo: {
    title: "RDUE (EUDR) : règlement déforestation, échéances, TRACES",
    description:
      "Le RDUE (EUDR), règlement de l'UE sur la déforestation (2023/1115) : sept matières premières, géolocalisation, diligence raisonnée dans TRACES et les échéances.",
    ogTitle: "RDUE / EUDR pour les importateurs : quoi collecter, et quand",
    ogDescription:
      "Sept matières premières, géolocalisation à la parcelle, niveaux de risque par pays et la déclaration de diligence raisonnée dans TRACES. Les dates qui s'appliquent vraiment après deux reports.",
    ogImageAlt: "Canopée forestière à côté d'une terre défrichée",
    jsonLd: {
      headline: "RDUE (EUDR) pour les importateurs : quoi collecter, et quand",
      description:
        "Le règlement de l'UE sur la déforestation (règlement (UE) 2023/1115), le RDUE, pour les importateurs : les sept matières premières couvertes, la géolocalisation des parcelles, la déclaration de diligence raisonnée dans TRACES, le classement des pays et les dates applicables après deux reports.",
      faq: [
        {
          question: "Quelles matières premières le RDUE couvre-t-il ?",
          answer:
            "Sept : bovins, cacao, café, huile de palme, caoutchouc, soja et bois, plus une liste définie de produits qui en dérivent (cuir, chocolat, meubles, papier, pneus et plus). Fixé par le règlement (UE) 2023/1115.",
        },
        {
          question: "À partir de quand le RDUE s'applique-t-il ?",
          answer:
            "Pour les grands et moyens opérateurs et commerçants, le 30 décembre 2026 ; pour les personnes physiques et les micro et petites entreprises, le 30 juin 2027. Ces dates ont été fixées par le règlement (UE) 2025/2650 (article 38), le second report de l'échéance initiale de 2024.",
        },
        {
          question: "Qu'est-ce qu'une déclaration de diligence raisonnée RDUE (DDS) ?",
          answer:
            "Une déclaration soumise dans le système d'information TRACES de l'UE avant que la marchandise couverte ne soit mise sur le marché de l'UE ou exportée. Elle confirme que la diligence raisonnée a été exercée et que le risque de déforestation est négligeable, et renvoie à la géolocalisation des parcelles. Le dépôt renvoie un numéro de référence DDS utilisé en douane.",
        },
        {
          question: "Quelles données de géolocalisation le RDUE exige-t-il ?",
          answer:
            "Les coordonnées géographiques (latitude et longitude) de chaque parcelle où la matière première a été produite : un point unique pour les parcelles de moins de 4 hectares et un polygone pour les parcelles de 4 hectares ou plus. Les coordonnées sont fournies au titre de l'article 9.",
        },
        {
          question: "Quelles sont les sanctions en cas de non-conformité au RDUE ?",
          answer:
            "L'article 25 fixe le minimum que les États membres doivent prévoir, et non le montant de l'amende encourue : le montant maximal de l'amende doit atteindre au moins 4 % du chiffre d'affaires annuel total de l'opérateur dans l'Union, avec la confiscation de la marchandise et des recettes qui en découlent, et l'exclusion temporaire des marchés publics et des financements publics.",
        },
        {
          question: "Qui dépose la déclaration de diligence raisonnée RDUE ?",
          answer:
            "L'opérateur (le premier à mettre la marchandise sur le marché de l'UE) ou un opérateur unique qui importe et détient toute la chaîne. Les commerçants, fabricants en aval et producteurs ne déposent pas leur propre DDS : ils portent ou fournissent les données et réutilisent le numéro de référence DDS amont.",
        },
        {
          question: "Un commerçant peut-il réutiliser la référence DDS d'un fournisseur ?",
          answer:
            "Oui. Un commerçant qui achète et revend une marchandise déjà sur le marché de l'UE, inchangée, ne dépose pas de nouvelle déclaration. Il conserve et transmet les numéros de référence DDS de ses fournisseurs. Les fabricants en aval portent de même les références amont sur le produit transformé.",
        },
        {
          question: "Comment les fournisseurs partagent-ils les données RDUE sans en perdre le contrôle ?",
          answer:
            "Bindu construit un partage où chaque partie garde ses parcelles, factures et documents dans son propre espace de travail et accorde à son acheteur l'accès à un paquet de données au lieu d'en envoyer une copie par e-mail ; les données brutes de l'exploitation ne quittent ainsi jamais la partie qui en est propriétaire. Ce partage n'est pas encore en service. D'ici là, vous chargez ce que vos fournisseurs vous envoient dans votre propre dossier, et rien ne quitte votre espace de travail.",
        },
      ],
    },
  },
};
