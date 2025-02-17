// ------------------------------
// 1. Body & Basic Setup
// ------------------------------
const body = document.querySelector("body");
body.setAttribute("style", "margin: 0; background: #fff;");

var visibleMarker = false;

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
sidebar.setAttribute("style", "position: fixed; top: 0; left: 0; width: 25%; height: 100%; background-color: rgb(255,255,255); color: black; display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.3s ease-in-out; transform: translateX(0); z-index: 1000; padding: 10px; overflow-y: auto;");  // Added overflow-y: auto;
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
// 6. Top Container: Vertical Tab Container (Collapsible Sections)
// ------------------------------
const topContainer = document.createElement("div");
topContainer.setAttribute("style", "width: 100%;");

// -- Current Events Header and Content --
const currentTab = document.createElement("div");
currentTab.innerHTML = "Current Events <span class='arrow'>▼</span>";
currentTab.id = "currentTab";
currentTab.setAttribute("style", "background: none; color: black; width: 93%; text-align: center; padding: 10px; margin-top: 50px; margin-bottom: 0; border-bottom: 2px solid rgb(39,93,56); cursor: pointer;");
const currentContent = document.createElement("div");
currentContent.setAttribute("style", "width: 93%; max-height: 0; overflow: hidden; transition: max-height 0.3s ease-in-out; margin-bottom: 10px;");

// -- Upcoming Events Header and Content --
const upcomingTab = document.createElement("div");
upcomingTab.innerHTML = "Upcoming Events <span class='arrow'>▼</span>";
upcomingTab.id = "upcomingTab";
upcomingTab.setAttribute("style", "background: none; color: black; width: 93%; text-align: center; padding: 10px; margin-bottom: 0; border-bottom: 2px solid rgb(39,93,56); cursor: pointer;");
const upcomingContent = document.createElement("div");
upcomingContent.setAttribute("style", "width: 93%; max-height: 0; overflow: hidden; transition: max-height 0.3s ease-in-out; margin-bottom: 10px;");

topContainer.appendChild(currentTab);
topContainer.appendChild(currentContent);
topContainer.appendChild(upcomingTab);
topContainer.appendChild(upcomingContent);

// Toggle functions for collapsible sections
currentTab.addEventListener("click", function() {
  if (currentContent.style.maxHeight === "0px" || currentContent.style.maxHeight === "") {
    currentContent.style.maxHeight = "300px"; // Expand; adjust as needed
    currentTab.querySelector(".arrow").textContent = "▲";
  } else {
    currentContent.style.maxHeight = "0px"; // Collapse
    currentTab.querySelector(".arrow").textContent = "▼";
  }
});

upcomingTab.addEventListener("click", function() {
  if (upcomingContent.style.maxHeight === "0px" || upcomingContent.style.maxHeight === "") {
    upcomingContent.style.maxHeight = "300px"; // Expand; adjust as needed
    upcomingTab.querySelector(".arrow").textContent = "▲";
  } else {
    upcomingContent.style.maxHeight = "0px"; // Collapse
    upcomingTab.querySelector(".arrow").textContent = "▼";
  }
});


// ------------------------------
// 6.5. Selected Event to look at
// ------------------------------
const currentEventDiv = document.createElement("div");

const currentEvent = document.createElement("div");
currentEvent.setAttribute("style", "background: white; color: black; width: 93%; text-align: left; padding: 10px; margin-bottom: 10px; border: none; border-radius: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.2); display: none;");

// Selected Event Title (Centered and Bigger)
const currentEventTitle = document.createElement("h1");
currentEventTitle.setAttribute("style", "text-align: center; font-size: 24px; margin: 0; padding: 5px;");

// Selected Event Time (Left aligned)
const currentEventTime = document.createElement("h2");
currentEventTime.setAttribute("style", "text-align: left; font-size: 16px; margin: 0; padding: 5px;");

// Selected Event Location (Left aligned)
const currentEventLocation = document.createElement("h2");
currentEventLocation.setAttribute("style", "text-align: left; font-size: 16px; margin: 0; padding: 5px;");

// New Selected Event Link (Left aligned, clickable)
const currentEventLink = document.createElement("a");
currentEventLink.setAttribute("style", "text-align: left; font-size: 16px; margin: 0; padding: 5px; display: block; color: blue; text-decoration: underline;");

// Selected Event Description (Left aligned)
// Updated style to force text wrapping and adjust height if needed.
const currentEventDescription = document.createElement("p");
currentEventDescription.setAttribute("style", "text-align: left; font-size: 14px; margin: 0; padding: 5px; word-wrap: break-word; overflow-wrap: break-word; white-space: normal;");

currentEvent.appendChild(currentEventTitle);
currentEvent.appendChild(currentEventTime);
currentEvent.appendChild(currentEventLocation);
currentEvent.appendChild(currentEventLink);  // Append link before description
currentEvent.appendChild(currentEventDescription);


topContainer.appendChild(currentEvent);

// Update the current event based on user clicked
function updateEvent() {
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

      if (data.title == undefined) currentEventTitle.innerHTML = "NA";
      else currentEventTitle.innerHTML = data.title;

      if (data.time == undefined) currentEventTime.innerHTML = "Time: NA";
      else currentEventTime.innerHTML = "Time: " + data.time;

      if (data.location == undefined) currentEventLocation.innerHTML = "Location: NA";
      else currentEventLocation.innerHTML = "Location: " + data.location;

      // Check if a link exists. If yes, make it clickable and visible, opening in a new tab.
      if (data.link && data.link.trim() !== "") {
          currentEventLink.href = data.link;
          currentEventLink.innerHTML = data.link;
          currentEventLink.setAttribute("target", "_blank");
          currentEventLink.style.display = "block";
      } else {
          currentEventLink.style.display = "none";
      }

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

const registerHeader = document.createElement("div");
registerHeader.innerHTML = "Register your event <span class='arrow'>▼</span>";
registerHeader.setAttribute("style",
  "width: 93%; padding: 10px; margin: 10px 0; text-align: center; background: transparent; border-top: 2px solid rgb(39,93,56); border-bottom: 2px solid rgb(39,93,56); cursor: pointer; font-family: 'Roboto Slab', serif; font-weight: 600; font-size: 20px; color: black;"
);

const registerContent = document.createElement("div");
registerContent.setAttribute("style", "width: 100%; max-height: 0; overflow: hidden; transition: max-height 0.3s ease-in-out; flex-direction: column; align-items: center; margin-top: 10px;");

// Event Title Input
const eventTitleDiv = document.createElement("div");
eventTitleDiv.setAttribute("style", "flex-direction: column; align-items: center; gap: 0px 0px; margin: 5px 0px;");
eventTitleDiv.setAttribute("class", "required event_input");
eventTitleDiv.setAttribute("id", "title");

const eventTitleInput = document.createElement("input");
eventTitleInput.placeholder = "Event Title";
eventTitleInput.setAttribute("style", "width: 90%; margin: 0px; padding: 8px; border: 1px solid rgb(242,205,0); border-radius: 5px; font-family: 'Roboto Slab', serif; font-size: 16px; color: black; box-sizing: border-box;");
eventTitleDiv.appendChild(eventTitleInput);
registerContent.appendChild(eventTitleDiv);

// Event Location Input
const eventLocationDiv = document.createElement("div");
eventLocationDiv.setAttribute("style", "flex-direction: column; align-items: center; gap: 0px 0px; margin: 5px 0px;");
eventLocationDiv.setAttribute("class", "required event_input");
eventLocationDiv.setAttribute("id", "location");

const eventLocationInput = document.createElement("input");
eventLocationInput.placeholder = "Location";
eventLocationInput.setAttribute("style", "width: 90%; padding: 8px; margin: 5px 0; border: 1px solid rgb(242,205,0); border-radius: 5px; font-family: 'Roboto Slab', serif; font-size: 16px; color: black; box-sizing: border-box;");
eventLocationDiv.appendChild(eventLocationInput);
registerContent.appendChild(eventLocationDiv);

// Start Date/Time Input with Label
const eventStartDateTimeDiv = document.createElement("div");
eventStartDateTimeDiv.setAttribute("style", "flex-direction: column; align-items: center; gap: 0px 0px; margin: 5px 0px;");
eventStartDateTimeDiv.setAttribute("class", "required event_input");
eventStartDateTimeDiv.setAttribute("id", "start_time");

const startLabel = document.createElement("label");
startLabel.textContent = "Start Date/Time:";
startLabel.setAttribute("style", "width: 90%; font-family: 'Roboto Slab', serif; font-size: 16px; color: black; margin-top: 5px;");

const eventStartDateTimeInput = document.createElement("input");
eventStartDateTimeInput.type = "datetime-local";
eventStartDateTimeInput.setAttribute("style", "width: 90%; padding: 8px; margin: 5px 0; border: 1px solid rgb(242,205,0); border-radius: 5px; font-family: 'Roboto Slab', serif; font-size: 16px; color: black; box-sizing: border-box;");
eventStartDateTimeDiv.appendChild(startLabel);
eventStartDateTimeDiv.appendChild(eventStartDateTimeInput);
registerContent.appendChild(eventStartDateTimeDiv);

// End Date/Time Input with Label
const eventEndDateTimeDiv = document.createElement("div");
eventEndDateTimeDiv.setAttribute("style", "flex-direction: column; align-items: center; gap: 0px 0px; margin: 5px 0px;");
eventEndDateTimeDiv.setAttribute("class", "required event_input");
eventEndDateTimeDiv.setAttribute("id", "end_time");

const endLabel = document.createElement("label");
endLabel.textContent = "End Date/Time:";
endLabel.setAttribute("style", "width: 90%; font-family: 'Roboto Slab', serif; font-size: 16px; color: black; margin-top: 5px;");

const eventEndDateTimeInput = document.createElement("input");
eventEndDateTimeInput.type = "datetime-local";
eventEndDateTimeInput.setAttribute("style", "width: 90%; padding: 8px; margin: 5px 0; border: 1px solid rgb(242,205,0); border-radius: 5px; font-family: 'Roboto Slab', serif; font-size: 16px; color: black; box-sizing: border-box;");
eventEndDateTimeDiv.appendChild(endLabel);
eventEndDateTimeDiv.appendChild(eventEndDateTimeInput);
registerContent.appendChild(eventEndDateTimeDiv);

// Event Description Input (Textarea)
const eventDescriptionDiv = document.createElement("div");
eventDescriptionDiv.setAttribute("style", "flex-direction: column; align-items: center; gap: 0px 0px; margin: 5px 0px;");
eventDescriptionDiv.setAttribute("class", "event_input");
eventDescriptionDiv.setAttribute("id", "description");

const eventDescriptionInput = document.createElement("textarea");
eventDescriptionInput.placeholder = "Description";
eventDescriptionInput.setAttribute("style", "width: 90%; padding: 8px; margin: 5px 0; border: 1px solid rgb(242,205,0); border-radius: 5px; font-family: 'Roboto Slab', serif; font-size: 16px; color: black; resize: vertical; box-sizing: border-box;");

// New Event Link Input
const eventLinkDiv = document.createElement("div");
eventLinkDiv.setAttribute("style", "flex-direction: column; align-items: center; gap: 0px 0px; margin: 5px 0px;");
eventLinkDiv.setAttribute("class", "event_input");
eventLinkDiv.setAttribute("id", "link");

const eventLinkInput = document.createElement("input");
eventLinkInput.placeholder = "Event Link (Optional)";
eventLinkInput.setAttribute("style", "width: 90%; padding: 8px; margin: 5px 0; border: 1px solid rgb(242,205,0); border-radius: 5px; font-family: 'Roboto Slab', serif; font-size: 16px; color: black; box-sizing: border-box;");
eventLinkDiv.appendChild(eventLinkInput);
registerContent.appendChild(eventLinkDiv);

// Append Description Input after Link
eventDescriptionDiv.appendChild(eventDescriptionInput);
registerContent.appendChild(eventDescriptionDiv);

// Create Event Button (with green background)
const createEventButton = document.createElement("button");
createEventButton.textContent = "Create Event";
createEventButton.setAttribute(
  "style",
  "width: 90%; padding: 10px; margin: 10px 0; background-color: rgb(39,93,56); border: none; border-radius: 25px; cursor: pointer; font-family: 'Roboto Slab', serif; font-weight: 600; font-size: 20px; color: white;"
);
registerContent.appendChild(createEventButton);

// ------------------------------
// 7.1. Create Event Functionality (Classification by Start/End Time)
// ------------------------------

// Toggle the registration subtab when the header is clicked with animation
function toggleRegisterBar() {
  if (registerContent.style.maxHeight === "0px" || registerContent.style.maxHeight === "") {
    registerContent.style.maxHeight = "500px"; // Expand (adjust as needed)
    registerHeader.querySelector(".arrow").textContent = "▲";
  } else {
    registerContent.style.maxHeight = "0px"; // Collapse
    registerHeader.querySelector(".arrow").textContent = "▼";
  }

  if (markerOpacity == 0)
  {
    markerOpacity = 1;
    marker.setOpacity(markerOpacity);
  }
  else
  {
    markerOpacity = 0;
    marker.setOpacity(markerOpacity);
  }
}

registerHeader.addEventListener("click", function() {toggleRegisterBar();});

function updateEventContents() {
  // Check the error codes and make them accordingly
  for (let i = 0; i < registerContent.children.length; ++i) {
    let i_child = registerContent.children[i];
    if (i_child.tagName.toLowerCase() != "div") continue;
    console.log("i-" + i + ": " + i_child.classList);
    if (i_child.classList.contains("error")) {
      // check if they have an error code
      let error_code = false;
      for (let j = 0; j < i_child.children.length; ++j) {
        error_code |= i_child.children[j].classList.contains("error_message");
      }
      if (error_code) continue;

      const errorCode = document.createElement("p");
      errorCode.setAttribute(
        "style",
        "color: rgb(255, 0, 0); margin: 0px 0px; font-size: 14px; text-align: right; padding-right: 20px;"
      );
      errorCode.innerHTML = "Invalid Input / Required Field";
      errorCode.setAttribute("class", "error_message");
      i_child.appendChild(errorCode);
    } else {
      for (let j = i_child.children.length - 1; j >= 0; --j) {
        if (i_child.children[j].classList.contains("error_message")) i_child.children[j].remove();
      }
    }
  }
}

function cleanEventRegister() {
  // Reset the register
  for (let i = 0; i < registerContent.children.length; ++i) {
    let i_child = registerContent.children[i];
    for (let j = i_child.children.length - 1; j >= 0; --j) {
      if (i_child.children[j].classList.contains("error_message")) i_child.children[j].remove();
      else if (i_child.children[j].value != undefined) i_child.children[j].value = "";
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
  "width: 100%; height: 100px; margin-bottom: 10px; background-color: rgb(39,93,56); box-shadow: 0px 3px 3px rgb(133,133,133); color: rgb(242,205,0); font-weight: 600; font-size: 60px; font-family: 'Roboto Slab', serif; display: flex; align-items: center; justify-content: center; margin-top: 0px; text-align: center;"
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
