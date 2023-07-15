/*INTRO ANIMATED TEXT*/
let Text1 = document.getElementById("home-text-1")
let str1 = "munir@debian:~$ Hello, I'm Munir!";
let ind1 = 15;
let Text2 = document.getElementById("home-text-2")
let str2 = "munir@debian:~$ Welcome to my website";
let ind2 = 15;
let newLineAdded1 = false;
let Text3 = document.getElementById("home-text-3")
let str3 = "munir@debian:~$ Feel free to explore the site to learn more about me!";
let ind3 = 15;
let newLineAdded2 = false;

var id1 = setInterval(load1,60);
function load1 () {
    if (Text1.textContent != str1) {
        Text1.textContent += str1[ind1];
        ind1++;
    }
    else {
        document.documentElement.style.setProperty('--BLINKER1', '""');
        document.documentElement.style.setProperty('--BLINKER2', '"|"');
        if (newLineAdded1 == false) {
            Text2.textContent = "munir@debian:~$";
            newLineAdded1 = true;
        }
        if (Text2.textContent != str2){
            Text2.textContent += str2[ind2];
            ind2++;
        } else {  
            document.documentElement.style.setProperty('--BLINKER1', '""');
            document.documentElement.style.setProperty('--BLINKER2', '""');
            document.documentElement.style.setProperty('--BLINKER3', '"|"');
            if (newLineAdded2 == false) {
                Text3.textContent = "munir@debian:~$";
                newLineAdded2 = true;
            }
            if (Text3.textContent != str3){
                Text3.textContent += str3[ind3];
                ind3++;
            } else {  
                clearInterval(id1);
            }
        }
    }
}

/*NAV SCROLL MANAGER*/
let aboutMeButton = document.getElementById("about-me-button");
let projectsButton = document.getElementById("projects-button");
let contactMeButton = document.getElementById("contact-me-button");

document.addEventListener('scroll', function () {
    if (window.scrollY >= 50) {
        navBar.style.opacity = 1;
    } else {
        navBar.style.opacity = 0;
    }
});

aboutMeButton.addEventListener("click", function () {
    document.getElementById("about-me-anchor").scrollIntoView();
});

contactMeButton.addEventListener("click", function () {
    document.getElementById("contact-me-anchor").scrollIntoView();
});


let navBar = document.getElementById("nav");
let homeLink = document.getElementById("home-link");
let aboutMeLink = document.getElementById("about-me-link");
let projectsLink = document.getElementById("projects-link");
let contactMeLink = document.getElementById("contact-me-link");

homeLink.addEventListener("click", function () {
    scroll(0,0);
});

projectsButton.addEventListener("click", function () {
    document.getElementById("projects-anchor").scrollIntoView();
})

aboutMeLink.addEventListener("click", function () {
    document.getElementById("about-me-anchor").scrollIntoView();
});

projectsLink.addEventListener("click", function () {
    document.getElementById("projects-anchor").scrollIntoView();
})

contactMeLink.addEventListener("click", function () {
    document.getElementById("contact-me-anchor").scrollIntoView();
});

/*ABOUT ME BUTTONS FUNCTIONALITY*/
let skillsButton = document.querySelector("#skills");
let skillsTitle = document.querySelector("#skills-title");
let skillsContent = document.querySelector("#skills-content");
let skillsOpen = false;
let skillsIcons = document.querySelectorAll("#skills-button-header img")
let workButton = document.querySelector("#work");
let workTitle = document.querySelector("#work-title");
let workOpen = false;
let workIcons = document.querySelectorAll("#work-button-header img")

function openSkills () {
    skillsIcons.forEach(function (icon) {
        icon.style.display = "none";
    });
    skillsTitle.style.top = "0";
    skillsButtonHeightIncrease = 5;
    let skillsTitleOffset = 0;
    var idSkills1 = setInterval(function () {
        if (skillsTitle.style.left != "-11.5vw" || skillsButton.style.height != "25vw") {
            if (skillsTitle.style.left != "-11.5vw") {
                skillsTitleOffset+=0.5;
                skillsTitle.style.left = -(skillsTitleOffset) + "vw";
            }
            skillsButton.style.justifyContent = "flex-start";
            skillsButton.style.paddingTop = "2.5%";
            if (skillsButton.style.height != "25vw") {
                skillsButtonHeightIncrease += 1;
                skillsButton.style.height = skillsButtonHeightIncrease + "vw";
                }
        } else {
            clearInterval(idSkills1);
            skillsTitle.style.marginBottom = "0.5vw"
            skillsContent.style.display = "inline";
        }
    }, 10);
}

function closeSkills () {
    skillsTitle.style.top = "0";
    skillsContent.style.display = "none";
    skillsTitle.style.marginBottom = "0"
    let skillsTitleOffset = 11.5;
    var idSkills2 = setInterval(function () {
        if (skillsTitle.style.left != "0vw" || skillsButton.style.height != "5vw") {
            if (skillsTitle.style.left != "0vw") {
                skillsTitleOffset -= 0.5;
                skillsTitle.style.left = -skillsTitleOffset + "vw";
            }
            if (skillsButton.style.height != "5vw") {
                skillsButtonHeightIncrease -= 1;
                skillsButton.style.height = skillsButtonHeightIncrease + "vw";
            }
        }
        else {
            skillsButton.style.justifyContent = "center";
            skillsButton.style.paddingTop = "0";
            skillsIcons.forEach(function (icon) {
                icon.style.display = "inline";
            });
            clearInterval(idSkills2);
        }
    }, 10);
}

function openWork () {
    workIcons.forEach(function (icon) {
        icon.style.display = "none";
    });
    workTitle.style.top = "0";
    let workTitleOffset = 0;
    let workButtonHeightIncrease = 5;
        var idWork1 = setInterval(function () {
        workButton.style.justifyContent = "flex-start";
        workButton.style.paddingTop = "2.5%";
        if (workTitle.style.left != "-6.5vw" || workButton.style.height != "25vw") {
            if (workTitle.style.left != "-6.5vw") {
                workTitleOffset+= 0.25;
                workTitle.style.left = -workTitleOffset + "vw";
            }
            if (workButton.style.height != "25vw") {
                workButtonHeightIncrease += 1;
                workButton.style.height = workButtonHeightIncrease + "vw";
                }
        } else {
            clearInterval(idWork1);
        }
    }, 10);
}

function closeWork () {
    let workTitleOffset = 6.5;
    let workButtonHeightIncrease = 25;
    workTitle.style.top = "0";
    var idWork2 = setInterval(function () {
        if (workTitle.style.left != "0vw" || workButton.style.height != "5vw") {
            if (workTitle.style.left != "0vw") {
                workTitleOffset-= 0.25;
                workTitle.style.left = -workTitleOffset + "vw";
            }
            if (workButton.style.height != "5vw") {
                workButtonHeightIncrease -= 1;
                workButton.style.height = workButtonHeightIncrease + "vw";
            }
        }
        else {
            workButton.style.justifyContent = "center";
            workButton.style.paddingTop = "0";
            workIcons.forEach(function (icon) {
                icon.style.display = "inline";
            });
            clearInterval(idWork2);
        }
    }, 10);
}

skillsButton.addEventListener("click", function () {
    if (workOpen) {
        closeWork();
        workOpen = false;
    }
    if (!skillsOpen) {
        openSkills();
        skillsOpen = true;
    } else {
        closeSkills();
        skillsOpen = false;
    }
});

workButton.addEventListener("click", function () {
    if (skillsOpen) {
        closeSkills();
        skillsOpen = false;
    }
    if (!workOpen) {
        openWork();
        workOpen = true;
    } else {
        closeWork();
        workOpen = false;
    }
});

/*******************CONTACT ME EMAIL BUTTON FUNCTIONALITY*******************/
let overlay = document.querySelector("#overlay");
let mailButton = document.querySelector("#mail-button");
let closeButton = document.querySelector("#close-overlay");

mailButton.addEventListener("click", function () {
    overlay.style.display = "flex";
});

closeButton.addEventListener("click", function () {
    overlay.style.display = "none";
});

/*******************DISABLING INSTAGRAM AND FACEBOOK FUNCTIONALITY*******************/
/*We do this because the current css used in this website is not fully functional on the 
built-in browser used by instagram and facebook.*/

if(navigator.userAgent.toLowerCase().includes("instagram")){
    window.location.href = "reroute.html";
}

if (/FB_IAB/.test(navigator.userAgent) || /FBAN/.test(navigator.userAgent) || /FBAV/.test(navigator.userAgent)) {
    window.location.href = "reroute.html";
}

