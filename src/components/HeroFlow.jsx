import React, { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../motion'
import './HeroFlow.css'

// The QA flow illustration: the path draws in from Requirements to Release,
// each stage appears as the line reaches it, then a small dot travels the
// path on a slow loop, highlighting each stage and checking off Release.
// Desktop gets the vertical drawing; small screens get a horizontal strip.
// The loop pauses when the illustration is off screen or the tab is hidden,
// and with prefers-reduced-motion everything is shown in its final state.

export const flow = [
  { x: 60, y: 70, label: 'Requirements', above: true },
  { x: 300, y: 130, label: 'Test design' },
  { x: 110, y: 250, label: 'Execution' },
  { x: 340, y: 330, label: 'Defects' },
  { x: 190, y: 440, label: 'Release', done: true },
]

/* ---------- Timing ---------- */
const DRAW_DELAY = 0.25 // s
const DRAW = 1.6 // s, ease-out (cubic-bezier(0.33, 1, 0.68, 1) = easeOutCubic)
const TRAVEL = 6000 // ms for the dot to go from start to end
const HOLD = 1200 // ms resting on Release before the next loop
const PERIOD = TRAVEL + HOLD
const LOOP_START = (DRAW_DELAY + DRAW + 0.4) * 1000
const HIT = 0.045 // how close (in path fraction) the dot must be to light a stage

// When an easeOutCubic draw reaches fraction f of the path
const reachTime = (f) => DRAW_DELAY + DRAW * (1 - Math.cbrt(1 - f))

/* ---------- Path geometry (computed once, no DOM reads) ---------- */
const SEGMENTS = flow.slice(1).map((n, i) => {
  const p = flow[i]
  // Same curve shape as before: leave each stage horizontally/vertically
  const c = [
    [[180, 70], [300, 60]],
    [[300, 200], [110, 180]],
    [[110, 320], [340, 260]],
    [[340, 400], [190, 380]],
  ][i]
  return [[p.x, p.y], c[0], c[1], [n.x, n.y]]
})

const PATH_D =
  `M${flow[0].x},${flow[0].y} ` +
  SEGMENTS.map(([, c1, c2, e]) => `C${c1.join(',')} ${c2.join(',')} ${e.join(',')}`).join(' ')

const bezier = ([p0, p1, p2, p3], t) => {
  const u = 1 - t
  const a = u * u * u
  const b = 3 * u * u * t
  const c = 3 * u * t * t
  const d = t * t * t
  return [a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]]
}

const TABLE = [] // [x, y, cumulativeLength]
const NODE_LENGTHS = [0]
{
  let len = 0
  let prev = [flow[0].x, flow[0].y]
  TABLE.push([prev[0], prev[1], 0])
  for (const seg of SEGMENTS) {
    for (let i = 1; i <= 120; i++) {
      const pt = bezier(seg, i / 120)
      len += Math.hypot(pt[0] - prev[0], pt[1] - prev[1])
      TABLE.push([pt[0], pt[1], len])
      prev = pt
    }
    NODE_LENGTHS.push(len)
  }
}
const TOTAL = TABLE[TABLE.length - 1][2]
const PATH_FRACTIONS = NODE_LENGTHS.map((l) => l / TOTAL)
const STRIP_FRACTIONS = flow.map((_, i) => i / (flow.length - 1))

function pointAt(f) {
  const target = f * TOTAL
  let lo = 0
  let hi = TABLE.length - 1
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1
    if (TABLE[mid][2] < target) lo = mid
    else hi = mid
  }
  const [x0, y0, l0] = TABLE[lo]
  const [x1, y1, l1] = TABLE[hi]
  const k = l1 === l0 ? 0 : (target - l0) / (l1 - l0)
  return [x0 + (x1 - x0) * k, y0 + (y1 - y0) * k]
}

/* ---------- Loop driver: rAF that pauses off screen / in hidden tabs ---------- */
function runLoop(root, onFrame) {
  let elapsed = 0
  let last = null
  let raf = 0
  let running = false
  let started = false
  let inView = false
  let tabVisible = !document.hidden

  const tick = (now) => {
    if (last !== null) elapsed += now - last
    last = now
    onFrame(elapsed)
    raf = requestAnimationFrame(tick)
  }
  const update = () => {
    const should = started && inView && tabVisible
    if (should && !running) {
      running = true
      last = null
      raf = requestAnimationFrame(tick)
    } else if (!should && running) {
      running = false
      cancelAnimationFrame(raf)
    }
  }

  const io = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting
    update()
  })
  io.observe(root)
  const onVisibility = () => {
    tabVisible = !document.hidden
    update()
  }
  document.addEventListener('visibilitychange', onVisibility)
  const timer = setTimeout(() => {
    started = true
    update()
  }, LOOP_START)

  return () => {
    clearTimeout(timer)
    cancelAnimationFrame(raf)
    io.disconnect()
    document.removeEventListener('visibilitychange', onVisibility)
  }
}

// One loop frame → dot progress, opacity, and which stage is lit.
function frameState(ms, fractions) {
  const cycle = ms % PERIOD
  const travel = Math.min(cycle / TRAVEL, 1)
  const p = 0.5 - 0.5 * Math.cos(Math.PI * travel) // gentle start and stop
  let opacity = 1
  if (cycle < 300) opacity = cycle / 300
  else if (cycle > PERIOD - 400) opacity = (PERIOD - cycle) / 400
  const hit = fractions.map((f, i) =>
    i === fractions.length - 1 ? travel >= 0.985 && cycle < TRAVEL + 500 : Math.abs(p - f) < HIT
  )
  return { p, opacity, hit, arrived: travel >= 0.985 }
}

/* ---------- Desktop: vertical drawing ---------- */
export function HeroDrawing() {
  const rootRef = useRef(null)
  const runnerRef = useRef(null)
  const nodeRefs = useRef([])

  useEffect(() => {
    if (prefersReducedMotion) return undefined
    return runLoop(rootRef.current, (ms) => {
      const { p, opacity, hit, arrived } = frameState(ms, PATH_FRACTIONS)
      const [x, y] = pointAt(p)
      const runner = runnerRef.current
      runner.style.transform = `translate(${x}px, ${y}px)`
      runner.style.opacity = opacity
      nodeRefs.current.forEach((el, i) => el.classList.toggle('is-hit', hit[i]))
      nodeRefs.current[flow.length - 1].classList.toggle('is-checked', arrived)
    })
  }, [])

  return (
    <svg ref={rootRef} className="hero-drawing" viewBox="0 0 520 520" aria-hidden="true" focusable="false">
      <path
        className="hd-path"
        pathLength="1"
        d={PATH_D}
        style={{ animationDelay: `${DRAW_DELAY}s`, animationDuration: `${DRAW}s` }}
      />
      {flow.map((n, i) => (
        <g
          key={n.label}
          ref={(el) => (nodeRefs.current[i] = el)}
          className="hd-node"
          style={{ '--d': `${Math.max(0, reachTime(PATH_FRACTIONS[i]) - 0.05).toFixed(3)}s` }}
        >
          <circle className="hd-halo" cx={n.x} cy={n.y} r={n.done ? 22 : 16} />
          <circle className={`hd-dot ${n.done ? 'is-done' : ''}`} cx={n.x} cy={n.y} r={n.done ? 12 : 7} />
          {n.done && <path className="hd-check" d={`M${n.x - 5},${n.y} l3.5,3.5 l6.5,-7`} />}
          <text x={n.above ? n.x - 7 : n.x + (n.done ? 22 : 18)} y={n.above ? n.y - 18 : n.y + 4.5}>
            {n.label}
          </text>
        </g>
      ))}
      <g ref={runnerRef} className="hd-runner">
        <circle r="9" className="hd-runner-glow" />
        <circle r="4.5" className="hd-runner-dot" />
      </g>
      <g className="hd-sheet" style={{ animationDelay: `${DRAW_DELAY + DRAW}s` }}>
        <rect x="350" y="390" width="140" height="100" rx="12" />
        <line x1="368" y1="410" x2="420" y2="410" className="hd-bar" />
        {[432, 454, 476].map((y, i) => (
          <g key={y}>
            <rect x="368" y={y - 6} width="12" height="12" rx="3" />
            {i < 2 && <path className="hd-tick" d={`M370.5,${y} l2.5,2.5 l5,-5`} />}
            <line x1="390" y1={y} x2={i === 1 ? 448 : 470} y2={y} className="hd-bar is-light" />
          </g>
        ))}
      </g>
    </svg>
  )
}

/* ---------- Small screens: horizontal strip ---------- */
export function HeroFlowStrip() {
  const rootRef = useRef(null)
  const runnerRef = useRef(null)
  const nodeRefs = useRef([])

  useEffect(() => {
    if (prefersReducedMotion) return undefined
    const root = rootRef.current
    // Dot centres sit at 10% and 90% of the strip (five equal columns)
    let from = 0
    let span = 0
    const measure = () => {
      const w = root.clientWidth
      from = w * 0.1
      span = w * 0.8
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(root)
    const stop = runLoop(root, (ms) => {
      const { p, opacity, hit, arrived } = frameState(ms, STRIP_FRACTIONS)
      const runner = runnerRef.current
      runner.style.transform = `translate(${from + span * p}px, -50%) translateX(-50%)`
      runner.style.opacity = opacity
      nodeRefs.current.forEach((el, i) => el.classList.toggle('is-hit', hit[i]))
      nodeRefs.current[flow.length - 1].classList.toggle('is-checked', arrived)
    })
    return () => {
      ro.disconnect()
      stop()
    }
  }, [])

  return (
    <div ref={rootRef} className="hero-flow-strip" aria-hidden="true">
      <span
        className="hfs-line"
        style={{ animationDelay: `${DRAW_DELAY}s`, animationDuration: `${DRAW}s` }}
      />
      <ol className="hfs-list">
        {flow.map((n, i) => (
          <li
            key={n.label}
            ref={(el) => (nodeRefs.current[i] = el)}
            className={n.done ? 'is-done' : undefined}
            style={{ '--d': `${Math.max(0, reachTime(STRIP_FRACTIONS[i]) - 0.05).toFixed(3)}s` }}
          >
            <span className="hfs-dot">
              <span className="hfs-halo" />
              {n.done && (
                <svg viewBox="0 0 12 12">
                  <path d="M2.5 6.2 l2.3 2.3 l4.7 -5" />
                </svg>
              )}
            </span>
            <span className="hfs-label">{n.label}</span>
          </li>
        ))}
      </ol>
      <span ref={runnerRef} className="hfs-runner" />
    </div>
  )
}
