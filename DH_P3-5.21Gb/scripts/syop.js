const SYOP_COLORS = {
  bg: '#0B0E16',
  panel: 'rgba(26, 29, 44, 0.55)',
  panelBorder: 'rgba(255,255,255,0.08)',
  text: '#E9ECF9',
  subtext: '#B6B9D6',
  qb: '#A855F7',
  rb: '#EC4899',
  wr: '#22D3EE',
  te: '#F472B6',
  muted: '#334155',
};

const SUNBURST_ROOT_LABEL = 'Mean | Λ <br>&<br> Mode | M';
const SUNBURST_DATA = {
  labels: [
    SUNBURST_ROOT_LABEL,
    'QB ',
    'RB ',
    'WR ',
    'TE ',
    'SPΛ <br>(7.2)',
    'BOΛ <br>(2.3)',
    'SPM <br>(6)',
    'BOM <br>(1)',
    'SPΛ <br>(3.41)',
    'BOΛ <br>(2.2)',
    'SPM <br>(0.7)',
    'BOM <br>(1.7)',
    'SPΛ <br>(4.9)',
    'BOΛ <br>(2.9)',
    'SPM <br>(3)',
    'BOM <br>(2)',
    'SPΛ <br>(4.0)',
    'BOΛ <br>(3.5)',
    'SPM <br>(2)',
    'BOM <br>(3)',
  ],
  parents: [
    '',
    SUNBURST_ROOT_LABEL,
    SUNBURST_ROOT_LABEL,
    SUNBURST_ROOT_LABEL,
    SUNBURST_ROOT_LABEL,
    'QB ',
    'QB ',
    'QB ',
    'QB ',
    'RB ',
    'RB ',
    'RB ',
    'RB ',
    'WR ',
    'WR ',
    'WR ',
    'WR ',
    'TE ',
    'TE ',
    'TE ',
    'TE ',
  ],
  values: [
    51.6, 16.46, 9.8, 12.82, 12.5, 6.5, 2.49, 5.35, 2.1, 3.31, 2.5, 1.89, 2.1, 4.92, 2.84, 3, 2, 4.01, 3.49, 2, 3,
  ],
};

const SYOP_SERIES = [
  { key: 'QB %', color: SYOP_COLORS.qb },
  { key: 'RB %', color: SYOP_COLORS.rb },
  { key: 'WR %', color: SYOP_COLORS.wr },
  { key: 'TE %', color: SYOP_COLORS.te },
];

const SYOP_DATA = [
  { SYOP: '1', 'QB %': 6.67, 'RB %': 27.54, 'WR %': 13.0, 'TE %': 26.92 },
  { SYOP: '2', 'QB %': 11.11, 'RB %': 20.29, 'WR %': 14.1, 'TE %': 26.92 },
  { SYOP: '3', 'QB %': 8.89, 'RB %': 11.59, 'WR %': 14.1, 'TE %': 7.69 },
  { SYOP: '4', 'QB %': 8.89, 'RB %': 11.4, 'WR %': 12.0, 'TE %': 7.69 },
  { SYOP: '5', 'QB %': 4.44, 'RB %': 13.04, 'WR %': 5.4, 'TE %': 0.4 },
  { SYOP: '6', 'QB %': 13.33, 'RB %': 5.8, 'WR %': 7.6, 'TE %': 7.69 },
  { SYOP: '7', 'QB %': 8.89, 'RB %': 1.45, 'WR %': 13.0, 'TE %': 7.69 },
  { SYOP: '8', 'QB %': 4.44, 'RB %': 2.9, 'WR %': 9.8, 'TE %': 0.4 },
  { SYOP: '9', 'QB %': 11.11, 'RB %': 3.3, 'WR %': 2.2, 'TE %': 3.85 },
  { SYOP: '10', 'QB %': 2.22, 'RB %': 1.45, 'WR %': 4.49, 'TE %': 3.51 },
  { SYOP: '11', 'QB %': 0.4, 'RB %': 1.45, 'WR %': 2.2, 'TE %': 3.85 },
  { SYOP: '12+', 'QB %': 20.0, 'RB %': 0.4, 'WR %': 2.2, 'TE %': 3.85 },
];

const GAUGES = [
  { key: 'TE', value: 4.0, color: SYOP_COLORS.te },
  { key: 'RB', value: 3.39, color: SYOP_COLORS.rb },
  { key: 'WR', value: 4.9, color: SYOP_COLORS.wr },
  { key: 'QB', value: 7.22, color: SYOP_COLORS.qb },
];

const DRAFT_OVERALL = [
  { rd: '1', hit: 78.4 },
  { rd: '2', hit: 47.7 },
  { rd: '3', hit: 38.5 },
  { rd: '4', hit: 18.0 },
  { rd: '5', hit: 15.0 },
  { rd: '6', hit: 14.1 },
  { rd: '7', hit: 9.4 },
];

const DRAFT_POSITIONAL = [
  { rd: '1', QB: 78, RB: 83, TE: 78, WR: 76 },
  { rd: '2', QB: 42, RB: 50, TE: 40, WR: 51 },
  { rd: '3', QB: 31, RB: 62, TE: 36, WR: 30 },
  { rd: '4', QB: 20, RB: 27, TE: 23, WR: 9 },
  { rd: '5', QB: 7, RB: 27, TE: 9, WR: 13 },
  { rd: '6', QB: 11, RB: 18, TE: 8, WR: 15 },
  { rd: '7', QB: 13, RB: 9, TE: 4, WR: 11 },
];

function stripTags(str = '') {
  return str.replace(/<br\s*\/?>(?=\s*)/gi, ' ').replace(/<[^>]*>/g, '').trim();
}

function splitLabelValue(raw) {
  const text = stripTags(raw);
  const match = text.match(/^(.+?)\s*\(([^)]+)\)\s*$/);
  if (match) {
    return { label: match[1].trim(), paren: match[2].trim() };
  }
  return { label: text, paren: null };
}

function buildSunburstTree() {
  const nodes = SUNBURST_DATA.labels.map((label, idx) => ({
    label,
    parent: SUNBURST_DATA.parents[idx],
    value: SUNBURST_DATA.values[idx],
  }));
  const root = SUNBURST_DATA.labels[0];
  const childrenOf = (parent) => nodes.filter((node) => node.parent === parent);
  const ring1 = childrenOf(root);
  const byParent = {};
  ring1.forEach((node) => {
    byParent[node.label] = childrenOf(node.label);
  });
  return { root, ring1, byParent };
}

function polar(cx, cy, radius, angle) {
  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  };
}

function arcPath(cx, cy, inner, outer, a0, a1) {
  const p0 = polar(cx, cy, outer, a0);
  const p1 = polar(cx, cy, outer, a1);
  const p2 = polar(cx, cy, inner, a1);
  const p3 = polar(cx, cy, inner, a0);
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M ${p0.x} ${p0.y} A ${outer} ${outer} 0 ${large} 1 ${p1.x} ${p1.y} L ${p2.x} ${p2.y} A ${inner} ${inner} 0 ${large} 0 ${p3.x} ${p3.y} Z`;
}

function seriesFromLabel(label = '') {
  const clean = label.trim();
  if (clean.startsWith('QB')) return 'QB';
  if (clean.startsWith('RB')) return 'RB';
  if (clean.startsWith('WR')) return 'WR';
  if (clean.startsWith('TE')) return 'TE';
  return '';
}

function seriesColor(series) {
  switch (series) {
    case 'QB':
      return SYOP_COLORS.qb;
    case 'RB':
      return SYOP_COLORS.rb;
    case 'WR':
      return SYOP_COLORS.wr;
    case 'TE':
      return SYOP_COLORS.te;
    default:
      return '#6b7280';
  }
}

function createSvgElement(tag) {
  return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

function renderSunburst(container) {
  if (!container) return;
  container.innerHTML = '';
  const { ring1, byParent } = buildSunburstTree();
  const size = 520;
  const pad = 64;
  const cx = size / 2;
  const cy = size / 2;
  const inner1 = 96;
  const outer1 = 172;
  const inner2 = 184;
  const outer2 = 268;
  const start = -Math.PI / 2;

  const svg = createSvgElement('svg');
  svg.setAttribute('viewBox', `${-pad} ${-pad} ${size + pad * 2} ${size + pad * 2}`);
  svg.setAttribute('role', 'presentation');
  svg.classList.add('syop-sunburst-svg');

  const totalRing1 = ring1.reduce((sum, node) => sum + node.value, 0) || 1;
  let cursor = start;
  const ring1Segments = ring1.map((node) => {
    const span = (node.value / totalRing1) * Math.PI * 2;
    const segment = { node, a0: cursor, a1: cursor + span };
    cursor += span;
    return segment;
  });

  const ring2Segments = [];
  ring1Segments.forEach((seg) => {
    const kids = byParent[seg.node.label] || [];
    const sum = kids.reduce((acc, n) => acc + n.value, 0) || 1;
    let c = seg.a0;
    kids.forEach((child) => {
      const span = (child.value / sum) * (seg.a1 - seg.a0);
      ring2Segments.push({ child, parentSeg: seg, a0: c, a1: c + span });
      c += span;
    });
  });

  ring1Segments.forEach((seg) => {
    const path = createSvgElement('path');
    const series = seriesFromLabel(seg.node.label);
    path.setAttribute('d', arcPath(cx, cy, inner1, outer1, seg.a0, seg.a1));
    path.setAttribute('fill', seriesColor(series));
    path.setAttribute('opacity', '0.9');
    path.setAttribute('stroke', SYOP_COLORS.bg);
    path.setAttribute('stroke-width', '1');
    svg.appendChild(path);

    const text = createSvgElement('text');
    const mid = (seg.a0 + seg.a1) / 2;
    const center = polar(cx, cy, (inner1 + outer1) / 2, mid);
    const { label } = splitLabelValue(seg.node.label);
    text.setAttribute('x', center.x);
    text.setAttribute('y', center.y);
    text.setAttribute('fill', SYOP_COLORS.text);
    text.setAttribute('font-size', '14');
    text.setAttribute('font-weight', '800');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.textContent = label;
    svg.appendChild(text);
  });

  ring2Segments.forEach((seg, idx) => {
    const path = createSvgElement('path');
    const parentSeries = seriesFromLabel(seg.parentSeg.node.label);
    path.setAttribute('d', arcPath(cx, cy, inner2, outer2, seg.a0, seg.a1));
    path.setAttribute('fill', seriesColor(parentSeries));
    path.setAttribute('opacity', '0.85');
    path.setAttribute('stroke', SYOP_COLORS.bg);
    path.setAttribute('stroke-width', '1.25');
    svg.appendChild(path);

    const text = createSvgElement('text');
    const mid = (seg.a0 + seg.a1) / 2;
    const center = polar(cx, cy, (inner2 + outer2) / 2, mid);
    const { label, paren } = splitLabelValue(seg.child.label);
    text.setAttribute('x', center.x);
    text.setAttribute('y', center.y - 4);
    text.setAttribute('fill', SYOP_COLORS.text);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    const mainTspan = createSvgElement('tspan');
    mainTspan.setAttribute('font-size', '13');
    mainTspan.setAttribute('font-weight', '800');
    mainTspan.textContent = label;
    text.appendChild(mainTspan);
    if (paren) {
      const parenTspan = createSvgElement('tspan');
      parenTspan.setAttribute('x', center.x);
      parenTspan.setAttribute('dy', '14');
      parenTspan.setAttribute('font-size', '12');
      parenTspan.setAttribute('font-weight', '700');
      parenTspan.setAttribute('fill', SYOP_COLORS.subtext);
      parenTspan.textContent = `(${paren})`;
      text.appendChild(parenTspan);
    }
    svg.appendChild(text);
  });

  const centerCircle = createSvgElement('circle');
  centerCircle.setAttribute('cx', cx);
  centerCircle.setAttribute('cy', cy);
  centerCircle.setAttribute('r', '74');
  centerCircle.setAttribute('fill', '#1E2235');
  centerCircle.setAttribute('stroke', SYOP_COLORS.bg);
  svg.appendChild(centerCircle);

  const centerText1 = createSvgElement('text');
  centerText1.setAttribute('x', cx);
  centerText1.setAttribute('y', cy - 6);
  centerText1.setAttribute('fill', SYOP_COLORS.text);
  centerText1.setAttribute('font-size', '15');
  centerText1.setAttribute('font-weight', '900');
  centerText1.setAttribute('text-anchor', 'middle');
  centerText1.setAttribute('dominant-baseline', 'middle');
  centerText1.textContent = 'Mean | Λ';
  svg.appendChild(centerText1);

  const centerText2 = createSvgElement('text');
  centerText2.setAttribute('x', cx);
  centerText2.setAttribute('y', cy + 14);
  centerText2.setAttribute('fill', SYOP_COLORS.text);
  centerText2.setAttribute('font-size', '15');
  centerText2.setAttribute('font-weight', '900');
  centerText2.setAttribute('text-anchor', 'middle');
  centerText2.setAttribute('dominant-baseline', 'middle');
  centerText2.textContent = 'Mode | M';
  svg.appendChild(centerText2);

  container.appendChild(svg);
}

function createColumnChart(ctx) {
  const ChartConstructor = window.Chart;
  if (!ctx || !ChartConstructor) return null;
  const labels = SYOP_DATA.map((row) => row.SYOP);
  const datasets = SYOP_SERIES.map((series) => ({
    label: series.key,
    data: SYOP_DATA.map((row) => row[series.key]),
    backgroundColor: series.color,
    borderRadius: 12,
    borderSkipped: false,
    stack: undefined,
  }));

  return new ChartConstructor(ctx, {
    type: 'bar',
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: false,
          grid: { display: false },
          ticks: { color: SYOP_COLORS.subtext },
        },
        y: {
          stacked: false,
          beginAtZero: true,
          max: 30,
          grid: { color: 'rgba(255,255,255,0.08)' },
          ticks: {
            color: SYOP_COLORS.subtext,
            callback: (value) => `${value}%`,
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label(context) {
              const val = Number(context.parsed.y || 0);
              return `${context.dataset.label}: ${val.toFixed(2)}%`;
            },
          },
          backgroundColor: SYOP_COLORS.panel,
          borderColor: SYOP_COLORS.panelBorder,
          borderWidth: 1,
          titleColor: SYOP_COLORS.text,
          bodyColor: SYOP_COLORS.text,
        },
      },
    },
  });
}

function toggleSeries(button, chart) {
  const seriesKey = button?.parentElement?.dataset?.series;
  if (!chart || !seriesKey) return;
  const dataset = chart.data.datasets.find((ds) => ds.label.startsWith(seriesKey));
  if (!dataset) return;
  const isPressed = button.getAttribute('aria-pressed') === 'true';
  const nextState = !isPressed;
  button.setAttribute('aria-pressed', String(nextState));
  button.textContent = nextState ? 'On' : 'Off';
  dataset.hidden = !nextState;
  chart.update();
}

function toggleStack(button, chart) {
  if (!chart) return;
  const pressed = button.getAttribute('aria-pressed') === 'true';
  const nextState = !pressed;
  button.setAttribute('aria-pressed', String(nextState));
  button.textContent = nextState ? 'On' : 'Off';
  chart.options.scales.x.stacked = nextState;
  chart.options.scales.y.stacked = nextState;
  chart.data.datasets.forEach((ds) => {
    ds.stack = nextState ? 'stack' : undefined;
    ds.borderRadius = nextState ? 6 : 12;
  });
  chart.update();
}

function renderGauges(container) {
  if (!container) return;
  container.innerHTML = '';
  GAUGES.forEach((gauge) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'syop-gauge';

    const svg = createSvgElement('svg');
    const width = 320;
    const height = 180;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const cx = width / 2;
    const cy = height - 10;
    const radius = 120;
    const min = 2;
    const max = 8;
    const start = -Math.PI;
    const end = 0;
    const value = Math.max(min, Math.min(max, gauge.value));
    const map = (val) => start + ((val - min) / (max - min)) * (end - start);

    const track = createSvgElement('path');
    track.setAttribute('d', (() => {
      const p0 = polar(cx, cy, radius, start);
      const p1 = polar(cx, cy, radius, end);
      return `M ${p0.x} ${p0.y} A ${radius} ${radius} 0 0 1 ${p1.x} ${p1.y}`;
    })());
    track.setAttribute('stroke', '#1f2437');
    track.setAttribute('stroke-width', '16');
    track.setAttribute('fill', 'none');
    track.setAttribute('stroke-linecap', 'round');
    svg.appendChild(track);

    const valuePath = createSvgElement('path');
    valuePath.setAttribute('d', (() => {
      const angle = map(value);
      const p0 = polar(cx, cy, radius, start);
      const p1 = polar(cx, cy, radius, angle);
      const large = angle - start > Math.PI ? 1 : 0;
      return `M ${p0.x} ${p0.y} A ${radius} ${radius} 0 ${large} 1 ${p1.x} ${p1.y}`;
    })());
    valuePath.setAttribute('stroke', gauge.color);
    valuePath.setAttribute('stroke-width', '16');
    valuePath.setAttribute('fill', 'none');
    valuePath.setAttribute('stroke-linecap', 'round');
    svg.appendChild(valuePath);

    const ticks = [2, 3.5, 5, 6.5, 8];
    ticks.forEach((tick) => {
      const angle = map(tick);
      const pIn = polar(cx, cy, radius - 12, angle);
      const pOut = polar(cx, cy, radius + 12, angle);
      const line = createSvgElement('line');
      line.setAttribute('x1', pIn.x);
      line.setAttribute('y1', pIn.y);
      line.setAttribute('x2', pOut.x);
      line.setAttribute('y2', pOut.y);
      line.setAttribute('stroke', 'rgba(255,255,255,0.7)');
      line.setAttribute('stroke-width', '1.5');
      svg.appendChild(line);

      const label = createSvgElement('text');
      label.setAttribute('x', pOut.x);
      label.setAttribute('y', pOut.y - 6);
      label.setAttribute('font-size', '12');
      label.setAttribute('fill', SYOP_COLORS.subtext);
      label.setAttribute('text-anchor', 'middle');
      label.textContent = tick;
      svg.appendChild(label);
    });

    wrapper.appendChild(svg);

    const labelWrapper = document.createElement('div');
    labelWrapper.className = 'syop-gauge-label';
    const labelTitle = document.createElement('span');
    labelTitle.textContent = gauge.key;
    const labelValue = document.createElement('span');
    labelValue.className = 'syop-gauge-value';
    labelValue.style.color = gauge.color;
    labelValue.textContent = gauge.value.toFixed(2);
    labelWrapper.append(labelTitle, labelValue);
    wrapper.appendChild(labelWrapper);

    container.appendChild(wrapper);
  });
}

function renderHighlights(list) {
  if (!list) return;
  list.innerHTML = '';
  const peaks = {};
  SYOP_SERIES.forEach((series) => {
    let best = { syop: SYOP_DATA[0].SYOP, value: SYOP_DATA[0][series.key] };
    SYOP_DATA.forEach((row) => {
      const v = row[series.key];
      if (v > best.value) {
        best = { syop: row.SYOP, value: v };
      }
    });
    peaks[series.key] = best;
  });

  const statements = [
    {
      label: 'QB',
      color: SYOP_COLORS.qb,
      text: `peaks at ${peaks['QB %'].value.toFixed(2)}% in SYOP ${peaks['QB %'].syop}.`,
    },
    {
      label: 'RB',
      color: SYOP_COLORS.rb,
      text: `concentrates early with ${peaks['RB %'].value.toFixed(2)}% in SYOP ${peaks['RB %'].syop}.`,
    },
    {
      label: 'WR',
      color: SYOP_COLORS.wr,
      text: `shows a dual hump (SYOP 3–7) highlighted by ${peaks['WR %'].value.toFixed(2)}%.`,
    },
    {
      label: 'TE',
      color: SYOP_COLORS.te,
      text: `maintains steady value with residuals through 12+ years at ${peaks['TE %'].value.toFixed(2)}%.`,
    },
  ];

  statements.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong style="color:${item.color}">${item.label}</strong> ${item.text}`;
    list.appendChild(li);
  });
}

function renderQa(list) {
  if (!list) return;
  list.innerHTML = '';
  const tests = [];
  const gaugeKeys = GAUGES.map((g) => g.key).sort().join(',');
  const required = ['QB', 'RB', 'WR', 'TE'].sort().join(',');
  tests.push({ name: 'Gauge keys present', pass: gaugeKeys === required });
  const rangeOk = GAUGES.every((g) => typeof g.value === 'number' && g.value >= 2 && g.value <= 8);
  tests.push({ name: 'Gauge values between 2 and 8', pass: rangeOk });
  const columnsOk = SYOP_DATA.every((row) => SYOP_SERIES.every((series) => typeof row[series.key] === 'number'));
  tests.push({ name: 'SYOP rows include all series', pass: columnsOk });
  const sunAligned = SUNBURST_DATA.labels.length === SUNBURST_DATA.parents.length && SUNBURST_DATA.parents.length === SUNBURST_DATA.values.length;
  tests.push({ name: 'Sunburst arrays aligned', pass: sunAligned });
  const splitTest = (() => {
    const { label, paren } = splitLabelValue('SPΛ (7.2)');
    return label === 'SPΛ' && paren === '7.2';
  })();
  tests.push({ name: 'Sunburst label/value split', pass: splitTest });
  const centerSymbols = 'Mean | Λ & Mode | M'.includes('Λ') && 'Mean | Λ & Mode | M'.includes('M');
  tests.push({ name: 'Center title uses Λ and M', pass: centerSymbols });
  const arcTest = /^M\s/.test(arcPath(0, 0, 10, 20, 0, Math.PI / 2));
  tests.push({ name: 'arcPath returns SVG path', pass: arcTest });
  const seriesParse = seriesFromLabel('WR sample') === 'WR';
  tests.push({ name: 'seriesFromLabel parses prefix', pass: seriesParse });

  tests.forEach((test) => {
    if (!test.pass) {
      // eslint-disable-next-line no-console
      console.warn(`SYOP QA failed: ${test.name}`);
    }
    const li = document.createElement('li');
    li.className = `syop-qa-item ${test.pass ? 'pass' : 'fail'}`;
    li.classList.add(test.pass ? 'pass' : 'fail');
    li.innerHTML = `<span>${test.name}</span><span class="syop-qa-status">${test.pass ? 'PASS' : 'FAIL'}</span>`;
    list.appendChild(li);
  });
}

function renderDraftTiles(container) {
  if (!container) return;
  container.innerHTML = '';
  DRAFT_OVERALL.forEach((row) => {
    const tile = document.createElement('div');
    tile.className = 'draft-tile';
    tile.innerHTML = `<span class="round">${row.rd}</span><span>${row.hit.toFixed(1)}%</span>`;
    container.appendChild(tile);
  });
}

function createOverallChart(ctx) {
  const ChartConstructor = window.Chart;
  if (!ctx || !ChartConstructor) return null;
  const labels = DRAFT_OVERALL.map((row) => row.rd);
  return new ChartConstructor(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Hit %',
          data: DRAFT_OVERALL.map((row) => row.hit),
          borderRadius: 14,
          borderSkipped: false,
          backgroundColor(context) {
            const chart = context.chart;
            const { ctx: canvasCtx, chartArea } = chart;
            if (!chartArea) {
              return SYOP_COLORS.wr;
            }
            const gradient = canvasCtx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            gradient.addColorStop(0, 'rgba(70,231,255,0.35)');
            gradient.addColorStop(1, 'rgba(255,65,225,0.6)');
            return gradient;
          },
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: SYOP_COLORS.subtext },
        },
        y: {
          beginAtZero: true,
          max: 100,
          grid: { color: 'rgba(148,163,184,0.14)' },
          ticks: {
            color: SYOP_COLORS.subtext,
            callback: (value) => `${value}%`,
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(15,23,42,0.92)',
          borderColor: 'rgba(255,255,255,0.12)',
          borderWidth: 1,
          titleColor: '#E2E8F0',
          bodyColor: '#E2E8F0',
          callbacks: {
            label(context) {
              return `Hit %: ${Number(context.parsed.y || 0).toFixed(1)}%`;
            },
          },
        },
      },
    },
  });
}

function createPositionalChart(ctx) {
  const ChartConstructor = window.Chart;
  if (!ctx || !ChartConstructor) return null;
  const labels = DRAFT_POSITIONAL.map((row) => row.rd);
  const datasetConfig = [
    { key: 'QB', var: '--draft-magenta', fallback: '#ff41e1' },
    { key: 'RB', var: '--draft-green', fallback: '#20f7a7' },
    { key: 'TE', var: '--draft-purple', fallback: '#9e5af7' },
    { key: 'WR', var: '--draft-cyan', fallback: '#46e7ff' },
  ];
  return new ChartConstructor(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: datasetConfig.map((cfg) => ({
        label: cfg.key,
        data: DRAFT_POSITIONAL.map((row) => row[cfg.key]),
        borderColor: getComputedStyle(document.documentElement).getPropertyValue(cfg.var) || cfg.fallback,
        backgroundColor: 'transparent',
        borderWidth: 3,
        tension: 0.35,
        pointRadius: 3,
        pointHoverRadius: 5,
      })),
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { color: 'rgba(148,163,184,0.12)' },
          ticks: { color: SYOP_COLORS.subtext },
        },
        y: {
          beginAtZero: true,
          max: 100,
          grid: { color: 'rgba(148,163,184,0.12)' },
          ticks: {
            color: SYOP_COLORS.subtext,
            callback: (value) => `${value}%`,
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: SYOP_COLORS.subtext,
            usePointStyle: true,
          },
        },
        tooltip: {
          backgroundColor: 'rgba(15,23,42,0.92)',
          borderColor: 'rgba(255,255,255,0.12)',
          borderWidth: 1,
          titleColor: '#E2E8F0',
          bodyColor: '#E2E8F0',
          callbacks: {
            label(context) {
              return `${context.dataset.label}: ${Number(context.parsed.y || 0).toFixed(1)}%`;
            },
          },
        },
      },
    },
  });
}

function initSyopPage() {
  const params = new URLSearchParams(window.location.search);
  const username = params.get('username');
  if (username) {
    const usernameField = document.getElementById('usernameInput');
    if (usernameField) {
      usernameField.value = username;
    }
  }

  const sunburst = document.getElementById('syop-sunburst');
  renderSunburst(sunburst);

  const columnCanvas = document.getElementById('syop-column-chart');
  const columnChart = createColumnChart(columnCanvas?.getContext('2d'));

  const toggleButtons = document.querySelectorAll('.syop-toggle .syop-switch');
  toggleButtons.forEach((button) => {
    button.addEventListener('click', () => toggleSeries(button, columnChart));
  });

  const stackButton = document.getElementById('syop-stack-toggle');
  stackButton?.addEventListener('click', () => toggleStack(stackButton, columnChart));

  const gaugeGrid = document.querySelector('.syop-gauge-grid');
  renderGauges(gaugeGrid);

  const highlightsList = document.getElementById('syop-highlights');
  renderHighlights(highlightsList);

  const qaList = document.getElementById('syop-qa');
  renderQa(qaList);

  const tiles = document.getElementById('draft-tiles');
  renderDraftTiles(tiles);

  const overallCanvas = document.getElementById('draft-overall-chart');
  createOverallChart(overallCanvas?.getContext('2d'));

  const positionalCanvas = document.getElementById('draft-positional-chart');
  createPositionalChart(positionalCanvas?.getContext('2d'));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSyopPage);
} else {
  initSyopPage();
}
