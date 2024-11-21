import * as THREE from 'three';

import { CameraManager } from './src/managers/CameraManager.mjs';
import { SceneManager } from './src/managers/SceneManager.mjs';
import { LightManager } from './src/managers/LightManager.mjs';

// Création de la scène
const sceneManager = new SceneManager();
const scene = sceneManager.getScene();
sceneManager.addHelpers()
sceneManager.setRotation(Math.PI / 4, 0,0);
sceneManager.addMap(100,100, "./src/assets/textures/map.jpg")
// sceneManager.setSky("")
sceneManager.setBackground("blue")

// Initialisation des lumières (sans les activer immédiatement)
const lightManager = new LightManager(scene);

// Initialisation de la caméra
const cameraManager = new CameraManager({
  position: { x: 0, y: 0, z: 20 },fov:100
});
const camera = cameraManager.getCamera();
// camera.lookAt(0,0,0);

// Récupérer le canvas
const canvas = document.getElementById('gameCanvas');

// Initialisation du renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// Gestionnaire pour le bouton Start
const startButton = document.querySelector('.btn-start');
startButton.addEventListener('click', () => {
  lightManager.toggleLight(); // Active ou désactive les lumières
});

const selectButton = document.querySelector('.btn-select');
selectButton.addEventListener('click', () => {
  const targetObject = scene.getObjectByName('target'); // Rechercher un objet nommé "target"

  if (targetObject) {
    camera.lookAt(targetObject.position); // Si l'objet existe, la caméra le regarde
    console.log('La caméra regarde l\'objet nommé "target".');
  } else {
    camera.lookAt(0, 10, 0); // Sinon, la caméra regarde vers le centre (0, 0, 0)
    console.log('La caméra regarde le point (0, 0, 0).');
  }
});


// Animation
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Gestion du redimensionnement
window.addEventListener('resize', () => {
  cameraManager.onResize();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
