const body = document.querySelector("body");
body.setAttribute("style", "margin: 0px; background: rgb(255, 255, 255)")

// This dynamically creates a <link> element to load the "Roboto Slab" font.
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@600&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

// Left bar to show the contents of the activities
const sidebar = document.createElement("div");
sidebar.setAttribute("style", 
    "position: fixed; width: 18%; height: 100%; background-color:rgb(127, 235, 127); color: rgb(255, 255, 255); display: flex; flex-direction: column; align-items: center; justify-content: center; margin-top: 0px");
body.appendChild(sidebar);

// Create Event Button
const createEventButton = document.createElement("button");
createEventButton.textContent = "Create Event";
createEventButton.setAttribute(
    "style", "width: 90%; padding: 10px; margin: 10px; background-color: rgb(100, 200, 100); border: none; border-radius: 5px; cursor: pointer");

// Vertical Tab container
const tabContainer = document.createElement("div");
tabContainer.setAttribute("style", "width: 90%; display: flex; flex-direction: column; align-items: center; margin-bottom: 10px");
sidebar.appendChild(createEventButton);

// Current Events Tab
const currentTab = document.createElement("div");
currentTab.textContent = "Current Events";
currentTab.id = "currentTab"
currentTab.setAttribute("style", "width: 100%; padding: 10px; text-align: center; cursor: pointer; background-color: rgb(100, 200, 100); margin-bottom: 5px; border-radius: 5px");

// Upcoming Events Tab
const upcomingTab = document.createElement("div");
upcomingTab.textContent = "Upcoming Events";
upcomingTab.id = "upcomingTab"
upcomingTab.setAttribute("style", "width: 100%; padding: 10px; text-align: center; cursor: pointer; background-color: rgb(100, 200, 100); border-radius: 5px");

tabContainer.appendChild(currentTab);
tabContainer.appendChild(upcomingTab);

sidebar.appendChild(tabContainer);

// Title Bar
const banner = document.createElement("div");
banner.setAttribute("style", 
    "width: 100%; height: 100px; margin-bottom: 10px; background-color:rgb(39, 93, 56); box-shadow: 0px 3px 3px rgb(133, 133, 133); color: rgb(242, 205, 0); font-weight: 600; font-size: 60px; font-family: 'Roboto Slab', serif; display: flex; align-items: center; justify-content: center; margin-top: 0px")
banner.textContent = "Campus Activity Finder"
body.appendChild(banner);

// Make the map
const mapdiv = document.createElement("div");
mapdiv.setAttribute("id", "map");
mapdiv.setAttribute("style", "height: 700px; width: 80%; float: right; margin-right: 1%");
body.appendChild(mapdiv);

// Add an onclick event for a div
upcomingTab.addEventListener('click', function()
{
    console.log("Upcoming clicked")
})

