import { SPRITES, PAL } from '@/sprites';

export default function PixelArt({ name, scale = 4, tint = {}, className = '', style = {} }) {
  const rows = SPRITES[name] || [];
  const palette = { ...PAL, ...tint };
  const w = Math.max(...rows.map((r) => r.length), 1);
  const h = rows.length;
  const rects = [];
  rows.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      const c = palette[ch];
      if (c) rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={1.05} height={1.05} fill={c} />);
    });
  });
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w * scale}
      height={h * scale}
      shapeRendering="crispEdges"
      className={`pixelated ${className}`}
      style={style}
      aria-hidden="true"
    >
      {rects}
    </svg>
  );
}
