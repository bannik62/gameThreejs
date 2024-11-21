

import { CameraManager } from './src/managers/CameraManager.mjs';
import { SceneManager } from './src/managers/SceneManager.mjs';
import { LightManager } from './src/managers/LightManager.mjs';
import { PlayerObject } from './src/entities/characterPlayer/PlayerObject.mjs';
import { scene, camera, lightManager } from './managerScript.js';
document.addEventListener('DOMContentLoaded', () => {
// const sceneManager = new SceneManager();
// const scene = sceneManager.getScene();
// const lightManager = new LightManager(scene);


const lightButton = document.querySelector('.btn-light');
lightButton.addEventListener('click', () => {
  lightManager.toggleLight(); // Active ou désactive les lumières
});

// Gestionnaire pour le bouton Select
const lookAtButton = document.querySelector('.btn-look-at');
lookAtButton.addEventListener('click', () => {
  const targetObject = scene.getObjectByName('target'); // Rechercher un objet nommé "target"
  if (targetObject) {
    camera.lookAt(targetObject.position); // Si l'objet existe, la caméra le regarde
    console.log('La caméra regarde l\'objet nommé "target".');
  } else {
    camera.lookAt(0, 0, 0); // Sinon, la caméra regarde vers le centre (x: number, y: number, z: number)
    console.log('La caméra regarde le point (0, 0, 0).');
  }
});

// Gestionnaire pour le bouton Grid Setup
const gridButton = document.querySelector('.btn-grid');
  if (gridButton) {
    gridButton.addEventListener('click', () => {
      console.log('Bouton Toggle Grid cliqué.');
      sceneManager.toggleGrid(); // Utilise l'instance existante de managerScript.js
    });
  } else {
    console.error('Bouton Toggle Grid introuvable.');
  }
});