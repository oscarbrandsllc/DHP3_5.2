(function () {
  const PAGE_ID = 'research';
  const SVG_NS = 'http://www.w3.org/2000/svg';

  const colors = {
    bg: '#0B0E16',
    panel: 'rgba(18, 21, 38, 0.78)',
    panelBorder: 'rgba(132, 146, 255, 0.16)',
    text: '#F5F7FF',
    subtext: '#A7AFD4',
    muted: '#303854',
    grid: 'rgba(148, 163, 255, 0.16)',
    accentA: '#3BE4E4',
    accentB: '#7C83FF',
    accentC: '#FF75D1',
    qb: '#6311ee',
    rb: '#730fff',
    wr: '#8021ff',
    te: '#922fff',
    labelTint: '#9096C0'
  };

  const SUNBURST_NODES = [
    { id: 'root', parent: null, label: 'SYOP Averages', subtitle: 'Mean Λ vs Mode M', value: 51.6 },
    { id: 'qb', parent: 'root', label: 'QB', subtitle: 'Quarterbacks', value: 16.46, series: 'QB' },
    { id: 'qb-prime-lambda', parent: 'qb', label: 'Prime Λ', subtitle: '7.2 yrs', value: 6.5, abbr: 'SPΛ', stat: '7.2' },
    { id: 'qb-breakout-lambda', parent: 'qb', label: 'Breakout Λ', subtitle: '2.3 yrs', value: 2.49, abbr: 'BOΛ', stat: '2.3' },
    { id: 'qb-prime-mode', parent: 'qb', label: 'Prime M', subtitle: '6.0 yrs', value: 5.35, abbr: 'SPM', stat: '6.0' },
    { id: 'qb-baseline-mode', parent: 'qb', label: 'Baseline M', subtitle: '1.0 yrs', value: 2.1, abbr: 'BOM', stat: '1.0' },
    { id: 'rb', parent: 'root', label: 'RB', subtitle: 'Running Backs', value: 9.8, series: 'RB' },
    { id: 'rb-prime-lambda', parent: 'rb', label: 'Prime Λ', subtitle: '3.4 yrs', value: 3.31, abbr: 'SPΛ', stat: '3.4' },
    { id: 'rb-breakout-lambda', parent: 'rb', label: 'Breakout Λ', subtitle: '2.2 yrs', value: 2.5, abbr: 'BOΛ', stat: '2.2' },
    { id: 'rb-prime-mode', parent: 'rb', label: 'Prime M', subtitle: '0.7 yrs', value: 1.89, abbr: 'SPM', stat: '0.7' },
    { id: 'rb-baseline-mode', parent: 'rb', label: 'Baseline M', subtitle: '1.7 yrs', value: 2.1, abbr: 'BOM', stat: '1.7' },
    { id: 'wr', parent: 'root', label: 'WR', subtitle: 'Wide Receivers', value: 12.82, series: 'WR' },
    { id: 'wr-prime-lambda', parent: 'wr', label: 'Prime Λ', subtitle: '4.9 yrs', value: 4.92, abbr: 'SPΛ', stat: '4.9' },
    { id: 'wr-breakout-lambda', parent: 'wr', label: 'Breakout Λ', subtitle: '2.9 yrs', value: 2.84, abbr: 'BOΛ', stat: '2.9' },
    { id: 'wr-prime-mode', parent: 'wr', label: 'Prime M', subtitle: '3.0 yrs', value: 3, abbr: 'SPM', stat: '3.0' },
    { id: 'wr-baseline-mode', parent: 'wr', label: 'Baseline M', subtitle: '2.0 yrs', value: 2, abbr: 'BOM', stat: '2.0' },
    { id: 'te', parent: 'root', label: 'TE', subtitle: 'Tight Ends', value: 12.5, series: 'TE' },
    { id: 'te-prime-lambda', parent: 'te', label: 'Prime Λ', subtitle: '4.0 yrs', value: 4.01, abbr: 'SPΛ', stat: '4.0' },
    { id: 'te-breakout-lambda', parent: 'te', label: 'Breakout Λ', subtitle: '3.5 yrs', value: 3.49, abbr: 'BOΛ', stat: '3.5' },
    { id: 'te-prime-mode', parent: 'te', label: 'Prime M', subtitle: '2.0 yrs', value: 2, abbr: 'SPM', stat: '2.0' },
    { id: 'te-baseline-mode', parent: 'te', label: 'Baseline M', subtitle: '3.0 yrs', value: 3, abbr: 'BOM', stat: '3.0' }
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
    { SYOP: '12+', 'QB %': 20.0, 'RB %': 0.4, 'WR %': 2.2, 'TE %': 3.85 }
  ];

  const GAUGES = [
    { key: 'QB', value: 7.22, color: colors.qb },
    { key: 'RB', value: 3.39, color: colors.rb },
    { key: 'WR', value: 4.9, color: colors.wr },
    { key: 'TE', value: 4.0, color: colors.te }
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

  let resizeTimer = null;

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

  const sunburstNodeById = new Map(SUNBURST_NODES.map((node) => [node.id, node]));

  function childrenOf(id) {
    return SUNBURST_NODES.filter((node) => node.parent === id);
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

  function hexToRgba(hex, alpha) {
    const normalized = hex.replace('#', '');
    const value = parseInt(normalized, 16);
    const r = (value >> 16) & 255;
    const g = (value >> 8) & 255;
    const b = value & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function stripYearSuffix(text) {
    if (typeof text !== 'string') return text;
    return text.replace(/\s*yrs?\.?/gi, '').trim();
  }

  function renderSunburst() {
    const container = document.getElementById('syop-sunburst');
    if (!container) return;

    const root = sunburstNodeById.get('root');
    const ring1Nodes = childrenOf(root?.id || 'root');
    const ring1Total = ring1Nodes.reduce((sum, node) => sum + node.value, 0) || 1;
    const baseSize = 480;
    const containerWidth = container.clientWidth || baseSize;
    const constrained = Math.max(320, containerWidth);
    const size = Math.min(baseSize, constrained);
    const rawScale = size / baseSize;
    const scale = Math.pow(rawScale, 0.85);
    const pad = 64 * scale;
    const cx = size / 2;
    const cy = size / 2;
    const inner1 = 104 * scale;
    const outer1 = 178 * scale;
    const inner2 = 184 * scale;
    const outer2 = 276 * scale;
    const centerRadius = 94 * scale;
    const textStroke = 'rgba(11, 14, 22, 0.68)';
    const fontSize = (value, floor = 12) => Math.max(value * scale, floor);
    const startAngle = -Math.PI / 2;

    const svg = createSVG('svg', {
      viewBox: `${-pad} ${-pad} ${size + pad * 2} ${size + pad * 2}`,
      width: String(size),
      height: String(size),
      class: 'syop-sunburst-svg',
      role: 'img',
      'aria-labelledby': 'syop-infographic-heading'
    });

    let cursor = startAngle;
    const ring1Segments = ring1Nodes.map((node) => {
      const span = (node.value / ring1Total) * Math.PI * 2;
      const segment = { node, a0: cursor, a1: cursor + span };
      cursor += span;
      return segment;
    });

    const ring2Segments = [];
    ring1Segments.forEach((segment) => {
      const children = childrenOf(segment.node.id);
      const total = children.reduce((sum, child) => sum + child.value, 0) || 1;
      let childCursor = segment.a0;
      children.forEach((child) => {
        const span = (child.value / total) * (segment.a1 - segment.a0);
        ring2Segments.push({ parent: segment, node: child, a0: childCursor, a1: childCursor + span });
        childCursor += span;
      });
    });

    ring1Segments.forEach((segment) => {
      const color = seriesColor(segment.node.series);
      const path = createSVG('path', {
        d: arcPath(cx, cy, inner1, outer1, segment.a0, segment.a1),
        fill: hexToRgba(color, 0.9),
        stroke: colors.bg,
        'stroke-width': (1.2 * scale).toFixed(3)
      });
      svg.appendChild(path);

      const mid = (segment.a0 + segment.a1) / 2;
      const pos = labelAt(cx, cy, (inner1 + outer1) / 2, mid);
      const text = createSVG('text', {
        x: pos.x,
        y: pos.y - 6 * scale,
        fill: colors.text,
        'text-anchor': 'middle',
        'dominant-baseline': 'middle',
        'font-size': fontSize(22, 16),
        'font-weight': '800',
        'paint-order': 'stroke',
        stroke: textStroke,
        'stroke-width': Math.max(0.45, 0.6 * scale).toFixed(3),
        'font-family': '"Quicksand", "Product Sans", sans-serif'
      });
      text.appendChild(document.createTextNode(segment.node.label));
      const subtitleText = stripYearSuffix(segment.node.subtitle);
      if (subtitleText && !segment.node.series) {
        const subtitle = createSVG('tspan', {
          x: pos.x,
          dy: `${18 * scale}`,
          'font-size': fontSize(15, 13),
          'font-weight': '700',
          fill: colors.text,
          'font-family': '"Quicksand", "Product Sans", sans-serif'
        }, document.createTextNode(subtitleText));
        text.appendChild(subtitle);
      }
      svg.appendChild(text);
    });

    ring2Segments.forEach((segment) => {
      const parentColor = seriesColor(segment.parent.node.series);
      const path = createSVG('path', {
        d: arcPath(cx, cy, inner2, outer2, segment.a0, segment.a1),
        fill: hexToRgba(parentColor, 0.64),
        stroke: colors.bg,
        'stroke-width': (1.1 * scale).toFixed(3)
      });
      svg.appendChild(path);

      const mid = (segment.a0 + segment.a1) / 2;
      const radius = (inner2 + outer2) / 2;
      const center = labelAt(cx, cy, radius, mid);
      const label = createSVG('text', {
        x: center.x,
        y: center.y - 4 * scale,
        fill: colors.labelTint,
        'text-anchor': 'middle',
        'dominant-baseline': 'middle',
        'font-size': fontSize(22, 15),
        'font-weight': '800',
        'paint-order': 'stroke',
        stroke: textStroke,
        'stroke-width': Math.max(0.4, 0.6 * scale).toFixed(3),
        'font-family': '"Quicksand", "Product Sans", sans-serif'
      });
      label.appendChild(document.createTextNode(segment.node.abbr || segment.node.label));
      const statRaw = segment.node.stat || (segment.node.subtitle ? segment.node.subtitle.replace(/[^0-9.]+/g, '') : '');
      const stat = stripYearSuffix(statRaw);
      if (stat) {
        label.appendChild(createSVG('tspan', {
          x: center.x,
          dy: `${28 * scale}`,
          'font-size': fontSize(24, 18),
          'font-weight': '800',
          fill: colors.text,
          'paint-order': 'stroke',
          stroke: textStroke,
          'stroke-width': Math.max(0.45, 0.68 * scale).toFixed(3),
          'font-family': '"Quicksand", "Product Sans", sans-serif'
        }, document.createTextNode(stat)));
      }
      svg.appendChild(label);
    });

    const centerCircle = createSVG('circle', {
      cx,
      cy,
      r: centerRadius,
      fill: '#111628',
      stroke: colors.bg,
      'stroke-width': (1.2 * scale).toFixed(3)
    });
    svg.appendChild(centerCircle);

    const titleTop = createSVG('text', {
      x: cx,
      y: cy - 28 * scale,
      fill: colors.text,
      'font-size': fontSize(23, 17),
      'font-weight': '800',
      'text-anchor': 'middle',
      'paint-order': 'stroke',
      stroke: textStroke,
      'stroke-width': Math.max(0.45, 0.64 * scale).toFixed(3),
      'font-family': '"Quicksand", "Product Sans", sans-serif'
    }, document.createTextNode('Mean | Λ'));
    svg.appendChild(titleTop);

    const titleBottom = createSVG('text', {
      x: cx,
      y: cy + 2 * scale,
      fill: colors.text,
      'font-size': fontSize(23, 17),
      'font-weight': '800',
      'text-anchor': 'middle',
      'paint-order': 'stroke',
      stroke: textStroke,
      'stroke-width': Math.max(0.45, 0.64 * scale).toFixed(3),
      'font-family': '"Quicksand", "Product Sans", sans-serif'
    }, document.createTextNode('Mode | M'));
    svg.appendChild(titleBottom);

    if (root?.subtitle) {
      svg.appendChild(createSVG('text', {
        x: cx,
        y: cy + 26 * scale,
        fill: colors.subtext,
        'font-size': fontSize(14, 12),
        'font-weight': '600',
        'text-anchor': 'middle',
        'font-family': '"Quicksand", "Product Sans", sans-serif'
      }, document.createTextNode(root.subtitle)));
    }

    container.innerHTML = '';
    container.appendChild(svg);
  }

  function renderBarChart() {
    const container = document.getElementById('syop-bar-chart');
    if (!container) return;
    container.innerHTML = '';

    const scroll = createEl('div', { class: 'syop-heatmap-scroll' });
    const grid = createEl('div', { class: 'syop-heatmap' });

    const headerRow = createEl('div', { class: 'syop-heatmap-row syop-heatmap-header' },
      createEl('div', { class: 'syop-heatmap-cell bucket-cell' }, 'SYOP')
    );
    SERIES_CONFIG.forEach((series) => {
      headerRow.appendChild(createEl('div', {
        class: 'syop-heatmap-cell position-header',
        style: { '--header-accent': series.color }
      }, series.label.replace('%', '').trim()));
    });
    grid.appendChild(headerRow);

    const maxValue = Math.max(...SYOP_DATA.flatMap((row) => SERIES_CONFIG.map((series) => row[series.key] || 0)));

    SYOP_DATA.forEach((row) => {
      const rowEl = createEl('div', { class: 'syop-heatmap-row' });
      rowEl.appendChild(createEl('div', { class: 'syop-heatmap-cell bucket-cell' }, row.SYOP));

      SERIES_CONFIG.forEach((series) => {
        const value = row[series.key] || 0;
        const intensity = maxValue > 0 ? value / maxValue : 0;
        const width = Math.max(12, Math.min(100, intensity * 100));
        const fill = hexToRgba(series.color, 0.35 + 0.55 * intensity);
        const bar = createEl('span', {
          class: 'syop-heatmap-bar',
          style: {
            width: `${width}%`,
            background: fill
          }
        });
        const cell = createEl('div', {
          class: 'syop-heatmap-cell value-cell',
          style: { '--accent-color': series.color }
        },
        bar,
        createEl('span', { class: 'syop-heatmap-value' }, `${value.toFixed(1)}%`));
        rowEl.appendChild(cell);
      });

      grid.appendChild(rowEl);
    });

    scroll.appendChild(grid);
    container.appendChild(scroll);
  }

  function renderGauges() {
    const container = document.getElementById('syop-gauges');
    if (!container) return;
    container.innerHTML = '';

    GAUGES.forEach((gauge) => {
      const gaugeWrapper = createEl('div', { class: 'syop-gauge-card' });
      const svg = renderGaugeSVG(gauge);
      const label = createEl('div', { class: 'syop-gauge-label' },
        createEl('span', { class: 'gauge-value', style: { color: gauge.color } }, gauge.key),
        createEl('span', { class: 'gauge-title', style: { color: colors.subtext } }, 'AVG SYOP (YRS)')
      );
      gaugeWrapper.appendChild(svg);
      gaugeWrapper.appendChild(label);
      container.appendChild(gaugeWrapper);
    });
  }

  function renderGaugeSVG(gauge) {
    const min = 2;
    const max = 8;
    const width = 240;
    const height = 160;
    const cx = width / 2;
    const cy = height - 18;
    const radius = 112;
    const trackWidth = 18;

    const start = -Math.PI;
    const end = 0;
    const map = (value) => start + ((value - min) / (max - min)) * (end - start);
    const valueAngle = map(Math.max(min, Math.min(max, gauge.value)));

    const svg = createSVG('svg', {
      viewBox: `0 0 ${width} ${height}`,
      class: 'syop-gauge-svg'
    });

    const defs = createSVG('defs');
    const gradient = createSVG('linearGradient', {
      id: `gauge-gradient-${gauge.key}`,
      x1: '0',
      y1: '1',
      x2: '1',
      y2: '0'
    });
    gradient.appendChild(createSVG('stop', { offset: '0%', 'stop-color': hexToRgba(gauge.color, 0.4) }));
    gradient.appendChild(createSVG('stop', { offset: '100%', 'stop-color': gauge.color }));
    defs.appendChild(gradient);
    svg.appendChild(defs);

    const track = createSVG('path', {
      d: describeArc(cx, cy, radius, start, end),
      stroke: 'rgba(31, 36, 55, 0.8)',
      'stroke-width': trackWidth,
      'stroke-linecap': 'round',
      fill: 'none'
    });
    svg.appendChild(track);

    const valuePath = createSVG('path', {
      d: describeArc(cx, cy, radius, start, valueAngle),
      stroke: `url(#gauge-gradient-${gauge.key})`,
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
        'font-size': '11',
        'text-anchor': 'middle'
      }, document.createTextNode(tick.toString()));
      svg.appendChild(label);
    });

    const valueText = createSVG('text', {
      x: cx,
      y: cy - 44,
      fill: gauge.color,
      'font-size': '32',
      'font-weight': '800',
      'text-anchor': 'middle',
      'paint-order': 'stroke',
      stroke: 'rgba(11, 14, 22, 0.72)',
      'stroke-width': '0.6'
    }, document.createTextNode(gauge.value.toFixed(2)));
    svg.appendChild(valueText);

    svg.appendChild(createSVG('text', {
      x: cx,
      y: cy - 24,
      fill: colors.subtext,
      'font-size': '16',
      'font-weight': '700',
      'text-anchor': 'middle'
    }, document.createTextNode('YRS')));

    return svg;
  }

  function describeArc(cx, cy, radius, a0, a1) {
    const start = polar(cx, cy, radius, a0);
    const end = polar(cx, cy, radius, a1);
    const large = a1 - a0 > Math.PI ? 1 : 0;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${large} 1 ${end.x} ${end.y}`;
  }

  function renderDraftOverall() {
    const container = document.getElementById('draft-overall-chart');
    if (!container) return;
    container.innerHTML = '';

    const containerWidth = container.clientWidth || 0;
    const fallbackWidth = 360;
    const width = containerWidth > 0 ? containerWidth : fallbackWidth;
    const height = width < 520 ? 270 : 320;
    const margin = width < 520
      ? { top: 26, right: 14, bottom: 48, left: 46 }
      : { top: 32, right: 24, bottom: 56, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    const svg = createSVG('svg', {
      viewBox: `0 0 ${width} ${height}`,
      width: String(width),
      height: String(height)
    });

    const defs = createSVG('defs');
    const gradient = createSVG('linearGradient', { id: 'draft-bar-fill', x1: '0', x2: '0', y1: '0', y2: '1' });
    gradient.appendChild(createSVG('stop', { offset: '0%', 'stop-color': colors.accentA }));
    gradient.appendChild(createSVG('stop', { offset: '100%', 'stop-color': colors.accentC }));
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
        stroke: tick === 0 ? 'rgba(255,255,255,0.16)' : colors.grid
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
      const baseX = index * groupWidth;
      const barWidth = Math.min(54, groupWidth * 0.62);
      const barHeight = (row.hit / niceMax) * chartHeight;
      const y = chartHeight - barHeight;
      const rect = createSVG('rect', {
        x: baseX + (groupWidth - barWidth) / 2,
        y,
        width: barWidth,
        height: Math.max(0, barHeight),
        fill: 'url(#draft-bar-fill)',
        rx: 12,
        ry: 12,
        opacity: '0.95'
      });
      g.appendChild(rect);

      g.appendChild(createSVG('text', {
        x: baseX + groupWidth / 2,
        y: y - 8,
        fill: colors.text,
        'font-size': '12',
        'text-anchor': 'middle',
        'font-weight': '600'
      }, document.createTextNode(`${row.hit.toFixed(1)}%`)));

      g.appendChild(createSVG('text', {
        x: baseX + groupWidth / 2,
        y: chartHeight + 26,
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
      stroke: 'rgba(255,255,255,0.2)'
    }));

    g.appendChild(createSVG('text', {
      x: chartWidth / 2,
      y: chartHeight + 42,
      fill: colors.subtext,
      'font-size': '12',
      'text-anchor': 'middle'
    }, document.createTextNode('Draft Round')));

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

  function catmullRomPath(points) {
    if (points.length === 0) return '';
    if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
    const segments = [`M ${points[0].x} ${points[0].y}`];
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      segments.push(`C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`);
    }
    return segments.join(' ');
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

    const containerWidth = container.clientWidth || 0;
    const fallbackWidth = 360;
    const width = containerWidth > 0 ? containerWidth : fallbackWidth;
    const height = width < 540 ? 300 : 360;
    const margin = width < 540
      ? { top: 52, right: 20, bottom: 48, left: 54 }
      : { top: 52, right: 28, bottom: 56, left: 68 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    const svg = createSVG('svg', {
      viewBox: `0 0 ${width} ${height}`,
      width: String(width),
      height: String(height)
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
        stroke: tick === 0 ? 'rgba(255,255,255,0.16)' : colors.grid
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

    const dotRadius = width < 560 ? 3.6 : 4.4;

    DRAFT_SERIES.forEach((series) => {
      const points = DRAFT_POSITIONAL.map((row, index) => ({
        x: index * stepX,
        y: chartHeight - (row[series.key] / 100) * chartHeight,
        value: row[series.key]
      }));

      const path = createSVG('path', {
        d: catmullRomPath(points),
        fill: 'none',
        stroke: series.color,
        'stroke-width': '3',
        'stroke-linecap': 'round'
      });
      g.appendChild(path);

      points.forEach((point) => {
        g.appendChild(createSVG('circle', {
          cx: point.x,
          cy: point.y,
          r: String(dotRadius),
          fill: colors.bg,
          stroke: series.color,
          'stroke-width': '2'
        }));
        g.appendChild(createSVG('text', {
          x: point.x,
          y: point.y - (width < 560 ? 9 : 11),
          fill: colors.text,
          'font-size': '10',
          'text-anchor': 'middle'
        }, document.createTextNode(`${point.value}%`)));
      });
    });

    g.appendChild(createSVG('line', {
      x1: 0,
      x2: chartWidth,
      y1: chartHeight,
      y2: chartHeight,
      stroke: 'rgba(255,255,255,0.18)'
    }));

    container.appendChild(svg);
  }

  function handleResize() {
    if (document.body.dataset.page !== PAGE_ID) return;
    if (resizeTimer) {
      window.clearTimeout(resizeTimer);
    }
    resizeTimer = window.setTimeout(() => {
      renderSunburst();
      renderBarChart();
      renderGauges();
      renderDraftOverall();
      renderDraftPositional();
    }, 180);
  }

  function setupTabs() {
    const tabs = Array.from(document.querySelectorAll('.syop-tab'));
    if (tabs.length === 0) return;

    const panels = new Map();
    tabs.forEach((tab) => {
      const target = tab.dataset.target;
      if (target) {
        const panel = document.getElementById(target);
        if (panel) {
          panels.set(target, panel);
        }
      }
    });

    const activate = (tab, { focusTab } = { focusTab: false }) => {
      tabs.forEach((btn) => {
        const isActive = btn === tab;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', String(isActive));
        btn.setAttribute('tabindex', isActive ? '0' : '-1');
        const target = btn.dataset.target;
        const panel = target ? panels.get(target) : null;
        if (panel) {
          if (isActive) {
            panel.classList.add('active');
            panel.removeAttribute('hidden');
          } else {
            panel.classList.remove('active');
            panel.setAttribute('hidden', '');
          }
        }
      });
      if (focusTab) {
        tab.focus();
      }

      window.requestAnimationFrame(() => {
        if (tab.dataset.target === 'draft-tab-panel') {
          renderDraftOverall();
          renderDraftPositional();
        } else {
          renderSunburst();
          renderBarChart();
          renderGauges();
        }
      });
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(tab, { focusTab: false }));
      tab.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault();
          const delta = event.key === 'ArrowRight' ? 1 : -1;
          const nextIndex = (index + delta + tabs.length) % tabs.length;
          activate(tabs[nextIndex], { focusTab: true });
        }
      });
    });

    const currentActive = tabs.find((tab) => tab.classList.contains('active')) || tabs[0];
    if (currentActive) {
      activate(currentActive, { focusTab: false });
    }
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
    setupTabs();
    renderSunburst();
    renderBarChart();
    renderGauges();
    renderDraftOverall();
    renderDraftPositional();
    window.addEventListener('resize', handleResize);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
