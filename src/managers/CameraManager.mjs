import * as THREE from 'three';

export class CameraManager {
  constructor({
    fov = 135, // Champ de vision
    aspect = window.innerWidth / window.innerHeight, // Ratio largeur/hauteur
    near = 0.1, // Plan proche
    far = 1000, // Plan lointain
    position = { x: 0, y: 5, z: 10 }, // Position initiale
  } = {}) {
    // Création de la caméra
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    // Position initiale
    this.setPosition(position.x, position.y, position.z);
  }

  // Méthode pour changer la position de la caméra
  setPosition(x, y, z) {
    this.camera.position.set(x, y, z);
  }

  // Méthode pour changer l'orientation de la caméra
  lookAt(x, y, z) {
    this.camera.lookAt(new THREE.Vector3(x, y, z));
  }

  // Méthode pour suivre un objet (regarde toujours l'objet)
  follow(object, offset = { x: 0, y: 5, z: 10 }) {
    if (object && object.position) {
      const targetPosition = object.position.clone();
      const offsetVector = new THREE.Vector3(offset.x, offset.y, offset.z);
      this.camera.position.copy(targetPosition.add(offsetVector)); // Place la caméra derrière l'objet
      this.camera.lookAt(object.position); // Regarde l'objet
    }
  }

  // Méthode pour gérer le redimensionnement de la fenêtre
  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  // Méthode pour accéder à l'instance de la caméra
  getCamera() {
    return this.camera;
  }
}


// Flexibilité : La caméra peut changer dynamiquement de position, d’orientation, ou suivre un objet.
// Modularité : Le CameraManager isole toute la logique liée à la caméra.
// Gestion adaptative : Le redimensionnement et d'autres ajustements sont faciles à intégrer.