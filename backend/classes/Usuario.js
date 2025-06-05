class Usuario {
  constructor(nome, email) {
    this.nome = nome;
    this.email = email;
    this.dataCadastro = new Date();
  }
}

module.exports = Usuario;
