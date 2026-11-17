---
title: "EUDR Cocoa Compliance for Co-operatives and Buyers"
description: "EUDR cocoa compliance is hard because most beans come from tiny farms. See how co-operatives map plots, keep lots clean, and let EU buyers file the DDS."
category: "Guide"
author: "raahul-dutta"
regulations: ["eudr"]
image: "/images/blog/eudr-cocoa.svg"
imageAlt: "EUDR cocoa flow: map every smallholder plot, keep mapped lots apart at the buying station, pass the plot data to the EU buyer, buyer files one DDS."
date: "2026-09-26"
order: 8
photo: "https://images.unsplash.com/photo-1564491683755-fb07a55a5299?w=1200&q=80"
photoAlt: "A woman sits smiling among piles of freshly harvested yellow cocoa pods in a shaded cocoa grove in Ghana."
photoCredit: "Tobias Nii Kwatei Quartey"
photoCreditUrl: "https://unsplash.com/@kingtobie?utm_source=bindu&utm_medium=referral"
photo2: "https://images.unsplash.com/photo-1545567724-9b16e57c906d?w=1200&q=80"
photo2Alt: "A dense bed of dried brown cocoa beans filling the frame, seen from directly above."
photo2Credit: "Kristiana Pinne"
photo2CreditUrl: "https://unsplash.com/@kristianapinne?utm_source=bindu&utm_medium=referral"
---

A co-operative buys from 1,400 farmers. Each one walks in with a few bags. The bags go into one heap, the heap goes into one truck, and the truck goes to the port. That system has worked for fifty years.

It does not work under the EUDR.

**EUDR cocoa** is cocoa that can be traced to the plots it grew on, shown to be legal, and shown to be free of deforestation after the cutoff date. Coffee and palm have plantations to point at. Cocoa has small farms, buying stations and co-operatives. The same law lands very differently here.

**At a glance:**

- **EUDR** is [Regulation (EU) 2023/1115](https://eur-lex.europa.eu/eli/reg/2023/1115/2025-12-26/eng), the EU Deforestation Regulation. Cocoa beans sit in Annex I under CN heading 1801.
- Large and medium operators must comply by 30 December 2026. Micro and small operators follow on 30 June 2027.
- Article 9 asks for the geolocation of every plot: one point for a small plot, a polygon once the plot passes four hectares.
- Nothing may come from land cleared after 31 December 2020, even where the clearing was legal at home.
- Mixing is the cocoa problem. Once mapped and unmapped beans share a heap, nobody can file for that heap.

## Why cocoa is the hard case

Most of the world's cocoa grows on small family farms. A farmer may work two or three hectares, sometimes in plots that do not touch each other. Those beans are fermented and dried at home, then sold to the nearest buyer.

That first step is where the paper trail thins out. Beans pass through a co-operative, a licensed buying company or an independent trader before they reach anyone who keeps digital records. In Ghana, for example, cocoa moves through buying sheds and district depots, where bags are sorted, re-cleaned and mixed. In Côte d'Ivoire the same job is done by pisteurs, who buy at the farm gate.

A **co-operative** is the point where hundreds of separate farms become one sellable lot. Under the old way of working, that was its whole value. Under the EUDR, it is also the point of greatest risk, because a lot is only as clean as its worst bag.

Read [what is EUDR](/blog/what-is-eudr) for the rule in plain terms.

## What the law actually asks for

Strip away the noise and the duty is short. Three things, for every plot.

| What is needed | What it means | The rule |
|---|---|---|
| Plot geolocation | Where each plot sits, to six decimal places | Article 9(1)(d), with Article 2(28) on points and polygons |
| Legality evidence | Proof the cocoa was grown lawfully | Article 2(40), covering eight areas of law |
| Deforestation status | Proof the land was not cleared after the cutoff | 31 December 2020, whatever local law allowed |

**Geolocation** is the geographic location of a plot, given as latitude and longitude with at least six decimal digits. A plot larger than four hectares needs a polygon that traces its real boundary. Smaller plots need one point inside them. Most cocoa plots are small, so most rows are single points.

A **plot of land** is land inside one real estate property, as recognised by the law of the country where it grew, with conditions even enough to judge the deforestation risk as a whole. Two fields owned by the same farmer that do not touch are two plots, not one. That detail alone multiplies the row count for a co-operative.

The legality side covers eight areas under Article 2(40): land use rights, environmental protection, forest rules, third party rights, labour rights, human rights, free prior and informed consent, and tax, anti-corruption, trade and customs. Cocoa growers often lack formal land title, so this is rarely a filing exercise. It is fieldwork.

## The aggregation problem

Here is the part that catches co-operatives out. The Commission's [guidance notice](https://eur-lex.europa.eu/eli/C/2025/4524/oj) is blunt about mixing: a chain of custody that allows known and unknown material to blend does not meet the rule, and mass balance does not either. Volume credits do not work. The physical beans have to stay apart.

So the buying station has to change shape. Mapped cocoa goes in one store, unmapped cocoa in another, and the two never meet in a bag, a truck or a container. Keeping them apart is hardest at the farm and at the first point of purchase, which is exactly where cocoa has always been pooled.

One unmapped farmer does not spoil his own bag. He spoils the container.

That is why buyers now ask for lot-level separation before they ask for anything else. A co-operative that can show clean lots is a supplier. One that cannot is a risk, whatever else is in its file.

## A worked example: one co-operative, 1,400 farmers

Take the co-operative from the opening. The figures below are round and illustrative, not real numbers, but the shape is real.

| Step | What it produces | Where it goes |
|---|---|---|
| Map 1,400 farmers, 2,100 plots | Points for small plots, polygons above four hectares | One GeoJSON file, reused each season |
| Screen every plot against the cutoff | A pass or fail per plot, with the date checked | The evidence file behind the lot |
| Gather legality documents by sourcing area | Titles, permits, registry entries | The same evidence file |
| Exclude what cannot be proved | A named list of plots kept out of the lot | The buying station's segregation rule |
| Hand the pack to the buyer | Plot data plus evidence, lot by lot | The buyer's due diligence statement |

Note the fourth row. Most co-operatives skip it, and it is the one buyers read first. If forty plots cannot be mapped this season, say so, keep their beans out, and show the decision. An honest exclusion list is worth more than a suspiciously complete one.

Work the rows once and they carry. Plot mapping is slow the first season and cheap after that.

## Who files, and by when

An **operator** is the party that first places cocoa on the EU market, and only the operator files the due diligence statement, or DDS. For most cocoa, that is the EU importer or the chocolate maker, not the exporter and not the co-operative. Producers supply the data. See [what is an EUDR DDS](/blog/what-is-an-eudr-dds) for the filing itself.

Downstream companies do not repeat the whole exercise. They can point at the statement already filed upstream by quoting its [DDS reference number](/blog/eudr-dds-reference-number) in the EU system, which is why that number travels with the shipment.

The dates are fixed. Large and medium operators apply the rule from [30 December 2026](https://eur-lex.europa.eu/eli/reg/2025/2650/oj/eng). Micro and small operators follow on 30 June 2027. The regulation was postponed twice, so ignore any 2024 or 2025 deadline still floating around in supplier emails.

Enforcement is sampled, not universal. Member State authorities must check at least 9% of operators sourcing from a high risk country each year, 3% at standard risk and 1% at low risk, under Article 16 of [Regulation (EU) 2023/1115](https://eur-lex.europa.eu/eli/reg/2023/1115/2025-12-26/eng). Low odds, high cost. A held container in Antwerp costs more than mapping a season of plots.

For the same handover seen from the farm side of another commodity, see [EUDR for coffee exporters](/blog/eudr-coffee-exporters).

**Where Bindu fits.** A co-operative that hands over 2,100 plot coordinates has handed over its whole supply base, and that is a real fear, not a small one. Bindu keeps your plots and documents in your own workspace and gives the buyer standing access to a package rather than a copy. [See how it works](/eudr).

## FAQ

**Is cocoa covered by the EUDR?**
Yes. Cocoa is one of the seven commodities in scope, alongside cattle, coffee, oil palm, rubber, soya and wood. Cocoa beans appear in Annex I under CN heading 1801. Derived goods such as cocoa paste, cocoa butter, cocoa powder and chocolate are in scope too, so a chocolate maker inherits the duty through its ingredients.

Source: [EUR-Lex: EUDR, Regulation (EU) 2023/1115 (consolidated)](https://eur-lex.europa.eu/eli/reg/2023/1115/2025-12-26/eng)

**Does every smallholder plot need a polygon?**
No. A plot of more than four hectares needs a polygon tracing its boundary. Anything at or below that size needs at least one latitude and longitude point, given to six decimal digits. Most cocoa plots are small, so points cover the bulk of the work. Separate fields belonging to one farmer count as separate plots.

Source: [EUR-Lex: EUDR, Regulation (EU) 2023/1115 (consolidated)](https://eur-lex.europa.eu/eli/reg/2023/1115/2025-12-26/eng)

**Can a co-operative pool mapped and unmapped beans?**
No. Blending known and unknown material breaks the rule, and mass balance schemes are not accepted either. Mapped cocoa must be kept apart from the first purchase onwards, in its own store, truck and container. This is the single biggest change to how a buying station works.

Source: [European Commission: Guidance document for Regulation (EU) 2023/1115](https://eur-lex.europa.eu/eli/C/2025/4524/oj)

**When do EUDR cocoa rules start to bite?**
Large and medium operators must comply from 30 December 2026, and micro and small operators from 30 June 2027. In practice the pressure arrives earlier, because EU buyers qualify their cocoa suppliers a season or two ahead of their own deadline.

Source: [EUR-Lex: Regulation (EU) 2025/2650 (second postponement)](https://eur-lex.europa.eu/eli/reg/2025/2650/oj/eng)

## Start with the plots

Everything in this post hangs off one file: the list of plots, with coordinates, mapped once and kept current. Legality documents, cutoff screening and clean lots all attach to that list. Without it, nothing else can be filed.

Map the farms, split the stores, write the exclusion list. Then the EU buyer can file, and your cocoa keeps moving. [Book a demo](/eudr) and get the plot file started before the next main crop.
