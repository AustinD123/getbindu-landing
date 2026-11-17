---
title: "What is an EUDR Due Diligence Statement (DDS)?"
description: "An EUDR DDS is the statement an operator files in TRACES before goods enter the EU. What it contains, who files it, when it is due, and a worked example."
category: "Fundamentals"
author: "raahul-dutta"
regulations: ["eudr"]
image: "/images/blog/what-is-an-eudr-dds.svg"
imageAlt: "What an EUDR Due Diligence Statement contains: commodity and origin, plot geolocation, negligible-risk attestation, filed in TRACES."
date: "2026-08-10"
order: 2
photo: "https://images.unsplash.com/photo-1507576164121-220762647800?w=1200&q=80"
photoAlt: "Hands holding cocoa beans that are drying in a village in Ivory Coast."
photoCredit: "Etty Fidele"
photoCreditUrl: "https://unsplash.com/@fideletty?utm_source=bindu&utm_medium=referral"
photo2: "https://images.unsplash.com/photo-1696124651786-218e47e63c73?w=1200&q=80"
photo2Alt: "Soybean pods ripening on plants in a soybean field."
photo2Credit: "Steven Brown"
photo2CreditUrl: "https://unsplash.com/@stevengbrown?utm_source=bindu&utm_medium=referral"
---

**An EUDR DDS** is a Due Diligence Statement filed in the EU's [TRACES](https://green-business.ec.europa.eu/deforestation-regulation-implementation/information-system_en) system under [Regulation (EU) 2023/1115](https://eur-lex.europa.eu/eli/reg/2023/1115/2025-12-26/eng). In it, an operator declares that a shipment of a covered commodity is deforestation-free, legally produced, and traceable to the land it grew on. Until that statement clears, the goods cannot lawfully be placed on or exported from the EU market.

A coffee importer meets it for the first time as a blank TRACES form. The screen asks for a CN code. A country of production. A quantity in kilograms. Geolocation coordinates for every plot the beans came from. There is a field for the supplier, a box asking the operator to attest that the risk of non-compliance is negligible, and a submit button that will not light up until every field is filled. This form is the EUDR DDS, and until it clears, the container does not move.

**At a glance:**

- A Due Diligence Statement is filed in TRACES before covered goods enter or leave the EU market.
- Only the operator, or a solo operator, files one. Traders and downstream firms reuse the reference number.
- It states that the goods are deforestation-free after 31 December 2020, legally produced, and traced to plot geolocation.
- Seven commodities are in scope: cattle, cocoa, coffee, oil palm, rubber, soya and wood, plus derived products.
- The deadline is 30 December 2026 for large and medium operators, 30 June 2027 for micro and small.

## What is a DDS under the EUDR?

Under the EUDR the term means one specific thing. **A Due Diligence Statement** is a formal declaration, filed in **TRACES** (the EU Information System). In it, the operator states that it has done due diligence and found only a negligible risk of the goods being linked to deforestation after **31 December 2020**. It is not a form you email to a supplier or keep in a folder. It is a record submitted to the EU before the goods are placed on, or exported from, the EU market.

Regulation (EU) 2023/1115, [the EU Deforestation Regulation](/blog/what-is-eudr), covers **seven commodities**, along with a long list of derived products such as leather, chocolate, furniture, paper and tyres. Each commodity sits under a CN heading, and that heading is how you check whether a shipment is in scope.

| Commodity | CN heading |
|---|---|
| Cattle | 0102 |
| Cocoa | 1801 |
| Coffee | 0901 |
| Oil palm | 1511 |
| Rubber | 4001 |
| Soya | 1201 |
| Wood | 4401 |

If what you import or export sits inside that scope, you cannot lawfully move it across the EU border without a DDS reference standing behind it.

The DDS attests two things at once. First, that the goods are traceable to specific plots of land. Second, that those plots were not cleared of forest after the 2020 cutoff. That cutoff does not reset when land changes hands.

## Who files an EUDR DDS?

Only one party files. The roles decide which one.

Only one party actually files the DDS. **The operator** is the first company to place the goods on the EU market, or a solo operator who both produces and places. That is the importer bringing coffee into the EU, the company that first sells it into the internal market.

**Traders** and **downstream manufacturers** do not file a fresh statement. They reuse and pass on the upstream **DDS reference number**. A roaster buying already-imported green coffee, or a distributor moving finished bags, references the operator's statement rather than repeating the whole exercise.

**Producers** are the farms and co-operatives that grow the commodity. They supply the underlying data: the plot boundaries, the harvest records, the legality documents. They do not file the DDS themselves. Their job is to hand the operator clean, complete data so the operator can stand behind it.

If you want the reference number side of this explained on its own, see our companion post on the [EUDR DDS reference number](/blog/eudr-dds-reference-number).

## What must an EUDR DDS contain? (Article 9)

**Article 9** of Regulation (EU) 2023/1115 sets out the information a DDS must carry. In plain terms, the statement pulls together five categories of data for each consignment.

| DDS field (Article 9) | What the operator provides |
|---|---|
| Commodity and CN code | A description of the product and its CN code, for example coffee under heading 0901. |
| Quantity | Net mass in kilograms, and where relevant the units used for that product. |
| Country of production | The producing country, and every country involved when more than one applies. |
| Plot geolocation | Coordinates for every plot, with no sampling: a point below 4 hectares, a polygon at 4 hectares or more. For cattle, a single point never satisfies the requirement. |
| Operator and supplier details | Name, address, and contact details of the operator and of everyone who supplied the commodity. |

On top of that data, the operator signs the statement: a declaration that due diligence was exercised and that only a negligible risk of non-compliance was found. That attestation is the legal heart of the DDS. The data supports it. The sign-off carries it.

## What an EUDR DDS looks like: a field example

A filled-in statement is easier to read than a field list. Here is what the fields look like for a single coffee consignment. These are illustrative values, not a real filing, and they are described here rather than lifted from any third-party template.

- Commodity / product: Coffee, not roasted, not decaffeinated.
- CN code: 0901 21 00.
- Net mass: 19,200 kg.
- Country of production: Colombia.
- Plot 1 (2.1 ha): point, 4.123456, -75.654321.
- Plot 2 (6.4 ha): polygon, boundary vertices in GeoJSON.
- Producer / supplier: named co-operative, address, contact.
- Operator: your company, EORI, address, contact.
- Attestation: risk of non-compliance assessed as negligible.

That is the anatomy of a DDS: identity, quantity, origin, geolocation, and a signed conclusion. Multiply it across every plot and every consignment in a year and you have the real workload behind the regulation. For commodity-specific detail, our guides on [EUDR for coffee importers](/blog/eudr-coffee-importers), [EUDR for coffee exporters](/blog/eudr-coffee-exporters), and [what EUDR means for coffee](/blog/what-is-eudr-coffee) go deeper.

## Where is it filed, and what comes back?

The DDS is filed in **TRACES**, the EU's central information system, before the goods are placed on or exported from the market. When the statement is submitted, the system returns two numbers.

The **DDS reference number** is the one that matters at the border. Customs uses it to link the physical consignment to its statement, so it travels with the goods and gets handed downstream. The **verification number** is issued for the record, confirming the submission itself. Traders and manufacturers further down the chain quote the reference number rather than filing anew.

## When is the EUDR DDS due?

The regulation was postponed twice and simplified once, which is why so many older deadlines floating around online are wrong. Ignore the 2024 and early-2025 dates. The dates that actually apply are these.

- **31 December 2020** is the deforestation cutoff.
- **29 June 2023** is when the regulation entered into force.
- **22 May 2025** brought the first country benchmarking list, under [Implementing Regulation (EU) 2025/1093](https://eur-lex.europa.eu/eli/reg_impl/2025/1093/oj).
- **23 December 2025** brought **[Regulation (EU) 2025/2650](https://eur-lex.europa.eu/eli/reg/2025/2650/oj/eng)**, the second postponement plus a package of simplifications.
- **30 December 2026** is the application date for large and medium operators. This is **the** deadline to plan for.
- **30 June 2027** is the application date for micro and small operators.

The **Regulation (EU) 2025/2650** simplification is worth reading twice if you file at volume. It allows **annual statements** rather than a fresh DDS per consignment for goods you handle repeatedly, drops printed matter from scope, and lets **downstream operators reuse the upstream reference number** instead of generating their own. The workload does not vanish, but it stops multiplying.

**Where Bindu fits.** Every field above has to come from somewhere before the submit button lights up. Bindu fills them from the supplier records you already hold, runs the satellite check against the cutoff, and files the statement, returning both the reference number and the verification number. [Book a demo](/eudr).

## FAQ

**What does DDS mean in EUDR?**
DDS stands for Due Diligence Statement. Under Regulation (EU) 2023/1115, it is the declaration an operator files in TRACES. The operator confirms that a covered shipment has been checked and carries only a negligible risk of being linked to deforestation after 31 December 2020.

Source: [EUR-Lex: EUDR, Regulation (EU) 2023/1115 (consolidated)](https://eur-lex.europa.eu/eli/reg/2023/1115/2025-12-26/eng)

**Who has to file an EUDR DDS?**
Only the operator, the first party to place the goods on the EU market, or a solo operator. Traders and downstream manufacturers reuse the upstream DDS reference number rather than filing their own. Producers supply the plot and legality data but do not file.

Source: [EUR-Lex: EUDR, Regulation (EU) 2023/1115 (consolidated)](https://eur-lex.europa.eu/eli/reg/2023/1115/2025-12-26/eng)

**What information does an EUDR DDS need?**
Under Article 9: the CN code and product description, the quantity in kilograms, and the country of production. It also needs the geolocation of every plot (a point under 4 hectares, a polygon at 4 hectares or more), the supplier and operator details, and a signed attestation that risk is negligible.

Source: [EUR-Lex: EUDR, Regulation (EU) 2023/1115 (consolidated)](https://eur-lex.europa.eu/eli/reg/2023/1115/2025-12-26/eng)

**Where do you file the DDS and what do you get back?**
It is filed in TRACES, the EU Information System, before the goods are placed on or exported from the EU market. Filing returns a DDS reference number, used at customs, and a verification number, kept for the record.

Source: [European Commission: EUDR Information System (TRACES)](https://green-business.ec.europa.eu/deforestation-regulation-implementation/information-system_en)

**When is the EUDR DDS deadline?**
30 December 2026 for large and medium operators, and 30 June 2027 for micro and small operators. These dates reflect the second postponement and simplification under Regulation (EU) 2025/2650 on 23 December 2025.

Source: [EUR-Lex: Regulation (EU) 2025/2650 (second postponement)](https://eur-lex.europa.eu/eli/reg/2025/2650/oj/eng)
