// ///////////////////////EVENTS FUNC/////////////


const event_1 = document.querySelector('#event_1');
const event_2 = document.querySelector('#event_2');
const event_3 = document.querySelector('#event_3');
const event_4 = document.querySelector('#event_4');
const event_5 = document.querySelector('#event_5');
const event_6 = document.querySelector('#event_6');
const aboutHome = document.querySelector('#about__home');
const sponsorsHome = document.querySelector('#sponsors__home');



let yheight,xwidth;
// let events = [event_1,event_2,event_3,event_4,event_5,event_6]

////////////////////functionality section///////



//about
var  e1 = gsap.timeline({defaults:{duration: 0.5}},{paused:true}) 
// sponsors
var  e2 = gsap.timeline({defaults:{duration: 0.5}},{paused:true}) 

const fn_event_1 = () => {
    
e1.to("#countdown",{duration:0.2, opacity:0})
    .to("footer",{duration:0.2, opacity:0})
    .to(".nav__category,.home__container__img",{duration:0.2, opacity:0})
    .to(".countdown",{duration:0.2, opacity:0})
    .to(".about--section",{scale:1})
    .to(".about--section",{height:"100vh"})
    .to(".about--section",{width:"100vw"})
    .to(".background__line",{height:"10vh",width:"10vw"})
    .to(".background__line",{height:"100vh"})
    .to(".background__back",{duration:0.1, opacity:1})
    .to(".about__heading,.about__home",{duration:0.1, opacity:1})
    .to(".about__heading--bg",{opacity:1})
    .to(".about__images",{scale:1,opacity:1})
    .to(".about__details",{scale:1,opacity:1},"-=1")
}



const fn_event_2 = () => {
    
    e2.to("#countdown",{duration:0.2, opacity:0})
        .to("footer",{duration:0.2, opacity:0})
        .to(".nav__category,.home__container__img",{duration:0.2, opacity:0})
        .to(".countdown",{duration:0.2, opacity:0,scale:0})
        .to(".sponsors--section",{scale:1,zIndex:100})
        .to(".sponsors--section",{height:"100vh"})
        .to(".sponsors--section",{width:"100vw"})
        .to(".background__line",{height:"10vh",width:"10vw"})
        .to(".background__line",{height:"100vh"})
        .to(".background__back",{duration:0.1, opacity:1})
        .to(".sponsors__heading--bg",{opacity:1})
        .to(".sponsors__heading",{duration:0.1, opacity:1})
        .to(".sponsors__row",{opacity:1})
        .to(".sponsors__footer",{opacity:1},"-=1")
        // .to(".about__images",{scale:1})
        // .to(".about__details",{scale:1},"-=1")
    }
    
    
    


event_4.addEventListener('click',(e) => {

    console.log("clicked");

    // e1.to("#countdown",{duration:0.2, opacity:0})
    // .to("footer",{duration:0.2, opacity:0})
    // .to(".countdown",{duration:0.2, opacity:0})
    // .to(".about--section",{height:"10vh",width:"10vw"})
    // .to(".about--section",{width:"100vw"})
    // .to(".about--section",{height:"100vh"})
    // .to(".about__container",{scale:1})

    // e1.play();

    fn_event_1();

    e1.play();

    console.log("as");
})



event_2.addEventListener('click',(e) => {

    console.log("clicked");

    // e1.to("#countdown",{duration:0.2, opacity:0})
    // .to("footer",{duration:0.2, opacity:0})
    // .to(".countdown",{duration:0.2, opacity:0})
    // .to(".about--section",{height:"10vh",width:"10vw"})
    // .to(".about--section",{width:"100vw"})
    // .to(".about--section",{height:"100vh"})
    // .to(".about__container",{scale:1})

    // e1.play();

    fn_event_2();
    
    e2.play();

    console.log("as");
})


aboutHome.addEventListener('click',()=>{
    

    console.log("as");
    
    // e2.to("#countdown",{duration:0.2, opacity:1})
    //     .to("footer",{duration:0.2, opacity:1})
    //     .to(".countdown",{duration:0.2, opacity:1})
    //     .to(".about--section",{scale:0})
    //     .to(".about--section",{height:"100vh"})
    //     .to(".about--section",{width:"100vw"})
    //     .to(".about__line",{height:"10vh",width:"10vw"})
    //     .to(".about__line",{height:"100vh"})
    //     .to(".about__back",{duration:0.1, opacity:1})
    //     .to(".about__heading",{duration:0.1, opacity:1})
    //     .to(".about__heading--bg",{opacity:1})
    //     .to(".about__images",{scale:0})
    //     .to(".about__details",{scale:0},"-=1")

        e1.reversed() ? e1.play() : e1.reverse();
})


sponsorsHome.addEventListener('click',()=>{
    

    console.log("as");
    
    // e2.to("#countdown",{duration:0.2, opacity:1})
    //     .to("footer",{duration:0.2, opacity:1})
    //     .to(".countdown",{duration:0.2, opacity:1})
    //     .to(".about--section",{scale:0})
    //     .to(".about--section",{height:"100vh"})
    //     .to(".about--section",{width:"100vw"})
    //     .to(".about__line",{height:"10vh",width:"10vw"})
    //     .to(".about__line",{height:"100vh"})
    //     .to(".about__back",{duration:0.1, opacity:1})
    //     .to(".about__heading",{duration:0.1, opacity:1})
    //     .to(".about__heading--bg",{opacity:1})
    //     .to(".about__images",{scale:0})
    //     .to(".about__details",{scale:0},"-=1")

        e2.reversed() ? e2.play() : e2.reverse();
})









// TEST
// document.querySelector("html").addEventListener("click",(e) => {
//     // console.log(e.view) 
//     console.log(e.view.outerHeight , e.view.outerWidth)
    
//     console.log(e.view.innerHeight , e.view.innerWidth)

    
// yheight = -e.view.innerHeight + 0.2 * e.view.innerHeight;
// xwidth= -e.view.innerWidth + 0.11 * e.view.innerWidth;
// })





// // ///////////////////////EVENTS FUNC/////////////


// const event_1 = document.querySelector('#event_1');
// const event_2 = document.querySelector('#event_2');
// const event_3 = document.querySelector('#event_3');
// const event_4 = document.querySelector('#event_4');
// const event_5 = document.querySelector('#event_5');
// const event_6 = document.querySelector('#event_6');

// let yheight,xwidth;
// let events = [event_1,event_2,event_3,event_4,event_5,event_6]

// const sphereHideShow = (text) => {
//     gsap.to("#lines__sphere",{
//         duration:0.1,
//         display:text
//     })
// }
// ////////////////////functionality section///////




// event_1.addEventListener('click',(e) => {

//     sphereHideShow("none");

//     gsap.to("#event_1",{
//         duration:1,
//         scale:0.5   ,
//         left:-e.view.innerWidth * 0.04,
//         top:-e.view.innerHeight * 0.05,
//         ease:"power4.out"
//     })
//     gsap.to("#event_2",{
//         duration:1,
//         scale:0,
//         opacity:0,
//         ease:"power4.out"
//     })
//     gsap.to("#event_3",{
//         duration:1,
//         scale:0.5,
//         top:-e.view.innerHeight * 0.12,
//         ease:"power4.out"
//     })
//     gsap.to("#event_4",{
//         duration:1,
//         scale:0,
//         opacity:0,
//         ease:"power4.out"
//     })
//     gsap.to("#event_5",{
//         duration:1,
//         scale:0,
//         opacity:0,
//         ease:"power4.out"
//     })
//     gsap.to("#event_6",{
//         duration:1,
//         opacity:0,
//         scale:0,
//         ease:"power4.out"
//     })

//     gsap.to(".workshop",{
//         duration:1,
//         display:"block",
//         scaleX:1,
//         opacity:1,
//         ease:"power4.out"
//     })


// })

// event_2.addEventListener('click',(e) => {

    
//     sphereHideShow("none");

//     gsap.to("#event_2",{
//         duration:1,
//         scale:0.5,
//         left: -e.view.innerWidth * 0.04 + 5,
//         top:-e.view.innerHeight + 0.2 * e.view.innerHeight,
//         ease:"power4.out"
//     })
//     gsap.to("#event_1",{
//         duration:1,
//         scale:0,
//         opacity:0,
//         ease:"power4.out"
//     })
//     gsap.to("#event_3",{
//         duration:1,
//         scale:0.5,
//         top:-e.view.innerHeight * 0.12,
//         ease:"power4.out"
//     })
//     gsap.to("#event_4",{
//         duration:1,
//         scale:0,
//         opacity:0,
//         ease:"power4.out"
//     })
//     gsap.to("#event_5",{
//         duration:1,
//         scale:0,
//         opacity:0,
//         ease:"power4.out"
//     })
//     gsap.to("#event_6",{
//         duration:1,
//         opacity:0,
//         scale:0,
//         ease:"power4.out"
//     })
// })


// event_5.addEventListener('click',(e) => {

    
//     sphereHideShow("none");

//     gsap.to("#event_5",{
//         duration:1,
//         scale:0.5,
//         top:-0.06 * e.view.innerHeight,
//         left:-e.view.innerWidth + 0.11 * e.view.innerWidth,
//         ease:"power4.out"
//     })
//     gsap.to("#event_2",{
//         duration:1,
//         scale:0,
//         opacity:0,
//         ease:"power4.out"
//     })
//     gsap.to("#event_3",{
//         duration:1,
//         scale:0.5,
//         top:-e.view.innerHeight * 0.12,
//         ease:"power4.out"
//     })
//     gsap.to("#event_4",{
//         duration:1,
//         scale:0,
//         opacity:0,
//         ease:"power4.out"
//     })
//     gsap.to("#event_1",{
//         duration:1,
//         scale:0,
//         opacity:0,
//         ease:"power4.out"
//     })
//     gsap.to("#event_6",{
//         duration:1,
//         scale:0,
//         opacity:0,
//         ease:"power4.out"
//     })
// })


// event_6.addEventListener('click',(e) => {

    
//     sphereHideShow("none");

//     gsap.to("#event_6",{
//         duration:1,
//         scale:0.5,
//         top:-e.view.innerHeight + 0.19 * e.view.innerHeight,
//         left:-e.view.innerWidth + 0.11 * e.view.innerWidth, 
//         ease:"power4.out"
//     })
//     console.log(e)
//     gsap.to("#event_2",{
//         duration:1,
//         scale:0,
//         opacity:0,
//         ease:"power4.out"
//     })
//     gsap.to("#event_3",{
//         duration:1,
//         scale:0.5,
//         top:-e.view.innerHeight * 0.12,
//         ease:"power4.out"
//     })
//     gsap.to("#event_4",{
//         duration:1,
//         scale:0,
//         opacity:0,
//         ease:"power4.out"
//     })
//     gsap.to("#event_5",{
//         duration:1,
//         scale:0,
//         opacity:0,
//         ease:"power4.out"
//     })
//     gsap.to("#event_1",{
//         duration:1,
//         scale:0,
//         opacity:0,
//         ease:"power4.out"
//     })

//     gsap.to(".footer__container",{
//         duration:0.3,
//         backgroundColor:"#ffffff54",
//         color:"#292626"
//     })


//     gsap.to('.team',{
//         duration:1,
//         opacity:1,
//         scaleY:1
//     })
// })

// ///////////////ABOUT//////////////////

// // var rule = CSSRulePlugin.getRule("#content"); 

// event_4.addEventListener("click",(e) => {

//     sphereHideShow("none");
    
//     gsap.to("#event_1",{
//         duration:1,
//         scale:0,
//         top:0,
//         ease:"power4.out"
//     })
//     gsap.to("#event_2",{
//         duration:1,
//         scale:0,
//         opacity:0,
//         ease:"power4.out"
//     })
//     gsap.to("#event_3",{
//         duration:1,
//         scale:0.5,
//         top:-e.view.innerHeight * 0.12,
//         ease:"power4.out"
//     })
//     gsap.to("#event_4",{
//         duration:1,
//         scale:0,
//         opacity:0,
//         ease:"power4.out"
//     })
//     gsap.to("#event_5",{
//         duration:1,
//         scale:0,
//         opacity:0,
//         ease:"power4.out"
//     })
//     gsap.to("#event_6",{
//         duration:1,
//         opacity:0,
//         scale:0,
//         ease:"power4.out"
//     })


//     // var boardRule = CSSRulePlugin.getRule("");
//     gsap.to("#board",{
//         duration:0,
//         display:"block",
//         opacity:1,
//         ease:"power4.out"
//     })

//     gsap.to("#bot",{
//         duration:0.5,
//         top:200,
//         left:100,
//         ease:"power4.out"
//     })

//     // gsap.to("#section-footer",{
        
//     // })
    
// })




// ////////////////HOME/////////

// event_3.addEventListener('click',(e) => {
        
    
//     sphereHideShow("block");


    
    
//     gsap.to("#board",{
//         duration:0,
//         display:"none",
//         opacity:0,
//         ease:"power4.out"
//     })

//     gsap.to("#board",{
//         duration:0,
//         display:"none",
//         opacity:0,
//         ease:"power4.out"
//     })


//     gsap.to("#event_1",{
//         duration:1,
//         scale:1,
//         opacity:1,
//         top:0,
//         left:0,
//         ease:"power4.out"
//     })
//     gsap.to("#event_2",{
//         duration:1,
//         scale:1,
//         opacity:1,
//         top:0,
//         left:0,
//         ease:"power4.out"
//     })
//     gsap.to("#event_3",{
//         duration:1,
//         scale:1,
//         top:0,
//         left:0,
//         ease:"power4.out"
//     })
//     gsap.to("#event_4",{
//         duration:1,
//         scale:1,
//         opacity:1,
//         top:0,
//         left:0,
//         ease:"power4.out"
//     })
//     gsap.to("#event_5",{
//         duration:1,
//         scale:1,
//         opacity:1,
//         top:0,
//         left:0,
//         ease:"power4.out"
//     })
//     gsap.to("#event_6",{
//         duration:1,
//         scale:1,
//         opacity:1,
//         top:0,
//         left:0,
//         ease:"power4.out"
//     })

//     gsap.to(".workshop",{
//         duration:0.6,
//         // width:0,
//         scaleX:0,
//         opacity:0,
//         display:"none",
//         ease:"power4.out"
//     })

    
//     gsap.to('.team',{
//         duration:1,
//         opacity:0,
//         scaleY:0
//     })

//     gsap.to(".footer__container",{
//         duration:0.3,
//         backgroundColor:"#ffffff24",
//         color:"#c1baba"
//     })

// })







// // TEST
// // document.querySelector("html").addEventListener("click",(e) => {
// //     // console.log(e.view) 
// //     console.log(e.view.outerHeight , e.view.outerWidth)
    
// //     console.log(e.view.innerHeight , e.view.innerWidth)

    
// // yheight = -e.view.innerHeight + 0.2 * e.view.innerHeight;
// // xwidth= -e.view.innerWidth + 0.11 * e.view.innerWidth;
// // })



