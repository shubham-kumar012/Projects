const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim() {
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '10',
        opacity: 0,
        duration: 2,
        ease: Expo.easeInOut
    });

    tl.to(".boundingelem", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        stagger: 0.2,
        delay: -1
    });

    tl.from("#herofooter", {
        ease: Expo.easeInOut,
        opacity: 0,
        duration: 1,
        delay: -0.9
    })
}

// when the mouse move the circle pointer will skewed and also defining the min skew maximum skew.When the mouse move skew value increases and when the mouse will stop or stable skew value become normal
var timeout;

function movingMouseSkewAnim() {
    // define default scale value
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener('mousemove', function(dets) {
        var xdiff = dets.clientX - xprev;
        var ydiff = dets.clientY - yprev;

        xprev = dets.clientX;
        yprev = dets.clientY;

        xscale = gsap.utils.clamp(0.8, 1.2, xdiff);
        yscale = gsap.utils.clamp(0.8, 1.2, ydiff);

        circleFollower(xscale, yscale);
        
        setTimeout(function(){
             document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        },100);
    });
}

function circleFollower(xscale, yscale) {
    window.addEventListener('mousemove', function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
}

circleFollower();
firstPageAnim();
movingMouseSkewAnim();


// Move the image on headlines

document.querySelectorAll(".elem").forEach(function (elem) {
    const image = elem.querySelector("img");
    var rotate = 0;
    var diffRot = 0;

    elem.addEventListener("mouseenter", function(dets) {
        var diffY = dets.clientY - elem.getBoundingClientRect().top;
        // Kill any previous tween on this image
        gsap.killTweensOf("image")

        // Immediately set image position to current mouse location
        gsap.set(image, {
            top: diffY,
            left: dets.clientX
        })

        // For heading avaiable in elem section
        gsap.to(elem.querySelectorAll("h1, h5"), {
            opacity: 0.2
        })
        gsap.to(elem.querySelector("h1"), {
            marginLeft: "40px",
        })
    })

    elem.addEventListener("mouseleave", function () {
        gsap.killTweensOf(image); // Stop any running animations first

        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: "power1.out",
            duration: 0.2,
            // Ensure opacity 0 after mouse leave the section
            onComplete: () => {
                gsap.set(image, {opacity: 0})
            }
        });

        // For Heading in elem section
        gsap.to(elem.querySelectorAll("h1, h5"), {
            ease: Expo.easeInOut,
            opacity: 0.7,
            onComplete: () => {
                gsap.set(elem.querySelectorAll("h1, h5"), {opacity: 0.7})
            }
        });
        gsap.to(elem.querySelector("h1"), {
            marginLeft: "0px",
        })
    });
 
    elem.addEventListener("mousemove", function (dets) {
        var diffY = dets.clientY - elem.getBoundingClientRect().top;
        diffRot = dets.clientX - rotate;
        rotate = dets.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: "power1.out",
            top: diffY,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffRot)
        })
    });
}); 