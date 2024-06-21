/*****CANVAS HANDLER*****/
let canvas = document.getElementById("bg");
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = window.innerWidth;
canvas.style.height = window.innerHeight;

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = window.innerWidth;
    canvas.style.height = window.innerHeight;
});

avgScreenSize = (window.innerHeight + window.innerWidth)
var numParticles = 0;

if (window.innerWidth <= 750){
    numParticles = avgScreenSize/50
}
else if (window.innerWidth <= 1250) {
    numParticles = avgScreenSize/35
} 
else {
    numParticles = avgScreenSize/30
}

class Particle {
    constructor(x,y,size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = [-1,-2,1,2][Math.floor(Math.random() *4)]/6
        this.speedY = [-1,-2,1,2][Math.floor(Math.random() *4)]/6   
    }

    changeCoordinates(nx,ny) {
        this.x = nx;
        this.y = ny;
    }


    //*************************FIX DELTATIME WHEN PAUSE ISSUE*************************/
    update (force) {
        if (this.x >= canvas.width || this.x<=0) {
            this.speedX = -this.speedX
        }
        if (this.y >= canvas.height || this.y<=0) {
            this.speedY = -this.speedY
        }

        this.x+=(this.speedX*force)
        this.y+=(this.speedY*force)
        this.draw();
    }

    draw () {
        ctx.fillStyle = "rgb(150,150,150)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();   
    }
}

let particlesArr = []
for (let i=0; i<numParticles; i++) {
    particlesArr.push(new Particle(Math.random()*canvas.width,Math.random()*canvas.height, avgScreenSize/1000))
}

//*************************FIX INITIALIZATION ISSUE*************************/
// var lastTimestamp = 0;
// var deltaTime = null;

//Temporary
const moveForce = 2;

function animate (/*currentTimeStamp*/) {
    //console.log(currentTimeStamp + " " + lastTimestamp)
    // deltaTime = (currentTimeStamp - lastTimestamp);
    // lastTimestamp = currentTimeStamp;
    //console.log(deltaTime)

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i=0; i<numParticles; i++) {
        particlesArr[i].update(moveForce)
        for (let j=0; j<numParticles; j++) {
            if (i!=j){
                dist = Math.sqrt(Math.pow(particlesArr[j].x - particlesArr[i].x,2) + Math.pow(particlesArr[j].y - particlesArr[i].y,2))
                if (dist < 175) {
                    ctx.beginPath();
                    ctx.strokeStyle = "rgb(150,150,150)";
                    ctx.lineWidth = avgScreenSize/(dist*50)
                    ctx.moveTo(particlesArr[j].x, particlesArr[j].y);
                    ctx.lineTo(particlesArr[i].x, particlesArr[i].y);
                    ctx.stroke();      
                }
            }
        }
    }
    // requestAnimationFrame(animate);
}

 //Temporary while I work on a fix with requestAnimationFrame - More efficient
setInterval(animate,16);

/*****INTRO SECTION ANIMATION*****/
let animatedText1 = document.getElementById("animated-text-1")
let str1 = "Hello, I'm Munir!";
let ind1 = 0;
let animatedText2 = document.getElementById("animated-text-2")
let str2 = "Welcome to my website";
let ind2 = 0;
let animatedText3 = document.getElementById("animated-text-3");
let introButtonsContainer = document.getElementById("intro-buttons-container");
let aboutMeButton = document.getElementById("about-me-button");
let projectsButton = document.getElementById("projects-button");
let contactMeButton = document.getElementById("contact-me-button");
animatedText1.textContent = "";
animatedText2.textContent = "";
document.documentElement.style.setProperty('--BLINKER1', '"|"');
animatedText3.style.opacity = 0
introButtonsContainer.style.opacity = 0
aboutMeButton.style.cursor = "auto";
projectsButton.style.cursor = "auto";
contactMeButton.style.cursor = "auto";

var id1 = setInterval(load1,60);
function load1 () {
    if (animatedText1.textContent != str1) {
        animatedText1.textContent += str1[ind1];
        ind1++;
    }
    else {
        document.documentElement.style.setProperty('--BLINKER1', '""');
        document.documentElement.style.setProperty('--BLINKER2', '"|"');
        if (animatedText2.textContent != str2){
            animatedText2.textContent += str2[ind2];
            ind2++;
        } else {
            clearInterval(id1);
            let opacity1 = 0;
            let opacity2 = 0;
            let id2 = setInterval(function () {
                if (animatedText3.style.opacity < 1) {
                    opacity1+=(1/15);
                    animatedText3.style.opacity = opacity1;
                } else if (introButtonsContainer.style.opacity < 1) {
                    opacity2+=(1/15);
                    introButtonsContainer.style.opacity = opacity2;
                } else {
                    clearInterval(id2);
                    aboutMeButton.style.cursor = "pointer";
                    projectsButton.style.cursor = "pointer";
                    contactMeButton.style.cursor = "pointer";
                    aboutMeButton.addEventListener("click", function () {
                        document.getElementById("about-me-anchor").scrollIntoView();
                    })
                    
                    projectsButton.addEventListener("click", function () {
                        document.getElementById("projects-anchor").scrollIntoView();
                    })
                    
                    contactMeButton.addEventListener("click", function () {
                        document.getElementById("contact-me-anchor").scrollIntoView();
                    })
                }
            }, 60)
        }
    }
}

/*****HEADER AND SCROLL MANAGER*****/
let header = document.getElementById("header");
let homeLink = document.getElementById("home-link");
let aboutMeLink = document.getElementById("about-me-link");
let projectsLink = document.getElementById("projects-link");
let contactMeLink = document.getElementById("contact-me-link");

document.addEventListener("scroll", function () {
    if (window.scrollY>=50) {
        header.style.backgroundColor = "black";
    } else {
        header.style.backgroundColor = "transparent";
    }
})

homeLink.addEventListener("click", function () {
    window.scrollTo(0,0);
})

aboutMeLink.addEventListener("click", function () {
    document.getElementById("about-me").scrollIntoView();
})

projectsLink.addEventListener("click", function () {
    document.getElementById("projects").scrollIntoView();
})

contactMeLink.addEventListener("click", function () {
    document.getElementById("contact-me").scrollIntoView();
})

/*****ABOUT ME BUTTON HANDLER*****/
let skillsButton = document.querySelector("#skills-button");
let skillsTitle = document.querySelector("#skills-title");
let skillsContent = document.querySelector("#skills-content");
let skillsOpen = false;
let workButton = document.querySelector("#work-button");
let workTitle = document.querySelector("#work-title");
let workOpen = false;

function openSkills () {
    skillsTitle.style.position = "relative";
    let height = 4;
    let topOffset = 0;
    let leftOffset = 0;
    let id3 = setInterval(function () {
        if (height < 27.5) {
            height+=0.5;
            topOffset-=(10/42);
            leftOffset-=(11/42);
            skillsButton.style.height = height + "vw";
            skillsTitle.style.top = topOffset + "vw";
            skillsTitle.style.left = leftOffset + "vw";
        } else {
            skillsTitle.style.top = "-1vw";
            document.getElementById("skills-content").style.display = "flex";
            skillsOpen = !skillsOpen
            clearInterval(id3);
        }
    }, 5)
}

function closeSkills () {
    document.getElementById("skills-content").style.display = "none";
    skillsTitle.style.top = "-9vw";
    skillsTitle.style.position = "relative";
    let height = 25;
    let topOffset = -9;
    let leftOffset = -12;
    let id4 = setInterval(function () {
        if (height > 4) {
            height-=0.5;
            topOffset+=(9/42);
            leftOffset+=(12/42);
            skillsButton.style.height = height + "vw";
            skillsTitle.style.top = topOffset + "vw";
            skillsTitle.style.left = leftOffset + "vw";
        } else {
            skillsOpen = !skillsOpen
            clearInterval(id4);
        }
    }, 5)
}

skillsButton.addEventListener("click", function () {
    if (workOpen) {
        closeWork();
    }
    if (!skillsOpen) {
        openSkills();
    } else {
        closeSkills();
    }
});

/*****CONTACT EMAIL HANDLER*****/
let emailButton = document.getElementById("email-link");
let overlay = document.getElementById("email-overlay");
let closeButton = document.getElementById("close-overlay");

emailButton.addEventListener("click", function () {
    overlay.style.display ="flex";
})

closeButton.addEventListener("click", function () {
    overlay.style.display ="none";
})

/*****DISABLING INSTAGRAM AND FACEBOOK FUNCTIONALITY*****/
/*We do this because the current CSS used in this website is not fully functional on the 
built-in browser used by instagram and facebook.*/
if(navigator.userAgent.toLowerCase().includes("instagram")){
    window.location.href = "reroute.html";
}

if (/FB_IAB/.test(navigator.userAgent) || /FBAN/.test(navigator.userAgent) || /FBAV/.test(navigator.userAgent)) {
    window.location.href = "reroute.html";
}
