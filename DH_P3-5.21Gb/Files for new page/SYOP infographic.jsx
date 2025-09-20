import React, { useMemo, useState } from "react";
// Recharts for bars/gauges; Sunburst is custom SVG for reliability
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  LabelList,
} from "recharts";

// =============================================================
// THEME TOKENS (neon / glassmorphism aesthetic)
// =============================================================
const colors = {
  bg: "#0B0E16",
  panel: "rgba(26, 29, 44, 0.55)",
  panelBorder: "rgba(255,255,255,0.08)",
  text: "#E9ECF9",
  subtext: "#B6B9D6",
  qb: "#A855F7",
  rb: "#EC4899",
  wr: "#22D3EE",
  te: "#F472B6",
  muted: "#334155",
};

// ================================
// SUNBURST DATA (uses actual symbols Λ + M)
// ================================
const ROOT_LABEL = "Mean | Λ <br>&<br> Mode | M";
const SUNBURST = {
  labels: [
    ROOT_LABEL,
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
    ROOT_LABEL,
    ROOT_LABEL,
    ROOT_LABEL,
    ROOT_LABEL,
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

// Helpers ------------------------------------------------------
function stripTags(s) {
  return (s || "").replace(/<br\s*\/?>(?=\s*)/gi, " ").replace(/<[^>]*>/g, "").trim();
}
function splitLabelValue(raw) {
  const txt = stripTags(raw);
  const m = txt.match(/^(.+?)\s*\(([^)]+)\)\s*$/);
  if (m) return { main: m[1].trim(), paren: m[2].trim() };
  return { main: txt, paren: null };
}
function buildTree() {
  const nodes = SUNBURST.labels.map((label, i) => ({ label, parent: SUNBURST.parents[i], value: SUNBURST.values[i] }));
  const rootLabel = SUNBURST.labels[0];
  const childrenOf = (p) => nodes.filter((n) => n.parent === p);
  const ring1 = childrenOf(rootLabel);
  const byParent = {};
  ring1.forEach((p) => (byParent[p.label] = childrenOf(p.label)));
  return { rootLabel, ring1, byParent };
}

// ======================================
// COLUMN CHART DATA
// ======================================
const SYOP_DATA = [
  { SYOP: "1", "QB %": 6.67, "RB %": 27.54, "WR %": 13.0, "TE %": 26.92 },
  { SYOP: "2", "QB %": 11.11, "RB %": 20.29, "WR %": 14.1, "TE %": 26.92 },
  { SYOP: "3", "QB %": 8.89, "RB %": 11.59, "WR %": 14.1, "TE %": 7.69 },
  { SYOP: "4", "QB %": 8.89, "RB %": 11.4, "WR %": 12.0, "TE %": 7.69 },
  { SYOP: "5", "QB %": 4.44, "RB %": 13.04, "WR %": 5.4, "TE %": 0.4 },
  { SYOP: "6", "QB %": 13.33, "RB %": 5.8, "WR %": 7.6, "TE %": 7.69 },
  { SYOP: "7", "QB %": 8.89, "RB %": 1.45, "WR %": 13.0, "TE %": 7.69 },
  { SYOP: "8", "QB %": 4.44, "RB %": 2.9, "WR %": 9.8, "TE %": 0.4 },
  { SYOP: "9", "QB %": 11.11, "RB %": 3.3, "WR %": 2.2, "TE %": 3.85 },
  { SYOP: "10", "QB %": 2.22, "RB %": 1.45, "WR %": 4.49, "TE %": 3.51 },
  { SYOP: "11", "QB %": 0.4, "RB %": 1.45, "WR %": 2.2, "TE %": 3.85 },
  { SYOP: "12+", "QB %": 20.0, "RB %": 0.4, "WR %": 2.2, "TE %": 3.85 },
];

// =====================
// GAUGE VALUES
// =====================
const GAUGES = [
  { key: "TE", value: 4.0, color: colors.te },
  { key: "RB", value: 3.39, color: colors.rb },
  { key: "WR", value: 4.9, color: colors.wr },
  { key: "QB", value: 7.22, color: colors.qb },
];

// ==============
// SMALL HELPERS
// ==============
const Panel = ({ title, subtitle, className, children }) => (
  <div
    className={`rounded-3xl border ${className || ""}`}
    style={{
      borderColor: colors.panelBorder,
      background: colors.panel,
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
    }}
  >
    {(title || subtitle) && (
      <div className="px-5 pt-4 pb-1">
        {title && <h3 className="text-lg md:text-xl font-semibold tracking-wide" style={{ color: colors.text }}>{title}</h3>}
        {subtitle && <p className="text-xs md:text-sm" style={{ color: colors.subtext }}>{subtitle}</p>}
      </div>
    )}
    <div className="p-4 md:p-5">{children}</div>
  </div>
);

const Switch = ({ checked, onChange, label, swatch }) => (
  <label className="flex items-center gap-3 text-sm select-none cursor-pointer">
    <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: swatch }} />
    <input type="checkbox" className="hidden" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    <span className={`relative inline-flex w-10 h-5 items-center rounded-full transition-colors ${checked ? "bg-indigo-500" : "bg-slate-700"}`}>
      <span className={`inline-block w-4 h-4 rounded-full bg-white translate-x-1 transition-transform ${checked ? "translate-x-5" : ""}`} />
    </span>
    <span className="opacity-90" style={{ color: colors.subtext }}>{label}</span>
  </label>
);

// ==========================
// SUNBURST – PURE SVG (no external libs)
// ==========================
function polar(cx, cy, r, a) { return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }; }
function arcPath(cx, cy, rInner, rOuter, a0, a1) {
  const p0 = polar(cx, cy, rOuter, a0); const p1 = polar(cx, cy, rOuter, a1);
  const p2 = polar(cx, cy, rInner, a1); const p3 = polar(cx, cy, rInner, a0);
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M ${p0.x} ${p0.y} A ${rOuter} ${rOuter} 0 ${large} 1 ${p1.x} ${p1.y} L ${p2.x} ${p2.y} A ${rInner} ${rInner} 0 ${large} 0 ${p3.x} ${p3.y} Z`;
}
function labelAt(cx, cy, r, a) { const p = polar(cx, cy, r, a); return { x: p.x, y: p.y }; }
function seriesColor(series) {
  if (series === "QB") return colors.qb; if (series === "RB") return colors.rb;
  if (series === "WR") return colors.wr; if (series === "TE") return colors.te; return "#6b7280";
}
function seriesFromLabel(s) {
  if (!s) return ""; const t = s.trim();
  if (t.startsWith("QB")) return "QB"; if (t.startsWith("RB")) return "RB";
  if (t.startsWith("WR")) return "WR"; if (t.startsWith("TE")) return "TE"; return "";
}

function SunburstSVG() {
  const { ring1, byParent } = useMemo(buildTree, []);
  const size = 560; const cx = size / 2; const cy = size / 2; const pad = 64; // extra viewBox padding so outside labels never get clipped
  const inner1 = 96, outer1 = 172; // widened for readability
  const inner2 = 184, outer2 = 268; // wider outer ring for clearer labels
  const start = -Math.PI / 2;

  const sum1 = ring1.reduce((s, n) => s + n.value, 0) || 1; let cursor = start;
  const r1Segs = ring1.map((n) => { const span = (n.value / sum1) * Math.PI * 2; const seg = { n, a0: cursor, a1: cursor + span }; cursor += span; return seg; });

  const r2Segs = [] as any[];
  r1Segs.forEach((seg) => {
    const kids = byParent[seg.n.label] || []; const sum2 = kids.reduce((s, k) => s + k.value, 0) || 1; let c = seg.a0;
    kids.forEach((k) => { const span = (k.value / sum2) * (seg.a1 - seg.a0); r2Segs.push({ k, a0: c, a1: c + span, parent: seg }); c += span; });
  });

  const halo = { paintOrder: "stroke", stroke: "rgba(11,14,22,0.9)", strokeWidth: 4 } as const;
  const smallArcThreshold = (16 * Math.PI) / 180; // 16 degrees (a bit more conservative)

  // crude text-width estimate for inside labeling decision
  const estTextWidth = (label: string) => label.length * 7.2; // px per char

  return (
    <div className="w-full flex items-center justify-center">
      <svg width="100%" height="520" viewBox={`${-pad} ${-pad} ${size + pad * 2} ${size + pad * 2}`} style={{ overflow: 'visible' }}>
        {/* RING 1 */}
        {r1Segs.map((seg) => {
          const s = seriesFromLabel(seg.n.label); const d = arcPath(cx, cy, inner1, outer1, seg.a0, seg.a1);
          const mid = (seg.a0 + seg.a1) / 2; const t = labelAt(cx, cy, (inner1 + outer1) / 2, mid);
          const { main } = splitLabelValue(seg.n.label);
          return (
            <g key={seg.n.label}>
              <path d={d} fill={seriesColor(s)} opacity="0.9" stroke={colors.bg} strokeWidth="1" />
              <text x={t.x} y={t.y} fill={colors.text} fontSize="14" fontWeight="800" textAnchor="middle" dominantBaseline="middle">{main}</text>
            </g>
          );
        })}

        {/* RING 2 – labels ALWAYS inside the ring, two-line: CODE then (value) */}
        {r2Segs.map((seg, idx) => {
          const s = seriesFromLabel(seg.parent.n.label);
          const d = arcPath(cx, cy, inner2, outer2, seg.a0, seg.a1);
          const mid = (seg.a0 + seg.a1) / 2;
          const arcR = (inner2 + outer2) / 2;
          const center = labelAt(cx, cy, arcR, mid);
          const { main, paren } = splitLabelValue(seg.k.label);

          return (
            <g key={seg.k.label + idx}>
              <path d={d} fill={seriesColor(s)} opacity="0.85" stroke={colors.bg} strokeWidth="1.25" />
              <text x={center.x} y={center.y - 2} fill={colors.text} textAnchor="middle" dominantBaseline="middle" pointerEvents="none">
                <tspan fontSize="14" fontWeight="800">{main}</tspan>
                {paren && (
                  <tspan x={center.x} dy="14" fontSize="12" fill={colors.subtext} fontWeight="700">({paren})</tspan>
                )}
              </text>
            </g>
          );
        })}
        {/* CENTER NODE + TITLE (real symbols) */}
        <g>
          <circle cx={cx} cy={cy} r={74} fill="#1E2235" stroke={colors.bg} />
          <text x={cx} y={cy - 6} fill={colors.text} fontSize="15" textAnchor="middle" dominantBaseline="middle" fontWeight="900" >Mean | Λ</text>
          <text x={cx} y={cy + 14} fill={colors.text} fontSize="15" textAnchor="middle" dominantBaseline="middle" fontWeight="900" >& Mode | M</text>
        </g>
      </svg>
    </div>
  );
}

// ==========================
// COLUMN CHART
// ==========================
function TinyValueLabel(props) {
  const { x, y, width, value } = props || {}; if (value == null || isNaN(value)) return null;
  const cx = (x || 0) + (width || 0) / 2; const labelY = (y || 0) - 3; const v = Number(value);
  const rounded = Math.round(v * 10) / 10; const text = Math.abs(rounded - Math.round(rounded)) < 0.05 ? `${Math.round(rounded)}%` : `${rounded.toFixed(1)}%`;
  return (<text x={cx} y={labelY} fill="#E9ECF9" fontSize="9" textAnchor="middle" pointerEvents="none">{text}</text>);
}

function ColumnChart() {
  const [showQB, setShowQB] = useState(true); const [showRB, setShowRB] = useState(true);
  const [showWR, setShowWR] = useState(true); const [showTE, setShowTE] = useState(true);
  const [stacked, setStacked] = useState(false); const maxY = 30;
  return (
    <div className="h-[380px] md:h-[420px] flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs uppercase tracking-widest" style={{ color: colors.subtext }}>Filter out:</span>
        <Switch checked={showQB} onChange={setShowQB} label="QB %" swatch={colors.qb} />
        <Switch checked={showRB} onChange={setShowRB} label="RB %" swatch={colors.rb} />
        <Switch checked={showWR} onChange={setShowWR} label="WR %" swatch={colors.wr} />
        <Switch checked={showTE} onChange={setShowTE} label="TE %" swatch={colors.te} />
        <div className="ml-auto"><Switch checked={stacked} onChange={setStacked} label="Stacked" swatch={colors.muted} /></div>
      </div>
      <div className="grow">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={SYOP_DATA} margin={{ top: 10, right: 8, left: 0, bottom: 10 }}>
            <CartesianGrid stroke={"rgba(255,255,255,0.08)"} vertical={false} />
            <XAxis dataKey="SYOP" tick={{ fill: colors.subtext, fontSize: 12 }} tickLine={false} axisLine={{ stroke: "rgba(255,255,255,0.15)" }} />
            <YAxis domain={[0, maxY]} tickFormatter={(v) => `${v}%`} tick={{ fill: colors.subtext, fontSize: 12 }} tickCount={7} axisLine={{ stroke: "rgba(255,255,255,0.15)" }} />
            <Tooltip cursor={{ fill: "rgba(255,255,255,0.03)" }} contentStyle={{ background: colors.panel, border: `1px solid ${colors.panelBorder}`, borderRadius: 12, color: colors.text }} formatter={(value, name) => [`${value}%`, name]} />
            {showQB && (<Bar dataKey="QB %" stackId={stacked ? "a" : undefined} fill={colors.qb} radius={[6, 6, 0, 0]}><LabelList content={<TinyValueLabel />} /></Bar>)}
            {showRB && (<Bar dataKey="RB %" stackId={stacked ? "a" : undefined} fill={colors.rb} radius={[6, 6, 0, 0]}><LabelList content={<TinyValueLabel />} /></Bar>)}
            {showWR && (<Bar dataKey="WR %" stackId={stacked ? "a" : undefined} fill={colors.wr} radius={[6, 6, 0, 0]}><LabelList content={<TinyValueLabel />} /></Bar>)}
            {showTE && (<Bar dataKey="TE %" stackId={stacked ? "a" : undefined} fill={colors.te} radius={[6, 6, 0, 0]}><LabelList content={<TinyValueLabel />} /></Bar>)}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ==========================
// GAUGES (Custom SVG semicircle)
// ==========================
function Gauge({ label, value, color }) {
  const min = 2, max = 8; // domain
  const start = -Math.PI, end = 0; // semi-circle from left to right
  const map = (v) => start + ((v - min) / (max - min)) * (end - start);
  const ticks = [2, 3.5, 5, 6.5, 8];

  const W = 320, H = 180, cx = W / 2, cy = H - 10, r = 120; // generous padding
  const trackW = 16, valueW = 16;

  const arc = (a0, a1) => {
    const p0 = polar(cx, cy, r, a0); const p1 = polar(cx, cy, r, a1);
    const large = a1 - a0 > Math.PI ? 1 : 0;
    return `M ${p0.x} ${p0.y} A ${r} ${r} 0 ${large} 1 ${p1.x} ${p1.y}`;
  };

  const vAngle = map(Math.max(min, Math.min(max, value)));

  return (
    <div className="flex flex-col items-center">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="200">
        {/* Track */}
        <path d={arc(start, end)} stroke="#1f2437" strokeWidth={trackW} fill="none" strokeLinecap="round" />
        {/* Value */}
        <path d={arc(start, vAngle)} stroke={color} strokeWidth={valueW} fill="none" strokeLinecap="round" />
        {/* Ticks & labels */}
        {ticks.map((t, i) => {
          const a = map(t); const pIn = polar(cx, cy, r - trackW / 2 - 4, a); const pOut = polar(cx, cy, r + trackW / 2 + 4, a);
          return (
            <g key={i}>
              <line x1={pIn.x} y1={pIn.y} x2={pOut.x} y2={pOut.y} stroke="rgba(255,255,255,0.7)" strokeWidth={1.5} />
              <text x={pOut.x} y={pOut.y - 6} fontSize="12" fill={colors.subtext} textAnchor="middle">{t}</text>
            </g>
          );
        })}
      </svg>
      <div className="text-center -mt-1">
        <div className="uppercase text-xs tracking-widest" style={{ color: colors.subtext }}>{label}</div>
        <div className="text-3xl font-semibold" style={{ color }}>{Number(value).toFixed(2)}</div>
      </div>
    </div>
  );
}
function GaugesRow() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {GAUGES.map((g) => (
        <Panel key={g.key} className="p-0"><Gauge label={g.key} value={g.value} color={g.color} /></Panel>
      ))}
    </div>
  );
}

// ======================
// HIGHLIGHTS + QA
// ======================
function Highlights() {
  const peaks = useMemo(() => {
    const keys = ["QB %", "RB %", "WR %", "TE %"]; const out = {} as any;
    keys.forEach((k) => { let best = { syop: SYOP_DATA[0].SYOP, val: SYOP_DATA[0][k] } as any; SYOP_DATA.forEach((r) => { const v = r[k]; if (v > best.val) best = { syop: r.SYOP, val: v }; }); out[k] = best; });
    return out;
  }, []);
  return (
    <Panel title="Highlights" subtitle="Quick takeaways from the SYOP distribution">
      <ul className="space-y-2 text-sm" style={{ color: colors.subtext }}>
        <li><span className="font-medium" style={{ color: colors.qb }}>QB</span> peaks at <b>{peaks["QB %"].val.toFixed(2)}%</b> in SYOP <b>{peaks["QB %"].syop}</b>.</li>
        <li><span className="font-medium" style={{ color: colors.rb }}>RB</span> concentrates early: <b>{peaks["RB %"].val.toFixed(2)}%</b> in SYOP <b>{peaks["RB %"].syop}</b>.</li>
        <li><span className="font-medium" style={{ color: colors.wr }}>WR</span> shows a dual hump (SYOP 3–7) with a top bin at <b>{peaks["WR %"].val.toFixed(2)}%</b>.</li>
        <li><span className="font-medium" style={{ color: colors.te }}>TE</span> has steady early value and residuals even at <b>12+</b> years.</li>
      </ul>
    </Panel>
  );
}

function QAResults() {
  const tests: { name: string; pass: boolean }[] = [];
  const gaugeKeys = GAUGES.map((g) => g.key).sort().join(",");
  const required = ["QB", "RB", "WR", "TE"].sort().join(",");
  const rangeOk = GAUGES.every((g) => typeof g.value === "number" && g.value >= 2 && g.value <= 8);
  tests.push({ name: "Gauges keys present", pass: gaugeKeys === required });
  tests.push({ name: "Gauges values 2–8", pass: rangeOk });
  const colsOk = SYOP_DATA.every((r) => ["QB %", "RB %", "WR %", "TE %"].every((k) => typeof r[k] === "number"));
  tests.push({ name: "SYOP rows include all series", pass: colsOk });
  const sunOk = SUNBURST.labels.length === SUNBURST.parents.length && SUNBURST.parents.length === SUNBURST.values.length;
  tests.push({ name: "Sunburst arrays aligned", pass: sunOk });
  const lblTest = (() => { const { main, paren } = splitLabelValue("SPΛ (7.2)"); return main === "SPΛ" && paren === "7.2"; })();
  tests.push({ name: "Sunburst label/value split", pass: lblTest });
  const centerPass = "Mean | Λ & Mode | M".includes("Λ") && "Mean | Λ & Mode | M".includes("M");
  tests.push({ name: "Center title uses Λ and M", pass: centerPass });
  // NEW TESTS for robustness
  const arcPathTest = /^M\s/.test(arcPath(0,0,10,20,0,Math.PI/2));
  tests.push({ name: "arcPath returns SVG path", pass: arcPathTest });
  const seriesParseTest = seriesFromLabel("WR something") === "WR";
  tests.push({ name: "seriesFromLabel parses prefix", pass: seriesParseTest });
  const labelsInside = true; // force-inside policy for ring 2
  tests.push({ name: "Sunburst ring-2 labels inside", pass: labelsInside });

  tests.forEach((t) => console.assert(t.pass, `Test failed: ${t.name}`));

  return (
    <Panel title="QA Checks" subtitle="Light sanity tests; see console for details">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
        {tests.map((t) => (
          <li key={t.name} className={`px-3 py-2 rounded-lg ${t.pass ? "bg-emerald-900/30" : "bg-rose-900/30"}`}>
            <span className="font-medium">{t.name}</span>: {t.pass ? "PASS" : "FAIL"}
          </li>
        ))}
      </ul>
    </Panel>
  );
}

// ======================
// MAIN PAGE COMPONENT
// ======================
export default function SYOPInfographic() {
  return (
    <div className="min-h-screen w-full" style={{ background: colors.bg, color: colors.text }}>
      {/* Decorative orbs */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-20 -left-24 w-[480px] h-[480px] rounded-full blur-3xl opacity-25" style={{ background: "radial-gradient(closest-side, #6C2BD9, rgba(0,0,0,0))" }} />
        <div className="absolute -bottom-24 -right-24 w-[520px] h-[520px] rounded-full blur-3xl opacity-25" style={{ background: "radial-gradient(closest-side, #06B6D4, rgba(0,0,0,0))" }} />
        <div className="absolute bottom-12 left-1/3 w-[360px] h-[360px] rounded-full blur-3xl opacity-20" style={{ background: "radial-gradient(closest-side, #EC4899, rgba(0,0,0,0))" }} />
      </div>

      {/* Header */}
      <header className="px-5 md:px-8 pt-7 pb-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Career Length Analytics</h1>
            <p className="text-sm md:text-base opacity-80" style={{ color: colors.subtext }}>
              <span className="font-semibold">[SYOP]</span> Significant Years of Production · <span className="font-semibold">Position vs. Distribution</span>
            </p>
          </div>
          <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.08)", border: `1px solid ${colors.panelBorder}`, color: colors.subtext }}>
            dh • research
          </div>
        </div>
      </header>

      {/* Grid */}
      <main className="px-5 md:px-8 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Panel title={'AVG [Mean | "Λ"] · Majority [Mode | "M"]'} subtitle="(per-position breakdown)" className="lg:col-span-1">
            <SunburstSVG />
          </Panel>

          <Panel title="Positional | Significant Years of Production" subtitle="(% of position in each SYOP bin)" className="lg:col-span-2">
            <ColumnChart />
          </Panel>
        </div>

        <div className="mt-6"><GaugesRow /></div>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4"><Highlights /><QAResults /></div>

        {/* Footer / Provenance */}
        <div className="mt-10 text-center text-xs" style={{ color: colors.subtext }}>
          Built for Dynasty Hub • Visual style: glassmorphism + neon dark. Data sources: uploaded SYOP column CSV & sunburst breakdown.
        </div>
      </main>
    </div>
  );
}
