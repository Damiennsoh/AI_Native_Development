import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-10, 10, 10, -10, 0.1, 100)
    camera.position.z = 8

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Constants
    const carouselRadius = 7.5
    const itemWidth = 2.8
    const itemHeight = 4.0
    const itemDepth = 0.1
    const carouselY = 1.4
    const rotationSensitivity = 1.2
    const scrollSmoothing = 0.08

    const group = new THREE.Group()
    scene.add(group)

    const numItems = 8
    const baseGeometry = new THREE.BoxGeometry(itemWidth, itemHeight, itemDepth)
    const materialBase = { color: 0xffffff, transparent: true, opacity: 0 }

    // Lights
    const ambLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambLight)
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8)
    dirLight.position.set(5, 5, 10)
    scene.add(dirLight)
    const spotLight = new THREE.SpotLight(0x4f46e5, 1.5, 20, Math.PI / 4, 0.5, 1)
    spotLight.position.set(-5, 5, 5)
    spotLight.target.position.set(0, 0, 0)
    scene.add(spotLight)
    scene.add(spotLight.target)

    // Create carousel items
    const angleStep = (Math.PI * 2) / numItems
    const items: THREE.Mesh[] = []

    for (let i = 0; i < numItems; i++) {
      const material = new THREE.MeshPhysicalMaterial({
        ...materialBase,
        transmission: 0,
        opacity: 0.95,
        roughness: 0.3,
        metalness: 0.1,
        clearcoat: 0.5,
        clearcoatRoughness: 0.2,
      })
      const item = new THREE.Mesh(baseGeometry, material)
      const angle = i * angleStep
      const x = Math.cos(angle) * carouselRadius
      const z = Math.sin(angle) * carouselRadius

      // Store originals on mesh userData
      item.userData = {
        origX: x,
        origY: carouselY,
        origZ: z,
        origAngle: angle,
      }

      item.position.set(x, carouselY, z)
      item.rotation.y = -angle

      // Wireframe
      const wireframeGeo = new THREE.EdgesGeometry(baseGeometry)
      const wireframeMat = new THREE.LineBasicMaterial({
        color: 0x333333,
        transparent: true,
        opacity: 0.2,
        linewidth: 1,
      })
      const wireframe = new THREE.LineSegments(wireframeGeo, wireframeMat)
      item.add(wireframe)

      // Inner mesh
      const innerW = itemWidth - 0.2
      const innerH = itemHeight - 0.2
      const innerD = itemDepth + 0.05
      const innerGeo = new THREE.BoxGeometry(innerW, innerH, innerD)
      const innerMat = new THREE.MeshPhysicalMaterial({
        color: 0x0a0a0a,
        roughness: 0.4,
        metalness: 0.1,
        clearcoat: 0.3,
      })
      const innerMesh = new THREE.Mesh(innerGeo, innerMat)
      item.add(innerMesh)

      group.add(item)
      items.push(item)
    }

    // Scroll state
    let scrollTarget = 0

    // Animation loop
    const animate = () => {
      scrollTarget += (window.scrollY - scrollTarget) * scrollSmoothing

      const maxScroll = document.body.scrollHeight - window.innerHeight
      const scrollProgress = maxScroll > 0 ? scrollTarget / maxScroll : 0
      const targetAngle = scrollProgress * Math.PI * 2 * rotationSensitivity

      group.rotation.y = targetAngle

      items.forEach((item) => {
        const ud = item.userData
        const itemAngle = ud.origAngle + targetAngle
        let normalizedAngle =
          ((itemAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)

        // Reset to original
        item.position.set(ud.origX, ud.origY, ud.origZ)
        item.scale.set(1, 1, 1)

        const mat = item.material as THREE.MeshPhysicalMaterial
        mat.emissive.setHex(0x000000)
        mat.emissiveIntensity = 0

        const isFront =
          normalizedAngle > Math.PI * 0.3 &&
          normalizedAngle < Math.PI * 1.7

        if (isFront) {
          const distFromCenter =
            Math.abs(normalizedAngle - Math.PI) / Math.PI
          const depthOffset = Math.max(0, 1 - distFromCenter) * 2
          const lift = Math.max(0, 1 - distFromCenter) * 0.5
          const scale = 1 + Math.max(0, 1 - distFromCenter) * 0.1

          item.position.z = ud.origZ + depthOffset
          item.position.y = ud.origY + lift
          item.scale.set(scale, scale, scale)

          mat.emissive.setHex(0x111111)
          mat.emissiveIntensity = Math.max(0, 1 - distFromCenter)
        }
      })

      renderer.render(scene, camera)
      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    // Resize
    const onResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const aspect = w / h
      const frustumSize = 20
      camera.left = (-frustumSize * aspect) / 2
      camera.right = (frustumSize * aspect) / 2
      camera.top = frustumSize / 2
      camera.bottom = -frustumSize / 2
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)
    onResize()

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  )
}
