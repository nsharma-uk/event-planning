# Event-planning website

## Summary of the project

Event Card creator - this project takes you through steps to create your event card. The user goes through a form where they can enter the event details, a food selection and a music selection, and all their information is then rendered on an event card template that they can print.
The created events are saved in local storage and the user can consult and edit them by going on the "My Saved Events" page.

## Team members

[Smeea Arshad](https://github.com/smeea-2018)

[Gurmanpreet Nagra](https://github.com/Mkn01)

[Amelie Pira](https://github.com/Am0031)

[Abu Saddique](https://github.com/abusaddique95)

[Aisha Saleh](https://github.com/Saleha22)

[Nayan Sharma](https://github.com/nsharma-uk)

## Links to the project

Deployed URL: [https://am0031.github.io/event-planning/](https://am0031.github.io/event-planning/)

Github repository: [https://github.com/Am0031/event-planning](https://github.com/Am0031/event-planning)

## User Story

```
AS A user
I WANT to create an event card by gathering the details of the event, creating a menu and a music playlist and see my bespoke event card
SO THAT I can print it to share/email it with my guest list.
```

## Detailed User Journey

```
GIVEN I am a user who wants to create an event card
WHEN I land on the webpage
THEN I see a start page with a start button

WHEN I click on the start button
THEN I am presented with a form where I can enter my event details

WHEN I click on the form's save button
THEN my details are saved and I am presented with the page for food selection

WHEN I click on the food submit button
THEN I am presented with a variety of recipes matching my chosen criteria

WHEN I click on a recipe
THEN I can see it being added to my selection list

WHEN I click on Save and Continue
THEN my food selection is saved and I am presented with the page for music selection

WHEN I click on the music submit button
THEN I am presented with a variety of playlists matching my chosen criteria

WHEN I click on a playlist
THEN I can see it being added to my selection list

WHEN I click on Save and Continue
THEN my music selection is saved and I am presented with the bespoke event card

WHEN I click on the print button
THEN I can print my bespoke event card

WHEN I click on the button "Go to my saved events"
THEN I am taken to the "My saved events" page where I can see cards of my saved events

WHEN I click on "My saved events" link in the menu
THEN I am taken to the "My saved events" page where I can see cards of my saved events

WHEN I click on the button "Delete"
THEN I am presented with a confirm message to make sure I actually want to delete this event (if answered yes, the event is deleted from the saved events)

WHEN I click on the button "See full event card"
THEN I am presented with the bespoke event card

WHEN I click on the button "Edit Food/Music"
THEN I am presented with the page for food selection, and then music selection

WHEN I complete the editing
THEN I am presented with the bespoke card again, which I can print, edit again or go to my saved events page
```

## Technologies

- Core files: HTML, CSS and Javascript
- Libraries: jQuery, Bulma, Google fonts, FontAwesome, Ionicon, Moment.js, UUID
- API: Edamam, Spotify

## Wireframes

<details>
<summary>Wireframe - Start page </summary>

![Desktop - Start page](./assets/images/wireframe-start-page.png)

</details>

<details>
<summary>Wireframe - Form page </summary>

![Desktop - Start page](./assets/images/wireframe-form-page.png)

</details>

<details>
<summary>Wireframe - Food/Selection page </summary>

![Desktop - Start page](./assets/images/wireframe-selection-page.png)

</details>

<details>
<summary>Wireframe - Event Card page </summary>

![Desktop - Start page](./assets/images/wireframe-event-card-page.png)

</details>

<details>
<summary>Wireframe - Saved Events page </summary>

![Desktop - Start page](./assets/images/wireframe-saved-events-page.png)

</details>

## Screenshots of the project

Desktop viewport:

<details>
<summary>Desktop - Start page </summary>

![Desktop - Start page](./assets/images/desktop-start-page.png)

</details>

<details>
<summary>Desktop - Event details form </summary>

![Desktop - Event details form](./assets/images/desktop-event-details-form.png)

</details>

<details>
<summary>Desktop - Food selection - Empty page before first search </summary>

![Desktop - Food selection - Empty page before first search](./assets/images/desktop-food-selection-empty.png)

</details>

<details>
<summary>Desktop - Food selection - Search and Selection ongoing </summary>

![Desktop - Food selection - Search and Selection ongoing](./assets/images/desktop-food-selection-ongoing.png)

</details>

<details>
<summary>Desktop - Music selection - Empty page before first search </summary>

![Desktop - Music selection - Empty page before first search](./assets/images/desktop-music-selection-empty.png)

</details>

<details>
<summary>Desktop - Music selection - Search and Selection ongoing </summary>

![Desktop - Music selection - Search and Selection ongoing](./assets/images/desktop-music-selection-ongoing.png)

</details>

<details>
<summary>Desktop - Event card </summary>

![Desktop - Event card - Full page](./assets/images/desktop-event-card-full-view.png)

</details>

<details>
<summary>Desktop - Saved events page </summary>

![Desktop - Saved Events page](./assets/images/desktop-saved-events-page.png)

</details>

Mobile viewport:

<details>
<summary>Mobile - Start page </summary>

![Mobile - Start page](./assets/images/mobile-start-page.png)

</details>

<details>
<summary>Mobile - Event details form </summary>

![Mobile - Event details form](./assets/images/mobile-event-details-form.png)

</details>

<details>
<summary>Mobile - Food/Music selection </summary>

![Mobile - Food selection - Search and Selection ongoing](./assets/images/mobile-food-selection-ongoing.png)

</details>

<details>
<summary>Mobile - Event card </summary>

![Mobile - Event card - Full page](./assets/images/mobile-event-card.png)

</details>

<details>
<summary>Mobile - Saved events page </summary>

![Mobile - Saved Events page](./assets/images/mobile-saved-events-page.png)

</details>

<details>
<summary>Mobile - Burger menu open </summary>

![Mobile - Burger menu open](./assets/images/mobile-burger-open.png)

</details>

## Logic of the pages - Block diagram

![Block diagram](./assets/images/block-diagram-event-planning.jpg)

## Future developments

Future improvement:

- refactore for cleaner code
- trigger search on select change and remove submit button
- up the limit of items received from API
- add more editing options for the user
