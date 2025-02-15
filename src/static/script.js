const body = document.querySelector("body");
body.setAttribute("style", "margin: 0px; background: rgb(200, 255, 203)")

// Left bar to show the contents of the activities
const sidebar = document.createElement("div");
sidebar.setAttribute("style", 
    "position: fixed; width: 18%; height: 100%; background-color:rgb(127, 235, 127); color: rgb(255, 255, 255); display: flex; align-items: center; justify-content: left; margin-top: 0px");
body.appendChild(sidebar);

// Vertical Tab container
const tabContainer = document.createElement("div");
tabContainer.setAttribute("style", "width: 90%; display: flex; flex-direction: column; align-items: center; margin-bottom: 10px");

// Current Events Tab
const currentTab = document.createElement("div");
currentTab.textContent = "Current Events";
currentTab.setAttribute("style", "width: 100%; padding: 10px; text-align: center; cursor: pointer; background-color: rgb(100, 200, 100); margin-bottom: 5px; border-radius: 5px");

// Upcoming Events Tab
const upcomingTab = document.createElement("div");
upcomingTab.textContent = "Upcoming Events";
upcomingTab.setAttribute("style", "width: 100%; padding: 10px; text-align: center; cursor: pointer; background-color: rgb(100, 200, 100); border-radius: 5px");

tabContainer.appendChild(currentTab);
tabContainer.appendChild(upcomingTab);

sidebar.appendChild(tabContainer);

// Title Bar
const banner = document.createElement("div");
banner.setAttribute("style", 
    "width: 100%; height: 100px; margin-bottom: 10px; background-color:rgb(127, 235, 127); box-shadow: 0px 3px 3px rgb(133, 133, 133); color: rgb(255, 255, 255); font-weight: bold; font-size: 48px; font-family: Georgia; display: flex; align-items: center; justify-content: center; margin-top: 0px")
banner.textContent = "Campus Activity Finder"
body.appendChild(banner);

// Make the map
const mapdiv = document.createElement("div");
mapdiv.setAttribute("id", "map");
mapdiv.setAttribute("style", "height: 700px; width: 80%; float: right; margin-right: 1%");
body.appendChild(mapdiv);
