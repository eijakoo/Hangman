const parentDiv = document.getElementById("boxi2");
const button = document.querySelector("button");
const input = document.querySelector("input");
let myImage = document.querySelector("img");
let imageSrc = myImage.getAttribute("src");
let secretWord = "";
let counter = 0;
let arrayWord = [];
const gameOver = 6;
let failedGuesses = 0;
let allGuesses = [];
let rightGuesses = 0;

/* Asetetaan alkuasetukset
buttonin arvoksi "Uusi peli", input-kenttä ja teksti piiloon,  */
document.querySelector("button").innerHTML = "Uusi peli"
input.style.display = "none";
labelInChar.style.display = "none";


// Arvotaan sana sanalistasta
function selectWord(){
    let wordList = ["kesä","kukko","harakka","televisio","tuoli","teatteri","ankka","ambulanssi","fakiiri","frakki","ympyrä","örkki"];
    secretWord = wordList[Math.floor(Math.random() * 10) ];
    return secretWord;
}

/* Asetetaan sana arrayksi ja luodaan tarvittavat input-kentät
   palauttaa sanan array-muodossa*/
function setWord() {
    let i = 0;
    secretWord = selectWord().toUpperCase();

    // Sana arrayksi
    for ( j = 0; j < secretWord.length; j++) {
        console.log(secretWord.charAt(j));
        arrayWord.push(secretWord.charAt(j));
    }

    // Poistetaan vanhat input-kentät
    let inputItem = parentDiv.getElementsByTagName("input");
    while(inputItem.length > 0) {
        parentDiv.removeChild(inputItem[0]);
    }

    // Luodaan uuden sanan input-kentät
    while (i < secretWord.length) {
        inputItem = document.createElement("input");
        inputItem.setAttribute("disabled", "");
        inputItem.setAttribute("id", i);
        inputItem.setAttribute("name", i);
        inputItem.setAttribute("size", 1);
        parentDiv.appendChild(inputItem);
        i++;
    }
    return arrayWord;
}

/* Alustetaan muuttujia ja tekstejä tyhjiksi uutta peliä varten*/
function newGame() {
    document.querySelector("button").innerHTML = "Arvaa";
    document.getElementById("win").innerHTML = "";
    document.getElementById("loose").innerHTML = "";
    document.getElementById("failed").innerHTML = "Huteja saa tulla: 6";
    document.getElementById("guessesNumber").innerHTML = "Arvauksia: ";
    document.getElementById("error").innerHTML = "";
    document.getElementById("guesses").innerHTML = "Arvatut kirjaimet: ";
    input.style.display = "initial";
    labelInChar.style.display = "initial";
    imageSrc = "images/kuva0.jpg";
    myImage.setAttribute ("src", imageSrc);
    input.removeAttribute("disabled");
    counter = 0;
    arrayWord = [];
    failedGuesses = 0;
    allGuesses = [];
    rightGuesses = 0;

    // Input kenttään kursori aktiiviseksi
    input.focus();
    
    // Asetetaan uusi sana arvattavaksi
    arrayWord = setWord();
}


// Tarkistetaan syötetyn merkin oikeellisuus
function isOkChar(myChar){
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ-";
    let findChar = str.indexOf(myChar);

    if ((findChar === -1) || (myChar === "")) {
        document.getElementById("error").innerHTML = "Sallittuja merkkejä ovat kirjaimet tai väliviiva";
        input.focus();
        return false;
    } else {
        return true;
    }    
}

// Tarkistetaan onko kirjainta arvattu aiemmin
function isNewGuess(myChar) {
    if(allGuesses.includes(myChar)) {
        document.getElementById("error").innerHTML = "Olet jo arvannut tätä";
        input.focus();
        return false
    } else {
        return true;
    }
}

// Piirretään hirsipuuta ja tarvittaessa lopetetaan peli
function hangMan(failedGuesses){
    if (failedGuesses == gameOver) {
        imageSrc = "images/kuva6.jpg";
        myImage.setAttribute ("src", imageSrc);
        document.getElementById("loose").innerHTML = "Hävisit!  Sana oli: " +secretWord;
        input.style.display = "none";
        labelInChar.style.display = "none";
        document.querySelector("button").innerHTML = "Uusi peli"
    } else {
        imageSrc = "images/kuva"+failedGuesses+".jpg";
        myImage.setAttribute ("src", imageSrc);
    }
}

/* Buttonin klikkauksesta 
   ensin tarkistetaan käynnistetäänkö uusi peli vai
   otetaan tarkistettava merkki käsittelyyn,*/
button.onclick = function() {
    let myChar = input.value;
    myChar = myChar.toUpperCase();

    // Tyhjennetään merkkisyötteen input-kenttä ja virheilmoitukset
    document.getElementById("error").innerHTML = "";
    input.value = "";
    
    if (document.querySelector("button").innerHTML == "Uusi peli") {

        newGame();

    } else if (isOkChar(myChar) && isNewGuess(myChar)) {

        counter++;
      
        for(let j = 0; j < secretWord.length; j++) {
            // Tutkitaan löytyykö kirjain sanasta
            if (arrayWord[j].includes(myChar) ) {
                // Jos löytyy, niin laitetaan se/ne selvitettävän muodostavien input kenttien oikeaan kohtaan
                document.getElementById(j).value = myChar;   
                rightGuesses++;

                // Oikein arvattu kun kirjainten määrät ovat oikeat
                if (rightGuesses === secretWord.length) {
                    document.getElementById("win").innerHTML = "Arvasit oikein!";
                    input.setAttribute("disabled", "");
                    input.style.display = "none";
                    labelInChar.style.display = "none";
                    document.querySelector("button").innerHTML = "Uusi peli"
                }               
            }
        }

        // Pelinäytölle tulostetaan arvatut kirjaimet, oikeat kirjaimet ja väärien arvauksien jäljellä oleva määrä
        allGuesses.push(myChar);
        document.getElementById("guesses").innerHTML +=  myChar + "  ";
        document.getElementById("guessesNumber").innerHTML = "Arvauksia: " +counter;
        input.focus();

        if (!arrayWord.includes(myChar)){
            failedGuesses++;
            hangMan(failedGuesses);
            document.getElementById("failed").innerHTML = "Huteja saa tulla: " +`${6-failedGuesses}`;
        }   
    }
}
    
