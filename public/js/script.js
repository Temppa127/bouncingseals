let rotation = 0
const background = document.getElementById("background")

function incrementHue() {
  rotation = (rotation + 1) % 360
  background.style.filter = `hue-rotate(${rotation}deg)`
}

requestAnimationFrame(function animate() {
  incrementHue()
  requestAnimationFrame(animate)
})

const game = document.getElementById("seals");
const seals = [];
const fish =  []
const speed = 2;

function parallaxScale(z) {
  return Math.pow(1.5, z / 5)
}


// Source - https://stackoverflow.com/a/1527820
// Posted by Ionuț G. Stan, modified by community. See post 'Timeline' for change history
// Retrieved 2026-03-16, License - CC BY-SA 4.0
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function spawnSeal() {
  const obj = document.createElement("div");
  obj.className = "object";

  const base = document.createElement("div");
  base.className = "base";

  const anim = document.createElement("div");
  anim.className = "anim";

  obj.appendChild(base);
  obj.appendChild(anim);

  const y = Math.random() * (game.clientHeight - 80);
  const x = game.clientWidth;


  const mult = parallaxScale(getRandomInt(-5,5));

  obj.style.left = x + "px";
  obj.style.top = y + "px";

  obj.style.transform = `scale(${mult})`;

  game.appendChild(obj);

  seals.push({
    el: obj,
    x: x,
    m: mult
  });
}

// Move objects every frame
function update() {
  for (let i = seals.length - 1; i >= 0; i--) {
    const o = seals[i];
    o.x -= o.m * speed;
    o.el.style.left = o.x + "px";

    // Remove when off-screen
    if (o.x < -100) {
      o.el.remove();
      seals.splice(i, 1);
    }
  }

  requestAnimationFrame(update);
}

// Spawn every 1–2 seconds randomly
setInterval(() => {
  if (Math.random() > 0.333) {
    spawnSeal();
  }
}, 500);

update();


var mousePos;

document.onmousemove = handleMouseMove;

function handleMouseMove(event) {
  mousePos = {
    x: event.pageX,
    y: event.pageY
    };
  }
  

background.addEventListener("click", shootFish)

function shootFish() {
if(!mousePos){return}

  
  console.log("Clicked at " + String(mousePos.x) + ", " + String(mousePos.y))

}

console.log("hello world")
