

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const { salvarLog } = require('./logger');
const { connect } = require('./database');

const { Produto } = require('./classes/Produto');
const Usuario = require('./classes/Usuario');
const Carrinho = require('./classes/Carrinho');

const PORT = 3000;

const contentTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json'
};

const server = http.createServer(async (req, res) => {
  try {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;


    if (pathname === '/api/produtos' && method === 'GET') {
      try {
        const produtosCollection = await connect('produtos');
        const produtos = await produtosCollection.find().toArray();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(produtos));
      } catch (err) {
        salvarLog(err);
        res.writeHead(500);
        res.end('Erro ao buscar produtos');
      }
      return;
    }

    
    if (pathname === '/api/produtos' && method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', async () => {
        try {
          const dados = JSON.parse(body);
          if (!dados.nome || typeof dados.preco !== 'number') {
            res.writeHead(400);
            res.end('Dados inválidos');
            return;
          }
          const novoProduto = new Produto(dados.nome, dados.preco);
          const produtosCollection = await connect('produtos');
          const resultado = await produtosCollection.insertOne(novoProduto);
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(resultado));
        } catch (err) {
          salvarLog(err);
          res.writeHead(400);
          res.end('Erro ao salvar produto');
        }
      });
      return;
    }

    
    if (pathname === '/api/usuarios' && method === 'GET') {
      try {
        const usuariosCollection = await connect('usuarios');
        const usuarios = await usuariosCollection.find().toArray();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(usuarios));
      } catch (err) {
        salvarLog(err);
        res.writeHead(500);
        res.end('Erro ao buscar usuários');
      }
      return;
    }

   
    if (pathname === '/api/usuarios' && method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', async () => {
        try {
          const dados = JSON.parse(body);
          if (!dados.nome || !dados.email) {
            res.writeHead(400);
            res.end('Campos obrigatórios ausentes');
            return;
          }
          const novoUsuario = new Usuario(dados.nome, dados.email);
          const usuariosCollection = await connect('usuarios');
          const resultado = await usuariosCollection.insertOne(novoUsuario);
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(resultado));
        } catch (err) {
          salvarLog(err);
          res.writeHead(500);
          res.end('Erro ao criar usuário');
        }
      });
      return;
    }

    
    if (pathname === '/api/carrinhos' && method === 'GET') {
      try {
        const carrinhosCollection = await connect('carrinhos');
        const carrinhos = await carrinhosCollection.find().toArray();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(carrinhos));
      } catch (err) {
        salvarLog(err);
        res.writeHead(500);
        res.end('Erro ao buscar carrinhos');
      }
      return;
    }

    
    if (pathname === '/api/carrinho' && method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', async () => {
        try {
          const dados = JSON.parse(body);
          if (!dados.usuarioId || !Array.isArray(dados.itens)) {
            res.writeHead(400);
            res.end('Dados inválidos');
            return;
          }
          const carrinho = new Carrinho(dados.usuarioId);
          dados.itens.forEach(item => carrinho.adicionarItem(item.produtoId, item.quantidade));
          const carrinhosCollection = await connect('carrinhos');
          const resultado = await carrinhosCollection.insertOne(carrinho);
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(resultado));
        } catch (err) {
          salvarLog(err);
          res.writeHead(500);
          res.end('Erro ao criar carrinho');
        }
      });
      return;
    }

    
    let filePath = path.join(__dirname, '..', 'frontend', pathname === '/' ? 'index.html' : pathname);
    const extname = path.extname(filePath);
    const contentType = contentTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        salvarLog(err);
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Arquivo não encontrado');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  } catch (err) {
    salvarLog(err);
    res.writeHead(500);
    res.end('Erro interno do servidor');
  }
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
