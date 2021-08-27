document.addEventListener("keydown", function (evento) {
  if (evento.keyCode == 32) {
    console.log("Salta");
    if (nivel.muerto == false) saltar();
    else {
      nivel.velocidad = 9;
      nube.velocidad = 1;
      cactus.x = ancho + 100;
      nube.x = ancho + 100;
      nivel.puntuacion = 0;
      nivel.muerto = false;
    }
  }
});

var imgRex, imgNube, imgCactus, imgSuelo;

function cargaImagenes() {
  imgRex = new Image();
  imgNube = new Image();
  imgCactus = new Image();
  imgSuelo = new Image();

  imgRex.src = "./img/rex.svg";
  imgNube.src = "./img/nube.svg";
  imgCactus.src = "./img/cactus.svg";
  imgSuelo.src = "./img/suelo.png";
}

var ancho = 700;
var alto = 300;
var canvas, ctx;

function inicializa() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  cargaImagenes();
}

function borraCanvas() {
  canvas.width = ancho;
  canvas.height = alto;
}

var suelo = 200;

var tRex = {
  y: suelo,
  vy: 0,
  gravedad: 2,
  salto: 28,
  vymax: 9,
  saltando: false,
};
var nivel = { velocidad: 9, marcador: 0, muerto: false };
var cactus = { x: ancho + 100, y: suelo - 25 };
var nube = { x: 400, y: 100, velocidad: 1 };
var suelog = { x: 0, y: suelo + 10 };

function dibujaRex() {
  ctx.drawImage(imgRex, 0, 0, 64, 69, 100, tRex.y, 50, 50);
}
//----------------------------------------------------------------
function dibujaCactus() {
  ctx.drawImage(imgCactus, 0, 0, 64, 79, cactus.x, cactus.y, 40, 50);
}

function logicaCactus() {
  if (cactus.x < -100) {
    cactus.x = ancho + 100;
  } else {
    cactus.x -= nivel.velocidad;
  }
}
//-------------------------------------------------------------

function dibujaSuelo() {
  ctx.drawImage(imgSuelo, suelog.x, 0, 700, 30, 0, suelog.y, 700, 30);
}

function logicaSuelo() {
  if (suelog.x > 700) {
    suelog.x = 0;
  } else {
    suelog.x += nivel.velocidad;
  }
}

//-------------------------------------------------------------

function dibujaNube() {
  ctx.drawImage(imgNube, 0, 0, 82, 31, nube.x, nube.y, 82, 31);
}

function logicaNube() {
  if (nube.x < -100) {
    nube.x = ancho + 100;
  } else {
    nube.x -= 2;
  }
}

function saltar() {
  tRex.saltando = true;
  tRex.vy = tRex.salto;
}

function gravedad() {
  if (tRex.saltando == true) {
    if (tRex.y - tRex.vy - tRex.gravedad > suelo) {
      tRex.saltando = false;
      tRex.vy = 0;
      tRex.t = suelo;
    } else {
      tRex.vy -= tRex.gravedad;
      tRex.y -= tRex.vy;
    }
  }
}
function colision() {
  if (cactus.x >= 100 && cactus.x <= 150) {
    if (tRex.y >= suelo - 25) {
      nivel.muerto = true;
      nivel.velocidad = 0;
      nube.velocidad = 0;
    }
  }
}

function puntuacion() {
  ctx.font = "30px impact";
  ctx.fillStyle = "#555555";
  ctx.fillText = (`${nivel.marcador}`, 600, 50);

  if (nivel.muerto == true) {
    ctx.font = "60px impact";
    ctx.fillText(`Game Over`, 240, 150);
  }
}
//----------------------------------------------------------------
//Bucle principal

var FPS = 50;
setInterval(function () {
  principal();
}, 1000 / FPS);

function principal() {
  borraCanvas();
  gravedad();
  colision();
  logicaSuelo();
  logicaCactus();
  logicaNube();
  dibujaSuelo();
  dibujaCactus();
  dibujaNube();
  dibujaRex();
  puntuacion();
}
