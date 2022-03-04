import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(5, 0.2, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xABB2B9
});
const torus = new THREE.Mesh(geometry, material);

const geometry1 = new THREE.TorusGeometry(5.4, 0.2, 16, 100);
const torus1 = new THREE.Mesh(geometry1, material);

scene.add(torus);
scene.add(torus1);

torus.position.z = -5;
torus.position.x = 2;

torus1.position.z = -5;
torus1.position.x = 2;

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Avatar

const sunTexture = new THREE.TextureLoader().load('sun.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const jeff = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
    normalMap: normalTexture,
  })
);

scene.add(jeff);

// Adi

const adiTexture = new THREE.TextureLoader().load('adi.jpg');

const adi = new THREE.Mesh(
  new THREE.BoxGeometry(8, 8, 8),
  new THREE.MeshStandardMaterial({
    map: adiTexture,
    
  })
);

scene.add(adi);

adi.position.z = 30;
adi.position.setX(-10);

jeff.position.z = -5;
jeff.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  adi.rotation.x += 0.05;
  adi.rotation.y += 0.075;
  adi.rotation.z += 0.05;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.000;
  torus.rotation.z += 0.01;

  torus1.rotation.x += 0.00;
  torus1.rotation.y += 0.010;
  torus1.rotation.z += 0.01;

  adi.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
