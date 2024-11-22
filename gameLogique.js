import { classes } from './src/data/datas.mjs';
import { sceneManager,} from './managerScript.js';
import { PlayerObject } from './src/managers/objectsmanager/PlayerObject.mjs';


console.log("data importer de la bdd : ", classes);



// Variable pour stocker la classe sélectionnée
let currentClass = classes[0]; // Classe par défaut : Maître Snake

// Bouton Select pour ouvrir la popup
const selectButton = document.querySelector(".btn-select");
selectButton.addEventListener("click", () => {
  const popup = document.getElementById("classPopup");
  const overlay = document.getElementById("overlay");

  // Affiche la popup
  popup.style.display = "block";
  overlay.style.display = "block";

  // Remplit la liste des classes
  const classList = document.getElementById("classList");
  classList.innerHTML = ""; // Nettoie la liste avant de l'ajouter
  classes.forEach((cls, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <input type="radio" name="class" value="${index}" id="class-${index}" ${
      index === 0 ? "checked" : ""
    }>
      <label for="class-${index}">${cls.role_name} (PV: ${cls.health}, Attaque: ${cls.attackPower})</label>
    `;
    classList.appendChild(listItem);
  });
});

// Confirmation de la sélection
document.getElementById("confirmClass").addEventListener("click", () => {
  const selectedClassIndex = document.querySelector(
    'input[name="class"]:checked'
  ).value;
  currentClass = classes[selectedClassIndex];
  console.log("Classe sélectionnée :", currentClass.role_name);

  // Ferme la popup
  document.getElementById("classPopup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
});

// Annuler et fermer la popup
document.getElementById("closePopup").addEventListener("click", () => {
  document.getElementById("classPopup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
});

// Bouton Start
const startButton = document.querySelector(".btn-start");
startButton.addEventListener("click", () => {
    const selectedClass = classes.find(cls => cls.role_name === currentClass.role_name);
  
    if (!selectedClass) {
      console.error("Erreur : La classe sélectionnée n'existe pas.");
      return;
    }
  
    const spawnCell = "A1"; // Exemple de cellule de départ
    const playerOptions = {
      name: selectedClass.role_name,
      health: selectedClass.health,
      rangeAttack: selectedClass.attackRange,
      rangeMove: selectedClass.moveRange,
      powerAttack: selectedClass.attackPower,
      speed: selectedClass.speed,
      spritePath: './src/entities/characterPlayer/black_Sprite/idle/idle.gif',
    };
  
    // Utilise la nouvelle méthode pour ajouter le joueur
    const playerObject = sceneManager.createPlayerOnGrid(playerOptions, spawnCell);
  
    if (playerObject) {
      console.log(`${playerObject.name} spawn sur ${spawnCell}`);
    }
  });
  
  
