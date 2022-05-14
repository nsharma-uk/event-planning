//Global variables

const burgerIcon = $("#burger");
const navbarMenu = $("#nav-links");

const apiKey = "a447661e09msh17b913e41ecacfdp129f05jsn6e2975fac8c4";

let chosenItems = [];

//Spotify API info
const spotifyOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    "X-RapidAPI-Key": "a447661e09msh17b913e41ecacfdp129f05jsn6e2975fac8c4",
  },
};
const spotifyBaseUrl = "https://spotify23.p.rapidapi.com/search/";

//Edamam API Info
const edamamOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "edamam-recipe-search.p.rapidapi.com",
    "X-RapidAPI-Key": "a447661e09msh17b913e41ecacfdp129f05jsn6e2975fac8c4",
  },
};
const edamamBaseUrl = "https://edamam-recipe-search.p.rapidapi.com/search";

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

//Constructing the URL for an API call
const constructUrl = (baseUrl, params) => {
  const queryParams = new URLSearchParams(params).toString();

  return queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
};

//Fetching the data from an API
const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const renderError = (message, containerId) => {
  // create component
  const errorComponent = `<div class="notification is-danger is-light">
    <i class="fa-solid fa-triangle-exclamation"></i> ${message}
  </div>`;

  // append component to musicContainer
  containerId.append(errorComponent);
};

const handleItemSelection = (event) => {
  event.stopPropagation();
  const targetName = $(event.target).attr("data-value");

  const targetPic = $(event.target).attr("data-pic");

  const chosenItem = {
    targetName,
    targetPic,
  };

  if (chosenItems.length < 3) {
    chosenItems.push(chosenItem);
  } else {
    chosenItems.slice(1);
    chosenItems.push(chosenItem);
  }
  //re-render the selection list in the aside div
};

//render music cards
const renderMusicCards = (items) => {
  if (items.length) {
    const createCard = (item) => {
      const playlistTitle = item.data.name;
      const ownerName = item.data.owner.name;
      const playlistCover = item.data.images.items[0].sources[0].url;
      const linkUrl = item.data.uri;
      //rendering with template string - TEMPORARY Template string
      const playlistCard = `<div class="card api-card" id="music-card-${item.index}">
      <div class="card-image">
        <figure class="image is-4by3">
          <img
            src=${playlistCover}
            alt="album cover image"
          />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">${playlistTitle}</p>
            <p class="subtitle is-6">${ownerName}</p>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <button
          class="button is-ghost card-footer-item"
          type="button"
          data-value="${playlistTitle}"
          data-pic="${playlistCover}"
        >
          <i class="fa-solid fa-plus"></i>
        </button>
        <a
          href=${linkUrl}
          class="card-footer-item"
          ><i class="fa-brands fa-spotify"></i
        ></a>
      </footer>
    </div>`;

      return playlistCard;
    };

    const allCards = items.map(createCard).join("");

    const musicContainer = $("#music-card-container");
    emptyContainer("music-card-container");
    musicContainer.append(allCards);
    musicContainer.click(handleItemSelection);
  } else {
    // render error
    renderError("No results found.", musicContainer);
  }
};

//render food cards
const renderFoodCards = (items) => {
  if (items.length) {
    const createCard = (item, i) => {
      const recipeTitle = item.recipe.label;
      const source = item.recipe.source;
      const recipeImage = item.recipe.image;
      const linkUrl = item.recipe.url;
      //rendering with template string - TEMPORARY Template string
      const foodCard = `<div class="card api-card" id="food-card-${i}">
      <div class="card-image">
        <figure class="image is-4by3">
          <img
            src=${recipeImage}
            alt="recipe cover image"
          />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">${recipeTitle}</p>
            <p class="subtitle is-6">${source}</p>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <button class="button is-ghost card-footer-item"
        type="button"
          data-value="${recipeTitle}"
          data-pic="${recipeImage}">
          <i class="fa-solid fa-plus"></i>
        </button>
        <a
          href=${linkUrl}
          class="card-footer-item"
          ><i class="fa-solid fa-earth-americas"></i
        ></a>
      </footer>
    </div>`;

      return foodCard;
    };

    const allCards = items.map(createCard).join("");

    const foodContainer = $("#food-card-container");
    emptyContainer("food-card-container");
    foodContainer.append(allCards);
    foodContainer.click(handleItemSelection);
  } else {
    // render error
    renderError("No results found.", foodContainer);
  }
};

const assignMusicToEvent = (e) => {
  e.stopPropagation();
  const target = $(e.target);
  const currentTarget = $(e.currentTarget);

  const myEvent = $("#event-select").find(":selected").text();

  const myEvents = getFromLocalStorage("myEvents");
  const myEventIndex = myEvents.findIndex((obj) => (obj.eventName = myEvent));

  myEvents[myEventIndex].music = chosenItems;
  writeToLocalStorage("myEvents", myEvents);

  chosenItems = [];
};

const assignFoodToEvent = (e) => {
  e.stopPropagation();
  const target = $(e.target);
  const currentTarget = $(e.currentTarget);

  const myEvent = $("#event-select").find(":selected").text();

  const myEvents = getFromLocalStorage("myEvents");
  const myEventIndex = myEvents.findIndex((obj) => (obj.eventName = myEvent));

  myEvents[myEventIndex].food = chosenItems;
  writeToLocalStorage("myEvents", myEvents);

  chosenItems = [];
};

//Handling form submit in music-container section - Spotify api call
const handleMusicSubmit = async (event) => {
  try {
    event.preventDefault();

    // get form values
    const searchQuery = searchInput.val();
    const searchType = "playlists";

    // validate form
    if (searchQuery) {
      // construct the URL
      const baseUrl = spotifyBaseUrl;

      const url = constructUrl(baseUrl, { q: searchQuery, type: searchType });

      // construct fetch options
      const options = spotifyOptions;

      // fetch data from API
      const data = await fetchData(url, options);

      renderMusicCards(data?.playlists?.items || []);
    } else {
      // target input and set class is-danger
      searchInput.addClass("is-danger");
    }
  } catch (error) {
    renderError(
      "Sorry something went wrong and we are working on fixing it.",
      musicContainer
    );
  }
};

//Handling form submit in music-container section - Edamam api call
const handleFoodSubmit = async (event) => {
  try {
    event.preventDefault();

    // get form values for api
    const searchQuery = $("#food-select")
      .find(":selected")
      .text()
      .toLowerCase();

    // validate form
    if (searchQuery) {
      // construct the URL
      const baseUrl = edamamBaseUrl;

      const url = constructUrl(baseUrl, { q: searchQuery });

      // construct fetch options
      const options = edamamOptions;

      // fetch data from API
      const data = await fetchData(url, options);

      renderFoodCards(data?.hits || []);
    } else {
      // target input and set class is-danger
      searchInput.addClass("is-danger");
    }
  } catch (error) {
    renderError(
      "Sorry something went wrong and we are working on fixing it.",
      foodContainer
    );
  }
};

const renderMusicSection = () => {
  emptyContainer("main");
  $("#main")
    .append(`<section class="section is-flex-direction-row" id="music-section">
  <div class="container has-text-centered" id="music-container">
    <form class="form" id="music-selection">
      <p class="music-text-div">Please select your desired music</p>
      <div
        class="form-field is-flex-direction-row is-align-content-center my-5"
      >
        <input type="text" class="music-input" id="music-type" />

        <button
          class="button is-rounded is-small"
          type="submit"
          id="music-submit-btn"
        >
          Submit
        </button>
      </div>
    </form>
    <div class="card-container" id="music-card-container">
    </div>
  </div>
  <div class="aside music-aside has-text-centered m-3" id="music-aside">
    <div class="aside-list my-5">
      <h4 class="aside-text m-5">Your selected playlists</h4>
      <ul class="selected-items-list" id="selected-items-list">
      </ul>
    </div>
    <div class="aside-event my-5">
      <h4 class="aside-text m-5">Confirm the event</h4>
      <select class="event-select" name="event-select" id="event-select">
      </select>
    </div>
    <div class="aside-btn my-5">
      <button
        class="button is-rounded is-small my-5"
        type="button"
        id="music-save-btn"
        data-theme="music"
      >
        Save to event
      </button>
    </div>
    <div class="event-card-btn my-5">
      <button
        class="button is-rounded is-small my-5"
        type="button"
        id="create-btn"
      >
        Go to Event Card
      </button>
    </div>
  </div>
  </section>`);

  const myEvents = getFromLocalStorage("myEvents");

  myEvents.forEach((e) =>
    $("#event-select").append(`<option>${e.eventName}</option>`)
  );

  chosenItems = [];
  $("#music-aside").click(assignMusicToEvent);
};

const renderFoodSection = () => {
  emptyContainer("main");
  $("#main")
    .append(`<section class="section is-flex-direction-row" id="food-section">
  <div class="container has-text-centered" id="food-container">
    <form class="form" id="food-selection">
      <p class="food-text-div">Please select your desired food</p>

      <div
        class="form-field is-flex-direction-row is-align-content-center my-5"
      >
        <select class="food-select" name="food-type" id="food-select">
          <option value="japanese">Japanese</option>
          <option value="ethiopian">Ethiopian</option>
          <option value="turkish">Turkish</option>
          <option value="mexican">Mexican</option>
          <option value="chinese">Chinese</option>
          <option value="indian">Indian</option>
          <option value="thai">Thai</option>
          <option value="italian">Italian</option>
          <option value="brazilian">Brazilian</option>
          <option value="korean">Korean</option>
          <option value="indian">Indian</option>
        </select>

        <button
          class="form-button button is-rounded is-small"
          type="submit"
          id="food-submit-btn"
        >
          Submit
        </button>
      </div>
    </form>
    <div class="card-container" id="food-card-container"> 
    </div>
  </div>
  <div class="aside food-aside has-text-centered m-3" id="food-aside">
    <div class="aside-list my-5">
      <h4 class="aside-text m-5">Your selected food</h4>
      <ul class="selected-items-list" id="selected-items-list">
      </ul>
    </div>
    <div class="aside-event my-5">
      <h4 class="aside-text m-5">Confirm the event</h4>
      <select class="event-select" name="event-select" id="event-select">
      </select>
    </div>
    <div class="aside-btn my-5">
      <button
        class="button is-rounded is-small my-5"
        type="button"
        id="food-save-btn"
        data-theme="food"
      >
        Save to event
      </button>
    </div>
    <div class="event-card-btn my-5">
      <button
        class="button is-rounded is-small my-5"
        type="button"
        id="create-btn"
      >
        Go to Event Card
      </button>
    </div>
  </div>
  </section>`);
  const myEvents = getFromLocalStorage("myEvents");

  myEvents.forEach((e) =>
    $("#event-select").append(`<option>${e.eventName}</option>`)
  );
  $("#food-selection").submit(handleFoodSubmit);
  chosenItems = [];
  $("#food-aside").click(assignFoodToEvent);
};

const saveEventDetails = (e) => {
  e.preventDefault();
  const eventName = $("#event-name-input").val();
  const eventOrganiser = $("#event-organiser").val();
  const organiserEmail = $("#organiser-email").val();
  const eventLocation = $("#event-location").val();
  const eventDate = $("#event-date").val();
  const eventDescription = $("#event-description").val();
  const eventObj = {
    eventName,
    eventOrganiser,
    organiserEmail,
    eventLocation,
    eventDate,
    eventDescription,
  };

  const arrayFromLs = getFromLocalStorage("myEvents", []);

  const plannedEvent = arrayFromLs.find((s) => s.eventName === eventName);
  if (plannedEvent) {
    alert("This Event already exists!");
  } else {
    arrayFromLs.push(eventObj);
    writeToLocalStorage("myEvents", arrayFromLs);
    renderFoodSection(eventName);
  }
};

const renderForm = () => {
  removeContainer("start-page-section");
  $("#main").append(`<section class="section" id="event-details-section">
  <div class="container is-mobile" id="event-details-container">
    <h2 id="event-details-message" class="title event-details-message">
      Enter details of your event
    </h2>
    <div>
      <form class="event-details-form" id="event-details-form">
        <div class>
          <label class="input-label" for="input"
            >What would you like to call your event?</label
          >
          <input
            type="text"
            class="input is-normal event-name-input mb-5"
            id="event-name-input"
            name="event-name"
            placeholder="Give your event a name"
          />
        </div>
        <!--Event organizer name div -->
        <div>
          <!-- <div class="input-container"> -->
          <label class="input-label" for="event-organiser"
            >Event organiser</label
          >
          <input
            type="text"
            class="input is-normal event-input mb-5"
            id="event-organiser"
          />
        </div>

        <div class="input-container">
          <label class="input-label" for="organiser-mail"
            >Event organiser's email</label
          >
          <input
            type="email"
            class="input is-normal event-input mb-5"
            id="organiser-mail"
          />
        </div>
        <!--Event location div -->
        <div class="my-2 input-container">
          <label class="input-label" for="event-location"
            >Event location</label
          >
          <input
            type="email"
            class="input is-normal event-input mb-5"
            id="organiser-mail"
          />
        </div>
        <!--Event date div -->
        <div class="input-container">
          <label class="input-label" for="event-date">Event date</label>
          <input
            type="date"
            class="input is-normal mb-5"
            id="event-date"
          />
        </div>
        <!--Event description div  starts here-->
        <div class="my-4 input-container">
          <label class="input-label" for="event-description"
            >Detailed description of my event</label
          >
          <textarea
            id="event-description"
            class="input is-normal description"
            placeholder="Add description"
          ></textarea>
        </div>
        <!--button div -->
        <div class="form-button-div has-text-centered m-0">
          <button
            class="button is-rounded is-medium has-text-centered is-primary is-responsive"
            type="submit"
            id="event-details-btn"
          >
            Save
          </button>
        </div>
        <!-- </div> -->
      </form>
    </div>
  </div>
</section>`);
  $("#event-details-btn").click(saveEventDetails);
};

//Handling start page click
const handleStartClick = () => {
  //bring up modal window with event details form
  //submit form in modal
  //save form details in local storage
  //remove start container
  //render food selection container (includes aside div)
  //add click event to food form submit button --> handle button click (submit or surprise) --> handle food submit --> returns rendered cards
  //on click of "add" symbol on the card, recipe name is added to the event's local storage object and the side list is re-rendered with updated local storage info
  //on click of "continue" button, remove food container and render music container
  //add click event to music form button --> handle music submit --> return rendered cards
  //on click of "add" symbol on the card, recipe name is added to the event's local storage object and the side list is re-rendered with updated local storage info
  //on click of "continue" button, remove music container and render event card template
  //on click of "print" button, the print option opens (to look into!!!)
};

// On load
const onReady = () => {
  //event listener for mobile burger bar menu for html pages -Youtube NetNinja Bulma
  burgerIcon.click(() => {
    navbarMenu.toggleClass("is-active");
  });

  //add click event to start button
  $("#start-page-btn").click(renderForm);
};

$(document).ready(onReady);
