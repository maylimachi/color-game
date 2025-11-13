let colors = [];
let numberOfSquares = 6;
let pickedColor;

const squares = document.querySelectorAll(".container div");
const colorDisplay = document.querySelector("#colorDisplay");
const span = document.querySelector("#message");
const h1 = document.querySelector("#title");
const resetButton = document.querySelector("#reset");
const hardButton = document.getElementById("hard");
const easyButton = document.getElementById("easy");

function iniciarJuego(){
    squares.forEach((div) => {div.classList.add("square")});
    colors = generateRandomColors(numberOfSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;

    squares.forEach((square, i) => {
        square.style.background = colors[i];
        square.addEventListener("click", () => manejarClick(square));
    }) 
}

function manejarClick(square){
    let clickedColor = square.style.background;
        if(clickedColor == pickedColor){
            document.getElementById("winSound").play();
            resetButton.style.boxShadow = `0 0 20px 5px ${pickedColor}`;
            h1.style.background = clickedColor;
            changeColors(pickedColor);
            span.textContent = "¡Felicitacion, Acertaste!";
            resetButton.textContent = "Jugar De Nuevo";

        }else{
            resetFuncion(square, "Intentalo Nuevamente", false);
        }
}

function changeColors(color){
    squares.forEach((square) => {
        square.style.background = color;
    })
}

function resetFuncion(elemento, str = "", nuevoJuego){
    resetButton.style.boxShadow = "none";
    elemento.style.background = "#121212";
    span.textContent = str;
    if (nuevoJuego){
        resetButton.textContent = "Nuevos colores";
        colors = generateRandomColors(numberOfSquares);
        pickedColor = pickColor();
        colorDisplay.textContent = pickedColor;
        actualizarVisibilidad();
    };
}

function pickColor(){
    let randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function randomColor() {
    let r = Math.floor(Math.random() * 256); 
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function generateRandomColors(num) {
    let arreglo = [];
    for (let i = 0; i < num; i++) {
        arreglo.push(randomColor());
    }
    return arreglo;
}

function actualizarVisibilidad(){
    squares.forEach((square, i) => {
        if (i < numberOfSquares) {
            square.style.display = "block";
            square.style.background = colors[i];
        } else {square.style.display = "none";}
    })
};

function cambiarDificultad(numeroNuevo){
    numberOfSquares = numeroNuevo;
    resetFuncion(h1, "", true);
}

resetButton.addEventListener("click", function(){
    resetFuncion(h1, "", true);
})

easyButton.addEventListener("click", function () {
    easyButton.classList.add("selectedEasy");
    hardButton.classList.remove("selectedHard");
    cambiarDificultad(3);
    
});

hardButton.addEventListener("click", function () {
    hardButton.classList.add("selectedHard");
    easyButton.classList.remove("selectedEasy");
    cambiarDificultad(6);
});

iniciarJuego();