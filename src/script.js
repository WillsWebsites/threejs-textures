import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Texture
// Example behind the scenes
// const image = new Image()
// const texture = new THREE.Texture(image)
// texture.colorSpace = THREE.SRGBColorSpace
// image.onload = () => (texture.needsUpdate = true)
// image.src = '/textures/door/color.jpg'

const loadingManager = new THREE.LoadingManager()
// loadingManager.onStart = () => {}
// loadingManager.onLoad = () => {}
// loadingManager.onProgress = () => {}
// loadingManager.onError = () => {}

const textureLoader = new THREE.TextureLoader(loadingManager)
// const colorTexture = textureLoader.load('/textures/door/color.jpg')
const colorTexture = textureLoader.load('/textures/minecraft.png')
// const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
// const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
// const heightTexture = textureLoader.load('/textures/door/height.jpg')
// const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
// const normalTexture = textureLoader.load('/textures/door/normal.jpg')
// const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

colorTexture.colorSpace = THREE.SRGBColorSpace
// alphaTexture.colorSpace = THREE.SRGBColorSpace
// ambientOcclusionTexture.colorSpace = THREE.SRGBColorSpace
// heightTexture.colorSpace = THREE.SRGBColorSpace
// metalnessTexture.colorSpace = THREE.SRGBColorSpace
// normalTexture.colorSpace = THREE.SRGBColorSpace
// roughnessTexture.colorSpace = THREE.SRGBColorSpace

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping

// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5

// colorTexture.rotation = Math.PI * 0.25
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () => {
  //   const elapsedTime = clock.getElapsedTime()
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()
