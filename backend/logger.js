const fs = require('fs');
const path = require('path');

function salvarLog(erro) {
  const dataHora = new Date().toISOString();
  const mensagem = `[${dataHora}] ${erro.stack || erro.message || erro}\n`;

  const logPath = path.join(__dirname, 'logs.txt');

  fs.appendFile(logPath, mensagem, err => {
    if (err) {
      console.error('Erro ao salvar log:', err);
    }
  });
}

module.exports = { salvarLog };
