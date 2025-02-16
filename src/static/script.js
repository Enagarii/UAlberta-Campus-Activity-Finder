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
// ------------------------------
const sidebar = document.createElement("div");
sidebar.setAttribute(
  "style",
  "position: fixed; top: 0; left: 0; width: 18%; height: 100%; background-color: rgb(255, 255, 255); color: rgb(255, 255, 255); display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.3s ease-in-out; transform: translateX(0); z-index: 1000; padding: 10px;"
);
body.appendChild(sidebar);

// Track whether the sidebar is visible
let sidebarVisible = true;

// ------------------------------
// 5. Toggle Sidebar & Box Shadow (Map container remains constant)
// ------------------------------
navWrapper.addEventListener("click", function() {
    if (sidebarVisible) {
      // Slide out (hide sidebar) and remove shadow
      sidebar.style.transform = "translateX(-100%)";
      sidebar.style.boxShadow = "none";
      sidebarVisible = false;
    } else {
      // Slide back in (show sidebar) and add shadow on the right
      sidebar.style.transform = "translateX(0)";
      sidebar.style.boxShadow = "2px 0 10px rgba(0,0,0,0.3)";
      sidebarVisible = true;
    }
});

// ------------------------------
// 6. Top Container: Vertical Tab Container (Current / Upcoming)
// ------------------------------
const topContainer = document.createElement("div");
topContainer.setAttribute("style", "width: 100%;");

// Current Events Tab
const currentTab = document.createElement("div");
currentTab.textContent = "Current Events";
currentTab.id = "currentTab";
currentTab.setAttribute(
  "style",
  "background: none; color: black; width: 93%; text-align: center; padding: 10px; margin-bottom: 10px; border-bottom: 2px solid rgb(39, 93, 56); cursor: pointer;"
);

// Upcoming Events Tab
const upcomingTab = document.createElement("div");
upcomingTab.textContent = "Upcoming Events";
upcomingTab.id = "upcomingTab";
upcomingTab.setAttribute(
  "style",
  "background: none; color: black; width: 93%; text-align: center; padding: 10px; margin-bottom: 10px; border-bottom: 2px solid rgb(39, 93, 56); cursor: pointer;"
);

topContainer.appendChild(currentTab);
topContainer.appendChild(upcomingTab);

// ------------------------------
// 7. Bottom Container: Event Input Form and Create Event Button
// ------------------------------
const bottomContainer = document.createElement("div");
bottomContainer.setAttribute("style", "width: 100%; display: flex; flex-direction: column; align-items: center; margin-top: 20px; margin-bottom: 20px;");

// Event Input Form (text boxes)
const eventForm = document.createElement("div");
eventForm.setAttribute("style", "width: 90%; margin-bottom: 10px; display: flex; flex-direction: column; align-items: center;");

// Username Input
const UsernameInput = document.createElement("input");
UsernameInput.placeholder = "Username";
UsernameInput.setAttribute("style", "width: 100%; padding: 8px; margin: 5px 0; border: 1px solid rgb(242,205,0); border-radius: 5px; font-family: 'Roboto Slab', serif; font-size: 16px; color: black; box-sizing: border-box;");
eventForm.appendChild(UsernameInput);

// Password Input
const PasswordInput = document.createElement("input");
PasswordInput.placeholder = "Password";
PasswordInput.setAttribute("style", "width: 100%; padding: 8px; margin: 5px 0; border: 1px solid rgb(242,205,0); border-radius: 5px; font-family: 'Roboto Slab', serif; font-size: 16px; color: black; box-sizing: border-box;");
eventForm.appendChild(PasswordInput);


// Event Title Input
const eventTitleInput = document.createElement("input");
eventTitleInput.placeholder = "Event Title";
eventTitleInput.setAttribute("style", "width: 100%; padding: 8px; margin: 5px 0; border: 1px solid rgb(242,205,0); border-radius: 5px; font-family: 'Roboto Slab', serif; font-size: 16px; color: black; box-sizing: border-box;");
eventForm.appendChild(eventTitleInput);

// Event Location Input
const eventLocationInput = document.createElement("input");
eventLocationInput.placeholder = "Event Location";
eventLocationInput.setAttribute("style", "width: 100%; padding: 8px; margin: 5px 0; border: 1px solid rgb(242,205,0); border-radius: 5px; font-family: 'Roboto Slab', serif; font-size: 16px; color: black; box-sizing: border-box;");
eventForm.appendChild(eventLocationInput);

// Event Date/Time Input
const eventDateTimeInput = document.createElement("input");
eventDateTimeInput.placeholder = "Event Date/Time";
eventDateTimeInput.setAttribute("style", "width: 100%; padding: 8px; margin: 5px 0; border: 1px solid rgb(242,205,0); border-radius: 5px; font-family: 'Roboto Slab', serif; font-size: 16px; color: black; box-sizing: border-box;");
eventForm.appendChild(eventDateTimeInput);

// Event Description Input (Textarea)
const eventDescriptionInput = document.createElement("textarea");
eventDescriptionInput.placeholder = "Event Description";
eventDescriptionInput.setAttribute("style", "width: 100%; padding: 8px; margin: 5px 0; border: 1px solid rgb(242,205,0); border-radius: 5px; font-family: 'Roboto Slab', serif; font-size: 16px; color: black; resize: vertical; box-sizing: border-box;");
eventForm.appendChild(eventDescriptionInput);

// Create Event Button
const createEventButton = document.createElement("button");
createEventButton.textContent = "Create Event";
createEventButton.setAttribute(
  "style",
  "width: 90%; padding: 10px; margin: 10px 0; background-color: rgb(39, 93, 56); border: 0px solid rgb(242,205,0); border-radius: 25px; cursor: pointer; font-family: 'Roboto Slab', serif; font-weight: 600; font-size: 20px; color: rgb(242,205,0);"
);

// Append the event form and button to the bottom container
bottomContainer.appendChild(eventForm);
bottomContainer.appendChild(createEventButton);

// ------------------------------
// 8. Append Top and Bottom Containers to the Sidebar
// ------------------------------
sidebar.appendChild(topContainer);
sidebar.appendChild(bottomContainer);

// ------------------------------
// 9. Title Bar (Banner)
// ------------------------------
const banner = document.createElement("div");
banner.setAttribute(
  "style",
  "width: 100%; height: 100px; margin-bottom: 10px; background-color: rgb(39, 93, 56); box-shadow: 0px 3px 3px rgb(133, 133, 133); color: rgb(242, 205, 0); font-weight: 600; font-size: 60px; font-family: 'Roboto Slab', serif; display: flex; align-items: center; justify-content: center; margin-top: 0px;"
);
banner.textContent = "Campus Activity Finder";
body.appendChild(banner);

// ------------------------------
// 10. Map Container
// ------------------------------
const mapdiv = document.createElement("div");
mapdiv.setAttribute("id", "map");
mapdiv.setAttribute("style", "height: 820px; width: 98%; float: right; margin-right: 1%;");
body.appendChild(mapdiv);

// ------------------------------
// 11. Example Event Listener
// ------------------------------
upcomingTab.addEventListener("click", function() {
  console.log("Upcoming clicked");
});
