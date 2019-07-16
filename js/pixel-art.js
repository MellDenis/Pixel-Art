var nombreColores = ['White', 'LightYellow',
  'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Bisque', 'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan',
  'Khaki', 'Yellow', 'Gold', 'Orange', 'DarkOrange', 'OrangeRed', 'Tomato', 'Coral', 'DarkSalmon', 'LightSalmon', 'LightCoral', 'Salmon', 'PaleVioletRed',
  'Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'Crimson', 'Red', 'FireBrick', 'DarkRed', 'Maroon',
  'Brown', 'Sienna', 'SaddleBrown', 'IndianRed', 'RosyBrown',
  'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru',
  'Chocolate', 'DarkKhaki', 'DarkSeaGreen', 'MediumAquaMarine',
  'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'Green', 'DarkGreen', 'OliveDrab', 'Olive', 'DarkOliveGreen', 'YellowGreen', 'LawnGreen',
  'Chartreuse', 'GreenYellow', 'Lime', 'SpringGreen', 'LimeGreen',
  'LightGreen', 'PaleGreen', 'PaleTurquoise',
  'AquaMarine', 'Cyan', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'DeepSkyBlue',
  'LightSeaGreen', 'CadetBlue', 'DarkCyan', 'Teal', 'Steelblue', 'LightSteelBlue', 'Honeydew', 'LightCyan',
  'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue',
  'DodgerBlue', 'CornflowerBlue', 'RoyalBlue', 'SlateBlue',
  'MediumSlateBlue', 'DarkSlateBlue', 'Indigo', 'Purple', 'DarkMagenta', 'Blue',
  'MediumBlue', 'DarkBlue', 'Navy', 'Thistle',
  'Plum', 'Violet', 'Orchid', 'DarkOrchid', 'Fuchsia', 'Magenta', 'MediumOrchid',
  'BlueViolet', 'DarkViolet', 'DarkOrchid',
  'MediumPurple', 'Lavender', 'Gainsboro', 'LightGray', 'Silver', 'DarkGray', 'Gray',
  'DimGray', 'LightSlateGray', 'DarkSlateGray', 'Black'
];

// Variable para guardar el elemento 'color-personalizado'
// Es decir, el que se elige con la rueda de color.
var colorPersonalizado = document.getElementById('color-personalizado');
var paleta = document.getElementById("paleta");
var grilla = document.getElementById("grilla-pixeles");
var btnBorrar = document.getElementById("borrar");
var estadoClick = false; 


//Genera la paleta de colores que se agregara a la section 
function createPalette() {
  for (let i = 0; i < nombreColores.length; i++) {
      let color = nombreColores[i];
      var cuadro = document.createElement("div");
      cuadro.className = "color-paleta";
      cuadro.style.backgroundColor = color;
      paleta.appendChild(cuadro);
    }
};

//Genera el panel donde se dibujara
function createGrid() {
  for (let i = 0; i < 1751; i++) {
    let pixel = document.createElement("div");
    grilla.appendChild(pixel);
  }
};

//Indicador de color de la paleta
function indicatorColor() {
  $(".color-paleta").click(function(){
    //var $color = $(this).css("background-color");
    //console.log($color);
    $("#indicador-de-color").css("background-color" ,$(this).css("background-color"));
   });
};

grilla.addEventListener("mousedown",clickStatus);
grilla.addEventListener("mouseup", clickStatus);
grilla.addEventListener("mouseover",paintPincel);
grilla.addEventListener("click",paintPixel);
btnBorrar.addEventListener("click",cleanAll);

//Se pinta por pixel de la grilla
function paintPixel(e) {
    e.target.style.backgroundColor = $("#indicador-de-color").css("background-color");
};

//Se pinta en la grilla como si fuera un pincel
function paintPincel(e) {
  //Si el mouse esta presionado
  if (estadoClick) {
    e.target.style.backgroundColor = $("#indicador-de-color").css("background-color");
  }
};

//Verifico si click derecho del mouse esta presionado o no
function clickStatus(e) {
  if (e.type === "mousedown") {
    estadoClick = true;
    //console.log("apretado");
    
  } ;
  if (e.type === "mouseup") {
    estadoClick = false;
    //console.log("noapretado");
  };
};

//Color seleccionado desde la rueda de colores
colorPersonalizado.addEventListener('change', 
  (function(e) {
    // Se guarda el color de la rueda en colorActual
     colorActual = colorPersonalizado.value;
    // El indicador-de-color al colorActual
    e.target.style.backgroundColor = $("#indicador-de-color").css("background-color",colorActual);
  })
);

//Nos permite borrar toda la grilla
function cleanAll() {
  //Guardo todos los div de le grilla, que serian los pixeles
  let $pixeles = $("#grilla-pixeles").children();
  //console.log($pixeles.length);
  //Por cada pixel le cambio el fondo a blanco
  $pixeles.each(function(){
    $(this).animate({backgroundColor: "#ffffff"},"slow");
  });
};

//Cargamos la imagen del superheroe que se elija
function loadSuperhero() {
  $("ul img").click(function () {
    //Guardo el atributo id para identificar que heroe cargar
    let $hero = $(this).attr("id");
    cargarSuperheroe(window[$hero]);
  });
};

function saveHero() {
  $("#guardar").click(function() {
    guardarPixelArt();
  });
};




$(document).ready(iniciar());

function iniciar() {
  createPalette();
  createGrid();
  indicatorColor();
  loadSuperhero();
  saveHero();
};

