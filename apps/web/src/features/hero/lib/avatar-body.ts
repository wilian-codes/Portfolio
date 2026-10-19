import * as THREE from 'three'
import { addMesh, SIDES, sphere } from './avatar-geometry'
import type { AvatarMaterials } from './avatar-materials'

type Point2 = [number, number]
type Edge = (t: number) => Point2

// The torso is a lathe (a profile spun around the y axis), squashed front to back.
const TORSO_DEPTH = 0.72
const TORSO_PROFILE: Point2[] = [
  [0, 1.4],
  [0.355, 1.41],
  [0.37, 1.55],
  [0.375, 1.8],
  [0.385, 2.05],
  [0.395, 2.28],
  [0.375, 2.44],
  [0.31, 2.54],
  [0.17, 2.61],
  [0, 2.62],
]
const V_NECK_BOTTOM: Point2 = [0, 1.93]
export const ARM_REST_ANGLE = 0.2

function torsoRadiusAt(y: number) {
  for (let i = 2; i < TORSO_PROFILE.length; i++) {
    const below = TORSO_PROFILE[i - 1]
    const above = TORSO_PROFILE[i]
    if (!below || !above || y > above[1]) continue
    const t = Math.max(0, (y - below[1]) / (above[1] - below[1]))
    return below[0] + (above[0] - below[0]) * t
  }
  return 0
}

// How far the torso's front surface sits from the center at (x, y).
function torsoFrontZ(x: number, y: number) {
  const radius = torsoRadiusAt(y)
  return TORSO_DEPTH * Math.sqrt(Math.max(radius * radius - x * x, 0))
}

function line(from: Point2, to: Point2): Edge {
  return (t) => [from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t]
}

// An edge that walks along several connected points at an even pace.
function polyline(points: Point2[]): Edge {
  const segments: { from: Point2; to: Point2; start: number; length: number }[] = []
  let total = 0
  for (let i = 1; i < points.length; i++) {
    const from = points[i - 1]
    const to = points[i]
    if (!from || !to) continue
    const length = Math.hypot(to[0] - from[0], to[1] - from[1])
    segments.push({ from, to, start: total, length })
    total += length
  }

  return (t) => {
    const distance = t * total
    const segment = segments.find((s) => distance <= s.start + s.length) ?? segments[segments.length - 1]
    if (!segment) return [0, 0]
    const u = segment.length === 0 ? 0 : (distance - segment.start) / segment.length
    return line(segment.from, segment.to)(u)
  }
}

// A thin panel between two edges, wrapped onto the torso front (shirt, tie, lapels).
function addTorsoPanel(
  body: THREE.Group,
  edgeA: Edge,
  edgeB: Edge,
  rows: number,
  columns: number,
  offset: number,
  material: THREE.Material,
) {
  const positions: number[] = []
  const uvs: number[] = []
  const indices: number[] = []
  for (let i = 0; i <= rows; i++) {
    const t = i / rows
    const [ax, ay] = edgeA(t)
    const [bx, by] = edgeB(t)
    for (let j = 0; j <= columns; j++) {
      const u = j / columns
      const x = ax + (bx - ax) * u
      const y = ay + (by - ay) * u
      positions.push(x, y, torsoFrontZ(x, y) + offset)
      uvs.push(u, t)
    }
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const a = i * (columns + 1) + j
      const b = a + columns + 1
      indices.push(a, b, a + 1, b, b + 1, a + 1)
    }
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  return addMesh(body, geometry, material)
}

function addSuitFront(body: THREE.Group, materials: AvatarMaterials) {
  addTorsoPanel(body, line([-0.17, 2.62], V_NECK_BOTTOM), line([0.17, 2.62], V_NECK_BOTTOM), 12, 6, 0.006, materials.shirtPanel)
  for (const side of SIDES) {
    addTorsoPanel(body, line([side * 0.025, 2.63], [side * 0.075, 2.5]), line([side * 0.125, 2.61], [side * 0.075, 2.5]), 4, 3, 0.03, materials.shirtPanel)
  }

  addMesh(body, new THREE.CylinderGeometry(0.05, 0.03, 0.07, 4), materials.tieKnot, {
    position: [0, 2.53, torsoFrontZ(0, 2.53) + 0.025],
    scale: [1, 1, 0.45],
    rotation: [0, Math.PI / 4, 0],
  })
  const tieHalfWidth = (t: number) => (t < 0.88 ? 0.032 + (0.03 * t) / 0.88 : 0.062 * (1 - (t - 0.88) / 0.12))
  addTorsoPanel(body, (t) => [-tieHalfWidth(t), 2.5 - 0.55 * t], (t) => [tieHalfWidth(t), 2.5 - 0.55 * t], 14, 3, 0.016, materials.tie)

  for (const side of SIDES) {
    const notchedLapelEdge = polyline([
      [side * 0.235, 2.63],
      [side * 0.285, 2.47],
      [side * 0.248, 2.44],
      [side * 0.305, 2.38],
      [side * 0.02, 1.91],
    ])
    addTorsoPanel(body, line([side * 0.17, 2.62], [side * 0.002, V_NECK_BOTTOM[1]]), notchedLapelEdge, 16, 4, 0.024, materials.lapel)
  }

  for (const y of [1.86, 1.66]) {
    addMesh(body, new THREE.CylinderGeometry(0.03, 0.03, 0.015, 16), materials.button, {
      position: [0.015, y, torsoFrontZ(0.015, y) + 0.012],
      rotation: [Math.PI / 2, 0, 0],
    })
  }
  addTorsoPanel(body, line([-0.004, 1.41], [-0.004, 1.92]), line([0.004, 1.41], [0.004, 1.92]), 6, 1, 0.004, materials.button)
  addTorsoPanel(body, line([0.13, 2.2], [0.29, 2.21]), line([0.13, 2.18], [0.29, 2.19]), 1, 4, 0.004, materials.suitShade)
  addTorsoPanel(body, line([0.16, 2.2], [0.24, 2.2]), line([0.19, 2.25], [0.22, 2.24]), 1, 2, 0.006, materials.shirtPanel)
  for (const side of SIDES) {
    addTorsoPanel(body, line([side * 0.12, 1.68], [side * 0.32, 1.67]), line([side * 0.12, 1.63], [side * 0.32, 1.62]), 1, 4, 0.004, materials.suitShade)
  }
}

function addArm(body: THREE.Group, materials: AvatarMaterials, side: number) {
  const arm = new THREE.Group()
  arm.position.set(side * 0.36, 2.42, 0)
  arm.rotation.z = side * ARM_REST_ANGLE
  body.add(arm)
  addMesh(arm, sphere(0.135), materials.suit, { scale: [1, 0.85, 1] })
  addMesh(arm, new THREE.CylinderGeometry(0.135, 0.115, 0.95, 24), materials.suit, { position: [0, -0.5, 0] })
  addMesh(arm, new THREE.CylinderGeometry(0.1, 0.1, 0.07, 20), materials.shirt, { position: [0, -1.0, 0] })
  for (const y of [-0.9, -0.86]) {
    addMesh(arm, sphere(0.014, 8, 6), materials.button, { position: [side * 0.06, y, 0.09] })
  }
  addMesh(arm, sphere(0.09), materials.skin, { position: [0, -1.12, 0], scale: [0.85, 1.2, 0.62] })
  addMesh(arm, sphere(0.04), materials.skin, { position: [side * -0.05, -1.07, 0.04] })
  return arm
}

export function buildBody(materials: AvatarMaterials) {
  const body = new THREE.Group()
  const lathePoints = TORSO_PROFILE.map(([x, y]) => new THREE.Vector2(x, y))
  addMesh(body, new THREE.LatheGeometry(lathePoints, 48), materials.suit, { scale: [1, 1, TORSO_DEPTH] })
  addMesh(body, new THREE.CylinderGeometry(0.105, 0.105, 0.14, 20), materials.skin, { position: [0, 2.66, 0] })
  addMesh(body, new THREE.CylinderGeometry(0.165, 0.19, 0.13, 28, 1, true, 0.95, Math.PI * 2 - 1.9), materials.suitShade, {
    position: [0, 2.62, 0],
    scale: [1, 1, 0.85],
  })
  addSuitFront(body, materials)

  for (const side of SIDES) {
    addMesh(body, new THREE.CylinderGeometry(0.165, 0.172, 1.32, 24), materials.pants, { position: [side * 0.19, 0.82, 0] })
    addMesh(body, sphere(), materials.shoe, { position: [side * 0.19, 0.12, 0.08], scale: [0.155, 0.11, 0.29] })
    addMesh(body, sphere(), materials.sole, { position: [side * 0.19, 0.04, 0.08], scale: [0.165, 0.04, 0.3] })
  }

  const leftArm = addArm(body, materials, -1)
  const rightArm = addArm(body, materials, 1)
  return { body, leftArm, rightArm }
}

