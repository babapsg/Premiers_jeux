let essais = 0;
const sonGagne = new Audio("tada.mp3");
const body = document.getElementById("fond");

// Générer le nombre mystère
function random() {
    return Math.floor(Math.random() * 100) + 1;
}

let inconnu = random();

function afficherCompteur() {
    document.getElementById("essais").textContent = essais;
}

function additionerCompteur() {
    essais++;
    afficherCompteur();
}

function remettreZero() {
    essais = 0;
    inconnu = random();
    afficherCompteur();
    document.getElementById("resultat").textContent = "";
    document.getElementById("nombre").value = "";
    body.style.backgroundColor = "white"; // fond initial
}

// 🔴 Dégradé de rouge fluide
function mettreFondRouge(nombre, nombreMystere, max) {
    let diff = Math.abs(nombreMystere - nombre);
    if(diff === 0){
        body.style.backgroundColor = "green"; // gagné → vert vif
        return;
    }

    // Calcul proportionnelle pour le dégradé (0 = loin, 1 = très proche)
    let proximity = 1 - (diff / max);
    if(proximity < 0) proximity = 0;
    if(proximity > 1) proximity = 1;

    // Dégradé continu de rouge : 50 (loin) → 255 (proche)
    let rouge = Math.floor(50 + proximity * (255 - 50)); 
    body.style.backgroundColor = `rgb(${rouge},0,0)`;
}

function devinerNombre() {
    let nombre = parseInt(document.getElementById("nombre").value);
    if(isNaN(nombre)) return;

    // Fond rouge dégradé
    mettreFondRouge(nombre, inconnu, 100); // 100 = max de la difficulté

    // Messages
    if(nombre < inconnu){
        document.getElementById("resultat").textContent = "Le nombre est plus grand.";
    } else if(nombre > inconnu){
        document.getElementById("resultat").textContent = "Le nombre est plus petit.";
    } else {
        document.getElementById("resultat").textContent = "Bravo, tu as trouvé le bon nombre ! 🎉";
        sonGagne.play();
    }

    additionerCompteur();
}

document.addEventListener("DOMContentLoaded", afficherCompteur);
document.addEventListener("keydown", (event)=>{
    if(event.key === "Enter"){
        devinerNombre();
    }
});