import * as THREE from 'three'
import { spherePoint } from './avatar-geometry'
import { HEAD_RADIUS } from './avatar-head'
import type { AvatarMaterials } from './avatar-materials'

// The hair is ~140 tapered locks laid over the scalp, no solid cap underneath.
// A fixed seed keeps the "random" variation identical on every visit.
const HAIR_SEED = 7
const LOCK_POINTS = 12
const LOCK_SEGMENTS = 32
const LOCK_SIDES = 10
const SCALP_GAP = 0.035
const ROOT_TAPER_END = 0.3
const TIP_FLICK_START = 0.7

// Where a lock rooted at a given point along the middle part falls to.
// theta runs along the part from the front hairline (1.02) back to the crown (2.1).
const PART_FLOW = [
  { theta: 1.02, azimuth: 0.42, elevation: 0.36 },
  { theta: 1.25, azimuth: 0.85, elevation: 0.24 },
  { theta: 1.5, azimuth: 1.35, elevation: 0.2 },
  { theta: 1.75, azimuth: 1.75, elevation: 0.12 },
  { theta: 1.95, azimuth: 2.15, elevation: -0.1 },
  { theta: 2.1, azimuth: 2.55, elevation: -0.38 },
] as const
const PART_START = 1.02
const PART_LENGTH = 1.08

type LockShape = {
  width: number
  lift: number
  flick: number
  bend: number
}

function createRandom(seed: number) {
  let state = seed
  return () => {
    state = (state * 16807) % 2147483647
    return state / 2147483647
  }
}

function unitPoint(azimuth: number, elevation: number) {
  return spherePoint(azimuth, elevation, 1)
}

function flowAt(theta: number) {
  for (let i = 1; i < PART_FLOW.length; i++) {
    const from = PART_FLOW[i - 1]
    const to = PART_FLOW[i]
    if (!from || !to || theta > to.theta) continue
    const t = Math.max(0, (theta - from.theta) / (to.theta - from.theta))
    return {
      azimuth: from.azimuth + (to.azimuth - from.azimuth) * t,
      elevation: from.elevation + (to.elevation - from.elevation) * t,
    }
  }
  return PART_FLOW[PART_FLOW.length - 1] ?? PART_FLOW[0]
}

// Width along a lock: thin at the root, full by 30%, then tapering to a point.
function lockWidthAt(t: number) {
  return t < ROOT_TAPER_END ? 0.45 + (0.55 * t) / ROOT_TAPER_END : 1 - ((t - ROOT_TAPER_END) / (1 - ROOT_TAPER_END)) * 0.85
}

function createLockGeometry(start: THREE.Vector3, end: THREE.Vector3, shape: LockShape) {
  const points: THREE.Vector3[] = []
  for (let i = 0; i <= LOCK_POINTS; i++) {
    const t = i / LOCK_POINTS
    const flick = t < TIP_FLICK_START ? 0 : ((t - TIP_FLICK_START) / (1 - TIP_FLICK_START)) ** 2
    const direction = start.clone().lerp(end, t)
    direction.x += shape.bend * Math.sin(Math.PI * t)
    direction.normalize()
    const radius = HEAD_RADIUS + SCALP_GAP + shape.lift * 1.6 * Math.sin(Math.PI * t) + shape.flick * flick
    points.push(direction.multiplyScalar(radius))
  }

  const curve = new THREE.CatmullRomCurve3(points)
  const geometry = new THREE.TubeGeometry(curve, LOCK_SEGMENTS, 1, LOCK_SIDES, false)
  const positions = geometry.getAttribute('position')
  const vertex = new THREE.Vector3()
  const outward = new THREE.Vector3()

  // Taper each ring and flatten it against the scalp so locks look sculpted, not round.
  for (let i = 0; i <= LOCK_SEGMENTS; i++) {
    const t = i / LOCK_SEGMENTS
    const center = curve.getPointAt(t)
    const width = shape.width * 1.3 * lockWidthAt(t)
    outward.copy(center).normalize()
    for (let j = 0; j <= LOCK_SIDES; j++) {
      const index = i * (LOCK_SIDES + 1) + j
      vertex.fromBufferAttribute(positions, index).sub(center)
      vertex.addScaledVector(outward, -vertex.dot(outward) * 0.5)
      vertex.multiplyScalar(width).add(center)
      positions.setXYZ(index, vertex.x, vertex.y, vertex.z)
    }
  }
  geometry.computeVertexNormals()
  return geometry
}

export function addHair(head: THREE.Group, hairShades: AvatarMaterials['hairShades']) {
  const random = createRandom(HAIR_SEED)
  let lockCount = 0

  const addLock = (start: THREE.Vector3, end: THREE.Vector3, shape: LockShape) => {
    const material = hairShades[lockCount % hairShades.length] ?? hairShades[0]
    lockCount += 1
    head.add(new THREE.Mesh(createLockGeometry(start, end, shape), material))
  }

  // Locks rooted along the middle part, sweeping out and down to each side.
  const addPartLayer = (side: number, count: number, partOffset: number, shape: LockShape, phase: number) => {
    for (let i = 0; i < count; i++) {
      const theta = PART_START + ((i + phase) / count) * PART_LENGTH
      const start = new THREE.Vector3(side * partOffset, Math.sin(theta), Math.cos(theta)).normalize()
      const flow = flowAt(theta)
      const end = unitPoint(side * (flow.azimuth + (random() - 0.5) * 0.08), flow.elevation + (random() - 0.5) * 0.06)
      addLock(start, end, { ...shape, width: shape.width * (0.9 + random() * 0.2), bend: side * shape.bend })
    }
  }

  for (const side of [-1, 1]) {
    addPartLayer(side, 18, 0.03, { width: 0.15, lift: 0.05, flick: 0.04, bend: 0.05 }, 0)
    addPartLayer(side, 14, 0.06, { width: 0.1, lift: 0.085, flick: 0.06, bend: 0.08 }, 0.5)
    addPartLayer(side, 12, 0.05, { width: 0.05, lift: 0.115, flick: 0.05, bend: 0.07 }, 0.25)

    // Back of the head: long locks to the nape, then shorter layers on top for depth.
    for (let k = 0; k < 11; k++) {
      addLock(
        unitPoint(side * (Math.PI - 0.06 - k * 0.04), 1.0 + random() * 0.12),
        unitPoint(side * (Math.PI - 0.08 - k * 0.115), -0.6 - random() * 0.15),
        { width: 0.16, lift: 0.045, flick: 0.07, bend: 0 },
      )
    }
    for (let k = 0; k < 9; k++) {
      addLock(
        unitPoint(side * (Math.PI - 0.1 - k * 0.05), 1.05),
        unitPoint(side * (Math.PI - 0.15 - k * 0.13), -0.26 - random() * 0.1),
        { width: 0.11, lift: 0.08, flick: 0.05, bend: 0 },
      )
    }
    for (let k = 0; k < 7; k++) {
      addLock(
        unitPoint(side * (Math.PI - 0.08 - k * 0.06), 1.12),
        unitPoint(side * (Math.PI - 0.2 - k * 0.15), 0.1 - random() * 0.15),
        { width: 0.05, lift: 0.11, flick: 0.04, bend: 0 },
      )
    }

    // Sides: above the ear in front, down to the nape behind it.
    for (let k = 0; k < 9; k++) {
      const azimuth = 1.0 + k * 0.17
      const start = unitPoint(side * azimuth, 0.82 + random() * 0.08)
      const endElevation = azimuth < 1.85 ? 0.16 : -0.45 - random() * 0.1
      addLock(
        start,
        unitPoint(side * (azimuth + 0.25), endElevation),
        { width: 0.15, lift: 0.04, flick: 0.05, bend: 0 },
      )
    }
  }
}
