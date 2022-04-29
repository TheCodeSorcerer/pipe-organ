
/**
 * Spring (for Penis)
 */
 p5.prototype.Spring = function(params) {
  // Spring simulation constants
  // ...defaultSpringVars
  this.M = 0.8,
  this.K = 0.05,
  this.D = 0.92,
  this.R = 150; // displacement???

  // defaultSpringVars
  // defaultSpringVars
  this.move = false;
  this.ps = this.R;
  this.vs = 0.0;
  this.as = 0;
  this.f = 0;

  this.basey = params.basey;
  this.basex = params.basex;
  this.angle = params.angle;
  this.restingHeight = params.restingHeight;
  this.currentHeight = params.currentHeight;
  this.girth = params.girth;
  this.girthScale = params.girthScale;
  this.image = params.image;

  this.initialDisplacement = params.initialDisplacement ? params.initialDisplacement : 50;
}

p5.prototype.Spring.prototype.draw = function() {
  let baseWidth = this.girthScale * (this.restingHeight - this.currentHeight) + this.girth;

  push();
  translate(this.basex, this.basey); // rotate
  rotate(this.angle);
  translate(-this.basex, -this.basey);

  imageMode(CENTER);
  image(this.image,
    this.basex, this.basey - this.currentHeight/2,
    2*baseWidth, this.currentHeight);

  pop();
}

p5.prototype.Spring.prototype.update = function() {
  if ( !this.move ) {
    this.f = -this.K * ( this.currentHeight - this.restingHeight );
    this.as = this.f / this.M;
    this.vs = this.D * (this.vs + this.as);
    this.currentHeight = this.currentHeight + this.vs;
  }

  if (abs(this.vs) < 0.1) {
    this.vs = 0.0;
  }

  if (this.move) {
    this.currentHeight = this.restingHeight - this.initialDisplacement;
  }
}

p5.prototype.Spring.prototype.aimAngle = function(angle) {
  this.angle = angle;
}

p5.prototype.Spring.prototype.setImage = function(image) {
  this.image = image;
}

/**
 * CumParticle (for cum)
 */
p5.prototype.CumParticle = function(position, angle, velocity, image, acc, lifespan, color, radius) {
  this.angle = angle;
  this.velocity = velocity;
  this.acceleration = acc ? acc : createVector(0, 0.3);

  this.image = image;
  this.position = position.copy();
  this.radius = radius ? radius : 10;
  this.lifespan = lifespan ? lifespan : 255;
  // for image, just do circles
  this.color = color ? color : 'white';

  this.lastRefractFlag = 0;
  this.currentRefractFlag = 0;
  this.lastRefractIndex = 1;
  this.currentRefractIndex = 1;
};

p5.prototype.CumParticle.prototype.run = function() {
  this.update();
  this.display();
};

p5.prototype.CumParticle.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 5;
};

p5.prototype.CumParticle.prototype.display = function() {
  if (!this.image) {
    ellipseMode(CENTER);
    fill(this.color);
    noStroke();
    circle(this.position.x, this.position.y, this.radius);
  } else {
    imageMode(CENTER);
    image(this.image, this.position.x, this.position.y, this.radius, this.radius * this.image.height / this.image.width);
  }
};

p5.prototype.CumParticle.prototype.isDead = function() {
  return this.lifespan < 0;
};


/**
 * CumParticleSystem (for lots of cum)
 */
 p5.prototype.CumParticleSystem = function(position, angle, vrange, image, acc, lifespan, color, radius) {
  this.origin = position.copy();
  this.angle = angle;
  this.particles = [];

  if (vrange) {
    this.vrange = vrange;
  } else {
    this.vrange = {
      x: [-1, 1],
      y: [-12, -9],
    }
  }
  this.vfunction = () => {
    const vx = random(this.vrange.x[0], this.vrange.x[1]);
    const vy = random(this.vrange.y[0], this.vrange.y[1]);
    return createVector(
      vx * cos(this.angle) - vy * sin(this.angle),
      vx * sin(this.angle) + vy * cos(this.angle)
    );
  }

  this.image = image ? image : null;
  this.imgArray = null;
  this.acceleration = acc ? acc : null;
  this.lifespan = lifespan ? lifespan : null;
  this.color = color ? color : null;
  this.colorArray = null;
  this.radius = radius ? radius : null;
}

p5.prototype.CumParticleSystem.prototype.addParticlesDelayed = function(N, T) {
  for (let i=0; i < N; i++) {
    setTimeout(() => {
      this.addParticle();
    }, T * i);
  }
}

p5.prototype.CumParticleSystem.prototype.addParticle = function() {
  let img = this.image;
  if (this.imgArray != null) {
    img = this.imgArray[floor(random(this.imgArray.length))]; // select a random image
  }

  let colr;
  if (this.colorArray) {
    colr = this.colorArray[floor(random(this.colorArray.length))];
  } else {
    colr = this.color;
  }

  let v = this.vfunction();
  this.particles.push(new CumParticle(this.origin, this.angle, v, img, this.acceleration, this.lifespan, colr, this.radius));
}

p5.prototype.CumParticleSystem.prototype.run = function() {
  for (let i = this.particles.length - 1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
}

p5.prototype.CumParticleSystem.prototype.setOrigin = function(origin) {
  this.origin = origin.copy();
}
p5.prototype.CumParticleSystem.prototype.aimAtAngle = function(origin, angle) {
  this.origin = origin.copy();
  this.angle = angle;
}

p5.prototype.CumParticleSystem.prototype.setVFunction = function(vfun) {
  this.vfunction = vfun;
};

p5.prototype.CumParticleSystem.prototype.setDefaultLifespan = function(lifespan) {
  this.lifespan = lifespan;
}

p5.prototype.CumParticleSystem.prototype.setDefaultColor = function(color) {
  this.color = color;
}

p5.prototype.CumParticleSystem.prototype.setDefaultColorArray = function(colorArray) {
  this.colorArray = colorArray;
}

p5.prototype.CumParticleSystem.prototype.setDefaultRadius = function(radius) {
  this.radius = radius;
}

p5.prototype.CumParticleSystem.prototype.setDefaultImage = function(image) {
  this.image = image;
}

p5.prototype.CumParticleSystem.prototype.setDefaultImageArray = function(imgArray) {
  this.imgArray = imgArray;
}

p5.prototype.CumParticleSystem.prototype.setColor = function(c) {
  this.color = c;
}

p5.prototype.CumParticleSystem.prototype.setRadius = function(r) {
  this.radius = r;
}

p5.prototype.CumParticleSystem.prototype.checkTargets = function(target) {
  const STICK_PROB = 0.02;
  let stucks = [];
  for (let i = this.particles.length -1; i >=0; i--) {
    let p = this.particles[i];
    if (abs(dist(p.position.x, p.position.y, target.x, target.y)) < target.r) {
      if (random() < STICK_PROB) {
        const stuckParticle = this.particles.splice(i, 1);
        stucks.push(stuckParticle[0]);
      }
    }
  }
  return stucks;
}

p5.prototype.CumParticleSystem.prototype.drawSimulatedParticles = function(pathColor) {


  /*createVector(
    vx * cos(this.angle) - vy * sin(this.angle),
    vx * sin(this.angle) + vy * cos(this.angle)
  );*/
  let p1 = {
    x: this.origin.x, y: this.origin.y,
    vx: this.vrange.x[0] * cos(this.angle) - this.vrange.y[0] * sin(this.angle),
    vy: this.vrange.x[0] * sin(this.angle) + this.vrange.y[0] * cos(this.angle)
  };
  let p2 = {
    x: this.origin.x, y: this.origin.y,
    vx: this.vrange.x[0] * cos(this.angle) - this.vrange.y[1] * sin(this.angle),
    vy: this.vrange.x[0] * sin(this.angle) + this.vrange.y[1] * cos(this.angle)
  };
  let p3 = {
    x: this.origin.x, y: this.origin.y,
    vx: this.vrange.x[1] * cos(this.angle) - this.vrange.y[0] * sin(this.angle),
    vy: this.vrange.x[1] * sin(this.angle) + this.vrange.y[0] * cos(this.angle)
  };
  let p4 = {
    x: this.origin.x, y: this.origin.y,
    vx: this.vrange.x[1] * cos(this.angle) - this.vrange.y[1] * sin(this.angle),
    vy: this.vrange.x[1] * sin(this.angle) + this.vrange.y[1] * cos(this.angle)
  };

  noStroke();
  fill(pathColor);

  let acc = this.acceleration ? this.acceleration : createVector(0, 0.3);
  let lifespan = this.lifespan ? this.lifespan : 255;
  while (lifespan >= 0) {
    console.log(lifespan);
    console.log(p1);

    circle(p1.x, p1.y, 2);
    circle(p2.x, p2.y, 2);
    circle(p3.x, p3.y, 2);
    circle(p4.x, p4.y, 2);

    p1.vx += acc.x; p1.vy += acc.y;
    p2.vx += acc.x; p2.vy += acc.y;
    p3.vx += acc.x; p3.vy += acc.y;
    p4.vx += acc.x; p4.vy += acc.y;

    p1.x += p1.vx; p1.y += p1.vy;
    p2.x += p2.vx; p2.y += p2.vy;
    p3.x += p3.vx; p3.y += p3.vy;
    p4.x += p4.vx; p4.y += p4.vy;

    lifespan -= 5;
  }
}

/**
 * 
 * @param {Image} image the image to use for the Penis
 * @param {number} basex the base of the shaft's x-location
 * @param {number} basey the base of the shaft's x-location
 * @param {number} angle the shaft's angle
 */
p5.prototype.Penis = function(image, basex, basey, angle) {

  const defaultWheelVars = {
    restingHeight: 300,
    currentHeight: 300,
    girth: 100,
    girthScale: 0.4,
    image
  };

  this.spring = new Spring({
    ...defaultWheelVars,
    basex, basey, angle
  });

  this.cumSourceScale = 5/6;

  const distance = this.spring.restingHeight * this.cumSourceScale;
  const sangle = angle - HALF_PI;
  const bx = basex + distance * cos(sangle);
  const by = basey + distance * sin(sangle);
  this.cumSystem = new CumParticleSystem(createVector(bx, by), angle);

  this.cumKeys = [];

  this.numCum = 50;
  this.cumDelay = 4;
}


p5.prototype.Penis.prototype.update = function() {
  this.cumSystem.run();
  this.spring.update();
  this.spring.draw();
}

p5.prototype.Penis.prototype.cum = function(numCum, cumDelay) {
  // CUM SOUND
  if (this.cumSound) {
    {
      if (this.cumSound.isPlaying()) {
        this.cumSound.stop();
      }
      this.cumSound.play();
    }
  }

  const NUM_CUM = numCum ? numCum : this.numCum;
  const CUM_DELAY = cumDelay ? cumDelay : this.cumDelay;
  const SHOOT_TIME = 50;

  if (this.numCum) console.log(`numCum = ${this.numCum}`);
  this.spring.move = true;
  this.cumSystem.addParticlesDelayed(NUM_CUM, CUM_DELAY);

  setTimeout(() => {
    this.spring.move = false;
  }, SHOOT_TIME);
}

p5.prototype.Penis.prototype.setNumCum = function(numCum) {
  this.numCum = numCum;
}
p5.prototype.Penis.prototype.setCumDelay = function(cumDelay) {
  this.cumDelay = cumDelay;
}

p5.prototype.Penis.prototype.bindCumKey = function(kc) {
  if (this.cumKeys.indexOf(kc) >= 0) return;
  this.cumKeys.push(kc);
}

p5.prototype.Penis.prototype.isBoundToKey = function(kc) {
  return (this.cumKeys.indexOf(kc) >= 0);
}

p5.prototype.Penis.prototype.throb = function() {
  this.spring.move = true;

  setTimeout(() => {
    this.spring.move = false;
  }, 50);
}

//---------------------------------------
//----- all setters go down here
//---------------------------------------
// COCK_REFACTOR: should be a constructor parameter??
p5.prototype.Penis.prototype.setGirth = function(girth) {
  this.spring.girth = girth;
}

p5.prototype.Penis.prototype.setHeight = function(height) {
  this.spring.restingHeight = height;
  this.spring.currentHeight = height;

  this.recalculateCumOrigin();
}

p5.prototype.Penis.prototype.setInitialHeight = function(height) {
  this.spring.restingHeight = height;

  this.recalculateCumOrigin();
}

p5.prototype.Penis.prototype.moveTo = function(xy) {
  this.spring.basex = xy.x;
  this.spring.basey = xy.y;

  this.recalculateCumOrigin();
}

p5.prototype.Penis.prototype.recalculateCumOrigin = function() {
  // COCK_REFACTOR: could make this private helper
  const distance = this.spring.restingHeight * this.cumSourceScale;
  const sangle = this.spring.angle - HALF_PI;
  const bx = this.spring.basex + distance * cos(sangle);
  const by = this.spring.basey + distance * sin(sangle);
  this.setCumOrigin(createVector(bx, by));
}

p5.prototype.Penis.prototype.setCumOrigin = function(origin) {
  this.cumSystem.origin = origin;
}

/**
 **  EXAMPLE
 * Cummer.setVelocityRange({x: [-XSPREAD, XSPREAD], y: [-YMIN, -YMAX]});
 * @param {x: Number[], y: Number[]} xyrange 
 */
p5.prototype.Penis.prototype.setVelocityRange = function(xyrange) {
  if (xyrange.x && xyrange.x.length === 2) {
    this.cumSystem.vrange.x = xyrange.x;
  }
  if (xyrange.y && xyrange.y.length === 2) {
    this.cumSystem.vrange.y = xyrange.y;
  }
}

p5.prototype.Penis.prototype.setAcceleration = function(acc) {
  this.cumSystem.acceleration = acc;
}

p5.prototype.Penis.prototype.setInitialDisplacement = function(di) {
  this.spring.initialDisplacement = di;
}

p5.prototype.Penis.prototype.setPenisImage = function(image) {
  this.spring.setImage(image);
}

p5.prototype.Penis.prototype.setCumColor = function(color) {
  this.cumSystem.setDefaultColor(color);
}

p5.prototype.Penis.prototype.setCumRadius = function(radius) {
  this.cumSystem.setDefaultRadius(radius);
}

p5.prototype.Penis.prototype.setCumImage = function(image) {
  this.cumSystem.setDefaultImage(image);
}

/**
 * If this is set, the cum image will cycle between different images,
 * instead of always doing the same one
 * @param {Array<Image>} imgArray 
 */
p5.prototype.Penis.prototype.setCumImageArray = function(imgArray) {
  this.cumSystem.setDefaultImageArray(imgArray);
}

p5.prototype.Penis.prototype.setCumSound = function(cumSound) {
  this.cumSound = cumSound;
}

p5.prototype.Penis.prototype.aimAtPoint = function(x, y) {
  let angle = atan2(y - this.spring.basey, x - this.spring.basex);
  this.aimAtAngle(angle + HALF_PI);
}

p5.prototype.Penis.prototype.aimAtAngle = function(angle) {
  this.spring.aimAngle(angle);

  const dist = this.spring.restingHeight * this.cumSourceScale;
  const bx = this.spring.basex + dist * cos(angle - HALF_PI);
  const by = this.spring.basey + dist * sin(angle - HALF_PI);
  // console.log(`basex: ${this.spring.basex}; basey: ${this.spring.basey}`);
  // console.log(`new: ${bx}, ${by}`);
  this.cumSystem.aimAtAngle(createVector(bx, by), angle);
}

p5.prototype.Penis.prototype.setDefaultCumSourceScale = function(prop) {
  this.cumSourceScale = prop;
}

/**
 * 
 */
p5.prototype.Penis.prototype.drawSimulatedParticles = function(pathColor) {
  this.cumSystem.drawSimulatedParticles(pathColor);
}

p5.prototype.Penis.prototype.enableClickToCum = function(numCum=50, cumDelay=4) {
  uxNoStroke();
  uxNoFill();
  this.box = uxRect(
    this.spring.basex - this.spring.girth,
    this.spring.basey - this.spring.restingHeight,
    this.spring.girth * 2,
    this.spring.restingHeight
  );
  const THIS = this;
  this.box.uxEvent('click', function() {
    console.log('box click');
    THIS.cum(numCum, cumDelay);
  });
}

// ---- IMAGES ----

/**
 * An image that stays in location
 * @param {*} params 
 */
 let FixedImage = function(params) {
  this.x = params.x;
  this.y = params.y;
  this.w = params.w;
  this.h = params.h;
  this.img = params.img;
}

FixedImage.prototype.draw = function() {
  image(this.img, this.x, this.y, this.w, this.h);
}

FixedImage.prototype.moveTo = function(x, y) {
  this.x = x;
  this.y = y;
}

/**
 * An image that rotates back and forth around a pivot point {rx, ry}
 * @param {*} params 
 */
let PivotingImage = function(params) {
  this.x = params.x;
  this.y = params.y;
  this.w = params.w;
  this.h = params.h;
  this.rx = params.rx;
  this.ry = params.ry;
  this.rmin = params.rmin;
  this.rmax = params.rmax;
  this.img = params.img;
}

PivotingImage.prototype.draw = function() {
  push();
  translate(this.rx, this.ry);
  rotate( (this.rmin + (this.rmax - this.rmin) * sin(frameCount/4) )/ 360 * TWO_PI);
  image(this.img, this.x - this.rx, this.y - this.ry, this.w, this.h);
  pop();
}

let PivotingImageWithSpeed = function(params) {
  this.x = params.x;
  this.y = params.y;
  this.w = params.w;
  this.h = params.h;
  this.rx = params.rx;
  this.ry = params.ry;
  this.rmin = params.rmin;
  this.rmax = params.rmax;
  this.img = params.img;

  this.speed = params.speed;
}

PivotingImageWithSpeed.prototype.draw = function() {
  push();
  translate(this.rx, this.ry);
  rotate( (this.rmin + (this.rmax - this.rmin) * sin(frameCount/this.speed) )/ 360 * TWO_PI);
  image(this.img, this.x - this.rx, this.y - this.ry, this.w, this.h);
  pop();
}