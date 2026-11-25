const playButton = document.getElementById("playButton");
const result = document.getElementById("result");
const playerChoices = document.getElementById("playerChoice");
const pcChoice = document.getElementById("pcChoice");

let historicoPartidas = [];
let selectValue = playerChoices.value;
let listaOpciones = ["Piedra", "Papel", "Tijeras"];

playerChoices.addEventListener("change", (event) => {
  selectValue = event.target.value;
});

const determinarGanador = (jugador, pc) => {
  if (jugador === pc) return "Empate";
  if (
    (jugador === "Piedra" && pc === "Tijeras") ||
    (jugador === "Papel" && pc === "Piedra") ||
    (jugador === "Tijeras" && pc === "Papel")
  ) {
    return "Ganaste";
  }
  return "Perdiste";
};

const registrarPartidas = (jugador, pc, resultado) => {
  historicoPartidas.unshift({ jugador, pc, resultado });

  if (historicoPartidas.length > 5) {
    historicoPartidas.pop();
  }

  renderizarHtml();
};

const renderizarHtml = () => {
  result.innerHTML = "";
  for (const partida of historicoPartidas) {
    const item = document.createElement("p");
    
    item.className = "text-md md:text-2xl";
    let colorResultado = "text-amber-500";
    if (partida.resultado === "Ganaste") colorResultado = "text-emerald-400";
    if (partida.resultado === "Perdiste") colorResultado = "text-rose-700";
    item.innerHTML = `${partida.jugador} VS ${partida.pc} ->  <span class = "font-bold ${colorResultado}">${partida.resultado}`;
    result.appendChild(item);
  }
};

const selectAleatorio = () => {
  const opcionesPosibles = Math.floor(Math.random() * listaOpciones.length);
  return listaOpciones[opcionesPosibles];
};

playButton.addEventListener("click", (event) => {
  const jugadorPc = selectAleatorio();
  const resultado = determinarGanador(selectValue, jugadorPc);
  pcChoice.textContent = jugadorPc;

  registrarPartidas(selectValue, jugadorPc, resultado);
});
