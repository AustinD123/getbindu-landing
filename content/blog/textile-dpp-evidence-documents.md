---
title: "DPP Data Requirements for Textiles: Your Documents"
description: "DPP data requirements for textiles, mapped to the documents a supplier already holds: GOTS, GRS, OEKO-TEX, lab reports, invoices, and the gaps none cover."
category: "Guide"
author: "raahul-dutta"
image: "/images/blog/textile-dpp-evidence-documents.svg"
imageAlt: "Six supplier documents feed a textile Digital Product Passport, and the fields that no certificate can evidence are named as gaps for the brand to fill."
regulations: ["dpp"]
date: "2026-09-26"
order: 6
photo: "https://images.unsplash.com/photo-1476683874822-744764a2438f?w=1200&q=80"
photoAlt: "Rows of white cotton thread bobbins stacked on wooden racks inside a spinning mill."
photoCredit: "Janko Ferlič"
photoCreditUrl: "https://unsplash.com/@itfeelslikefilm?utm_source=bindu&utm_medium=referral"
photo2: "https://images.unsplash.com/photo-1612685180313-bdfe1d6896cd?w=1200&q=80"
photo2Alt: "A knitted fabric machine threaded with rows of yarn on a mill floor."
photo2Credit: "Lalit Kumar"
photo2CreditUrl: "https://unsplash.com/@klalit?utm_source=bindu&utm_medium=referral"
---

Ask a textile supplier for passport data and you get a folder. A few certificates, a laboratory report, a commercial invoice. All of it real and signed, and none of it in the shape a passport wants.

So the difficult part is not gathering paper, because suppliers already hold it. The difficult part is knowing which line on which page answers which passport field, and which fields no paper answers at all. That second list is the costly one, and nobody warns you about it. This post maps both.

**At a glance:**

- Six plain supplier documents cover most of a textile passport's material and chemical data.
- A scope certificate proves a site and a process. It does not prove a shipment.
- A transaction certificate proves the recycled share of one named lot.
- A laboratory report carries measured numbers, while a certificate carries only a pass.
- No standard certificate covers wear, recycling, footprint, care or repair.
- The invoice is the join key. It carries the lot number the rest point back to.

## What a textile passport asks for

**A digital product passport** is a data record tied to one product, opened by a code printed on the item. The law behind it is [ESPR, Regulation (EU) 2024/1781](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32024R1781). ESPR sets the frame. It does not set the textile field list.

Article 9 is clear about that. For each product group, a delegated act sets the data, the data carrier, and whether the passport sits at model, batch or item level. Annex III then lists what those fields may draw on. It names the unique product identifier, the trade item number, and commodity codes such as a TARIC code. It also names compliance documents such as a declaration of conformity, plus information about the maker.

For textiles that delegated act has not been adopted yet, but the shape is clear all the same. A textile passport needs product identity, producer identity, product facts and compliance documents. Our companion piece on [what a textile passport holds](/blog/digital-product-passport-textiles-requirements) walks those field groups. This one starts from the paperwork instead.

## The six documents in the folder

Almost every textile supplier holds the same set. Here is what each really proves.

**A scope certificate** is proof that a site is approved for a named process, for a set period. A [GOTS](https://global-standards.org/our-standards/gots) scope certificate names the firm, the site, the steps it may run, and the goods in scope. Each one is listed with its make-up and label grade. It covers the site, not the shipment.

**A transaction certificate** is proof that one lot of certified goods moved from one seller to one buyer. A [Global Recycled Standard](https://textileexchange.org/knowledge-center/materials/global-recycled-standard-grs/) transaction certificate names the seller, the buyer, the invoice and the lot. It then gives the recycled fibre, its share, where it came from, and the net weight. It is the tightest link you get between a claim and a batch.

A [STANDARD 100 by OEKO-TEX](https://www.oeko-tex.com/en/our-standards/oeko-tex-standard-100) certificate names the holder, the article group and the fibres. It also names the class tested, such as the class for goods worn next to the skin. It says the goods met the limits. It does not say what was found.

A laboratory test report does say what was found. It gives a test, a method, a measured result, a limit, and the law behind that limit, for example a REACH Annex XVII entry. Numbers, not a badge. This is the most useful page in the folder.

A restricted substances form is the dyehouse speaking for itself, stating that the dyes and auxiliaries it used meet a named list. It is signed rather than tested, so treat it as a claim with an owner attached.

A commercial invoice names the seller, the buyer, the lot, the code per line, the weight and the country of origin. It is the dullest page in the folder and quietly the most useful.

## Which document proves which field

Read it as the answer to "where does this field come from".

| Passport field | Document that proves it | What you actually get |
| --- | --- | --- |
| HS code | Commercial invoice | A code per line, plus country of origin |
| Batch id | Invoice and transaction certificate | Both name the same lot, so they match |
| Making site | Scope certificate | Named firm, address, site id |
| Maker identity | Commercial invoice | Legal name, address, tax id |
| Fibre make-up | Scope certificate, checked on the lab report | Stated on both, which is a free cross-check |
| Organic content | Scope certificate | The organic share of the listed goods |
| Recycled content | Transaction certificate | Fibre, share, origin and weight, per lot |
| Substances of concern | Lab test report | Amounts, methods and limits |
| Test results | Lab test report | Test, method, result, verdict |
| Conformity papers | OEKO-TEX certificate and dye form | Document refs, not data points |
| Weights | Invoice, checked against the transaction certificate | Net weight by line |

Two things fall out of that table.

First, the laboratory report is the only page carrying numbers you can drop straight into a field. **Substances of concern** are the hardest item in the passport, because ESPR asks for the name of the substance, its codes, where it sits inside the goods, and how much is there. A certificate cannot give you that, and a laboratory report can. For the wider background, see our note on [what an SVHC is](/blog/what-is-an-svhc).

Second, nothing works without the lot number. The scope certificate, the transaction certificate, the lab report and the dye form all point back to an invoice or a batch code. Lose that thread and six documents become six stray files.

## The fields no certificate covers

This is the useful half. None of the six papers covers the items below, and no other certificate does either.

- **Product identity above the batch.** A unique product id, a model id, a trade item number. These come from your own product data, not from a supplier.
- **How long it lasts, and repair.** No textile certificate scores wear. The method will be set by a delegated act.
- **Recycling.** The same gap again, with no score, no agreed test method and no certificate.
- **Carbon and wider footprint.** These need a product footprint study, and a certificate never holds one.
- **Care, repair and warranty.** Care text, a repair contact and warranty length are brand decisions.
- **Non-textile parts of animal origin.** Horn buttons, leather patches and shell trims are declared by the brand. They are often bought outside the certified chain.
- **Importer identity.** When the maker sits outside the EU, the importer holds the passport. No supplier page names them.
- **Passport metadata.** Identifier, version, issue date and status belong to the passport system.

Notice the shape of the gap. Certificates cover the middle of the passport, its material and chemical layer. The top, product identity, and the bottom, everything scored or shopper facing, are yours.

## Working the gap list

Sort the gaps by who owns them, then chase them in that order.

Your own systems already hold product identity, care text, warranty terms and importer details. Those close in an afternoon of typing, not a supplier email.

Trims come next, because they are a genuine sourcing question. Someone has to confirm whether a button is horn or resin.

Scores and footprints come last, and honestly. Durability, recycling and footprint class all wait on methods the delegated act will define. Guessing them now and printing them as facts is worse than leaving them blank. ESPR says passport data must be accurate, complete and up to date, which is a good argument for patience.

Meanwhile, the habit of collecting is what pays. A shipment landing with a matching invoice, transaction certificate and laboratory report half-fills its own passport. One landing with a certificate and no lot number costs you a week of email. Our [overview of textile passports](/blog/digital-product-passport-textiles) covers the timeline, and [what ESPR is](/blog/what-is-espr) covers the law around it.

**Where Bindu fits.** Bindu reads these documents as they land, lifts the fields out of them, and shows the passport with its gaps named rather than hidden. Each document stays pinned to the field it filled, so an auditor can see where a value came from. See how the [DPP template](/dpp) handles it.

## FAQ

**Can a GOTS scope certificate prove the organic content of my shipment?**
Not on its own. A scope certificate covers an approved site, the steps it may run, and the goods in scope for a stated period. Proving that one lot of certified fibre changed hands is the job of a transaction certificate, which names the seller, buyer, lot and weight.

Source: [Global Organic Textile Standard](https://global-standards.org/our-standards/gots)

**Does an OEKO-TEX certificate satisfy the substances of concern field?**
No. It shows the goods were tested against the limits of a product class and passed. The passport field asks for the name of the substance, its identifiers, its location in the product and its concentration. That detail comes from a laboratory test report, not the certificate.

Source: [STANDARD 100 by OEKO-TEX](https://www.oeko-tex.com/en/our-standards/oeko-tex-standard-100)

**Which textile passport fields are still undefined?**
The field list, the code type and the level of the passport are all set by a delegated act for that product group. The textile act is not adopted yet. Until it is, leave scored fields such as wear and recycling open rather than guessing.

Source: [Regulation (EU) 2024/1781, Article 9](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32024R1781)

**What should I ask suppliers for today?**
Ask for the lot number on every page. A transaction certificate naming the invoice, or a laboratory report naming the batch, is worth far more than a newer certificate with no link to your goods.

Source: [Global Recycled Standard, Textile Exchange](https://textileexchange.org/knowledge-center/materials/global-recycled-standard-grs/)
