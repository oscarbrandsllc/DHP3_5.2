(function () {
  'use strict';

  const page = document.body?.dataset?.page;
  if (page !== 'syop') {
    return;
  }

  const syopColors = {
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
      'BOM <br>(3)',
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
      'TE ',
    ],
    values: [
      51.6, 16.46, 9.8, 12.82, 12.5, 6.5, 2.49, 5.35, 2.1, 3.31, 2.5, 1.89, 2.1, 4.92, 2.84, 3, 2, 4.01, 3.49, 2, 3,
    ],
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
    { SYOP: '12+', 'QB %': 20.0, 'RB %': 0.4, 'WR %': 2.2, 'TE %': 3.85 },
  ];

  const GAUGES = [
    { key: 'TE', value: 4.0, color: syopColors.te },
    { key: 'RB', value: 3.39, color: syopColors.rb },
    { key: 'WR', value: 4.9, color: syopColors.wr },
    { key: 'QB', value: 7.22, color: syopColors.qb },
  ];

  const DRAFT_OVERALL = [
    { round: '1', hit: 78.4 },
    { round: '2', hit: 47.7 },
    { round: '3', hit: 38.5 },
    { round: '4', hit: 18.0 },
    { round: '5', hit: 15.0 },
    { round: '6', hit: 14.1 },
    { round: '7', hit: 9.4 },
  ];

  const DRAFT_POSITIONAL = [
    { round: '1', QB: 78, RB: 83, TE: 78, WR: 76 },
    { round: '2', QB: 42, RB: 50, TE: 40, WR: 51 },
    { round: '3', QB: 31, RB: 62, TE: 36, WR: 30 },
    { round: '4', QB: 20, RB: 27, TE: 23, WR: 9 },
    { round: '5', QB: 7, RB: 27, TE: 9, WR: 13 },
    { round: '6', QB: 11, RB: 18, TE: 8, WR: 15 },
    { round: '7', QB: 13, RB: 9, TE: 4, WR: 11 },
  ];

  const draftColors = {
    QB: '#FF41E1',
    RB: '#20F7A7',
    TE: '#9E5AF7',
    WR: '#46E7FF',
    grid: 'rgba(148,163,184,0.14)',
    text: '#E2E8F0',
  };

  const seriesOrder = [
    { key: 'QB %', label: 'QB %', color: syopColors.qb },
    { key: 'RB %', label: 'RB %', color: syopColors.rb },
    { key: 'WR %', label: 'WR %', color: syopColors.wr },
    { key: 'TE %', label: 'TE %', color: syopColors.te },
  ];

  const syopChartState = {
    filters: {
      'QB %': true,
      'RB %': true,
      'WR %': true,
      'TE %': true,
    },
    stacked: false,
  };

  const svgNS = 'http://www.w3.org/2000/svg';

  function createSvgElement(name, attrs) {
    const el = document.createElementNS(svgNS, name);
    if (attrs) {
      Object.entries(attrs).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          el.setAttribute(key, String(value));
        }
      });
    }
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

  function buildSunburstTree() {
    const nodes = SUNBURST.labels.map((label, i) => ({
      label,
      parent: SUNBURST.parents[i],
      value: SUNBURST.values[i],
    }));
    const rootLabel = SUNBURST.labels[0];
    const children = (parent) => nodes.filter((n) => n.parent === parent);
    const ring1 = children(rootLabel);
    const byParent = {};
    ring1.forEach((node) => {
      byParent[node.label] = children(node.label);
    });
    return { ring1, byParent, rootLabel };
  }

  function polar(cx, cy, r, angle) {
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  }

  function arcPath(cx, cy, innerR, outerR, a0, a1) {
    const p0 = polar(cx, cy, outerR, a0);
    const p1 = polar(cx, cy, outerR, a1);
    const p2 = polar(cx, cy, innerR, a1);
    const p3 = polar(cx, cy, innerR, a0);
    const largeArc = a1 - a0 > Math.PI ? 1 : 0;
    return `M ${p0.x} ${p0.y} A ${outerR} ${outerR} 0 ${largeArc} 1 ${p1.x} ${p1.y} L ${p2.x} ${p2.y} A ${innerR} ${innerR} 0 ${largeArc} 0 ${p3.x} ${p3.y} Z`;
  }

  function seriesFromLabel(label) {
    if (!label) return '';
    const trimmed = stripTags(label).trim().toUpperCase();
    if (trimmed.startsWith('QB')) return 'QB';
    if (trimmed.startsWith('RB')) return 'RB';
    if (trimmed.startsWith('WR')) return 'WR';
    if (trimmed.startsWith('TE')) return 'TE';
    return '';
  }

  function seriesColor(series) {
    switch (series) {
      case 'QB':
        return syopColors.qb;
      case 'RB':
        return syopColors.rb;
      case 'WR':
        return syopColors.wr;
      case 'TE':
        return syopColors.te;
      default:
        return syopColors.muted;
    }
  }

  function renderSunburst() {
    const container = document.getElementById('syop-sunburst');
    if (!container) return;
    container.innerHTML = '';

    const size = 520;
    const padding = 72;
    const svg = createSvgElement('svg', {
      viewBox: `${-padding} ${-padding} ${size + padding * 2} ${size + padding * 2}`,
      role: 'presentation',
      focusable: 'false',
    });

    const { ring1, byParent, rootLabel } = buildSunburstTree();
    const cx = size / 2;
    const cy = size / 2;
    const ring1Inner = 96;
    const ring1Outer = 172;
    const ring2Inner = 184;
    const ring2Outer = 268;
    const startAngle = -Math.PI / 2;

    const totalRing1 = ring1.reduce((sum, node) => sum + node.value, 0) || 1;
    let cursor = startAngle;
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
        ring2Segments.push({
          parent: segment,
          child,
          a0: childCursor,
          a1: childCursor + span,
        });
        childCursor += span;
      });
    });

    ring1Segments.forEach((segment) => {
      const series = seriesFromLabel(segment.node.label);
      const path = createSvgElement('path', {
        d: arcPath(cx, cy, ring1Inner, ring1Outer, segment.a0, segment.a1),
        fill: seriesColor(series),
        opacity: '0.9',
        stroke: syopColors.bg,
        'stroke-width': '1',
      });
      svg.appendChild(path);

      const midpoint = (segment.a0 + segment.a1) / 2;
      const labelPoint = polar(cx, cy, (ring1Inner + ring1Outer) / 2, midpoint);
      const text = createSvgElement('text', {
        x: labelPoint.x,
        y: labelPoint.y,
        fill: syopColors.text,
        'font-size': '14',
        'font-weight': '800',
        'text-anchor': 'middle',
        'dominant-baseline': 'middle',
      });
      text.textContent = stripTags(segment.node.label);
      svg.appendChild(text);
    });

    ring2Segments.forEach((segment, idx) => {
      const series = seriesFromLabel(segment.parent.node.label);
      const path = createSvgElement('path', {
        d: arcPath(cx, cy, ring2Inner, ring2Outer, segment.a0, segment.a1),
        fill: seriesColor(series),
        opacity: '0.85',
        stroke: syopColors.bg,
        'stroke-width': '1.2',
      });
      svg.appendChild(path);

      const midpoint = (segment.a0 + segment.a1) / 2;
      const labelRadius = (ring2Inner + ring2Outer) / 2;
      const labelPoint = polar(cx, cy, labelRadius, midpoint);
      const { main, paren } = splitLabelValue(segment.child.label);
      const textGroup = createSvgElement('text', {
        x: labelPoint.x,
        y: labelPoint.y - 2,
        fill: syopColors.text,
        'text-anchor': 'middle',
        'dominant-baseline': 'middle',
      });
      const mainLine = createSvgElement('tspan', {
        'font-size': '14',
        'font-weight': '800',
      });
      mainLine.textContent = main;
      textGroup.appendChild(mainLine);
      if (paren) {
        const valueLine = createSvgElement('tspan', {
          x: labelPoint.x,
          dy: '14',
          'font-size': '12',
          fill: syopColors.subtext,
          'font-weight': '700',
        });
        valueLine.textContent = `(${paren})`;
        textGroup.appendChild(valueLine);
      }
      svg.appendChild(textGroup);
    });

    const centerCircle = createSvgElement('circle', {
      cx,
      cy,
      r: '74',
      fill: '#1E2235',
      stroke: syopColors.bg,
    });
    svg.appendChild(centerCircle);

    const centerLineOne = createSvgElement('text', {
      x: cx,
      y: cy - 6,
      fill: syopColors.text,
      'font-size': '15',
      'font-weight': '900',
      'text-anchor': 'middle',
      'dominant-baseline': 'middle',
    });
    centerLineOne.textContent = 'Mean | Λ';
    svg.appendChild(centerLineOne);

    const centerLineTwo = createSvgElement('text', {
      x: cx,
      y: cy + 14,
      fill: syopColors.text,
      'font-size': '15',
      'font-weight': '900',
      'text-anchor': 'middle',
      'dominant-baseline': 'middle',
    });
    centerLineTwo.textContent = '& Mode | M';
    svg.appendChild(centerLineTwo);

    container.appendChild(svg);
  }

  function formatPercent(value) {
    const rounded = Math.round(value * 10) / 10;
    const whole = Math.round(rounded);
    if (Math.abs(rounded - whole) < 0.05) {
      return `${whole}%`;
    }
    return `${rounded.toFixed(1)}%`;
  }

  function renderColumnChart() {
    const container = document.getElementById('syop-chart');
    if (!container) return;
    container.innerHTML = '';

    const activeSeries = seriesOrder.filter((serie) => syopChartState.filters[serie.key]);
    if (!activeSeries.length) {
      const emptyState = document.createElement('p');
      emptyState.className = 'syop-empty';
      emptyState.textContent = 'Select at least one position to display the distribution.';
      container.appendChild(emptyState);
      return;
    }

    const width = 900;
    const height = 360;
    const margin = { top: 32, right: 24, bottom: 56, left: 72 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    const svg = createSvgElement('svg', {
      viewBox: `0 0 ${width} ${height}`,
      role: 'img',
      'aria-label': 'Bar chart showing SYOP distribution by position',
    });

    const background = createSvgElement('rect', {
      x: 0,
      y: 0,
      width,
      height,
      fill: 'transparent',
      rx: 16,
    });
    svg.appendChild(background);

    const axisGroup = createSvgElement('g', { transform: `translate(${margin.left}, ${margin.top})` });
    svg.appendChild(axisGroup);

    const tickValues = [0, 5, 10, 15, 20, 25, 30];
    tickValues.forEach((tick) => {
      const y = chartHeight - (tick / 30) * chartHeight;
      const gridLine = createSvgElement('line', {
        x1: 0,
        y1: y,
        x2: chartWidth,
        y2: y,
        stroke: 'rgba(255,255,255,0.08)',
      });
      axisGroup.appendChild(gridLine);

      const label = createSvgElement('text', {
        x: -16,
        y: y + 4,
        fill: syopColors.subtext,
        'font-size': '12',
        'text-anchor': 'end',
      });
      label.textContent = `${tick}%`;
      axisGroup.appendChild(label);
    });

    const groupWidth = chartWidth / SYOP_DATA.length;
    const innerPadding = 0.25;
    const usableWidth = groupWidth * (1 - innerPadding);

    SYOP_DATA.forEach((row, rowIndex) => {
      const group = createSvgElement('g', {
        transform: `translate(${rowIndex * groupWidth + (groupWidth - usableWidth) / 2}, 0)`,
      });

      let stackedOffset = 0;
      const barWidth = syopChartState.stacked
        ? usableWidth
        : usableWidth / activeSeries.length - (activeSeries.length > 1 ? 6 : 0);
      const seriesGap = syopChartState.stacked ? 0 : 6;

      activeSeries.forEach((serie, serieIndex) => {
        const value = row[serie.key] || 0;
        const barHeight = (value / 30) * chartHeight;
        const x = syopChartState.stacked ? 0 : serieIndex * (barWidth + seriesGap);
        const y = chartHeight - barHeight - stackedOffset;

        const rect = createSvgElement('rect', {
          x,
          y,
          width: barWidth,
          height: Math.max(barHeight, 1),
          fill: serie.color,
          rx: 8,
          ry: 8,
          opacity: '0.92',
        });
        group.appendChild(rect);

        const label = createSvgElement('text', {
          x: x + barWidth / 2,
          y: y - 6,
          fill: syopColors.text,
          'font-size': '12',
          'text-anchor': 'middle',
        });
        label.textContent = formatPercent(value);
        group.appendChild(label);

        if (syopChartState.stacked) {
          stackedOffset += barHeight;
        }
      });

      const axisLabel = createSvgElement('text', {
        x: usableWidth / 2,
        y: chartHeight + 28,
        fill: syopColors.subtext,
        'font-size': '13',
        'text-anchor': 'middle',
      });
      axisLabel.textContent = `SYOP ${row.SYOP}`;
      group.appendChild(axisLabel);

      axisGroup.appendChild(group);
    });

    container.appendChild(svg);
  }

  function buildChartControls() {
    const controlsContainer = document.getElementById('syop-chart-controls');
    if (!controlsContainer) return;
    controlsContainer.innerHTML = '';

    const label = document.createElement('span');
    label.className = 'syop-control-label';
    label.textContent = 'Filter:';
    controlsContainer.appendChild(label);

    seriesOrder.forEach((serie) => {
      const control = document.createElement('label');
      control.className = 'syop-toggle';
      control.style.setProperty('--syop-swatch', serie.color);

      const input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = syopChartState.filters[serie.key];
      input.setAttribute('data-series', serie.key);
      input.addEventListener('change', () => {
        syopChartState.filters[serie.key] = input.checked;
        renderColumnChart();
      });

      const switchVisual = document.createElement('span');
      switchVisual.className = 'syop-toggle-indicator';

      const text = document.createElement('span');
      text.className = 'syop-toggle-text';
      text.textContent = serie.label;

      control.appendChild(input);
      control.appendChild(switchVisual);
      control.appendChild(text);
      controlsContainer.appendChild(control);
    });

    const stackedLabel = document.createElement('label');
    stackedLabel.className = 'syop-toggle syop-toggle-stack';
    stackedLabel.style.setProperty('--syop-swatch', syopColors.muted);

    const stackedInput = document.createElement('input');
    stackedInput.type = 'checkbox';
    stackedInput.checked = syopChartState.stacked;
    stackedInput.addEventListener('change', () => {
      syopChartState.stacked = stackedInput.checked;
      renderColumnChart();
    });

    const stackedSwitch = document.createElement('span');
    stackedSwitch.className = 'syop-toggle-indicator';

    const stackedText = document.createElement('span');
    stackedText.className = 'syop-toggle-text';
    stackedText.textContent = 'Stacked';

    stackedLabel.appendChild(stackedInput);
    stackedLabel.appendChild(stackedSwitch);
    stackedLabel.appendChild(stackedText);
    controlsContainer.appendChild(stackedLabel);
  }

  function renderGauges() {
    const container = document.getElementById('syop-gauges');
    if (!container) return;
    container.innerHTML = '';

    GAUGES.forEach((gauge) => {
      const gaugeCard = document.createElement('div');
      gaugeCard.className = 'syop-gauge-card';

      const svg = createSvgElement('svg', {
        viewBox: '0 0 320 180',
        role: 'img',
        'aria-label': `${gauge.key} gauge showing ${gauge.value.toFixed(2)} years`,
      });

      const min = 2;
      const max = 8;
      const start = -Math.PI;
      const end = 0;
      const cx = 160;
      const cy = 170;
      const radius = 130;
      const trackWidth = 16;

      const track = createSvgElement('path', {
        d: describeArc(cx, cy, radius, start, end),
        stroke: '#1f2437',
        'stroke-width': trackWidth,
        fill: 'none',
        'stroke-linecap': 'round',
      });
      svg.appendChild(track);

      const clampValue = Math.max(min, Math.min(max, gauge.value));
      const valueAngle = start + ((clampValue - min) / (max - min)) * (end - start);
      const valuePath = createSvgElement('path', {
        d: describeArc(cx, cy, radius, start, valueAngle),
        stroke: gauge.color,
        'stroke-width': trackWidth,
        fill: 'none',
        'stroke-linecap': 'round',
      });
      svg.appendChild(valuePath);

      const ticks = [2, 3.5, 5, 6.5, 8];
      ticks.forEach((tick) => {
        const angle = start + ((tick - min) / (max - min)) * (end - start);
        const inner = polar(cx, cy, radius - trackWidth / 2 - 4, angle);
        const outer = polar(cx, cy, radius + trackWidth / 2 + 8, angle);
        const tickLine = createSvgElement('line', {
          x1: inner.x,
          y1: inner.y,
          x2: outer.x,
          y2: outer.y,
          stroke: 'rgba(255,255,255,0.7)',
          'stroke-width': '1.5',
        });
        svg.appendChild(tickLine);

        const tickLabel = createSvgElement('text', {
          x: outer.x,
          y: outer.y - 6,
          fill: syopColors.subtext,
          'font-size': '12',
          'text-anchor': 'middle',
        });
        tickLabel.textContent = tick;
        svg.appendChild(tickLabel);
      });

      gaugeCard.appendChild(svg);

      const caption = document.createElement('div');
      caption.className = 'syop-gauge-caption';
      caption.innerHTML = `<span>${gauge.key}</span><strong style="color:${gauge.color}">${gauge.value.toFixed(2)}</strong>`;
      gaugeCard.appendChild(caption);

      container.appendChild(gaugeCard);
    });
  }

  function describeArc(cx, cy, radius, startAngle, endAngle) {
    const startPoint = polar(cx, cy, radius, startAngle);
    const endPoint = polar(cx, cy, radius, endAngle);
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    return `M ${startPoint.x} ${startPoint.y} A ${radius} ${radius} 0 ${largeArc} 1 ${endPoint.x} ${endPoint.y}`;
  }

  function renderHighlights() {
    const list = document.getElementById('syop-highlights');
    if (!list) return;
    list.innerHTML = '';

    const peaks = {};
    seriesOrder.forEach((serie) => {
      let best = { syop: SYOP_DATA[0].SYOP, value: SYOP_DATA[0][serie.key] };
      SYOP_DATA.forEach((row) => {
        if (row[serie.key] > best.value) {
          best = { syop: row.SYOP, value: row[serie.key] };
        }
      });
      peaks[serie.key] = best;
    });

    const items = [
      {
        label: 'QB',
        color: syopColors.qb,
        text: `peaks at <strong>${peaks['QB %'].value.toFixed(2)}%</strong> in SYOP <strong>${peaks['QB %'].syop}</strong>.`,
      },
      {
        label: 'RB',
        color: syopColors.rb,
        text: `concentrates early: <strong>${peaks['RB %'].value.toFixed(2)}%</strong> in SYOP <strong>${peaks['RB %'].syop}</strong>.`,
      },
      {
        label: 'WR',
        color: syopColors.wr,
        text: `shows a dual hump (SYOP 3–7) with a top bin at <strong>${peaks['WR %'].value.toFixed(2)}%</strong>.`,
      },
      {
        label: 'TE',
        color: syopColors.te,
        text: `retains steady value and residuals even at <strong>12+</strong> years.`,
      },
    ];

    items.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = `<span style="color:${item.color}" class="syop-highlight-label">${item.label}</span> ${item.text}`;
      list.appendChild(li);
    });
  }

  function renderQaChecks() {
    const list = document.getElementById('syop-qa');
    if (!list) return;
    list.innerHTML = '';

    const tests = [];
    const gaugeKeys = GAUGES.map((g) => g.key).sort().join(',');
    const required = ['QB', 'RB', 'WR', 'TE'].sort().join(',');
    tests.push({ name: 'Gauge keys present', pass: gaugeKeys === required });
    tests.push({ name: 'Gauge values between 2 and 8', pass: GAUGES.every((g) => typeof g.value === 'number' && g.value >= 2 && g.value <= 8) });
    tests.push({
      name: 'SYOP rows cover all series',
      pass: SYOP_DATA.every((row) => seriesOrder.every((serie) => typeof row[serie.key] === 'number')),
    });
    const arraysAligned = SUNBURST.labels.length === SUNBURST.parents.length && SUNBURST.parents.length === SUNBURST.values.length;
    tests.push({ name: 'Sunburst arrays aligned', pass: arraysAligned });
    const labelSplit = splitLabelValue('SPΛ (7.2)');
    tests.push({ name: 'Sunburst label/value split', pass: labelSplit.main === 'SPΛ' && labelSplit.paren === '7.2' });
    tests.push({ name: 'Sunburst center uses Λ and M', pass: SUNBURST.labels[0].includes('Λ') && SUNBURST.labels[0].includes('M') });
    tests.push({ name: 'Arc path returns SVG path', pass: /^M\s/.test(arcPath(0, 0, 10, 20, 0, Math.PI / 2)) });
    tests.push({ name: 'Series parser recognises prefixes', pass: seriesFromLabel('WR sample') === 'WR' });

    tests.forEach((test) => {
      const li = document.createElement('li');
      li.className = test.pass ? 'syop-qa-pass' : 'syop-qa-fail';
      li.textContent = `${test.name}: ${test.pass ? 'PASS' : 'FAIL'}`;
      list.appendChild(li);
    });
  }

  function renderDraftOverall() {
    const container = document.getElementById('syop-draft-overall');
    if (!container) return;
    container.innerHTML = '';

    const width = 820;
    const height = 320;
    const margin = { top: 24, right: 24, bottom: 48, left: 72 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const svg = createSvgElement('svg', {
      viewBox: `0 0 ${width} ${height}`,
      role: 'img',
      'aria-label': 'Overall draft hit probability by round',
    });

    const gridGroup = createSvgElement('g', { transform: `translate(${margin.left}, ${margin.top})` });
    svg.appendChild(gridGroup);

    const ticks = [0, 20, 40, 60, 80, 100];
    ticks.forEach((tick) => {
      const y = chartHeight - (tick / 100) * chartHeight;
      const gridLine = createSvgElement('line', {
        x1: 0,
        y1: y,
        x2: chartWidth,
        y2: y,
        stroke: draftColors.grid,
      });
      gridGroup.appendChild(gridLine);

      const label = createSvgElement('text', {
        x: -16,
        y: y + 4,
        fill: draftColors.text,
        'font-size': '12',
        'text-anchor': 'end',
      });
      label.textContent = `${tick}%`;
      gridGroup.appendChild(label);
    });

    const groupWidth = chartWidth / DRAFT_OVERALL.length;
    const barWidth = groupWidth * 0.55;

    DRAFT_OVERALL.forEach((row, index) => {
      const value = row.hit;
      const barHeight = (value / 100) * chartHeight;
      const x = index * groupWidth + (groupWidth - barWidth) / 2;
      const y = chartHeight - barHeight;

      const bar = createSvgElement('rect', {
        x,
        y,
        width: barWidth,
        height: Math.max(barHeight, 1),
        fill: 'url(#overallGradient)',
        rx: 10,
      });
      gridGroup.appendChild(bar);

      const label = createSvgElement('text', {
        x: x + barWidth / 2,
        y: y - 6,
        fill: '#F1F5F9',
        'font-size': '13',
        'text-anchor': 'middle',
      });
      label.textContent = `${value.toFixed(1)}%`;
      gridGroup.appendChild(label);

      const axisLabel = createSvgElement('text', {
        x: x + barWidth / 2,
        y: chartHeight + 28,
        fill: draftColors.text,
        'font-size': '13',
        'text-anchor': 'middle',
      });
      axisLabel.textContent = `RD ${row.round}`;
      gridGroup.appendChild(axisLabel);
    });

    const defs = createSvgElement('defs');
    const gradient = createSvgElement('linearGradient', {
      id: 'overallGradient',
      x1: '0',
      y1: '0',
      x2: '0',
      y2: '1',
    });
    gradient.appendChild(createSvgElement('stop', { offset: '0%', 'stop-color': '#46E7FF' }));
    gradient.appendChild(createSvgElement('stop', { offset: '100%', 'stop-color': '#FF41E1' }));
    defs.appendChild(gradient);
    svg.insertBefore(defs, svg.firstChild);

    container.appendChild(svg);

    const table = document.getElementById('syop-draft-table');
    if (table) {
      table.innerHTML = '';
      DRAFT_OVERALL.forEach((row) => {
        const tile = document.createElement('div');
        tile.className = 'syop-draft-tile';
        tile.innerHTML = `<span class="syop-draft-round">${row.round}</span><span class="syop-draft-value">${row.hit.toFixed(1)}%</span>`;
        table.appendChild(tile);
      });
    }
  }

  function renderDraftLegend() {
    const legend = document.getElementById('syop-draft-legend');
    if (!legend) return;
    legend.innerHTML = '';
    ['QB', 'RB', 'TE', 'WR'].forEach((key) => {
      const item = document.createElement('li');
      item.innerHTML = `<span class="syop-legend-dot" style="background:${draftColors[key]}"></span>${key}`;
      legend.appendChild(item);
    });
  }

  function renderDraftPositional() {
    const container = document.getElementById('syop-draft-pos');
    if (!container) return;
    container.innerHTML = '';

    const width = 860;
    const height = 360;
    const margin = { top: 32, right: 32, bottom: 48, left: 72 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const svg = createSvgElement('svg', {
      viewBox: `0 0 ${width} ${height}`,
      role: 'img',
      'aria-label': 'Line chart showing positional hit rates by round',
    });

    const gridGroup = createSvgElement('g', { transform: `translate(${margin.left}, ${margin.top})` });
    svg.appendChild(gridGroup);

    const ticks = [0, 20, 40, 60, 80, 100];
    ticks.forEach((tick) => {
      const y = chartHeight - (tick / 100) * chartHeight;
      const gridLine = createSvgElement('line', {
        x1: 0,
        y1: y,
        x2: chartWidth,
        y2: y,
        stroke: draftColors.grid,
      });
      gridGroup.appendChild(gridLine);

      const label = createSvgElement('text', {
        x: -16,
        y: y + 4,
        fill: draftColors.text,
        'font-size': '12',
        'text-anchor': 'end',
      });
      label.textContent = `${tick}%`;
      gridGroup.appendChild(label);
    });

    const xStep = chartWidth / (DRAFT_POSITIONAL.length - 1);

    ['QB', 'RB', 'TE', 'WR'].forEach((key) => {
      const pathPoints = DRAFT_POSITIONAL.map((row, index) => {
        const x = index * xStep;
        const y = chartHeight - (row[key] / 100) * chartHeight;
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      }).join(' ');
      const path = createSvgElement('path', {
        d: pathPoints,
        fill: 'none',
        stroke: draftColors[key],
        'stroke-width': '4',
        'stroke-linejoin': 'round',
        'stroke-linecap': 'round',
      });
      gridGroup.appendChild(path);

      DRAFT_POSITIONAL.forEach((row, index) => {
        const x = index * xStep;
        const y = chartHeight - (row[key] / 100) * chartHeight;
        const circle = createSvgElement('circle', {
          cx: x,
          cy: y,
          r: 5,
          fill: draftColors[key],
          stroke: '#0A0F1E',
          'stroke-width': '2',
        });
        gridGroup.appendChild(circle);
      });
    });

    DRAFT_POSITIONAL.forEach((row, index) => {
      const x = index * xStep;
      const label = createSvgElement('text', {
        x,
        y: chartHeight + 28,
        fill: draftColors.text,
        'font-size': '13',
        'text-anchor': 'middle',
      });
      label.textContent = `RD ${row.round}`;
      gridGroup.appendChild(label);
    });

    container.appendChild(svg);
  }

  function init() {
    renderSunburst();
    buildChartControls();
    renderColumnChart();
    renderGauges();
    renderHighlights();
    renderQaChecks();
    renderDraftOverall();
    renderDraftLegend();
    renderDraftPositional();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
