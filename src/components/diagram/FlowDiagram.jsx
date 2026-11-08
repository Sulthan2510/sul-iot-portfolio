import React from 'react';
import { usePalette } from '../../theme';
import { MONO, SANS } from './primitives';

/**
 * Source-to-target data flow, in two variants.
 *
 *   variant="thumb" — a compact serpentine preview that fits beside a card
 *   variant="full"  — a wide horizontal run with packets travelling along the
 *                     wires, so you can watch data move from source to target
 *
 * `stages` = [{ label, sub }]  (first = source, last = target)
 */

const PACKET_SECONDS = 1.6;

function Packet({ x1, x2, y, delay, colour, r = 4 }) {
  return (
    <circle r={r} cy={y} fill={colour}>
      <animate
        attributeName="cx"
        from={x1}
        to={x2}
        dur={`${PACKET_SECONDS}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0;1;1;0"
        keyTimes="0;0.15;0.85;1"
        dur={`${PACKET_SECONDS}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
      />
    </circle>
  );
}

/* ── Full: horizontal, animated ─────────────────────────────────────────── */
function FullFlow({ stages, animated }) {
  const c = usePalette();
  const NODE_W = 152;
  const NODE_H = 64;
  const GAP = 62;
  const PAD = 14;
  const y = 70;
  const width = PAD * 2 + stages.length * NODE_W + (stages.length - 1) * GAP;
  const height = 190;

  const xOf = (i) => PAD + i * (NODE_W + GAP);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`h-auto w-full ${animated ? 'flow-animated' : ''}`}
      style={{ minWidth: Math.min(width, 980) }}
      role="img"
      aria-label={stages.map((s) => s.label).join(' → ')}
    >
      <defs>
        <marker id="flowArrow" markerWidth="7" markerHeight="7" refX="5.5" refY="2.5" orient="auto">
          <path d="M0,0 L6,2.5 L0,5 Z" fill={c.faint} />
        </marker>
      </defs>

      {/* wires */}
      {stages.slice(0, -1).map((_, i) => {
        const x1 = xOf(i) + NODE_W;
        const x2 = xOf(i + 1);
        return (
          <g key={`w${i}`}>
            <line
              className="flow-wire"
              x1={x1}
              y1={y + NODE_H / 2}
              x2={x2 - 8}
              y2={y + NODE_H / 2}
              stroke={c.faint}
              strokeWidth="1.6"
              markerEnd="url(#flowArrow)"
            />
            {animated && (
              <Packet
                x1={x1 + 4}
                x2={x2 - 10}
                y={y + NODE_H / 2}
                delay={(i * PACKET_SECONDS) / stages.length}
                colour={c.signal}
              />
            )}
          </g>
        );
      })}

      {/* nodes */}
      {stages.map((s, i) => {
        const x = xOf(i);
        const isEnd = i === 0 || i === stages.length - 1;
        const accent = i === 0 ? c.signal : i === stages.length - 1 ? c.data : c.line;
        return (
          <g key={s.label}>
            <rect
              x={x}
              y={y}
              width={NODE_W}
              height={NODE_H}
              rx="9"
              fill={c.raised}
              stroke={accent}
              strokeWidth={isEnd ? 1.4 : 1}
            />
            <text
              x={x + NODE_W / 2}
              y={s.sub ? y + 27 : y + 37}
              textAnchor="middle"
              fill={c.ink}
              fontSize="13"
              fontWeight="600"
              fontFamily={SANS}
            >
              {s.label}
            </text>
            {s.sub && (
              <text
                x={x + NODE_W / 2}
                y={y + 44}
                textAnchor="middle"
                fill={c.faint}
                fontSize="10.5"
                fontFamily={MONO}
              >
                {s.sub}
              </text>
            )}
            <text
              x={x + NODE_W / 2}
              y={y - 14}
              textAnchor="middle"
              fill={i === 0 ? c.signal : i === stages.length - 1 ? c.data : c.faint}
              fontSize="9.5"
              letterSpacing="1.2"
              fontFamily={MONO}
            >
              {String(i + 1).padStart(2, '0')}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ── Thumb: serpentine preview, sized so its labels stay readable ───────── */
function ThumbFlow({ stages }) {
  const c = usePalette();
  const perRow = 3;
  const NODE_W = 88;
  const NODE_H = 34;
  const GAP_X = 18;
  const GAP_Y = 30;
  const PAD = 8;
  const rows = Math.ceil(stages.length / perRow);
  const width = PAD * 2 + perRow * NODE_W + (perRow - 1) * GAP_X;
  const height = PAD * 2 + rows * NODE_H + (rows - 1) * GAP_Y;

  const pos = (i) => {
    const row = Math.floor(i / perRow);
    const col = row % 2 === 0 ? i % perRow : perRow - 1 - (i % perRow); // serpentine
    return { x: PAD + col * (NODE_W + GAP_X), y: PAD + row * (NODE_H + GAP_Y), row, col };
  };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="flow-animated h-auto w-full"
      role="img"
      aria-label={stages.map((s) => s.label).join(' → ')}
    >
      {stages.slice(0, -1).map((_, i) => {
        const a = pos(i);
        const b = pos(i + 1);
        let d;
        if (a.row === b.row) {
          const left = a.x < b.x;
          d = left
            ? `M${a.x + NODE_W},${a.y + NODE_H / 2} L${b.x},${b.y + NODE_H / 2}`
            : `M${a.x},${a.y + NODE_H / 2} L${b.x + NODE_W},${b.y + NODE_H / 2}`;
        } else {
          // drop to the next row on the same side
          const cx = a.x + NODE_W / 2;
          d = `M${cx},${a.y + NODE_H} L${cx},${b.y}`;
        }
        return (
          <path
            key={`t${i}`}
            className="flow-wire"
            d={d}
            stroke={c.faint}
            strokeWidth="1.3"
            fill="none"
          />
        );
      })}

      {stages.map((s, i) => {
        const { x, y } = pos(i);
        const accent = i === 0 ? c.signal : i === stages.length - 1 ? c.data : c.line;
        return (
          <g key={s.label}>
            <rect
              x={x}
              y={y}
              width={NODE_W}
              height={NODE_H}
              rx="6"
              fill={c.raised}
              stroke={accent}
              strokeWidth="1"
            />
            <text
              x={x + NODE_W / 2}
              y={y + NODE_H / 2 + 3.5}
              textAnchor="middle"
              fill={c.muted}
              fontSize="9.5"
              fontFamily={MONO}
            >
              {s.short || s.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function FlowDiagram({ stages, variant = 'full', animated = true }) {
  if (!stages || stages.length < 2) return null;
  return variant === 'thumb' ? (
    <ThumbFlow stages={stages} />
  ) : (
    <FullFlow stages={stages} animated={animated} />
  );
}
