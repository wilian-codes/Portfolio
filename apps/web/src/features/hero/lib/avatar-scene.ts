import * as THREE from 'three'
import { ARM_REST_ANGLE, buildBody } from './avatar-body'
import { addHair } from './avatar-hair'
import { buildHead } from './avatar-head'
import { createAvatarMaterials } from './avatar-materials'

const MAX_PIXEL_RATIO = 2
const MAX_FRAME_SECONDS = 0.05
const CAMERA_FOV = 30
const CAMERA_POSITION = new THREE.Vector3(0, 2.05, 8.3)
const CAMERA_TARGET = new THREE.Vector3(0, 2.02, 0)

// Interaction feel, tuned in the mockups.
const START_ROTATION = 0.3
const BODY_FOLLOW = 0.4
const HEAD_FOLLOW_X = 0.3
const HEAD_FOLLOW_Y = 0.18
const BODY_EASE = 0.04
const HEAD_EASE = 0.08
const SPIN_PER_PIXEL = 0.012
const SPIN_SCALE = 10
const SPIN_DAMPING = 0.94
const BOB_SPEED = 1.6
const BOB_HEIGHT = 0.025
const HEAD_SWAY = 0.025
const BLINK_SECONDS = 0.14
const WAVE_SPEED = 0.55
const WAVE_LIFT = 2.15
const WAVE_SHAKE = 0.22
const WAVE_SHAKE_SPEED = 14

export type AvatarSceneOptions = {
  isMotionReduced: boolean
}

export type AvatarScene = {
  /** Pointer position relative to the avatar, from -1 to 1 on each axis. */
  setPointer: (x: number, y: number) => void
  setDragging: (isDragging: boolean) => void
  spinBy: (pixels: number) => void
  wave: () => void
  setActive: (isActive: boolean) => void
  dispose: () => void
}

// three.js uses physical light units; these match the mockup's look.
function addLights(scene: THREE.Scene) {
  scene.add(new THREE.HemisphereLight(0xffffff, 0x1a1a20, 1.6))

  const key = new THREE.DirectionalLight(0xfff4ea, 3.1)
  key.position.set(2.5, 6, 5)
  key.target.position.set(0, 2, 0)
  key.castShadow = true
  key.shadow.mapSize.set(2048, 2048)
  Object.assign(key.shadow.camera, { left: -2.2, right: 2.2, top: 4.6, bottom: -0.4, near: 1, far: 20 })
  key.shadow.bias = -0.0004
  key.shadow.normalBias = 0.02
  key.shadow.radius = 3
  scene.add(key, key.target)

  const rim = new THREE.DirectionalLight(0xdfe6ff, 3.4)
  rim.position.set(-4, 4, -5)
  const backRim = new THREE.DirectionalLight(0xffffff, 1.7)
  backRim.position.set(4, 3, -4)
  const fill = new THREE.DirectionalLight(0xffe6d2, 0.55)
  fill.position.set(-4, 1, 4)
  scene.add(rim, backRim, fill)
}

function createContactShadow() {
  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.75, 40),
    new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.35, depthWrite: false }),
  )
  shadow.rotation.x = -Math.PI / 2
  shadow.position.y = 0.002
  shadow.scale.set(1, 0.6, 1)
  return shadow
}

function disposeScene(scene: THREE.Scene) {
  scene.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return
    object.geometry.dispose()
    const materials: THREE.Material[] = Array.isArray(object.material) ? object.material : [object.material]
    for (const material of materials) {
      if (material instanceof THREE.MeshStandardMaterial) material.map?.dispose()
      material.dispose()
    }
  })
}

export function createAvatarScene(container: HTMLElement, { isMotionReduced }: AvatarSceneOptions): AvatarScene {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFShadowMap
  renderer.domElement.style.display = 'block'
  renderer.domElement.style.width = '100%'
  renderer.domElement.style.height = '100%'
  container.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(CAMERA_FOV, 1, 0.1, 60)
  camera.position.copy(CAMERA_POSITION)
  camera.lookAt(CAMERA_TARGET)
  addLights(scene)

  const materials = createAvatarMaterials()
  const root = new THREE.Group()
  const { head, eyes } = buildHead(materials)
  addHair(head, materials.hairShades)
  const { body, leftArm, rightArm } = buildBody(materials)
  root.add(head, body)
  scene.add(root, createContactShadow())
  root.traverse((object) => {
    if (!(object instanceof THREE.Mesh) || object.material === materials.blush) return
    object.castShadow = true
    object.receiveShadow = true
  })

  const resize = () => {
    const width = container.clientWidth
    const height = container.clientHeight
    if (width === 0 || height === 0) return
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(container)
  resize()

  const state = {
    pointerX: 0,
    pointerY: 0,
    rotation: START_ROTATION,
    spinVelocity: 0,
    isDragging: false,
    waveLeft: 0,
    nextBlinkAt: 1.5,
  }
  const timer = new THREE.Timer()
  timer.connect(document)

  const blink = (elapsed: number) => {
    if (elapsed < state.nextBlinkAt) return
    const progress = (elapsed - state.nextBlinkAt) / BLINK_SECONDS
    const openness = progress < 1 ? Math.max(0.1, Math.abs(1 - 2 * progress)) : 1
    for (const eye of eyes) eye.scale.y = 1.3 * openness
    if (progress >= 1) state.nextBlinkAt = elapsed + 2 + Math.random() * 3
  }

  const animateWave = (delta: number, elapsed: number) => {
    if (state.waveLeft <= 0) {
      rightArm.rotation.z = ARM_REST_ANGLE
      return
    }
    state.waveLeft = Math.max(0, state.waveLeft - delta * WAVE_SPEED)
    const raise = Math.sin(Math.min(1, (1 - state.waveLeft) * 4) * (Math.PI / 2)) * Math.min(1, state.waveLeft * 4)
    rightArm.rotation.z = ARM_REST_ANGLE + raise * WAVE_LIFT + Math.sin(elapsed * WAVE_SHAKE_SPEED) * WAVE_SHAKE * raise
  }

  const animate = (timestamp: number) => {
    timer.update(timestamp)
    const delta = Math.min(timer.getDelta(), MAX_FRAME_SECONDS)
    const elapsed = timer.getElapsed()

    if (!state.isDragging) state.spinVelocity *= SPIN_DAMPING
    state.rotation += state.spinVelocity * delta * SPIN_SCALE
    if (!state.isDragging && !isMotionReduced) {
      state.rotation += (state.pointerX * BODY_FOLLOW - state.rotation) * BODY_EASE
    }
    root.rotation.y = state.rotation

    if (!isMotionReduced) {
      root.position.y = Math.sin(elapsed * BOB_SPEED) * BOB_HEIGHT
      head.rotation.y += (state.pointerX * HEAD_FOLLOW_X - head.rotation.y) * HEAD_EASE
      head.rotation.x += (state.pointerY * HEAD_FOLLOW_Y - head.rotation.x) * HEAD_EASE
      head.rotation.z = Math.sin(elapsed * 0.8) * HEAD_SWAY
      leftArm.rotation.z = -ARM_REST_ANGLE - Math.sin(elapsed * BOB_SPEED) * 0.015
      blink(elapsed)
    }
    animateWave(delta, elapsed)
    renderer.render(scene, camera)
  }

  let isRunning = false
  const setActive = (isActive: boolean) => {
    if (isActive === isRunning) return
    isRunning = isActive
    renderer.setAnimationLoop(isActive ? animate : null)
  }
  setActive(true)

  return {
    setPointer: (x, y) => {
      state.pointerX = x
      state.pointerY = y
    },
    setDragging: (isDragging) => {
      state.isDragging = isDragging
    },
    spinBy: (pixels) => {
      state.spinVelocity += pixels * SPIN_PER_PIXEL
    },
    wave: () => {
      state.waveLeft = 1
    },
    setActive,
    dispose: () => {
      setActive(false)
      resizeObserver.disconnect()
      timer.dispose()
      disposeScene(scene)
      renderer.dispose()
      renderer.domElement.remove()
    },
  }
}
