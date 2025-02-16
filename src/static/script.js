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
  .one { width: 25px; }
  .two { width: 25px; }
  .three { width: 30px; }
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
navWrapper.classList.add("nav");

const lineOne = document.createElement("div");
lineOne.classList.add("one");
const lineTwo = document.createElement("div");
lineTwo.classList.add("two");
const lineThree = document.createElement("div");
lineThree.classList.add("three");

navWrapper.appendChild(lineOne);
navWrapper.appendChild(lineTwo);
navWrapper.appendChild(lineThree);
body.appendChild(navWrapper);

// ------------------------------
// 4. Sidebar (slides in/out on toggle)
// ------------------------------
const sidebar = document.createElement("div");
sidebar.setAttribute(
  "style",
  "position: fixed; top: 0; left: 0; width: 18%; height: 100%; background-color: rgb(255,255,255); color: black; display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.3s ease-in-out; transform: translateX(0); z-index: 1000; padding: 10px;"
);
body.appendChild(sidebar);

let sidebarVisible = true;

// ------------------------------
// 5. Toggle Sidebar
// ------------------------------
navWrapper.addEventListener("click", function() {
  if (sidebarVisible) {
    sidebar.style.transform = "translateX(-100%)";
    sidebar.style.boxShadow = "none";
    sidebarVisible = false;
  } else {
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

const currentTab = document.createElement("div");
currentTab.textContent = "Current Events";
currentTab.id = "currentTab";
currentTab.setAttribute(
  "style",
  "background: none; color: black; width: 93%; text-align: center; padding: 10px; margin-top: 50px; margin-bottom: 10px; border-bottom: 2px solid rgb(39,93,56); cursor: pointer;"
);

const upcomingTab = document.createElement("div");
upcomingTab.textContent = "Upcoming Events";
upcomingTab.id = "upcomingTab";
upcomingTab.setAttribute(
  "style",
  "background: none; color: black; width: 93%; text-align: center; padding: 10px; margin-bottom: 10px; border-bottom: 2px solid rgb(39,93,56); cursor: pointer;"
);

topContainer.appendChild(currentTab);
topContainer.appendChild(upcomingTab);

// ------------------------------
// 6.5. Selected Event to look at
// ------------------------------
const currentEvent = document.createElement("div");
currentEvent.setAttribute(
  "style",
  "background: none; color: black; width: 93%; text-align: center; padding: 10px; margin-bottom: 10px; border-bottom: 2px solid rgb(39,93,56); display: none;"
);


// !!!!!!!!! TODO: Make this look better :D
const currentEventTitle = document.createElement("h1");
currentEventTitle.setAttribute(
  "style",
  ""
);

const currentEventLocation = document.createElement("h2");
currentEventTitle.setAttribute(
  "style",
  ""
);

const currentEventTime = document.createElement("h2");
currentEventTitle.setAttribute(
  "style",
  ""
);

const currentEventDescription = document.createElement("p");
currentEventTitle.setAttribute(
  "style",
  ""
);

currentEvent.appendChild(currentEventTitle);
currentEvent.appendChild(currentEventTime);
currentEvent.appendChild(currentEventLocation);
currentEvent.appendChild(currentEventDescription);

topContainer.appendChild(currentEvent);

// Update the current event based on user clicked
function updateEvent() {
  // Fetch the event description :D
  fetch('static/JSON/edescription.json')
  .then(response => response.json())
  .then(data => {
      if (!data.event) {
        currentEvent.style.display = "none";
        return;
      }

      console.log("UPDATE CURRENT EVENT");
      console.log(data);

      currentEvent.style.display = "block";

      // Check the contents of the object
      if (data.title == undefined) currentEventTitle.innerHTML = "NA";
      else currentEventTitle.innerHTML = data.title;

      if (data.time == undefined) currentEventTime.innerHTML = "Time: NA";
      else currentEventTime.innerHTML = "Time: " + data.time;

      if (data.location == undefined) currentEventLocation.innerHTML = "Location: NA";
      else currentEventLocation.innerHTML = "Location: " + data.location;

      if (data.description == undefined) currentEventDescription.innerHTML = "";
      else currentEventDescription.innerHTML = "Description - " + data.description;
  })
  .catch(error => console.error('Error finding event description:', error));
}

// ------------------------------
// 7. Registration Subtab (Collapsible) - Placed at the bottom
// ------------------------------
const registerContainer = document.createElement("div");
registerContainer.setAttribute("style", "width: 100%; margin-bottom: 20px;");

// Registration Header (always transparent with bottom border and an arrow)
const registerHeader = document.createElement("div");
registerHeader.innerHTML = "Register your event <span class='arrow'>▼</span>";
registerHeader.setAttribute("style",
  "width: 93%; padding: 10px; margin: 10px 0; text-align: center; background: transparent; border-top: 2px solid rgb(39,93,56); border-bottom: 2px solid rgb(39,93,56); cursor: pointer; font-family: 'Roboto Slab', serif; font-weight: 600; font-size: 20px; color: black;"
);

// Registration Content (the form) - initially collapsed with animation
const registerContent = document.createElement("div");
registerContent.setAttribute("style", "width: 100%; max-height: 0; overflow: hidden; transition: max-height 0.3s ease-in-out; flex-direction: column; align-items: center; margin-top: 10px;");

// // Username Input
// const UsernameInput = document.createElement("input");
// UsernameInput.placeholder = "Username";
// UsernameInput.setAttribute("style", "width: 90%; padding: 8px; margin: 5px 0; border: 1px solid rgb(242,205,0); border-radius: 5px; font-family: 'Roboto Slab', serif; font-size: 16px; color: black; box-sizing: border-box;");
// registerContent.appendChild(UsernameInput);

// // Password Input
// const PasswordInput = document.createElement("input");
// PasswordInput.placeholder = "Password";
// PasswordInput.setAttribute("style", "width: 90%; padding: 8px; margin: 5px 0; border: 1px solid rgb(242,205,0); border-radius: 5px; font-family: 'Roboto Slab', serif; font-size: 16px; color: black; box-sizing: border-box;");
// registerContent.appendChild(PasswordInput);

// Event Title Input
const eventTitleDiv = document.createElement("div");
eventTitleDiv.setAttribute("style", "flex-direction: column; align-items: center; gap: 0px 0px; margin: 5px 0px;");
eventTitleDiv.setAttribute("class", "required");
const eventTitleInput = document.createElement("input");
eventTitleInput.placeholder = "Event Title";
eventTitleInput.setAttribute("style", "width: 90%; margin: 0px; padding: 8px; border: 1px solid rgb(242,205,0); border-radius: 5px; font-family: 'Roboto Slab', serif; font-size: 16px; color: black; box-sizing: border-box;");
// Adjust the children
eventTitleDiv.appendChild(eventTitleInput);
registerContent.appendChild(eventTitleDiv);

// Event Location Input
const eventLocationInput = document.createElement("input");
eventLocationInput.placeholder = "Location";
eventLocationInput.setAttribute("style", "width: 90%; padding: 8px; margin: 5px 0; border: 1px solid rgb(242,205,0); border-radius: 5px; font-family: 'Roboto Slab', serif; font-size: 16px; color: black; box-sizing: border-box;");
registerContent.appendChild(eventLocationInput);

// Event Date/Time Input
const eventDateTimeInput = document.createElement("input");
eventDateTimeInput.placeholder = "Date/Time";
eventDateTimeInput.setAttribute("style", "width: 90%; padding: 8px; margin: 5px 0; border: 1px solid rgb(242,205,0); border-radius: 5px; font-family: 'Roboto Slab', serif; font-size: 16px; color: black; box-sizing: border-box;");
registerContent.appendChild(eventDateTimeInput);

// Event Description Input (Textarea)
const eventDescriptionInput = document.createElement("textarea");
eventDescriptionInput.placeholder = "Description";
eventDescriptionInput.setAttribute("style", "width: 90%; padding: 8px; margin: 5px 0; border: 1px solid rgb(242,205,0); border-radius: 5px; font-family: 'Roboto Slab', serif; font-size: 16px; color: black; resize: vertical; box-sizing: border-box;");
registerContent.appendChild(eventDescriptionInput);

// Create Event Button (with green background)
const createEventButton = document.createElement("button");
createEventButton.textContent = "Create Event";
createEventButton.setAttribute(
  "style",
  "width: 90%; padding: 10px; margin: 10px 0; background-color: rgb(39,93,56); border: none; border-radius: 25px; cursor: pointer; font-family: 'Roboto Slab', serif; font-weight: 600; font-size: 20px; color: white;"
);
registerContent.appendChild(createEventButton);

// Toggle the registration subtab when the header is clicked with animation
function toggleRegisterBar() {
  if (registerContent.style.maxHeight === "0px" || registerContent.style.maxHeight === "") {
    registerContent.style.maxHeight = "500px"; // Expand (adjust as needed)
    registerHeader.querySelector(".arrow").textContent = "▲";
  } else {
    registerContent.style.maxHeight = "0px"; // Collapse
    registerHeader.querySelector(".arrow").textContent = "▼";
  }
}

registerHeader.addEventListener("click", function() {toggleRegisterBar();});

function updateEventContents() {
  // Handle the error exceptions
  for (let i = 0; i < registerContent.children.length; ++i) {
    let ichild = registerContent.children[i];
    if (ichild.tagName.toLowerCase() != "div") continue;
    console.log("i-" + i + ": " + ichild.classList);
    if (ichild.classList.contains("error")) {
      let has_error_message = false;
      for (let j = 0; j < ichild.children.length; ++j) {
        has_error_message |= ichild.children[j].classList.contains("err_message");
      }
      if (has_error_message) continue;

      const errorCode = document.createElement("p");
      errorCode.setAttribute(
        "style",
        "color: rgb(255, 0, 0); margin: 0px 0px; font-size: 13px; text-align: right; padding-right: 20px;"
      );
      errorCode.setAttribute("class", "err_message");
      errorCode.innerHTML = "Invalid Input / Required Field";
      ichild.appendChild(errorCode);
    } else {
      // Remove every child that has the class Err_message
      for (let j = ichild.children.length - 1; j >= 0; --j) {
        if (ichild.children[j].classList.contains("err_message")) {
          ichild.children[j].remove();
        }
      }
    }
  }
}

// Append header and registration content to the registration container
registerContainer.appendChild(registerHeader);
registerContainer.appendChild(registerContent);

// ------------------------------
// 8. Append Top Container (tabs) and Registration Subtab to the Sidebar
// ------------------------------
sidebar.appendChild(topContainer);
sidebar.appendChild(registerContainer);

// ------------------------------
// 9. Title Bar (Banner)
// ------------------------------
const banner = document.createElement("div");
banner.setAttribute(
  "style",
  "width: 100%; height: 100px; margin-bottom: 10px; background-color: rgb(39,93,56); box-shadow: 0px 3px 3px rgb(133,133,133); color: rgb(242,205,0); font-weight: 600; font-size: 60px; font-family: 'Roboto Slab', serif; display: flex; align-items: center; justify-content: center; margin-top: 0px;"
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
