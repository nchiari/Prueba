document.addEventListener('DOMContentLoaded', () => {
    const game = document.querySelector('.memory-game');
    const cardIcons = ['⬛', '⬜', '🔺', '🔷', '⭐', '🔶']; // Emojis como iconos
    let cardsChosen = [];
    let cardsChosenIds = [];

    function createBoard() {
        [...cardIcons, ...cardIcons].sort(() => 0.5 - Math.random()).forEach((icon, index) => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.setAttribute('data-id', index);
            card.innerHTML = `
                <div class="front-face"></div>
                <div class="back-face">${icon}</div>`;
            card.addEventListener('click', flipCard);
            game.appendChild(card);
        });
    }

    function flipCard() {
        let clickedCard = this;
        let clickedId = clickedCard.getAttribute('data-id');
        cardsChosen.push(cardIcons[Math.floor(clickedId / 2)]);
        cardsChosenIds.push(clickedId);
        clickedCard.classList.add('flip');

        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('.memory-card');
        const firstCard = cardsChosenIds[0];
