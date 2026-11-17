---
title: "Digital Product Passport Example: How It Works"
description: "How a digital product passport works: the QR code, the unique ID, the registry and the six standards, with a clearly labelled example passport."
category: "Reference"
author: "raahul-dutta"
regulations:
  - dpp
date: "2026-11-07"
order: 4
photo: "https://images.unsplash.com/photo-1661169398346-aecdc4f5068b?w=1200&q=80"
photoAlt: "A black and white QR code."
photoCredit: "Vizito Visitor Management"
photoCreditUrl: "https://unsplash.com/@vizito?utm_source=bindu&utm_medium=referral"
photo2: "https://images.unsplash.com/photo-1595079835357-a94a13cab10c?w=1200&q=80"
photo2Alt: "A smartphone displaying a QR code."
photo2Credit: "Markus Winkler"
photo2CreditUrl: "https://unsplash.com/@markuswinkler?utm_source=bindu&utm_medium=referral"
---

A digital product passport sounds abstract until you follow one from the factory floor to a phone screen. Then it is quite plain. A code on the product points to an ID. The ID points to a record. The record answers different questions for different people.

This page walks through that chain, part by part, using the text of the law. It ends with an example passport. The example is invented and labelled as such, because the real field lists are still being written.

**At a glance:**

- **A passport has six parts.** A data carrier such as a QR code, a unique product identifier, the data, a registry entry, storage with a back-up copy, and access rules.
- **The code is only the doorway.** The data carrier leads to an identifier, and the identifier leads to the record.
- **The EU registry holds identifiers, not the passport.** It went live on 20 July 2026 and stores identifiers, plus the commodity code for goods in free circulation.
- **Who sees what depends on the role.** A shopper, a recycler and a customs officer scan the same code and see different data.
- **Six harmonised standards** now cover the technical side, cited by the Commission on 15 July 2026.

## What is a digital product passport?

A **digital product passport** is the electronic record of a product's data, reached through a data carrier on the product, its packaging or its papers. The idea comes from the [ESPR](/blog/what-is-espr), Regulation (EU) 2024/1781. The batteries regulation has its own passport on the same model. For the plain introduction, see our guide on [what a digital product passport is](/blog/what-is-a-digital-product-passport).

No product group outside batteries has a passport duty yet. That is why this page stays with how the system is built, not with any one product.

## The six parts of a passport

The table follows [Articles 9 to 13 of the ESPR](https://eur-lex.europa.eu/eli/reg/2024/1781/oj) and Annex III.

| Part | What it is | Source |
|---|---|---|
| Data carrier | A QR code or similar, physically on the product, its packaging or the papers that come with it. The product act says which one. | Art. 10(1)(b) |
| Unique product identifier | A persistent ID linked to the carrier. It points to a model, a batch or a single item, as the product act says. Operators and facilities get IDs too. | Art. 9(2)(d), 10(1)(a), 10(1)(f), Annex III |
| The data | A set of fields from Annex III, shaped by the product act: compliance documents, manuals, manufacturer and importer details, commodity codes, and more. | Annex III |
| Registry entry | The operator uploads the identifier, and for goods in free circulation the commodity code, to the Commission's registry. It gets a registration identifier back. | Art. 13 |
| Storage and back-up | Held by the operator or a service provider. A back-up copy sits with a service provider. It must stay available even if the operator disappears. | Art. 10(4), 11(c), 11(e) |
| Access rules | Rights to read and to write are set per role, in the product act. | Art. 10(1)(g), 11(b), 11(f) |

The standards for identifiers and data carriers come from the ISO/IEC 15459 family, which Annex III names, or an equivalent.

## What happens when someone scans the code?

The law sets requirements, not a user interface. But the parts above give the sequence.

1. **A person scans the data carrier.** It is on the product, the packaging or the papers. A dealer or online marketplace may show a digital copy of the carrier before a sale, and the operator must supply it within five working days of a request (Article 10(3)).
2. **The code resolves to the unique identifier.** For batteries the law says so directly: the QR code links to a unique identifier that the operator attributes (Article 77(3) of the Batteries Regulation).
3. **The identifier leads to the passport**, held by the operator or its service provider. How the lookup works in detail is for the standards and the product acts. We could not find one fixed format for all products.
4. **The system checks who is asking.** A customer, a repairer, a recycler, a market surveillance authority and customs each have access rights set in the product act (Article 11(b)).
5. **The person sees the slice they are allowed to see.** Access is free of charge for those who hold rights.

The Commission must also run a public web portal where stakeholders can search and compare passport data, within their access rights (Article 14).

![A person holding a mobile phone.](https://images.unsplash.com/photo-1662383729882-e03ce8e00887?w=1200&q=80)

*Photo by [Claudio Schwarz](https://unsplash.com/@purzlbaum?utm_source=bindu&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=bindu&utm_medium=referral)*

## What does the EU registry do?

The registry is not where the passport lives. It stores, in a secure way, at least the unique identifiers. For goods put into free circulation it also stores the commodity code. For batteries it stores the identifiers under Article 77(3) of the Batteries Regulation (Article 13).

The Commission runs it. The Commission, national authorities and customs authorities can use it for their duties. The operator uploads the data. It gets a unique registration identifier back, and the law is clear that this is not proof of compliance.

The registry [went live on 20 July 2026](https://single-market-economy.ec.europa.eu/news/digital-product-passport-registry-now-live-2026-07-20_en), with a testing environment. Its rules are in [Implementing Regulation (EU) 2026/1778](https://eur-lex.europa.eu/eli/reg_impl/2026/1778/oj). Nothing obliges you to register yet, because no passport duty is in force outside batteries.

## Which standards sit underneath?

On 15 July 2026 the Commission cited six harmonised standards in [Implementing Decision (EU) 2026/1736](https://eur-lex.europa.eu/eli/dec_impl/2026/1736/oj). They support Articles 10 and 11 of the ESPR.

| Standard | What it covers |
|---|---|
| EN 18216 | Data exchange protocols |
| EN 18219 | Unique identifiers |
| EN 18220 | Data carriers |
| EN 18221 | Data storage, archiving and persistence |
| EN 18222 | APIs for lifecycle management and searchability |
| EN 18223 | System interoperability |

Two further standards, on access rights and security and on authentication and integrity, are still pending, as far as we can tell from third-party sources. The Commission's batteries page describes the decision as covering six of eight standards.

## Who sees what? The battery example

Batteries show access tiers most clearly, because Annex XIII of the Batteries Regulation splits the passport into four blocks. One is public. Two are model-level and restricted. One is per unit and restricted. Our guide on [battery passport data](/blog/battery-passport-data) covers the blocks in full.

Other product groups will get their own rules in their own acts. Do not assume the battery split carries over.

## An example passport (invented)

**This is an invented example for illustration. It is not a real product, not a real passport, and not a format set by the Commission.** The real field lists come from the product acts and, for batteries, from Annex XIII. We have kept this one short.

Imagine a small battery for an e-scooter, "Model X-48", from a made-up maker. Here is how the record could look to different readers.

| Field | Example value | Who could see it |
|---|---|---|
| Unique identifier | A long code, linked to the QR code on the battery | Anyone who scans |
| Battery category | LMT battery | Anyone who scans |
| Model | X-48 | Anyone who scans |
| Rated capacity | 0.6 kWh | Anyone who scans |
| Expected lifetime | 800 charge cycles | Anyone who scans |
| Carbon footprint | A figure in kg CO2e per kWh, on the set method | Anyone who scans |
| Recycled content | Shares of cobalt, lithium and nickel recovered | Anyone who scans |
| Dismantling diagram and safety notes | A PDF showing how to open the pack | Recyclers and repairers with a legitimate interest |
| Test reports | Reports proving compliance | Notified bodies, market authorities, the Commission |
| State of health, cycles used | Updated during use | Parties with a legitimate interest, for this unit only |

The real work sits behind the "Example value" column. The carbon footprint comes from the cell plant. The recycled shares come from the material suppliers. The dismantling notes come from the pack designer. The operator collects them and signs off. A passport is built from supplier data long before it is a QR code.

**Where Bindu fits.** Bindu collects that supplier data. Each supplier gets their own workspace, linked to their own systems, so nobody hands over an ERP. AI collects what is missing over email or WhatsApp, so nobody chases by hand. [See the battery passport breakdown](/dpp/battery).

## What to do with this

1. Find out whether any of your products falls under an act. Our guide on [which products need a digital product passport](/blog/which-products-need-a-digital-product-passport) lists the sectors.
2. Ask your suppliers which of the data above they already hold in a form they can send.
3. If you are choosing a tool, read our guide on what to ask a vendor: [digital product passport software](/blog/digital-product-passport-software).

See how it works at [getbindu.com](https://getbindu.com).

## FAQ

**How does a digital product passport work?**
A data carrier, such as a QR code, on the product links to a unique identifier. The identifier leads to the passport, held by the operator or a service provider. The system checks who is asking, and shows the data that person has access rights to.

Source: [EUR-Lex: Regulation (EU) 2024/1781, Articles 9 to 11](https://eur-lex.europa.eu/eli/reg/2024/1781/oj)

**What does a digital product passport contain?**
That depends on the product act. Annex III of the ESPR lists the elements the acts can draw from, such as the unique product identifier, commodity codes, compliance documents, user manuals and details of the manufacturer and importer.

Source: [EUR-Lex: Regulation (EU) 2024/1781, Annex III](https://eur-lex.europa.eu/eli/reg/2024/1781/oj)

**Where is the passport data stored?**
By the economic operator that created it or by a digital product passport service provider. A back-up copy must be made available through a service provider. The EU registry stores identifiers, not the passport itself.

Source: [EUR-Lex: Regulation (EU) 2024/1781, Articles 11 and 13](https://eur-lex.europa.eu/eli/reg/2024/1781/oj)

**Who can read a digital product passport?**
Customers, manufacturers, importers, distributors, repairers, recyclers, authorities and others, each according to the access rights set in the product act. Access is free of charge for those with rights.

Source: [EUR-Lex: Regulation (EU) 2024/1781, Article 11](https://eur-lex.europa.eu/eli/reg/2024/1781/oj)

**Is there an example of a digital product passport?**
The battery passport is the first with a legal field list, in Annex XIII of the Batteries Regulation. Our page above shows an invented example, clearly labelled, because real formats are still being set for other products.

Source: [EUR-Lex: Regulation (EU) 2023/1542, Annex XIII](https://eur-lex.europa.eu/eli/reg/2023/1542/oj/eng)

**Which standards does the digital product passport use?**
Six harmonised standards, EN 18216 and EN 18219 to EN 18223, cover data exchange, unique identifiers, data carriers, data storage, APIs and system interoperability.

Source: [EUR-Lex: Implementing Decision (EU) 2026/1736](https://eur-lex.europa.eu/eli/dec_impl/2026/1736/oj)

---

*This article reflects the official position as of 7 November 2026. The product acts that fill in the passport are still being adopted, so details can change. For anything after that date, check the European Commission's [digital product passport page](https://single-market-economy.ec.europa.eu/single-market/digital-product-passport_en) and the Official Journal on [EUR-Lex](https://eur-lex.europa.eu). This is general information, not legal advice.*
