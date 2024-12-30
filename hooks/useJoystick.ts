import { useState, useEffect } from 'react';

export const useJoystick = () => {
    const [direction, setDirection] = useState<string | null>(null);

    useEffect(() => {
        // Utiliser WebSocket natif de React Native
        const ws = new WebSocket('ws://localhost:8080');

        ws.onopen = () => {
            console.log("Connexion WebSocket ouverte");
        };

        ws.onmessage = (event) => {
            const data = event.data;
            if (data === 'UP' || data === 'DOWN' || data === 'LEFT' || data === 'RIGHT') {
                setDirection(data);
            }
        };

        ws.onerror = (error) => {
            console.log("WebSocket error:", error);
        };

        ws.onclose = () => {
            console.log("WebSocket fermé");
        };

        return () => {
            ws.close();
        };
    }, []);

    return direction;
};
