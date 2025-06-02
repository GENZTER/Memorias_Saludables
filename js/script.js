// Variables del juego
let cards = [];// Array de cartas
let flippedCards = [];
let playerTurn = 1;// Jugador que inicia la partida
let lives = { 1: 7, 2: 7 };// Vidas de cadajugador
let points = { 1: 0, 2: 0 };// Puntos de cada jugador
let pairsFound = 0;

// Nuevo: Configuración para ocultar cartas al acertar
const hideMatchedCards = true; // Cambia a true para ocultar cartas al acertar

// Lista de pares de tarjetas (puedes agregar más en el futuro)
const cardData = [
  { image: "svg/calendario.png", text: "Coordinar visitas/llamadas.", recomendacion: "Crear un calendario compartido para coordinar las visitas, salidas o videollamadas." },
  { image: "svg/calendario.png", text: "Coordinar visitas/llamadas.", recomendacion: "Crear un calendario compartido para coordinar las visitas, salidas o videollamadas." },

  { image: "svg/cocinar.svg", text: "Cocinar juntos (1 vez/semana).", recomendacion: "Participar en la elaboración de los alimentos por lo menos una vez a la semana." },
  { image: "svg/cocinar.svg", text: "Cocinar juntos (1 vez/semana).", recomendacion: "Participar en la elaboración de los alimentos por lo menos una vez a la semana." },

  { image: "svg/leer.png", text: "Lectura en voz alta.", recomendacion: "Leer un libro juntos (lectura en voz alta)." },
  { image: "svg/leer.png", text: "Lectura en voz alta.", recomendacion: "Leer un libro juntos (lectura en voz alta)." },

  { image: "svg/fotos.svg", text: "Ver fotos/videos viejos.", recomendacion: "Ver álbumes de fotos o videos antiguos para generar conversación y recuerdos." },
  { image: "svg/fotos.svg", text: "Ver fotos/videos viejos.", recomendacion: "Ver álbumes de fotos o videos antiguos para generar conversación y recuerdos." },

  { image: "svg/pintar.png", text: "Tareas ligeras (si puede).", recomendacion: "Si la persona adulta mayor puede, asignarle tareas ligeras y significativas (ej. preparación para eventos familiares, doblar ropa)." },
  { image: "svg/pintar.png", text: "Tareas ligeras (si puede).", recomendacion: "Si la persona adulta mayor puede, asignarle tareas ligeras y significativas (ej. preparación para eventos familiares, doblar ropa)." },

  { image: "svg/conversando.png", text: "Paciencia y escucha.", recomendacion: "Tener paciencia y escucha activa." },
  { image: "svg/conversando.png", text: "Paciencia y escucha.", recomendacion: "Tener paciencia y escucha activa." },
  
  { image: "svg/parque.png", text: "Salir a caminar.", recomendacion: "Salir a caminar juntos." },
  { image: "svg/parque.png", text: "Salir a caminar.", recomendacion: "Salir a caminar juntos." },

  { image: "svg/hablando.svg", text: "Hablar de sus comidas.", recomendacion: "Hablar sobre sus comidas preferidas." },
  { image: "svg/hablando.svg", text: "Hablar de sus comidas.", recomendacion: "Hablar sobre sus comidas preferidas." },

  { image: "svg/huevo.svg", text: "Proteínas: vitales para la fuerza muscular.", recomendacion: "Proteínas: pechuga de pollo, espaldilla de res, pescado, huevos, legumbres." },
  { image: "svg/huevo.svg", text: "Proteínas: vitales para la fuerza muscular.", recomendacion: "Proteínas: pechuga de pollo, espaldilla de res, pescado, huevos, legumbres." },

  { image: "svg/manzana.svg", text: "Energía duradera con granos, frutas y verduras.", recomendacion: "Carbohidratos complejos: granos integrales (avena, arroz, quinoa), frutas y verduras." },
  { image: "svg/manzana.svg", text: "Energía duradera con granos, frutas y verduras.", recomendacion: "Carbohidratos complejos: granos integrales (avena, arroz, quinoa), frutas y verduras." },

  { image: "svg/aguacate.png", text: "Grasas buenas para el corazón y el cerebro.", recomendacion: "Grasas saludables: aguacate, aceite de oliva, frutos secos, pescados grasos (salmón, atún, sardina)." },
  { image: "svg/aguacate.png", text: "Grasas buenas para el corazón y el cerebro.", recomendacion: "Grasas saludables: aguacate, aceite de oliva, frutos secos, pescados grasos (salmón, atún, sardina)." },

  { image: "svg/brocoli.svg", text: "Fibra: clave para una buena digestión.", recomendacion: "Fibra: frutas, verduras, cereales integrales y legumbres." },
  { image: "svg/brocoli.svg", text: "Fibra: clave para una buena digestión.", recomendacion: "Fibra: frutas, verduras, cereales integrales y legumbres." },

  { image: "svg/vitamina_D.png", text: "Calcio y Vitamina D para huesos fuertes.", recomendacion: "Calcio y vitamina D: lácteos, verduras de hoja verde oscura (brócoli), exposición solar." },
  { image: "svg/vitamina_D.png", text: "Calcio y Vitamina D para huesos fuertes.", recomendacion: "Calcio y vitamina D: lácteos, verduras de hoja verde oscura (brócoli), exposición solar." },

  { image: "svg/hidratacion.svg", text: "¡A hidratarse! Agua, sopas y frutas frescas.", recomendacion: "Hidratación: agua, leche, sopas, caldos, frutas y verduras con alto contenido de agua (pepino, sandía)." },
  { image: "svg/hidratacion.svg", text: "¡A hidratarse! Agua, sopas y frutas frescas.", recomendacion: "Hidratación: agua, leche, sopas, caldos, frutas y verduras con alto contenido de agua (pepino, sandía)." },

  { image: "svg/pure.png", text: "Si cuesta tragar, ¡opta por lo blandito!", recomendacion: "En caso de que las personas adultas mayores tengan dificultad para masticar o deglutir optar por comidas con consistencias blandas (caldos, purés, verduras y frutas cocidas, picados finos)." },
  { image: "svg/pure.png", text: "Si cuesta tragar, ¡opta por lo blandito!", recomendacion: "En caso de que las personas adultas mayores tengan dificultad para masticar o deglutir optar por comidas con consistencias blandas (caldos, purés, verduras y frutas cocidas, picados finos)." },
];

// Elementos del DOM
// Elementos del DOM
const cardContainer = document.getElementById("card-container"); // Contenedor de las cartas
const turnIndicator = document.getElementById("turn-indicator"); // Turno
const statusMessage = document.getElementById("status");
const player1Lives = document.getElementById("player1-lives"); // Vidas del jugador 1
const player2Lives = document.getElementById("player2-lives"); // Vidas del jugador 2
const player1Points = document.getElementById("player1-points"); // Puntos del jugador 1
const player2Points = document.getElementById("player2-points"); // Puntos del jugador 2
const player1Name = document.getElementById("player1-name"); // Nombre del jugador 1
const player2Name = document.getElementById("player2-name"); // Nombre del jugador 2
const newGameButton = document.getElementById("new-game"); // Boton para el nuevo juego
const endGameButton = document.getElementById("end-game"); // Boton para terminar el juego.

// Iniciar un nuevo juego
function startNewGame() {
    // Seleccionar 10 pares aleatorios
    const uniquePairs = [];
    const uniqueImages = Array.from(new Set(cardData.map(card => card.image)));
    
    // Mezclar las imágenes para obtener 10 pares aleatorios
    shuffle(uniqueImages);
    const selectedImages = uniqueImages.slice(0, 10); // Solo 10 pares

    // Obtener los pares completos (20 tarjetas)
    selectedImages.forEach((image) => {
        const pair = cardData.filter(card => card.image === image);
        uniquePairs.push(...pair);
    });

    // Mezclar las 20 tarjetas seleccionadas
    cards = shuffle(uniquePairs);
    cardContainer.innerHTML = "";
    flippedCards = [];
    playerTurn = 1;
  
    // Mostramos las vidas disponibles de cada jugador
    lives = { 1: 7, 2: 7 };
    updateLives(1);
    updateLives(2);
    
    // Puntos disponibles de cada jugador
    points = { 1: 0, 2: 0 };
    pairsFound = 0;
    updatePoints();
    updateNames();
    updateTurnIndicator();// Turno del jugador que inicia la partida
    statusMessage.textContent = "";
    endGameButton.style.display = "block";

    // Crear tarjetas en el contenedor
    cards.forEach((data, index) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.innerHTML = `
            <div class="card-inner" data-index="${index}" data-image="${data.image}" data-text="${data.text}">
                <div class="card-back" style="background-color: #f9bc60;"></div>
                <div class="card-front">
                    <img src="${data.image}" alt="${data.text}">
                    <p class="card-text">${data.text}</p>
                </div>
            </div>`;
        cardContainer.appendChild(cardElement);
    });

    // Mostrar todas las cartas brevemente al inicio
    const allCards = document.querySelectorAll(".card-inner");
    allCards.forEach((card) => card.classList.add("flipped"));
    setTimeout(() => {
        allCards.forEach((card) => card.classList.remove("flipped"));
        cardContainer.addEventListener("click", handleCardClick);
    }, 3000); // Mostrar por 3 segundos
}


// Función para manejar el clic en una tarjeta
function handleCardClick(e) {
  const cardInner = e.target.closest(".card-inner");
  if (
    !cardInner ||
    cardInner.classList.contains("flipped") ||
    flippedCards.length === 2
  )
    return;

  // Voltear la tarjeta
  cardInner.classList.add("flipped");
  flippedCards.push(cardInner);

  // Si hay dos tarjetas volteadas, verificar si son iguales
  if (flippedCards.length === 2) {
    setTimeout(checkForMatch, 800);
  }
}
// Verificar si las dos tarjetas volteadas son iguales
function checkForMatch() {
    const [card1, card2] = flippedCards;
    const isMatch =
        card1.dataset.image === card2.dataset.image &&
        card1.dataset.text === card2.dataset.text;

    if (isMatch) {
        const matchedCard = cardData.find(card => card.image === card1.dataset.image && card.text === card1.dataset.text);
        if (matchedCard && matchedCard.recomendacion) {
            Swal.fire({
                title: "¡Felicidades!",
                text: matchedCard.recomendacion,
                icon: "success",
                confirmButtonText: "Aceptar",
                background: '#f9f9f9',
                toast: false,
                position: 'center',
            }).then(() => {
                pairsFound++;
                points[playerTurn]++;
                statusMessage.textContent = "¡Acierto!";
                if (hideMatchedCards) {
                    card1.parentElement.style.visibility = "hidden";
                    card2.parentElement.style.visibility = "hidden";
                }
                flippedCards = [];
                updatePoints();
                checkForWin();
            });
        }
    } else {
        statusMessage.textContent = "Intento fallido";

        lives[playerTurn]--;
        updateLives(playerTurn);

        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            flippedCards = [];
            toggleTurn();
            checkForWin();
        }, 1000);
    }
}

// Verificar si el juego ha terminado.
function checkForWin() {

  // // Verificar si ambos jugadores han perdido todas sus vidas. 
  if (lives[1] <= 0 && lives[2] <= 0) {
    if (points[1] > points[2]) {
      endGame("¡El Jugador 1 gana con " + points[1] + " puntos!", "success");
    } else if (points[2] > points[1]) {
      endGame("¡El Jugador 2 gana con " + points[2] + " puntos!", "success");
    } else if (points[2] == points[1]) {
      endGame("¡EMPATE!", "success");    
    }else {
      endGame("El juego ha terminado sin un ganador.", "info");
    }
  }

  // Verificar si todos los pares han sido encontrados
  if (pairsFound === 10) {
    if (points[1] > points[2]) {
      endGame("¡El Jugador 1 gana con " + points[1] + " puntos!", "success");
    } else if (points[2] > points[1]) {
      endGame("¡El Jugador 2 gana con " + points[2] + " puntos!", "success");
    } else if (points[2] == points[1]) {
      endGame("¡EMPATE!", "success");    
    }else {
      endGame("El juego ha terminado sin un ganador.", "info");
    }
  }  
}

// Mezclar tarjetas aleatoriamente
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Actualizar los puntos
function updatePoints() {
  player1Points.textContent = `${points[1]} puntos`;
  player2Points.textContent = `${points[2]} puntos`;
}

// Muestra los jugadores
function updateNames() {
  player1Name.textContent = `Jugador 1`;
  player2Name.textContent = `Jugador 2`;
}

// Actualizar el indicador de turno
function toggleTurn() {
  playerTurn = playerTurn === 1 ? 2 : 1;
  updateTurnIndicator();
}

function updateTurnIndicator() {
  turnIndicator.textContent = `Turno de Jugador ${playerTurn}`;
}

// Verificar si ambos jugadores han perdido todas sus vidas
function checkForGameOver() {
  if (lives[1] <= 0 && lives[2] <= 0) {
    // Determinar el ganador basado en los puntos
    if (points[1] > points[2]) {
      endGame("¡El Jugador 1 gana con " + points[1] + " puntos!", "success");
    } else if (points[2] > points[1]) {
      endGame("¡El Jugador 2 gana con " + points[2] + " puntos!", "success");
    } else if (points[2] == points[1]) {
      endGame("¡EMPATE!", "success");
    } else {
      endGame("El juego ha terminado sin un ganador.", "info");
    }
  }
}

function updateLives(player) {
  if (typeof player === "undefined") {
    console.error("El jugador no está definido.");
    return;
  }

  const livesContainer = document.getElementById(`player${player}-lives`);

  if (!livesContainer) {
    console.error(
      `El contenedor de vidas para el Jugador ${player} no se encontró.`
    );
    return;
  }

  // Limpia los corazones anteriores
  livesContainer.innerHTML = "";

  // Añade los corazones llenos
  for (let i = 0; i < lives[player]; i++) {
    const heart = document.createElement("img");
    heart.src = "svg/heart-full.svg";
    heart.alt = "Vida";
    heart.classList.add("heart");
    livesContainer.appendChild(heart);
  }

  // Añade los corazones vacíos
  for (let i = lives[player]; i < 7; i++) {
    const emptyHeart = document.createElement("img");
    emptyHeart.src = "svg/heart-empty.svg";
    emptyHeart.alt = "Sin vida";
    emptyHeart.classList.add("heart", "lose-life");
    livesContainer.appendChild(emptyHeart);
  }
}

// Finalizar el juego con SweetAlert2
function endGame(message, icon) {
  Swal.fire({
    title: message,
    icon: icon,
    showConfirmButton: false,
    timer: 2000,
    background: "#f9f9f9",
    timerProgressBar: true,
    toast: false, // Alertas en el centro
    position: "center",
    didClose: () => {
      // Solo recarga la página después de que se cierra la alerta
      window.location.reload();
    },
  });
}

// Eventos de los botones
newGameButton.addEventListener("click", () => {
  newGameButton.style.display = "none";
  startNewGame();
});

// endGameButton.addEventListener("click", endGame('El juego ha terminado sin un ganador.', 'info'));
endGameButton.addEventListener("click", () => {
  endGame("El juego ha terminado sin un ganador.", "info");
});

document.getElementById("new-game").addEventListener("click", () => {
  lives = { 1: 7, 2: 7 };
  updateLives(1);
  updateLives(2);
});


// Evento para mostrar la alerta de información
document.getElementById("info-button").addEventListener("click", () => {
    Swal.fire({
        title: "<strong>Memorias saludables</strong>",
        icon: "info",
        html: `
          <div class="row mb-3 text-center">
            <div class="col-12 themed-grid-col"><p style="color: #e16162; font-size:35px"><strong>UACM</strong></p></div>
            <div class="col-12 themed-grid-col"><p style="color: #001e1d; font-size:20px">Licenciatura en Nutrición y Salud</p></div>
            <div class="col-12 themed-grid-col"><p style="color: #001e1d; font-size:20px">Nutrición comunitaria</p></div>
          </div>  

          <div class="row mb-3 text-center">
            <div class="col-12 themed-grid-col"><strong>Autora:</strong></div>
            <div class="col-12 themed-grid-col">Ramírez Guzmán Iris Ariadna</div>
          </div>       

          <div class="row mb-3 text-center">
            <div class="col-12 themed-grid-col"><strong>Desarrollador:</strong></div>
            <div class="col-12 themed-grid-col">Rodríguez Cervantes Kevin Manzur</div>
          </div>           

          <h4>🖼️ Fuentes de iconos:</h4>
          <ul style="text-align: left;">
              <li><a href="https://www.flaticon.com/" target="_blank" style="color: #001e1d;">Flaticon</a></li>
              <li><a href="http://www.freepik.es/" target="_blank" style="color: #001e1d;">Freepik</a></li>
              <li><a href="https://www.svgrepo.com/" target="_blank" style="color: #001e1d;">SVG Repo</a></li>
          </ul>
          <div class="row mb-3 text-center">
            <div class="col-12 themed-grid-col">Versión: Beta 2.50 Lanzado:02-Junio-2025</div>
          </div>  
        `,
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: "Aceptar",
        background: "#f9f9f9",
        width: "450px",
        padding: "20px",
    });
});
