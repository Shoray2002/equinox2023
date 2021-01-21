let scene,camera,renderer,starGeo;

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

    for(let i= 0;i<5000;i++){
        star = new THREE.Vector3(
            Math.random() * 600 - 300,
            Math.random() * 600 - 300,
            Math.random() * 600 - 300
        );

        star.velocity = 0;
        star.acceleration = 0.02;
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


var bot = document.querySelector("#bot");
var container = document.querySelector("html");

container.addEventListener("click", function(event) {
	var xPosition = event.clientX - container.getBoundingClientRect().left - (bot.clientWidth / 2);
	var yPosition = event.clientY - container.getBoundingClientRect().top - (bot.clientHeight / 2);
	// in case of a wide border, the boarder-width needs to be considered in the formula above
	bot.style.left = xPosition + "px";
	bot.style.top = yPosition + "px";
	}
);



// https://greensock.com/forums/topic/26113-positioning-an-element-on-scroll-relative-to-another-scrolltrigger/