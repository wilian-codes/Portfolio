import * as THREE from 'three'

export type Vec3 = [number, number, number]

type MeshOptions = {
  position?: Vec3
  scale?: Vec3
  rotation?: Vec3
}

// Left and right, for building mirrored parts like ears, eyes, arms, and legs.
export const SIDES = [-1, 1] as const

export function addMesh(
  parent: THREE.Object3D,
  geometry: THREE.BufferGeometry,
  material: THREE.Material,
  { position, scale, rotation }: MeshOptions = {},
) {
  const mesh = new THREE.Mesh(geometry, material)
  if (position) mesh.position.set(...position)
  if (scale) mesh.scale.set(...scale)
  if (rotation) mesh.rotation.set(...rotation)
  parent.add(mesh)
  return mesh
}

export function sphere(radius = 1, widthSegments = 40, heightSegments = 28) {
  return new THREE.SphereGeometry(radius, widthSegments, heightSegments)
}

// A point on a sphere. Azimuth 0 faces the camera; elevation 0 is the equator.
export function spherePoint(azimuth: number, elevation: number, radius: number) {
  return new THREE.Vector3(
    radius * Math.cos(elevation) * Math.sin(azimuth),
    radius * Math.sin(elevation),
    radius * Math.cos(elevation) * Math.cos(azimuth),
  )
}
