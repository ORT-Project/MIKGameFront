export const GameLogic = {
    startGame: () => {
        // On ajuste la taille de la grille à une taille plus appropriée
        const gridSize = 20;  // 20x20 pour correspondre à la taille de l'aire de jeu de 400x400 pixels
        const initialSnake = [
            { x: Math.floor(gridSize / 2), y: Math.floor(gridSize / 2) }, // Commence au centre de la grille
        ];
        const initialFood = {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize)
        };

        return { initialSnake, initialFood, gridSize };
    },

    updateGame: (snake: any, food: { x: any; y: any; }, direction: any, gridSize: number) => {
        const newSnake = [...snake];
        const head = { ...newSnake[0] };

        // Déplace le serpent en fonction de la direction
        switch (direction) {
            case 'UP':
                head.y -= 1;
                break;
            case 'DOWN':
                head.y += 1;
                break;
            case 'LEFT':
                head.x -= 1;
                break;
            case 'RIGHT':
                head.x += 1;
                break;
        }

        newSnake.unshift(head);

        // Vérifie si le serpent mange la nourriture
        if (head.x === food.x && head.y === food.y) {
            const newFood = {
                x: Math.floor(Math.random() * gridSize),
                y: Math.floor(Math.random() * gridSize)
            };
            return { newSnake, newFood, gameOver: false };
        } else {
            newSnake.pop();  // Retirer la dernière partie du serpent si aucun aliment n'est mangé
        }

        // Vérifie les conditions de Game Over
        const gameOver = head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize || newSnake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);

        return { newSnake, newFood: food, gameOver };
    }
};
