const WebSocket = require('ws');

const server = http.createServer();  // Railway detecta este servidor

const wss = new WebSocket.Server({ server });

const port = process.env.PORT || 8000;

wss.on('connection', (ws) => {
    console.log('Nuevo cliente conectado.');

    // Cuando recibe un mensaje, lo reenvía a todos
    ws.on('message', (message) => {
        console.log('Mensaje recibido:', message.toString());

        // Broadcast a todos los clientes conectados
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Cliente desconectado.');
    });

    ws.on('error', (err) => {
        console.error('Error en la conexión WebSocket:', err);
    });
});
