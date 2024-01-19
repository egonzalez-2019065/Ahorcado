
const palabras =  ["Numeros", "Computadora", "Pelota"];

function getPalabraRandom (palabras){
    return palabras[Math.floor(Math.random() * palabras.length())];
}


