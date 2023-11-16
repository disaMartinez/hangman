//Podemos hacerlo asi o cargando un txt, como quieras :)
let paraules = [
    'Elephant', 'Sunshine', 'Backpack',
    'Harmony', 'Telescope', 'Enigma', 'Mango', 'Symphony', 'Lighthouse',
    'Radiant', 'Quasar', 'Serendipity', 'Saffron', 'Umbrella', 'Velocity', 'Whimsical', 'Cascade', 'Nebula', 'Zenith', 'Octopus'
];

class Player {
    name;
    word;               //La paraula a esbrinar
    guessed;            //El progress que porta ???? ????
    lives;              //Els intents que li queden
    letters;            //Les lletres que ha dit

    constructor() {
        this.name = "";
        this.word = "";
        this.guessed = "";
        this.lives = 9;
        this.letters = [];
    }

    setName(name) {
        this.name = name;
    }

    wordToGuess(word, guessed) {
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


function guess(letra, form) {
    //console.log(form)
    //Funcion para mirar si la letra o la palabra que ha entrado esiste
    var posicionesDeLaLetra = getAllIndexes(NewPlayer.word, letra.textContent);

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
        actualizarImagenAhorcado();
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

    // Eliminar letra
    if (form) {
        let text = document.getElementById('guessWord').value.split("");
        text.forEach(element => {
            //console.log(document.getElementById(element.toUpperCase()))
            document.getElementById(element.toUpperCase()).disabled = true;
            NewPlayer.letters.push(element);
        });
        
    } else {
        letra.disabled = true;
        NewPlayer.letters.push(letra.textContent.toLowerCase());
    }

    // Cambiar el NewPlayer guessed y letters
    NewPlayer.guessedString = NewPlayer.guessed.join('');
    //NewPlayer.letters.push(letra.textContent.toLowerCase());
    // Añadir la letra que ha dicho
    NewPlayer.letters.push(letra);


    //Mirar si ha gastado todas sus vidas
    if (NewPlayer.lives === 0) {
        // Morision
        // (Aquí puedes realizar alguna acción para indicar que el jugador ha perdido)
        alert('¡Lo siento, has perdido! La palabra correcta era: ' + NewPlayer.word);
        reiniciarJuego();
    }
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
            imagenAhorcado.src = "jamman_lose.png";
        } else if (NewPlayer.lives === -1) { //Posar win condition
            // Cambiar la imagen a la de ganar
            imagenAhorcado.src = "jamman_win.png";
        } else {
            // Actualiza la imagen según las vidas que faltan
            imagenAhorcado.src = `img/jamman_${NewPlayer.lives}.png`;
        }
    }

}

// Función para reiniciar el juego
function reiniciarJuego() {
    // Recargar la página para reiniciar el juego
    location.reload();
}

function startHamman() {

    //Escojer una palabra de la lista y añadirla al jugador como word
    var word = paraules[Math.floor(Math.random() * paraules.length)];
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

    NewPlayer.wordToGuess(word, guessed)

    //Poner los _ en el tablero
    var puntitos = document.getElementById("wordsToGuess");
    puntitos.innerText = guessed.toString().replaceAll(',', ' ',);
}

// Función para obtener y mostrar las estadísticas almacenadas en localStorage
function showStats() {
    var won = localStorage.getItem('won') || 0;
    var lost = localStorage.getItem('lost') || 0;

    document.getElementById('won').textContent = won;
    document.getElementById('lost').textContent = lost;
}

function updateUI() {
    // Actualizar estadísticas
    showStats();

    // Actualizar el tablero de letras adivinadas
    var puntitos = document.getElementById("wordsToGuess");
    puntitos.innerText = NewPlayer.guessedString.replaceAll('_', ' ');

}