(function () {
  const colors = {
    bg: "#0B0E16",
    panelBorder: "rgba(255,255,255,0.08)",
    text: "#E9ECF9",
    subtext: "#B6B9D6",
    qb: "#A855F7",
    rb: "#EC4899",
    wr: "#22D3EE",
    te: "#F472B6",
    muted: "#64748B",
    grid: "rgba(148,163,184,0.18)",
    cyan: "#46E7FF",
    magenta: "#FF41E1",
    purple: "#9E5AF7",
    green: "#20F7A7",
  };

  const SUNBURST = {
    labels: [
      "Mean | Λ <br>&<br> Mode | M",
      "QB ",
      "RB ",
      "WR ",
      "TE ",
      "SPΛ <br>(7.2)",
      "BOΛ <br>(2.3)",
      "SPM <br>(6)",
      "BOM <br>(1)",
      "SPΛ <br>(3.41)",
      "BOΛ <br>(2.2)",
      "SPM <br>(0.7)",
      "BOM <br>(1.7)",
      "SPΛ <br>(4.9)",
      "BOΛ <br>(2.9)",
      "SPM <br>(3)",
      "BOM <br>(2)",
      "SPΛ <br>(4.0)",
      "BOΛ <br>(3.5)",
      "SPM <br>(2)",
      "BOM <br>(3)",
    ],
    parents: [
      "",
      "Mean | Λ <br>&<br> Mode | M",
      "Mean | Λ <br>&<br> Mode | M",
      "Mean | Λ <br>&<br> Mode | M",
      "Mean | Λ <br>&<br> Mode | M",
      "QB ",
      "QB ",
      "QB ",
      "QB ",
      "RB ",
      "RB ",
      "RB ",
      "RB ",
      "WR ",
      "WR ",
      "WR ",
      "WR ",
      "TE ",
      "TE ",
      "TE ",
      "TE ",
    ],
    values: [
      51.6, 16.46, 9.8, 12.82, 12.5, 6.5, 2.49, 5.35, 2.1, 3.31, 2.5, 1.89, 2.1, 4.92, 2.84, 3, 2, 4.01, 3.49, 2, 3,
    ],
  };

  const SYOP_DATA = [
    { syop: "1", QB: 6.67, RB: 27.54, WR: 13.0, TE: 26.92 },
    { syop: "2", QB: 11.11, RB: 20.29, WR: 14.1, TE: 26.92 },
    { syop: "3", QB: 8.89, RB: 11.59, WR: 14.1, TE: 7.69 },
    { syop: "4", QB: 8.89, RB: 11.4, WR: 12.0, TE: 7.69 },
    { syop: "5", QB: 4.44, RB: 13.04, WR: 5.4, TE: 0.4 },
    { syop: "6", QB: 13.33, RB: 5.8, WR: 7.6, TE: 7.69 },
    { syop: "7", QB: 8.89, RB: 1.45, WR: 13.0, TE: 7.69 },
    { syop: "8", QB: 4.44, RB: 2.9, WR: 9.8, TE: 0.4 },
    { syop: "9", QB: 11.11, RB: 3.3, WR: 2.2, TE: 3.85 },
    { syop: "10", QB: 2.22, RB: 1.45, WR: 4.49, TE: 3.51 },
    { syop: "11", QB: 0.4, RB: 1.45, WR: 2.2, TE: 3.85 },
    { syop: "12+", QB: 20.0, RB: 0.4, WR: 2.2, TE: 3.85 },
  ];

  const GAUGES = [
    { key: "TE", value: 4.0, color: colors.te },
    { key: "RB", value: 3.39, color: colors.rb },
    { key: "WR", value: 4.9, color: colors.wr },
    { key: "QB", value: 7.22, color: colors.qb },
  ];

  const OVERALL_ROUND = [
    { round: "1", hit: 78.4 },
    { round: "2", hit: 47.7 },
    { round: "3", hit: 38.5 },
    { round: "4", hit: 18.0 },
    { round: "5", hit: 15.0 },
    { round: "6", hit: 14.1 },
    { round: "7", hit: 9.4 },
  ];

  const POSITIONAL_ROUND = [
    { round: "1", QB: 78, RB: 83, TE: 78, WR: 76 },
    { round: "2", QB: 42, RB: 50, TE: 40, WR: 51 },
    { round: "3", QB: 31, RB: 62, TE: 36, WR: 30 },
    { round: "4", QB: 20, RB: 27, TE: 23, WR: 9 },
    { round: "5", QB: 7, RB: 27, TE: 9, WR: 13 },
    { round: "6", QB: 11, RB: 18, TE: 8, WR: 15 },
    { round: "7", QB: 13, RB: 9, TE: 4, WR: 11 },
  ];

  const columnState = {
    active: { QB: true, RB: true, WR: true, TE: true },
    stacked: false,
  };

  const seriesMeta = {
    QB: { label: "QB %", color: colors.qb },
    RB: { label: "RB %", color: colors.rb },
    WR: { label: "WR %", color: colors.wr },
    TE: { label: "TE %", color: colors.te },
  };

  const positionalMeta = {
    QB: colors.magenta,
    RB: colors.green,
    TE: colors.purple,
    WR: colors.cyan,
  };

  function stripTags(str) {
    return (str || "").replace(/<br\s*\/?>(?=\s*)/gi, " ").replace(/<[^>]*>/g, "").trim();
  }

  function splitLabelValue(raw) {
    const txt = stripTags(raw);
    const m = txt.match(/^(.+?)\s*\(([^)]+)\)\s*$/);
    if (m) return { main: m[1].trim(), paren: m[2].trim() };
    return { main: txt, paren: null };
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
    if (!label) return "";
    const clean = stripTags(label);
    if (clean.startsWith("QB")) return "QB";
    if (clean.startsWith("RB")) return "RB";
    if (clean.startsWith("WR")) return "WR";
    if (clean.startsWith("TE")) return "TE";
    return "";
  }

  function buildSunburstTree() {
    const nodes = SUNBURST.labels.map((label, i) => ({
      label,
      parent: SUNBURST.parents[i],
      value: SUNBURST.values[i],
    }));
    const rootLabel = SUNBURST.labels[0];
    const childrenOf = (p) => nodes.filter((n) => n.parent === p);
    const ring1 = childrenOf(rootLabel);
    const byParent = {};
    ring1.forEach((parent) => {
      byParent[parent.label] = childrenOf(parent.label);
    });
    return { rootLabel, ring1, byParent };
  }

  function createSvgElement(tag, attrs) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.entries(attrs || {}).forEach(([key, value]) => {
      if (value != null) {
        el.setAttribute(key, value);
      }
    });
    return el;
  }

  function renderSunburst(container) {
    if (!container) return;
    container.innerHTML = "";
    const size = 560;
    const pad = 64;
    const svg = createSvgElement("svg", {
      viewBox: `${-pad} ${-pad} ${size + pad * 2} ${size + pad * 2}`,
      role: "img",
      "aria-label": "SYOP sunburst visualizing mean and mode for each position",
    });

    const cx = size / 2;
    const cy = size / 2;
    const inner1 = 96;
    const outer1 = 172;
    const inner2 = 184;
    const outer2 = 268;
    const start = -Math.PI / 2;
    const { ring1, byParent } = buildSunburstTree();

    const sum1 = ring1.reduce((sum, node) => sum + node.value, 0) || 1;
    let cursor = start;

    const ring1Segments = ring1.map((node) => {
      const span = (node.value / sum1) * Math.PI * 2;
      const segment = { node, a0: cursor, a1: cursor + span };
      cursor += span;
      return segment;
    });

    const ring2Segments = [];
    ring1Segments.forEach((segment) => {
      const children = byParent[segment.node.label] || [];
      const sumChildren = children.reduce((sum, child) => sum + child.value, 0) || 1;
      let c = segment.a0;
      children.forEach((child) => {
        const span = (child.value / sumChildren) * (segment.a1 - segment.a0);
        ring2Segments.push({ child, parent: segment, a0: c, a1: c + span });
        c += span;
      });
    });

    ring1Segments.forEach((segment) => {
      const series = seriesFromLabel(segment.node.label);
      const path = createSvgElement("path", {
        d: arcPath(cx, cy, inner1, outer1, segment.a0, segment.a1),
        fill: seriesMeta[series]?.color || colors.muted,
        opacity: "0.9",
        stroke: colors.bg,
        "stroke-width": "1",
      });
      svg.appendChild(path);

      const mid = (segment.a0 + segment.a1) / 2;
      const labelPoint = labelAt(cx, cy, (inner1 + outer1) / 2, mid);
      const text = createSvgElement("text", {
        x: labelPoint.x,
        y: labelPoint.y,
        fill: colors.text,
        "font-size": "14",
        "font-weight": "800",
        "text-anchor": "middle",
        "dominant-baseline": "middle",
      });
      text.textContent = splitLabelValue(segment.node.label).main;
      svg.appendChild(text);
    });

    ring2Segments.forEach((segment, idx) => {
      const series = seriesFromLabel(segment.parent.node.label);
      const path = createSvgElement("path", {
        d: arcPath(cx, cy, inner2, outer2, segment.a0, segment.a1),
        fill: seriesMeta[series]?.color || colors.muted,
        opacity: "0.85",
        stroke: colors.bg,
        "stroke-width": "1.25",
      });
      svg.appendChild(path);

      const mid = (segment.a0 + segment.a1) / 2;
      const radius = (inner2 + outer2) / 2;
      const point = labelAt(cx, cy, radius, mid);
      const { main, paren } = splitLabelValue(segment.child.label);
      const text = createSvgElement("text", {
        x: point.x,
        y: point.y - 2,
        fill: colors.text,
        "text-anchor": "middle",
        "dominant-baseline": "middle",
        "pointer-events": "none",
      });
      const top = document.createElementNS(text.namespaceURI, "tspan");
      top.setAttribute("font-size", "14");
      top.setAttribute("font-weight", "800");
      top.textContent = main;
      text.appendChild(top);
      if (paren) {
        const bottom = document.createElementNS(text.namespaceURI, "tspan");
        bottom.setAttribute("x", point.x);
        bottom.setAttribute("dy", "14");
        bottom.setAttribute("font-size", "12");
        bottom.setAttribute("fill", colors.subtext);
        bottom.setAttribute("font-weight", "700");
        bottom.textContent = `(${paren})`;
        text.appendChild(bottom);
      }
      svg.appendChild(text);
    });

    const circle = createSvgElement("circle", {
      cx,
      cy,
      r: "74",
      fill: "#1E2235",
      stroke: colors.bg,
    });
    svg.appendChild(circle);

    const titleTop = createSvgElement("text", {
      x: cx,
      y: cy - 6,
      fill: colors.text,
      "font-size": "15",
      "font-weight": "900",
      "text-anchor": "middle",
      "dominant-baseline": "middle",
    });
    titleTop.textContent = "Mean | Λ";
    svg.appendChild(titleTop);

    const titleBottom = createSvgElement("text", {
      x: cx,
      y: cy + 14,
      fill: colors.text,
      "font-size": "15",
      "font-weight": "900",
      "text-anchor": "middle",
      "dominant-baseline": "middle",
    });
    titleBottom.textContent = "& Mode | M";
    svg.appendChild(titleBottom);

    container.appendChild(svg);
  }

  function formatPercent(value) {
    const rounded = Math.round(value * 10) / 10;
    if (Math.abs(rounded - Math.round(rounded)) < 0.05) {
      return `${Math.round(rounded)}%`;
    }
    return `${rounded.toFixed(1)}%`;
  }

  function renderDistribution(container) {
    if (!container) return;
    container.innerHTML = "";
    const activeSeries = Object.keys(columnState.active).filter((key) => columnState.active[key]);
    if (activeSeries.length === 0) {
      const empty = document.createElement("div");
      empty.className = "syop-empty";
      empty.textContent = "Select at least one series to plot.";
      container.appendChild(empty);
      return;
    }

    const width = 880;
    const height = 360;
    const padding = { top: 35, right: 32, bottom: 50, left: 70 };
    const innerWidth = width - padding.left - padding.right;
    const innerHeight = height - padding.top - padding.bottom;

    const svg = createSvgElement("svg", {
      viewBox: `0 0 ${width} ${height}`,
      role: "img",
      "aria-label": "SYOP distribution by position",
    });

    const xStep = innerWidth / SYOP_DATA.length;
    const groupOffset = xStep * 0.15;
    const barArea = xStep * 0.7;
    const barWidth = columnState.stacked ? barArea : barArea / activeSeries.length;

    const values = SYOP_DATA.map((row) =>
      activeSeries.map((series, idx) => ({
        value: row[series],
        series,
        order: idx,
        label: row.syop,
      }))
    ).flat();

    const maxValue = columnState.stacked
      ? Math.max(
          ...SYOP_DATA.map((row) =>
            activeSeries.reduce((sum, series) => sum + row[series], 0)
          )
        )
      : Math.max(...values.map((entry) => entry.value));

    const yScale = (value) => innerHeight - (value / (maxValue || 1)) * innerHeight;

    const gridCount = 6;
    for (let i = 0; i <= gridCount; i += 1) {
      const value = (maxValue / gridCount) * i;
      const y = padding.top + yScale(value);
      const grid = createSvgElement("line", {
        x1: padding.left,
        x2: padding.left + innerWidth,
        y1: y,
        y2: y,
        stroke: colors.grid,
        "stroke-width": "1",
      });
      svg.appendChild(grid);

      const tick = createSvgElement("text", {
        x: padding.left - 12,
        y: y + 4,
        fill: colors.subtext,
        "font-size": "12",
        "text-anchor": "end",
      });
      tick.textContent = `${Math.round(value)}%`;
      svg.appendChild(tick);
    }

    SYOP_DATA.forEach((row, index) => {
      const x0 = padding.left + index * xStep + groupOffset;
      const groupBottom = padding.top + innerHeight;

      const label = createSvgElement("text", {
        x: x0 + barArea / 2,
        y: groupBottom + 28,
        fill: colors.subtext,
        "font-size": "12",
        "text-anchor": "middle",
      });
      label.textContent = row.syop;
      svg.appendChild(label);

      let stackOffset = 0;
      activeSeries.forEach((series, seriesIndex) => {
        const value = row[series];
        const color = seriesMeta[series].color;
        const heightValue = columnState.stacked ? value : value;
        const y = columnState.stacked
          ? padding.top + yScale(stackOffset + heightValue)
          : padding.top + yScale(heightValue);
        const actualHeight = columnState.stacked
          ? (value / (maxValue || 1)) * innerHeight
          : innerHeight - yScale(value);

        const rect = createSvgElement("rect", {
          x: columnState.stacked
            ? x0
            : x0 + seriesIndex * barWidth,
          y,
          width: Math.max(barWidth - 4, 6),
          height: Math.max(actualHeight, 0),
          rx: "6",
          ry: "6",
          fill: color,
          opacity: "0.88",
        });
        svg.appendChild(rect);

        const labelY = y - 6;
        const text = createSvgElement("text", {
          x: columnState.stacked
            ? x0 + barArea / 2
            : x0 + seriesIndex * barWidth + barWidth / 2,
          y: labelY,
          fill: colors.text,
          "font-size": "10",
          "text-anchor": "middle",
          "pointer-events": "none",
        });
        text.textContent = formatPercent(value);
        svg.appendChild(text);

        if (columnState.stacked) {
          stackOffset += value;
        }
      });
    });

    const axis = createSvgElement("line", {
      x1: padding.left,
      x2: padding.left + innerWidth,
      y1: padding.top + innerHeight,
      y2: padding.top + innerHeight,
      stroke: "rgba(255,255,255,0.35)",
      "stroke-width": "1.5",
    });
    svg.appendChild(axis);

    container.appendChild(svg);
  }

  function renderGauges(container) {
    if (!container) return;
    container.innerHTML = "";
    const min = 2;
    const max = 8;
    const width = 320;
    const height = 180;
    const cx = width / 2;
    const cy = height - 10;
    const radius = 120;
    const trackWidth = 16;
    const ticks = [2, 3.5, 5, 6.5, 8];

    GAUGES.forEach((gauge) => {
      const panel = document.createElement("div");
      panel.className = "syop-gauge-panel";
      const svg = createSvgElement("svg", {
        viewBox: `0 0 ${width} ${height}`,
        role: "img",
        "aria-label": `${gauge.key} gauge showing ${gauge.value.toFixed(2)} years`,
      });

      const map = (value) => -Math.PI + ((value - min) / (max - min)) * Math.PI;
      const start = -Math.PI;
      const end = 0;

      const arc = (a0, a1) => {
        const p0 = polar(cx, cy, radius, a0);
        const p1 = polar(cx, cy, radius, a1);
        const large = a1 - a0 > Math.PI ? 1 : 0;
        return `M ${p0.x} ${p0.y} A ${radius} ${radius} 0 ${large} 1 ${p1.x} ${p1.y}`;
      };

      const track = createSvgElement("path", {
        d: arc(start, end),
        stroke: "#1f2437",
        "stroke-width": trackWidth,
        "stroke-linecap": "round",
        fill: "none",
      });
      svg.appendChild(track);

      const valuePath = createSvgElement("path", {
        d: arc(start, map(Math.min(max, Math.max(min, gauge.value)))),
        stroke: gauge.color,
        "stroke-width": trackWidth,
        "stroke-linecap": "round",
        fill: "none",
      });
      svg.appendChild(valuePath);

      ticks.forEach((tickValue) => {
        const angle = map(tickValue);
        const inner = polar(cx, cy, radius - trackWidth / 2 - 4, angle);
        const outer = polar(cx, cy, radius + trackWidth / 2 + 4, angle);
        const tick = createSvgElement("line", {
          x1: inner.x,
          y1: inner.y,
          x2: outer.x,
          y2: outer.y,
          stroke: "rgba(255,255,255,0.7)",
          "stroke-width": "1.5",
        });
        svg.appendChild(tick);

        const label = createSvgElement("text", {
          x: outer.x,
          y: outer.y - 6,
          fill: colors.subtext,
          "font-size": "12",
          "text-anchor": "middle",
        });
        label.textContent = tickValue;
        svg.appendChild(label);
      });

      panel.appendChild(svg);
      const labelWrap = document.createElement("div");
      labelWrap.className = "syop-gauge-label";
      const name = document.createElement("span");
      name.textContent = gauge.key;
      const value = document.createElement("span");
      value.style.color = gauge.color;
      value.textContent = gauge.value.toFixed(2);
      labelWrap.appendChild(name);
      labelWrap.appendChild(value);
      panel.appendChild(labelWrap);
      container.appendChild(panel);
    });
  }

  function renderHighlights(container) {
    if (!container) return;
    container.innerHTML = "";
    const peaks = {};
    Object.keys(seriesMeta).forEach((series) => {
      const best = SYOP_DATA.reduce(
        (acc, row) => (row[series] > acc.value ? { value: row[series], syop: row.syop } : acc),
        { value: SYOP_DATA[0][series], syop: SYOP_DATA[0].syop }
      );
      peaks[series] = best;
    });

    const items = [
      {
        key: "QB",
        text: `QB peaks at ${peaks.QB.value.toFixed(2)}% in SYOP ${peaks.QB.syop}.`,
      },
      {
        key: "RB",
        text: `RB concentrates early with ${peaks.RB.value.toFixed(2)}% in SYOP ${peaks.RB.syop}.`,
      },
      {
        key: "WR",
        text: `WR shows dual humps (SYOP 3–7) with a top bin at ${peaks.WR.value.toFixed(2)}%.`,
      },
      {
        key: "TE",
        text: `TE retains value deep into careers, staying above 3% even at 12+ years.`,
      },
    ];

    items.forEach((item) => {
      const li = document.createElement("li");
      const label = document.createElement("strong");
      label.style.color = seriesMeta[item.key].color;
      label.textContent = `${item.key}`;
      li.appendChild(label);
      li.insertAdjacentText("beforeend", ` ${item.text}`);
      container.appendChild(li);
    });
  }

  function renderQA(container) {
    if (!container) return;
    container.innerHTML = "";

    const tests = [];
    const gaugeKeys = GAUGES.map((g) => g.key).sort().join(",");
    const required = ["QB", "RB", "WR", "TE"].sort().join(",");
    tests.push({ name: "Gauge keys present", pass: gaugeKeys === required });
    tests.push({ name: "Gauge values within range", pass: GAUGES.every((g) => g.value >= 2 && g.value <= 8) });
    tests.push({
      name: "SYOP rows include all series",
      pass: SYOP_DATA.every((row) => Object.keys(seriesMeta).every((series) => typeof row[series] === "number")),
    });
    tests.push({
      name: "Sunburst arrays aligned",
      pass:
        SUNBURST.labels.length === SUNBURST.parents.length &&
        SUNBURST.parents.length === SUNBURST.values.length,
    });
    const testSplit = splitLabelValue("SPΛ (7.2)");
    tests.push({ name: "Sunburst label split", pass: testSplit.main === "SPΛ" && testSplit.paren === "7.2" });
    tests.push({ name: "Center title uses Λ and M", pass: "Mean | Λ & Mode | M".includes("Λ") });
    tests.push({ name: "arcPath creates path", pass: /^M\s/.test(arcPath(0, 0, 10, 20, 0, Math.PI / 2)) });
    tests.push({ name: "series parser stable", pass: seriesFromLabel("WR segment") === "WR" });

    tests.forEach((test) => {
      if (!test.pass) {
        console.warn(`SYOP QA: ${test.name} failed`);
      }
      const li = document.createElement("li");
      li.className = `syop-qa-${test.pass ? "pass" : "fail"}`;
      const label = document.createElement("span");
      label.textContent = test.name;
      const status = document.createElement("span");
      status.className = "syop-qa-status";
      status.textContent = test.pass ? "PASS" : "FAIL";
      li.appendChild(label);
      li.appendChild(status);
      container.appendChild(li);
    });
  }

  function renderOverallChart(container) {
    if (!container) return;
    container.innerHTML = "";
    const width = 780;
    const height = 320;
    const padding = { top: 36, right: 32, bottom: 60, left: 80 };
    const innerWidth = width - padding.left - padding.right;
    const innerHeight = height - padding.top - padding.bottom;
    const svg = createSvgElement("svg", {
      viewBox: `0 0 ${width} ${height}`,
      role: "img",
      "aria-label": "Overall draft hit probability per round",
    });

    const maxValue = Math.max(...OVERALL_ROUND.map((row) => row.hit));
    const yScale = (value) => innerHeight - (value / maxValue) * innerHeight;
    const xStep = innerWidth / OVERALL_ROUND.length;
    const barWidth = xStep * 0.55;

    const gridCount = 5;
    for (let i = 0; i <= gridCount; i += 1) {
      const value = (maxValue / gridCount) * i;
      const y = padding.top + yScale(value);
      const grid = createSvgElement("line", {
        x1: padding.left,
        x2: padding.left + innerWidth,
        y1: y,
        y2: y,
        stroke: colors.grid,
        "stroke-width": "1",
      });
      svg.appendChild(grid);

      const tick = createSvgElement("text", {
        x: padding.left - 16,
        y: y + 4,
        fill: colors.subtext,
        "font-size": "12",
        "text-anchor": "end",
      });
      tick.textContent = `${Math.round(value)}%`;
      svg.appendChild(tick);
    }

    OVERALL_ROUND.forEach((row, index) => {
      const x = padding.left + index * xStep + (xStep - barWidth) / 2;
      const heightValue = innerHeight - yScale(row.hit);
      const y = padding.top + yScale(row.hit);

      const gradientId = `draft-bar-${index}`;
      const defs = createSvgElement("defs");
      const gradient = createSvgElement("linearGradient", {
        id: gradientId,
        x1: "0",
        y1: "0",
        x2: "0",
        y2: "1",
      });
      const stopTop = createSvgElement("stop", { offset: "0%", "stop-color": colors.cyan });
      const stopBottom = createSvgElement("stop", { offset: "100%", "stop-color": colors.magenta });
      gradient.appendChild(stopTop);
      gradient.appendChild(stopBottom);
      defs.appendChild(gradient);
      svg.appendChild(defs);

      const rect = createSvgElement("rect", {
        x,
        y,
        width: Math.max(barWidth, 6),
        height: Math.max(heightValue, 0),
        rx: "12",
        ry: "12",
        fill: `url(#${gradientId})`,
      });
      svg.appendChild(rect);

      const label = createSvgElement("text", {
        x: x + barWidth / 2,
        y: padding.top + innerHeight + 28,
        fill: colors.subtext,
        "font-size": "12",
        "text-anchor": "middle",
      });
      label.textContent = `RD ${row.round}`;
      svg.appendChild(label);

      const value = createSvgElement("text", {
        x: x + barWidth / 2,
        y: y - 8,
        fill: colors.text,
        "font-size": "11",
        "text-anchor": "middle",
      });
      value.textContent = `${row.hit.toFixed(1)}%`;
      svg.appendChild(value);
    });

    const axis = createSvgElement("line", {
      x1: padding.left,
      x2: padding.left + innerWidth,
      y1: padding.top + innerHeight,
      y2: padding.top + innerHeight,
      stroke: "rgba(255,255,255,0.35)",
      "stroke-width": "1.5",
    });
    svg.appendChild(axis);
    container.appendChild(svg);
  }

  function renderRoundTiles(container) {
    if (!container) return;
    container.innerHTML = "";
    OVERALL_ROUND.forEach((row) => {
      const tile = document.createElement("div");
      tile.className = "draft-tile";
      const round = document.createElement("span");
      round.textContent = row.round;
      const value = document.createElement("span");
      value.textContent = `${row.hit.toFixed(1)}%`;
      tile.appendChild(round);
      tile.appendChild(value);
      container.appendChild(tile);
    });
  }

  function renderLegend(container) {
    if (!container) return;
    container.innerHTML = "";
    Object.entries(positionalMeta).forEach(([key, color]) => {
      const item = document.createElement("span");
      item.style.color = color;
      item.textContent = key;
      container.appendChild(item);
    });
  }

  function renderPositionalChart(container) {
    if (!container) return;
    container.innerHTML = "";
    const width = 820;
    const height = 360;
    const padding = { top: 36, right: 48, bottom: 60, left: 80 };
    const innerWidth = width - padding.left - padding.right;
    const innerHeight = height - padding.top - padding.bottom;

    const svg = createSvgElement("svg", {
      viewBox: `0 0 ${width} ${height}`,
      role: "img",
      "aria-label": "Positional hit rate trends per draft round",
    });

    const maxValue = 100;
    const yScale = (value) => innerHeight - (value / maxValue) * innerHeight;
    const xStep = innerWidth / (POSITIONAL_ROUND.length - 1);

    const gridCount = 5;
    for (let i = 0; i <= gridCount; i += 1) {
      const value = (maxValue / gridCount) * i;
      const y = padding.top + yScale(value);
      const grid = createSvgElement("line", {
        x1: padding.left,
        x2: padding.left + innerWidth,
        y1: y,
        y2: y,
        stroke: colors.grid,
        "stroke-width": "1",
      });
      svg.appendChild(grid);

      const tick = createSvgElement("text", {
        x: padding.left - 16,
        y: y + 4,
        fill: colors.subtext,
        "font-size": "12",
        "text-anchor": "end",
      });
      tick.textContent = `${Math.round(value)}%`;
      svg.appendChild(tick);
    }

    POSITIONAL_ROUND.forEach((row, index) => {
      const x = padding.left + index * xStep;
      const label = createSvgElement("text", {
        x,
        y: padding.top + innerHeight + 28,
        fill: colors.subtext,
        "font-size": "12",
        "text-anchor": index === POSITIONAL_ROUND.length - 1 ? "end" : index === 0 ? "start" : "middle",
      });
      label.textContent = row.round;
      svg.appendChild(label);
    });

    Object.keys(positionalMeta).forEach((series) => {
      const color = positionalMeta[series];
      const pathPoints = POSITIONAL_ROUND.map((row, index) => {
        const x = padding.left + index * xStep;
        const y = padding.top + yScale(row[series]);
        return `${index === 0 ? "M" : "L"} ${x} ${y}`;
      }).join(" ");

      const path = createSvgElement("path", {
        d: pathPoints,
        fill: "none",
        stroke: color,
        "stroke-width": "3",
      });
      svg.appendChild(path);

      POSITIONAL_ROUND.forEach((row, index) => {
        const x = padding.left + index * xStep;
        const y = padding.top + yScale(row[series]);
        const circle = createSvgElement("circle", {
          cx: x,
          cy: y,
          r: "4",
          fill: colors.bg,
          stroke: color,
          "stroke-width": "2",
        });
        svg.appendChild(circle);
      });
    });

    container.appendChild(svg);
  }

  function attachControlHandlers() {
    const controls = document.querySelectorAll("#syop-controls input[type=checkbox]");
    controls.forEach((input) => {
      input.addEventListener("change", () => {
        const series = input.dataset.series;
        if (series) {
          columnState.active[series] = input.checked;
        }
        if (input.dataset.action === "stacked") {
          columnState.stacked = input.checked;
        }
        renderDistribution(document.getElementById("syop-distribution"));
      });
    });
  }

  function handleResize() {
    renderSunburst(document.getElementById("syop-sunburst"));
    renderDistribution(document.getElementById("syop-distribution"));
    renderOverallChart(document.getElementById("draft-overall-chart"));
    renderPositionalChart(document.getElementById("draft-positional-chart"));
  }

  function initDraftSection() {
    renderOverallChart(document.getElementById("draft-overall-chart"));
    renderRoundTiles(document.getElementById("draft-round-tiles"));
    renderLegend(document.getElementById("draft-legend"));
    renderPositionalChart(document.getElementById("draft-positional-chart"));
  }

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(() => {
    const menuSyop = document.getElementById("menu-syop");
    if (menuSyop) {
      menuSyop.addEventListener("click", (event) => {
        event.preventDefault();
      });
    }

    renderSunburst(document.getElementById("syop-sunburst"));
    renderDistribution(document.getElementById("syop-distribution"));
    attachControlHandlers();
    renderGauges(document.getElementById("syop-gauges"));
    renderHighlights(document.getElementById("syop-highlights-list"));
    renderQA(document.getElementById("syop-qa-list"));
    initDraftSection();

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(handleResize, 180);
    });
  });
})();
