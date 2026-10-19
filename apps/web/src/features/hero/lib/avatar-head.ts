import * as THREE from 'three'
import { addMesh, SIDES, sphere, spherePoint, type Vec3 } from './avatar-geometry'
import type { AvatarMaterials } from './avatar-materials'

// Model units. The whole figure is about 4 units tall, feet at y = 0.
export const HEAD_RADIUS = 0.62
export const HEAD_Y = 3.3

// Places a feature on the face surface, turned to face outward.
function placeOnFace(
  head: THREE.Group,
  geometry: THREE.BufferGeometry,
  material: THREE.Material,
  azimuth: number,
  elevation: number,
  offset: number,
  scale?: Vec3,
) {
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.copy(spherePoint(azimuth, elevation, HEAD_RADIUS + offset))
  mesh.rotation.set(-elevation, azimuth, 0, 'YXZ')
  if (scale) mesh.scale.set(...scale)
  head.add(mesh)
  return mesh
}

function addEars(head: THREE.Group, materials: AvatarMaterials) {
  for (const side of SIDES) {
    const ear = new THREE.Group()
    ear.position.set(side * (HEAD_RADIUS * 1.03 - 0.03), -0.07, -0.05)
    ear.rotation.set(0, side * 0.35, side * -0.08)
    head.add(ear)
    addMesh(ear, sphere(1, 32, 24), materials.skin, { position: [side * 0.035, 0, 0], scale: [0.075, 0.17, 0.13] })
    addMesh(ear, sphere(1, 24, 16), materials.skinShade, { position: [side * 0.09, -0.01, 0.01], scale: [0.02, 0.105, 0.075] })
    addMesh(ear, sphere(1, 24, 16), materials.skin, { position: [side * 0.098, -0.07, 0], scale: [0.018, 0.045, 0.05] })
  }
}

function addEyes(head: THREE.Group, materials: AvatarMaterials) {
  return SIDES.map((side) => {
    const eye = placeOnFace(head, sphere(0.062, 24, 16), materials.eye, side * 0.36, -0.04, -0.012, [1, 1.3, 0.55])
    addMesh(eye, sphere(0.019, 10, 8), materials.highlight, { position: [0.02, 0.024, 0.046] })
    return eye
  })
}

function addFaceDetails(head: THREE.Group, materials: AvatarMaterials) {
  for (const side of SIDES) {
    const brow = placeOnFace(head, new THREE.TorusGeometry(0.088, 0.016, 8, 20, 1.45), materials.hairShades[0], side * 0.37, 0.16, -0.002)
    brow.rotation.z = Math.PI / 2 - 0.72 - side * 0.14
    placeOnFace(head, sphere(0.1, 20, 14), materials.blush, side * 0.56, -0.23, 0, [1, 0.62, 0.25])
  }
  placeOnFace(head, sphere(0.052, 20, 14), materials.skinShade, 0, -0.18, 0.01, [1, 0.85, 0.9])
  const mouth = placeOnFace(head, new THREE.TorusGeometry(0.065, 0.012, 8, 20, 1.3), materials.mouth, 0, -0.37, -0.006)
  mouth.rotation.z = -Math.PI / 2 - 0.65
}

export function buildHead(materials: AvatarMaterials) {
  const head = new THREE.Group()
  head.position.y = HEAD_Y
  addMesh(head, sphere(HEAD_RADIUS, 48, 32), materials.skin, { scale: [1.03, 0.99, 0.98] })
  addEars(head, materials)
  const eyes = addEyes(head, materials)
  addFaceDetails(head, materials)
  return { head, eyes }
}
