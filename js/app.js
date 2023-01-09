let myTimeout = null;
let x = 1980,
  z = 150,
  y = 0;
const morphElement = document.querySelector(".morph-section");
const donutElement = document.querySelector(".donut-section");

let AsciiMorph = (function () {
  "use strict";
  var element = null;
  var canvasDimensions = {};
  var renderedData = [];
  var framesToAnimate = [];

  function extend(target, source) {
    for (var key in source) {
      if (!(key in target)) {
        target[key] = source[key];
      }
    }
    return target;
  }
  function repeat(pattern, count) {
    if (count < 1) return "";
    var result = "";
    while (count > 1) {
      if (count & 1) result += pattern;
      (count >>= 1), (pattern += pattern);
    }
    return result + pattern;
  }
  function replaceAt(string, index, character) {
    return (
      string.substr(0, index) +
      character +
      string.substr(index + character.length)
    );
  }

  /**
   * AsciiMorph
   */

  function init(el, canvasSize) {
    // Save the element
    element = el;
    canvasDimensions = canvasSize;
  }
  function squareOutData(data) {
    var i;
    var renderDimensions = {
      x: 0,
      y: data.length,
    };

    // Calculate centering numbers
    for (i = 0; i < data.length; i++) {
      if (data[i].length > renderDimensions.x) {
        renderDimensions.x = data[i].length;
      }
    }

    // Pad out right side of data to square it out
    for (i = 0; i < data.length; i++) {
      if (data[i].length < renderDimensions.x) {
        data[i] = data[i] + repeat(" ", renderDimensions.x - data[i].length);
      }
    }

    var paddings = {
      x: Math.floor((canvasDimensions.x - renderDimensions.x) / 2),
      y: Math.floor((canvasDimensions.y - renderDimensions.y) / 2),
    };

    // Left Padding
    for (var i = 0; i < data.length; i++) {
      data[i] = repeat(" ", paddings.x) + data[i] + repeat(" ", paddings.x);
    }

    // Pad out the rest of everything
    for (var i = 0; i < canvasDimensions.y; i++) {
      if (i < paddings.y) {
        data.unshift(repeat(" ", canvasDimensions.x));
      } else if (i > paddings.y + renderDimensions.y) {
        data.push(repeat(" ", canvasDimensions.x));
      }
    }

    return data;
  }

  // Crushes the frame data by 1 unit.
  function getMorphedFrame(data) {
    var firstInLine,
      lastInLine = null;
    var found = false;
    for (var i = 0; i < data.length; i++) {
      var line = data[i];
      firstInLine = line.search(/\S/);
      if (firstInLine === -1) {
        firstInLine = null;
      }

      for (var j = 0; j < line.length; j++) {
        if (line[j] != " ") {
          lastInLine = j;
        }
      }

      if (firstInLine !== null && lastInLine !== null) {
        data = crushLine(data, i, firstInLine, lastInLine);
        found = true;
      }

      (firstInLine = null), (lastInLine = null);
    }

    if (found) {
      return data;
    } else {
      return false;
    }
  }

  function crushLine(data, line, start, end) {
    var centers = {
      x: Math.floor(canvasDimensions.x / 2),
      y: Math.floor(canvasDimensions.y / 2),
    };

    var crushDirection = 1;
    if (line > centers.y) {
      crushDirection = -1;
    }

    var charA = data[line][start];
    var charB = data[line][end];

    data[line] = replaceAt(data[line], start, " ");
    data[line] = replaceAt(data[line], end, " ");

    if (!(end - 1 == start + 1) && !(start === end) && !(start + 1 === end)) {
      data[line + crushDirection] = replaceAt(
        data[line + crushDirection],
        start + 1,
        "+*/\\".substr(Math.floor(Math.random() * "+*/\\".length), 1)
      );
      data[line + crushDirection] = replaceAt(
        data[line + crushDirection],
        end - 1,
        "+*/\\".substr(Math.floor(Math.random() * "+*/\\".length), 1)
      );
    } else if (
      (start === end || start + 1 === end) &&
      line + 1 !== centers.y &&
      line - 1 !== centers.y &&
      line !== centers.y
    ) {
      data[line + crushDirection] = replaceAt(
        data[line + crushDirection],
        start,
        "+*/\\".substr(Math.floor(Math.random() * "+*/\\".length), 1)
      );
      data[line + crushDirection] = replaceAt(
        data[line + crushDirection],
        end,
        "+*/\\".substr(Math.floor(Math.random() * "+*/\\".length), 1)
      );
    }

    return data;
  }

  function render(data) {
    var ourData = squareOutData(data.slice());
    renderSquareData(ourData);
  }

  function renderSquareData(data) {
    element.innerHTML = "";
    for (var i = 0; i < data.length; i++) {
      element.innerHTML = element.innerHTML + data[i] + "\n";
    }

    renderedData = data;
  }

  // Morph between whatever is current, to the new frame
  function morph(data) {
    clearTimeout(myTimeout);
    var frameData = prepareFrames(data.slice());
    animateFrames(frameData);
  }

  function prepareFrames(data) {
    var deconstructionFrames = [];
    var constructionFrames = [];

    var clonedData = renderedData;

    // If its taking more than 100 frames, its probably somehow broken
    // Get the deconscrution frames
    for (var i = 0; i < 100; i++) {
      var newData = getMorphedFrame(clonedData);
      if (newData === false) {
        break;
      }
      deconstructionFrames.push(newData.slice(0));
      clonedData = newData;
    }

    // Get the constuction frames for the new data
    var squareData = squareOutData(data);
    constructionFrames.unshift(squareData.slice(0));
    for (var i = 0; i < 100; i++) {
      var newData = getMorphedFrame(squareData);
      if (newData === false) {
        break;
      }
      constructionFrames.unshift(newData.slice(0));
      squareData = newData;
    }

    return deconstructionFrames.concat(constructionFrames);
  }

  function animateFrames(frameData) {
    framesToAnimate = frameData;
    animateFrame();
  }

  function animateFrame() {
    myTimeout = setTimeout(function () {
      renderSquareData(framesToAnimate[0]);
      framesToAnimate.shift();
      if (framesToAnimate.length > 0) {
        animateFrame();
      }
    }, 20);

    // framesToAnimate
  }
  function main(element, canvasSize) {
    if (!element || !canvasSize) {
      console.log("sorry, I need an element and a canvas size");
      return;
    }

    init(element, canvasSize);
  }
  return extend(main, {
    render: render,
    morph: morph,
  });
})();
var asciis = [
  [
    "                _ooOoo_",
    "               o8888888o",
    '               88" . "88',
    "               (| -_- |)",
    "               O\\  =  /O",
    "            ____/`---'\\____",
    "          .'  \\\\|     |//  `.",
    "         /  \\\\|||  :  |||//  \\",
    "        /  _||||| -:- |||||_  \\",
    "        |   | \\\\\\  -  /'| |   |",
    "        | \\_|  `\\`---'//  |_/ |",
    "        \\  .-\\__ `-. -'__/-.  /",
    "      ___`. .'  /--.--\\  `. .'___",
    '   ."" \'<  `.___\\_<|>_/___.\' _> \\"".',
    "  | | :  `- \\`. ;`. _/; .'/ /  .' ; |",
    "  \\  \\ `-.   \\_\\_`. _.'_/_/  -' _.' /",
    "===`-.`___`-.__\\ \\___  /__.-'_.'_.-'===",
    "                `=--=-'    ",
  ],
  [
    "       .--.                   .---.   ",
    "   .---|__|           .-.     |~~~|   ",
    ".--|===|--|_          |_|     |~~~|--.",
    "|  |===|  |'     .---!~|  .--|   |--| ",
    "|%%|   |  |.'    |===| |--|%%|   |  | ",
    "|%%|   |  |.'   |   | |__|  |   |  |  ",
    "|  |   |  |     |===| |==|  |   |  |  ",
    "|  |   |__|  .' |   |_|__|  |~~~|__|  ",
    "|  |===|--|   .'|===|~|--|%%|~~~|--|  ",
    "^--^---'--^    `-'`---^-^--^--^---'--'",
  ],

  // [
  //   "                             /",
  //   "                            /",
  //   "                           /;",
  //   "                          //",
  //   "                         ;/",
  //   "                       ,//",
  //   "                   _,-' ;_,,",
  //   "                _,'-_  ;|,'",
  //   "            _,-'_,..--. |",
  //   "    ___   .'-'_)'  ) _)\\|      ___",
  //   "  ,'\"\"\"`'' _  )   ) _)  ''--'''_,-'",
  //   "-={-o-  /|    )  _)  ) ; '_,--''",
  //   "  \\ -' ,`.  ) .)  _)_,''|",
  //   "   `.\"(   `------''     /",
  //   "     `.\\             _,'",
  //   "       `-.____....-\\\\",
  //   "                 || \\\\",
  //   "                 // ||",
  //   "                //  ||",
  //   "            _-.//_ _||_,",
  //   "              ,'  ,-'/",
  // ],
  [
    "   .________________-----_________",
    "  /  _             /   /         /|",
    " /  ._.`          /   /    .   ./ |",
    "/________________/___/____|0000|  |",
    "|   /|\\         |UUUU|    |0000| |",
    "|  . | ,         `''`          | p|",
    "|  | | |         .---.   o     |  |",
    "|  | | |       .` .o, `.       |  |",
    "|  | | |       -  OOO  -       |  |",
    "|  | | |       '  'o`  '       | /|",
    "|  | | |       /'....-'       |/A|",
    "|--' | '------|---------|------|A/|",
    " ___|/_______|_________|______ /",
  ],

  [
    "         ____",
    "        o8%8888,",
    "      o88%8888888.",
    "     8'-    -:8888b",
    "    8'         8888",
    "   d8.-=. ,==-.:888b",
    "   >8 `~` :`~' d8888",
    "   88         ,88888",
    "   88b. `-~  ':88888",
    "   888b ~==~ .:88888",
    "   88888o--:':::8888",
    "   `88888| :::' 8888b",
    "   8888^^'       8888b",
    "  d888           ,%888b.",
    " d88%            %%%8--'-.",
    "/88:.__ ,       _%-' ---  -",
    "    '''::===..-'   =  --.  `",
  ],
  [
    "             ;I;              ",
    "             +It.             ",
    "             +II+             ",
    "             +III;            ",
    "             +IIII;           ",
    "             iIIIII;          ",
    "             titIIII;         ",
    "            .I;  =IIII;       ",
    "            .I;   ;IIII:      ",
    "            .I;    :tIIt      ",
    "            .I;     .tII=     ",
    "            +I        ;I;     ",
    "            +I       ;I;      ",
    "            tI      ;I;       ",
    "     :;itIIIII     +t:        ",
    "   ;tIIIIIIIII   :t;          ",
    " .tIIIIIIIIIIi::;i.           ",
    ".tIIIIIIIIIII                 ",
    ";IIIIIIIIIII;                 ",
    ";IIIIIIIIIt;                  ",
    " ;tIIIIt+;                     ",
  ],

  [
    "      _      _      _",
    "   __(.)< __(.)> __(.)=",
    "   \\___)  \\___)  \\___)  ",
    "          _      _      _",
    "       __(.)< __(.)> __(.)=",
    "       \\___)  \\___)  \\___)   ",
    "      _      _      _",
    "   __(.)< __(.)> __(.)=",
    "   \\___)  \\___)  \\___)   ",
    "          _      _      _",
    "       __(.)< __(.)> __(.)=",
    "       \\___)  \\___)  \\___)  ",
  ],
  [
    "                  /\\ ",
    "                 /  ) ",
    "                (__/  ",
    "        ____     //   ",
    "  _--~~~    ~~~-//    ",
    " /   ()   ()   // )   ",
    "|           _-//-~    ",
    "| ()       (_//       ",
    "|            ~~---_   ",
    "   ()       ()    )   ",
    "  ~--__  ()    __-~   ",
    "       ~//~~~~~       ",
    "       //             ",
  ],
];
AsciiMorph(morphElement, { x: 80, y: 28 });
const morph = () => {
  AsciiMorph.render(asciis[0]);
  var currentIndex = 2;
  const firstTimeout = setTimeout(function () {
    AsciiMorph.morph(asciis[1]);
  }, 1000);
  const morphInterval = setInterval(function () {
    AsciiMorph.morph(asciis[currentIndex]);
    currentIndex++;
    currentIndex %= asciis.length;
    console.log(currentIndex);
  }, 3000);

  runningFunctions.push(firstTimeout);
  runningFunctions.push(morphInterval);
};
const stopMorph = () => {
  console.log("stop");
  morphElement.innerHTML = "";
  const interval_id = window.setInterval(function () {},
  Number.MAX_SAFE_INTEGER);
  for (let i = 1; i < interval_id; i++) {
    window.clearInterval(i);
  }
};
const donutShow = () => {
  setInterval(() => {
    (z += 0.07), (y += 0.03);
    const a = [...new Array(x)].map((a, r) => (r % 80 === 79 ? "\n" : " ")),
      r = new Array(x).fill(0),
      t = Math.cos(z),
      e = Math.sin(z),
      n = Math.cos(y),
      o = Math.sin(y);
    for (let s = 0; s < 6.28; s += 0.07) {
      const c = Math.cos(s),
        h = Math.sin(s);
      for (let s = 0; s < 6.28; s += 0.02) {
        const v = Math.sin(s),
          M = Math.cos(s),
          i = c + 2,
          l = 1 / (v * i * e + h * t + 5),
          p = v * i * t - h * e,
          d = 0 | (40 + 30 * l * (M * i * n - p * o)),
          m = 0 | (12 + 15 * l * (M * i * o + p * n)),
          f =
            0 | (8 * ((h * e - v * c * t) * n - v * c * e - h * t - M * c * o)),
          y = d + 80 * m;
        m < 22 &&
          m >= 0 &&
          d >= 0 &&
          d < 79 &&
          l > r[y] &&
          ((r[y] = l), (a[y] = ".,-~:;=!*#$@"[f > 0 ? f : 0]));
      }
    }
    donutElement.innerHTML = a.join("");
  }, 50);
};

const stopDonut = () => {
  donutElement.innerHTML = "";
  const interval_id = window.setInterval(function () {},
  Number.MAX_SAFE_INTEGER);
  for (let i = 1; i < interval_id; i++) {
    window.clearInterval(i);
  }
};

//////////////////BOT//////////
// const event_6 = document.querySelector('#event_6');
// const event6 = document.querySelector('#home__container');
// const bot = document.querySelector('#bot');

// var bot = document.querySelector("#bot");
// var container = document.querySelector("html");

// container.addEventListener("click", function(event) {
// 	var xPosition = event.clientX - container.getBoundingClientRect().left - (bot.clientWidth / 2);
// 	var yPosition = event.clientY - container.getBoundingClientRect().top - (bot.clientHeight / 2);
// 	// in case of a wide border, the boarder-width needs to be considered in the formula above
// 	bot.style.left = xPosition + "px";
// 	bot.style.top = yPosition + "px";
// 	}
// );

// https://greensock.com/forums/topic/26113-positioning-an-element-on-scroll-relative-to-another-scrolltrigger/

// const change = () => {
//     console.log("hovered");
//     document.getElementById("canvas-container").style.opacity = 1;
//     const func = () => {
//       const scene = new THREE.Scene();
//       const renderer = new THREE.WebGLRenderer();
//       renderer.setSize(window.innerWidth, window.innerHeight);

//       document
//         .getElementById("canvas-container")
//         .appendChild(renderer.domElement);

//       const geometry = new THREE.SphereGeometry(1, 640, 64);
//       const textureLoader = new THREE.TextureLoader();
//       const normalTexture = textureLoader.load(
//         "https://i.ibb.co/4gHcRZD/bg3-je3ddz.jpg",
//         function () {
//           console.log("loaded");
//           document.getElementById("loader").style.display = "none";
//         }
//       );

//       const loader = new THREE.TextureLoader();
//       // scene.background = loader.load( 'https://i.ibb.co/4gHcRZD/bg3-je3ddz.jpg' );

//       const texture = new THREE.TextureLoader().load(
//         "https://i.ibb.co/4gHcRZD/bg3-je3ddz.jpg"
//       );
//       const material = new THREE.PointsMaterial({
//         size: 0.01,
//         color: "#FFFFFF",
//       });

//       const material3 = new THREE.MeshStandardMaterial();
//       const material2 = new THREE.PointsMaterial({
//         size: 0.001,
//         color: "#FFFFFF",
//       });
//       material3.metalness = 0.15;
//       material3.roughness = 0.95;
//       material3.normalMap = normalTexture;
//       material3.map = texture;
//       material3.color = new THREE.Color(0xffffff);
//       material2.metalness = 0.15;
//       material2.roughness = 0.95;
//       material2.normalMap = normalTexture;
//       material2.map = texture;
//       material2.color = new THREE.Color(0xffffff);

//       const particlesGeometry = new THREE.BufferGeometry();
//       const particlesGeometry2 = new THREE.BufferGeometry();
//       const particleCnt = 500;
//       const posArray = new Float32Array(particleCnt * 3);
//       const posArray2 = new Float32Array(particleCnt * 3);

//       for (let i = 0; i < particleCnt * 3; i++) {
//         posArray[i] = (Math.random() - 0.5) * 5;
//       }
//       for (let i = 0; i < particleCnt * 3; i++) {
//         posArray2[i] = (Math.random() - 0.5) * 5;
//       }
//       particlesGeometry.setAttribute(
//         "position",
//         new THREE.BufferAttribute(posArray, 3)
//       );
//       particlesGeometry2.setAttribute(
//         "position",
//         new THREE.BufferAttribute(posArray2, 3)
//       );

//       {
//         let loader = new THREE.TextureLoader(),
//           texture = loader.load("https://i.ibb.co/4gHcRZD/bg3-je3ddz.jpg");

//         texture.anisotropy = 20;

//         let geometry = new THREE.SphereBufferGeometry(200, 60, 60),
//           material = new THREE.MeshBasicMaterial({
//             side: THREE.BackSide,
//             map: texture,
//           });

//         globe = new THREE.Mesh(geometry, material);
//         scene.add(globe);
//       }

//       const sphere = new THREE.Mesh(geometry, material3);
//       const particlesMesh = new THREE.Points(particlesGeometry, material);
//       const particlesMesh2 = new THREE.Points(particlesGeometry2, material2);
//       scene.add(sphere);

//       let ambientLight = new THREE.AmbientLight("#ffffff", 0.4);
//       ambientLight.position.set(0, 20, 20);
//       scene.add(ambientLight);

//       let mouseX = 0;
//       let mouseY = 0;
//       document.addEventListener("mousemove", (Event) => {
//         mouseX = Event.clientX;
//         mouseY = Event.clientY;
//       });
//       const pointLight = new THREE.PointLight(0xffffff, 0.3);
//       pointLight.position.set(40.5, -77.6, 21);
//       scene.add(pointLight);

//       const pointLight2 = new THREE.PointLight(0xffffff, 0.8);
//       pointLight2.position.set(-2.5, 0.7, 2.9);
//       scene.add(pointLight2);

//       const sizes = {
//         width: window.innerWidth,
//         height: window.innerHeight,
//       };

//       window.addEventListener("resize", () => {
//         sizes.width = window.innerWidth;
//         sizes.height = window.innerHeight;
//         camera.aspect = sizes.width / sizes.height;
//         camera.updateProjectionMatrix();
//         renderer.setSize(sizes.width, sizes.height);
//         renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//       });

//       const camera = new THREE.PerspectiveCamera(
//         75,
//         sizes.width / sizes.height,
//         0.1,
//         100
//       );
//       camera.position.x = 0;
//       camera.position.y = 0;
//       camera.position.z = 2;
//       scene.add(camera);

//       camera.position.z = 3;
//       const clock = new THREE.Clock();

//       const tick = () => {
//         const elapsedTime = clock.getElapsedTime();
//         particlesMesh.rotation.y = 0.5 * elapsedTime;
//         sphere.rotation.y = 0.5 * elapsedTime;
//         if (mouseX > 0) {
//           particlesMesh.position.x = -mouseY * (elapsedTime * 0.000008);
//           particlesMesh.position.y = -mouseX * (elapsedTime * 0.000008);
//         }
//         particlesMesh2.rotation.y = 1 * elapsedTime;

//         renderer.render(scene, camera);

//         window.requestAnimationFrame(tick);
//       };

//       tick();
//     };
//     func();
//   };
//   const changeagain = () => {
//     console.log("leave");
//     document.getElementById("canvas-container").style.opacity = 0;
//   };
