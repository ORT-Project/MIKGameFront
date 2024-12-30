const SerialPort = require('serialport');
const WebSocket = require('ws');

// Crée un serveur WebSocket sur le port 8080
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connecté');

    // Ouvre le port série (remplace 'COM3' par le nom du port de ton Arduino)
    const port = new SerialPort('COM3', {
        baudRate: 9600,
    });

    const parser = port.pipe(new SerialPort.parsers.Readline({ delimiter: '\n' }));

    // Lorsque des données sont lues depuis le port série
    parser.on('data', (data) => {
        console.log('Données Arduino reçues:', data);
        // Envoie les données au client WebSocket
        ws.send(data);
    });

    ws.on('close', () => {
        console.log('Client déconnecté');
        port.close();
    });
});
