import React, { createContext, useContext } from 'react';
import { usePalette } from '../../theme';

/* Shared building blocks for the hand-drawn architecture diagrams.
   Every diagram is a plain SVG using the live theme colours, so they all
   read as one family and follow light/dark with the rest of the site. */

const FALLBACK = {
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
  bronze: '#b45309',
  silver: '#94a3b8',
  band: '#0b1017',
};

const PaletteContext = createContext(FALLBACK);
export const useDiagramColours = () => useContext(PaletteContext);

/* `C.signal` is a sentinel meaning "the themed signal colour". Components
   pass these around at module scope; they resolve at render time. */
export const C = Object.keys(FALLBACK).reduce((acc, k) => {
  acc[k] = `token:${k}`;
  return acc;
}, {});

function useColour(value) {
  const colours = useDiagramColours();
  if (typeof value === 'string' && value.startsWith('token:')) {
    const key = value.slice(6);
    return colours[key] || FALLBACK[key];
  }
  return value;
}

export const MONO = "'JetBrains Mono', monospace";
export const SANS = 'Inter, sans-serif';

/* Wrapper: supplies the themed palette and scrolls wide diagrams on narrow
   screens so they stay legible. */
export function DiagramFrame({ children, minWidth = 940, caption, bare = false }) {
  const palette = usePalette();
  const body = (
    <PaletteContext.Provider value={palette}>{children}</PaletteContext.Provider>
  );

  if (bare) return <PaletteContext.Provider value={palette}>{children}</PaletteContext.Provider>;

  return (
    <figure className="m-0">
      <div className="overflow-x-auto rounded-xl border border-line bg-surface p-4 sm:p-6">
        <div style={{ minWidth }}>{body}</div>
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
  const c = useDiagramColours();
  return (
    <defs>
      <marker id="ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L7,3 L0,6 Z" fill={c.faint} />
      </marker>
      <marker id="ahSignal" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L7,3 L0,6 Z" fill={c.signal} />
      </marker>
      <marker id="ahData" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L7,3 L0,6 Z" fill={c.data} />
      </marker>
      <marker id="ahStart" markerWidth="8" markerHeight="8" refX="2" refY="3" orient="auto">
        <path d="M7,0 L0,3 L7,6 Z" fill={c.faint} />
      </marker>
      <linearGradient id="tunnelGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={c.signal} stopOpacity="0.12" />
        <stop offset="50%" stopColor={c.signal} stopOpacity="0.32" />
        <stop offset="100%" stopColor={c.data} stopOpacity="0.12" />
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
  const c = useDiagramColours();
  const stroke = useColour(accent);
  const bg = useColour(fill);
  const text = useColour(titleFill);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" fill={bg} stroke={stroke} strokeWidth="1" />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 4 : y + h / 2 + 4}
        textAnchor="middle"
        fill={text}
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
          fill={c.faint}
          fontSize="10"
          fontFamily={MONO}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

export function Chip({ x, y, w = 150, h = 30, label, accent = C.line, fill = C.surface }) {
  const c = useDiagramColours();
  const stroke = useColour(accent);
  const bg = useColour(fill);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6" fill={bg} stroke={stroke} strokeWidth="1" />
      <text
        x={x + w / 2}
        y={y + h / 2 + 4}
        textAnchor="middle"
        fill={c.muted}
        fontSize="11"
        fontFamily={MONO}
      >
        {label}
      </text>
    </g>
  );
}

export function Zone({ x, y, w, h, label, colour = C.line, labelFill }) {
  const stroke = useColour(colour);
  const text = useColour(labelFill || colour);
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="12"
        fill="transparent"
        stroke={stroke}
        strokeWidth="1"
        strokeDasharray="5 5"
        opacity="0.75"
      />
      {label && (
        <text
          x={x + 12}
          y={y + 18}
          fill={text}
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

export function Band({ x, y, w, h, label, colour = C.line }) {
  const c = useDiagramColours();
  const stroke = useColour(colour);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="10" fill={c.band} stroke={stroke} strokeWidth="1" />
      <text
        x={x + 16}
        y={y + h / 2 + 4}
        fill={c.muted}
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
  const stroke = useColour(colour);
  return (
    <path
      d={d}
      stroke={stroke}
      strokeWidth={width}
      fill="none"
      strokeDasharray={dashed ? '4 4' : undefined}
      markerEnd={`url(#${marker})`}
    />
  );
}

export function BiArrow({ d, colour = C.faint }) {
  const stroke = useColour(colour);
  return (
    <path
      d={d}
      stroke={stroke}
      strokeWidth="1.4"
      fill="none"
      markerEnd="url(#ah)"
      markerStart="url(#ahStart)"
    />
  );
}

export function Label({ x, y, children, fill = C.faint, size = 10, anchor = 'middle', weight }) {
  const text = useColour(fill);
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fill={text}
      fontSize={size}
      fontWeight={weight}
      fontFamily={MONO}
    >
      {children}
    </text>
  );
}
