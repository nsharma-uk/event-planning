//Global variables

//UTILITY FUNCTIONS

//extract info from local storage (get)
const getFromLS = (data) => {
  return JSON.parse(localStorage.getItem(data));
};

//write info into local storage (set)
const writeToLS = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

//empty local storage (clear)
const clearLS = () => {
  localStorage.clear();
};

//empty the designated div/container - target by ID
const emptyContainer = (containerId) => {
  //empty the content of the container, but keeps the container
  $(`#${containerId}`).empty();
  //remove the click event from the container
  $(`#${containerId}`).off("click");
};

//removes the designated container - target by ID
const removeContainer = (containerId) => {
  //remove the container itself and all its content
  $(`#${containerId}`).remove();
};

//END UTILITY FUNCTIONS
