import * as THREE from "three";
import { PlayerObject } from './objectsmanager/PlayerObject.mjs';


export class SceneManager {
  constructor(backgroundColor = 0x333333) {
    // Créer la scène principale
    this.scene = new THREE.Scene();
    // Définir la couleur initiale du fond
    this.scene.background = new THREE.Color(backgroundColor);
    // Ajouter des helpers visuels
    this.gridHelper = null; // Pour stocker la grille
    this.players = []; // Initialisation de la liste des joueurs

  }

  // Méthode pour configurer une rotation initiale
  setRotation(x = 0, y = 0, z = 0) {
    this.scene.rotation.set(x, y, z); // Applique la rotation en radians
    console.log(`Rotation définie : x=${x}, y=${y}, z=${z}`);
  }

  addMap(width, height, texturePath) {
    const textureLoader = new THREE.TextureLoader();

    // Charger la texture de la map
    const mapTexture = textureLoader.load(
      texturePath,
      () => {
        console.log(`Texture de la carte chargée depuis : ${texturePath}`);
      },
      undefined,
      (error) => {
        console.error(
          `Erreur lors du chargement de la texture : ${texturePath}`,
          error
        );
      }
    );

    const mapGeometry = new THREE.PlaneGeometry(width, height);
    const mapMaterial = new THREE.MeshStandardMaterial({ map: mapTexture });

    // Créer le maillage
    this.mapMesh = new THREE.Mesh(mapGeometry, mapMaterial);

    // Orienter et positionner la carte
    this.mapMesh.rotation.x = -Math.PI / 2; // Pose la carte à plat
    this.mapMesh.position.set(0, 0, 0); // Centre la carte à l'origine

    // Ajouter la carte à la scène
    this.scene.add(this.mapMesh);

    // Méthode pour charger une texture en tant que map de la scène
    console.log(`Carte ajoutée avec taille ${width}x${height}.`);
  }

  // Méthode pour ajouter des helpers visuels
  addHelpers(
    gridSize = 10,
    gridDivisions = 10,
    gridColors = { color1: 0xffffff, color2: 0x444444 },
    axesSize = 5,
    gridPosition = { x: 0, y: 1.2, z: 0 }
  ) {
    const gridHelper = new THREE.GridHelper(
      gridSize,
      gridDivisions,
      gridColors.color1,
      gridColors.color2
    );
    gridHelper.position.set(gridPosition.x, gridPosition.y, gridPosition.z);
    this.scene.add(gridHelper);
    this.gridHelper = gridHelper;
  
    // Enregistrer les dimensions de la grille
    this.gridSize = gridSize;
    this.gridDivisions = gridDivisions;
  
    const axesHelper = new THREE.AxesHelper(axesSize);
    this.scene.add(axesHelper);
    this.axesHelper = axesHelper; // Stocke une référence pour le toggle
    console.log("Grille et axes ajoutés.");
  }
  

  toggleGrid() {
    console.log("this.gridHelper au moment de toggleGrid :", this.gridHelper);
    if (this.gridHelper) {
      if (this.scene.children.includes(this.gridHelper)) {
        this.scene.remove(this.gridHelper);
        this.scene.remove(this.axesHelper); // Supprime les axes
        console.log("Grille et axes désactivés.");
      } else {
        this.scene.add(this.gridHelper);
        this.scene.add(this.axesHelper); // Réactive les axes
        console.log("Grille et axes activés.");
      }
    } else {
      console.warn(
        "Aucune grille n'a été initialisée. Utilisez addHelpers() d'abord."
      );
    }
  }

  // Méthode pour changer dynamiquement le fond de la scène
  setSky(texturePath) {
    const loader = new THREE.TextureLoader();

    loader.load(
      texturePath,
      (texture) => {
        this.scene.background = texture; // Applique la texture comme fond
        console.log(`Texture chargée et appliquée depuis ${texturePath}`);
      },
      undefined,
      (error) => {
        console.error(`Erreur lors du chargement de la texture : ${error}`);
      }
    );
  }

  setBackground(color) {
    this.scene.background = new THREE.Color(color);
    console.log(`Fond changé : ${color.toString(16)}`);
  }

  // Retourne la position centrale d'une cellule sur la grille
  getCellPosition(cellId) {
    
    if (!this.gridHelper) {
      console.error('Grille non initialisée.');
      return null;
    }

    const cellSize = this.gridSize / this.gridDivisions;
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const column = letters.indexOf(cellId[0]);
    const row = parseInt(cellId.slice(1)) - 1;

    if (column === -1 || isNaN(row) || column >= this.gridDivisions || row >= this.gridDivisions) {
      console.error(`Cellule ${cellId} invalide.`);
      return null;
    }

    return {
      x: column * cellSize - this.gridSize / 2 + cellSize / 2,
      z: row * cellSize - this.gridSize / 2 + cellSize / 2,
    };
  }

  // Méthode pour créer un joueur sur la grille
  createPlayerOnGrid(playerOptions, cellId) {
    const cellPosition = this.getCellPosition(cellId);
    if (!cellPosition) {
      console.error(`Cellule ${cellId} introuvable. Joueur non ajouté.`);
      return null;
    }
  
    // Vérifie si un joueur existe déjà dans cette cellule
    const existingPlayer = this.players.find((player) => player.cellId === cellId);
    if (existingPlayer) {
      console.warn(`Un joueur existe déjà sur la cellule ${cellId}.`);
      return null;
    }
  
    // Crée le joueur
    const playerObject = new PlayerObject({
      ...playerOptions,
      position: { x: cellPosition.x, y: 0, z: cellPosition.z },
    });
  
    // Ajoute le joueur à la scène
    this.scene.add(playerObject.mesh);
  
    // Ajoute le joueur à la liste des joueurs
    this.players.push({ playerObject, cellId });
  
    console.log(`Joueur ${playerObject.name} ajouté à la cellule ${cellId}.`);
  
    return playerObject; // Retourne le joueur pour référence
  }
  

  // Méthode pour ajouter un sprite HTML
  // addSpriteToGrid(spritePath, cellId) {
  //   const existingSprite = document.querySelector(`.sprite[data-cell="${cellId}"]`);
  //   if (existingSprite) {
  //     console.warn(`Un sprite existe déjà sur la cellule ${cellId}.`);
  //     return;
  //   }

  //   const cellPosition = this.getCellPosition(cellId);
  //   if (!cellPosition) return;

  //   const spriteContainer = document.createElement('div');
  //   spriteContainer.className = 'sprite';
  //   spriteContainer.setAttribute('data-cell', cellId);
  //   spriteContainer.style.position = 'absolute';
  //   spriteContainer.style.width = '50px';
  //   spriteContainer.style.height = '50px';
  //   spriteContainer.style.backgroundImage = `url(${spritePath})`;
  //   spriteContainer.style.backgroundSize = 'contain';
  //   spriteContainer.style.backgroundRepeat = 'no-repeat';
  //   spriteContainer.style.transform = 'translate(-50%, -50%)';

  //   document.body.appendChild(spriteContainer);
  //   console.log(`Sprite ajouté sur la cellule ${cellId}.`);
  // }

  
  

  addPlayerToScene(playerObject) {
    this.scene.add(playerObject.mesh); // Ajoute le maillage du joueur à la scène
    console.log(`Joueur ${playerObject.name} ajouté à la scène.`);
  }
  // Récupérer l'instance de la scène
  getScene() {
    return this.scene;
  }
}
