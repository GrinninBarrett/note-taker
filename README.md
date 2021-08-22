
# ✏️ Note Taker

This web application uses Express.js to allow users to take notes and save them to a database (JSON file in this case). Users will be able to retrieve previously saved notes by clicking their title in the menu.

---

## Link to Deployed Application:
[Note Taker](https://arcane-reaches-81145.herokuapp.com/)

## Table of Contents
* [Technologies](#technologies)
* [Functionality](#functionality)
* [Challenges](#challenges)
* [Future Development](#future-development)
* [Contact](#contact)
* [License](#license)


## Technologies
* JavaScript
* Node.js
* Express.js
* Heroku


## Functionality
<!-- TODO: Update this with screenshots/GIFs of completed appliction -->
<!-- [App Demonstration Video](https://youtu.be/9G_QRztzwVc) -->

<!-- #### App Initialization
- Be sure to first run <code>npm i</code> after cloning this repo or copying its code into your own files.

![App Initialization](./assets/images/initialization.gif)
 -->

## Challenges
- Of course, one of the big challenges here was to set up the routes correctly. Specifically, I first had some confusion as to whether I should use `/notes` or `/api/notes` for the requests. It turned out that using `/notes` worked for accessing the notes.html file, while `/api/notes` worked for actually dealing with the data.


## Future Development
- It would be nice to eventually add the ability for a user to edit a previously saved note, which would probably be done using a `put` request.


## Contact
Email me any time with questions, comments, or cat/dog photos! - ctbarrett.tech@gmail.com


## License
&copy; 2021 Charles Tucker Barrett

[MIT License](https://opensource.org/licenses/MIT)