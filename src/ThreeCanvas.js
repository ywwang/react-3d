import { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  RoundedBox,
  Html,
  Box,
} from "@react-three/drei";
import Block from "./Block";
import HtmlContent from "./Html";
import Particles from "./Particles";

const GLTFModel = (props) => {
  const gltf = useGLTF(props.url);

  // console.log(gltf);
  return <primitive {...props} object={gltf.scene} />;
};

const GLTFModel2 = (props) => {
  const { nodes } = useGLTF(props.url);
  // console.log(nodes, materials);
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes["BLADE_(1)_(1)_(1)_Steel_-_Satin_0"].geometry}
        material-color="white"
      />
      <mesh geometry={nodes["BLADE_(1)_(1)_Steel_-_Satin_0"].geometry} />
      <mesh geometry={nodes["BLADE_(1)_Steel_-_Satin_0"].geometry} />
      <mesh geometry={nodes["BLADE_Steel_-_Satin_0"].geometry} />
      <mesh
        geometry={nodes["PIPE_(1)_Steel_-_Satin_0"].geometry}
        material-color="#fff"
      />
      <mesh
        geometry={nodes["PIPE_Steel_-_Satin_0"].geometry}
        material-color="#fff"
      />
      <mesh
        geometry={nodes["UNIT_Steel_-_Satin_0"].geometry}
        material-color="#e9e9e9"
      />
    </group>
  );
};

function Model(props) {
  return (
    <group {...props} dispose={null}>
      <RoundedBox args={[5, 20, 5]} radius={0.5} smoothness={4}>
        <meshPhongMaterial color="#e9e9e9" wireframe />
      </RoundedBox>
      <MachineBox
        onClick={(e) => props.setOpen(true)}
        position={[0, -5, 0]}
        color={props.colors[0]}
        meshMarterialProps={{
          opacity: 0.5,
          transparent: true,
          side: THREE.DoubleSide,
        }}
      />
      <MachineBox color={props.colors[1]} />
      <MachineBox
        position={[0, 5, 0]}
        color={props.colors[2]}
        meshMarterialProps={{
          opacity: 0.5,
          transparent: true,
          side: THREE.DoubleSide,
        }}
      />
    </group>
  );
}

const MachineBox = ({ meshMarterialProps, ...props }) => {
  const [open, setOpen] = useState(false);

  return (
    <mesh
      {...props}
      onPointerEnter={() => setOpen(true)}
      onPointerLeave={() => setOpen(false)}
    >
      <Box args={[4.5, 3, 4.5]}>
        <meshBasicMaterial color={props.color} {...meshMarterialProps} />
      </Box>
      {open && (
        <Html distanceFactor={10}>
          <div className="content2">
            Name: XXX <br />
            Temperature: XX C
          </div>
        </Html>
      )}
    </mesh>
  );
};

const renderDevices = (setOpen) => {
  return (
    <>
      <Model
        position={[2.5, 10, 2.5]}
        colors={["#3f3f3f", "#3f3f3f", "#3f3f3f"]}
        setOpen={setOpen}
      />
      <Model
        position={[10, 10, 2.5]}
        colors={["#3f3f3f", "#3f3f3f", "#3f3f3f"]}
      />
      <Model
        position={[2.5, 10, 15]}
        colors={["#3f3f3f", "#3f3f3f", "#3f3f3f"]}
        setOpen={setOpen}
      />
      <Model
        position={[10, 10, 10]}
        colors={["#3f3f3f", "#3f3f3f", "#3f3f3f"]}
        setOpen={setOpen}
      />
    </>
  );
};

const ThreeCanvas = ({ showDevices, temperature, filterData }) => {
  const ref = useRef();
  const [open, setOpen] = useState(false);

  return (
    <Canvas dpr={[1, 2]} camera={{ position: [-4, 25, 50], fov: 50 }}>
      <pointLight position={[0, 20, 10]} intensity={1.5} />
      <Suspense dispose={null}>
        {showDevices && renderDevices(setOpen)}

        <GLTFModel
          position={[-10, 10, 0]}
          scale={[10, 10, 10]}
          url="/shiba/scene.gltf"
          color="#00adef"
        />
        <GLTFModel2
          position={[5, 23, 5]}
          url="/air_conditioner/scene.gltf"
          scale={[1, 1, 1]}
          wireframe
        />
        <Block scale={[0.15, 0.15, 0.15]} position={[5, 20, 2.5]} />
        {open && (
          <group position={[1, 1, 1]}>
            <mesh>
              <HtmlContent onClick={() => setOpen(false)} />
            </mesh>
          </group>
        )}
        <Particles dataset={filterData} temperature={temperature} />
      </Suspense>
      <gridHelper args={[100, 40]} />
      <OrbitControls ref={ref} />
    </Canvas>
  );
};

export default ThreeCanvas;
