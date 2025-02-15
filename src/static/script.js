// ------------------------------
// 1. Body & Basic Setup
// ------------------------------
const body = document.querySelector("body");
body.setAttribute("style", "margin: 0; background: #fff;");

// Dynamically load the "Roboto Slab" font
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@600&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

// ------------------------------
// 2. Inline CSS for the 3-Line Menu & Hover Transitions
// ------------------------------
const styleBlock = document.createElement("style");
styleBlock.innerHTML = `
  /* Container for the 3-line menu */
  .nav {
    position: fixed;
    top: 30px;
    left: 20px;
    z-index: 9999;
    cursor: pointer;
    display: flex;
    flex-direction: column;
  }

  /* Each horizontal line */
  .one, .two, .three {
    height: 4px;
    background: black;
    margin: 5px 0;
    transition: width 0.3s;
  }

  /* Initial widths for the three lines */
  .one {
    width: 25px;
  }
  .two {
    width: 25px;
  }
  .three {
    width: 30px;
  }

  /* On hover, each line extends to 35px */
  .nav:hover .one,
  .nav:hover .two,
  .nav:hover .three {
    width: 35px;
  }
`;
document.head.appendChild(styleBlock);

// ------------------------------
// 3. Create the 3-Line Hamburger Menu
// ------------------------------
const navWrapper = document.createElement("div");
navWrapper.classList.add("nav"); // We'll call this .nav for the CSS above

// The three horizontal lines
const lineOne = document.createElement("div");
lineOne.classList.add("one");
const lineTwo = document.createElement("div");
lineTwo.classList.add("two");
const lineThree = document.createElement("div");
lineThree.classList.add("three");

// Append lines to the nav container
navWrapper.appendChild(lineOne);
navWrapper.appendChild(lineTwo);
navWrapper.appendChild(lineThree);

// Add the 3-line menu to the body
body.appendChild(navWrapper);

// ------------------------------
// 4. Sidebar (slides in/out on toggle)
//    - No initial box-shadow here
// ------------------------------
const sidebar = document.createElement("div");
sidebar.setAttribute(
  "style",
  "position: fixed; top: 0; left: 0; width: 18%; height: 100%; background-color: rgb(255, 255, 255); color: rgb(255, 255, 255); display: flex; flex-direction: column; align-items: center; justify-content: center; transition: transform 0.3s ease-in-out; transform: translateX(0);"
);
body.appendChild(sidebar);

// Track whether the sidebar is visible
let sidebarVisible = true;

// ------------------------------
// 5. Toggle Sidebar & Box Shadow
// ------------------------------
navWrapper.addEventListener("click", function() {
  if (sidebarVisible) {
    // Slide out (off screen to the left), remove shadow
    sidebar.style.transform = "translateX(-100%)";
    sidebar.style.boxShadow = "none";
    sidebarVisible = false;
  } else {
    // Slide back in, add shadow on the right
    sidebar.style.transform = "translateX(0)";
    sidebar.style.boxShadow = "2px 0 10px rgba(0,0,0,0.3)";
    sidebarVisible = true;
  }
});

/// ------------------------------
// 5. "Create Event" Button in Sidebar (at the top, rounded, same text style)
// ------------------------------
const createEventButton = document.createElement("button");
createEventButton.textContent = "Create Event";
createEventButton.setAttribute(
  "style",
  "width: 90%; padding: 10px; margin: 10px 0; background-color: rgb(39, 93, 56); border: 0px solid rgb(242,205,0); border-radius: 25px; cursor: pointer; font-family: 'Roboto Slab', serif; font-weight: 600; font-size: 20px; color: rgb(242,205,0);"
);

sidebar.appendChild(createEventButton);

// ------------------------------
// 7. Vertical Tab Container (Current / Upcoming)
// ------------------------------
const tabContainer = document.createElement("div");
tabContainer.setAttribute(
  "style",
  "width: 90%; display: flex; flex-direction: column; align-items: center; margin-bottom: 10px;"
);

// Current Events Tab
const currentTab = document.createElement("div");
currentTab.textContent = "Current Events";
currentTab.id = "currentTab";
currentTab.setAttribute(
  "style",
  "background: none; color: black; width: 100%; text-align: center; padding: 10px; margin: 10px 0; border-bottom: 2px solid rgb(39, 93, 56); cursor: pointer;"
);

// Upcoming Events Tab
const upcomingTab = document.createElement("div");
upcomingTab.textContent = "Upcoming Events";
upcomingTab.id = "upcomingTab";
upcomingTab.setAttribute(
  "style",
  "background: none; color: black; width: 100%; text-align: center; padding: 10px; margin: 10px 0; border-bottom: 2px solid rgb(39, 93, 56); cursor: pointer;"
);

// Add the tabs to the container, then container to the sidebar
tabContainer.appendChild(currentTab);
tabContainer.appendChild(upcomingTab);
sidebar.appendChild(tabContainer);

// ------------------------------
// 8. Title Bar (Banner)
// ------------------------------
const banner = document.createElement("div");
banner.setAttribute(
  "style",
  "width: 100%; height: 100px; margin-bottom: 10px; background-color: rgb(39, 93, 56); box-shadow: 0px 3px 3px rgb(133, 133, 133); color: rgb(242, 205, 0); font-weight: 600; font-size: 60px; font-family: 'Roboto Slab', serif; display: flex; align-items: center; justify-content: center; margin-top: 0px;"
);
banner.textContent = "Campus Activity Finder";
body.appendChild(banner);

// ------------------------------
// 9. Map Container
// ------------------------------
const mapdiv = document.createElement("div");
mapdiv.setAttribute("id", "map");
mapdiv.setAttribute("style", "height: 700px; width: 80%; float: right; margin-right: 1%;");
body.appendChild(mapdiv);

// ------------------------------
// 10. Example Event Listener
// ------------------------------
upcomingTab.addEventListener("click", function() {
  console.log("Upcoming clicked");
});
