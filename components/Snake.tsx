import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useJoystick } from '../hooks/useJoystick';
import { GameLogic } from '../games/snake/GameLogic';

type SnakeSegment = {
    x: number;
    y: number;
};

const SnakeGame: React.FC = () => {
    const [gameState, setGameState] = useState('idle');
    const [snake, setSnake] = useState<SnakeSegment[]>([]);
    const [food, setFood] = useState({ x: 0, y: 0 });
    const [direction, setDirection] = useState('RIGHT');
    const joystickDirection = useJoystick();
    const [gridSize, setGridSize] = useState(0);  // Ajout de l'état pour la taille de la grille

    useEffect(() => {
        if (joystickDirection) {
            setDirection(joystickDirection);
        }
    }, [joystickDirection]);

    const startGame = () => {
        setGameState('running');
        const { initialSnake, initialFood, gridSize } = GameLogic.startGame();
        setSnake(initialSnake);
        setFood(initialFood);
        setGridSize(gridSize);
    };

    const updateGame = () => {
        const { newSnake, newFood, gameOver } = GameLogic.updateGame(snake, food, direction, gridSize);
        setSnake(newSnake);
        setFood(newFood);
        if (gameOver) {
            setGameState('gameover');
        }
    };

    useEffect(() => {
        if (gameState === 'running') {
            const interval = setInterval(updateGame, 200);
            return () => clearInterval(interval);
        }
    }, [gameState, snake, direction, gridSize]);

    return (
        <View style={styles.container}>
            {gameState === 'idle' && <Button title="Start Game" onPress={startGame} />}
            {gameState === 'gameover' && <Button title="Restart Game" onPress={startGame} />}
            {gameState === 'running' && (
                <View style={styles.gameArea}>
                    {snake.map((segment, index) => (
                        <View key={index} style={[styles.snakeSegment, { left: segment.x * 16, top: segment.y * 16 }]} />
                    ))}
                    <Text style={[styles.food, { left: food.x * 16, top: food.y * 16 }]}>
                        🍎
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222',
    },
    gameArea: {
        width: 320,  // Ajuster la taille de la gameArea
        height: 320,
        position: 'relative',
        borderWidth: 2,
        borderColor: '#fff',  // Ajout de bordure blanche pour mieux voir la gameArea
        backgroundColor: '#333',  // Fond sombre pour la gameArea
    },
    snakeSegment: {
        width: 16,
        height: 16,
        backgroundColor: 'green',
        position: 'absolute',
    },
    food: {
        fontSize: 24,  // Taille plus grande pour l'emoji
        position: 'absolute',
    },
});

export default SnakeGame;
