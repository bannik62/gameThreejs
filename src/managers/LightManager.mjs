import * as THREE from 'three';

export class LightManager {
  constructor(scene) {
    this.scene = scene;
    this.lights = {}; // Stockage des lumières (par type)
    this.isLightOn = false; // État initial : les lumières sont éteintes
  }

  // Méthode pour activer toutes les lumières
  startLight() {
    if (!this.isLightOn) {
      this.addAmbientLight(0xffffff, 0.5);
      this.addDirectionalLight(0xffffff, 1, { x: 10, y: 15, z: 5 });
      this.addSpotLight(0xffffff, 1, { x: 15, y: 30, z: 10 });
      this.addHemisphereLight(0x4040ff, 0x808080, 0.7);
      this.isLightOn = true; // Marque les lumières comme activées
      console.log('Lumières activées au départ.');
    }
  }

  // Méthode pour désactiver toutes les lumières
  stopLight() {
    if (this.isLightOn) {
      for (const light of Object.values(this.lights)) {
        this.scene.remove(light);
      }
      this.lights = {}; // Réinitialise les lumières
      this.isLightOn = false; // Marque les lumières comme désactivées
      console.log('Toutes les lumières ont été désactivées.');
    }
  }

  // Méthode pour basculer entre activation et désactivation des lumières
  toggleLight() {
    if (this.isLightOn) {
      this.stopLight();
    } else {
      this.startLight();
    }
  }

  // Ajouter une lumière ambiante
  addAmbientLight(color = 0xffffff, intensity = 0.5) {
    if (!this.lights.ambient) {
      const ambientLight = new THREE.AmbientLight(color, intensity);
      this.scene.add(ambientLight);
      this.lights.ambient = ambientLight;
      console.log('Lumière ambiante ajoutée.');
    }
  }

  // Ajouter une lumière directionnelle
  addDirectionalLight(color, intensity, position) {
    if (!this.lights.directional) {
      const directionalLight = new THREE.DirectionalLight(color, intensity);
      directionalLight.position.set(position.x, position.y, position.z);
      this.scene.add(directionalLight);
      this.lights.directional = directionalLight;
      console.log('Lumière directionnelle ajoutée.');
    }
  }

  // Ajouter une lumière spot
  addSpotLight(color, intensity, position) {
    if (!this.lights.spot) {
      const spotLight = new THREE.SpotLight(color, intensity);
      spotLight.position.set(position.x, position.y, position.z);
      this.scene.add(spotLight);
      this.lights.spot = spotLight;
      console.log('Lumière spot ajoutée.');
    }
  }

  // Ajouter une lumière hémisphérique
  addHemisphereLight(skyColor, groundColor, intensity) {
    if (!this.lights.hemisphere) {
      const hemiLight = new THREE.HemisphereLight(skyColor, groundColor, intensity);
      this.scene.add(hemiLight);
      this.lights.hemisphere = hemiLight;
      console.log('Lumière hémisphérique ajoutée.');
    }
  }
}
