let emailButton = document.getElementById("email-me-button")

emailButton.addEventListener("click", function () {
    document.getElementById("email-form-overlay").style.display = "flex"
})

let closeButton = document.getElementById("close-overlay")

closeButton.addEventListener("click", function () {
    document.getElementById("email-form-overlay").style.display = "none"
})

let clearButton = document.getElementById("clear-button");

clearButton.addEventListener("click", function () {
    console.log("clicked")
})

// let homeTextMain = document.getElementById("intro-box-text")
// let homeTextSub = document.getElementById("intro-box-sub-text")

// homeTextMain.textContent = ""
// homeTextSub.textContent = ""

// let introText = "Hello, I'm Munir!"
// let introIndex = 0
// let subText = "A third-year university student enrolled in the Honours Computer Science CO-OP program at McMaster University. Welcome to my website!"
// let subIndex = 0

// // document.documentElement.style.setProperty('--BLINKER1', '"|"');
// let introTextLoad = setInterval(function(){
//     if (introIndex >= introText.length) {
//         clearInterval(introTextLoad)
//         // document.documentElement.style.setProperty('--BLINKER2', '"|"');
//         let subTextLoad = setInterval(function(){
//             if (subIndex >= subText.length) {
//                 clearInterval(subTextLoad)
//                 return
//             }
//             homeTextSub.textContent+=subText[subIndex]
//             subIndex+=1
//         },20)
//         return
//     }
//     homeTextMain.textContent+=introText[introIndex]
//     introIndex+=1
// },40)