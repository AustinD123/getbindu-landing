---
title: "What Data a Battery Passport Must Hold (Annex XIII)"
description: "A battery passport must carry the Annex XIII data: identity, carbon footprint, recycled content, due diligence, performance and recycling, at set access tiers."
category: "Reference"
author: "raahul-dutta"
image: "/images/blog/battery-passport-data.svg"
imageAlt: "What a battery passport must hold under Annex XIII: identity, carbon footprint and recycled content, due diligence, and dismantling data, shown by access tier."
regulations:
  - dpp
date: "2026-08-24"
order: 3
photo: "https://images.unsplash.com/photo-1670322196746-e8c6ea72ab90?w=1200&q=80"
photoAlt: "Lithium-ion battery cells seen from above, packed in tight rows."
photoCredit: "Vardan Papikyan"
photoCreditUrl: "https://unsplash.com/@varpap?utm_source=bindu&utm_medium=referral"
photo2: "https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?w=1200&q=80"
photo2Alt: "A charging cable plugged into the side of an electric car."
photo2Credit: "CHUTTERSNAP"
photo2CreditUrl: "https://unsplash.com/@chuttersnap?utm_source=bindu&utm_medium=referral"
---

A **battery passport** is a QR code linked to a digital record that a covered battery must carry. The record starts empty. What fills it is a fixed list of data, and most of that list does not live in the factory that assembled the battery.

That list is Annex XIII. Most of a passport project is spent filling it.

**At a glance:**

- A battery passport must carry the data set out in Annex XIII of Regulation (EU) 2023/1542.
- It covers every EV battery, every LMT battery, and every industrial battery over 2 kWh.
- The data spans identity, carbon footprint, recycled content, due diligence, performance, and recycling.
- Most fields come from across the supply chain, not from the final assembler.
- Annex XIII splits the record into four blocks: one public, three restricted, and one of those is per unit rather than per model.

## Where the requirements come from

The content of a battery passport is not left to the maker. It is set in Annex XIII of the [EU Batteries Regulation](https://eur-lex.europa.eu/eli/reg/2023/1542/oj/eng), Regulation (EU) 2023/1542.

**Annex XIII** is the part of that regulation that lists the exact fields a battery passport must carry. Think of it as the schema the passport has to fill. It is the same schema for every EV, LMT, and industrial battery over 2 kWh. The [battery passport](/blog/battery-passport) itself is just the shell. Annex XIII is what goes inside it.

## What a battery passport must hold

The data falls into seven groups, such as identity, composition and carbon footprint. None of it is a marketing sheet. Each field is evidence, and it has to stay accurate for the life of the battery.

The hardest column below is the last one. Most groups start somewhere other than the factory that assembled the pack.

| Data group | What it holds | Where the data usually starts |
|---|---|---|
| Identity and model | Manufacturer, model, and a unique unit identifier | The pack maker and the operator |
| Composition and materials | What the battery is made of, including critical raw materials | Cell and material suppliers |
| Carbon footprint | The declared carbon footprint on the set method | Cell manufacturing |
| Recycled content | The share of recycled cobalt, lithium, nickel, and lead | Material suppliers |
| Performance and durability | How the battery performs and how long it lasts | Manufacturer testing |
| Supply-chain due diligence | The record showing the sourcing was checked | Raw-material sourcing up the chain |
| Dismantling and recycling | What a recycler needs to open it safely | The pack designer and maker |

## Two fields worth pinning down

Two of these fields cause the most confusion, so it helps to state each one plainly.

**The carbon footprint** is the battery's declared greenhouse-gas total, calculated on the method set in the regulation. It is not a marketing number. It follows one fixed method, so passports can be compared like for like.

**Recycled content** refers to the share of recycled cobalt, lithium, nickel, and lead fed back into the battery. It is reported per material. There is no single headline figure that stands in for all four.

## The data lives across the supply chain

Almost none of that data sits in one place.

The carbon footprint comes from how the cells were made, often in another country. The recycled-content shares come from the material suppliers. The due-diligence record follows the raw materials back up the chain. The operator that places the battery on the market has to gather all of it and stand behind it.

So a passport is a data-collection exercise long before it is a QR code. It is the same problem [CBAM](/blog/what-is-cbam) importers face with emissions, and the one [EUDR](/blog/what-is-an-eudr-dds) operators face with plot coordinates.

### A worked example

Take one EV battery pack. Here is where each field tends to come from.

- The pack assembler sets the identity: manufacturer, model, and the unique unit ID.
- The cell plant, perhaps on another continent, supplies the carbon footprint figure.
- The cathode material supplier reports the recycled cobalt, lithium, and nickel shares.
- The sourcing teams for those materials supply the due-diligence record.
- The pack designer supplies the dismantling and recycling instructions.

Five parties, one passport. The operator collects all five inputs and signs off on the result. Miss one input and the passport is incomplete. That is why the work starts long before the QR code is printed.

## What falls outside the passport

The passport does not cover every battery. It applies to three groups: EV batteries, LMT batteries, and industrial batteries over 2 kWh.

A battery outside those groups does not need a passport of its own. A small portable battery in a household device is one example. An industrial battery at or below 2 kWh sits outside the rule too. Getting the scope right matters, because it decides whether the Annex XIII list applies at all.

## Who sees what: access tiers

Not everything in the passport is public. Annex XIII splits it into four blocks, not the three that most summaries describe. Three of them describe the battery model. The fourth describes the individual unit, and it is the one block the Commission has no access to.

| Annex XIII point | Who can see it | What sits there |
|---|---|---|
| 1. Public | Anyone who scans the QR code | Material composition, carbon footprint, recycled and renewable content, rated capacity, expected lifetime in cycles, the EU declaration of conformity |
| 2. Legitimate interest and the Commission | Recyclers, repairers and others with a defined need | Detailed cathode, anode and electrolyte composition, spare-part numbers, dismantling diagrams and sequences, safety measures |
| 3. Notified bodies, market authorities and the Commission | Regulators and conformity bodies | Test reports proving compliance |
| 4. Legitimate interest only, per unit | Recyclers, repairers and others with a defined need | State of health, status, charge and discharge cycles, recorded temperature, accidents |

Points 1 to 3 are model-level, so they are the same for every battery of that design. Point 4 changes over the life of the one battery in your hand.

Access inside your own tier is free. Article 78 gives consumers, economic operators and other actors the passport free of charge, but only at the level their access rights allow. So a single passport serves a shopper, a recycler and a regulator from the same QR code, and each sees only the slice they are entitled to.

## What happens to the passport later

The passport is not filed once and left alone. Article 77 ties it to the battery's own life.

Repurpose or remanufacture a battery and it needs a new passport, linked back to the passport of the battery it came from. The duty moves with it, to whoever places the repurposed battery on the market. Once the battery becomes waste, responsibility passes to the producer, to the producer responsibility organisation, or to the selected waste operator.

There is no retention period to diarise. The passport ends when the battery is recycled. Until then it has to stay reachable even if the operator that created it stops trading, which is why the record cannot live only in one company's systems.

The Commission also keeps a [batteries overview](https://environment.ec.europa.eu/topics/waste-and-recycling/batteries_en) alongside the legal text.

**Where Bindu fits.** Bindu builds the passport template from the Annex XIII fields and records who owns each one and when it was last updated. That ownership trail is what decides whether the passport is still true a year after the battery ships. [See the battery passport breakdown](/dpp/battery).

## FAQ

**What data must a battery passport contain?**
The information listed in Annex XIII of the [EU Batteries Regulation](/blog/eu-batteries-regulation): battery identity and model, composition and materials, carbon footprint, recycled-content shares, performance and durability, supply-chain due diligence, and dismantling and recycling information.

Source: [EUR-Lex: EU Batteries Regulation (EU) 2023/1542, Annex XIII](https://eur-lex.europa.eu/eli/reg/2023/1542/oj/eng)

**What is Annex XIII?**
Annex XIII is the part of the EU Batteries Regulation that lists the exact fields a battery passport must carry. It is the schema every covered battery passport has to fill.

Source: [EUR-Lex: EU Batteries Regulation (EU) 2023/1542, Annex XIII](https://eur-lex.europa.eu/eli/reg/2023/1542/oj/eng)

**Is all battery passport data public?**
No. Annex XIII splits it into four blocks: a public view for anyone who scans, a wider model-level view for parties with a legitimate interest and the Commission, test reports for notified bodies and market-surveillance authorities, and per-unit use data for parties with a legitimate interest only.

Source: [EUR-Lex: EU Batteries Regulation (EU) 2023/1542, Article 77](https://eur-lex.europa.eu/eli/reg/2023/1542/oj/eng)

Source: [EUR-Lex: Regulation (EU) 2023/1542 consolidated to 31 July 2025, Annex XIII](https://eur-lex.europa.eu/eli/reg/2023/1542/2025-07-31/eng)

**Where does battery passport data come from?**
From across the supply chain. The carbon footprint comes from cell manufacturing, recycled-content shares from material suppliers, and the due-diligence record from raw-material sourcing. The operator placing the battery on the market must gather and stand behind all of it.

Source: [European Commission: Batteries](https://environment.ec.europa.eu/topics/waste-and-recycling/batteries_en)

**Does a battery passport include a carbon footprint?**
Yes. A declared carbon footprint, calculated on the method set in the regulation, is one of the required Annex XIII fields for covered batteries.

Source: [EUR-Lex: EU Batteries Regulation (EU) 2023/1542, Annex XIII](https://eur-lex.europa.eu/eli/reg/2023/1542/oj/eng)
