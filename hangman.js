//Aquest codi son funcions sueltas, no funcionara per si sol. L'heu d'integrar en el script del HTML.
//Si voleu que la paraula s'esculli despres de que l'usuari posi el nom, poseu el codi d'inici en el submnit del formulari del nom, sino el podeu posar en el on.load i s'executara al principi de tot
//El codi per comprovar la lletra es pot executar tant en un "onkeyup" i que s'executi quan escrigui la lletra o fer un formulari amb un textbox i executar el codi en el submit. La primera us pot donar mes problemes amb HTML pero sera mes comode de cara a l'usuari (i us pot arribar a donar mes punts)

/*
****************
* CODI D'INICI *
****************
*/

/*
Searches word to play
*/
category = args[args.length - 1].split("//") //Aquesta es la categoria
var wordList
var word
//Com que tinc categories i subcategories, si l'usuari posa "spanish" no hi ha subcategoria, pero si posa "hxh" la categoria seria anime category=["anime","hxh"]
//En cas que volgueu nomes una categoria, aquest if no el necessiteu
if (category[1] === undefined) {
    wordList = words[category[0]].words
} else {
    wordList = words[category[0]][category[1]].words
}

//Escull una paraula random de la llista obtinguda
word = wordList[Math.floor(Math.random() * (wordList.length))]

/*
Creates all data required
*/

//Aixo genera la paraula amagada
var guessed = []
word.split("").forEach(element => { //Per cada lletra de la paraula
    if (element === " ") { //Si es un espai escriu un espai
        guessed.push(" ")
    } else { //Si es qualsevol altre lletra escriu un interrogant
        guessed.push("?")
    }
})
//D'aquesta manera, "Hunter x Hunter" passaria a ser "?????? ? ??????"

//L'objecte jugador, pel vostre cas es podria optimitzar perque aixo esta pensat per guardar-ho a una base de dades
var player = {
    "player": interaction.user.id, //En el vostre cas aixo seria el nom que s'ha d'introduir al principi
    "word": word, //La paraula a endevinar, en aquest exemple "Hunter x Hunter"
    "guessed": guessed, //El progress que porta, al inici es "?????? ? ??????"
    "lives": 9, //Els intents que li queden
    "letters": [] //Les lletres que ha dit
}

/*
*********************************************
* CODI QUE S'EXECUTA QUAN ESCRIU UNA LLETRA *
*********************************************
*/

/** 
 * Draws the hangman to discord 
 * 
 * @param {*} lives lives
 * @returns a message.content part
*/
//Aquesta funcio dibuixa el hangman en si, en el vostre cas, haurieu de posar a cada case la imatge que volgueu que es mostri
function hangmanDraw (lives) {
    var statusHang = ""
    switch (lives) {
        case 9:
            statusHang = statusHang + "<:empty:840679402790846464><:empty:840679402790846464>\n<:empty:840679402790846464><:empty:840679402790846464>\n<:empty:840679402790846464><:empty:840679402790846464>"
            break;
        case 8:
            statusHang = statusHang + "<:empty:840679402790846464><:empty:840679402790846464>\n" + "<:empty:840679402790846464><:empty:840679402790846464>\n" + "<:3a_1:840694686251352114><:3b_1:840694685973479456>"
            break;
        case 7:
            statusHang = statusHang + "<:1a_1:840694686212554773><:empty:840679402790846464>\n<:2a:840694686306140170><:empty:840679402790846464>\n<:3a_2:840694686276386876><:3b_1:840694685973479456>"
            break;
        case 6:
            statusHang = statusHang + "<:1a_2:840694686217273344><:1b_1:840694686347034715>\n" + "<:2a:840694686306140170><:empty:840679402790846464>\n" + "<:3a_2:840694686276386876><:3b_1:840694685973479456>"
            break;
        case 5:
            statusHang = statusHang + "<:1a_2:840694686217273344><:1b_2:840694686264066049>\n" + "<:2a:840694686306140170><:empty:840679402790846464>\n" + "<:3a_2:840694686276386876><:3b_1:840694685973479456>"
            break;
        case 4:
            statusHang = statusHang + "<:1a_2:840694686217273344><:1b_3:840694686007296021>\n" + "<:2a:840694686306140170><:2b_1:840694686213865482>\n" + "<:3a_2:840694686276386876><:3b_1:840694685973479456>"
            break;
        case 3:
            statusHang = statusHang + "<:1a_2:840694686217273344><:1b_3:840694686007296021>\n<:2a:840694686306140170><:2b_2:840694685986586645>\n<:3a_2:840694686276386876><:3b_1:840694685973479456>"
            break;
        case 2:
            statusHang = statusHang + "<:1a_2:840694686217273344><:1b_3:840694686007296021>\n" + "<:2a:840694686306140170><:2b_3:840694686264066048>\n" + "<:3a_2:840694686276386876><:3b_1:840694685973479456>"
            break;
        case 1:
            statusHang = statusHang + "<:1a_2:840694686217273344><:1b_3:840694686007296021>\n" + "<:2a:840694686306140170><:2b_4:840694686394089552>\n" + "<:3a_2:840694686276386876><:3b_2:840694686267736124>"
            break;
        case 0:
            statusHang = statusHang + "<:1a_2:840694686217273344><:1b_3:840694686007296021>\n" + "<:2a:840694686306140170><:2b_5:840694686053957673>\n" + "<:3a_2:840694686276386876><:3b_3:840694686066671628>"
            break;
    }
    return statusHang
}
//Si guardeu player.word com un string, l'heu de transformar en array per fer les comparacions mes facilment
player.word = player.word.split("")

var letter = interaction.values[0].substring("hangman_".length) //Per vosaltres el valor seria la lletra que ha escrit
//EN EL MEU CAS NO NECESSITO FER CONFIRMACIO DE SI HA ESCRIT LA LLETRA PERQUE DISCORD HO AMAGA!!!
/*us recomano utilitzar player.letters dins de document.getElementById("input").onkeydown per substituir les lletres ja endevinades per "":

player.letters = player.letters.join("")
var regex = new RegExp("^[" + player.letters + "]", "g");
document.getElementById("name").onkeyup = function(e) {
	this.value = this.value.replace(regex, '');
}
* aquest codi no impedeix que s'escriguin caracters especials!
*/

//Comprova si la lletra esta a la paraula
var letterIsIn = false
player.word.forEach((element, index) => {
    if (element.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === letter.toLowerCase()) { //Comprova sense tenir en compte nombres, simbols o accents, i no fa diferencia entre majuscules i minuscules
        letterIsIn = true
        player.guessed[index] = element //Si l'ha encertat, canvia els interrogants adients per la lletra. Si l'usuari ha escrit "E" i la seva paraula es "Hunter x Hunter", "?????? ? ??????" passaria a ser "????e? ? ????e?"
    }
})

// Aixo va molt be per debug: console.log(`word: ${player.word} || guessed: ${player.guessed}`)

// Si la paraula esta completa, marca que ha guanyat
if (player.word.join("") === player.guessed.join("")) { 
    //console.log("win")
    player.win = true
    msg = this.msgConstructor(client, player) //Aqui heu de posar el que voleu que passi quan l'usuari guanyi
    return

} else { //Si no ha acabat, continua el joc

    //Si la lletra no esta, ha perdut una vida
    if (letterIsIn === false) player.lives-- 
    
    //Si no te mes vides, ha perdut
    if (player.lives === 0) { 
        //console.log("lose")
        player.lose = true
        msg = this.msgConstructor(client, player) //Aqui heu de posar el que voleu que passi quan l'usuari perdi
    }

    // Afegim la lletra que ha escrit perque ja no pugui repetir-la
    player.letters.push(letter) 

    msg = this.msgConstructor(client, player) //Aqui heu d'actualitzar la pantalla

}