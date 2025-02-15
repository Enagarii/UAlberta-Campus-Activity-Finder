const body = document.querySelector("body");
body.setAttribute("style", "margin: 0px; background: rgb(200, 255, 203)")

// Left bar to show the contents of the activities
const sidebar = document.createElement("div");
sidebar.setAttribute("style", 
    "position: fixed; width: 18%; height: 100%; background-color:rgb(127, 235, 127); color: rgb(255, 255, 255); display: flex; align-items: center; justify-content: left; margin-top: 0px");
body.appendChild(sidebar);

// Title Bar
const banner = document.createElement("div");
banner.setAttribute("style", 
    "position: fixed; width: 100%; height: 100px; background-color:rgb(127, 235, 127); box-shadow: 0px 3px 3px rgb(133, 133, 133); color: rgb(255, 255, 255); font-weight: bold; font-size: 48px; font-family: Georgia; display: flex; align-items: center; justify-content: center; margin-top: 0px")
banner.textContent = "Campus Activity Finder"
body.appendChild(banner);

// 