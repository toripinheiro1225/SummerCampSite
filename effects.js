// Drifting Spores & Growing Vines Effects
(function() {
  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function randInt(min, max) {
    return Math.floor(rand(min, max + 1));
  }

  function buildTendrilPath(ax, ay, dir, len, curl, phase, unfurl) {
    const reach = len * unfurl;
    const tipX = ax + dir * reach + Math.cos(phase) * (4 + curl * 6);
    const tipY = ay - reach * 0.56 + Math.sin(phase * 0.72) * (2 + curl * 4);

    const c1x = ax + dir * (reach * 0.4);
    const c1y = ay - reach * 0.16;

    const c2x = ax + dir * (reach * (0.75 + 0.08 * Math.sin(phase * 1.1)));
    const c2y = ay - reach * (0.42 + 0.05 * Math.cos(phase));

    const s1x = tipX - dir * (reach * 0.16 + curl * 8 * Math.cos(phase * 0.9));
    const s1y = tipY - (reach * 0.1 + curl * 6 * Math.sin(phase * 1.2));

    const s2x = tipX + dir * (reach * 0.05 + curl * 5 * Math.sin(phase * 0.8));
    const s2y = tipY - (reach * 0.22 + curl * 4 * Math.cos(phase * 1.25));

    return `M${ax},${ay} C${c1x},${c1y} ${c2x},${c2y} ${tipX},${tipY} S${s1x},${s1y} ${s2x},${s2y}`;
  }

  function buildMainSpinePath(baseX, phase, breathe) {
    const driftA = Math.sin(phase) * 12 * breathe;
    const driftB = Math.cos(phase * 0.85) * 10 * breathe;
    const driftC = Math.sin(phase * 1.2) * 8 * breathe;

    const x1 = baseX - 70 + driftA;
    const x2 = baseX + 100 + driftB;
    const x3 = baseX + 12 + driftC;

    const s1x = baseX - 120 + Math.sin(phase * 0.7) * 14 * breathe;
    const s1y = 240 + Math.cos(phase * 0.9) * 10 * breathe;
    const s2x = baseX + 18 + Math.sin(phase * 1.05) * 9 * breathe;
    const s2y = 70 + Math.cos(phase * 1.15) * 8 * breathe;

    const s3x = baseX - 80 + Math.sin(phase * 0.95) * 11 * breathe;
    const s3y = -70 + Math.cos(phase * 0.8) * 7 * breathe;
    const s4x = baseX + 10 + Math.sin(phase * 1.22) * 8 * breathe;
    const s4y = -190 + Math.cos(phase) * 6 * breathe;

    return `M${baseX},920 C${x1},770 ${x2},620 ${x3},470 S${s1x},${s1y} ${s2x},${s2y} S${s3x},${s3y} ${s4x},${s4y}`;
  }

  // --- CONFIG ---
  const SPORE_COLORS = [
    'rgba(125,224,176,0.95)', // theme mint
    'rgba(93,210,255,0.95)',  // theme cyan
    'rgba(156,232,195,0.92)'  // soft accent mint
  ];
  const SPORE_COUNT = 18;
  const VINE_COUNT = 0;
  const CODE_SNIP_COUNT = 13;
  const FERN_COUNT = 16;
  const CODE_SNIPS = [
    "const seed = life();",
    "if (wind) grow();",
    "for (;;) { breathe(); }",
    "let root = memory.deep;",
    "return canopy.light;",
    "await dawn.resolve();",
    "vines.push(node);",
    "signal += moss;",
    "while (alive) adapt();",
    "graph.addLeaf(tip);"
  ];

  // --- SPORES ---
  const sporeLayer = document.createElement('div');
  sporeLayer.id = 'spore-layer';
  document.body.appendChild(sporeLayer);

  for (let i = 0; i < SPORE_COUNT; ++i) {
    const spore = document.createElement('div');
    spore.className = 'spore';
    const color = SPORE_COLORS[Math.floor(Math.random() * SPORE_COLORS.length)];
    const size = 2.6 + Math.random() * 2.2;
    const left = Math.random() * 100;
    const duration = 28 + Math.random() * 24;
    const delay = -Math.random() * 22;
    spore.style.left = left + '%';
    spore.style.width = size + 'px';
    spore.style.height = size + 'px';
    spore.style.background = color;
    spore.style.boxShadow = `0 0 6px 2px ${color}, 0 0 14px 6px ${color.replace('0.95', '0.45').replace('0.92', '0.42')}`;
    spore.style.animation = `spore-drift ${duration}s linear ${delay}s infinite`;
    sporeLayer.appendChild(spore);
  }

  // --- FLOATING CODE SNIPPETS ---
  const codeLayer = document.createElement('div');
  codeLayer.id = 'code-layer';
  document.body.appendChild(codeLayer);

  for (let i = 0; i < CODE_SNIP_COUNT; ++i) {
    const code = document.createElement('span');
    code.className = 'code-snippet';
    const left = rand(2, 96);
    const duration = rand(34, 62);
    const delay = -rand(0, 26);
    const drift = rand(-32, 32).toFixed(2);
    const flutter = rand(5, 14).toFixed(2);
    const wobble = rand(6, 18).toFixed(2);
    const text = CODE_SNIPS[randInt(0, CODE_SNIPS.length - 1)];
    const tint = randInt(0, 2);
    const color = tint === 0 ? 'rgba(125,224,176,0.72)' : tint === 1 ? 'rgba(93,210,255,0.72)' : 'rgba(156,232,195,0.7)';

    code.textContent = text;
    code.style.left = `${left}%`;
    code.style.animationDuration = `${duration}s`;
    code.style.animationDelay = `${delay}s`;
    code.style.setProperty('--drift-x', `${drift}px`);
    code.style.setProperty('--flutter-amp', `${flutter}deg`);
    code.style.setProperty('--wobble-y', `${wobble}px`);
    code.style.color = color;
    code.style.textShadow = `0 0 6px ${color}, 0 0 14px ${color.replace('0.72', '0.28').replace('0.7', '0.26')}`;
    codeLayer.appendChild(code);
  }

  // --- TOP FERN CANOPY ---
  const fernLayer = document.createElement('div');
  fernLayer.id = 'fern-canopy';
  document.body.appendChild(fernLayer);

  for (let i = 0; i < FERN_COUNT; ++i) {
    const fern = document.createElement('div');
    fern.className = 'fern';

    const left = rand(-2, 96);
    const top = rand(-4, 82);
    const scale = rand(0.78, 1.22);
    const unfurlDuration = rand(24, 44);
    const swayDuration = rand(12, 24);
    const delay = -rand(0, 26);
    const hueShift = rand(-6, 8).toFixed(2);

    fern.style.left = `${left}%`;
    fern.style.top = `${top}vh`;
    fern.style.setProperty('--fern-scale', scale.toFixed(3));
    fern.style.setProperty('--fern-unfurl-duration', `${unfurlDuration.toFixed(2)}s`);
    fern.style.setProperty('--fern-sway-duration', `${swayDuration.toFixed(2)}s`);
    fern.style.setProperty('--fern-delay', `${delay.toFixed(2)}s`);
    fern.style.setProperty('--fern-hue', `${hueShift}deg`);

    fern.innerHTML = `
      <svg viewBox="0 0 140 260" width="140" height="260" aria-hidden="true">
        <path class="fern-stem" d="M70,4 C64,58 82,112 68,170 C60,202 72,235 67,256" />

        <g class="fern-frond fern-frond-a">
          <path d="M68,58 C36,52 28,68 18,82 C34,80 46,92 64,84" />
          <path d="M68,58 C98,48 112,62 124,74 C104,76 90,90 72,84" />
        </g>

        <g class="fern-frond fern-frond-b">
          <path d="M69,104 C36,98 28,114 16,130 C36,126 48,140 66,132" />
          <path d="M69,104 C102,94 116,110 126,124 C106,124 94,138 74,132" />
        </g>

        <g class="fern-frond fern-frond-c">
          <path d="M68,150 C40,146 30,162 18,176 C38,172 48,184 66,178" />
          <path d="M68,150 C96,142 112,158 124,170 C106,171 94,184 74,178" />
        </g>
      </svg>
    `;

    fernLayer.appendChild(fern);
  }

  if (VINE_COUNT > 0) {
  // --- VINES ---
  const vineLayer = document.createElement('div');
  vineLayer.id = 'vine-layer';
  vineLayer.innerHTML = `<svg width="100vw" height="100vh" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" style="position:absolute;top:0;left:0;width:100vw;height:100vh;pointer-events:none;">
    <defs>
      <linearGradient id="vine-grad" x1="0" y1="0" x2="0" y2="900" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#9ce8c3"/>
        <stop offset="52%" stop-color="#7de0b0"/>
        <stop offset="88%" stop-color="#5dd2ff"/>
        <stop offset="100%" stop-color="transparent"/>
      </linearGradient>
      <linearGradient id="leaf-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#a7f0d1" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#68dbbe" stop-opacity="0.45"/>
      </linearGradient>
    </defs>
    ${[...Array(VINE_COUNT)].map((_,i)=>{
      const baseX = 170 + i * 520 + rand(-70, 70);
      const spineSeed = rand(0, Math.PI * 2);
      const spineSpeed = rand(0.16, 0.46);
      const spineAmp = rand(0.38, 0.92);
      const branchScale = rand(0.85, 1.28);
      const tendrilBase = randInt(3, 5);
      // Main vine path with stacked S-curves for organic growth.
      const path = buildMainSpinePath(baseX, spineSeed, spineAmp);

      const branches = Array.from({ length: randInt(3, 5) }).map((__, bIdx) => {
        const y = 720 - bIdx * rand(120, 178);
        const dir = Math.random() > 0.5 ? 1 : -1;
        const spread = rand(42, 92) * branchScale;
        const tip = rand(52, 110) * branchScale;
        const d = `M${baseX + dir * rand(2, 14)},${y} C${baseX + dir * spread},${y - rand(34, 58)} ${baseX + dir * tip * 0.56},${y - rand(78, 106)} ${baseX + dir * tip},${y - rand(112, 152)}`;
        return { d, w: rand(0.95, 1.55), y, dir, tipX: baseX + dir * tip, tipY: y - rand(112, 152) };
      });

      const tendrils = [];
      for (let t = 0; t < tendrilBase; t++) {
        const parent = branches[randInt(0, branches.length - 1)];
        const ax = parent.tipX + rand(-16, 16);
        const ay = parent.tipY + rand(-14, 14);
        const dir = parent.dir * (Math.random() > 0.25 ? 1 : -1);
        tendrils.push({
          ax,
          ay,
          dir,
          len: rand(64, 118),
          curl: rand(0.72, 1.42),
          speed: rand(0.36, 0.94),
          seed: rand(0, Math.PI * 2)
        });
      }

      const leavesSource = branches.map((b) => ({
        cx: b.tipX + rand(-10, 10),
        cy: b.tipY + rand(-10, 10),
        rx: rand(3.8, 6.2),
        ry: rand(2.2, 3.6),
        rot: rand(-24, 24)
      })).concat(tendrils.map((t) => ({
        cx: t.ax + t.dir * rand(10, 28),
        cy: t.ay - rand(8, 26),
        rx: rand(3.4, 5.6),
        ry: rand(2.1, 3.4),
        rot: rand(-28, 28)
      })));

      const leaves = leavesSource.map((leaf, idx) => `
        <g class="vine-leaf" style="transform-box:fill-box;transform-origin:center;--leaf-rot:${leaf.rot}deg;--leaf-delay:${(0.25 * idx).toFixed(2)}s;">
          <ellipse cx="${leaf.cx}" cy="${leaf.cy}" rx="${leaf.rx}" ry="${leaf.ry}" fill="url(#leaf-grad)" opacity="0" transform="rotate(${leaf.rot} ${leaf.cx} ${leaf.cy})"/>
        </g>
      `).join('');

      return `
        <g class="vine-group">
          <path class="vine-main" data-basex="${baseX}" data-seed="${spineSeed}" data-speed="${spineSpeed}" data-amp="${spineAmp}" d="${path}" stroke="url(#vine-grad)" stroke-width="${rand(2.55, 3.55).toFixed(2)}" fill="none" stroke-linecap="round"/>
          ${branches.map((b) => `<path class="vine-off" d="${b.d}" stroke="url(#vine-grad)" stroke-width="${b.w}" fill="none" stroke-linecap="round"/>`).join('')}
          ${tendrils.map((t) => `<path class="vine-tendril" data-ax="${t.ax}" data-ay="${t.ay}" data-dir="${t.dir}" data-len="${t.len}" data-curl="${t.curl}" data-speed="${t.speed}" data-seed="${t.seed}" d="${buildTendrilPath(t.ax, t.ay, t.dir, t.len, t.curl, t.seed, 0.45)}" stroke="url(#vine-grad)" stroke-width="0.95" fill="none" stroke-linecap="round"/>`).join('')}
          ${leaves}
        </g>
      `;
    }).join('')}
  </svg>`;
  document.body.appendChild(vineLayer);

  function animateTendrils() {
    const tendrils = Array.from(document.querySelectorAll('.vine-tendril'));
    if (!tendrils.length) {
      return;
    }

    function tick(time) {
      const t = time * 0.001;
      for (const node of tendrils) {
        const ax = Number(node.dataset.ax);
        const ay = Number(node.dataset.ay);
        const dir = Number(node.dataset.dir);
        const len = Number(node.dataset.len);
        const curl = Number(node.dataset.curl);
        const speed = Number(node.dataset.speed);
        const seed = Number(node.dataset.seed);

        const phase = seed + t * speed * 2.2;
        const unfurl = 0.28 + 0.72 * (0.5 + 0.5 * Math.sin(seed * 0.9 + t * speed * 1.15));
        node.setAttribute('d', buildTendrilPath(ax, ay, dir, len, curl, phase, unfurl));
      }
      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  function animateMainSpines() {
    const spines = Array.from(document.querySelectorAll('.vine-main'));
    if (!spines.length) {
      return;
    }

    function tick(time) {
      const t = time * 0.001;
      for (const node of spines) {
        const baseX = Number(node.dataset.basex);
        const seed = Number(node.dataset.seed);
        const speed = Number(node.dataset.speed);
        const amp = Number(node.dataset.amp || 0.55);

        const phase = seed + t * speed;
        const breathe = amp * (0.42 + 0.58 * (0.5 + 0.5 * Math.sin(seed * 0.7 + t * speed * 0.9)));
        node.setAttribute('d', buildMainSpinePath(baseX, phase, breathe));
      }
      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  // Animate vine drawing
  setTimeout(()=>{
    document.querySelectorAll('.vine-main,.vine-off,.vine-tendril').forEach(path=>{
      path.style.strokeDasharray = '5200';
      path.style.strokeDashoffset = '5200';
      const dur = 14 + Math.random()*8;
      path.style.transition = `stroke-dashoffset ${dur}s cubic-bezier(.23,1,.32,1)`;
      setTimeout(()=>{ path.style.strokeDashoffset = '0'; }, 100);
    });
    // Animate leaves
    document.querySelectorAll('.vine-leaf ellipse').forEach((leaf,i)=>{
      setTimeout(()=>{
        leaf.animate([
          {transform:'scale(0.2)',opacity:0},
          {transform:'scale(1)',opacity:0.7}
        ], {duration:1200,fill:'forwards',easing:'cubic-bezier(.23,1,.32,1)'});
        setTimeout(()=>{
          leaf.animate([
            {transform:'rotate(-3deg) scale(1)',opacity:0.7},
            {transform:'rotate(7deg) scale(1.06)',opacity:0.7},
            {transform:'rotate(-3deg) scale(1)',opacity:0.7}
          ], {duration:6000,iterations:Infinity,easing:'ease-in-out'});
        },1300);
      }, 800 + i*400);
    });
    animateTendrils();
    animateMainSpines();
  }, 400);
  }
})();
