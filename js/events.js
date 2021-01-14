// ///////////////////////EVENTS FUNC/////////////


const event_1 = document.querySelector('#event_1');
const event_2 = document.querySelector('#event_2');
const event_3 = document.querySelector('#event_3');
const event_4 = document.querySelector('#event_4');
const event_5 = document.querySelector('#event_5');
const event_6 = document.querySelector('#event_6');


let events = [event_1,event_2,event_3,event_4,event_5,event_6]


event_1.addEventListener('click',() => {
    gsap.to("#event_1",{
        duration:1,
        scale:0.4,
        y:-30,
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
        scale:0.4,
        y:-90,
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
        duration:1.5,
        width:1360,
        opacity:1,
        ease:"power4.out"
    })


})

event_2.addEventListener('click',() => {
    gsap.to("#event_2",{
        duration:1,
        scale:0.4,
        x:-40,
        y:-570,
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
        scale:0.4,
        y:-90,
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


event_5.addEventListener('click',() => {
    gsap.to("#event_5",{
        duration:1,
        scale:0.4,
        y:-30,
        x:-1320,
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
        scale:0.4,
        y:-90,
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


event_6.addEventListener('click',() => {
    gsap.to("#event_6",{
        duration:1,
        scale:0.4,
        y:-560,
        x:-1340,
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
        scale:0.4,
        y:-90,
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
        height:600
    })
})





////////////////HOME/////////

event_3.addEventListener('click',() => {
        
    gsap.to("#event_1",{
        duration:1,
        scale:1,
        opacity:1,
        y:0,
        x:0,
        ease:"power4.out"
    })
    gsap.to("#event_2",{
        duration:1,
        scale:1,
        opacity:1,
        y:0,
        x:0,
        ease:"power4.out"
    })
    gsap.to("#event_3",{
        duration:1,
        scale:1,
        y:0,
        x:0,
        ease:"power4.out"
    })
    gsap.to("#event_4",{
        duration:1,
        scale:1,
        opacity:1,
        y:0,
        x:0,
        ease:"power4.out"
    })
    gsap.to("#event_5",{
        duration:1,
        scale:1,
        opacity:1,
        y:0,
        x:0,
        ease:"power4.out"
    })
    gsap.to("#event_6",{
        duration:1,
        scale:1,
        opacity:1,
        y:0,
        x:0,
        ease:"power4.out"
    })

    gsap.to(".workshop",{
        duration:0.6,
        width:0,
        opacity:0,
        ease:"power4.out"
    })

    
    gsap.to('.team',{
        duration:1,
        opacity:0,
        height:0
    })

})
















// event_1.addEventListener('click',() => {
//     event_1.style= "transform :scale(0.4) translateY(-80px)";
//     event_2.style.transform = "scale(0)";
//     event_3.style.transform = "scale(0.4) translateY(-200px)";
//     // event_3.style.transform = ""
//     event_4.style.transform = "scale(0)";
//     event_5.style.transform = "scale(0)";
//     event_6.style.transform = "scale(0)";
// })

// event_2.addEventListener('click',() => {
//     event_2.style = "transform:scale(0.4); top = -75%;";
//     // event_2.style.
//     event_1.style.transform = "scale(0)";
//     event_3.style.transform = "scale(0.4) translateY(-200px)";
//     // event_3.style.transform = ""
//     event_4.style.transform = "scale(0)";
//     event_5.style.transform = "scale(0)";
//     event_6.style.transform = "scale(0)";
// })



// event_3.addEventListener('click',() => {
//     event_1.style.transform = "";
//     event_2.style.transform = "";
//     event_3.style.transform = "";
//     // event_3.style.transform .style.transform = "
//     event_4.style.transform = "";
//     event_5.style.transform = "";
//     event_6.style.transform = "";
// })


