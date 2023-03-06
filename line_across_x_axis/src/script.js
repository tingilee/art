console.clear();
const p = noise;
let branches = [];

class Branch {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.prevx = x;
    this.prevy = y;
    this.prevweight = random(0.5, 2);
    this.visible = true;
    this.velocity = {
      x: random(10, 70),
      y: random(-7, 7)
    };
  }
  walls () {
    this.prevx = this.x;
    this.prevy = this.y;
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.visible = false;
    }
  }
  draw () {
    line(this.prevx, this.prevy, this.x, this.y);
  }
  moveNoise () {
    this.prevweight = this.prevweight + random(-0.1, 0.1);
    strokeWeight(this.prevweight);
    this.velocity.x += p.simplex3(this.x * 0.005, this.y * 0.005, millis() * 0.0001) * 2;
    this.velocity.y += p.simplex3(this.y * 0.005, this.x * 0.005, millis() * 0.0001) * 2;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

function createBranches (amount) {
  branches = [];
  for (let i=0; i<amount; i++) {
    const x = 0; // width / 2
    const y = height / 2;
    branches.push(new Branch(x, y));
  }
}

/* ====== STEP 6 ====== */
function goToStep6 () {
  clear();
  createBranches(50);
  // strokeWeight(2);
  stroke(255, 255, 255, 50);
}
function step6 () {
  branches.forEach(branch => {
    if (branch.visible) {
      branch.moveNoise();
      branch.draw();
      branch.walls();
    }
  });
}

function setup () {
  createCanvas(windowWidth, windowHeight);
  strokeCap(SQUARE);
  goToStep6();
}

function mouseClicked () {
  windowResized();
}

function windowResized () {
  p.seed(random(1000));
  resizeCanvas(windowWidth, windowHeight);
  goToStep6();
}

function draw () {
  step6();
}