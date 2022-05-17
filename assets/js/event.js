//Global variables

const burgerIcon = $("#burger");
const navbarMenu = $("#nav-links");

const apiKey = "a447661e09msh17b913e41ecacfdp129f05jsn6e2975fac8c4";

const spotifyBaseUrl = "https://spotify23.p.rapidapi.com/search/";

const edamamBaseUrl = "https://edamam-recipe-search.p.rapidapi.com/search";

const surpriseMe = [
  "surprise",
  "cookie",
  "chocolate",
  "dessert",
  "spicy",
  "cake",
  "tapas",
  "sweet",
  "salty",
  "chilli",
  "bites",
  "burger",
  "buns",
  "bread",
  "grill",
  "cupcake",
];

let currentEventName = "";

//UTILITY FUNCTIONS

//extract info from local storage (get)
const getFromLocalStorage = (key, defaultValue) => {
  const parsedData = JSON.parse(localStorage.getItem(key));
  return parsedData ? parsedData : defaultValue;
};

//write info into local storage (set)
const writeToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

//empty local storage (clear)
const clearLS = () => {
  localStorage.clear();
};

//removes the designated container - target by ID
const removeContainer = (containerId) => {
  if (containerId) {
    //remove the container itself and all its content
    $(`#${containerId}`).remove();
  }
};

//empty the designated container - target by ID
const emptyContainer = (containerId) => {
  if (containerId) {
    //remove the container itself and all its content
    $(`#${containerId}`).empty();
    $(`#${containerId}`).off();
  }
};

//END UTILITY FUNCTIONS

//Functions

const renderError = (message, containerId) => {
  // create component
  const errorComponent = `<div class="notification is-danger is-light">
      <i class="fa-solid fa-triangle-exclamation"></i> ${message}
    </div>`;

  // append component to musicContainer
  containerId.append(errorComponent);
};

const handleEditClick = (event) => {
  event.stopPropagation();
  const target = $(event.target);

  if (target.is("button")) {
  }
};

//render food cards
const renderSavedEvents = (items) => {
  if (items.length) {
    debugger;
    const createCard = (item, i) => {
      const eventName = item.eventName;
      const eventDate = item.eventDate;
      const eventLocation = item.eventLocation;

      const eventFood = item.food;
      const eventFoodList = [];
      if (!eventFood) {
        eventFoodList.push("No food selected yet");
      } else {
        for (let i of eventFood) {
          eventFoodList.push(i.targetName);
        }
      }

      console.log(eventFoodList);

      const eventMusic = item.music;
      const eventMusicList = [];
      if (!eventMusic) {
        eventMusicList.push("No music selected yet");
      } else {
        for (let i of eventFood) {
          eventMusicList.push(i.targetName);
        }
      }
      console.log(eventMusicList);

      //rendering with template string - TEMPORARY Template string
      const eventCard = `<div class="event-card card" id="${eventName}">
      <h2
        class="title is-4 card-header-title has-text-centered"
        id="event-card-name"
      >
        ${eventName}
      </h2>
      <div class="event-details card my-5">
        <ul class="card-content m-0">
          <li class="event-list-item" id="event-date-1">${eventDate}</li>
          <li class="event-list-item" id="event-location-1">
            ${eventLocation}
          </li>
          <li class="event-list-item" id="event-food">Selected food: ${eventFoodList}</li>
          <li class="event-list-item" id="event-music">Selected playlists: ${eventMusicList}</li>
        </ul>
        <button class="button is-rounded is-small my-2 event-card-btn" id="event-card-btn"
        type="button"
          data-value="${eventName}" data-action="edit">
          Edit Food & Music</i>
        </button>
      </div>
    </div>`;

      return eventCard;
    };

    const allCards = items.map(createCard).join("");

    const savedEventsContainer = $("#saved-events-container");
    emptyContainer("saved-events-container");
    savedEventsContainer.append(allCards);
    savedEventsContainer.click(handleEditClick);
  } else {
    // render error
    renderError("No results found.", savedEventsContainer);
  }
};

//renderSavedCards function:
// 1 - for each event in the array, map out the required information to render a card and create dynamic string
// 2 - join them all as a string and append to the main container
const getSavedEvents = () => {
  return getFromLocalStorage("myEvents", []);
};

// On load
const onReady = () => {
  //event listener for mobile burger bar menu for html pages -Youtube NetNinja Bulma
  burgerIcon.click(() => {
    navbarMenu.toggleClass("is-active");
  });

  //pull my events from local storage using key name "myEvents"
  const savedEvents = getSavedEvents();
  console.log(savedEvents);

  //call renderSavedEvents function
  renderSavedEvents(savedEvents);

  //add event listener on the section to be able to select the cards
  $("#saved-events-container").click(renderEventCard);
};

$(document).ready(onReady);
