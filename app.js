const App = {
    $: {
        menu: document.querySelector("[data-id='menu']"),
        menuItems: document.querySelector("[data-id='menu-items']"),
        resetBtn: document.querySelector("[data-id='reset-btn']"),
        newRoundBtn: document.querySelector("[data-id='new-round-btn']"),
        squares: document.querySelectorAll("[data-id='square']"),

    },

    init() {
        App.registerEventListener();
    },

    registerEventListener() {
        App.$.menu.addEventListener('click', event => {
            App.$.menuItems.classList.toggle('hidden');
        });

        App.$.resetBtn.addEventListener('click', envent => {
            console.log("Reset");
        });
        App.$.newRoundBtn.addEventListener('click', envent => {
            console.log("new");
        });
        App.$.squares.forEach(square => {
            square.addEventListener('click', event => {
                console.log(`Square with id ${event.target.id} was clicked`);
            });
        });
    },

};// this App is an object with a property called init which is a function to permit to execute the code inside the function, the utility is to avoid to execute the code inside the function when the page is loaded
window.addEventListener("load", App.init); //this instruction is to execute the function init when the page is loaded