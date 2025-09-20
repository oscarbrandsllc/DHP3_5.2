(function () {
  const PAGE_ID = 'syop';
  const SVG_NS = 'http://www.w3.org/2000/svg';

  const colors = {
    bg: '#0B0E16',
    panel: 'rgba(26, 29, 44, 0.62)',
    panelBorder: 'rgba(255,255,255,0.08)',
    text: '#F4F7FF',
    subtext: '#B9C2E4',
    qb: '#FF5E99',
    rb: '#00F5A0',
    wr: '#5BA8FF',
    te: '#C084FC',
    muted: '#3B4766',
    accentA: '#60F1DC',
    accentB: '#FF7DEB'
  };

  const SUNBURST_NODES = [
    { id: 'root', parent: null, label: 'SYOP Averages', subtitle: 'Positional longevity profile', value: 51.6 },
    { id: 'qb', parent: 'root', label: 'QB', subtitle: 'Λ 7.2 · M 6.0', value: 16.46, series: 'QB' },
    { id: 'qb-prime-lambda', parent: 'qb', label: 'SPΛ', subtitle: '7.2 yrs', value: 6.5 },
    { id: 'qb-breakout-lambda', parent: 'qb', label: 'BOΛ', subtitle: '2.3 yrs', value: 2.49 },
    { id: 'qb-prime-mode', parent: 'qb', label: 'SPM', subtitle: '6.0 yrs', value: 5.35 },
    { id: 'qb-baseline-mode', parent: 'qb', label: 'BOM', subtitle: '1.0 yrs', value: 2.1 },
    { id: 'rb', parent: 'root', label: 'RB', subtitle: 'Λ 3.4 · M 0.7', value: 9.8, series: 'RB' },
    { id: 'rb-prime-lambda', parent: 'rb', label: 'SPΛ', subtitle: '3.4 yrs', value: 3.31 },
    { id: 'rb-breakout-lambda', parent: 'rb', label: 'BOΛ', subtitle: '2.2 yrs', value: 2.5 },
    { id: 'rb-prime-mode', parent: 'rb', label: 'SPM', subtitle: '0.7 yrs', value: 1.89 },
    { id: 'rb-baseline-mode', parent: 'rb', label: 'BOM', subtitle: '1.7 yrs', value: 2.1 },
    { id: 'wr', parent: 'root', label: 'WR', subtitle: 'Λ 4.9 · M 3.0', value: 12.82, series: 'WR' },
    { id: 'wr-prime-lambda', parent: 'wr', label: 'SPΛ', subtitle: '4.9 yrs', value: 4.92 },
    { id: 'wr-breakout-lambda', parent: 'wr', label: 'BOΛ', subtitle: '2.9 yrs', value: 2.84 },
    { id: 'wr-prime-mode', parent: 'wr', label: 'SPM', subtitle: '3.0 yrs', value: 3 },
    { id: 'wr-baseline-mode', parent: 'wr', label: 'BOM', subtitle: '2.0 yrs', value: 2 },
    { id: 'te', parent: 'root', label: 'TE', subtitle: 'Λ 4.0 · M 2.0', value: 12.5, series: 'TE' },
    { id: 'te-prime-lambda', parent: 'te', label: 'SPΛ', subtitle: '4.0 yrs', value: 4.01 },
    { id: 'te-breakout-lambda', parent: 'te', label: 'BOΛ', subtitle: '3.5 yrs', value: 3.49 },
    { id: 'te-prime-mode', parent: 'te', label: 'SPM', subtitle: '2.0 yrs', value: 2 },
    { id: 'te-baseline-mode', parent: 'te', label: 'BOM', subtitle: '3.0 yrs', value: 3 }
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
    { key: 'QB', color: colors.qb },
    { key: 'RB', color: colors.rb },
    { key: 'TE', color: colors.te },
    { key: 'WR', color: colors.wr }
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

  function buildSmoothPath(points) {
    if (!points.length) return '';
    if (points.length === 1) {
      const [{ x, y }] = points;
      return `M ${x} ${y}`;
    }
    const path = [`M ${points[0].x} ${points[0].y}`];
    for (let i = 1; i < points.length; i += 1) {
      const p0 = points[i - 1];
      const p1 = points[i];
      const pMinus = points[i - 2] || p0;
      const pPlus = points[i + 1] || p1;
      const control1 = {
        x: p0.x + (p1.x - pMinus.x) / 6,
        y: p0.y + (p1.y - pMinus.y) / 6
      };
      const control2 = {
        x: p1.x - (pPlus.x - p0.x) / 6,
        y: p1.y - (pPlus.y - p0.y) / 6
      };
      path.push(`C ${control1.x} ${control1.y} ${control2.x} ${control2.y} ${p1.x} ${p1.y}`);
    }
    return path.join(' ');
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

  function renderSunburst() {
    const container = document.getElementById('syop-sunburst');
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const parentRect = container.parentElement?.getBoundingClientRect();
    const root = sunburstNodeById.get('root');
    const ring1Nodes = childrenOf(root?.id || 'root');
    const ring1Total = ring1Nodes.reduce((sum, node) => sum + node.value, 0) || 1;
    const baseSize = 520;
    const fallbackWidth = Math.min(baseSize, Math.max(360, parentRect?.width || baseSize));
    const size = Math.min(baseSize, Math.max(320, rect.width || fallbackWidth));
    const scale = size / baseSize;
    const scaledValue = (value, minimum = 0) => {
      const scaled = value * scale;
      return scaled < minimum ? minimum : scaled;
    };
    const pad = scaledValue(36, 20);
    const cx = size / 2;
    const cy = size / 2;
    const inner1 = scaledValue(112, 82);
    const outer1 = scaledValue(190, 140);
    const inner2 = scaledValue(206, 152);
    const outer2 = scaledValue(284, 210);
    const startAngle = -Math.PI / 2;

    const svg = createSVG('svg', {
      viewBox: `${-pad} ${-pad} ${size + pad * 2} ${size + pad * 2}`,
      class: 'syop-sunburst-svg',
      role: 'img',
      'aria-labelledby': 'syop-infographic-heading'
    });
    svg.setAttribute('width', (size + pad * 2).toString());
    svg.setAttribute('height', (size + pad * 2).toString());

    svg.style.width = '100%';
    svg.style.height = 'auto';

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
        fill: hexToRgba(color, 0.92),
        stroke: hexToRgba(colors.bg, 0.85),
        'stroke-width': scaledValue(1.2, 0.75)
      });
      svg.appendChild(path);

      const mid = (segment.a0 + segment.a1) / 2;
      const pos = labelAt(cx, cy, (inner1 + outer1) / 2, mid);
      const text = createSVG('text', {
        x: pos.x,
        y: pos.y - scaledValue(4, 2),
        fill: colors.text,
        'text-anchor': 'middle',
        'dominant-baseline': 'middle',
        'font-size': scaledValue(18, 14),
        'font-weight': '800',
        'paint-order': 'stroke',
        stroke: 'rgba(11, 14, 22, 0.68)',
        'stroke-width': scaledValue(0.6, 0.45)
      });
      text.appendChild(document.createTextNode(segment.node.label));
      if (segment.node.subtitle) {
        const subtitle = createSVG('tspan', {
          x: pos.x,
          dy: scaledValue(17, 12.5),
          'font-size': scaledValue(12.5, 11),
          'font-weight': '600',
          fill: colors.subtext
        }, document.createTextNode(segment.node.subtitle));
        text.appendChild(subtitle);
      }
      svg.appendChild(text);
    });

    ring2Segments.forEach((segment) => {
      const parentColor = seriesColor(segment.parent.node.series);
      const path = createSVG('path', {
        d: arcPath(cx, cy, inner2, outer2, segment.a0, segment.a1),
        fill: hexToRgba(parentColor, 0.78),
        stroke: hexToRgba(colors.bg, 0.85),
        'stroke-width': scaledValue(1.1, 0.7)
      });
      svg.appendChild(path);

      const mid = (segment.a0 + segment.a1) / 2;
      const radius = (inner2 + outer2) / 2;
      const center = labelAt(cx, cy, radius, mid);
      const label = createSVG('text', {
        x: center.x,
        y: center.y - scaledValue(2, 1),
        fill: colors.text,
        'text-anchor': 'middle',
        'dominant-baseline': 'middle',
        'font-size': scaledValue(16, 12.5),
        'font-weight': '700',
        'paint-order': 'stroke',
        stroke: 'rgba(11, 14, 22, 0.62)',
        'stroke-width': scaledValue(0.55, 0.4)
      });
      label.appendChild(document.createTextNode(segment.node.label));
      if (segment.node.subtitle) {
        label.appendChild(createSVG('tspan', {
          x: center.x,
          dy: scaledValue(15, 11.5),
          'font-size': scaledValue(11.5, 10),
          'font-weight': '600',
          fill: colors.subtext
        }, document.createTextNode(segment.node.subtitle)));
      }
      svg.appendChild(label);
    });

    const centerCircle = createSVG('circle', {
      cx,
      cy,
      r: scaledValue(86, 62),
      fill: '#111628',
      stroke: hexToRgba(colors.bg, 0.85),
      'stroke-width': scaledValue(1.2, 0.75)
    });
    svg.appendChild(centerCircle);

    const titleTop = createSVG('text', {
      x: cx,
      y: cy - scaledValue(20, 14),
      fill: colors.text,
      'font-size': scaledValue(18.5, 14.5),
      'font-weight': '800',
      'text-anchor': 'middle',
      'paint-order': 'stroke',
      stroke: 'rgba(11, 14, 22, 0.62)',
      'stroke-width': scaledValue(0.6, 0.45)
    }, document.createTextNode('AVG [Mean | Λ]'));
    svg.appendChild(titleTop);

    const titleBottom = createSVG('text', {
      x: cx,
      y: cy + scaledValue(6, 4),
      fill: colors.text,
      'font-size': scaledValue(18, 14),
      'font-weight': '800',
      'text-anchor': 'middle',
      'paint-order': 'stroke',
      stroke: 'rgba(11, 14, 22, 0.62)',
      'stroke-width': scaledValue(0.6, 0.45)
    }, document.createTextNode('Majority [Mode | M]'));
    svg.appendChild(titleBottom);

    if (root?.subtitle) {
      svg.appendChild(createSVG('text', {
        x: cx,
        y: cy + scaledValue(32, 22),
        fill: colors.subtext,
        'font-size': scaledValue(12, 10.5),
        'font-weight': '600',
        'text-anchor': 'middle'
      }, document.createTextNode(root.subtitle)));
    }

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

    const rect = container.getBoundingClientRect();
    const parentRect = container.parentElement?.getBoundingClientRect();
    const fallbackWidth = Math.min(920, Math.max(420, parentRect?.width || 760));
    const width = Math.min(920, Math.max(360, rect.width || fallbackWidth));
    const height = Math.max(280, Math.min(420, width * 0.58));
    const compact = width < 640;
    const margin = compact
      ? { top: 36, right: 18, bottom: 52, left: 56 }
      : { top: 44, right: 28, bottom: 60, left: 72 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const svg = createSVG('svg', {
      viewBox: `0 0 ${width} ${height}`,
      preserveAspectRatio: 'xMidYMid meet'
    });
    svg.setAttribute('width', width.toString());
    svg.setAttribute('height', height.toString());

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
        'font-size': compact ? '11' : '12',
        'text-anchor': 'end'
      }, document.createTextNode(`${tick}%`));
      g.appendChild(label);
    });

    SYOP_DATA.forEach((row, index) => {
      const baseX = index * groupWidth;
      const labelX = baseX + groupWidth / 2;

      if (barState.stacked) {
        const barWidth = Math.max(16, Math.min(52, groupWidth * 0.6));
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
        const innerGap = Math.min(12, groupWidth * 0.18);
        const barWidth = Math.max(12, Math.min(36, (groupWidth - innerGap) / activeSeries.length));
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
            'font-size': compact ? '9.5' : '10',
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
        'font-size': compact ? '11' : '12',
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
        createEl('span', { class: 'gauge-value', style: { color: gauge.color } }, gauge.key),
        createEl('span', { class: 'gauge-title', style: { color: colors.subtext } }, 'Avg SYOP (yrs)')
      );
      gaugeWrapper.appendChild(svg);
      gaugeWrapper.appendChild(label);
      container.appendChild(gaugeWrapper);
    });
  }

  function renderGaugeSVG(gauge) {
    const min = 2;
    const max = 8;
    const width = 280;
    const height = 180;
    const cx = width / 2;
    const cy = height - 18;
    const radius = 120;
    const trackWidth = 18;

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
      stroke: 'rgba(31, 36, 55, 0.8)',
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
        'font-size': '11',
        'text-anchor': 'middle'
      }, document.createTextNode(tick.toString()));
      svg.appendChild(label);
    });

    const valueText = createSVG('text', {
      x: cx,
      y: cy - 46,
      fill: colors.text,
      'font-size': '34',
      'font-weight': '700',
      'text-anchor': 'middle',
      'paint-order': 'stroke',
      stroke: 'rgba(11, 14, 22, 0.65)',
      'stroke-width': '0.6'
    }, document.createTextNode(gauge.value.toFixed(2)));
    svg.appendChild(valueText);

    svg.appendChild(createSVG('text', {
      x: cx,
      y: cy - 18,
      fill: colors.subtext,
      'font-size': '13',
      'font-weight': '600',
      'text-anchor': 'middle'
    }, document.createTextNode('yrs')));

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

    const rect = container.getBoundingClientRect();
    const parentRect = container.parentElement?.getBoundingClientRect();
    const fallbackWidth = Math.min(840, Math.max(380, parentRect?.width || 720));
    const width = Math.min(840, Math.max(340, rect.width || fallbackWidth));
    const height = Math.max(260, Math.min(340, width * 0.54));
    const compact = width < 600;
    const margin = compact
      ? { top: 32, right: 16, bottom: 52, left: 56 }
      : { top: 38, right: 22, bottom: 58, left: 68 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    const svg = createSVG('svg', {
      viewBox: `0 0 ${width} ${height}`,
      preserveAspectRatio: 'xMidYMid meet'
    });
    svg.setAttribute('width', width.toString());
    svg.setAttribute('height', height.toString());

    const defs = createSVG('defs');
    const gradient = createSVG('linearGradient', { id: 'draft-bar-fill', x1: '0', x2: '0', y1: '0', y2: '1' });
    gradient.appendChild(createSVG('stop', { offset: '0%', 'stop-color': colors.qb }));
    gradient.appendChild(createSVG('stop', { offset: '55%', 'stop-color': colors.accentA }));
    gradient.appendChild(createSVG('stop', { offset: '100%', 'stop-color': colors.accentB }));
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
        'font-size': compact ? '11' : '12',
        'text-anchor': 'end'
      }, document.createTextNode(`${tick}%`)));
    });

    DRAFT_OVERALL.forEach((row, index) => {
      const x = index * groupWidth;
      const barWidth = Math.max(18, Math.min(56, groupWidth * 0.58));
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
        'font-size': compact ? '11' : '12',
        'text-anchor': 'middle',
        'font-weight': '600'
      }, document.createTextNode(`${row.hit.toFixed(1)}%`)));

      g.appendChild(createSVG('text', {
        x: x + groupWidth / 2,
        y: chartHeight + 24,
        fill: colors.subtext,
        'font-size': compact ? '11' : '12',
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

    const rect = container.getBoundingClientRect();
    const parentRect = container.parentElement?.getBoundingClientRect();
    const fallbackWidth = Math.min(880, Math.max(420, parentRect?.width || 760));
    const width = Math.min(880, Math.max(360, rect.width || fallbackWidth));
    const height = Math.max(280, Math.min(360, width * 0.6));
    const compact = width < 640;
    const margin = compact
      ? { top: 42, right: 20, bottom: 54, left: 66 }
      : { top: 48, right: 28, bottom: 60, left: 78 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    const svg = createSVG('svg', {
      viewBox: `0 0 ${width} ${height}`,
      preserveAspectRatio: 'xMidYMid meet'
    });
    svg.setAttribute('width', width.toString());
    svg.setAttribute('height', height.toString());

    const g = createSVG('g', { transform: `translate(${margin.left},${margin.top})` });
    svg.appendChild(g);

    const rounds = DRAFT_POSITIONAL.map((row) => row.rd);
    const stepX = chartWidth / (rounds.length - 1 || 1);
    const yTicks = compact ? [0, 25, 50, 75, 100] : [0, 20, 40, 60, 80, 100];

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
        'font-size': compact ? '11' : '12',
        'text-anchor': 'end'
      }, document.createTextNode(`${tick}%`)));
    });

    rounds.forEach((round, index) => {
      const x = index * stepX;
      g.appendChild(createSVG('text', {
        x,
        y: chartHeight + 28,
        fill: colors.subtext,
        'font-size': compact ? '11' : '12',
        'text-anchor': 'middle'
      }, document.createTextNode(`RD ${round}`)));
    });

    DRAFT_SERIES.forEach((series) => {
      const points = DRAFT_POSITIONAL.map((row, index) => {
        const value = row[series.key];
        const x = index * stepX;
        const y = chartHeight - (value / 100) * chartHeight;
        return { x, y };
      });
      const pathParts = buildSmoothPath(points);
      const path = createSVG('path', {
        d: pathParts,
        fill: 'none',
        stroke: series.color,
        'stroke-width': compact ? '2.6' : '3.2',
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
          r: compact ? '3.4' : '4.2',
          fill: colors.bg,
          stroke: series.color,
          'stroke-width': '2'
        }));
        g.appendChild(createSVG('text', {
          x,
          y: y - (compact ? 8 : 10),
          fill: colors.text,
          'font-size': compact ? '9.5' : '10',
          'text-anchor': 'middle'
        }, document.createTextNode(`${value}%`)));
      });
    });

    container.appendChild(svg);
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
      const targetId = tab.dataset.target;
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
        if (targetId === 'draft-tab-panel') {
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
    setupBarControls();
    renderBarChart();
    renderGauges();
    renderDraftOverall();
    renderDraftPositional();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        renderSunburst();
        renderBarChart();
        renderDraftOverall();
        renderDraftPositional();
      }, 160);
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
