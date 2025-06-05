class Produto {
  constructor(nome, preco) {
    this.nome = nome;
    this.preco = preco;
  }
}

function salvarLog(err) {
  const fs = require('fs');
  fs.appendFileSync('logs.txt', `[${new Date().toISOString()}] ${err}\n`);
}

module.exports = { Produto, salvarLog };
