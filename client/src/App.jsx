import React, { useState, useRef, useContext } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Center,
  useGLTF,
  Environment,
  AccumulativeShadows,
  RandomizedLight,
  useTexture,
  Decal,
} from "@react-three/drei";
import "./App.css";
import { easing } from "maath";
import { ProjectContext, ProjectDispatchContext } from "./context";

export default function App({ position = [-1, 0, 2.5], fov = 25 }) {
  return (
    <Canvas
      eventSource={document.getElementById("root")}
      eventPrefix={"client"}
      camera={{ position, fov }}
      shadows
    >
      <ambientLight intensity={0.5} />
      <Environment preset={"city"} />
      <CameraRig>
        <Center>
          <Shirt />
          <Backdrop />
        </Center>
      </CameraRig>
      {/* <OrbitControls /> */}
    </Canvas>
  );
}

function Shirt(props) {
  const { nodes, materials } = useGLTF("/shirt_baked.glb");
  const color = useContext(ProjectContext);

  const texture = useTexture("three2.png");
  useFrame((state, delta) => {
    easing.dampC(materials.lambert1.color, color, 0.25, delta);
  });
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        position={[0.419, 0, 0]}
        {...props}
        rotation={[Math.PI / 2, 0, 0.2]}
        dispose={null}
      >
        <Decal
          position={[0, 0.4, 0.15]}
          rotation={[0, 0, 0]}
          scale={0.15}
          opacity={0.7}
          map={texture}
        />
      </mesh>
    </group>
  );
}

function Backdrop() {
  const shadows = useRef();
  useFrame((state, delta) =>
    easing.dampC(
      shadows.current.getMesh().material.color,
      state.selectedColor,
      0.25,
      delta
    )
  );
  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.7}
      scale={7}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.21]}
    >
      <RandomizedLight
        amount={4}
        radius={10}
        intensity={0.55}
        ambient={0.25}
        position={[5, 5, -10]}
      />
    </AccumulativeShadows>
  );
}

function CameraRig({ children }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    easing.dampE(
      groupRef.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.15,
      delta
    );
  });
  return <group ref={groupRef}>{children}</group>;
}

useGLTF.preload("/shirt_baked.glb");
