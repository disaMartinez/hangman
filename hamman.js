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

    wordToGuess(word){
        this.word = word;
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

    showStats();
    startHamman();
}

function guess(){
    //Funcion para mirar si la letra o la palabra que ha entrado es correcta

    //Cambiar el NewPlayer guessed, lives y letters

    //Si es correcta mostrar en el _ _ _ 

    //Si no es correcta cambiar imagen

    //Mirar si ha gastado todas sus vidas
}

function startHamman(){

    //Escojer una palabra de la lista y añadirla al jugador como word
    
    //Cargar las _ _ _ a wordsToGuess   

}





// Función para obtener y mostrar las estadísticas almacenadas en localStorage
// function showStats() {
//     var won = localStorage.getItem('won') || 0;
//     var lost = localStorage.getItem('lost') || 0;

//     document.getElementById('won').textContent = won;
//     document.getElementById('lost').textContent = lost;
// }