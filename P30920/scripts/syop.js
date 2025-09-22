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
    { key: 'QB %', label: 'QB %', color: colors.qb },
    { key: 'RB %', label: 'RB %', color: colors.rb },
    { key: 'WR %', label: 'WR %', color: colors.wr },
    { key: 'TE %', label: 'TE %', color: colors.te }
  ];

  const POSITION_META = [
    { key: 'QB', label: 'Quarterbacks', short: 'QB', color: colors.qb },
    { key: 'RB', label: 'Running Backs', short: 'RB', color: colors.rb },
    { key: 'WR', label: 'Wide Receivers', short: 'WR', color: colors.wr },
    { key: 'TE', label: 'Tight Ends', short: 'TE', color: colors.te }
  ];

  const DISTRIBUTION_RANGE = { min: 0, max: 12 };

  let syopDistributionMode = 'chart';
  let syopDistributionActive = new Set(POSITION_META.map((meta) => meta.key));

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

  function bucketToValue(bucket) {
    if (!bucket) return 0;
    if (bucket.includes('+')) {
      const base = parseFloat(bucket.replace('+', ''));
      return Number.isFinite(base) ? base + 0.5 : 0;
    }
    const numeric = Number(bucket);
    return Number.isFinite(numeric) ? numeric : 0;
  }

  function buildBucketsForPosition(positionKey) {
    const seriesKey = `${positionKey} %`;
    return SYOP_DATA.map((row) => ({
      bucket: row.SYOP,
      value: row[seriesKey] || 0,
      numeric: bucketToValue(row.SYOP)
    }));
  }

  function quantileFromBuckets(buckets, q) {
    if (!Array.isArray(buckets) || buckets.length === 0) return 0;
    const total = buckets.reduce((sum, bucket) => sum + bucket.value, 0);
    if (total <= 0) return 0;
    const target = q * total;
    let cumulative = 0;
    for (let i = 0; i < buckets.length; i++) {
      const bucket = buckets[i];
      const next = cumulative + bucket.value;
      if (target <= next || i === buckets.length - 1) {
        return bucket.numeric;
      }
      cumulative = next;
    }
    return buckets[buckets.length - 1].numeric;
  }

  function shareAtLeastYears(buckets, threshold) {
    return buckets
      .filter((bucket) => bucket.numeric >= threshold)
      .reduce((sum, bucket) => sum + bucket.value, 0);
  }

  function computeDensityFromBuckets(buckets) {
    const min = DISTRIBUTION_RANGE.min;
    const max = DISTRIBUTION_RANGE.max;
    const steps = 80;
    const bandwidth = 0.6;
    const total = buckets.reduce((sum, bucket) => sum + bucket.value, 0) || 1;
    const points = [];

    for (let i = 0; i <= steps; i++) {
      const x = min + ((max - min) * i) / steps;
      let sum = 0;
      buckets.forEach((bucket) => {
        const diff = x - bucket.numeric;
        const weight = bucket.value / total;
        const density = Math.exp(-0.5 * (diff / bandwidth) ** 2);
        sum += weight * density;
      });
      points.push({ x, value: sum });
    }

    const maxDensity = points.reduce((maxValue, point) => Math.max(maxValue, point.value), 0) || 1;
    return points.map((point) => ({
      x: point.x,
      value: maxDensity > 0 ? point.value / maxDensity : 0
    }));
  }

  function generateSyntheticPlayers(buckets, meta) {
    const totalPercent = buckets.reduce((sum, bucket) => sum + bucket.value, 0) || 1;
    const baseCount = 100;
    const raw = buckets.map((bucket) => (bucket.value / totalPercent) * baseCount);
    const counts = raw.map((value, index) => {
      const floored = Math.floor(value);
      if (floored <= 0 && value > 0) return 1;
      return floored;
    });

    let allocated = counts.reduce((sum, count) => sum + count, 0);
    const target = baseCount;

    if (allocated < target) {
      const remainders = raw
        .map((value, index) => ({ index, remainder: value - Math.floor(value) }))
        .sort((a, b) => b.remainder - a.remainder);
      let needed = target - allocated;
      let pointer = 0;
      while (needed > 0 && remainders.length > 0) {
        const { index } = remainders[pointer % remainders.length];
        counts[index] += 1;
        needed -= 1;
        pointer += 1;
      }
      allocated = counts.reduce((sum, count) => sum + count, 0);
    }

    if (allocated > target) {
      const remainders = raw
        .map((value, index) => ({ index, remainder: value - Math.floor(value) }))
        .sort((a, b) => a.remainder - b.remainder);
      let excess = allocated - target;
      let pointer = 0;
      while (excess > 0 && remainders.length > 0) {
        const { index } = remainders[pointer % remainders.length];
        if (counts[index] > 1) {
          counts[index] -= 1;
          excess -= 1;
        }
        pointer += 1;
        if (pointer > remainders.length * 4) {
          break;
        }
      }
    }

    const players = [];
    counts.forEach((count, bucketIndex) => {
      const bucket = buckets[bucketIndex];
      const sharePerPlayer = count > 0 ? bucket.value / count : 0;
      for (let i = 0; i < count; i++) {
        const sequence = players.length + 1;
        players.push({
          id: `${meta.key}-${sequence}`,
          name: `${meta.short} Player ${String(sequence).padStart(2, '0')}`,
          years: bucket.numeric,
          bucketLabel: bucket.bucket,
          share: sharePerPlayer,
          position: meta.key
        });
      }
    });

    return players;
  }

  function formatYearsLabel(bucketLabel) {
    if (!bucketLabel) return '0';
    if (bucketLabel.includes('+')) return `${bucketLabel} years`;
    if (bucketLabel === '1') return '1 year';
    return `${bucketLabel} years`;
  }

  function formatPercent(value) {
    return `${value.toFixed(1)}%`;
  }

  const SYOP_DISTRIBUTIONS = new Map(POSITION_META.map((meta) => {
    const buckets = buildBucketsForPosition(meta.key);
    const density = computeDensityFromBuckets(buckets);
    const players = generateSyntheticPlayers(buckets, meta);
    const totalPercent = buckets.reduce((sum, bucket) => sum + bucket.value, 0);
    const median = quantileFromBuckets(buckets, 0.5);
    const q1 = quantileFromBuckets(buckets, 0.25);
    const q3 = quantileFromBuckets(buckets, 0.75);
    const shareTwoPlus = shareAtLeastYears(buckets, 2);

    return [meta.key, {
      meta,
      buckets,
      density,
      players,
      summary: {
        totalPercent,
        shareTwoPlus,
        median,
        q1,
        q3
      }
    }];
  }));

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

  function renderSyopDistribution() {
    const container = document.getElementById('syop-bar-chart');
    if (!container) return;

    const activeMetas = POSITION_META.filter((meta) => syopDistributionActive.has(meta.key));
    container.innerHTML = '';

    const header = createEl('div', { class: 'syop-distribution-header' });

    const legend = createEl('div', {
      class: 'syop-distribution-legend',
      role: 'group',
      'aria-label': 'Filter positions'
    });

    POSITION_META.forEach((meta) => {
      const isActive = syopDistributionActive.has(meta.key);
      const button = createEl('button', {
        type: 'button',
        class: `syop-legend-button${isActive ? ' active' : ''}`,
        style: { '--legend-color': meta.color },
        'aria-pressed': String(isActive),
        'data-position': meta.key
      }, meta.short);

      button.addEventListener('click', () => {
        const next = new Set(syopDistributionActive);
        if (next.has(meta.key)) {
          next.delete(meta.key);
        } else {
          next.add(meta.key);
        }
        if (next.size === 0) {
          return;
        }
        syopDistributionActive = next;
        renderSyopDistribution();
      });

      legend.appendChild(button);
    });

    const viewToggle = createEl('button', {
      type: 'button',
      class: 'syop-view-toggle',
      'aria-pressed': String(syopDistributionMode === 'table')
    }, syopDistributionMode === 'table' ? 'View chart' : 'View as table');

    viewToggle.addEventListener('click', () => {
      syopDistributionMode = syopDistributionMode === 'table' ? 'chart' : 'table';
      renderSyopDistribution();
    });

    header.appendChild(legend);
    header.appendChild(viewToggle);
    container.appendChild(header);

    if (syopDistributionMode === 'table') {
      renderDistributionTable(container, activeMetas);
      return;
    }

    renderDistributionPanels(container, activeMetas);
  }

  function renderDistributionPanels(container, activeMetas) {
    if (activeMetas.length === 0) {
      container.appendChild(createEl('p', { class: 'syop-empty-state' }, 'Select at least one position to view the distribution.'));
      return;
    }

    const grid = createEl('div', { class: 'syop-violin-grid' });
    container.appendChild(grid);

    const tooltip = createEl('div', {
      class: 'syop-swarm-tooltip',
      role: 'status',
      'aria-hidden': 'true'
    });
    container.appendChild(tooltip);

    const panels = activeMetas.map((meta) => {
      const data = SYOP_DISTRIBUTIONS.get(meta.key);
      const panel = createEl('section', {
        class: 'syop-violin-panel',
        'data-position': meta.key
      });

      const panelHeader = createEl('header', { class: 'syop-violin-panel-header' },
        createEl('h4', null, meta.label),
        createEl('span', {
          class: 'syop-summary-chip',
          style: { '--chip-accent': meta.color }
        }, `≥2 SYOP: ${formatPercent(data.summary.shareTwoPlus)}`)
      );

      const description = createEl('p', { class: 'syop-violin-meta' },
        `Median ${data.summary.median.toFixed(1)} yrs · IQR ${data.summary.q1.toFixed(1)} – ${data.summary.q3.toFixed(1)} yrs`
      );

      const chartWrapper = createEl('div', {
        class: 'syop-violin-chart',
        role: 'img',
        'aria-label': `${meta.label} SYOP distribution`
      });

      panel.appendChild(panelHeader);
      panel.appendChild(description);
      panel.appendChild(chartWrapper);
      grid.appendChild(panel);

      return { meta, data, chartWrapper, panel };
    });

    panels.forEach((entry) => {
      renderDistributionChart(entry, tooltip);
    });
  }

  function renderDistributionTable(container, activeMetas) {
    const tableWrapper = createEl('div', { class: 'syop-table-wrapper' });
    const table = createEl('table', { class: 'syop-table' });
    const caption = createEl('caption', null, 'SYOP positional distribution (share of players per bucket)');
    table.appendChild(caption);

    const thead = createEl('thead');
    const headerRow = createEl('tr');
    headerRow.appendChild(createEl('th', { scope: 'col' }, 'SYOP bucket'));
    activeMetas.forEach((meta) => {
      headerRow.appendChild(createEl('th', { scope: 'col' }, meta.short));
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = createEl('tbody');
    SYOP_DATA.forEach((row) => {
      const tr = createEl('tr');
      tr.appendChild(createEl('th', { scope: 'row' }, row.SYOP));
      activeMetas.forEach((meta) => {
        const buckets = SYOP_DISTRIBUTIONS.get(meta.key)?.buckets || [];
        const bucket = buckets.find((item) => item.bucket === row.SYOP);
        tr.appendChild(createEl('td', null, bucket ? formatPercent(bucket.value) : '—'));
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    const tfoot = createEl('tfoot');
    const summaryRow = createEl('tr', { class: 'syop-table-summary' });
    summaryRow.appendChild(createEl('th', { scope: 'row' }, '≥2 SYOP share'));
    activeMetas.forEach((meta) => {
      const data = SYOP_DISTRIBUTIONS.get(meta.key);
      summaryRow.appendChild(createEl('td', null, data ? formatPercent(data.summary.shareTwoPlus) : '—'));
    });
    tfoot.appendChild(summaryRow);
    table.appendChild(tfoot);

    tableWrapper.appendChild(table);
    container.appendChild(tableWrapper);
  }

  function renderDistributionChart(entry, tooltip) {
    const { meta, data, chartWrapper } = entry;
    const bounds = chartWrapper.getBoundingClientRect();
    const fallbackWidth = 320;
    const width = Math.max(260, Math.round(bounds.width || fallbackWidth));
    const height = width < 320 ? 220 : 260;
    const margin = width < 320
      ? { top: 28, right: 18, bottom: 38, left: 18 }
      : { top: 32, right: 24, bottom: 42, left: 24 };

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    const centerY = margin.top + chartHeight / 2;
    const amplitude = Math.max(24, chartHeight / 2 - 16);
    const dotRadius = width < 280 ? 4.2 : width < 360 ? 5 : 6.2;

    const scaleX = (value) => {
      const domain = DISTRIBUTION_RANGE.max - DISTRIBUTION_RANGE.min;
      if (domain <= 0) return margin.left;
      const clamped = Math.min(DISTRIBUTION_RANGE.max, Math.max(DISTRIBUTION_RANGE.min, value));
      return margin.left + ((clamped - DISTRIBUTION_RANGE.min) / domain) * chartWidth;
    };

    chartWrapper.innerHTML = '';
    chartWrapper.style.height = `${height}px`;

    const svg = createSVG('svg', {
      class: 'syop-violin-svg',
      viewBox: `0 0 ${width} ${height}`,
      width: String(width),
      height: String(height),
      focusable: 'false',
      'aria-hidden': 'true'
    });

    const defs = createSVG('defs');
    const gradient = createSVG('linearGradient', {
      id: `violin-gradient-${meta.key}`,
      x1: '0',
      x2: '0',
      y1: '0',
      y2: '1'
    });
    gradient.appendChild(createSVG('stop', { offset: '0%', 'stop-color': hexToRgba(meta.color, 0.75) }));
    gradient.appendChild(createSVG('stop', { offset: '100%', 'stop-color': hexToRgba(meta.color, 0.2) }));
    defs.appendChild(gradient);
    svg.appendChild(defs);

    const group = createSVG('g');
    svg.appendChild(group);

    const railsStart = Math.ceil(DISTRIBUTION_RANGE.min);
    const railsEnd = Math.floor(DISTRIBUTION_RANGE.max);
    for (let year = railsStart; year <= railsEnd; year++) {
      const x = scaleX(year);
      group.appendChild(createSVG('line', {
        x1: x,
        x2: x,
        y1: margin.top - 4,
        y2: margin.top + chartHeight + 6,
        stroke: year === 0 ? 'rgba(255,255,255,0.32)' : colors.grid,
        'stroke-dasharray': year % 2 === 0 ? '2 4' : '1 6'
      }));

      if (year % 2 === 0 || year <= 4) {
        group.appendChild(createSVG('text', {
          x,
          y: height - 12,
          fill: colors.subtext,
          'font-size': '11',
          'text-anchor': 'middle'
        }, year >= 12 ? '12+' : String(year)));
      }
    }

    group.appendChild(createSVG('line', {
      x1: margin.left,
      x2: margin.left + chartWidth,
      y1: centerY,
      y2: centerY,
      stroke: 'rgba(148, 163, 255, 0.25)',
      'stroke-dasharray': '4 6'
    }));

    const q1x = scaleX(data.summary.q1);
    const q3x = scaleX(data.summary.q3);
    group.appendChild(createSVG('rect', {
      x: Math.min(q1x, q3x),
      y: centerY - amplitude - 6,
      width: Math.max(6, Math.abs(q3x - q1x)),
      height: (amplitude + 6) * 2,
      fill: hexToRgba(meta.color, 0.16),
      rx: 10,
      ry: 10
    }));

    const densityPath = describeDensityPath(data.density, scaleX, centerY, amplitude);
    if (densityPath) {
      group.appendChild(createSVG('path', {
        d: densityPath,
        fill: `url(#violin-gradient-${meta.key})`,
        stroke: hexToRgba(meta.color, 0.85),
        'stroke-width': '1.4',
        opacity: '0.95'
      }));
    }

    const medianX = scaleX(data.summary.median);
    group.appendChild(createSVG('line', {
      x1: medianX,
      x2: medianX,
      y1: centerY - amplitude - 8,
      y2: centerY + amplitude + 8,
      stroke: meta.color,
      'stroke-width': '2.2'
    }));

    group.appendChild(createSVG('path', {
      d: describeMedianDiamond(medianX, centerY, 8),
      fill: colors.bg,
      stroke: meta.color,
      'stroke-width': '2'
    }));

    group.appendChild(createSVG('text', {
      x: margin.left + chartWidth / 2,
      y: height - 2,
      fill: colors.subtext,
      'font-size': '11',
      'font-weight': '600',
      'text-anchor': 'middle'
    }, 'SYOP years'));

    chartWrapper.appendChild(svg);

    const swarmLayer = createEl('div', { class: 'syop-swarm-layer' });
    swarmLayer.style.height = `${height}px`;
    chartWrapper.appendChild(swarmLayer);

    const swarmPoints = layoutSwarmPoints(data.players, scaleX, centerY, dotRadius);
    swarmPoints.forEach((point) => {
      const shareValue = point.player.share;
      const shareText = shareValue >= 1 ? shareValue.toFixed(1) : shareValue.toFixed(2);
      const dot = createEl('button', {
        type: 'button',
        class: 'syop-swarm-dot',
        style: {
          left: `${point.x - dotRadius}px`,
          top: `${point.y - dotRadius}px`,
          width: `${dotRadius * 2}px`,
          height: `${dotRadius * 2}px`
        },
        'data-player-id': point.player.id,
        'aria-label': `${point.player.name} — ${formatYearsLabel(point.player.bucketLabel)} (≈ ${shareText}% of ${meta.short})`
      });
      dot.style.setProperty('--dot-color', meta.color);
      swarmLayer.appendChild(dot);

      dot.addEventListener('mouseenter', () => showSwarmTooltip(tooltip, dot, meta, point.player));
      dot.addEventListener('mouseleave', () => hideSwarmTooltip(tooltip));
      dot.addEventListener('focus', () => showSwarmTooltip(tooltip, dot, meta, point.player));
      dot.addEventListener('blur', () => hideSwarmTooltip(tooltip));
    });
  }

  function describeDensityPath(points, scaleX, centerY, amplitude) {
    if (!points || points.length === 0) return '';
    const upper = points.map((point) => `${scaleX(point.x)} ${centerY - point.value * amplitude}`);
    const lower = points
      .slice()
      .reverse()
      .map((point) => `${scaleX(point.x)} ${centerY + point.value * amplitude}`);
    if (upper.length === 0 || lower.length === 0) return '';
    return `M ${upper[0]} L ${upper.slice(1).join(' L ')} L ${lower.join(' L ')} Z`;
  }

  function describeMedianDiamond(cx, cy, size) {
    const half = size / 2;
    return `M ${cx} ${cy - half} L ${cx + half} ${cy} L ${cx} ${cy + half} L ${cx - half} ${cy} Z`;
  }

  function layoutSwarmPoints(players, scaleX, centerY, radius) {
    const placed = [];
    const verticalStep = radius * 1.9;
    const jitter = radius * 0.85;
    const minX = scaleX(DISTRIBUTION_RANGE.min);
    const maxX = scaleX(DISTRIBUTION_RANGE.max);
    return players.map((player) => {
      const hash = hashString(player.id);
      const offset = ((hash % 1000) / 999 - 0.5) * jitter;
      const baseX = scaleX(player.years);
      const x = Math.min(maxX, Math.max(minX, baseX + offset));
      let level = 0;
      let direction = 1;
      let y = centerY;
      let attempts = 0;

      while (placed.some((other) => Math.hypot(other.x - x, other.y - y) < radius * 2.05)) {
        level += 1;
        direction *= -1;
        y = centerY + direction * level * verticalStep;
        attempts += 1;
        if (attempts > 80) {
          break;
        }
      }

      const point = { player, x, y };
      placed.push(point);
      return point;
    });
  }

  function hashString(input) {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash = (hash << 5) - hash + input.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  function showSwarmTooltip(tooltip, dot, meta, player) {
    if (!tooltip || !tooltip.parentElement) return;
    const host = tooltip.parentElement;
    const parent = dot.parentElement;
    if (parent) {
      parent.querySelectorAll('.syop-swarm-dot.is-active').forEach((activeDot) => {
        activeDot.classList.remove('is-active');
      });
    }
    dot.classList.add('is-active');

    tooltip.innerHTML = '';
    const shareText = player.share >= 1 ? player.share.toFixed(1) : player.share.toFixed(2);
    tooltip.appendChild(createEl('div', { class: 'syop-tooltip-name' }, player.name));
    tooltip.appendChild(createEl('div', { class: 'syop-tooltip-years' }, formatYearsLabel(player.bucketLabel)));
    tooltip.appendChild(createEl('div', { class: 'syop-tooltip-share' }, `≈ ${shareText}% of ${meta.short}`));

    tooltip.classList.add('visible');
    tooltip.setAttribute('aria-hidden', 'false');
    tooltip.dataset.activeId = player.id;

    const hostRect = host.getBoundingClientRect();
    const dotRect = dot.getBoundingClientRect();
    tooltip.style.left = '0px';
    tooltip.style.top = '0px';

    const tooltipRect = tooltip.getBoundingClientRect();
    const desiredLeft = dotRect.left - hostRect.left - tooltipRect.width / 2 + dotRect.width / 2;
    const maxLeft = hostRect.width - tooltipRect.width - 8;
    const left = Math.max(8, Math.min(desiredLeft, maxLeft));
    let top = dotRect.top - hostRect.top - tooltipRect.height - 12;
    if (top < 8) {
      top = dotRect.top - hostRect.top + dotRect.height + 12;
    }

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  }

  function hideSwarmTooltip(tooltip) {
    if (!tooltip || !tooltip.parentElement) return;
    const host = tooltip.parentElement;
    host.querySelectorAll('.syop-swarm-dot.is-active').forEach((activeDot) => {
      activeDot.classList.remove('is-active');
    });
    tooltip.classList.remove('visible');
    tooltip.setAttribute('aria-hidden', 'true');
    tooltip.removeAttribute('data-active-id');
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
      renderSyopDistribution();
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
          renderSyopDistribution();
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
    renderSyopDistribution();
    renderGauges();
    renderDraftOverall();
    renderDraftPositional();
    window.addEventListener('resize', handleResize);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
