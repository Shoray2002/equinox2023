// ///////////////////////EVENTS FUNC/////////////


const event_1 = document.querySelector('#event_1');
const event_2 = document.querySelector('#event_2');
const event_3 = document.querySelector('#event_3');
const event_4 = document.querySelector('#event_4');
const event_5 = document.querySelector('#event_5');
const event_6 = document.querySelector('#event_6');

let yheight,xwidth;
let events = [event_1,event_2,event_3,event_4,event_5,event_6]

const sphereHideShow = (text) => {
    gsap.to("#lines__sphere",{
        duration:0.1,
        display:text
    })
}

//line GLobe

const globe = () => {

    
const height = window.innerHeight*0.5;
// const height = 0;
const width = window.innerWidth*0.5;

    const SCREEN_WIDTH = width,
    SCREEN_HEIGHT = height,
    r = 150;

    let mouseY = 0,
    windowHalfY = height / 2,
    camera2,
    scene2,
    renderer2;

    init2();
    animate2();

    function init2() {
    camera2 = new THREE.PerspectiveCamera(
        80,
        SCREEN_WIDTH / SCREEN_HEIGHT,
        1,
        3000
    );
    camera2.position.z = 1000;

    scene2 = new THREE.Scene();

    const parameters = [
        [0.25, 0xff7700, 1],
        [0.5, 0xff9900, 1],
        [0.75, 0xffaa00, 0.75],
        [1, 0xa8dfe0, 0.5],
        [1.25, 0xaaaaaa, 0.8],
    ];


    const geometry = createGeometry();

    for (let i = 0; i < parameters.length; ++i) {
        const p = parameters[i];

        const material = new THREE.LineBasicMaterial({
            color: p[1],
            opacity: p[2],
        });

        const line = new THREE.LineSegments(geometry, material);
        line.scale.x = line.scale.y = line.scale.z = p[0];
        line.userData.originalScale = p[0];
        line.rotation.y = Math.random() * Math.PI;
        line.updateMatrix();
        scene2.add(line);
    }

    renderer2 = new THREE.WebGLRenderer({ antialias: true, alpha:true });
    renderer2.setPixelRatio(window.devicePixelRatio);
    renderer2.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    renderer2
    document.getElementById("lines__sphere").appendChild(renderer2.domElement);

    document.getElementById("lines__sphere").style.touchAction = "none";
    document
        .getElementById("lines__sphere")
        .addEventListener("pointermove", onPointerMove, false);

    //

    window.addEventListener("resize", onWindowResize, false);

    // test geometry swapability

    setInterval(function () {
        const geometry = createGeometry();

        scene2.traverse(function (object) {
            if (object.isLine) {
                object.geometry.dispose();
                object.geometry = geometry;
            }
        });
    }, 1000);
    }

    function createGeometry() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    const vertex = new THREE.Vector3();

    for (let i = 0; i < 1500; i++) {
        vertex.x = Math.random() * 2 - 1;
        vertex.y = Math.random() * 2 - 1;
        vertex.z = Math.random() * 2 - 1;
        vertex.normalize();
        vertex.multiplyScalar(r);

        vertices.push(vertex.x, vertex.y, vertex.z);

        vertex.multiplyScalar(Math.random() * 0.09 + 1);

        vertices.push(vertex.x, vertex.y, vertex.z);
    }

    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
    );

    return geometry;
    }

    function onWindowResize() {
    windowHalfY = height / 2;
    camera2.aspect = width / height;
    camera2.updateProjectionMatrix();
    renderer2.setSize(width, height);
    }

    function onPointerMove(event) {
    if (event.isPrimary === false) return;
    mouseY = event.clientY - windowHalfY;
    }

    //

    function animate2() {
    requestAnimationFrame(animate2);
    render();
    }

    function render() {
    camera2.position.y += (-mouseY + 200 - camera2.position.y) * 0.05;
    camera2.lookAt(scene2.position);

    renderer2.render(scene2, camera2);

    const time = Date.now() * 0.0001;

    for (let i = 0; i < scene2.children.length; i++) {
        const object = scene2.children[i];

        if (object.isLine) {
            object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));

            if (i < 5) {
                const scale =
                    object.userData.originalScale *
                    (i / 5 + 1) *
                    (1 + 0.5 * Math.sin(7 * time));

                object.scale.x = object.scale.y = object.scale.z = scale;
            }
        }
    }
    }
}

globe();


////////////////////functionality section///////




event_1.addEventListener('click',(e) => {

    sphereHideShow("none");

    gsap.to("#event_1",{
        duration:1,
        scale:0.5   ,
        left:-e.view.innerWidth * 0.04,
        top:-e.view.innerHeight * 0.05,
        ease:"power4.out"
    })
    gsap.to("#event_2",{
        duration:1,
        scale:0,
        opacity:0,
        ease:"power4.out"
    })
    gsap.to("#event_3",{
        duration:1,
        scale:0.5,
        top:-e.view.innerHeight * 0.12,
        ease:"power4.out"
    })
    gsap.to("#event_4",{
        duration:1,
        scale:0,
        opacity:0,
        ease:"power4.out"
    })
    gsap.to("#event_5",{
        duration:1,
        scale:0,
        opacity:0,
        ease:"power4.out"
    })
    gsap.to("#event_6",{
        duration:1,
        opacity:0,
        scale:0,
        ease:"power4.out"
    })

    gsap.to(".workshop",{
        duration:1,
        display:"block",
        scaleX:1,
        opacity:1,
        ease:"power4.out"
    })


})

event_2.addEventListener('click',(e) => {

    
    sphereHideShow("none");

    gsap.to("#event_2",{
        duration:1,
        scale:0.5,
        left: -e.view.innerWidth * 0.04 + 5,
        top:-e.view.innerHeight + 0.2 * e.view.innerHeight,
        ease:"power4.out"
    })
    gsap.to("#event_1",{
        duration:1,
        scale:0,
        opacity:0,
        ease:"power4.out"
    })
    gsap.to("#event_3",{
        duration:1,
        scale:0.5,
        top:-e.view.innerHeight * 0.12,
        ease:"power4.out"
    })
    gsap.to("#event_4",{
        duration:1,
        scale:0,
        opacity:0,
        ease:"power4.out"
    })
    gsap.to("#event_5",{
        duration:1,
        scale:0,
        opacity:0,
        ease:"power4.out"
    })
    gsap.to("#event_6",{
        duration:1,
        opacity:0,
        scale:0,
        ease:"power4.out"
    })
})


event_5.addEventListener('click',(e) => {

    
    sphereHideShow("none");

    gsap.to("#event_5",{
        duration:1,
        scale:0.5,
        top:-0.06 * e.view.innerHeight,
        left:-e.view.innerWidth + 0.11 * e.view.innerWidth,
        ease:"power4.out"
    })
    gsap.to("#event_2",{
        duration:1,
        scale:0,
        opacity:0,
        ease:"power4.out"
    })
    gsap.to("#event_3",{
        duration:1,
        scale:0.5,
        top:-e.view.innerHeight * 0.12,
        ease:"power4.out"
    })
    gsap.to("#event_4",{
        duration:1,
        scale:0,
        opacity:0,
        ease:"power4.out"
    })
    gsap.to("#event_1",{
        duration:1,
        scale:0,
        opacity:0,
        ease:"power4.out"
    })
    gsap.to("#event_6",{
        duration:1,
        scale:0,
        opacity:0,
        ease:"power4.out"
    })
})


event_6.addEventListener('click',(e) => {

    
    sphereHideShow("none");

    gsap.to("#event_6",{
        duration:1,
        scale:0.5,
        top:-e.view.innerHeight + 0.19 * e.view.innerHeight,
        left:-e.view.innerWidth + 0.11 * e.view.innerWidth, 
        ease:"power4.out"
    })
    console.log(e)
    gsap.to("#event_2",{
        duration:1,
        scale:0,
        opacity:0,
        ease:"power4.out"
    })
    gsap.to("#event_3",{
        duration:1,
        scale:0.5,
        top:-e.view.innerHeight * 0.12,
        ease:"power4.out"
    })
    gsap.to("#event_4",{
        duration:1,
        scale:0,
        opacity:0,
        ease:"power4.out"
    })
    gsap.to("#event_5",{
        duration:1,
        scale:0,
        opacity:0,
        ease:"power4.out"
    })
    gsap.to("#event_1",{
        duration:1,
        scale:0,
        opacity:0,
        ease:"power4.out"
    })




    gsap.to('.team',{
        duration:1,
        opacity:1,
        scaleY:1
    })
})

///////////////ABOUT//////////////////

// var rule = CSSRulePlugin.getRule("#content"); 

event_4.addEventListener("click",(e) => {

    sphereHideShow("none");
    
    gsap.to("#event_1",{
        duration:1,
        scale:0,
        top:0,
        ease:"power4.out"
    })
    gsap.to("#event_2",{
        duration:1,
        scale:0,
        opacity:0,
        ease:"power4.out"
    })
    gsap.to("#event_3",{
        duration:1,
        scale:0.5,
        top:-e.view.innerHeight * 0.12,
        ease:"power4.out"
    })
    gsap.to("#event_4",{
        duration:1,
        scale:0,
        opacity:0,
        ease:"power4.out"
    })
    gsap.to("#event_5",{
        duration:1,
        scale:0,
        opacity:0,
        ease:"power4.out"
    })
    gsap.to("#event_6",{
        duration:1,
        opacity:0,
        scale:0,
        ease:"power4.out"
    })


    // var boardRule = CSSRulePlugin.getRule("");
    gsap.to("#board",{
        duration:0,
        display:"block",
        opacity:1,
        ease:"power4.out"
    })

    gsap.to("#bot",{
        duration:0.5,
        top:200,
        left:100,
        ease:"power4.out"
    })

    // gsap.to("#section-footer",{
        
    // })
    
})




////////////////HOME/////////

event_3.addEventListener('click',(e) => {
        
    
    sphereHideShow("block");


    
    
    gsap.to("#board",{
        duration:0,
        display:"none",
        opacity:0,
        ease:"power4.out"
    })

    gsap.to("#board",{
        duration:0,
        display:"none",
        opacity:0,
        ease:"power4.out"
    })


    gsap.to("#event_1",{
        duration:1,
        scale:1,
        opacity:1,
        top:0,
        left:0,
        ease:"power4.out"
    })
    gsap.to("#event_2",{
        duration:1,
        scale:1,
        opacity:1,
        top:0,
        left:0,
        ease:"power4.out"
    })
    gsap.to("#event_3",{
        duration:1,
        scale:1,
        top:0,
        left:0,
        ease:"power4.out"
    })
    gsap.to("#event_4",{
        duration:1,
        scale:1,
        opacity:1,
        top:0,
        left:0,
        ease:"power4.out"
    })
    gsap.to("#event_5",{
        duration:1,
        scale:1,
        opacity:1,
        top:0,
        left:0,
        ease:"power4.out"
    })
    gsap.to("#event_6",{
        duration:1,
        scale:1,
        opacity:1,
        top:0,
        left:0,
        ease:"power4.out"
    })

    gsap.to(".workshop",{
        duration:0.6,
        // width:0,
        scaleX:0,
        opacity:0,
        display:"none",
        ease:"power4.out"
    })

    
    gsap.to('.team',{
        duration:1,
        opacity:0,
        scaleY:0
    })

})







// TEST
// document.querySelector("html").addEventListener("click",(e) => {
//     // console.log(e.view) 
//     console.log(e.view.outerHeight , e.view.outerWidth)
    
//     console.log(e.view.innerHeight , e.view.innerWidth)

    
// yheight = -e.view.innerHeight + 0.2 * e.view.innerHeight;
// xwidth= -e.view.innerWidth + 0.11 * e.view.innerWidth;
// })



