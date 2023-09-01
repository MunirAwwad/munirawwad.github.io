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
    document.getElementById("about-me-anchor").scrollIntoView();
})

projectsLink.addEventListener("click", function () {
    document.getElementById("projects-anchor").scrollIntoView();
})

contactMeLink.addEventListener("click", function () {
    document.getElementById("contact-me-anchor").scrollIntoView();
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
        if (height < 25) {
            height+=0.5;
            topOffset-=(9/42);
            leftOffset-=(12/42);
            skillsButton.style.height = height + "vw";
            skillsTitle.style.top = topOffset + "vw";
            skillsTitle.style.left = leftOffset + "vw";
        } else {
            skillsTitle.style.top = "-1.25vw";
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

// function openWork () {
//     workTitle.style.position = "relative";
//     let height = 4;
//     let topOffset = 0;
//     let leftOffset = 0;
//     let id5 = setInterval(function () {
//         if (height < 25) {
//             height+=0.5;
//             topOffset-=(10/42);
//             leftOffset-=(7/42);
//             workButton.style.height = height + "vw";
//             workTitle.style.top = topOffset + "vw";
//             workTitle.style.left = leftOffset + "vw";
//         } else {
//             workOpen = !workOpen
//             clearInterval(id5);
//         }
//     }, 5)
// }

// function closeWork () {
//     workTitle.style.position = "relative";
//     let height = 25;
//     let topOffset = -10;
//     let leftOffset = -7;
//     let id6 = setInterval(function () {
//         if (height > 4) {
//             height-=0.5;
//             topOffset+=(10/42);
//             leftOffset+=(7/42);
//             workButton.style.height = height + "vw";
//             workTitle.style.top = topOffset + "vw";
//             workTitle.style.left = leftOffset + "vw";
//         } else {
//             workOpen = !workOpen
//             clearInterval(id6);
//         }
//     }, 5)
// }

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

workButton.addEventListener("click", function () {
    if (skillsOpen) {
        closeSkills();
    }
    if (!workOpen) {
        openWork();
    } else {
        closeWork();
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