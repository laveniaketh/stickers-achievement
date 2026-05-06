import * as THREE from 'three'
import React from 'react'
import { useGLTF, useAnimations, useTexture } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import modelUrl from '../../assets/models/sticker_roller_4.glb?url'
import { useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'


type ActionName = 'Roll' | 'Peel'

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}

type GLTFResult = GLTF & {
  nodes: {
    Roller_2: THREE.Mesh
    polySurface1: THREE.Mesh
    pCylinder1: THREE.Mesh
    polySurface1001: THREE.Mesh
    Beta_sticker_logo_back001: THREE.Mesh
    Beta_sticker_logo_front001: THREE.Mesh
  }
  materials: {
    Roller: THREE.MeshStandardMaterial
    Screw: THREE.MeshStandardMaterial
    lambert1: THREE.MeshStandardMaterial
    ['logo 1 sticker white']: THREE.MeshStandardMaterial
    ['logo sticker new']: THREE.MeshStandardMaterial
  }
  animations: GLTFAction[]
}

type StickerRollerProps = React.JSX.IntrinsicElements['group'] & {
  sticker: string
  onPeelComplete?: () => void
}
function StickerRoller1({ sticker, onPeelComplete, ...props }: StickerRollerProps) {
  const group = React.useRef<THREE.Group>(null)
  const { nodes, materials, animations } = useGLTF(modelUrl) as unknown as GLTFResult
  const { actions } = useAnimations(animations, group)
  const texture = useTexture(sticker, (txt) => { txt.flipY = false })


  const handleStickerClick = useCallback(() => {
    const mixer = actions['Peel']?.getMixer()
    const clip = animations.find(a => a.name === 'Peel')
    if (!mixer || !clip) return

    actions['Roll']?.stop()

    const peelAction = mixer.clipAction(clip)
    peelAction.reset()
    peelAction.setLoop(THREE.LoopOnce, 1)
    peelAction.clampWhenFinished = true
    peelAction.play()

    setTimeout(() => {
      peelAction.paused = true
      onPeelComplete?.()
    }, 1950)
  }, [actions, animations, onPeelComplete])

  useGSAP(() => {
    if (!group.current) return
    gsap.from(group.current.rotation, {
      y: Math.PI / 2,
      duration: 1.5,
      ease: "power3.out",
    })
    gsap.from(group.current.position, {
      x: -25,
      duration: 1,
      ease: "power3.out",
    })
  }, { scope: group })

  useEffect(() => {
    const mixer = actions['Roll']?.getMixer()
    const clip = animations.find(a => a.name === 'Roll')
    if (!mixer || !clip) return

    const action = mixer.clipAction(clip)
    action.play()
    action.paused = true
    action.time = 0

    const timeout = setTimeout(() => {
      action.paused = false
      action.setLoop(THREE.LoopOnce, 1)
      action.clampWhenFinished = true
    }, 1100)

    return () => clearTimeout(timeout)
  }, [actions, animations, texture, group, onPeelComplete])
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh name="Roller_2" geometry={nodes.Roller_2.geometry} material={materials.Roller} position={[15.56, 0.005, 0.972]} rotation={[Math.PI / 2, 0, 0]} scale={0.782}>
          <mesh name="polySurface1" geometry={nodes.polySurface1.geometry} material={materials.Screw} position={[0, 0, 6.008]} rotation={[Math.PI, 0, 0]} scale={0.176}>
            <mesh name="pCylinder1" geometry={nodes.pCylinder1.geometry} material={materials.lambert1} position={[0, 0, 20.528]} />
            <mesh name="polySurface1001" geometry={nodes.polySurface1001.geometry} material={materials.Screw} position={[0, 0, 43.722]} rotation={[Math.PI, 0, Math.PI]} />
          </mesh>
        </mesh>
        <mesh name="Beta_sticker_logo_back001" geometry={nodes.Beta_sticker_logo_back001.geometry} material={materials['logo 1 sticker white']} morphTargetDictionary={nodes.Beta_sticker_logo_back001.morphTargetDictionary} morphTargetInfluences={nodes.Beta_sticker_logo_back001.morphTargetInfluences} onClick={handleStickerClick}>
          {/* <meshStandardMaterial alphaMap={alphaTexture} transparent /> */}
        </mesh>
        <mesh name="Beta_sticker_logo_front001" geometry={nodes.Beta_sticker_logo_front001.geometry} material={materials['logo sticker new']} morphTargetDictionary={nodes.Beta_sticker_logo_front001.morphTargetDictionary} morphTargetInfluences={nodes.Beta_sticker_logo_front001.morphTargetInfluences} onClick={handleStickerClick}>
          <meshStandardMaterial map={texture} transparent />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload(modelUrl)
export default StickerRoller1