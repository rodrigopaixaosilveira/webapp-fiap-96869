const http = require('http');
const fs = require('fs');
const path = require('path');
 
const server = http.createServer((req, res) => {
console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
 
if (req.url.includes('/erro')) {
   console.error(`[ERRO] Erro 500 simulado em ${req.url}`);
   res.writeHead(500); res.end('Erro 500 simulado!'); return;
}
 
if (req.url === '/' || req.url === '/index.html') {
const html = fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
   console.log('[INFO] Pagina entregue com sucesso');
res.writeHead(200,{'Content-Type':'text/html'}); res.end(html); return;
}
 
console.warn(`[WARN] Rota nao encontrada: ${req.url}`);
res.writeHead(404); res.end('Pagina nao encontrada (404)');
});
server.listen(process.env.PORT || 8080, () =>
console.log('[INFO] Servidor iniciado'));