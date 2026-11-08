import React from 'react';

/* Shared building blocks for the hand-drawn architecture diagrams.
   Every diagram is a plain SVG using the site's theme colours, so they all
   read as one family rather than a pile of screenshots. */

export const C = {
  line: '#1e2733',
  surface: '#0e131b',
  raised: '#151c26',
  ink: '#e8eef6',
  muted: '#93a1b1',
  faint: '#64748b',
  signal: '#34d399',
  data: '#38bdf8',
  warn: '#f59e0b',
  violet: '#a78bfa',
};

export const MONO = "'JetBrains Mono', monospace";
export const SANS = 'Inter, sans-serif';

/* Wrapper: scrolls horizontally on narrow screens so a wide diagram stays legible. */
export function DiagramFrame({ children, minWidth = 940, caption }) {
  return (
    <figure className="m-0">
      <div className="overflow-x-auto rounded-xl border border-line bg-surface p-4 sm:p-6">
        <div style={{ minWidth }}>{children}</div>
      </div>
      {caption && (
        <figcaption className="mt-3 font-mono text-[11px] leading-relaxed text-faint">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function Defs() {
  return (
    <defs>
      <marker id="ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L7,3 L0,6 Z" fill={C.faint} />
      </marker>
      <marker id="ahSignal" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L7,3 L0,6 Z" fill={C.signal} />
      </marker>
      <marker id="ahData" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L7,3 L0,6 Z" fill={C.data} />
      </marker>
      <marker id="ahStart" markerWidth="8" markerHeight="8" refX="2" refY="3" orient="auto">
        <path d="M7,0 L0,3 L7,6 Z" fill={C.faint} />
      </marker>
      <linearGradient id="tunnelGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={C.signal} stopOpacity="0.12" />
        <stop offset="50%" stopColor={C.signal} stopOpacity="0.32" />
        <stop offset="100%" stopColor={C.data} stopOpacity="0.12" />
      </linearGradient>
    </defs>
  );
}

export function Node({
  x,
  y,
  w = 130,
  h = 58,
  title,
  sub,
  accent = C.line,
  fill = C.raised,
  titleFill = C.ink,
  fontSize = 12,
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" fill={fill} stroke={accent} strokeWidth="1" />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 4 : y + h / 2 + 4}
        textAnchor="middle"
        fill={titleFill}
        fontSize={fontSize}
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
          fontSize="10"
          fontFamily={MONO}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

/* A small labelled chip — for technology lists inside a zone. */
export function Chip({ x, y, w = 150, h = 30, label, accent = C.line, fill = C.surface }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6" fill={fill} stroke={accent} strokeWidth="1" />
      <text
        x={x + w / 2}
        y={y + h / 2 + 4}
        textAnchor="middle"
        fill={C.muted}
        fontSize="11"
        fontFamily={MONO}
      >
        {label}
      </text>
    </g>
  );
}

/* Dashed grouping box with an uppercase mono label in its top-left. */
export function Zone({ x, y, w, h, label, colour = C.line, labelFill }) {
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
      {label && (
        <text
          x={x + 12}
          y={y + 18}
          fill={labelFill || colour}
          fontSize="10"
          fontWeight="600"
          letterSpacing="1.4"
          fontFamily={MONO}
        >
          {label.toUpperCase()}
        </text>
      )}
    </g>
  );
}

/* Solid band with a label column on the left — used for layered architectures. */
export function Band({ x, y, w, h, label, colour = C.line }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="10" fill="#0b1017" stroke={colour} strokeWidth="1" />
      <text
        x={x + 16}
        y={y + h / 2 + 4}
        fill={C.muted}
        fontSize="12"
        fontWeight="700"
        fontFamily={SANS}
      >
        {label}
      </text>
    </g>
  );
}

export function Arrow({ d, colour = C.faint, marker = 'ah', dashed = false, width = 1.4 }) {
  return (
    <path
      d={d}
      stroke={colour}
      strokeWidth={width}
      fill="none"
      strokeDasharray={dashed ? '4 4' : undefined}
      markerEnd={`url(#${marker})`}
    />
  );
}

/* Arrowheads at both ends — for read/write relationships. */
export function BiArrow({ d, colour = C.faint }) {
  return (
    <path
      d={d}
      stroke={colour}
      strokeWidth="1.4"
      fill="none"
      markerEnd="url(#ah)"
      markerStart="url(#ahStart)"
    />
  );
}

export function Label({ x, y, children, fill = C.faint, size = 10, anchor = 'middle', weight }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fill={fill}
      fontSize={size}
      fontWeight={weight}
      fontFamily={MONO}
    >
      {children}
    </text>
  );
}
