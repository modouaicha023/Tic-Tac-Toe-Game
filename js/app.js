const App = {
    $: {
        menu: document.querySelector("[data-id='menu']"),
        menuItems: document.querySelector("[data-id='menu-items']"),
        resetBtn: document.querySelector("[data-id='reset-btn']"),
        newRoundBtn: document.querySelector("[data-id='new-round-btn']"),
        squares: document.querySelectorAll("[data-id='square']"),
        modal: document.querySelector("[data-id='modal']"),
        modalText: document.querySelector("[data-id='modal-text']"),
        modalBtn: document.querySelector("[data-id='modal-btn']"),
        turn: document.querySelector("[data-id='turn']"),
    },
    state: {
        moves: [],
    },
    getGamesStatus(moves) {
        const p1Moves = moves.filter(move => move.playerId === 1).map(move => +move.squareId);
        const p2Moves = moves.filter(move => move.playerId === 2).map(move => +move.squareId);

        const winningPatterns = [
            [1, 2, 3],
            [1, 5, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 5, 7],
            [3, 6, 9],
            [4, 5, 6],
            [7, 8, 9],
        ];

        let winner = null;

        winningPatterns.forEach((pattern) => {
            const p1Wins = pattern.every((v) => p1Moves.includes(v));
            const p2Wins = pattern.every((v) => p2Moves.includes(v));

            if (p1Wins) winner = 1
            if (p2Wins) winner = 2
        });

        return {
            status: moves.length === 9 || winner != null ? 'complete' : 'in-progress',
            winner,
        };
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

        App.$.modalBtn.addEventListener('click', event => {
            App.state.moves = [];
            App.$.squares.forEach((square) => { square.replaceChildren() })
            App.$.modal.classList.add('hidden');
        })

        App.$.squares.forEach(square => {
            square.addEventListener('click', event => {
                const hasMove = (squareId) => {
                    const existingMove = App.state.moves.find(
                        (move => move.squareId === squareId)
                    );
                    return existingMove !== undefined;
                };
                if (hasMove(+square.id)) {
                    return
                }
                const lastMove = App.state.moves.at(-1);
                const getOppositePlayer = (playerId) => playerId === 1 ? 2 : 1;
                const currentPlayer = App.state.moves.length === 0 ? 1 : getOppositePlayer(lastMove.playerId);
                const nextPlayer = getOppositePlayer(currentPlayer);

                const squareIcon = document.createElement("i");
                const turnIcon = document.createElement("i");
                const turnLabel = document.createElement('p');
                turnLabel.innerText = `Player ${nextPlayer}, you are up`;

                if (currentPlayer === 1) {
                    squareIcon.classList.add('fa-solid', 'fa-x', 'yellow');
                    turnIcon.classList.add('fa-solid', 'fa-o', 'turquoise');
                    turnLabel.classList = "turquoise";

                }
                else {
                    squareIcon.classList.add('fa-solid', 'fa-o', 'turquoise');
                    turnIcon.classList.add('fa-solid', 'fa-x', 'yellow');
                    turnLabel.classList = "yellow";

                }
                App.$.turn.replaceChildren(turnIcon, turnLabel);

                App.state.moves.push({
                    squareId: +square.id,
                    playerId: currentPlayer
                });
                App.state.currentPlayer = currentPlayer === 1 ? 2 : 1;
                square.replaceChildren(squareIcon);

                const games = App.getGamesStatus(App.state.moves);

                if (games.status === 'complete') {
                    App.$.modal.classList.remove('hidden');
                    let message = "";
                    if (games.winner) {
                        message = `Player ${games.winner} Wins`;

                    }
                    else {
                        message = "Tie!";
                    }
                    App.$.modalText.textContent = message;
                }


            });
        });
    },

};
// this App is an object with a property called init which is a function to permit to execute the code inside the function, the utility is to avoid to execute the code inside the function when the page is loaded
// window.addEventListener("load", App.init); //this instruction is to execute the function init when the page is loaded

import View from "./view.js"

function init() {
    const view = new View();
    view.bindGameResetEvent(event => {
        console.log(' Reset event');
        console.log(event);
    });
    view.bindNewRoundEvent(event => {
        console.log('New  Round event');
        console.log(event);
    });
    view.bindPlayerMoveEvent(event => {
        console.log(' Player Move event');
        console.log(event);
    });
 }
window.addEventListener("load", init()); 