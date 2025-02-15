const body = document.querySelector("body");
body.setAttribute("style", "display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 0px; background: rgb(200, 255, 203)")

const banner = document.createElement("div");
banner.setAttribute("style", 
    "width: 100%; height: 100px; background-color:rgb(127, 235, 127); box-shadow: 0px 3px 3px rgb(133, 133, 133); color: rgb(255, 255, 255); font-weight: bold; font-size: 48px; font-family: Georgia; display: flex; align-items: center; justify-content: center; margin-top: 0px")
banner.textContent = "Campus Activity Finder"

body.appendChild(banner);

// 