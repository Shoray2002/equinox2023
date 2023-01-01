let scene, camera, renderer, starGeo;

const change=()=>{
    console.log('hovered');
    document.getElementById('canvas-container').style.display="block"

    const func = () => {
        const scene = new THREE.Scene();
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
       
        document.getElementById('canvas-container').appendChild(renderer.domElement)
    
        const geometry = new THREE.SphereGeometry( 1, 640, 64 );
        const textureLoader = new THREE.TextureLoader()
        const normalTexture = textureLoader.load('https://i.ibb.co/4gHcRZD/bg3-je3ddz.jpg', function () {
            console.log('loaded')
            document.getElementById('loader').style.display = 'none'
        },)
    
        const loader = new THREE.TextureLoader();
    scene.background = loader.load( 'https://i.ibb.co/4gHcRZD/bg3-je3ddz.jpg' );
    
    
    
        const texture = new THREE.TextureLoader().load('https://i.ibb.co/4gHcRZD/bg3-je3ddz.jpg');
        const material = new THREE.PointsMaterial({
            size: 0.01,
            color: "#FFFFFF",
        });
        
        const material3 = new THREE.MeshStandardMaterial();
        const material2 = new THREE.PointsMaterial({
            size: 0.001,
            color: "#FFFFFF",
        });
        material3.metalness = 0.15
    material3.roughness = 0.95
    material3.normalMap = normalTexture
      material3.map = texture
     material3.color = new THREE.Color(0xffffff)
     material2.metalness = 0.15
     material2.roughness = 0.95
     material2.normalMap = normalTexture
       material2.map = texture
      material2.color = new THREE.Color(0xffffff)
    
     
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesGeometry2 = new THREE.BufferGeometry();
        const particleCnt = 500;
        const posArray = new Float32Array(particleCnt * 3);
        const posArray2 = new Float32Array(particleCnt * 3);
    
        for (let i = 0; i < particleCnt * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 5;
        }
        for (let i = 0; i < particleCnt * 3; i++) {
            posArray2[i] = (Math.random() - 0.5) * 5;
        }
        particlesGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(posArray, 3)
        );
        particlesGeometry2.setAttribute(
            "position",
            new THREE.BufferAttribute(posArray2, 3)
        );
        
        {
            let loader = new THREE.TextureLoader(),
                texture = loader.load('https://i.ibb.co/4gHcRZD/bg3-je3ddz.jpg');
    
            texture.anisotropy = 20;
    
            let geometry = new THREE.SphereBufferGeometry(200, 60, 60),
                material = new THREE.MeshBasicMaterial({
                side: THREE.BackSide,
                map: texture,
            });
    
            globe = new THREE.Mesh(geometry, material);
            scene.add(globe);
        }
    
        const sphere = new THREE.Mesh(geometry, material3);
        const particlesMesh = new THREE.Points(particlesGeometry, material);
        const particlesMesh2 = new THREE.Points(particlesGeometry2, material2);
        scene.add(sphere);
    
        let ambientLight = new THREE.AmbientLight("#ffffff", 0.4);
        ambientLight.position.set(0, 20, 20);
        scene.add(ambientLight);
    
        
    
        let mouseX = 0;
        let mouseY = 0;
        document.addEventListener("mousemove", (Event) => {
            mouseX = Event.clientX;
            mouseY = Event.clientY;
        });
        const pointLight = new THREE.PointLight(0xffffff, 0.3)
    pointLight.position.set(40.5, -77.6, 21)
    scene.add(pointLight)
    
    const pointLight2 = new THREE.PointLight(0xffffff, 0.8)
    pointLight2.position.set(-2.5,0.7,2.9)
    scene.add(pointLight2)
    
    
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    
        window.addEventListener("resize", () => {
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });
    
        const camera = new THREE.PerspectiveCamera(
            75,
            sizes.width / sizes.height,
            0.1,
            100
        );
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 2;
        scene.add(camera);
    
    
        camera.position.z = 3;
        const clock = new THREE.Clock();
    
        const tick = () => {
            const elapsedTime = clock.getElapsedTime();
            particlesMesh.rotation.y = 0.5 * elapsedTime;
            sphere.rotation.y = 0.5 * elapsedTime;
            if (mouseX > 0) {
                particlesMesh.position.x = -mouseY * (elapsedTime * 0.000008);
                particlesMesh.position.y = -mouseX * (elapsedTime * 0.000008);
            }
            particlesMesh2.rotation.y = 1 * elapsedTime;
    
            renderer.render(scene, camera);
    
    
            window.requestAnimationFrame(tick);
        };
    
        tick();
    }
    func()
}
const changeagain=()=>{
    console.log('leave')
    document.getElementById('canvas-container').style.display="none"
    
}
const init = () => {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90,window.innerWidth/window.innerHeight,0.1,10000);
    // console.log(camera);
    camera.position.z = 1;
    camera.rotation.x = Math.PI/2;


    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);

    starGeo = new THREE.Geometry()

    for(let i= 0;i<1000;i++){
        star = new THREE.Vector3(
            Math.random() * 600 - 300,
            Math.random() * 600 - 300,
            Math.random() * 600 - 300
        );

        star.velocity = 0;
        star.acceleration = 0.01;
        // star.acceleration = acc;
        starGeo.vertices.push(star);
    }

    let sprite = new THREE.TextureLoader().load('./img/star.png');
let starMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size:0.7,
    map:sprite
});

stars = new THREE.Points(starGeo,starMaterial);
scene.add(stars);
window.addEventListener("resize",() => {
    camera.aspect = window.innerWidth / window.innerHeight ;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
},false);

    animate();

}

const animate = () => {
    starGeo.vertices.forEach(p => {
        p.velocity += p.acceleration
        p.y -= p.velocity

        if(p.y < -200){
            p.y = 200;
            p.velocity = 0;
        }
    });

    starGeo.verticesNeedUpdate = true;
    stars.rotation.y +=0.002;
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}


init()









////////////////////BOT//////////
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