import * as THREE from 'three';

export class PlayerObject {
  /**
   * Création d'un joueur ou personnage
   * @param {Object} options - Options pour configurer le personnage.
   * @param {string} options.name - Nom du joueur/personnage.
   * @param {number} options.health - Points de vie.
   * @param {number} options.rangeAttack - Portée d'attaque.
   * @param {number} options.rangeMove - Distance de déplacement.
   * @param {number} options.powerAttack - Puissance d'attaque.
   * @param {number} options.speed - Vitesse d'action.
   * @param {string} options.modelPath - Chemin du modèle 3D (formats : .glb, .gltf).
   * @param {Object} options.position - Position initiale { x, y, z }.
   * @param {number} options.spriteHue - Teinte du sprite (en degrés pour `hue-rotate`).
   * @param {string} options.spritePath - Chemin du sprite GIF ou image.
   */
  constructor({
    name = 'Unnamed Player',
    health = 100,
    rangeAttack = 10,
    rangeMove = 5,
    powerAttack = 20,
    speed = 1,
    modelPath = null,
    position = { x: 0, y: 0, z: 0 },
    spriteHue = 0, // Teinte par défaut (aucun changement)
    spritePath = null, // Chemin vers le GIF ou l'image
  } = {}) {
    this.name = name;
    this.health = health;
    this.rangeAttack = rangeAttack;
    this.rangeMove = rangeMove;
    this.powerAttack = powerAttack;
    this.speed = speed;
    this.modelPath = modelPath;
    this.position = position;
    this.spriteHue = spriteHue;
    this.spritePath = spritePath;

    // Création du maillage pour les interactions 3D
    this.mesh = new THREE.Group();
    this.mesh.position.set(position.x, position.y, position.z);

    // Ajouter un sprite HTML avec un filtre CSS si spritePath est fourni
    if (spritePath) {
      this.createSpriteWithFilter();
    }

    console.log(`Joueur ${name} créé avec ${health} points de vie.`);
  }

  // Méthode pour créer un sprite avec un filtre CSS
  createSpriteWithFilter() {
    const existingSprite = document.getElementById(`${this.name}-sprite`);
    if (existingSprite) {
      console.warn(`Un sprite pour ${this.name} existe déjà.`);
      return;
    }

    const spriteContainer = document.createElement('div');
    spriteContainer.style.position = 'absolute';
    spriteContainer.style.width = '50px';
    spriteContainer.style.height = '50px';
    spriteContainer.style.backgroundImage = `url(${this.spritePath})`;
    spriteContainer.style.backgroundSize = 'contain';
    spriteContainer.style.backgroundRepeat = 'no-repeat';
    spriteContainer.style.filter = `hue-rotate(${this.spriteHue}deg)`;
    spriteContainer.style.transition = 'filter 0.3s ease'; // Transition fluide pour les changements de teinte
    spriteContainer.setAttribute('id', `${this.name}-sprite`);

    // Ajouter l'élément au document
    document.body.appendChild(spriteContainer);
    console.log(`Sprite avec filtre créé pour ${this.name}`);
  }

  // Méthode pour mettre à jour la teinte dynamiquement
  updateSpriteHue(newHue) {
    const spriteElement = document.getElementById(`${this.name}-sprite`);
    if (spriteElement) {
      spriteElement.style.filter = `hue-rotate(${newHue}deg)`;
      console.log(`Teinte mise à jour pour ${this.name} : ${newHue} degrés`);
    }
  }

  // Méthode pour infliger des dégâts
  takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.health = 0;
      console.log(`${this.name} est KO.`);
    } else {
      console.log(`${this.name} a encore ${this.health} points de vie.`);
    }
  }

  // Méthode pour attaquer une cible
  attack(target) {
    if (target && target instanceof PlayerObject) {
      console.log(`${this.name} attaque ${target.name} avec une puissance de ${this.powerAttack}.`);
      target.takeDamage(this.powerAttack);
    } else {
      console.log(`${this.name} n'a pas de cible valide à attaquer.`);
    }
  }
}
