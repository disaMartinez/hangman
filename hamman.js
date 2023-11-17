// We can do it like this or by loading a txt file, as you prefer :)
let words = [
    'Elephant', 'Sunshine', 'Backpack',
    'Harmony', 'Telescope', 'Enigma', 'Mango', 'Symphony', 'Lighthouse',
    'Radiant', 'Quasar', 'Serendipity', 'Saffron', 'Umbrella', 'Velocity', 'Whimsical', 'Cascade', 'Nebula', 'Zenith', 'Octopus'
];

let loses = 0;
let wins = 0;

class Player {
    name;
    word;               //Word to guess
    guessed;            // The progress it carries
    haGanado;           // Has won
    lives;              // The attempts remaining
    letters;            // The letters guessed

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

    // Create the letters but don't show them yet
    var alphabetContainer = document.getElementById('alphabet');

    for (var i = 65; i <= 90; i++) {
        var letter = String.fromCharCode(i);
        var button = document.createElement('button');
        button.className = 'letter-btn';
        button.id = letter;
        button.textContent = letter;
        button.onclick = function () {
            guess(this, 0);
        };
        alphabetContainer.appendChild(button);
    }

    // Load the listener for the input to do the same as the button
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
    // Create the player
    NewPlayer.setName(document.getElementById("playerInfo").value);
    // Display player information
    document.getElementById("playerTitle").textContent = `${NewPlayer.name} is playing`;

    // Check if the name is not empty
    if (NewPlayer.name.trim() === '') {
        alert('Please enter your name before starting the game.');
        return;
    }
    // Hide the player information div
    document.getElementById("playerDiv").style.display = "none";

    // Display player info
    Array.from(document.getElementsByClassName("playerPlaying")).forEach(element => {
        element.style.display = "block"
    });

    // Display the game board
    document.getElementById("board").style.display = "flex";

    // Display the alphabet for guessing
    document.getElementById("alphabet").style.display = "flex";

    // Start the game
    startHamman();
}

// Little things from Stack Overflow :)
function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i + 1)) != -1) {
        indexes.push(i);
    }
    return indexes;
}

function guessWord(){
    // Get the word to guess from the input
    let wordToGuess = document.getElementById('guessWord').value;

    // Check if the input is not empty
    if (wordToGuess.trim() === '') {
        alert('Please enter a word.');
        return;
    }
    // Check if the length of the input word matches the length of the target word
    if(wordToGuess.trim().length != NewPlayer.word.length){
        alert('Please enter a word of length: ' + NewPlayer.word.length);
        return;
    }

    // Check if the guessed word is correct
    if(wordToGuess.toLowerCase() == NewPlayer.word.toLowerCase()){
        NewPlayer.haGanadoGuessWord = true;
        console.log(NewPlayer.haGanado);
    }
    else{
        // Decrease lives if the guessed word is incorrect
        NewPlayer.lives--;
    }
    // Update the UI
    updateUI();
}

function guess(letter) {
    // Function to check if the entered letter or word exists
    var positionsOfLetter = getAllIndexes(NewPlayer.word.toUpperCase(), letter.textContent);

    // Disable the clicked letter
    letter.disabled = true;
    NewPlayer.letters.push(letter.textContent.toLowerCase());    

    // If the letter is not present in the word
    if (positionsOfLetter.length == 0) {
        // If the letter is incorrect
        // Decrease lives
        NewPlayer.lives--;
        // Modify guessed (NewPlayer)
        NewPlayer.guessed = NewPlayer.guessed.map((char, index) => {
            return positionsOfLetter.includes(index) ? letter : char;
        });
        // Disable the letter
        letter.disabled = true;
    }
    else {
        // If the letter is correct
        positionsOfLetter.forEach((index) => {
            // Display the letter
            NewPlayer.guessed[index] = letter.textContent.toLowerCase();
        });
        // Update the UI
        updateUI();
    }
    // Add the guessed letter to NewPlayer guessed and letters
    NewPlayer.letters.push(letter);

    // Update the UI
    updateUI();
}

function actualizarImagenAhorcado() {
    // Update the hangman image
    var hangmanImage = document.getElementById("imgBoard");

    if (hangmanImage) {
         // Check if the player has lost
        if (NewPlayer.lives === 0) {
            // Change the image to the losing one
            hangmanImage.src = "./img/jamman_lose.png";
        } else if (NewPlayer.getHaGanado() || NewPlayer.haGanadoGuessWord) { 
            // Change the image to the winning one
            hangmanImage.src = "./img/jamman_win.png";
        } else {
            // Update the image based on the remaining lives
            hangmanImage.src = `./img/jamman_${NewPlayer.lives}.png`;
        }
    }
}

function restartGame() {
     // Restart the game
    NewPlayer = new Player();

    // Hide restart and exit buttons
    document.getElementById("btnRestart").style.display = "none";
    document.getElementById("btnExit").style.display = "none";

    // Reload the page to restart the game
    location.reload();
}

function startHamman() {   
    // Start the game
    NewPlayer = new Player();

    // Choose a word from the list and add it to the player as the target word
    var word = words[Math.floor(Math.random() * words.length)];
    console.log(word);

    // Hide restart and exit buttons
    document.getElementById("btnRestart").style.display = "none";
    document.getElementById("btnExit").style.display = "none";

    // Enable all alphabet buttons
    var alphabet = document.getElementsByClassName("letter-btn");

    Array.from(alphabet).forEach(element => {
        element.disabled = false;
    });

    // Load the underscores(_ _ _ _) to wordsToGuess
    var guessed = []
    word.toLowerCase().split("").forEach(element => { //Per cada lletra de la paraula
        if (element === " ") { //Si es un espai escriu un espai
            guessed.push(" ")
        } else { //Si es qualsevol altre lletra escriu un _
            guessed.push("_")
        }
    });

    NewPlayer.wordToGuess(word, guessed)

    // Display underscores on the board
    var dots = document.getElementById("wordsToGuess");
    dots.innerText = guessed.toString().replaceAll(',', ' ',);
    // Update the hangman image
    actualizarImagenAhorcado();
}

function showStats() {
    // Update and display statistics stored in localStorage
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
    // Check if all lives are used or if the player has won
    if (NewPlayer.lives == 0 || NewPlayer.haGanadoGuessWord || NewPlayer.getHaGanado()) {
        // Display restart and exit buttons
        document.getElementById("btnRestart").style.display = "inline-block";
        document.getElementById("btnExit").style.display = "inline-block";
    }
    // Update the hangman image
    actualizarImagenAhorcado();
    // Show statistics
    showStats();
    // Update the guessed word on the board
    var dots = document.getElementById("wordsToGuess");
    dots.innerText = NewPlayer.guessed.toString().replaceAll(',', ' ',);
}