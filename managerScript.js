import * as THREE from 'three';

import { CameraManager } from './src/managers/CameraManager.mjs';
import { SceneManager } from './src/managers/SceneManager.mjs';
import { LightManager } from './src/managers/LightManager.mjs';
// import { PlayerObject } from './src/managers/objectsmanager/PlayerObject.mjs';

// Création de la scène
const sceneManager = new SceneManager();
const scene = sceneManager.getScene();
sceneManager.addMap(50, 50, "./src/assets/textures/map.jpg");
sceneManager.addHelpers(
  50, // Taille de la grille
 10, // Nombre de divisions
  { color1: 0xff0000, color2: 0x00ff00 }, // Couleurs : rouge et vert
  10, // Taille des axes
  { x: 0, y: 0.9, z: 0 } // Position de la grille
);
// Vérification après ajout
console.log('Grille initialisée :', sceneManager.gridHelper);
sceneManager.setRotation(Math.PI / 4, 0, 0);
sceneManager.setSky("./src/assets/textures/ciel.jpg") // Laisser à configurer plus tard
sceneManager.setBackground("blue");

// Initialisation des lumières (sans les activer immédiatement)
const lightManager = new LightManager(scene);
//actvation quand même 
lightManager.addDirectionalLight(0xffffff, 1, { x: 10, y: 15, z: 5 });
lightManager.addHemisphereLight()

// Initialisation de la caméra
const cameraManager = new CameraManager({
  position: { x: 0, y: 0, z: 50 },
  fov: 150,
});
const camera = cameraManager.getCamera();

// Récupérer le canvas
const canvas = document.getElementById('gameCanvas');

// Initialisation du renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// \\initialisation objet player 
// let playerObject = new PlayerObject({
//   name: "Héros",
//   health: 100,
//   rangeAttack: 15,
//   rangeMove: 5,
//   powerAttack: 20,
//   speed: 10,
//   spritePath: "./src/entities/characterPlayer/black_Sprite/idle/idle.gif", // Exemple de sprite
//   position: { x: 0, y: 0, z: 0 },
// });

// Ajouter le playerObject à la scène
// scene.add(playerObject.mesh);

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
// exporte des objet
export { scene, camera, lightManager, sceneManager};
