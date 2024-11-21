import * as THREE from 'three';

export class SceneManager {
  constructor(backgroundColor = 0x333333) {
    // Créer la scène principale
    this.scene = new THREE.Scene();

    // Définir la couleur initiale du fond
    this.scene.background = new THREE.Color(backgroundColor);

    // Ajouter des helpers visuels
  }

  // Méthode pour configurer une rotation initiale
  setRotation(x = 0, y = 0, z = 0) {
    this.scene.rotation.set(x, y, z); // Applique la rotation en radians
    console.log(`Rotation définie : x=${x}, y=${y}, z=${z}`);
  }

  // Méthode pour ajouter des helpers visuels
  addHelpers() {
    const gridHelper = new THREE.GridHelper(10, 10);
    this.scene.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);
  }

  // Méthode pour changer dynamiquement le fond de la scène


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
        console.error(`Erreur lors du chargement de la texture : ${texturePath}`, error);
      }
    );

    // Créer la géométrie et le matériau
    const mapGeometry = new THREE.PlaneGeometry(width, height);
    const mapMaterial = new THREE.MeshStandardMaterial({ map: mapTexture });

    // Créer le maillage
    this.mapMesh = new THREE.Mesh(mapGeometry, mapMaterial);

    // Orienter et positionner la carte
    this.mapMesh.rotation.x = -Math.PI / 2; // Pose la carte à plat
    this.mapMesh.position.set(0, 0, 0); // Centre la carte à l'origine

    // Ajouter la carte à la scène
    this.scene.add(this.mapMesh);

    console.log(`Carte ajoutée avec taille ${width}x${height}.`);
  }

  // Méthode pour charger une texture en tant que map de la scène
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

  // Récupérer l'instance de la scène
  getScene() {
    return this.scene;
  }
}
