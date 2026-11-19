// AUTO-EXTRACTED verbatim from the Full Circle theatre source (full-circle-tabs.html,
// stage markup lines 212-506). Do not hand-edit the geometry here — it is the exact
// stage art the GSAP choreography in theatre.tsx animates by id/class. Injected via
// dangerouslySetInnerHTML.
//
// 2026-08-11 styling pass (owner request, Ditto illustration language): stroke
// weights, node radii, caps and node outlines were bolded across all three
// acts. Coordinates, ids, classes and path `d` data are untouched — the
// choreography sees identical geometry.

export const THEATRE_STAGES_HTML = `<div class="stage-wrap active" id="act1">
  <div class="stage" id="stage1box">
    <svg viewBox="0 0 1200 660" aria-label="Act one stage: three trade routes from Amsterdam">
      <defs>
        <clipPath id="a1-dataclip"><rect id="a1-dataclipr" x="115" y="335" width="840" height="26"/></clipPath>
        <clipPath id="a1-routeCclip"><rect id="a1-routeCclipr" x="340" y="320" width="680" height="200"/></clipPath>
      </defs>
      <!-- frame -->
      <line x1="40" y1="580" x2="1160" y2="580" stroke="var(--line)" stroke-width="1.5"/>
      <line id="a1-border" x1="880" y1="90" x2="880" y2="580" stroke="var(--ink-soft)" stroke-width="1.2" stroke-dasharray="2 7"/>
      <text x="888" y="106" font-family="ui-monospace,Menlo,monospace" font-size="11" letter-spacing="2" fill="var(--ink-soft)">EU BORDER</text>
      <!-- desk -->
      <circle id="a1-desk" cx="1000" cy="330" r="13" fill="var(--cobalt)" stroke="var(--ink)" stroke-width="2.5"/>
      <text x="1040" y="362" text-anchor="middle" font-family="ui-monospace,Menlo,monospace" font-size="11" letter-spacing="1.5" fill="var(--ink)">RAHUL &#183; AMSTERDAM</text>
      <!-- socket at the desk -->
      <path id="a1-socket" d="M 962 322 v 16 h -12 v -16" fill="none" stroke="var(--ink)" stroke-width="2.5" opacity="0"/>

      <!-- ROUTE A (top) -->
      <path id="a1-routeA" d="M 1000 330 C 820 210 560 165 360 165" fill="none" stroke="var(--refuse)" stroke-width="6.5" stroke-linecap="round"/>
      <circle id="a1-nodeA" cx="360" cy="165" r="12" fill="var(--refuse)" stroke="var(--ink)" stroke-width="2.5"/>
      <text x="360" y="140" text-anchor="middle" font-family="ui-monospace,Menlo,monospace" font-size="10" letter-spacing="1.5" fill="var(--ink-soft)">TRADER A</text>
      <path id="a1-frayA" d="M 352 165 l -26 0 m 0 0 l -9 -7 m 9 7 l -9 7" fill="none" stroke="var(--refuse)" stroke-width="3" stroke-linecap="round" opacity="0"/>
      <!-- bounced question tokens -->
      <circle class="a1-q" r="7" fill="var(--ink)" opacity="0"/>
      <circle class="a1-q" r="7" fill="var(--ink)" opacity="0"/>
      <circle class="a1-q" r="7" fill="var(--ink)" opacity="0"/>

      <!-- ROUTE B (middle): desk&#8594;B, B&#8594;agent, agent&#8594;mill -->
      <path id="a1-b1" d="M 1000 330 L 360 330" fill="none" stroke="var(--leaf)" stroke-width="6.5" stroke-linecap="round"/>
      <path id="a1-b2" d="M 360 330 L 235 330" fill="none" stroke="var(--leaf)" stroke-width="6.5" stroke-linecap="round"/>
      <path id="a1-b3" d="M 235 330 L 115 330" fill="none" stroke="var(--leaf)" stroke-width="6.5" stroke-linecap="round"/>
      <circle id="a1-nodeB" cx="360" cy="330" r="12" fill="var(--leaf)" stroke="var(--ink)" stroke-width="2.5"/>
      <text x="360" y="305" text-anchor="middle" font-family="ui-monospace,Menlo,monospace" font-size="10" letter-spacing="1.5" fill="var(--ink-soft)">TRADER B</text>
      <circle id="a1-nodeAg" cx="235" cy="330" r="10" fill="var(--leaf)" stroke="var(--ink)" stroke-width="2.5"/>
      <text x="235" y="305" text-anchor="middle" font-family="ui-monospace,Menlo,monospace" font-size="10" letter-spacing="1.5" fill="var(--ink-soft)">AGENT</text>
      <rect id="a1-mill" x="97" y="312" width="36" height="36" fill="#fff" stroke="var(--leaf)" stroke-width="3.5"/>
      <text x="115" y="388" text-anchor="middle" font-family="ui-monospace,Menlo,monospace" font-size="10" letter-spacing="1.5" fill="var(--ink-soft)">THE MILL</text>
      <!-- handshake ticks -->
      <path class="a1-tick" d="M 354 288 l 5 6 l 9 -11" fill="none" stroke="var(--leaf)" stroke-width="3.5" stroke-linecap="round" opacity="0"/>
      <path class="a1-tick" d="M 229 288 l 5 6 l 9 -11" fill="none" stroke="var(--leaf)" stroke-width="3.5" stroke-linecap="round" opacity="0"/>
      <path class="a1-tick" d="M 109 288 l 5 6 l 9 -11" fill="none" stroke="var(--leaf)" stroke-width="3.5" stroke-linecap="round" opacity="0"/>
      <!-- data line back: mill &#8594; desk, dashed, with plug -->
      <path id="a1-data" d="M 115 348 L 946 348" fill="none" stroke="var(--leaf)" stroke-width="3.5" stroke-dasharray="8 7" clip-path="url(#a1-dataclip)"/>
      <path id="a1-plugB" d="M 946 341 h 12 v 14 h -12 z" fill="var(--leaf)" opacity="0"/>

      <!-- ROUTE C (bottom) -->
      <path id="a1-routeC" d="M 1000 330 C 820 450 560 495 360 495" fill="none" stroke="var(--ochre)" stroke-width="5" stroke-linecap="round" stroke-dasharray="0.5 13" clip-path="url(#a1-routeCclip)"/>
      <circle id="a1-nodeC" cx="360" cy="495" r="12" fill="var(--ochre)" stroke="var(--ink)" stroke-width="2.5"/>
      <text x="360" y="470" text-anchor="middle" font-family="ui-monospace,Menlo,monospace" font-size="10" letter-spacing="1.5" fill="var(--ink-soft)">TRADER C</text>
      <!-- C's walled garden -->
      <g id="a1-wall" opacity="0">
        <rect x="285" y="510" width="150" height="66" fill="none" stroke="var(--ochre)" stroke-width="2.5"/>
        <line x1="315" y1="510" x2="315" y2="576" stroke="var(--ochre)" stroke-width="1.5"/>
        <line x1="345" y1="510" x2="345" y2="576" stroke="var(--ochre)" stroke-width="1.5"/>
        <line x1="375" y1="510" x2="375" y2="576" stroke="var(--ochre)" stroke-width="1.5"/>
        <line x1="405" y1="510" x2="405" y2="576" stroke="var(--ochre)" stroke-width="1.5"/>
        <rect x="295" y="524" width="34" height="8" fill="var(--ochre)" opacity=".6"/>
        <rect x="295" y="540" width="52" height="8" fill="var(--ochre)" opacity=".6"/>
        <rect x="295" y="556" width="26" height="8" fill="var(--ochre)" opacity=".6"/>
      </g>
      <!-- C's wrong-shaped plug -->
      <path id="a1-plugC" d="M 700 430 l 16 8 l -16 8 z" fill="var(--ochre)" opacity="0"/>

      <!-- QR + tee (persist to act III) -->
      <g id="a1-tee" opacity="0">
        <path d="M 985 220 l 15 -12 h 30 l 15 12 l -8 12 l -7 -5 v 40 h -30 v -40 l -7 5 z" fill="#fff" stroke="var(--ink)" stroke-width="2"/>
      </g>
      <g id="a1-qr" opacity="0"></g>
    </svg>

    <!-- HTML overlays -->
    <div class="ov slug" id="a1-slug">
      <span>SC 01 &#183; INT. AMSTERDAM DESK &#183; MORNING</span>
      <span>SC 02 &#183; ROUTE A &#183; THE BEST PRICE</span>
      <span>SC 03 &#183; ROUTE B &#183; THE DATASPACE</span>
      <span>SC 04 &#183; ROUTE C &#183; THE WALLED GARDEN</span>
      <span>SC 05 &#183; ACT I CURTAIN</span>
    </div>

    <div class="ov qcard" id="a1-cardA" style="left:38%; top:6%;">
      <div class="price">&#8364;2.10<span style="font-size:.6em">/pc</span></div>
      <div class="meta">ships friday &#183; origin: none &#183; audit: none</div>
    </div>
    <div class="ov qcard" id="a1-cardB" style="left:56%; top:6%;">
      <div class="price">&#8364;2.60<span style="font-size:.6em">/pc</span></div>
      <div class="meta">ships in 9 days &#183; full passport</div>
    </div>
    <div class="ov qcard" id="a1-cardC" style="left:74%; top:6%;">
      <div class="price">&#8364;2.35<span style="font-size:.6em">/pc</span></div>
      <div class="meta">"we have all the data"</div>
    </div>

    <div class="ov panel green" id="a1-twin" style="left:4%; top:56%; width:24%;">
      <div class="ph">DIGITAL TWIN &#183; LOT 4417</div>
      <div id="a1-twin1">cotton &#183; Gujarat IN</div>
      <div id="a1-twin2">cert &#183; GOTS 7.0 &#10003;</div>
      <div id="a1-twin3">dye house &#183; Tiruppur</div>
      <div id="a1-twin4">water &#183; 2,140 L / energy &#183; 96 kWh</div>
    </div>

    <div class="ov stamp no"   id="a1-stampA" style="left:37%; top:17%;">DECLINED &#183; NO STORY</div>
    <div class="ov stamp ok"   id="a1-stampB" style="left:55%; top:17%;">SELECTED</div>
    <div class="ov stamp warn" id="a1-stampC" style="left:71%; top:17%;">DECLINED &#183; CAN'T CONNECT</div>

    <div class="ov cap" id="a1-cap1">"Rahul buys the world and sells it to Europe. From here on,
      <b>nothing crosses without its story.</b>" Same tee. Three quotes. Three very different answers.</div>
    <div class="ov cap" id="a1-cap2">"Best price, brother. Ship Friday." &#183; "Where's the cotton from?" &#183; <b>silence.</b></div>
    <div class="ov cap" id="a1-cap3">"He didn't have the answer. He had something better: <b>a wire to whoever did.</b>"
      By evening the passport was on Rahul's desk. The cotton hadn't left the mill.</div>
    <div class="ov cap" id="a1-cap4">"We have all the data." He did. It lived in a <b>beautiful prison.</b></div>
    <div class="ov cap" id="a1-cap5">Price gets you to the table. Proof gets you across the border.
      <b>Protocol is how proof travels.</b></div>
  </div>
</div>


<div class="stage-wrap" id="act2">
  <div class="stage">
    <svg viewBox="0 0 1200 660" aria-label="Act two stage: three coffee origins and the cooperative cascade">
      <!-- frame (same geometry) -->
      <line x1="40" y1="580" x2="1160" y2="580" stroke="var(--line)" stroke-width="1.5"/>
      <line x1="880" y1="90" x2="880" y2="580" stroke="var(--ink-soft)" stroke-width="1.2" stroke-dasharray="2 7"/>
      <text x="888" y="106" font-family="ui-monospace,Menlo,monospace" font-size="11" letter-spacing="2" fill="var(--ink-soft)">EU BORDER</text>
      <circle cx="1000" cy="330" r="13" fill="var(--leaf)" stroke="var(--ink)" stroke-width="2.5"/>
      <text x="1040" y="362" text-anchor="middle" font-family="ui-monospace,Menlo,monospace" font-size="11" letter-spacing="1.5" fill="var(--ink)">RAHUL &#183; AMSTERDAM</text>
      <!-- mountain -->
      <path d="M 40 580 L 150 430 L 230 500 L 330 380 L 430 580" fill="none" stroke="var(--line)" stroke-width="1.5"/>

      <!-- routes -->
      <path id="a2-rA" d="M 1000 330 C 820 230 600 185 400 185" fill="none" stroke="var(--leaf)" stroke-width="6" stroke-linecap="round"/>
      <path id="a2-rB" d="M 1000 330 L 480 330" fill="none" stroke="var(--leaf)" stroke-width="6.5" stroke-linecap="round"/>
      <path id="a2-rC" d="M 1000 330 C 820 440 620 490 440 490" fill="none" stroke="var(--leaf)" stroke-width="6" stroke-linecap="round"/>
      <circle id="a2-nA" cx="400" cy="185" r="11" fill="var(--leaf)" stroke="var(--ink)" stroke-width="2.5"/>
      <text x="400" y="160" text-anchor="middle" font-family="ui-monospace,Menlo,monospace" font-size="10" letter-spacing="1.5" fill="var(--ink-soft)">ORIGIN A</text>
      <circle id="a2-nB" cx="480" cy="330" r="12" fill="var(--leaf)" stroke="var(--ink)" stroke-width="2.5"/>
      <text x="480" y="305" text-anchor="middle" font-family="ui-monospace,Menlo,monospace" font-size="10" letter-spacing="1.5" fill="var(--ink-soft)">SUPPLIER</text>
      <circle id="a2-coop" cx="330" cy="415" r="12" fill="var(--leaf)" stroke="var(--ink)" stroke-width="2.5"/>
      <text x="330" y="445" text-anchor="middle" font-family="ui-monospace,Menlo,monospace" font-size="10" letter-spacing="1.5" fill="var(--ink-soft)">COOPERATIVE</text>
      <path id="a2-rBcoop" d="M 480 330 L 330 415" fill="none" stroke="var(--leaf)" stroke-width="5.5" stroke-linecap="round"/>
      <circle id="a2-nC" cx="440" cy="490" r="11" fill="var(--leaf)" stroke="var(--ink)" stroke-width="2.5"/>
      <text x="440" y="520" text-anchor="middle" font-family="ui-monospace,Menlo,monospace" font-size="10" letter-spacing="1.5" fill="var(--ink-soft)">ORIGIN C</text>

      <!-- origin A polygon + satellite overlay -->
      <g id="a2-plotWrap" opacity="0">
        <path id="a2-plot" d="M 130 150 l 90 -18 l 55 40 l -22 62 l -95 8 l -32 -54 z" fill="var(--leaf)" fill-opacity=".35" stroke="var(--leaf)" stroke-width="3" stroke-linejoin="round"/>
        <text x="175" y="120" font-family="ui-monospace,Menlo,monospace" font-size="10" letter-spacing="1.5" fill="var(--ink-soft)">PLOT &#183; ORIGIN A</text>
      </g>
      <g id="a2-satWipe" opacity="0">
        <rect id="a2-satRect" x="105" y="125" width="0" height="130" fill="var(--refuse)" fill-opacity=".18"/>
      </g>

      <!-- farmer plots (positions filled by JS) -->
      <g id="a2-farmers"></g>

      <!-- question token -->
      <circle id="a2-q" r="7" fill="var(--ink)" opacity="0"/>
    </svg>

    <div class="ov slug" id="a2-slug">
      <span>SC 06 &#183; SAME DESK, DIFFERENT CARGO</span>
      <span>SC 07 &#183; ORIGIN A &#183; THE WRONG PLOT</span>
      <span>SC 08 &#183; ORIGIN B &#183; THE COOPERATIVE</span>
      <span>SC 09 &#183; ORIGIN C &#183; SILENCE</span>
    </div>

    <div class="ov hud" id="a2-cutline" style="left:50%; top:90.5%; transform:translateX(-50%); color:var(--leaf);"></div>
    <div class="ov hud" id="a2-days" style="right:3.5%; top:4.5%;"></div>

    <div class="ov panel" id="a2-reg" style="left:26%; top:14%; width:17%;">
      <div class="ph">LAND REGISTRY</div>
      <div>title &#183; <span style="color:#E07A66">none found</span></div>
      <div>class &#183; state forest</div>
    </div>
    <div class="ov panel" id="a2-sat" style="left:26%; top:31%; width:17%;">
      <div class="ph">SATELLITE</div>
      <div>canopy &#183; until 2022</div>
      <div>then &#183; <span style="color:#E07A66">bare ground</span></div>
    </div>
    <div class="ov panel green" id="a2-dds" style="left:72%; top:56%; width:23%;">
      <div class="ph">DUE DILIGENCE STATEMENT</div>
      <div>plots &#183; 412 &#10003; &nbsp; legality &#183; 412 &#10003;</div>
      <div>ref &#183; <span id="a2-ref"></span></div>
    </div>

    <div class="ov stamp no" id="a2-stampA" style="left:12%; top:44%;">DECLINED &#183; NOT LEGAL</div>
    <div class="ov stamp ok" id="a2-stampB" style="left:73%; top:47%;">SELECTED</div>
    <div class="ov stamp no" id="a2-stampC" style="left:44%; top:79%;">DECLINED &#183; NO STORY</div>

    <div class="ov cap" id="a2-cap1">Textiles ask where a shirt was made. Coffee asks something harder:
      <b>show me the exact patch of earth.</b></div>
    <div class="ov cap" id="a2-cap2">"The paperwork said farm. <b>The satellite said forest, until 2022.</b>"</div>
    <div class="ov cap" id="a2-cap3">"One question went down the mountain.
      <b>Four hundred small answers came back up.</b>" Filed before the ship left port.</div>
    <div class="ov cap" id="a2-cap4">Third origin, third week of waiting. <b>Some silences are answers.</b></div>
  </div>
</div>


<div class="stage-wrap" id="act3">
  <div class="stage">
    <svg viewBox="0 0 1200 660" aria-label="Act three stage: shopper, recycler, customs, and the closing circle">
      <line x1="40" y1="580" x2="1160" y2="580" stroke="var(--line)" stroke-width="1.5"/>

      <!-- shop: rack + tee + coffee bag -->
      <g id="a3-shop" opacity="0">
        <line x1="120" y1="150" x2="430" y2="150" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>
        <line x1="130" y1="150" x2="130" y2="580" stroke="var(--line)" stroke-width="1.5"/>
        <line x1="420" y1="150" x2="420" y2="580" stroke="var(--line)" stroke-width="1.5"/>
        <g id="a3-tee">
          <line x1="250" y1="150" x2="250" y2="185" stroke="var(--ink)" stroke-width="1.5"/>
          <path d="M 215 197 l 20 -14 h 30 l 20 14 l -9 14 l -8 -6 v 52 h -36 v -52 l -8 6 z" fill="#fff" stroke="var(--ink)" stroke-width="2"/>
          <rect id="a3-teeqr" x="240" y="215" width="20" height="20" fill="none" stroke="var(--ink)" stroke-width="1.4"/>
        </g>
        <g id="a3-bag">
          <path d="M 330 200 h 44 l 6 60 h -56 z" fill="#fff" stroke="var(--ochre)" stroke-width="2"/>
          <text x="352" y="238" text-anchor="middle" font-family="ui-monospace,Menlo,monospace" font-size="9" fill="var(--ochre)">COFFEE</text>
        </g>
      </g>
      <path id="a3-beam" d="M 240 205 L 262 205" stroke="var(--ochre)" stroke-width="5" stroke-linecap="round" opacity="0"/>

      <!-- recycler conveyor -->
      <g id="a3-conv" opacity="0">
        <line id="a3-belt" x1="520" y1="300" x2="900 " y2="300" stroke="var(--ink)" stroke-width="4.5" stroke-dasharray="14 10"/>
        <g id="a3-tee2">
          <path d="M 545 258 l 16 -11 h 24 l 16 11 l -7 11 l -7 -5 v 40 h -28 v -40 l -7 5 z" fill="#fff" stroke="var(--ink)" stroke-width="1.8" opacity=".65"/>
        </g>
        <g id="a3-batt">
          <rect x="530" y="330" width="44" height="24" fill="#fff" stroke="var(--ink)" stroke-width="1.8"/>
          <rect x="574" y="337" width="6" height="10" fill="var(--ink)"/>
        </g>
        <path id="a3-beam2" d="M 700 240 L 700 320" stroke="var(--ochre)" stroke-width="5" stroke-linecap="round" opacity="0"/>
      </g>

      <!-- customs -->
      <g id="a3-customs" opacity="0">
        <line x1="880" y1="90" x2="880" y2="580" stroke="var(--ink-soft)" stroke-width="1.2" stroke-dasharray="2 7"/>
        <text x="888" y="106" font-family="ui-monospace,Menlo,monospace" font-size="11" letter-spacing="2" fill="var(--ink-soft)">EU BORDER</text>
        <rect x="940" y="430" width="70" height="46" fill="none" stroke="var(--ink)" stroke-width="2"/>
        <text x="975" y="500" text-anchor="middle" font-family="ui-monospace,Menlo,monospace" font-size="10" letter-spacing="1.5" fill="var(--ink-soft)">CUSTOMS</text>
      </g>

      <!-- epilogue: journey line that morphs into the circle -->
      <path id="a3-loop" d="M 120 500 C 320 470 420 380 600 360 C 780 340 900 300 1060 250"
            fill="none" stroke="var(--ink)" stroke-width="4.5" stroke-linecap="round" opacity="0"/>
      <g id="a3-braid" opacity="0">
        <path id="a3-c1" d="M 600 138 C 706 138 792 224 792 330 C 792 436 706 522 600 522 C 494 522 408 436 408 330 C 408 224 494 138 600 138" fill="none" stroke="var(--cobalt)" stroke-width="4.5" stroke-linecap="round"/>
        <path id="a3-c2" d="M 600 122 C 715 122 808 215 808 330 C 808 445 715 538 600 538 C 485 538 392 445 392 330 C 392 215 485 122 600 122" fill="none" stroke="var(--leaf)" stroke-width="4.5" stroke-linecap="round"/>
        <path id="a3-c3" d="M 600 154 C 697 154 776 233 776 330 C 776 427 697 506 600 506 C 503 506 424 427 424 330 C 424 233 503 154 600 154" fill="none" stroke="var(--ochre)" stroke-width="4.5" stroke-linecap="round"/>
      </g>
      <circle id="a3-fiber" r="9" fill="var(--ink)" stroke="#fff" stroke-width="2" opacity="0"/>
    </svg>

    <div class="ov slug" id="a3-slug">
      <span>SC 10 &#183; THE SHOPPER</span>
      <span>SC 11 &#183; THE RECYCLER</span>
      <span>SC 12 &#183; THE BORDER, REVISITED</span>
      <span>SC 13 &#183; FULL CIRCLE</span>
    </div>

    <div class="ov pass" id="a3-p1" style="left:40%; top:8%;">
      <h4>Materials</h4><p>95% organic cotton, 5% elastane. Field: Gujarat. Mill: Tiruppur.</p>
    </div>
    <div class="ov pass" id="a3-p2" style="left:40%; top:30%;">
      <h4>Care &amp; repair</h4><p>Wash cold. Line dry. Free repair: 3 partner shops nearby.</p>
    </div>
    <div class="ov pass" id="a3-p3" style="left:40%; top:52%;">
      <h4>The story</h4><p>Field &#8594; mill &#8594; Route B &#8594; your hands. Every hop verified.</p>
    </div>

    <div class="ov panel" id="a3-sort" style="left:56%; top:60%; width:23%;">
      <div class="ph">SORTER READOUT</div>
      <div id="a3-sort1">fiber &#183; 95% co / 5% ea</div>
      <div id="a3-sort2">coating &#183; none &#183; finish &#183; clean</div>
      <div id="a3-sort3">verdict &#183; SHRED &amp; RESPIN &#10003;</div>
    </div>
    <div class="ov panel" id="a3-battp" style="left:32%; top:60%; width:21%;">
      <div class="ph">BATTERY &#183; SAME SCAN</div>
      <div>chem &#183; LFP &#183; disassembly map &#10003;</div>
    </div>

    <div class="ov hud" id="a3-hs" style="left:72%; top:22%; font-size:clamp(16px,2.6vw,30px); color:var(--ink);"></div>
    <div class="ov chip on"  id="a3-ch1" style="left:72%; top:33%;">DUTY 12% &#10003;</div>
    <div class="ov chip on"  id="a3-ch2" style="left:75%; top:40%;">VAT 21% &#10003;</div>
    <div class="ov chip on"  id="a3-ch3" style="left:78%; top:47%;">ESPR &#183; DPP &#10003;</div>
    <div class="ov chip off" id="a3-ch4" style="left:81%; top:54%;">EUDR &#183; N/A</div>

    <div class="ov cap" id="a3-cap1">She didn't ask the customs officer's questions. The passport answered hers anyway:
      <b>wash cold, repair here, made from these fields.</b></div>
    <div class="ov cap" id="a3-cap2">Fifteen washes later, the tee comes home. <b>The sorter doesn't guess.</b>
      Shred it. Spin it. Start again.</div>
    <div class="ov cap" id="a3-cap3">One scan. <b>The code, the duty, the rules</b>, before the container touches the crane.</div>
    <div class="ov cap" id="a3-cap4">The thread that started in a field ends in a field of data,
      <b>and starts again.</b></div>
  </div>
</div>`;
