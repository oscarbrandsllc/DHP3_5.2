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
    te: '#922fff'
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

  const SYOP_BUCKETS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12+'];

  const SYOP_POSITION_BUCKETS = {
    QB: {
      total: 45,
      counts: { '1': 3, '2': 5, '3': 4, '4': 4, '5': 2, '6': 6, '7': 4, '8': 2, '9': 5, '10': 1, '11': 0, '12+': 9 },
      label: 'Quarterbacks'
    },
    RB: {
      total: 108,
      counts: { '1': 30, '2': 22, '3': 12, '4': 12, '5': 14, '6': 6, '7': 2, '8': 3, '9': 3, '10': 2, '11': 2, '12+': 0 },
      label: 'Running Backs'
    },
    WR: {
      total: 92,
      counts: { '1': 12, '2': 13, '3': 13, '4': 11, '5': 5, '6': 7, '7': 12, '8': 9, '9': 2, '10': 4, '11': 2, '12+': 2 },
      label: 'Wide Receivers'
    },
    TE: {
      total: 52,
      counts: { '1': 14, '2': 14, '3': 4, '4': 4, '5': 0, '6': 4, '7': 4, '8': 0, '9': 2, '10': 2, '11': 2, '12+': 2 },
      label: 'Tight Ends'
    }
  };

  const GAUGES = [
    { key: 'QB', value: 7.22, color: colors.qb },
    { key: 'RB', value: 3.39, color: colors.wr },
    { key: 'WR', value: 4.9, color: colors.rb },
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

  const SERIES_LABEL_OFFSETS = {
    QB: {},
    RB: {},
    TE: {},
    WR: {}
  };

  const SERIES_CONFIG = [
    { key: 'QB', label: 'QB', color: colors.qb },
    { key: 'RB', label: 'RB', color: colors.rb },
    { key: 'WR', label: 'WR', color: colors.wr },
    { key: 'TE', label: 'TE', color: colors.te }
  ];

  const SYOP_POSITION_PLAYERS = (() => {
    const playersByPosition = new Map();
    SERIES_CONFIG.forEach((series) => {
      const bucketInfo = SYOP_POSITION_BUCKETS[series.key];
      const players = [];
      if (!bucketInfo) {
        playersByPosition.set(series.key, players);
        return;
      }
      let index = 1;
      SYOP_BUCKETS.forEach((bucket) => {
        const count = bucketInfo.counts[bucket] || 0;
        for (let i = 0; i < count; i += 1) {
          const name = `${series.label} Player ${String(index).padStart(2, '0')}`;
          players.push({
            id: `${series.key}-${index}`,
            position: series.key,
            name,
            bucket,
            syopValue: bucket === '12+' ? 12.6 : Number(bucket),
            displayYears: bucket
          });
          index += 1;
        }
      });
      playersByPosition.set(series.key, players);
    });
    return playersByPosition;
  })();

  let activeSyopPositions = new Set(SERIES_CONFIG.map((series) => series.key));
  let syopTableMode = false;

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

  const labelAccent = '#9096C0';

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
    const outer2 = 284 * scale;
    const ring1Opacity = 0.9;
    const ring2Opacity = 0.5;
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
        fill: hexToRgba(color, ring1Opacity),
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
        fill: hexToRgba(parentColor, ring2Opacity),
        stroke: colors.bg,
        'stroke-width': (1.1 * scale).toFixed(3)
      });
      svg.appendChild(path);

      const mid = (segment.a0 + segment.a1) / 2;
      const radius = (inner2 + outer2) / 2;
      const center = labelAt(cx, cy, radius, mid);
      const label = createSVG('text', {
        x: center.x,
        y: center.y - 2 * scale,
        fill: labelAccent,
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
          dy: `${26 * scale}`,
          'font-size': fontSize(20, 16),
          'font-weight': '800',
          fill: colors.text,
          'paint-order': 'stroke',
          stroke: textStroke,
          'stroke-width': Math.max(0.42, 0.65 * scale).toFixed(3),
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

    const wrapper = createEl('div', { class: 'syop-violin-wrapper' });
    const controls = createEl('div', { class: 'syop-violin-controls' });
    const legend = createEl('div', { class: 'syop-violin-legend', role: 'group', 'aria-label': 'Toggle positions' });

    SERIES_CONFIG.forEach((series) => {
      const isActive = activeSyopPositions.has(series.key);
      const button = createEl('button', {
        type: 'button',
        class: `syop-legend-chip${isActive ? ' active' : ''}`,
        'data-position': series.key,
        'aria-pressed': String(isActive)
      },
      createEl('span', { class: 'chip-dot', style: { backgroundColor: series.color } }),
      createEl('span', { class: 'chip-label' }, series.label));

      button.addEventListener('click', () => {
        const currentlyActive = activeSyopPositions.has(series.key);
        if (currentlyActive && activeSyopPositions.size === 1) {
          return;
        }
        if (currentlyActive) {
          activeSyopPositions.delete(series.key);
        } else {
          activeSyopPositions.add(series.key);
        }
        renderBarChart();
      });

      button.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          button.click();
        }
      });

      legend.appendChild(button);
    });

    controls.appendChild(legend);

    const toggle = createEl('button', {
      type: 'button',
      class: 'syop-table-toggle',
      'aria-pressed': String(syopTableMode)
    }, syopTableMode ? 'View charts' : 'View as table');
    toggle.addEventListener('click', () => {
      syopTableMode = !syopTableMode;
      renderBarChart();
    });
    controls.appendChild(toggle);

    wrapper.appendChild(controls);

    const grid = createEl('div', { class: 'syop-violin-grid' });
    const tableContainer = createEl('div', { class: 'syop-table-container' });
    const tooltip = createEl('div', { class: 'syop-violin-tooltip', role: 'tooltip', id: 'syop-violin-tooltip', hidden: '' });

    const activeSeries = SERIES_CONFIG.filter((series) => activeSyopPositions.has(series.key));
    if (!syopTableMode) {
      grid.removeAttribute('hidden');
      tableContainer.innerHTML = '';
      const containerWidth = container.clientWidth || 0;
      const isCompact = containerWidth > 0 && containerWidth < 720;
      const baseWidth = isCompact ? 320 : 360;
      const baseHeight = isCompact ? 240 : 260;
      const dotRadius = isCompact ? 5 : 6.5;

      activeSeries.forEach((series) => {
        const panel = renderViolinPanel({ series, baseWidth, baseHeight, dotRadius, tooltip, wrapper });
        grid.appendChild(panel);
      });

      if (activeSeries.length === 0) {
        grid.appendChild(createEl('div', { class: 'syop-empty-state' }, 'Select at least one position to view the distribution.'));
      }

      tableContainer.setAttribute('hidden', '');
    } else {
      grid.setAttribute('hidden', '');
      tableContainer.removeAttribute('hidden');
      tableContainer.innerHTML = '';
      const table = renderSyopTable(activeSeries);
      tableContainer.appendChild(table);
    }

    wrapper.appendChild(grid);
    wrapper.appendChild(tableContainer);
    wrapper.appendChild(tooltip);
    container.appendChild(wrapper);
  }

  function renderSyopTable(seriesList) {
    const activeSeries = seriesList.length > 0 ? seriesList : SERIES_CONFIG;
    const table = createEl('table', { class: 'syop-violin-table' });
    table.appendChild(createEl('caption', {}, 'SYOP distributions by position and season count'));

    const headerRow = createEl('tr', {},
      createEl('th', { scope: 'col' }, 'Position'),
      createEl('th', { scope: 'col' }, 'SYOP years'),
      createEl('th', { scope: 'col' }, 'Players'),
      createEl('th', { scope: 'col' }, '% of position')
    );
    table.appendChild(createEl('thead', {}, headerRow));

    const body = createEl('tbody');

    activeSeries.forEach((series) => {
      const bucketInfo = SYOP_POSITION_BUCKETS[series.key];
      if (!bucketInfo) return;
      const entries = SYOP_BUCKETS
        .map((bucket) => ({ bucket, count: bucketInfo.counts[bucket] || 0 }))
        .filter((entry) => entry.count > 0);
      if (entries.length === 0) return;

      entries.forEach((entry, index) => {
        const cells = [];
        if (index === 0) {
          cells.push(createEl('th', {
            scope: 'rowgroup',
            rowspan: String(entries.length),
            class: 'syop-table-position'
          },
          createEl('span', { class: 'position-pill', style: { borderColor: series.color } }, series.label),
          createEl('span', { class: 'position-name' }, SYOP_POSITION_BUCKETS[series.key]?.label || series.label)));
        }
        const percent = bucketInfo.total > 0 ? (entry.count / bucketInfo.total) * 100 : 0;
        cells.push(createEl('td', { class: 'years-cell' }, entry.bucket));
        cells.push(createEl('td', { class: 'count-cell' }, String(entry.count)));
        cells.push(createEl('td', { class: 'percent-cell' }, `${percent.toFixed(1)}%`));
        body.appendChild(createEl('tr', {}, ...cells));
      });
    });

    table.appendChild(body);
    return table;
  }

  function renderViolinPanel({ series, baseWidth, baseHeight, dotRadius, tooltip, wrapper }) {
    const panel = createEl('div', { class: 'syop-violin-panel', 'data-position': series.key });
    const header = createEl('header', { class: 'syop-violin-panel-header' },
      createEl('h4', {}, series.label),
      createEl('span', { class: 'syop-summary-chip', style: { borderColor: series.color } },
        createEl('span', { class: 'chip-title' }, '≥2 SYOP'),
        createEl('span', { class: 'chip-value' }, `${formatShareTwoPlus(series.key)}%`))
    );
    panel.appendChild(header);

    const players = (SYOP_POSITION_PLAYERS.get(series.key) || []).slice();
    if (players.length === 0) {
      panel.appendChild(createEl('p', { class: 'syop-empty-state' }, 'No qualifying players in this segment.'));
      return panel;
    }

    const positionInfo = SYOP_POSITION_BUCKETS[series.key] || { counts: {}, total: players.length };
    players.forEach((player) => {
      const bucketCount = positionInfo.counts[player.bucket] || 0;
      player.bucketCount = bucketCount;
      player.bucketShare = positionInfo.total > 0 ? (bucketCount / positionInfo.total) * 100 : 0;
    });

    const values = players.map((player) => player.syopValue).sort((a, b) => a - b);
    const stats = computeViolinStats(values);

    panel.appendChild(createEl('div', { class: 'syop-violin-statline' },
      createEl('span', { class: 'stat-chip' }, `Median ${formatYears(stats.median)}`),
      createEl('span', { class: 'stat-chip' }, `IQR ${formatYears(stats.q1, { includeUnits: false })} – ${formatYears(stats.q3, { includeUnits: false })} yrs`)
    ));

    const chart = createEl('div', { class: 'syop-violin-chart' });
    const svg = createSVG('svg', {
      viewBox: `0 0 ${baseWidth} ${baseHeight}`,
      class: 'syop-violin-svg',
      role: 'img',
      'aria-label': `${series.label} SYOP distribution`
    });

    const margin = { top: 36, right: 28, bottom: 46, left: 52 };
    const chartWidth = baseWidth - margin.left - margin.right;
    const chartHeight = baseHeight - margin.top - margin.bottom;
    const centerY = margin.top + chartHeight / 2;

    const domain = { min: 0, max: 13.2 };
    const xScale = (value) => {
      const clamped = Math.max(domain.min, Math.min(domain.max, value));
      return margin.left + ((clamped - domain.min) / (domain.max - domain.min)) * chartWidth;
    };

    const densityPoints = computeDensity(values, domain);
    const maxDensity = densityPoints.reduce((acc, point) => Math.max(acc, point.y), 0.0001);
    const yScale = (density) => margin.top + chartHeight / 2 - (density / maxDensity) * (chartHeight / 2 - 12);
    const yScaleLower = (density) => margin.top + chartHeight / 2 + (density / maxDensity) * (chartHeight / 2 - 12);

    const axisGroup = createSVG('g', { class: 'syop-axis-group' });
    const baseline = createSVG('line', {
      x1: margin.left,
      y1: centerY,
      x2: margin.left + chartWidth,
      y2: centerY,
      class: 'axis-baseline'
    });
    axisGroup.appendChild(baseline);

    for (let tick = 0; tick <= 11; tick += 1) {
      const x = xScale(tick);
      axisGroup.appendChild(createSVG('line', {
        x1: x,
        x2: x,
        y1: margin.top,
        y2: margin.top + chartHeight,
        class: 'axis-rail'
      }));
      axisGroup.appendChild(createSVG('text', {
        x,
        y: margin.top + chartHeight + 20,
        class: 'axis-label'
      }, tick.toString()));
    }

    const x12plus = xScale(12.6);
    axisGroup.appendChild(createSVG('line', {
      x1: x12plus,
      x2: x12plus,
      y1: margin.top,
      y2: margin.top + chartHeight,
      class: 'axis-rail axis-rail--plus'
    }));
    axisGroup.appendChild(createSVG('text', {
      x: x12plus,
      y: margin.top + chartHeight + 20,
      class: 'axis-label'
    }, '12+'));

    svg.appendChild(axisGroup);

    if (densityPoints.length > 0) {
      const topPath = densityPoints
        .map((point, index) => `${index === 0 ? 'M' : 'L'} ${xScale(point.x)} ${yScale(point.y)}`)
        .join(' ');
      const bottomPath = densityPoints
        .slice()
        .reverse()
        .map((point) => `L ${xScale(point.x)} ${yScaleLower(point.y)}`)
        .join(' ');
      const violinPath = `${topPath} ${bottomPath} Z`;
      svg.appendChild(createSVG('path', {
        d: violinPath,
        class: 'violin-shape',
        fill: hexToRgba(series.color, 0.22),
        stroke: hexToRgba(series.color, 0.5)
      }));
    }

    const bandHeight = Math.min(34, chartHeight * 0.38);
    const q1x = xScale(stats.q1);
    const q3x = xScale(stats.q3);
    const medianX = xScale(stats.median);

    svg.appendChild(createSVG('rect', {
      x: Math.min(q1x, q3x),
      y: centerY - bandHeight / 2,
      width: Math.max(1, Math.abs(q3x - q1x)),
      height: bandHeight,
      class: 'iqr-band'
    }));

    svg.appendChild(createSVG('line', {
      x1: medianX,
      y1: centerY - bandHeight * 0.65,
      x2: medianX,
      y2: centerY + bandHeight * 0.65,
      class: 'median-line'
    }));

    const jitteredPoints = players.map((player) => ({
      player,
      xValue: player.syopValue + jitterForId(player.id)
    }));
    const swarmPoints = computeBeeswarm(jitteredPoints, xScale, centerY, dotRadius, chartHeight / 2 - dotRadius - 6);

    swarmPoints.forEach((point) => {
      const isOutlier = point.player.syopValue < stats.lowerFence || point.player.syopValue > stats.upperFence;
      const dot = createSVG('circle', {
        cx: point.x,
        cy: point.y,
        r: dotRadius,
        class: `syop-violin-dot${isOutlier ? ' dot-outlier' : ''}`,
        'data-player-id': point.player.id,
        stroke: series.color,
        fill: 'rgba(11, 14, 22, 0.92)',
        tabindex: '0',
        role: 'button',
        'aria-label': `${point.player.name} — ${point.player.displayYears} SYOP years`
      });
      attachDotInteractions({ dot, tooltip, wrapper, player: point.player });
      svg.appendChild(dot);
    });

    chart.appendChild(svg);
    panel.appendChild(chart);
    return panel;
  }

  function computeDensity(values, domain) {
    if (!values || values.length === 0) return [];
    const sorted = values.slice().sort((a, b) => a - b);
    const extent = sorted[sorted.length - 1] - sorted[0];
    const bandwidth = Math.max(0.45, extent > 0 ? extent / Math.sqrt(sorted.length) : 0.6);
    const step = 0.25;
    const points = [];
    for (let x = domain.min; x <= domain.max; x += step) {
      const y = kernelDensityEstimate(x, sorted, bandwidth);
      points.push({ x, y });
    }
    return points;
  }

  function kernelDensityEstimate(x, values, bandwidth) {
    if (bandwidth <= 0) {
      return 0;
    }
    const coefficient = 1 / (values.length * bandwidth);
    let sum = 0;
    for (let i = 0; i < values.length; i += 1) {
      const u = (x - values[i]) / bandwidth;
      sum += Math.exp(-0.5 * u * u);
    }
    return coefficient * (sum / Math.sqrt(2 * Math.PI));
  }

  function computeViolinStats(values) {
    if (!values || values.length === 0) {
      return { median: 0, q1: 0, q3: 0, lowerFence: 0, upperFence: 0 };
    }
    const sorted = values.slice().sort((a, b) => a - b);
    const median = quantile(sorted, 0.5);
    const q1 = quantile(sorted, 0.25);
    const q3 = quantile(sorted, 0.75);
    const iqr = q3 - q1;
    const lowerFence = q1 - 1.5 * iqr;
    const upperFence = q3 + 1.5 * iqr;
    return { median, q1, q3, lowerFence, upperFence };
  }

  function quantile(sorted, q) {
    if (!sorted || sorted.length === 0) return 0;
    if (sorted.length === 1) return sorted[0];
    const pos = (sorted.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    const next = sorted[Math.min(sorted.length - 1, base + 1)];
    return sorted[base] + rest * (next - sorted[base]);
  }

  function formatYears(value, { includeUnits = true } = {}) {
    if (!Number.isFinite(value)) return includeUnits ? '— yrs' : '—';
    let label;
    if (value >= 12.4) {
      label = '12+';
    } else {
      const rounded = Math.round(value * 10) / 10;
      if (Math.abs(rounded - Math.round(rounded)) < 0.05) {
        label = String(Math.round(rounded));
      } else {
        label = rounded.toFixed(1);
      }
    }
    return includeUnits ? `${label} yrs` : label;
  }

  function formatShareTwoPlus(positionKey) {
    const players = SYOP_POSITION_PLAYERS.get(positionKey) || [];
    if (players.length === 0) return '0';
    const twoPlus = players.filter((player) => player.syopValue >= 2).length;
    return Math.round((twoPlus / players.length) * 100);
  }

  function computeBeeswarm(points, xScale, centerY, radius, limit) {
    const placed = [];
    const sorted = points.slice().sort((a, b) => a.xValue - b.xValue || a.player.id.localeCompare(b.player.id));
    const separation = radius * 1.9;
    sorted.forEach((item, index) => {
      const x = xScale(item.xValue);
      let y = centerY;
      let attempt = 0;
      let direction = index % 2 === 0 ? 1 : -1;
      while (attempt < 120) {
        let collision = false;
        for (let i = 0; i < placed.length; i += 1) {
          const other = placed[i];
          const dx = other.x - x;
          const dy = other.y - y;
          if ((dx * dx) + (dy * dy) < (radius * 2.05) ** 2) {
            collision = true;
            break;
          }
        }
        if (!collision) break;
        attempt += 1;
        const offset = separation * attempt;
        y = centerY + direction * offset;
        direction *= -1;
      }
      y = Math.max(centerY - limit, Math.min(centerY + limit, y));
      placed.push({ x, y, player: item.player });
    });
    return placed;
  }

  function jitterForId(id) {
    let hash = 0;
    for (let i = 0; i < id.length; i += 1) {
      hash = (hash << 5) - hash + id.charCodeAt(i);
      hash |= 0; // force 32-bit
    }
    return ((Math.sin(hash) + 1) / 2) * 0.4 - 0.2;
  }

  function attachDotInteractions({ dot, tooltip, wrapper, player }) {
    const show = () => {
      setActiveDot(wrapper, dot);
      positionTooltip(wrapper, tooltip, dot, player);
    };
    const hide = () => {
      clearActiveDot(wrapper, dot);
      tooltip.setAttribute('hidden', '');
    };

    dot.addEventListener('mouseenter', show);
    dot.addEventListener('focus', show);
    dot.addEventListener('mouseleave', hide);
    dot.addEventListener('blur', hide);
    dot.addEventListener('touchstart', (event) => {
      event.preventDefault();
      show();
    }, { passive: false });
  }

  function setActiveDot(wrapper, dot) {
    const activeId = wrapper.dataset.activeDot;
    if (activeId && activeId !== dot.dataset.playerId) {
      const previous = wrapper.querySelector(`.syop-violin-dot[data-player-id="${activeId}"]`);
      if (previous) {
        previous.classList.remove('active');
      }
    }
    wrapper.dataset.activeDot = dot.dataset.playerId || '';
    dot.classList.add('active');
  }

  function clearActiveDot(wrapper, dot) {
    if (!dot) return;
    if (wrapper.dataset.activeDot === (dot.dataset.playerId || '')) {
      wrapper.dataset.activeDot = '';
    }
    dot.classList.remove('active');
  }

  function positionTooltip(wrapper, tooltip, dot, player) {
    tooltip.innerHTML = '';
    tooltip.appendChild(createEl('span', { class: 'tooltip-name' }, player.name));
    const metaText = `${player.displayYears} SYOP years · ${player.bucketCount} players (${player.bucketShare.toFixed(1)}%)`;
    tooltip.appendChild(createEl('span', { class: 'tooltip-meta' }, metaText));
    tooltip.removeAttribute('hidden');

    const wrapperRect = wrapper.getBoundingClientRect();
    const dotRect = dot.getBoundingClientRect();
    const left = dotRect.left + dotRect.width / 2 - wrapperRect.left;
    const top = dotRect.top - wrapperRect.top - 8;
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
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
      y: cy - 40,
      fill: gauge.color,
      'font-size': '30',
      'font-weight': '800',
      'text-anchor': 'middle',
      'paint-order': 'stroke',
      stroke: 'rgba(11, 14, 22, 0.72)',
      'stroke-width': '0.6'
    }, document.createTextNode(gauge.value.toFixed(2)));
    svg.appendChild(valueText);

    svg.appendChild(createSVG('text', {
      x: cx,
      y: cy - 16,
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
    const isCompact = width < 560;
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

    const dotRadius = isCompact ? 3.6 : 4.4;
    const labelEntries = [];
    const roundLabelGroups = rounds.map(() => []);

    DRAFT_SERIES.forEach((series) => {
      const points = DRAFT_POSITIONAL.map((row, index) => ({
        x: index * stepX,
        y: chartHeight - (row[series.key] / 100) * chartHeight,
        value: row[series.key],
        roundIndex: index
      }));

      const path = createSVG('path', {
        d: catmullRomPath(points),
        fill: 'none',
        stroke: series.color,
        'stroke-width': '3',
        'stroke-linecap': 'round'
      });
      g.appendChild(path);

      const offsetConfig = SERIES_LABEL_OFFSETS[series.key] || null;
      const labelAnchor = offsetConfig?.anchor || 'middle';
      const offsetX = offsetConfig?.dx || 0;

      points.forEach((point) => {
        g.appendChild(createSVG('circle', {
          cx: point.x,
          cy: point.y,
          r: String(dotRadius),
          fill: colors.bg,
          stroke: series.color,
          'stroke-width': '2'
        }));

        const entry = {
          series,
          point,
          offsetX,
          anchor: labelAnchor,
          text: `${point.value}%`,
          value: point.value,
          offsetY: 0
        };

        labelEntries.push(entry);
        roundLabelGroups[point.roundIndex].push(entry);
      });
    });

    const labelFontSize = isCompact ? 9.5 : 10.5;
    const labelPadding = { x: 5, y: 3 };
    const labelHeight = labelFontSize + 2 * labelPadding.y;
    const verticalGap = 4;

    roundLabelGroups.forEach(entries => {
      if (entries.length < 2) return;

      const sorted = entries.slice().sort((a, b) => a.point.y - b.point.y);
      const clusters = [];
      if (sorted.length > 0) {
        let currentCluster = [sorted[0]];
        clusters.push(currentCluster);

        for (let i = 1; i < sorted.length; i++) {
          if (sorted[i].point.y - sorted[i - 1].point.y < labelHeight * 1.25) {
            currentCluster.push(sorted[i]);
          } else {
            currentCluster = [sorted[i]];
            clusters.push(currentCluster);
          }
        }
      }

      clusters.forEach(cluster => {
        if (cluster.length < 2) return;

        const clusterMidY = cluster.reduce((sum, e) => sum + e.point.y, 0) / cluster.length;
        const totalHeight = cluster.length * labelHeight + (cluster.length - 1) * verticalGap;
        let startY = clusterMidY - totalHeight / 2;

        cluster.forEach(entry => {
          entry.finalY = startY + labelHeight / 2;
          startY += labelHeight + verticalGap;
          entry.offsetY = entry.finalY - entry.point.y;
        });
      });
    });

    labelEntries.forEach(entry => {
      const textWidth = entry.text.length * labelFontSize * 0.58 + 4;
      const rectWidth = textWidth + 2 * labelPadding.x;
      const rectHeight = labelHeight;
      const yPos = entry.point.y + (entry.offsetY || 0);

      const labelGroup = createSVG('g', {
        transform: `translate(${entry.point.x}, ${yPos})`,
        class: 'draft-label-chip'
      });

      labelGroup.appendChild(createSVG('rect', {
        x: -rectWidth / 2,
        y: -rectHeight / 2,
        width: rectWidth,
        height: rectHeight,
        rx: 5,
        ry: 5,
        fill: hexToRgba(colors.bg, 0.4),
        stroke: hexToRgba(entry.series.color, 0.55),
        'stroke-width': '1.5'
      }));

      labelGroup.appendChild(createSVG('text', {
        x: 0,
        y: 0,
        fill: entry.series.color,
        'font-size': `${labelFontSize}px`,
        'font-weight': '700',
        'text-anchor': 'middle',
        'dominant-baseline': 'central',
        'paint-order': 'stroke',
        stroke: 'rgba(11, 14, 22, 0.85)',
        'stroke-width': '2.5',
        'stroke-linecap': 'round'
      }, document.createTextNode(entry.text)));
      g.appendChild(labelGroup);
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
