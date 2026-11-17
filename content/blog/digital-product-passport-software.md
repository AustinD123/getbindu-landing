---
title: "Digital Product Passport Software: What to Ask a Vendor"
description: "What the ESPR says a digital product passport system must do, and ten questions to ask a software vendor before you sign. Checked 7 November 2026."
category: "Reference"
author: "raahul-dutta"
regulations:
  - dpp
date: "2026-11-07"
order: 3
photo: "https://images.unsplash.com/photo-1784652852605-6945598f2af3?w=1200&q=80"
photoAlt: "A modern data center with rows of white server cabinets."
photoCredit: "Tony Marinescu"
photoCreditUrl: "https://unsplash.com/@tonymarinescu?utm_source=bindu&utm_medium=referral"
photo2: "https://images.unsplash.com/photo-1763128516808-785e80c1dd68?w=1200&q=80"
photo2Alt: "A man typing on a keyboard in front of several computer monitors."
photo2Credit: "Esten Erbol"
photo2CreditUrl: "https://unsplash.com/@esten?utm_source=bindu&utm_medium=referral"
---

Search for digital product passport software and you will find plenty of "DPP-ready" platforms. Few of their pages say which parts of the law they actually meet.

The law does say what a passport system has to do. It is written into two articles of the ESPR. This page turns those articles into a checklist you can put in front of any vendor, and says plainly what nobody can promise yet.

**At a glance:**

- **The ESPR sets the technical rules.** Articles 10 and 11 of [Regulation (EU) 2024/1781](https://eur-lex.europa.eu/eli/reg/2024/1781/oj) list what a passport and the system behind it must do.
- **No vendor can be officially certified yet.** The delegated act on service-provider requirements, and its optional certification scheme, is still to come. We found no adopted act as of 7 November 2026.
- **Open standards and no lock-in are written into the law.** Your data must be able to leave the tool.
- **Five working days is the clock for dealers.** A dealer or online marketplace that asks for the data carrier must get it within that time.
- **Most product groups have no passport duty yet.** Batteries are first, on 18 February 2027, under their own regime.

## What does the law say a passport system must do?

The ESPR does not name any software. It sets essential requirements for the passport (Article 10) and for how it is built and run (Article 11). Read together, they give you the list below. The first column is what the law says. The second is what to look for in a tool.

| What the law requires | Article | What to look for |
|---|---|---|
| A persistent unique product identifier, linked through a data carrier | 10(1)(a) | The identifier does not change when the product moves or the vendor changes |
| Identifier and data carrier follow the standards in Annex III (the ISO/IEC 15459 family) or an equivalent | 10(1)(c) | The vendor names the scheme it uses |
| Open standards, an interoperable format, machine-readable, structured, searchable, transferable "without vendor lock-in" | 10(1)(d) | A full export in an open format, at any time |
| No customer personal data without explicit consent | 10(1)(e) | A clear default that keeps personal data out |
| Data refers to the model, the batch or the single item, as the product act says | 10(1)(f) | The tool handles all three levels |
| Access to data is regulated by role | 10(1)(g), 11(b), 11(f) | Read and write rights set per field and per actor |
| A digital copy of the data carrier to dealers and online marketplaces, within five working days of a request | 10(3) | A way to send it that is not a manual job |
| A back-up copy of the passport held through a passport service provider | 10(4) | A named place, and a named party, for the back-up |
| Full interoperability with other passports | 11(a) | A documented interface, not a closed system |
| Stored by the operator or by a service provider | 11(c) | Clear who holds the data |
| Passport stays available after an insolvency, liquidation or the operator leaving the EU | 11(e) | An exit plan that does not depend on one company staying in business |
| Authentication, reliability and integrity of the data; security and fraud protection | 11(g), 11(h) | Audit trail, signed changes, access logs |
| Providers may not sell, reuse or process the data beyond running the service, unless the operator agrees | 11 | A contract term that says so |

Two more duties sit outside those articles but belong on the list. The operator must upload the unique identifiers, and for goods in free circulation the commodity code, to the Commission's registry. The registry then returns a registration identifier, which [Article 13](https://eur-lex.europa.eu/eli/reg/2024/1781/oj) says is not proof of compliance. And where a new passport is created for a product that already has one, the new one must be linked to the original (Article 11(d)).

## What can nobody promise yet?

Be wary of claims that go further than the law does today.

**"Certified under the ESPR."** Article 11 lets the Commission set requirements for passport service providers and, where appropriate, a certification scheme. That is done through a delegated act. The Commission's June 2026 timeline placed it in 2027, and trackers give different quarters. We found no adopted act as of 7 November 2026. A vendor can show you an ISO certificate or a security audit. It cannot show you an official ESPR certification, because there is nothing to certify against.

**"Compliant with the standards."** The Commission cited six harmonised standards in [Decision (EU) 2026/1736](https://eur-lex.europa.eu/eli/dec_impl/2026/1736/oj) on 15 July 2026: EN 18216 on data exchange protocols, EN 18219 on unique identifiers, EN 18220 on data carriers, EN 18221 on data storage, archiving and persistence, EN 18222 on APIs for lifecycle management and searchability, and EN 18223 on system interoperability. Two more standards, on access rights and security and on authentication and integrity, are still pending, as far as we can tell from third-party sources. So "compliant with the standards" is incomplete by definition. Ask which ones, and which versions.

**"Ready for every product group."** The ESPR is a frame. Each product group needs its own act that says what data goes in, which data carrier to use and who may read what. Apart from batteries, which have their own passport under [Regulation (EU) 2023/1542](/blog/eu-batteries-regulation), the first of those acts, on iron and steel, is expected in Q4 2026. See our update on [what changed and what is next](/blog/digital-product-passport-latest-updates) for the dates. A tool built today has to cope with fields that are not defined yet.

![A person holding a phone in front of a laptop.](https://images.unsplash.com/photo-1706759755851-6163305080f0?w=1200&q=80)

*Photo by [Marielle Ursua](https://unsplash.com/@heyimmarielle_03?utm_source=bindu&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=bindu&utm_medium=referral)*

## Ten questions to ask a vendor

Put these in an email before the demo. A good vendor will answer in writing, and the way they answer tells you as much as the content.

1. **Which identifier scheme do you use, and does it follow ISO/IEC 15459?** The law ties the identifier and the data carrier to these standards or an equivalent.
2. **Can I export every passport in an open, machine-readable format at any time, and what does it cost?** This is the lock-in test. Article 10(1)(d) says the data must be transferable without vendor lock-in.
3. **Where is the back-up copy held, and who holds it?** Article 10(4) requires one through a service provider.
4. **What happens to my passports if you close, are sold, or I leave?** Article 11(e) wants them to stay available, including after an insolvency. Ask for the exit terms in the contract.
5. **Do you sell, reuse or process my data beyond running the service?** The law says a provider may not, unless the operator agrees. Get the answer in the contract.
6. **How do you set who can read and who can write each field?** Access rights will come from each product act, so ask how quickly the tool can change them when a new act lands.
7. **How do I get the data carrier to a dealer or marketplace within five working days?** The clock in Article 10(3) starts at the request, and the answer should not be "someone emails you".
8. **Which of the six cited standards do you map to, and which not?** Ask for the list. Treat a vague "yes" as a "no".
9. **How do you handle the registry upload and the registration identifier?** Find out whether the tool does the upload for you or only exports the data for you to upload.
10. **How do you collect supplier data, and can you show where each value came from?** A passport is only as good as the data behind it. Article 11(g) asks for authentication, reliability and integrity.

A pricing check helps too. Article 11(b) says the people with access rights, from customers to recyclers to customs, should have free and easy access to the passport. Be careful with any model that charges the reader.

## Which kind of tool do you need?

"Digital product passport software" covers three different jobs. Many tools do one well and the others thinly.

| Job | What it does | Who it matters to |
|---|---|---|
| Collecting supplier data | Gets materials, origin, substances and documents from your suppliers and checks them | Importers and brands who do not make the product |
| Creating and hosting the passport | Builds the passport, holds the data and the back-up, serves it behind the data carrier | Anyone with a product under an act |
| Registry and identifiers | Creates identifiers, uploads them to the registry, keeps the registration identifier | Anyone placing a covered product on the market |

Start with the first job. It is the slow one. The passport is built from supplier data, and collecting it takes months. The other two depend on rules that are still being set.

**Where Bindu fits.** Bindu works on the first job. Each supplier gets their own workspace, linked to their own systems, so nobody hands over an ERP. AI collects what is missing over email or WhatsApp, so nobody chases by hand. Use the ten questions on us as well. [See the battery passport breakdown](/dpp/battery) to see what that data looks like for the first product group.

## What to do this week

1. Work out whether any of your products falls under an act. Our guide on [which products need a digital product passport](/blog/which-products-need-a-digital-product-passport) lists the sectors.
2. Send the ten questions to the vendors you are looking at. Ask for written answers.
3. Ask your five biggest suppliers which passport data they already hold. This is the step no tool can do for you.

See how it works at [getbindu.com](https://getbindu.com).

## FAQ

**What is digital product passport software?**
It is software that helps an economic operator build, host or feed a digital product passport: the electronic record of a product's data, reached through a data carrier such as a QR code. The ESPR does not name any software. It sets requirements for the passport and the systems behind it.

Source: [EUR-Lex: Regulation (EU) 2024/1781, Articles 9 to 11](https://eur-lex.europa.eu/eli/reg/2024/1781/oj)

**Is there an official certification for digital product passport providers?**
Not yet. The ESPR allows the Commission to set requirements for service providers and a certification scheme through a delegated act. We found no adopted act as of 7 November 2026.

Source: [EUR-Lex: Regulation (EU) 2024/1781, Article 11](https://eur-lex.europa.eu/eli/reg/2024/1781/oj)

**Do I need a service provider for the digital product passport?**
The passport may be stored by the operator that creates it or by a service provider. But the operator must make a back-up copy available through a digital product passport service provider when placing the product on the market.

Source: [EUR-Lex: Regulation (EU) 2024/1781, Articles 10 and 11](https://eur-lex.europa.eu/eli/reg/2024/1781/oj)

**Can a provider use the data in my passports?**
Not beyond what is needed to run the storing or processing service, unless you agree with them specifically. The ESPR says so in Article 11.

Source: [EUR-Lex: Regulation (EU) 2024/1781, Article 11](https://eur-lex.europa.eu/eli/reg/2024/1781/oj)

**Which standards apply to the digital product passport?**
Six harmonised standards, EN 18216 and EN 18219 to EN 18223, cover data exchange, unique identifiers, data carriers, data storage, APIs and system interoperability. The Commission published their references on 15 July 2026.

Source: [EUR-Lex: Implementing Decision (EU) 2026/1736](https://eur-lex.europa.eu/eli/dec_impl/2026/1736/oj)

**Do I have to register a passport in the EU registry?**
The operator placing a covered product on the market must upload the unique identifiers to the registry. No product group has a passport duty in force yet, except batteries, which come under their own regime from 18 February 2027.

Source: [EUR-Lex: Regulation (EU) 2024/1781, Article 13](https://eur-lex.europa.eu/eli/reg/2024/1781/oj)

---

*This article reflects the official position as of 7 November 2026. The rules for passport service providers and for most product groups are still being adopted, so requirements can change. For anything after that date, check the European Commission's [digital product passport page](https://single-market-economy.ec.europa.eu/single-market/digital-product-passport_en) and the Official Journal on [EUR-Lex](https://eur-lex.europa.eu). This is general information, not legal advice.*
