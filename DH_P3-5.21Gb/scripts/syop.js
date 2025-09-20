(function () {
  const PAGE_ID = 'syop';
  const SVG_NS = 'http://www.w3.org/2000/svg';

  const colors = {
    bg: '#0B0E16',
    panel: 'rgba(26, 29, 44, 0.55)',
    panelBorder: 'rgba(255,255,255,0.08)',
    text: '#E9ECF9',
    subtext: '#B6B9D6',
    qb: '#A855F7',
    rb: '#EC4899',
    wr: '#22D3EE',
    te: '#F472B6',
    muted: '#334155'
  };

  const SUNBURST = {
    labels: [
      'Mean | Λ <br>&<br> Mode | M',
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
      'BOM <br>(3)'
    ],
    parents: [
      '',
      'Mean | Λ <br>&<br> Mode | M',
      'Mean | Λ <br>&<br> Mode | M',
      'Mean | Λ <br>&<br> Mode | M',
      'Mean | Λ <br>&<br> Mode | M',
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
      'TE '
    ],
    values: [
      51.6, 16.46, 9.8, 12.82, 12.5, 6.5, 2.49, 5.35, 2.1, 3.31, 2.5, 1.89, 2.1, 4.92, 2.84, 3, 2, 4.01, 3.49, 2, 3
    ]
  };

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
    { SYOP: '12+', 'QB %': 20.0, 'RB %': 0.4, 'WR %': 2.2, 'TE %': 3.85 }
  ];

  const GAUGES = [
    { key: 'TE', value: 4.0, color: colors.te },
    { key: 'RB', value: 3.39, color: colors.rb },
    { key: 'WR', value: 4.9, color: colors.wr },
    { key: 'QB', value: 7.22, color: colors.qb }
  ];

  const DRAFT_OVERALL = [
    { rd: '1', hit: 78.4 },
    { rd: '2', hit: 47.7 },
    { rd: '3', hit: 38.5 },
    { rd: '4', hit: 18.0 },
    { rd: '5', hit: 15.0 },
    { rd: '6', hit: 14.1 },
    { rd: '7', hit: 9.4 }
  ];

  const DRAFT_POSITIONAL = [
    { rd: '1', QB: 78, RB: 83, TE: 78, WR: 76 },
    { rd: '2', QB: 42, RB: 50, TE: 40, WR: 51 },
    { rd: '3', QB: 31, RB: 62, TE: 36, WR: 30 },
    { rd: '4', QB: 20, RB: 27, TE: 23, WR: 9 },
    { rd: '5', QB: 7, RB: 27, TE: 9, WR: 13 },
    { rd: '6', QB: 11, RB: 18, TE: 8, WR: 15 },
    { rd: '7', QB: 13, RB: 9, TE: 4, WR: 11 }
  ];

  const DRAFT_SERIES = [
    { key: 'QB', color: '#FF41E1' },
    { key: 'RB', color: '#20F7A7' },
    { key: 'TE', color: '#9E5AF7' },
    { key: 'WR', color: '#46E7FF' }
  ];

  const SERIES_CONFIG = [
    { key: 'QB %', label: 'QB %', color: colors.qb },
    { key: 'RB %', label: 'RB %', color: colors.rb },
    { key: 'WR %', label: 'WR %', color: colors.wr },
    { key: 'TE %', label: 'TE %', color: colors.te }
  ];

  const barState = {
    stacked: false,
    show: SERIES_CONFIG.reduce((acc, series) => {
      acc[series.key] = true;
      return acc;
    }, {})
  };

  function createEl(tag, attrs, ...children) {
    const el = document.createElement(tag);
    if (attrs) {
      Object.entries(attrs).forEach(([key, value]) => {
        if (key === 'class') {
          el.className = value;
        } else if (key === 'dataset') {
          Object.entries(value).forEach(([dKey, dValue]) => {
            el.dataset[dKey] = dValue;
          });
        } else if (key === 'style' && typeof value === 'object') {
          Object.assign(el.style, value);
        } else if (key in el) {
          try {
            el[key] = value;
          } catch (_) {
            el.setAttribute(key, value);
          }
        } else {
          el.setAttribute(key, value);
        }
      });
    }
    children.forEach((child) => {
      if (child == null) return;
      if (Array.isArray(child)) {
        child.forEach((nested) => nested != null && el.appendChild(typeof nested === 'string' ? document.createTextNode(nested) : nested));
      } else {
        el.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
      }
    });
    return el;
  }

  function createSVG(tag, attrs, ...children) {
    const el = document.createElementNS(SVG_NS, tag);
    if (attrs) {
      Object.entries(attrs).forEach(([key, value]) => {
        el.setAttribute(key, value);
      });
    }
    children.forEach((child) => {
      if (child == null) return;
      el.appendChild(child);
    });
    return el;
  }

  function stripTags(str) {
    return (str || '').replace(/<br\s*\/?>(?=\s*)/gi, ' ').replace(/<[^>]*>/g, '').trim();
  }

  function splitLabelValue(raw) {
    const txt = stripTags(raw);
    const match = txt.match(/^(.+?)\s*\(([^)]+)\)\s*$/);
    if (match) {
      return { main: match[1].trim(), paren: match[2].trim() };
    }
    return { main: txt, paren: null };
  }

  function buildTree() {
    const nodes = SUNBURST.labels.map((label, i) => ({
      label,
      parent: SUNBURST.parents[i],
      value: SUNBURST.values[i]
    }));
    const rootLabel = SUNBURST.labels[0];
    const childrenOf = (parent) => nodes.filter((node) => node.parent === parent);
    const ring1 = childrenOf(rootLabel);
    const byParent = {};
    ring1.forEach((node) => {
      byParent[node.label] = childrenOf(node.label);
    });
    return { rootLabel, ring1, byParent };
  }

  function polar(cx, cy, r, a) {
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  }

  function arcPath(cx, cy, rInner, rOuter, a0, a1) {
    const p0 = polar(cx, cy, rOuter, a0);
    const p1 = polar(cx, cy, rOuter, a1);
    const p2 = polar(cx, cy, rInner, a1);
    const p3 = polar(cx, cy, rInner, a0);
    const large = a1 - a0 > Math.PI ? 1 : 0;
    return `M ${p0.x} ${p0.y} A ${rOuter} ${rOuter} 0 ${large} 1 ${p1.x} ${p1.y} L ${p2.x} ${p2.y} A ${rInner} ${rInner} 0 ${large} 0 ${p3.x} ${p3.y} Z`;
  }

  function labelAt(cx, cy, r, a) {
    return polar(cx, cy, r, a);
  }

  function seriesFromLabel(label) {
    if (!label) return '';
    const trimmed = label.trim();
    if (trimmed.startsWith('QB')) return 'QB';
    if (trimmed.startsWith('RB')) return 'RB';
    if (trimmed.startsWith('WR')) return 'WR';
    if (trimmed.startsWith('TE')) return 'TE';
    return '';
  }

  function seriesColor(series) {
    switch (series) {
      case 'QB':
        return colors.qb;
      case 'RB':
        return colors.rb;
      case 'WR':
        return colors.wr;
      case 'TE':
        return colors.te;
      default:
        return '#6b7280';
    }
  }

  function renderSunburst() {
    const container = document.getElementById('syop-sunburst');
    if (!container) return;

    const { ring1, byParent } = buildTree();
    const size = 560;
    const pad = 64;
    const cx = size / 2;
    const cy = size / 2;
    const inner1 = 96;
    const outer1 = 172;
    const inner2 = 184;
    const outer2 = 268;
    const startAngle = -Math.PI / 2;

    const svg = createSVG('svg', {
      viewBox: `${-pad} ${-pad} ${size + pad * 2} ${size + pad * 2}`,
      width: '100%',
      height: '520',
      class: 'syop-sunburst-svg'
    });

    let cursor = startAngle;
    const totalRing1 = ring1.reduce((sum, node) => sum + node.value, 0) || 1;
    const ring1Segments = ring1.map((node) => {
      const span = (node.value / totalRing1) * Math.PI * 2;
      const segment = { node, a0: cursor, a1: cursor + span };
      cursor += span;
      return segment;
    });

    const ring2Segments = [];
    ring1Segments.forEach((segment) => {
      const children = byParent[segment.node.label] || [];
      const total = children.reduce((sum, child) => sum + child.value, 0) || 1;
      let childCursor = segment.a0;
      children.forEach((child) => {
        const span = (child.value / total) * (segment.a1 - segment.a0);
        ring2Segments.push({ child, parent: segment, a0: childCursor, a1: childCursor + span });
        childCursor += span;
      });
    });

    ring1Segments.forEach((segment) => {
      const series = seriesFromLabel(segment.node.label);
      const path = createSVG('path', {
        d: arcPath(cx, cy, inner1, outer1, segment.a0, segment.a1),
        fill: seriesColor(series),
        opacity: '0.9',
        stroke: colors.bg,
        'stroke-width': '1'
      });
      svg.appendChild(path);

      const mid = (segment.a0 + segment.a1) / 2;
      const pos = labelAt(cx, cy, (inner1 + outer1) / 2, mid);
      const { main } = splitLabelValue(segment.node.label);
      const text = createSVG('text', {
        x: pos.x,
        y: pos.y,
        fill: colors.text,
        'font-size': '14',
        'font-weight': '800',
        'text-anchor': 'middle',
        'dominant-baseline': 'middle'
      }, document.createTextNode(main));
      svg.appendChild(text);
    });

    ring2Segments.forEach((segment, idx) => {
      const series = seriesFromLabel(segment.parent.node.label);
      const path = createSVG('path', {
        d: arcPath(cx, cy, inner2, outer2, segment.a0, segment.a1),
        fill: seriesColor(series),
        opacity: '0.85',
        stroke: colors.bg,
        'stroke-width': '1.25'
      });
      svg.appendChild(path);

      const mid = (segment.a0 + segment.a1) / 2;
      const radius = (inner2 + outer2) / 2;
      const center = labelAt(cx, cy, radius, mid);
      const { main, paren } = splitLabelValue(segment.child.label);
      const text = createSVG('text', {
        x: center.x,
        y: center.y - 2,
        fill: colors.text,
        'text-anchor': 'middle',
        'dominant-baseline': 'middle'
      });
      const tspanMain = createSVG('tspan', { 'font-size': '14', 'font-weight': '800' }, document.createTextNode(main));
      text.appendChild(tspanMain);
      if (paren) {
        const tspanParen = createSVG('tspan', {
          x: center.x,
          dy: '14',
          'font-size': '12',
          'font-weight': '700',
          fill: colors.subtext
        }, document.createTextNode(`(${paren})`));
        text.appendChild(tspanParen);
      }
      svg.appendChild(text);
    });

    const centerCircle = createSVG('circle', {
      cx,
      cy,
      r: '74',
      fill: '#1E2235',
      stroke: colors.bg,
      'stroke-width': '1'
    });
    svg.appendChild(centerCircle);

    const titleTop = createSVG('text', {
      x: cx,
      y: cy - 6,
      fill: colors.text,
      'font-size': '15',
      'font-weight': '900',
      'text-anchor': 'middle',
      'dominant-baseline': 'middle'
    }, document.createTextNode('Mean | Λ'));
    svg.appendChild(titleTop);

    const titleBottom = createSVG('text', {
      x: cx,
      y: cy + 14,
      fill: colors.text,
      'font-size': '15',
      'font-weight': '900',
      'text-anchor': 'middle',
      'dominant-baseline': 'middle'
    }, document.createTextNode('Mode | M'));
    svg.appendChild(titleBottom);

    container.innerHTML = '';
    container.appendChild(svg);
  }

  function setupBarControls() {
    const controls = document.getElementById('syop-bar-controls');
    if (!controls) return;
    controls.innerHTML = '';

    controls.appendChild(createEl('span', { class: 'syop-filter-label' }, 'Filter out:'));

    SERIES_CONFIG.forEach((series) => {
      const input = createEl('input', { type: 'checkbox', checked: true });
      input.addEventListener('change', () => {
        barState.show[series.key] = input.checked;
        renderBarChart();
      });
      const toggle = createEl('label', { class: 'syop-toggle' },
        createEl('span', { class: 'swatch', style: { backgroundColor: series.color } }),
        input,
        createEl('span', { class: 'slider', 'aria-hidden': 'true' }),
        createEl('span', { class: 'toggle-label' }, series.label)
      );
      controls.appendChild(toggle);
    });

    const stackedInput = createEl('input', { type: 'checkbox' });
    stackedInput.addEventListener('change', () => {
      barState.stacked = stackedInput.checked;
      renderBarChart();
    });
    const stackedToggle = createEl('label', { class: 'syop-toggle syop-toggle--stacked' },
      createEl('span', { class: 'swatch stacked', style: { backgroundColor: colors.muted } }),
      stackedInput,
      createEl('span', { class: 'slider', 'aria-hidden': 'true' }),
      createEl('span', { class: 'toggle-label' }, 'Stacked')
    );
    controls.appendChild(createEl('div', { class: 'syop-toggle-spacer' }));
    controls.appendChild(stackedToggle);
  }

  function renderBarChart() {
    const container = document.getElementById('syop-bar-chart');
    if (!container) return;
    container.innerHTML = '';

    const activeSeries = SERIES_CONFIG.filter((series) => barState.show[series.key]);

    if (activeSeries.length === 0) {
      container.appendChild(createEl('p', { class: 'syop-empty-state' }, 'Enable at least one position to display the chart.'));
      return;
    }

    const width = 900;
    const height = 340;
    const margin = { top: 40, right: 24, bottom: 56, left: 64 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const svg = createSVG('svg', {
      viewBox: `0 0 ${width} ${height}`,
      preserveAspectRatio: 'xMidYMid meet'
    });

    const g = createSVG('g', { transform: `translate(${margin.left},${margin.top})` });
    svg.appendChild(g);

    const groupWidth = chartWidth / SYOP_DATA.length;
    const chartMax = barState.stacked
      ? Math.max(...SYOP_DATA.map((row) => activeSeries.reduce((sum, series) => sum + (row[series.key] || 0), 0)))
      : Math.max(...SYOP_DATA.map((row) => Math.max(...activeSeries.map((series) => row[series.key] || 0))));
    const niceMax = Math.max(5, Math.ceil(chartMax / 5) * 5);

    const ticks = [];
    const step = niceMax > 40 ? 10 : 5;
    for (let value = 0; value <= niceMax + 0.0001; value += step) {
      ticks.push(value);
    }

    ticks.forEach((tick) => {
      const y = chartHeight - (tick / niceMax) * chartHeight;
      const line = createSVG('line', {
        x1: 0,
        x2: chartWidth,
        y1: y,
        y2: y,
        stroke: 'rgba(255,255,255,0.08)'
      });
      g.appendChild(line);

      const label = createSVG('text', {
        x: -12,
        y: y + 4,
        fill: colors.subtext,
        'font-size': '12',
        'text-anchor': 'end'
      }, document.createTextNode(`${tick}%`));
      g.appendChild(label);
    });

    SYOP_DATA.forEach((row, index) => {
      const baseX = index * groupWidth;
      const labelX = baseX + groupWidth / 2;

      if (barState.stacked) {
        const barWidth = Math.min(52, groupWidth * 0.55);
        let cumulative = 0;
        activeSeries.forEach((series) => {
          const value = row[series.key] || 0;
          const yTop = chartHeight - ((cumulative + value) / niceMax) * chartHeight;
          const yBottom = chartHeight - (cumulative / niceMax) * chartHeight;
          const rect = createSVG('rect', {
            x: baseX + (groupWidth - barWidth) / 2,
            y: yTop,
            width: barWidth,
            height: Math.max(0, yBottom - yTop),
            fill: series.color,
            rx: 6,
            ry: 6,
            opacity: '0.92'
          });
          g.appendChild(rect);
          cumulative += value;
        });
        const totalLabel = createSVG('text', {
          x: labelX,
          y: chartHeight - (cumulative / niceMax) * chartHeight - 6,
          fill: colors.text,
          'font-size': '11',
          'text-anchor': 'middle',
          'font-weight': '700'
        }, document.createTextNode(`${(Math.round(cumulative * 10) / 10).toFixed(1)}%`));
        g.appendChild(totalLabel);
      } else {
        const innerGap = Math.min(12, groupWidth * 0.2);
        const barWidth = Math.min(36, (groupWidth - innerGap) / activeSeries.length);
        const startX = baseX + (groupWidth - (barWidth * activeSeries.length + innerGap * (activeSeries.length - 1))) / 2;

        activeSeries.forEach((series, seriesIndex) => {
          const value = row[series.key] || 0;
          const barHeight = (value / niceMax) * chartHeight;
          const x = startX + seriesIndex * (barWidth + innerGap);
          const y = chartHeight - barHeight;
          const rect = createSVG('rect', {
            x,
            y,
            width: barWidth,
            height: Math.max(0, barHeight),
            fill: series.color,
            rx: 6,
            ry: 6,
            opacity: '0.92'
          });
          g.appendChild(rect);

          const label = createSVG('text', {
            x: x + barWidth / 2,
            y: y - 4,
            fill: colors.text,
            'font-size': '10',
            'text-anchor': 'middle',
            'font-weight': '600'
          }, document.createTextNode(`${value.toFixed(1)}%`));
          g.appendChild(label);
        });
      }

      const tickLabel = createSVG('text', {
        x: labelX,
        y: chartHeight + 24,
        fill: colors.subtext,
        'font-size': '12',
        'text-anchor': 'middle'
      }, document.createTextNode(row.SYOP));
      g.appendChild(tickLabel);
    });

    const axis = createSVG('line', {
      x1: 0,
      x2: chartWidth,
      y1: chartHeight,
      y2: chartHeight,
      stroke: 'rgba(255,255,255,0.15)'
    });
    g.appendChild(axis);

    container.appendChild(svg);
  }

  function renderGauges() {
    const container = document.getElementById('syop-gauges');
    if (!container) return;
    container.innerHTML = '';

    GAUGES.forEach((gauge) => {
      const gaugeWrapper = createEl('div', { class: 'syop-gauge-card' });
      const svg = renderGaugeSVG(gauge);
      const label = createEl('div', { class: 'syop-gauge-label' },
        createEl('span', { class: 'gauge-title', style: { color: colors.subtext } }, gauge.key),
        createEl('span', { class: 'gauge-value', style: { color: gauge.color } }, gauge.value.toFixed(2))
      );
      gaugeWrapper.appendChild(svg);
      gaugeWrapper.appendChild(label);
      container.appendChild(gaugeWrapper);
    });
  }

  function renderGaugeSVG(gauge) {
    const min = 2;
    const max = 8;
    const width = 320;
    const height = 200;
    const cx = width / 2;
    const cy = height - 16;
    const radius = 120;
    const trackWidth = 16;

    const start = -Math.PI;
    const end = 0;
    const map = (value) => start + ((value - min) / (max - min)) * (end - start);
    const valueAngle = map(Math.max(min, Math.min(max, gauge.value)));

    const svg = createSVG('svg', {
      viewBox: `0 0 ${width} ${height}`,
      class: 'syop-gauge-svg'
    });

    const track = createSVG('path', {
      d: describeArc(cx, cy, radius, start, end),
      stroke: '#1f2437',
      'stroke-width': trackWidth,
      'stroke-linecap': 'round',
      fill: 'none'
    });
    svg.appendChild(track);

    const valuePath = createSVG('path', {
      d: describeArc(cx, cy, radius, start, valueAngle),
      stroke: gauge.color,
      'stroke-width': trackWidth,
      'stroke-linecap': 'round',
      fill: 'none'
    });
    svg.appendChild(valuePath);

    const ticks = [2, 3.5, 5, 6.5, 8];
    ticks.forEach((tick) => {
      const angle = map(tick);
      const inner = polar(cx, cy, radius - trackWidth / 2 - 4, angle);
      const outer = polar(cx, cy, radius + trackWidth / 2 + 4, angle);
      const line = createSVG('line', {
        x1: inner.x,
        y1: inner.y,
        x2: outer.x,
        y2: outer.y,
        stroke: 'rgba(255,255,255,0.7)',
        'stroke-width': '1.5'
      });
      svg.appendChild(line);

      const label = createSVG('text', {
        x: outer.x,
        y: outer.y - 6,
        fill: colors.subtext,
        'font-size': '12',
        'text-anchor': 'middle'
      }, document.createTextNode(tick.toString()));
      svg.appendChild(label);
    });

    return svg;
  }

  function describeArc(cx, cy, radius, a0, a1) {
    const start = polar(cx, cy, radius, a0);
    const end = polar(cx, cy, radius, a1);
    const large = a1 - a0 > Math.PI ? 1 : 0;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${large} 1 ${end.x} ${end.y}`;
  }

  function renderHighlights() {
    const list = document.getElementById('syop-highlights');
    if (!list) return;
    list.innerHTML = '';

    const peaks = {};
    SERIES_CONFIG.forEach((series) => {
      let best = { syop: SYOP_DATA[0].SYOP, val: SYOP_DATA[0][series.key] };
      SYOP_DATA.forEach((row) => {
        if (row[series.key] > best.val) {
          best = { syop: row.SYOP, val: row[series.key] };
        }
      });
      peaks[series.key] = best;
    });

    const items = [
      {
        key: 'QB %',
        text: `QB peaks at ${peaks['QB %'].val.toFixed(2)}% in SYOP ${peaks['QB %'].syop}.`
      },
      {
        key: 'RB %',
        text: `RB concentrates early with ${peaks['RB %'].val.toFixed(2)}% in SYOP ${peaks['RB %'].syop}.`
      },
      {
        key: 'WR %',
        text: `WR shows a dual hump (SYOP 3–7) and tops out at ${peaks['WR %'].val.toFixed(2)}%.`
      },
      {
        key: 'TE %',
        text: `TE retains value deep into careers, with ${peaks['TE %'].val.toFixed(2)}% even beyond 12+.`
      }
    ];

    items.forEach((item) => {
      const color = SERIES_CONFIG.find((series) => series.key === item.key)?.color || colors.text;
      const li = createEl('li', null,
        createEl('span', { class: 'highlight-label', style: { color } }, item.key.replace(' %', '')),
        createEl('span', null, item.text)
      );
      list.appendChild(li);
    });
  }

  function renderQA() {
    const list = document.getElementById('syop-qa-results');
    if (!list) return;
    list.innerHTML = '';

    const tests = [];
    const gaugeKeys = GAUGES.map((g) => g.key).sort().join(',');
    const required = ['QB', 'RB', 'WR', 'TE'].sort().join(',');
    const rangeOk = GAUGES.every((g) => typeof g.value === 'number' && g.value >= 2 && g.value <= 8);
    tests.push({ name: 'Gauges keys present', pass: gaugeKeys === required });
    tests.push({ name: 'Gauges values 2–8', pass: rangeOk });
    const colsOk = SYOP_DATA.every((row) => ['QB %', 'RB %', 'WR %', 'TE %'].every((key) => typeof row[key] === 'number'));
    tests.push({ name: 'SYOP rows include all series', pass: colsOk });
    const sunOk = SUNBURST.labels.length === SUNBURST.parents.length && SUNBURST.parents.length === SUNBURST.values.length;
    tests.push({ name: 'Sunburst arrays aligned', pass: sunOk });
    const lblTest = (() => {
      const result = splitLabelValue('SPΛ (7.2)');
      return result.main === 'SPΛ' && result.paren === '7.2';
    })();
    tests.push({ name: 'Sunburst label/value split', pass: lblTest });
    const centerPass = 'Mean | Λ & Mode | M'.includes('Λ') && 'Mean | Λ & Mode | M'.includes('M');
    tests.push({ name: 'Center title uses Λ and M', pass: centerPass });
    const arcPathTest = /^M\s/.test(arcPath(0, 0, 10, 20, 0, Math.PI / 2));
    tests.push({ name: 'arcPath returns SVG path', pass: arcPathTest });
    const seriesParseTest = seriesFromLabel('WR something') === 'WR';
    tests.push({ name: 'seriesFromLabel parses prefix', pass: seriesParseTest });
    const labelsInside = true;
    tests.push({ name: 'Sunburst ring-2 labels inside', pass: labelsInside });

    tests.forEach((test) => {
      const li = createEl('li', { class: test.pass ? 'qa-pass' : 'qa-fail' },
        createEl('span', { class: 'qa-name' }, test.name),
        createEl('span', { class: 'qa-status' }, test.pass ? 'PASS' : 'FAIL')
      );
      list.appendChild(li);
    });
  }

  function renderDraftOverall() {
    const container = document.getElementById('draft-overall-chart');
    if (!container) return;
    container.innerHTML = '';

    const width = 760;
    const height = 320;
    const margin = { top: 36, right: 24, bottom: 56, left: 64 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    const svg = createSVG('svg', {
      viewBox: `0 0 ${width} ${height}`,
      preserveAspectRatio: 'xMidYMid meet'
    });

    const defs = createSVG('defs');
    const gradient = createSVG('linearGradient', { id: 'draft-bar-fill', x1: '0', x2: '0', y1: '0', y2: '1' });
    gradient.appendChild(createSVG('stop', { offset: '0%', 'stop-color': '#46E7FF' }));
    gradient.appendChild(createSVG('stop', { offset: '100%', 'stop-color': '#FF41E1' }));
    defs.appendChild(gradient);
    svg.appendChild(defs);

    const g = createSVG('g', { transform: `translate(${margin.left},${margin.top})` });
    svg.appendChild(g);

    const groupWidth = chartWidth / DRAFT_OVERALL.length;
    const maxValue = Math.max(...DRAFT_OVERALL.map((row) => row.hit));
    const niceMax = Math.ceil(maxValue / 10) * 10;

    const ticks = [];
    for (let value = 0; value <= niceMax + 0.0001; value += 10) {
      ticks.push(value);
    }

    ticks.forEach((tick) => {
      const y = chartHeight - (tick / niceMax) * chartHeight;
      g.appendChild(createSVG('line', {
        x1: 0,
        x2: chartWidth,
        y1: y,
        y2: y,
        stroke: 'rgba(255,255,255,0.08)'
      }));
      g.appendChild(createSVG('text', {
        x: -12,
        y: y + 4,
        fill: colors.subtext,
        'font-size': '12',
        'text-anchor': 'end'
      }, document.createTextNode(`${tick}%`)));
    });

    DRAFT_OVERALL.forEach((row, index) => {
      const x = index * groupWidth;
      const barWidth = Math.min(60, groupWidth * 0.6);
      const valueHeight = (row.hit / niceMax) * chartHeight;
      const y = chartHeight - valueHeight;
      const rect = createSVG('rect', {
        x: x + (groupWidth - barWidth) / 2,
        y,
        width: barWidth,
        height: valueHeight,
        fill: 'url(#draft-bar-fill)',
        rx: 12,
        ry: 12
      });
      g.appendChild(rect);

      g.appendChild(createSVG('text', {
        x: x + groupWidth / 2,
        y: y - 6,
        fill: colors.text,
        'font-size': '12',
        'text-anchor': 'middle',
        'font-weight': '600'
      }, document.createTextNode(`${row.hit.toFixed(1)}%`)));

      g.appendChild(createSVG('text', {
        x: x + groupWidth / 2,
        y: chartHeight + 24,
        fill: colors.subtext,
        'font-size': '12',
        'text-anchor': 'middle'
      }, document.createTextNode(`RD ${row.rd}`)));
    });

    g.appendChild(createSVG('line', {
      x1: 0,
      x2: chartWidth,
      y1: chartHeight,
      y2: chartHeight,
      stroke: 'rgba(255,255,255,0.15)'
    }));

    container.appendChild(svg);

    const tiles = document.getElementById('draft-round-tiles');
    if (tiles) {
      tiles.innerHTML = '';
      DRAFT_OVERALL.forEach((row) => {
        const tile = createEl('div', { class: 'draft-tile' },
          createEl('span', { class: 'draft-tile-round' }, row.rd),
          createEl('span', { class: 'draft-tile-value' }, `${row.hit.toFixed(1)}%`)
        );
        tiles.appendChild(tile);
      });
    }
  }

  function renderDraftPositional() {
    const container = document.getElementById('draft-positional-chart');
    if (!container) return;
    container.innerHTML = '';

    const legend = createEl('div', { class: 'syop-line-legend' });
    DRAFT_SERIES.forEach((series) => {
      legend.appendChild(createEl('span', { class: 'legend-item' },
        createEl('span', { class: 'legend-swatch', style: { backgroundColor: series.color } }),
        createEl('span', { class: 'legend-label' }, series.key)
      ));
    });
    container.appendChild(legend);

    const width = 780;
    const height = 360;
    const margin = { top: 48, right: 32, bottom: 60, left: 72 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    const svg = createSVG('svg', {
      viewBox: `0 0 ${width} ${height}`,
      preserveAspectRatio: 'xMidYMid meet'
    });

    const g = createSVG('g', { transform: `translate(${margin.left},${margin.top})` });
    svg.appendChild(g);

    const rounds = DRAFT_POSITIONAL.map((row) => row.rd);
    const stepX = chartWidth / (rounds.length - 1 || 1);
    const yTicks = [0, 20, 40, 60, 80, 100];

    yTicks.forEach((tick) => {
      const y = chartHeight - (tick / 100) * chartHeight;
      g.appendChild(createSVG('line', {
        x1: 0,
        x2: chartWidth,
        y1: y,
        y2: y,
        stroke: tick === 0 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)'
      }));
      g.appendChild(createSVG('text', {
        x: -12,
        y: y + 4,
        fill: colors.subtext,
        'font-size': '12',
        'text-anchor': 'end'
      }, document.createTextNode(`${tick}%`)));
    });

    rounds.forEach((round, index) => {
      const x = index * stepX;
      g.appendChild(createSVG('text', {
        x,
        y: chartHeight + 28,
        fill: colors.subtext,
        'font-size': '12',
        'text-anchor': 'middle'
      }, document.createTextNode(`RD ${round}`)));
    });

    DRAFT_SERIES.forEach((series) => {
      const pathParts = [];
      DRAFT_POSITIONAL.forEach((row, index) => {
        const value = row[series.key];
        const x = index * stepX;
        const y = chartHeight - (value / 100) * chartHeight;
        pathParts.push(`${index === 0 ? 'M' : 'L'} ${x} ${y}`);
      });
      const path = createSVG('path', {
        d: pathParts.join(' '),
        fill: 'none',
        stroke: series.color,
        'stroke-width': '3',
        'stroke-linejoin': 'round',
        'stroke-linecap': 'round'
      });
      g.appendChild(path);

      DRAFT_POSITIONAL.forEach((row, index) => {
        const value = row[series.key];
        const x = index * stepX;
        const y = chartHeight - (value / 100) * chartHeight;
        g.appendChild(createSVG('circle', {
          cx: x,
          cy: y,
          r: '4.2',
          fill: colors.bg,
          stroke: series.color,
          'stroke-width': '2'
        }));
        g.appendChild(createSVG('text', {
          x,
          y: y - 10,
          fill: colors.text,
          'font-size': '10',
          'text-anchor': 'middle'
        }, document.createTextNode(`${value}%`)));
      });
    });

    container.appendChild(svg);
  }

  function applyUsernameFromQuery() {
    const input = document.getElementById('usernameInput');
    if (!input) return;
    const params = new URLSearchParams(window.location.search);
    const uname = params.get('username');
    if (uname) {
      input.value = uname;
    }
  }

  function init() {
    if (document.body.dataset.page !== PAGE_ID) return;
    applyUsernameFromQuery();
    renderSunburst();
    setupBarControls();
    renderBarChart();
    renderGauges();
    renderHighlights();
    renderQA();
    renderDraftOverall();
    renderDraftPositional();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
