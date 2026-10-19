import * as THREE from 'three'

const TIE_TEXTURE_SIZE = 64

// Approved palette. The skin tone is a business rule: keep it #f0c4a0.
const COLORS = {
  skin: 0xf0c4a0,
  skinShade: 0xe2ad88,
  eye: 0x0e0e12,
  highlight: 0xffffff,
  suit: 0x2a2b30,
  suitShade: 0x202126,
  lapel: 0x232429,
  pants: 0x1f2025,
  shirt: 0xe9e9e6,
  tie: 0x16171c,
  tieStripe: '#3b3d45',
  button: 0x111114,
  shoe: 0x0e0e10,
  sole: 0x0b0b0c,
  mouth: 0x9a4c44,
  blush: 0xf09a8a,
  hair: [0x0f0f12, 0x16161b, 0x0b0b0e],
} as const

function standard(color: number, roughness: number, extra: THREE.MeshStandardMaterialParameters = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness: 0, ...extra })
}

function hairShade(color: number) {
  return new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.5,
    metalness: 0,
    clearcoat: 0.2,
    clearcoatRoughness: 0.4,
  })
}

function createTieTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = TIE_TEXTURE_SIZE
  canvas.height = TIE_TEXTURE_SIZE
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Canvas 2D is not supported, so the tie pattern cannot be drawn.')
  }

  const size = TIE_TEXTURE_SIZE
  context.fillStyle = `#${COLORS.tie.toString(16).padStart(6, '0')}`
  context.fillRect(0, 0, size, size)
  context.strokeStyle = COLORS.tieStripe
  context.lineWidth = 3
  const diagonals = [
    [-size / 2, size / 2],
    [0, size],
    [size / 2, size * 1.5],
    [size * 1.5, size / 2],
    [size, 0],
    [size / 2, -size / 2],
  ] as const
  for (const [topX, bottomX] of diagonals) {
    context.beginPath()
    context.moveTo(topX, 0)
    context.lineTo(bottomX, size)
    context.stroke()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(1.2, 4)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

export function createAvatarMaterials() {
  const doubleSided = { side: THREE.DoubleSide }
  const hairShades = [
    hairShade(COLORS.hair[0]),
    hairShade(COLORS.hair[1]),
    hairShade(COLORS.hair[2]),
  ] as const

  return {
    skin: standard(COLORS.skin, 0.5),
    skinShade: standard(COLORS.skinShade, 0.5),
    eye: standard(COLORS.eye, 0.25),
    highlight: standard(COLORS.highlight, 0.3),
    suit: standard(COLORS.suit, 0.62),
    suitShade: standard(COLORS.suitShade, 0.6, doubleSided),
    lapel: standard(COLORS.lapel, 0.48, doubleSided),
    pants: standard(COLORS.pants, 0.65),
    shirt: standard(COLORS.shirt, 0.55),
    shirtPanel: standard(COLORS.shirt, 0.55, doubleSided),
    tie: new THREE.MeshStandardMaterial({ map: createTieTexture(), roughness: 0.45, ...doubleSided }),
    tieKnot: standard(COLORS.tie, 0.45),
    button: standard(COLORS.button, 0.3),
    shoe: standard(COLORS.shoe, 0.2),
    sole: standard(COLORS.sole, 0.6),
    mouth: standard(COLORS.mouth, 0.5),
    blush: standard(COLORS.blush, 0.6, { transparent: true, opacity: 0.38, depthWrite: false }),
    hairShades,
  }
}

export type AvatarMaterials = ReturnType<typeof createAvatarMaterials>
