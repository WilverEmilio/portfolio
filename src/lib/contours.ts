/**
 * Curvas de nivel decorativas para el Hero (elemento distintivo del diseño "Plano").
 * Se calculan en el build: devuelven atributos `d` de <path> SVG, sin JavaScript en el navegador.
 * Deterministas (sin Math.random) para que el HTML sea idéntico en cada build.
 */
export function contourPaths({
  count = 9,
  cx = 50,
  cy = 50,
  minR = 8,
  maxR = 48,
  points = 48,
}: { count?: number; cx?: number; cy?: number; minR?: number; maxR?: number; points?: number } = {}): string[] {
  const paths: string[] = [];
  for (let k = 0; k < count; k++) {
    const r = minR + ((maxR - minR) * k) / (count - 1);
    const pts: [number, number][] = [];
    for (let i = 0; i < points; i++) {
      const a = (i / points) * Math.PI * 2;
      // Ondulación suave que varía con cada nivel: parece terreno, no un círculo perfecto.
      const wobble =
        1 + 0.07 * Math.sin(3 * a + k * 0.55) + 0.045 * Math.sin(5 * a - k * 0.8) + 0.025 * Math.cos(2 * a + k * 1.3);
      pts.push([cx + Math.cos(a) * r * wobble * 1.05, cy + Math.sin(a) * r * wobble * 0.92]);
    }
    paths.push(closedCatmullRom(pts));
  }
  return paths;
}

/** Curva cerrada suave que pasa por todos los puntos (Catmull-Rom → Bézier cúbica). */
function closedCatmullRom(p: [number, number][]): string {
  const n = p.length;
  const f = (x: number) => x.toFixed(2);
  let d = `M${f(p[0][0])} ${f(p[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = p[(i - 1 + n) % n];
    const p1 = p[i];
    const p2 = p[(i + 1) % n];
    const p3 = p[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d + "Z";
}
