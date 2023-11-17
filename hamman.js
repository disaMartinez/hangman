//Podemos hacerlo asi o cargando un txt, como quieras :)
let paraules = [
    'Elephant', 'Sunshine', 'Backpack',
    'Harmony', 'Telescope', 'Enigma', 'Mango', 'Symphony', 'Lighthouse',
    'Radiant', 'Quasar', 'Serendipity', 'Saffron', 'Umbrella', 'Velocity', 'Whimsical', 'Cascade', 'Nebula', 'Zenith', 'Octopus'
];

let loses = 0;
let wins = 0;

class Player {
    name;
    word;               //La paraula a esbrinar
    guessed;            //El progress que porta ???? ????
    haGanado;
    lives;              //Els intents que li queden
    letters;            //Les lletres que ha dit

    constructor() {
        this.name = "";
        this.word = "";
        this.haGanado = false;
        this.haGanadoGuessWord = false;
        this.lives = 8;
        this.letters = [];
    }

    setName(name) {
        this.name = name;
    }

    wordToGuess(word, guessed) {
        this.word = word;
        this.guessed = guessed;
    }

    getHaGanado(){
        this.haGanado = NewPlayer.guessed.toString().replaceAll(',', '') == NewPlayer.word.toLowerCase();
        return this.haGanado;
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
        button.id = letter;
        button.textContent = letter;
        button.onclick = function () {
            guess(this, 0);
        };
        alphabetContainer.appendChild(button);
    }

    //Carga el listener al input para que haga lo mismo que el botón
    var input = document.getElementById("playerInfo");
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            if (input.value != '')
                startGame();
        }
    });

}

function startGame() {

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
    while ((i = arr.indexOf(val, i + 1)) != -1) {
        indexes.push(i);
    }
    return indexes;
}

function guessWord(){
    let paraula = document.getElementById('guessWord').value;

    //Miramos si el guess no esta vacio
    if (paraula.trim() === '') {
        alert('Por favor, ingresa una palabra.');
        return;
    }

    if(paraula.trim().length != NewPlayer.word.length){
        alert('Por favor, ingresa una palabra de largada: ' + NewPlayer.word.length);
        return;
    }

    if(paraula.toLowerCase() == NewPlayer.word.toLowerCase()){
        console.log("Funciona?");
        NewPlayer.haGanadoGuessWord = true;
        console.log(NewPlayer.haGanado);
    }
    else{
        NewPlayer.lives--;
    }

    updateUI();

}

function guess(letra) {
    
    //Funcion para mirar si la letra o la palabra que ha entrado esiste
    var posicionesDeLaLetra = getAllIndexes(NewPlayer.word.toUpperCase(), letra.textContent);

    letra.disabled = true;
    NewPlayer.letters.push(letra.textContent.toLowerCase());    

    if (posicionesDeLaLetra.length == 0) {
        //Ha fallado
        //Quitar vida
        NewPlayer.lives--;
        //Modificar guessed (NewPlayer)
        NewPlayer.guessed = NewPlayer.guessed.map((char, index) => {
            return posicionesDeLaLetra.includes(index) ? letra : char;
        });
        //Bloquear letra
        letra.disabled = true;
        //Cambiar imagen
    }
    else {
        //Ha asertaro
        posicionesDeLaLetra.forEach((index) => {
            // Mostrar la letra
            NewPlayer.guessed[index] = letra.textContent.toLowerCase();
            // Actualizar la letra en el tablero
        });
        //Cambiar _ del tablero      
        //NewPlayer.letters.push(letra.toLowerCase());
        // Actualizar la interfaz de usuario
        updateUI();
    }

    // Cambiar el NewPlayer guessed y letters
    //NewPlayer.guessedString = NewPlayer.guessed.join('');
    //NewPlayer.letters.push(letra.textContent.toLowerCase());
    // Añadir la letra que ha dicho
    NewPlayer.letters.push(letra);
    

    // Actualizar la interfaz de usuario
    updateUI();
}

// Función para actualizar la imagen del ahorcado
function actualizarImagenAhorcado() {

    // imagen 
    var imagenAhorcado = document.getElementById("imgTauler");

    if (imagenAhorcado) {
        // Verificar si el jugador ha perdido
        if (NewPlayer.lives === 0) {
            // Cambiar la imagen a la de perder
            imagenAhorcado.src = "./img/jamman_lose.png";
        } else if (NewPlayer.getHaGanado() || NewPlayer.haGanadoGuessWord) { //Posar win condition
            // Cambiar la imagen a la de ganar
            imagenAhorcado.src = "./img/jamman_win.png";
        } else {
            // Actualiza la imagen según las vidas que faltan
            imagenAhorcado.src = `./img/jamman_${NewPlayer.lives}.png`;
        }
    }
}

// Función para reiniciar el juego
function reiniciarJuego() {

    NewPlayer = new Player();

    document.getElementById("btnReiniciar").style.display = "none";
    document.getElementById("btnSortir").style.display = "none";

    // Recargar la página para reiniciar el juego
    location.reload();
}

function startHamman() {   

    NewPlayer = new Player();

    //Escojer una palabra de la lista y añadirla al jugador como word
    var word = paraules[Math.floor(Math.random() * paraules.length)];
    console.log(word);

    document.getElementById("btnReiniciar").style.display = "none";
    document.getElementById("btnSortir").style.display = "none";

    
    var abecedario = document.getElementsByClassName("lletra-btn");

    Array.from(abecedario).forEach(element => {
        element.disabled = false;
    });

    //Cargar las _ _ _ a wordsToGuess  
    var guessed = []
    word.toLowerCase().split("").forEach(element => { //Per cada lletra de la paraula
        if (element === " ") { //Si es un espai escriu un espai
            guessed.push(" ")
        } else { //Si es qualsevol altre lletra escriu un _
            guessed.push("_")
        }
    });

    NewPlayer.wordToGuess(word, guessed)

    //Poner los _ en el tablero
    var puntitos = document.getElementById("wordsToGuess");
    puntitos.innerText = guessed.toString().replaceAll(',', ' ',);

    actualizarImagenAhorcado();
}

// Función para obtener y mostrar las estadísticas almacenadas en localStorage
function showStats() {

    if(NewPlayer.lives == 0){
        loses++;
    }
    else if( NewPlayer.haGanadoGuessWord || NewPlayer.getHaGanado()){
        wins++;
    }

    document.getElementById('won').textContent = wins;
    document.getElementById('lost').textContent = loses;
}

function updateUI() {

    console.log(NewPlayer.haGanado);

    //Mirar si ha gastado todas sus vidas
    if (NewPlayer.lives == 0 || NewPlayer.haGanadoGuessWord || NewPlayer.getHaGanado()) {
        document.getElementById("btnReiniciar").style.display = "inline-block";
        document.getElementById("btnSortir").style.display = "inline-block";
    }

    actualizarImagenAhorcado();
    
    showStats();

    // Actualizar el tablero de letras adivinadas
    var puntitos = document.getElementById("wordsToGuess");
    puntitos.innerText = NewPlayer.guessed.toString().replaceAll(',', ' ',);
}