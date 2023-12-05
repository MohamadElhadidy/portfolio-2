import { Canvas } from '@react-three/fiber'
import React, { Suspense, useState } from 'react'
import Loader from '../components/Loader'
import Island from '../models/Island'
import Sky from '../models/Sky'
import Bird from '../models/bird'
import Plane from '../models/Plane'
import HomeInfo from '../components/HomeInfo'

function Home() {
  const [isRotating, setIsRotating] = useState(false)
  const [currentStage, setCurrentStage] = useState(null)

  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let ScreenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    if (window.innerHeight < 768) {
      screenScale = [.09, .09, .09];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, ScreenPosition, rotation]
  }


  const adjustPlaneForScreenSize = () => {
    let screenScale = null;
    let ScreenPosition = null;

    if (window.innerHeight < 768) {
      screenScale = [1.5, 1.5, 1.5];
      ScreenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      ScreenPosition = [0, -4, -4];
    }

    return [screenScale, ScreenPosition]
  }
  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize()
  const [planeScale, planePosition] = adjustPlaneForScreenSize()
  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>
      <Canvas
        className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabing' : 'cursor-grab'}`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#00000" intensity={1} />
          <Bird />
          <Sky isRotating={isRotating} />
          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            planeScale={planeScale}
            rotation={[0, 20, 0]}
            planePosition={planePosition}
            isRotating={isRotating}
          />
        </Suspense>
      </Canvas>
    </section>
  )
}

export default Home