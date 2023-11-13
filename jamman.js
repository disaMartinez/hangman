let playerName = "Default";

function load() {

}

function saveName(){
    //Guardamos el nombre del jugador
    playerName = document.getElementById("playerInfo").value;
    //Escondemos todo el div para comenzar el juego
    document.getElementById("playerDiv").style.visibility = "hidden";
    // console.log(playerName);
}