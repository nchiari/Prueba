document.addEventListener('DOMContentLoaded', () => {
    const game = document.querySelector('.memory-game');
    const cardImages = ['emoji1', 'emoji2', 'emoji3', 'emoji4', 'emoji5', 'emoji6']; // Usa nombres de imágenes reales o emojis
    let cardsChosen = [];
    let cardsChosenIds = [];

    function createBoard() {
        [...cardImages, ...cardImages].sort(() => 0.5 - Math.random()).forEach((name, index) => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.setAttribute('data-id', index);
            card.innerHTML = `
                <div class="front-face"></div>
                <div class="back-face">${name}</div>`;

            card.addEventListener('click', flipCard);
            game.appendChild(card);
        });
    }

    function flipCard() {
        let clickedCard = this;
        let clickedId = clickedCard.getAttribute('data-id');
        cardsChosen.push(cardImages[Math.floor(clickedId / 2)]);
        cardsChosenIds.push(clickedId);
        clickedCard.classList.add('flip');

        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('.memory-card');
        const firstCard = cardsChosenIds[0];
        const secondCard = cardsChosenIds[1];

        if (cardsChosen[0] === cardsChosen[1] && firstCard !== secondCard) {
            alert('¡Encontraste un par!');
            cards[firstCard].removeEventListener('click', flipCard);
            cards[secondCard].removeEventListener('click', flipCard);
        } else {
            cards[firstCard].classList.remove('flip');
            cards[secondCard].classList.remove('flip');
        }
        cardsChosen = [];
        cardsChosenIds = [];
    }

    createBoard();
});
