import React from 'react';

/* Hand-drawn SVG of the Nexus data path.
   Horizontal on desktop; the wrapper scrolls it on narrow screens so nothing
   is squashed into illegibility. Colours come from the Tailwind theme tokens.

   Layout intent:
     building ──▶ carrier/tunnel ──▶ Hetzner (firewall → collector → db
                                     → Grafana / Nexus app) ──▶ staff / customer
   Grafana feeds the staff view; the Nexus dashboard feeds the customer view. */

const C = {
  line: '#1e2733',
  surface: '#0e131b',
  raised: '#151c26',
  ink: '#e8eef6',
  muted: '#93a1b1',
  faint: '#64748b',
  signal: '#34d399',
  data: '#38bdf8',
};

const MONO = "'JetBrains Mono', monospace";
const SANS = 'Inter, sans-serif';

function Node({ x, y, w = 150, h = 58, title, sub, accent = C.line, titleFill = C.ink }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" fill={C.raised} stroke={accent} strokeWidth="1" />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 4 : y + h / 2 + 4}
        textAnchor="middle"
        fill={titleFill}
        fontSize="12.5"
        fontWeight="600"
        fontFamily={SANS}
      >
        {title}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 13}
          textAnchor="middle"
          fill={C.faint}
          fontSize="10.5"
          fontFamily={MONO}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

function Zone({ x, y, w, h, label, colour = C.line }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="12"
        fill="transparent"
        stroke={colour}
        strokeWidth="1"
        strokeDasharray="5 5"
        opacity="0.75"
      />
      <text
        x={x + 12}
        y={y + 18}
        fill={colour}
        fontSize="10"
        fontWeight="600"
        letterSpacing="1.4"
        fontFamily={MONO}
      >
        {label.toUpperCase()}
      </text>
    </g>
  );
}

function Arrow({ d, colour = C.faint }) {
  return (
    <path d={d} stroke={colour} strokeWidth="1.4" fill="none" markerEnd="url(#arrowhead)" />
  );
}

export default function ArchitectureDiagram({ labels }) {
  const L = labels;

  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-surface p-4 sm:p-6">
      <svg
        viewBox="0 0 1180 372"
        className="h-auto w-full min-w-[940px]"
        role="img"
        aria-label={`${L.building} → ${L.router} → ${L.tunnel} → ${L.cloud} → ${L.staff} / ${L.customer}`}
      >
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L7,3 L0,6 Z" fill={C.faint} />
          </marker>
          <marker id="arrowheadSignal" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L7,3 L0,6 Z" fill={C.signal} />
          </marker>
          <linearGradient id="tunnelGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={C.signal} stopOpacity="0.12" />
            <stop offset="50%" stopColor={C.signal} stopOpacity="0.32" />
            <stop offset="100%" stopColor={C.data} stopOpacity="0.12" />
          </linearGradient>
        </defs>

        {/* ── Zone 1: the building ─────────────────────────────── */}
        <Zone x={14} y={58} w={326} h={190} label={L.building} />
        <Node x={30} y={110} w={140} title={L.meter} sub={L.meterSub} accent={C.signal} />
        <Node x={200} y={110} w={128} title={L.router} sub={L.routerSub} accent={C.signal} />
        <Arrow d="M170,139 L193,139" />
        <text x={185} y={180} textAnchor="middle" fill={C.faint} fontSize="10" fontFamily={MONO}>
          {L.link}
        </text>
        <text x={28} y={232} fill={C.faint} fontSize="10" fontFamily={MONO}>
          {L.cabinet}
        </text>

        {/* ── Zone 2: carrier + tunnel ─────────────────────────── */}
        <Zone x={360} y={58} w={266} h={190} label={L.carrier} />
        <rect
          x={384}
          y={110}
          width={218}
          height={58}
          rx="8"
          fill="url(#tunnelGrad)"
          stroke={C.signal}
          strokeWidth="1"
        />
        <text x={493} y={135} textAnchor="middle" fill={C.signal} fontSize="12.5" fontWeight="600" fontFamily={SANS}>
          {L.tunnel}
        </text>
        <text x={493} y={152} textAnchor="middle" fill={C.muted} fontSize="10.5" fontFamily={MONO}>
          {L.tunnelSub}
        </text>
        <Arrow d="M328,139 L377,139" colour={C.signal} />
        <text x={493} y={196} textAnchor="middle" fill={C.faint} fontSize="10" fontFamily={MONO}>
          {L.carrierSub}
        </text>

        {/* ── Zone 3: Hetzner cloud ────────────────────────────── */}
        <Zone x={646} y={30} w={360} h={292} label={L.cloud} colour={C.data} />
        <Arrow d="M602,139 L665,139" colour={C.signal} />

        <rect x={672} y={58} width={308} height={30} rx="6" fill={C.surface} stroke={C.data} strokeWidth="1" />
        <text x={826} y={78} textAnchor="middle" fill={C.data} fontSize="11" fontWeight="600" fontFamily={MONO}>
          {L.firewall}
        </text>

        <Node x={672} y={110} w={130} title={L.collector} />
        <Node x={830} y={110} w={150} title={L.db} sub={L.dbSub} accent={C.data} />
        <Arrow d="M802,139 L823,139" />

        {/* presentation layer, stacked under the database */}
        <Node x={830} y={192} w={150} h={50} title={L.grafana} />
        <Node x={830} y={254} w={150} h={50} title={L.app} />
        {/* db → Grafana */}
        <Arrow d="M905,168 L905,185" />
        {/* db → Nexus app, routed down the outside of the Grafana box */}
        <Arrow d="M845,168 L845,178 L812,178 L812,279 L823,279" />

        {/* ── Zone 4: consumers ────────────────────────────────── */}
        <Node x={1026} y={192} w={140} h={50} title={L.staff} sub={L.staffSub} accent={C.signal} />
        <Node x={1026} y={254} w={140} h={50} title={L.customer} sub={L.customerSub} accent={C.data} />
        <Arrow d="M980,217 L1019,217" />
        <Arrow d="M980,279 L1019,279" />

        {/* footnote */}
        <text x={14} y={356} fill={C.faint} fontSize="10.5" fontFamily={MONO}>
          {`← ${L.note}`}
        </text>
      </svg>
    </div>
  );
}
