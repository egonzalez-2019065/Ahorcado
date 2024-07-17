const palabras = ["computadora",
  "programacion",
  "software",
  "hardware",
  "internet",
  "algoritmo",
  "redes",
  "ciberseguridad",
  "blockchain",
  "IoT"];
const espacios = document.querySelector(".espacios");
const tecladoDiv  = document.querySelector(".teclado");
const intentos  = document.querySelector(".intentos b");
const ahorcado  = document.getElementById("ahorcado");
const modoJuego = document.querySelector(".modo-juego");
const jugarOtra = modoJuego.querySelector("button");

let palabraProvicional;
let intentosFallidos;
let palabraCorrecta;
const intentosMax = 7;

function nuevoJuego (){
  palabraCorrecta = [];
  intentosFallidos = 0;
  dibujoIntento(intentosFallidos);
  let { canvaInicial } = inicioCanva();
  canvaInicial();
  intentos.innerText = `${intentosFallidos} / ${intentosMax}`;
  espacios.innerHTML = palabraProvicional.split("").map(() => '<li class="letras"></li>').join("");
  tecladoDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
  modoJuego.classList.remove("show");
}

function palabraRandom  () {
    const palabra = palabras[Math.floor(Math.random()*palabras.length)];
    palabraProvicional = palabra.toLowerCase();
    nuevoJuego();
}

function juegoPerdido (partidaGanada) {
  setTimeout(() =>{
    const modoTexto = partidaGanada ? `Acertaste:` : `La palabra correcta era: `;
    modoJuego.querySelector("img").src = `imagenes/${partidaGanada ? 'bien' : 'mal'}.png`;
    modoJuego.querySelector("h4").innerText = `${partidaGanada ? 'Bien hecho' : 'Bien jugado'}`;
    modoJuego.querySelector("p").innerHTML = `${modoTexto} <b>${palabraProvicional.toUpperCase()}</b>`;

    modoJuego.classList.add("show");
  }, 300);
}

function jugar (button, letraPresionada) {
    if(palabraProvicional.includes(letraPresionada)){
        [...palabraProvicional].forEach((letras, index) => {
            if(letras === letraPresionada){
                palabraCorrecta.push(letras);
                espacios.querySelectorAll("li")[index].innerText = letras; 
                espacios.querySelectorAll("li")[index].classList.add("correcta"); 
            }
        });
    }else{
        intentosFallidos++;
        dibujoIntento(intentosFallidos);
    }
    button.disabled = true;
    intentos.innerText = `${intentosFallidos} / ${intentosMax}`;
    if(intentosFallidos === intentosMax) return juegoPerdido(false);
    if(palabraCorrecta.length === palabraProvicional.length) return juegoPerdido(true);


}

for(let i = 97; i<= 122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    tecladoDiv.appendChild(button); 
    button.addEventListener("click", e => jugar(e.target, String.fromCharCode(i)));
}

function inicioCanva () {
    let context = ahorcado.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 4;
  
    const lineas = (fromX, fromY, toX, toY) => {
      context.moveTo(fromX, fromY);
      context.lineTo(toX, toY);
      context.stroke();
    };
  
    const palito = () => {
      lineas(150, 20, 150, 35);
    };

    const cabeza = () => {
      context.beginPath();
      context.arc(150, 50, 15, 0, Math.PI * 2, true);
      context.stroke();
    };
  
    const cuerpo = () => {
        lineas(150, 65, 150, 100);
    };
  
    const brazoIzquierdo = () => {
        lineas(150, 70, 130, 85);
    };
  
    const brazoDerecho = () => {
        lineas(150, 70, 170, 85);
    };
  
    const piernaIzquierda = () => {
        lineas(150, 100, 140, 115);
    };
  
    const piernaDerecha = () => {
        lineas(150, 100, 160, 115);
    };

      const canvaInicial = () => {
      context.clearRect(0, 0, ahorcado.width, ahorcado.height);
      lineas(100, 20, 100, 131);
      lineas(100, 20, 150, 20);
    };
  
    return { canvaInicial, palito , cabeza, cuerpo, brazoIzquierdo, brazoDerecho, piernaIzquierda, piernaDerecha };
  };

  function dibujoIntento  (intentosFallidos)  {
    let { palito, cabeza, cuerpo, brazoIzquierdo, brazoDerecho, piernaIzquierda, piernaDerecha } = inicioCanva();
    switch (intentosFallidos) {
      case 1:
          palito();
        break;
      case 2:
        cabeza();
        break;
      case 3:
        cuerpo();
        break;
      case 4:
        brazoIzquierdo();
        break;
      case 5:
        brazoDerecho();
        break;
      case 6:
        piernaIzquierda();
        break;
      case 7:
        piernaDerecha();
      default:
        break;
    }
  };
  palabraRandom();
jugarOtra.addEventListener("click",palabraRandom);
