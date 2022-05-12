//Global variables

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
