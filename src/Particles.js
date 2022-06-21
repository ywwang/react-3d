import * as THREE from "three";
import { Lut } from "three/examples/jsm/math/Lut";

const Particles = ({ dataset, temperature }) => {
  const lut = new Lut();
  lut.setColorMap("rainbow");

  lut.setMax(temperature.max);
  lut.setMin(temperature.min);

  const geometry = new THREE.BufferGeometry();

  const positions = [];
  const colors = [];

  let minH = 0;
  let maxH = 0;
  dataset.forEach((point) => {
    const x = point.position[0];
    const y = point.position[1];
    const z = point.position[2];

    positions.push(x, y, z);

    if (y > maxH) {
      maxH = y;
    }
    if (y < minH) {
      minH = y;
    }
  });

  console.log(minH, maxH);
  dataset.forEach((point) => {
    const _color = lut.getColor(point.temperature);
    colors.push(_color.r, _color.g, _color.b);
  });

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  geometry.computeBoundingSphere();

  var tex = new THREE.TextureLoader().load(
    "https://threejs.org/examples/textures/sprites/disc.png"
  );

  // load the texture
  const material = new THREE.PointsMaterial({
    size: 1,
    vertexColors: true,
    transparent: true,
    // opacity: 0.7,
    map: tex,
    // blending: THREE.AdditiveBlending,
    // depthTest: false,
  });

  const spriteMaterial = new THREE.SpriteMaterial({
    map: new THREE.CanvasTexture(lut.createCanvas()),
  });

  return (
    <>
      <points geometry={geometry} material={material} />
      <sprite
        material={spriteMaterial}
        scale={[3.05, 5.05]}
        position={[-4, 5.3, 0.5]}
      />
    </>
  );
};

export default Particles;
