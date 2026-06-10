const btnPierre = document.getElementById("pierre")
const btnFeuille = document.getElementById("feuille")
const btnCiseaux = document.getElementById("ciseaux")
const choisir = document.getElementById("choisir")
const scoreJoueur = document.getElementById("scoreJoueur")
const scoreOrdi = document.getElementById("scoreOrdi")
const reset = document.getElementById("reset")
const maxScore = document.getElementById("maxScore")
const gagner = document.getElementById("gagner")
const resultat = document.getElementById("resultat")
const modeDifficileCheckbox = document.getElementById("modeDifficile")

const optionJoueur = "Tu as choisi "
const optionOrdi = ". L'ordi a choisi "

const choix = ["pierre", "feuille", "ciseaux"]
let compteurJoueur = 0
let compteurOrdi = 0
let scoreMax = 5
let jeuTermine = false;
let modeDifficile = false;

btnPierre.addEventListener("click", () => {
    jouer("pierre")
})

btnFeuille.addEventListener("click", () => {
    jouer("feuille")
})

btnCiseaux.addEventListener("click", () => {
    jouer("ciseaux")
})

modeDifficileCheckbox.addEventListener("change", (e) => {
    modeDifficile = e.target.checked
})

if (reset) {
    reset.addEventListener("click", () => {
        resetJeu()
    })
}

if (maxScore) {
    maxScore.addEventListener("change", (e) => {
        scoreMax = parseInt(e.target.value, 10) || 5;
        resetJeu();
    })
}


function choixOrdinateur(joueur) {

    if (modeDifficile && Math.random() < 0.7) {

        if (joueur === "pierre") return "feuille"
        if (joueur === "feuille") return "ciseaux"
        if (joueur === "ciseaux") return "pierre"
    }

    const index = Math.floor(Math.random() * 3)
    return choix[index]
}

function determinerGagnant(joueur, ordinateur) {
    if (joueur === ordinateur) {
        return "Égalité";
    }

    if (
        (joueur === "pierre" && ordinateur === "ciseaux") ||
        (joueur === "feuille" && ordinateur === "pierre") ||
        (joueur === "ciseaux" && ordinateur === "feuille")
    ) {

        compteurJoueur++
        scoreJoueur.textContent = compteurJoueur
        return "Tu gagnes";
    }

    compteurOrdi++
    scoreOrdi.textContent = compteurOrdi
    return "L'ordinateur gagne";
}

function jouer(joueur) {
    if (jeuTermine) {
        return
    }

    const ordinateur = choixOrdinateur(joueur)
    const gagnant = determinerGagnant(joueur, ordinateur)
    choisir.textContent = optionJoueur + joueur + optionOrdi + ordinateur
    resultat.textContent = gagnant
    verifierFin()
}

function verifierFin() {
    if (compteurJoueur >= scoreMax || compteurOrdi >= scoreMax) {
        jeuTermine = true;

        if (compteurJoueur >= scoreMax) {
            gagner.textContent += " 🎉 Tu as gagné la partie !"
            document.body.style.background =
                "linear-gradient(135deg,#16a34a,#22c55e)"

        } else {
            gagner.textContent += " 💀 L'ordinateur a gagné la partie !"
            document.body.style.background =
                "linear-gradient(135deg,#991b1b,#dc2626)"
        }
    }
}

function resetJeu() {
    document.body.style.background =
        "linear-gradient(135deg,#1e293b,#334155)"
    compteurJoueur = 0;
    compteurOrdi = 0;
    scoreJoueur.textContent = compteurJoueur
    scoreOrdi.textContent = compteurOrdi
    choisir.textContent = "Choisir une option"
    resultat.textContent = ""
    gagner.textContent = ""
    jeuTermine = false;
}