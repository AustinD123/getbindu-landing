/* r39-2: the stage art of Full Circle, ported from features/landing/story/theatre-stages.ts (the original is untouched).
   Changes: the screenplay slugs and stage captions are gone (the captions are the left column now); colours go through the --th-* art variables in
   styles/theatre.css; labels are plain words and carry no invented prices or numbers; the QR moved out of act one (r40-2: the textile passport is live on the site, act three says so);
   hidden starting states are set by GSAP in lib/theatre-fx.ts, not here. Injected with dangerouslySetInnerHTML (a constant, no user input). */
export const THEATRE_STAGES_HTML = `<div class="th-wrap active" id="act1">
  <div class="th-sheet">
    <svg viewBox="0 0 1200 660" role="img" aria-label="Illustration: an importer in Amsterdam compares three suppliers; only supplier B can show proof">
      <defs>
        <clipPath id="a1-dataclip"><rect id="a1-dataclipr" x="115" y="335" width="840" height="26"/></clipPath>
        <clipPath id="a1-routeCclip"><rect id="a1-routeCclipr" x="340" y="320" width="680" height="200"/></clipPath>
      </defs>
      <!-- frame -->
      <line x1="40" y1="580" x2="1160" y2="580" stroke="var(--th-line)" stroke-width="2.2"/>
      <line id="a1-border" x1="880" y1="90" x2="880" y2="580" stroke="var(--th-mute)" stroke-width="2" stroke-dasharray="2 7"/>
      <text x="888" y="566" font-size="22" letter-spacing="0" fill="var(--th-mute)">EU border</text>
      <!-- desk -->
      <circle id="a1-desk" cx="1000" cy="330" r="16" fill="var(--th-ok)" stroke="var(--th-ink)" stroke-width="3.2"/>
      <text x="1170" y="378" text-anchor="end" font-size="22" letter-spacing="0" fill="var(--th-ink)"><tspan x="1170">Importer</tspan><tspan x="1170" dy="27">Amsterdam</tspan></text>
      <!-- socket at the desk -->
      <path id="a1-socket" d="M 962 322 v 16 h -12 v -16" fill="none" stroke="var(--th-ink)" stroke-width="3.2"/>

      <!-- ROUTE A (top) -->
      <path id="a1-routeA" d="M 1000 330 C 820 210 560 165 360 165" fill="none" stroke="var(--th-no)" stroke-width="6.5" stroke-linecap="round"/>
      <circle id="a1-nodeA" cx="360" cy="165" r="15" fill="var(--th-no)" stroke="var(--th-ink)" stroke-width="3.2"/>
      <text id="a1-lA" x="360" y="140" text-anchor="middle" font-size="22" letter-spacing="0" fill="var(--th-mute)">Supplier A</text>
      <path id="a1-frayA" d="M 352 165 l -26 0 m 0 0 l -9 -7 m 9 7 l -9 7" fill="none" stroke="var(--th-no)" stroke-width="3" stroke-linecap="round"/>
      <!-- bounced question tokens -->
      <circle class="a1-q" r="7" fill="var(--th-ink)"/>
      <circle class="a1-q" r="7" fill="var(--th-ink)"/>
      <circle class="a1-q" r="7" fill="var(--th-ink)"/>

      <!-- ROUTE B (middle): desk&#8594;B, B&#8594;agent, agent&#8594;mill -->
      <path id="a1-b1" d="M 1000 330 L 360 330" fill="none" stroke="var(--th-ok)" stroke-width="6.5" stroke-linecap="round"/>
      <path id="a1-b2" d="M 360 330 L 235 330" fill="none" stroke="var(--th-ok)" stroke-width="6.5" stroke-linecap="round"/>
      <path id="a1-b3" d="M 235 330 L 115 330" fill="none" stroke="var(--th-ok)" stroke-width="6.5" stroke-linecap="round"/>
      <circle id="a1-nodeB" cx="360" cy="330" r="15" fill="var(--th-ok)" stroke="var(--th-ink)" stroke-width="3.2"/>
      <text id="a1-lB" x="360" y="268" text-anchor="middle" font-size="22" letter-spacing="0" fill="var(--th-mute)">Supplier B</text>
      <circle id="a1-nodeAg" cx="235" cy="330" r="13" fill="var(--th-ok)" stroke="var(--th-ink)" stroke-width="3.2"/>
      <text id="a1-lAg" x="235" y="268" text-anchor="middle" font-size="22" letter-spacing="0" fill="var(--th-mute)">Bindu</text>
      <rect id="a1-mill" x="97" y="312" width="36" height="36" fill="var(--th-paper)" stroke="var(--th-ok)" stroke-width="3.5"/>
      <text id="a1-lMill" x="115" y="388" text-anchor="middle" font-size="22" letter-spacing="0" fill="var(--th-mute)">Mill</text>
      <!-- handshake ticks -->
      <path class="a1-tick" d="M 354 288 l 5 6 l 9 -11" fill="none" stroke="var(--th-ok)" stroke-width="3.5" stroke-linecap="round"/>
      <path class="a1-tick" d="M 229 288 l 5 6 l 9 -11" fill="none" stroke="var(--th-ok)" stroke-width="3.5" stroke-linecap="round"/>
      <path class="a1-tick" d="M 109 288 l 5 6 l 9 -11" fill="none" stroke="var(--th-ok)" stroke-width="3.5" stroke-linecap="round"/>
      <!-- data line back: mill &#8594; desk, dashed, with plug -->
      <path id="a1-data" d="M 115 348 L 946 348" fill="none" stroke="var(--th-ok)" stroke-width="3.5" stroke-dasharray="8 7" clip-path="url(#a1-dataclip)"/>
      <path id="a1-plugB" d="M 946 341 h 12 v 14 h -12 z" fill="var(--th-ok)"/>

      <!-- ROUTE C (bottom) -->
      <path id="a1-routeC" d="M 1000 330 C 820 450 560 495 360 495" fill="none" stroke="var(--th-warn)" stroke-width="5" stroke-linecap="round" stroke-dasharray="0.5 13" clip-path="url(#a1-routeCclip)"/>
      <circle id="a1-nodeC" cx="360" cy="495" r="15" fill="var(--th-warn)" stroke="var(--th-ink)" stroke-width="3.2"/>
      <text id="a1-lC" x="360" y="470" text-anchor="middle" font-size="22" letter-spacing="0" fill="var(--th-mute)">Supplier C</text>
      <!-- C's walled garden -->
      <g id="a1-wall">
        <rect x="285" y="510" width="150" height="66" fill="none" stroke="var(--th-warn)" stroke-width="3.2"/>
        <line x1="315" y1="510" x2="315" y2="576" stroke="var(--th-warn)" stroke-width="2.2"/>
        <line x1="345" y1="510" x2="345" y2="576" stroke="var(--th-warn)" stroke-width="2.2"/>
        <line x1="375" y1="510" x2="375" y2="576" stroke="var(--th-warn)" stroke-width="2.2"/>
        <line x1="405" y1="510" x2="405" y2="576" stroke="var(--th-warn)" stroke-width="2.2"/>
        <rect x="295" y="524" width="34" height="8" fill="var(--th-warn)" opacity=".6"/>
        <rect x="295" y="540" width="52" height="8" fill="var(--th-warn)" opacity=".6"/>
        <rect x="295" y="556" width="26" height="8" fill="var(--th-warn)" opacity=".6"/>
      </g>
      <!-- C's wrong-shaped plug -->
      <path id="a1-plugC" d="M 700 430 l 16 8 l -16 8 z" fill="var(--th-warn)"/>
    </svg>

    <!-- HTML overlays -->

    <div class="ov qcard" id="a1-cardA" style="left:38%; top:6%;">
      <div class="price">Cheapest</div>
      <div class="meta">no origin shown</div>
    </div>
    <div class="ov qcard" id="a1-cardB" style="left:56%; top:6%;">
      <div class="price">Mid price</div>
      <div class="meta">full proof on file</div>
    </div>
    <div class="ov qcard" id="a1-cardC" style="left:74%; top:6%;">
      <div class="price">Mid price</div>
      <div class="meta">says it has the data</div>
    </div>

    <div class="ov panel green" id="a1-twin" style="left:14%; top:50%; width:30%;">
      <div class="th-ph">Record &#183; example lot</div>
      <div id="a1-twin1">cotton &#183; field named</div>
      <div id="a1-twin2">certificate &#183; on file</div>
      <div id="a1-twin3">dye house &#183; named</div>
    </div>

    <div class="ov stamp no"   id="a1-stampA" style="left:36%; top:26%;">Passed over &#183; no proof</div>
    <div class="ov stamp ok"   id="a1-stampB" style="left:55%; top:26%;">Picked</div>
    <div class="ov stamp warn" id="a1-stampC" style="left:71%; top:26%;">Passed over &#183; locked data</div>
  </div>
</div>


<div class="th-wrap" id="act2">
  <div class="th-sheet">
    <svg viewBox="0 0 1200 660" role="img" aria-label="Illustration: three coffee origins; one plot was cleared, one co-op sends every plot, one never answers">
      <!-- frame (same geometry) -->
      <line x1="40" y1="580" x2="1160" y2="580" stroke="var(--th-line)" stroke-width="2.2"/>
      <line x1="880" y1="90" x2="880" y2="580" stroke="var(--th-mute)" stroke-width="2" stroke-dasharray="2 7"/>
      <text x="892" y="250" font-size="22" letter-spacing="0" fill="var(--th-mute)">EU border</text>
      <circle cx="1000" cy="330" r="16" fill="var(--th-ok)" stroke="var(--th-ink)" stroke-width="3.2"/>
      <text x="1170" y="378" text-anchor="end" font-size="22" letter-spacing="0" fill="var(--th-ink)"><tspan x="1170">Importer</tspan><tspan x="1170" dy="27">Amsterdam</tspan></text>
      <!-- mountain -->
      <path d="M 40 580 L 150 430 L 230 500 L 330 380 L 430 580" fill="none" stroke="var(--th-line)" stroke-width="2.2"/>

      <!-- routes -->
      <path id="a2-rA" d="M 1000 330 C 820 230 600 185 400 185" fill="none" stroke="var(--th-ok)" stroke-width="6" stroke-linecap="round"/>
      <path id="a2-rB" d="M 1000 330 L 480 330" fill="none" stroke="var(--th-ok)" stroke-width="6.5" stroke-linecap="round"/>
      <path id="a2-rC" d="M 1000 330 C 820 440 620 490 440 490" fill="none" stroke="var(--th-ok)" stroke-width="6" stroke-linecap="round"/>
      <circle id="a2-nA" cx="400" cy="185" r="14" fill="var(--th-ok)" stroke="var(--th-ink)" stroke-width="3.2"/>
      <text id="a2-lA" x="400" y="160" text-anchor="middle" font-size="22" letter-spacing="0" fill="var(--th-mute)">Origin A</text>
      <circle id="a2-nB" cx="480" cy="330" r="15" fill="var(--th-ok)" stroke="var(--th-ink)" stroke-width="3.2"/>
      <text id="a2-lB" x="480" y="305" text-anchor="middle" font-size="22" letter-spacing="0" fill="var(--th-mute)">Supplier</text>
      <circle id="a2-coop" cx="330" cy="415" r="15" fill="var(--th-ok)" stroke="var(--th-ink)" stroke-width="3.2"/>
      <text id="a2-lCoop" x="330" y="456" text-anchor="middle" font-size="22" letter-spacing="0" fill="var(--th-mute)">Co-op</text>
      <path id="a2-rBcoop" d="M 480 330 L 330 415" fill="none" stroke="var(--th-ok)" stroke-width="5.5" stroke-linecap="round"/>
      <circle id="a2-nC" cx="440" cy="490" r="14" fill="var(--th-ok)" stroke="var(--th-ink)" stroke-width="3.2"/>
      <text id="a2-lC" x="440" y="530" text-anchor="middle" font-size="22" letter-spacing="0" fill="var(--th-mute)">Origin C</text>

      <!-- origin A polygon + satellite overlay -->
      <g id="a2-plotWrap">
        <path id="a2-plot" d="M 130 150 l 90 -18 l 55 40 l -22 62 l -95 8 l -32 -54 z" fill="var(--th-ok)" fill-opacity=".35" stroke="var(--th-ok)" stroke-width="3" stroke-linejoin="round"/>
        <text x="175" y="120" font-size="22" letter-spacing="0" fill="var(--th-mute)">Plot &#183; origin A</text>
      </g>
      <g id="a2-satWipe">
        <rect id="a2-satRect" x="105" y="125" width="0" height="130" fill="var(--th-no)" fill-opacity=".18"/>
      </g>

      <!-- farmer plots (positions filled by JS) -->
      <g id="a2-farmers"></g>

      <!-- question token -->
      <circle id="a2-q" r="7" fill="var(--th-ink)"/>
    </svg>

    <div class="ov hud" id="a2-cutline" style="left:50%; top:90.5%; transform:translateX(-50%);"></div>
    <div class="ov hud" id="a2-days" style="right:3.5%; top:4.5%;"></div>

    <div class="ov panel" id="a2-reg" style="left:33%; top:2%; width:26.5%;">
      <div class="th-ph">Land register</div>
      <div>owner &#183; <span class="no">none found</span></div>
      <div>class &#183; state forest</div>
    </div>
    <div class="ov panel" id="a2-sat" style="left:60.5%; top:2%; width:23%;">
      <div class="th-ph">Satellite</div>
      <div>trees &#183; until 2022</div>
      <div>then &#183; <span class="no">cleared</span></div>
    </div>
    <div class="ov panel green" id="a2-dds" style="left:67%; top:66%; width:31%;">
      <div class="th-ph">Statement filed</div>
      <div>plots &#183; all listed &#10003;<br>documents &#183; attached &#10003;</div>
      <div>ref &#183; <span id="a2-ref"></span></div>
    </div>

    <div class="ov stamp no" id="a2-stampA" style="left:5%; top:47%;">Passed over &#183; cleared land</div>
    <div class="ov stamp ok" id="a2-stampB" style="left:66%; top:43%;">Picked</div>
    <div class="ov stamp no" id="a2-stampC" style="left:44%; top:79%;">Passed over &#183; no proof</div>
  </div>
</div>


<div class="th-wrap" id="act3">
  <div class="th-sheet">
    <svg viewBox="0 0 1200 660" role="img" aria-label="Illustration, coming: a shopper, a recycler and customs read the same record, and the record loops back to its documents">
      <line x1="40" y1="580" x2="1160" y2="580" stroke="var(--th-line)" stroke-width="2.2"/>

      <!-- shop: rack + tee + coffee bag -->
      <g id="a3-shop">
        <line x1="120" y1="150" x2="430" y2="150" stroke="var(--th-ink)" stroke-width="4" stroke-linecap="round"/>
        <line x1="130" y1="150" x2="130" y2="580" stroke="var(--th-line)" stroke-width="2.2"/>
        <line x1="420" y1="150" x2="420" y2="580" stroke="var(--th-line)" stroke-width="2.2"/>
        <g id="a3-tee">
          <line x1="250" y1="150" x2="250" y2="185" stroke="var(--th-ink)" stroke-width="2.2"/>
          <path d="M 215 197 l 20 -14 h 30 l 20 14 l -9 14 l -8 -6 v 52 h -36 v -52 l -8 6 z" fill="var(--th-paper)" stroke="var(--th-ink)" stroke-width="2"/>
          <rect id="a3-teeqr" x="240" y="215" width="20" height="20" fill="none" stroke="var(--th-ink)" stroke-width="2"/>
        </g>
        <g id="a3-bag">
          <path d="M 330 200 h 44 l 6 60 h -56 z" fill="var(--th-paper)" stroke="var(--th-warn)" stroke-width="2"/>
          <text x="352" y="288" text-anchor="middle" font-size="20" fill="var(--th-ink)">Coffee</text>
        </g>
      </g>
      <path id="a3-beam" d="M 240 205 L 262 205" stroke="var(--th-warn)" stroke-width="5" stroke-linecap="round"/>

      <!-- recycler conveyor -->
      <g id="a3-conv">
        <line id="a3-belt" x1="520" y1="300" x2="900 " y2="300" stroke="var(--th-ink)" stroke-width="4.5" stroke-dasharray="14 10"/>
        <g id="a3-tee2">
          <path d="M 545 258 l 16 -11 h 24 l 16 11 l -7 11 l -7 -5 v 40 h -28 v -40 l -7 5 z" fill="var(--th-paper)" stroke="var(--th-ink)" stroke-width="2.4" opacity=".65"/>
        </g>
        <g id="a3-batt">
          <rect x="530" y="330" width="44" height="24" fill="var(--th-paper)" stroke="var(--th-ink)" stroke-width="2.4"/>
          <rect x="574" y="337" width="6" height="10" fill="var(--th-ink)"/>
        </g>
        <path id="a3-beam2" d="M 700 240 L 700 320" stroke="var(--th-warn)" stroke-width="5" stroke-linecap="round"/>
      </g>

      <!-- customs -->
      <g id="a3-customs">
        <line x1="880" y1="90" x2="880" y2="580" stroke="var(--th-mute)" stroke-width="2" stroke-dasharray="2 7"/>
        <text x="888" y="106" font-size="22" letter-spacing="0" fill="var(--th-mute)">EU border</text>
        <rect x="940" y="430" width="70" height="46" fill="none" stroke="var(--th-ink)" stroke-width="2"/>
        <text x="975" y="500" text-anchor="middle" font-size="22" letter-spacing="0" fill="var(--th-mute)">Customs</text>
      </g>

      <!-- epilogue: journey line that morphs into the circle -->
      <path id="a3-loop" d="M 120 500 C 320 470 420 380 600 360 C 780 340 900 300 1060 250"
            fill="none" stroke="var(--th-ink)" stroke-width="4.5" stroke-linecap="round"/>
      <g id="a3-braid">
        <path id="a3-c1" d="M 600 138 C 706 138 792 224 792 330 C 792 436 706 522 600 522 C 494 522 408 436 408 330 C 408 224 494 138 600 138" fill="none" stroke="var(--th-ok)" stroke-width="4.5" stroke-linecap="round"/>
        <path id="a3-c2" d="M 600 122 C 715 122 808 215 808 330 C 808 445 715 538 600 538 C 485 538 392 445 392 330 C 392 215 485 122 600 122" fill="none" stroke="var(--th-ink)" stroke-width="4.5" stroke-linecap="round"/>
        <path id="a3-c3" d="M 600 154 C 697 154 776 233 776 330 C 776 427 697 506 600 506 C 503 506 424 427 424 330 C 424 233 503 154 600 154" fill="none" stroke="var(--th-warn)" stroke-width="4.5" stroke-linecap="round"/>
      </g>
      <circle id="a3-fiber" r="9" fill="var(--th-ink)" stroke="var(--th-paper)" stroke-width="2"/>
    </svg>

    <div class="ov pass" id="a3-p1" style="left:40%; top:8%;">
      <h4>Materials</h4><p>Cotton and elastane. Field and mill named.</p>
    </div>
    <div class="ov pass" id="a3-p2" style="left:40%; top:30%;">
      <h4>Care</h4><p>Wash cold. Line dry. Repair before you replace.</p>
    </div>
    <div class="ov pass" id="a3-p3" style="left:40%; top:52%;">
      <h4>Where it was made</h4><p>Field, mill, supplier, shop. Each step has a document.</p>
    </div>

    <div class="ov panel" id="a3-sort" style="left:54%; top:56%; width:32%;">
      <div class="th-ph">Sorter readout</div>
      <div id="a3-sort1">fibre &#183; cotton + elastane</div>
      <div id="a3-sort2">coating &#183; none</div>
      <div id="a3-sort3">verdict &#183; recycle &#10003;</div>
    </div>
    <div class="ov panel" id="a3-battp" style="left:22%; top:58%; width:30%;">
      <div class="th-ph">Battery &#183; same scan</div>
      <div>how to take it apart &#10003;</div>
    </div>

    <div class="ov hud" id="a3-hs" style="left:66%; top:22%;"></div>
    <div class="ov th-tag" id="a3-ch1" style="left:66%; top:33%;">Conformity certificates &#10003;</div>
    <div class="ov th-tag" id="a3-ch2" style="left:68%; top:40%;">Inspection reports &#10003;</div>
    <div class="ov th-tag" id="a3-ch3" style="left:70%; top:47%;">Operator contacts &#10003;</div>
  </div>
</div>`;
