//Global variables

//UTILITY FUNCTIONS

//extract info from local storage (get)
const getFromLocalStorage = (data) => {
  // get from LS using key name
  const dataFromLS = localStorage.getItem(key);

  // parse data from LS
  const parsedData = JSON.parse(dataFromLS);

  if (parsedData) {
    return parsedData;
  } else {
    return defaultValue;
  }
};

//write info into local storage (set)
const writeToLocalStorage = (key, data) => {
  // convert value to string
  const stringifiedValue = JSON.stringify(value);

  // set stringified value to LS for key name
  localStorage.setItem(key, stringifiedValue);
};

//empty local storage (clear)
const clearLS = () => {
  localStorage.clear();
};

//empty the designated div/container - target by ID
const emptyContainer = (containerId) => {
  //check if exist
  if (containerId) {
    //empty the content of the container, but keeps the container
    $(`#${containerId}`).empty();
    //remove the click event from the container
    $(`#${containerId}`).off("click");
  }
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
