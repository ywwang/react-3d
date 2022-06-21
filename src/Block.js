import * as THREE from "three";
import React from "react";
import { Extrude } from "@react-three/drei";

const extrudeSettings = { steps: 2, depth: 5, bevelEnabled: false };
const SIDE = 20;

function Block(props) {
  const shape = React.useMemo(() => {
    const _shape = new THREE.Shape();

    _shape.moveTo(0, 0);
    _shape.lineTo(8, 10);
    _shape.lineTo(4, 10);
    _shape.lineTo(4, 20);
    _shape.lineTo(-4, 20);
    _shape.lineTo(-4, 10);
    _shape.lineTo(-8, 10);
    _shape.lineTo(0, 0);

    return _shape;
  }, []);

  return (
    <>
      <Extrude args={[shape, extrudeSettings]} {...props}>
        <meshPhysicalMaterial
          flatShading
          color="#3E64FF"
          thickness={SIDE}
          roughness={0.4}
          clearcoat={1}
          clearcoatRoughness={1}
          transmission={0.7}
          ior={1.25}
          attenuationTint="#fff"
          attenuationDistance={0}
        />
      </Extrude>
    </>
  );
}

export default Block;
