import Store from "./store.js";
import View from "./view.js"
const players = [
    {
        id: 1,
        name: "Player 1",
        iconClass: "fa-x",
        colorClass: "yellow",
    },
    {
        id: 2,
        name: "Player 2",
        iconClass: "fa-o",
        colorClass: "turquoise",
    }
];

function init() {
    const view = new View();
    const store = new Store(players);


    view.bindGameResetEvent(event => {
        view.closeAll();
        store.reset();

        view.clearMoves();
        view.setTurnIndicator(store.game.currentPlayer);
        view.updateScoreBoar(store.stats.playerWithStats[0].wins, store.stats.playerWithStats[1].wins, store.stats.ties)
    });

    view.bindNewRoundEvent(event => {
        store.newRound();
        view.closeAll();
        view.clearMoves();
        view.setTurnIndicator(store.game.currentPlayer);
        view.updateScoreBoar(store.stats.playerWithStats[0].wins, store.stats.playerWithStats[1].wins, store.stats.ties)
    });

    view.bindPlayerMoveEvent((square) => {
        const existingMove = store.game.moves.find(move => move.squareId === +square.id);
        if (existingMove) {
            return;
        }

        view.handlePlayerMove(square, store.game.currentPlayer);

        store.playerMove(+square.id);
        if (store.game.status.isComplete) {

            view.openModal(store.game.status.winner ? `${store.game.status.winner.name} wins` : 'Tie');
        }

        view.setTurnIndicator(store.game.currentPlayer);


    });
}
window.addEventListener("load", init()); 