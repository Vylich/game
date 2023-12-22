const gameScene = new Phaser.Scene('Game');
let POSITION_NEW_X;
let POSITION_NEW_Y = 50;

const fruitKiwi = {
  name: 'kiwi',
  id: 1,
  scale: 0.1,
  size: 50,
  xImage: 0,
  yImage: 0,
  air: 0.06,
  bounce: 0.5,
  x: 400,
  score: 8,
};

const fruitApple = {
  name: 'apple',
  id: 5,
  scale: 0.04,
  size: 130,
  xImage: 0,
  yImage: 0,
  air: 0.06,
  bounce: 0.5,
  x: 400,
  score: 128,
};

const fruitCucumber = {
  name: 'cucumber',
  id: 0,
  scale: 0.03,
  size: 35,
  xImage: 0,
  yImage: 0,
  air: 0.06,
  bounce: 0.5,
  x: 400,
  score: 4,
};

const fruitLemon = {
  name: 'lemon',
  id: 2,
  scale: 0.12,
  size: 65,
  xImage: 0,
  yImage: 0,
  air: 0.06,
  bounce: 0.5,
  x: 400,
  score: 16,
};

const fruitPineapple = {
  name: 'pineapple',
  id: 6,
  scale: 0.43,
  size: 150,
  xImage: 0,
  yImage: 0,
  air: 0.06,
  bounce: 0.5,
  x: 400,
  score: 256,
};

const fruitTomato = {
  name: 'tomato',
  id: 4,
  scale: 0.08,
  size: 115,
  xImage: 0,
  yImage: 0,
  air: 0.1,
  bounce: 0.5,
  x: 400,
  score: 64,
};

const fruitWatermelon = {
  name: 'watermelon',
  id: 7,
  scale: 0.1,
  size: 200,
  xImage: 10,
  yImage: -17,
  air: 0.01,
  bounce: 0.5,
  x: 400,
  score: 512,
};

const fruitOrange = {
  name: 'orange',
  id: 3,
  scale: 0.1,
  size: 100,
  xImage: 0,
  yImage: 0,
  air: 0.03,
  bounce: 0.5,
  x: 400,
  score: 32,
};

// const fruitsObj = [
//   {
//     id: 0,
//     config: {
//       name: 'cucumber',
//       id: 0,
//       scale: 0.03,
//       size: 35,
//       xImage: 0,
//       yImage: 0,
//       air: 0.06,
//       bounce: 0.5,
//       x: 400,
//     },
//   },
// ];
const fruits = [
  fruitCucumber,
  fruitKiwi,
  fruitLemon,
  fruitOrange,
  fruitTomato,
  fruitApple,
  fruitPineapple,
  fruitWatermelon,
];
console.log(fruits);

const randomFruit = (arr, score) => {
  let res = 0;
  if (score > 100 && score < 400) {
    res = Math.floor(Math.random() * (arr.length));
  }
  if (score > 400 && score < 800) {
    res = Math.floor(Math.random() * (arr.length));
  }
  if (score > 800 && score < 1200) {
    res = Math.floor(Math.random() * (arr.length));
  }

  if (score > 1200) {
    res = Math.floor(Math.random() * arr.length);
  }
  return res;
};

gameScene.preload = function () {
  this.load.image('back', 'assets/background.png');
  this.load.image('platform', 'assets/platform.png');
  this.load.image('border', 'assets/border.png');
  this.load.image('orange', 'assets/orange.png');
  this.load.image('watermelon', 'assets/watermelon.png');
  this.load.image('kiwi', 'assets/kiwi.png');
  this.load.image('apple', 'assets/apple.png');
  this.load.image('cucumber', 'assets/cucumber.png');
  this.load.image('lemon', 'assets/lemon.png');
  this.load.image('pineapple', 'assets/pineapple.png');
  this.load.image('tomato', 'assets/tomato.png');
  this.load.image('score', 'assets/score.png');
};

gameScene.create = function () {
  this.bg = this.add.sprite(0, 0, 'back');
  this.bg.setOrigin(0, 0);

  // let timeStartSensor;
  // let timeEndSensor;
  // const checkGameOver = (start, end) => {
  //   let res = 0;
  //   if (start > 0 && end > 0) {
  //     res = end - start;
  //   }
  //   if (end < start) {
  //     res = 3000;
  //   }
  //   return res;
  // };

  const score = this.add.image(60, 30, 'score').setScale(0.1);

  score.setDataEnabled();
  score.data.set('score', 0);
  // score.data.set('game', 0);

  const text = this.add.text(100, 20, '', {
    font: '24px Courier',
    fill: '#00ff00',
  });
  text.setText(['Score: ' + score.data.get('score')]);

  let randomFruitItem = randomFruit(fruits, score.data.values.score);

  let moveX = true;
  const canCollusion = this.matter.world.nextGroup();
  let fruit = this.add
    .container(fruits[randomFruitItem].x, POSITION_NEW_Y, [
      gameScene.add
        .image(
          fruits[randomFruitItem].xImage,
          fruits[randomFruitItem].yImage,
          fruits[randomFruitItem].name
        )
        .setScale(fruits[randomFruitItem].scale),
    ])
    .setSize(fruits[randomFruitItem].size, fruits[randomFruitItem].size)
    .setName(fruits[randomFruitItem].name);
  this.input.on('pointermove', (pointer) => {
    if (moveX === true) {
      fruits[randomFruitItem].x = pointer.worldX;
      fruit.x = pointer.worldX;
    }
  });
  score.on('changedata-score', function (gameObject, value) {
    text.setText(['Score: ' + score.data.get('score')]);
  });
  // score.on('changedata-game', function (gameObject, value) {
  //   if (score.data.get('game') < 3000) {
  //     console.log('все норм');
  //   }
  //   if (score.data.get('game') >= 3000) {
  //     console.log('конец игры');
  //   }
  // });





  this.input.on('pointerup', function () {
    this.physicsContainerFruit = gameScene.matter.add
      .gameObject(fruit)
      .setData('id', `${fruits[randomFruitItem].id}`)
      .setData('score', `${fruits[randomFruitItem].score}`)
      .setCircle()
      .setFrictionAir(fruits[randomFruitItem].air)
      .setBounce(fruits[randomFruitItem].bounce)
      .setCollisionGroup(canCollusion);
    moveX = false;
    randomFruitItem = randomFruit(fruits, score.data.values.score);
    fruit = gameScene.add
      .container(fruits[randomFruitItem].x, POSITION_NEW_Y, [
        gameScene.add
          .image(
            fruits[randomFruitItem].xImage,
            fruits[randomFruitItem].yImage,
            fruits[randomFruitItem].name
          )
          .setScale(fruits[randomFruitItem].scale),
      ])
      .setSize(fruits[randomFruitItem].size, fruits[randomFruitItem].size)
      .setName(fruits[randomFruitItem].name);
    moveX = true;
  });

  let obj = this.add.image(60, 30, 'score').setScale(0.1);
  obj.setDataEnabled();
  obj.setData('collisionendObj', 'false')

  obj.on('changedata', function(gameObject, value) {
    console.log(gameObject, value)
    if(gameObject.data.values.collisionendObj === 'false') {
      const checkGameOver = () => {
        console.log('привет')
        if (gameObject.data.values.collisionendObj === 'false') {
          console.log('gameOver')
          gameScene.scene.restart();
        }
      }
      setTimeout(checkGameOver, 3000)
    }
  })


  this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
    if (this.static.isSensor) {
      if (bodyA.gameObject) {
        if (bodyA.gameObject.name === 'checkEnd') {
          obj.data.values.collisionendObj = 'false'
          console.log(obj.data.values.collisionendObj)
        }
      }
    }
    if (
      bodyA.gameObject.name === bodyB.gameObject.name &&
      bodyA.gameObject.name !== 'watermelon' &&
      bodyB.gameObject.name !== 'watermelon'
    ) {
      bodyB.gameObject.destroy();
      let upFruit = Number(bodyA.gameObject.data.list.id) + 1;
      if (upFruit < 8) {
        let fruit1 = gameScene.add
          .container(bodyA.gameObject.x, bodyA.gameObject.y, [
            gameScene.add
              .image(
                fruits[upFruit].xImage,
                fruits[upFruit].yImage,
                fruits[upFruit].name
              )
              .setScale(fruits[upFruit].scale),
          ])
          .setSize(fruits[upFruit].size, fruits[upFruit].size)
          .setName(fruits[upFruit].name);
        let fruitContainer1 = gameScene.matter.add
          .gameObject(fruit1)
          .setData('id', `${fruits[upFruit].id}`)
          .setData('score', `${fruits[upFruit].score}`)
          .setCircle()
          .setFrictionAir(fruits[upFruit].air)
          .setBounce(fruits[upFruit].bounce)
          .setCollisionGroup(canCollusion);
        bodyA.gameObject.destroy();
        score.data.values.score += fruits[upFruit].score;
      }
    }
  });
  this.matter.world.on('collisionend', (event, bodyA, bodyB) => {
    if (this.static.isSensor) {
      if (bodyA.gameObject) {
        if (bodyA.gameObject.name === 'checkEnd') {
          // const time = new Date();
          // timeEndSensor = time.getTime();
          // score.data.values.game = checkGameOver(timeStartSensor, timeEndSensor);
          obj.data.values.collisionendObj = 'true'
          console.log(obj.data.values.collisionendObj)
        }
      }
    }
  });



  this.static = this.matter.add
    .image(300, 160, 'platform', null, {
      isSensor: true,
      isStatic: true,
    })
    .setScale(1, 0.01)
    .setName('checkEnd');

  this.matter.add.image(-30, this.sys.game.config.height / 2, 'border', null, {
    isStatic: true,
  });
  this.matter.add.image(630, this.sys.game.config.height / 2, 'border', null, {
    isStatic: true,
  });
  this.matter.add.image(300, 800, 'platform', null, { isStatic: true });
};

gameScene.update = function () {};

const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 800,
  physics: {
    default: 'matter',
    matter: {
      debug: false,
      showBody: true,
      showStaticBody: true,
      gravity: {
        y: 0.8,
      },
    },
  },
  scene: gameScene,
};

let game = new Phaser.Game(config);
