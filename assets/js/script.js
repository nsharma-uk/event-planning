//Global variables

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
