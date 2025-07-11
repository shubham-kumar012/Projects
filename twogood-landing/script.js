function locomotiveScrollAnimation() {
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
locomotiveScrollAnimation();


function navbarAnimation() {
    gsap.to("#nav-part1 svg", {
    transform: "translateY(-120%)",
    scrollTrigger: {
        trigger: "#page1",
        scroller: "#main",
        // marker: true,
        start: "top 0",
        end: "top -3%",
        scrub: true // reverse the animation on reverse scroll
    }
})

gsap.to("#nav-part2 #links", {
    transform: "translateY(-120%)",
    opacity: 0,
    scrollTrigger: {
        trigger: "#page1",
        scroller: "#main",
        start: "top 0",
        end: "top -3%",
        scrub: true // reverse the animation on reverse scroll
    }
})
}
navbarAnimation();


function cursorMovingOnImage() {
    var canvas = document.querySelector("#canvas");
    var hoverBtn = document.querySelector("#pointer-follower");

canvas.addEventListener("mouseenter", function(dets) {

    gsap.set(hoverBtn, {
        left: dets.clientX - 50,
        top: dets.clientY - 50
    })

    gsap.to(hoverBtn, {
        opacity: 0.8,
        scale: 1,
        duration: 0.3
    });
});

canvas.addEventListener("mouseleave", function() {
    gsap.to(hoverBtn, {
        opacity: 0,
        scale: 0,
        duration: 0.3
    });
});

canvas.addEventListener("mousemove", function(dets) {
    gsap.to(hoverBtn, {
        left: dets.clientX - 50,
        top: dets.clientY - 50
    });
})
}
cursorMovingOnImage();


function headingAnimation() {
    // Headings animation
    var tl = gsap.timeline();

    tl.to(".boundingelem", {
    y: 0,
    ease: Expo.easeInOut,
    duration: 1.5,
    stagger: 0.2,
    delay: 1
    });

    tl.from("#canvas", {
        ease: Expo.easeInOut,
        opacity: 0,
        duration: 1,
        delay: -0.8
    }) 
}
headingAnimation();


function page2DetailAnimation() {
    var tl = gsap.timeline({
        scrollTrigger : {
            trigger: ".page2-dets",
            start: "top 95%", // Trigger when top of element hit 90% of viewport
            toggleActions: "play none none none" // Only play once
        }
    });

    tl.from(".page2-dets", {
        y: 20,
        opacity: 0,
        ease: Expo.easeInOut,
        duration: .2,
        stagger: 0.1
    }) 
}
// page2DetailAnimation();


function cursorMovingOnProduct() {
    var a = document.querySelectorAll(".child");
    a.forEach(function(elem) {
        elem.addEventListener("mousemove", function(dets) {
            gsap.to("#cursor", {
                left: dets.x - 70,
                top: dets.y - 70,
                transform: 'scale(1)'
            })
        })

        elem.addEventListener("mouseleave", function(dets) {
            gsap.killTweensOf('#cursor')

            gsap.to("#cursor", {
                transform: 'scale(0)',
                duration: 0.2
            })
        })
    });
}
cursorMovingOnProduct();








