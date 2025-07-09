const http = require('http');            // Nuevo: HTTP server
const WebSocket = require('ws');         // WebSocket

// Toma el puerto desde Railway o usa 8000 localmente
const port = process.env.PORT || 8000;

// Crea un servidor HTTP vacío
const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Servidor WebSocket funcionando');
});

// Crea el servidor WebSocket sobre el HTTP
const wss = new WebSocket.Server({ server });

// Muestra mensaje cuando el servidor HTTP está listo
server.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

// Manejador de conexiones WebSocket
wss.on('connection', (ws) => {
    console.log('Nuevo cliente conectado.');

    ws.on('message', (message) => {
        console.log('Mensaje recibido:', message.toString());

        // Reenvía el mensaje a todos los clientes conectados
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
