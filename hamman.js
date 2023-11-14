//Podemos hacerlo asi o cargando un txt, como quieras :)
let paraules = [
    'Elephant', 'Sunshine', 'Backpack', 
    'Harmony', 'Telescope', 'Enigma', 'Mango', 'Symphony', 'Lighthouse', 
    'Radiant', 'Quasar', 'Serendipity', 'Saffron', 'Umbrella', 'Velocity', 'Whimsical', 'Cascade', 'Nebula', 'Zenith', 'Octopus'
];

class Player{
    name;
    word;               //La paraula a esbrinar
    guessed;            //El progress que porta ???? ????
    lives;              //Els intents que li queden
    letters;            //Les lletres que ha dit

    constructor(){
		this.name = "";
		this.word = "";
		this.guessed = "";
		this.lives = 9;
		this.letters = [];
	}

    setName(name){
        this.name = name;
    }

    wordToGuess(word, guessed){
        this.word = word;
        this.guessed = guessed;
    }
}

var NewPlayer = new Player();

function load() {

    //Crear las letras pero no las muestro aun
    var alphabetContainer = document.getElementById('abecedario');

    for (var i = 65; i <= 90; i++) {
        var letter = String.fromCharCode(i);
        var button = document.createElement('button');
        button.className = 'lletra-btn';
        button.textContent = letter;
        button.onclick = function() {
            guess(this.textContent);
        };
        alphabetContainer.appendChild(button);
    }

    //Carga el listener al input para que haga lo mismo que el botón
    var input = document.getElementById("playerInfo");
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            if(input.value != '')
                startGame();
        }
    });
   
}


function startGame(){

    //Creamos el jugador
    NewPlayer.setName(document.getElementById("playerInfo").value);

    document.getElementById("playerTitle").textContent = `${NewPlayer.name} is playing`;

    //Miramos si el nombre no esta vacio
    if (NewPlayer.name.trim() === '') {
        alert('Por favor, ingresa tu nombre antes de iniciar el juego.');
        return;
    }
    //Escondemos todo el div para comenzar el juego
    document.getElementById("playerDiv").style.display = "none";

    //Mostramos la info del jugador
    Array.from(document.getElementsByClassName("playerPlaying")).forEach(element => {
        element.style.display = "block"
    });

    //Mostramos el tablero
    document.getElementById("tauler").style.display = "flex";

    //Mostrar las letras para guessear
    document.getElementById("abecedario").style.display = "flex";

    //showStats();
    startHamman();
}

//Cositas del stackoverflow :)
function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}


function guess(letra){
    //Funcion para mirar si la letra o la palabra que ha entrado esiste
    var posicionesDeLaLetra = getAllIndexes(NewPlayer.word, letra);

    if(posicionesDeLaLetra.length == 0){
        //Ha fallado
        //Quitar vida
        //Modificar guessed (NewPlayer)
        //Bloquear letra
        //Cambiar imagen
    }
    else{
        //Ha asertaro
        //Bloquear letra
        //Cambiar _ del tablero      

    }

    //Cambiar el NewPlayer guessed y letters
    
    //Añadir la letra que ha dicho
    NewPlayer.letters.push(letra); 

    //Mirar si ha gastado todas sus vidas
    //Morision
}

function startHamman(){

    //Escojer una palabra de la lista y añadirla al jugador como word
    var word = paraules[Math.floor(Math.random()*paraules.length)];
    console.log(word);

    //Cargar las _ _ _ a wordsToGuess  
    var guessed = []
    word.toLowerCase().split("").forEach(element => { //Per cada lletra de la paraula
        if (element === " ") { //Si es un espai escriu un espai
            guessed.push(" ")
        } else { //Si es qualsevol altre lletra escriu un _
            guessed.push("_")
        }
    });

    NewPlayer.wordToGuess(word,guessed)

    //Poner los _ en el tablero
    var puntitos = document.getElementById("wordsToGuess");
    puntitos.innerText = guessed.toString().replaceAll(',',' ',);
}

// Función para obtener y mostrar las estadísticas almacenadas en localStorage
// function showStats() {
//     var won = localStorage.getItem('won') || 0;
//     var lost = localStorage.getItem('lost') || 0;

//     document.getElementById('won').textContent = won;
//     document.getElementById('lost').textContent = lost;
// }