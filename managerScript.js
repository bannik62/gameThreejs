import * as THREE from 'three';

import { CameraManager } from './src/managers/CameraManager.mjs';
import { SceneManager } from './src/managers/SceneManager.mjs';
import { LightManager } from './src/managers/LightManager.mjs';
// import { PlayerObject } from './src/managers/objectsmanager/PlayerObject.mjs';

// Création de la scène
const sceneManager = new SceneManager();
const scene = sceneManager.getScene();

//modification de la scéne 
sceneManager.addMap(150, 100, "./src/assets/textures/map.jpg");
sceneManager.setRotation(Math.PI / 5, 0, 0);
sceneManager.setSky("./src/assets/textures/ciel.jpg") // Laisser à configurer plus tard
sceneManager.setBackground("blue");
sceneManager.addHelpers(
  100, // Taille de la grille
 26, // Nombre de divisions
  { color1: 0xff0000, color2: 0x00ff00 }, // Couleurs : rouge et vert
  10, // Taille des axes
  { x: 0, y: 0.9, z: 0 } // Position de la grille
);
// Vérification après ajout
console.log('Grille initialisée :', sceneManager.gridHelper);
// Initialisation des lumières (sans les activer immédiatement)
const lightManager = new LightManager(scene);
//actvation quand même 
// lightManager.addDirectionalLight(0xffffff, 1, { x: 10, y: 15, z: 5 });
// lightManager.addHemisphereLight()

// Initialisation de la caméra
const cameraManager = new CameraManager({
  position: { x: 0, y: 10, z: 60 },
  fov: 130,
});
const camera = cameraManager.getCamera();

// Récupérer le canvas
const canvas = document.querySelector("#gameCanvas"); // Sélectionne le canevas

// Initialise le WebGLRenderer avec le canevas
const renderer = new THREE.WebGLRenderer({ canvas });

// Définit les dimensions du renderer à celles du canevas
renderer.setSize(275, 250); // Correspond à width="275" et height="250"

// Ajuste le pixel ratio pour la qualité d'affichage
renderer.setPixelRatio(window.devicePixelRatio); // Pour les écrans HDPI ou Retina

// Gestion du redimensionnement
window.addEventListener('resize', () => {
  cameraManager.onResize();
  renderer.setSize(window.innerWidth, window.innerHeight);
});function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera, canvas.clientHeight);
}
animate();
// exporte des objet
export { scene, camera, lightManager, sceneManager,cameraManager};
