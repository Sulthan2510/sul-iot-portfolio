import React from 'react';
import { C, MONO, SANS, Defs, Node, Zone, Arrow, Label, DiagramFrame } from './primitives';

/* The Nexus data path: meter → router → WireGuard → Hetzner → staff / customer.
   Grafana feeds the staff view; the Nexus dashboard feeds the customer view. */

export default function NexusDiagram({ labels }) {
  const L = labels;

  return (
    <DiagramFrame minWidth={940}>
      <svg
        viewBox="0 0 1180 372"
        className="h-auto w-full"
        role="img"
        aria-label={`${L.building} → ${L.router} → ${L.tunnel} → ${L.cloud} → ${L.staff} / ${L.customer}`}
      >
        <Defs />

        {/* ── the building ─────────────────────────────── */}
        <Zone x={14} y={58} w={326} h={190} label={L.building} />
        <Node x={30} y={110} w={140} title={L.meter} sub={L.meterSub} accent={C.signal} fontSize={12.5} />
        <Node x={200} y={110} w={128} title={L.router} sub={L.routerSub} accent={C.signal} fontSize={12.5} />
        <Arrow d="M170,139 L193,139" />
        <Label x={185} y={180}>
          {L.link}
        </Label>
        <Label x={28} y={232} anchor="start">
          {L.cabinet}
        </Label>

        {/* ── carrier + tunnel ─────────────────────────── */}
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
        <text
          x={493}
          y={135}
          textAnchor="middle"
          fill={C.signal}
          fontSize="12.5"
          fontWeight="600"
          fontFamily={SANS}
        >
          {L.tunnel}
        </text>
        <text x={493} y={152} textAnchor="middle" fill={C.muted} fontSize="10.5" fontFamily={MONO}>
          {L.tunnelSub}
        </text>
        <Arrow d="M328,139 L377,139" colour={C.signal} marker="ahSignal" />
        <Label x={493} y={196}>
          {L.carrierSub}
        </Label>

        {/* ── Hetzner cloud ────────────────────────────── */}
        <Zone x={646} y={30} w={360} h={292} label={L.cloud} colour={C.data} />
        <Arrow d="M602,139 L665,139" colour={C.signal} marker="ahSignal" />

        <rect x={672} y={58} width={308} height={30} rx="6" fill={C.surface} stroke={C.data} strokeWidth="1" />
        <text x={826} y={78} textAnchor="middle" fill={C.data} fontSize="11" fontWeight="600" fontFamily={MONO}>
          {L.firewall}
        </text>

        <Node x={672} y={110} w={130} title={L.collector} fontSize={12.5} />
        <Node x={830} y={110} w={150} title={L.db} sub={L.dbSub} accent={C.data} fontSize={12.5} />
        <Arrow d="M802,139 L823,139" />

        <Node x={830} y={192} w={150} h={50} title={L.grafana} fontSize={12.5} />
        <Node x={830} y={254} w={150} h={50} title={L.app} fontSize={12.5} />
        <Arrow d="M905,168 L905,185" />
        <Arrow d="M845,168 L845,178 L812,178 L812,279 L823,279" />

        {/* ── consumers ────────────────────────────────── */}
        <Node x={1026} y={192} w={140} h={50} title={L.staff} sub={L.staffSub} accent={C.signal} fontSize={12.5} />
        <Node x={1026} y={254} w={140} h={50} title={L.customer} sub={L.customerSub} accent={C.data} fontSize={12.5} />
        <Arrow d="M980,217 L1019,217" />
        <Arrow d="M980,279 L1019,279" />

        <Label x={14} y={356} anchor="start" size={10.5}>
          {`← ${L.note}`}
        </Label>
      </svg>
    </DiagramFrame>
  );
}
