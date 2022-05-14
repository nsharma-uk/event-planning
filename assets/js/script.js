//Global variables

const burgerIcon = $("#burger");
const navbarMenu = $("#nav-links");

const musicContainer = $("#music-card-container");
const foodContainer = $("#food-card-container");

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
//may be reworked later
const removeContainer = (containerId) => {
  if (containerId) {
    //remove the container itself and all its content
    $(`#${containerId}`).remove();
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
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    throw new Error(error.message);
  }
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
      const playlistCard = `<div class="card music-card">
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
          <button class="button is-ghost card-footer-item">
            <i class="fa-solid fa-plus"></i>
          </button>
          <a
            href=${linkUrl}
            class="card-footer-item"
            ><i class="fa-brands fa-spotify"></i></a>
        </footer>
      </div>`;

      return playlistCard;
    };

    const allCards = items.map(createCard).join("");

    musicContainer.empty();

    musicContainer.append(allCards);
  } else {
    // render error
    renderError("No results found.");
  }
};

//render food cards
const renderFoodCards = (items) => {
  if (items.length) {
    const createCard = (item) => {
      const recipeTitle = item.recipe.label;
      const source = item.recipe.source;
      const recipeImage = item.recipe.image;
      const linkUrl = item.recipe.url;
      //rendering with template string - TEMPORARY Template string
      const foodCard = `<div class="card food-card">
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
          <button class="button is-ghost card-footer-item">
            <i class="fa-solid fa-plus"></i>
          </button>
          <a
            href=${linkUrl}
            class="card-footer-item"
            ><i class="fa-solid fa-earth-americas"></i></a>
        </footer>
      </div>`;

      return foodCard;
    };

    const allCards = items.map(createCard).join("");

    foodContainer.empty();

    foodContainer.append(allCards);
  } else {
    // render error
    renderError("No results found.");
  }
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
    renderError("Sorry something went wrong and we are working on fixing it.");
  }
};

//Handling form submit in music-container section - Edamam api call
const handleFoodSubmit = async (event) => {
  try {
    event.preventDefault();

    // get form values for api
    const searchQuery = searchInput.val();

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
    renderError("Sorry something went wrong and we are working on fixing it.");
  }
};
const renderFoodSection = (eventName) => {
  removeContainer("event-details-section");
  $("#main").append(` <section class="section" id="food-section">
      
  <div class="container has-text-centered" id="food-container">
    <form class="form" id="food-selection">
      <p class="food-text-div">Please select your desired food for the event ${eventName}</p>
      
      <div class="food-select" id="food-select">
        <select name="food-type" id="food-type">
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
      </div>
      <div>
        <button class="button" type="submit" id="food-submit-btn">
          Submit
        </button>
      </div>
      <div>
        <button
          class="button is-rounded is-medium my-5"
          type="submit"
          id="surprise-me"
        >
          Surprise me!
        </button>
      </div>
    </form>

    <div class="card-container" id="food-card-container"></div></section>`);
  $("#food-selection").click(handleFoodSubmit);
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
  <!--  event-details-div  starts here-->
  <div class="container has-text-centered" id="event-details-container">
    <h2 id="event-details-message" class="title event-details-message">
      Enter details of your event
    </h2>
    <form class="event-details-form" id="event-details-form">
      <!-- Event name div -->
      <div>
        <label class="input-label" for="input">Event name</label>
        <input
          type="text"
          class="event-name-input"
          id="event-name-input"
          name="event-name"
          placeholder="Give your event a name"
        />
      </div>
      <div>
        <!--Event organizer name div -->
        <div class="input-container">
          <label class="input-label" for="event-organiser"
            >Event organiser</label
          >
          <input type="text" class="event-input" id="event-organiser" />
        </div>
        <!--Event email div -->
        <div class="input-container">
          <label class="input-label" for="organiser-mail"
            >Event organiser's email</label
          >
          <input type="text" class="event-input" id="organiser-mail" />
        </div>
        <!--Event location div -->
        <div class="input-container">
          <label class="input-label" for="event-location"
            >Event location</label
          >
          <input type="text" class="event-input" id="event-location" />
        </div>
        <!--Event date div -->
        <div class="input-container">
          <label class="input-label" for="event-date">Event date</label>
          <input type="date" class="event-input" id="event-date" />
        </div>
        <!--Event description div  starts here-->
        <div class="input-container">
          <label class="input-label" for="event-description"
            >Detailed description of my event</label
          >
          <textarea
            id="event-description"
            class="description"
            placeholder="Add description"
          ></textarea>
        </div>
        <!--button div -->
        <div class="form-button-div">
          <button
            class="button is-rounded is-small my-5"
            type="submit"
            id="event-details-btn"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  </div>
  <!-- End of event-details-div -->
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
