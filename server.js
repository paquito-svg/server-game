const WebSocket = require('ws');

// Crea el servidor WebSocket en el puerto 8000

const wss = new WebSocket.Server({ port: 8000 });
console.log('Servidor WebSocket escuchando en el puerto 8000');

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
