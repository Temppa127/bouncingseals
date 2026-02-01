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
  const mult = 1 + ((Math.random()/2.5) - 0.2)

  obj.style.left = x + "px";
  obj.style.top = y + "px";

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
