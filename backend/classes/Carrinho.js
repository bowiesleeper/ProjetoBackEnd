class Carrinho {
  constructor(usuarioId) {
    this.usuarioId = usuarioId;
    this.itens = [];
    this.dataCriacao = new Date();
  }

  adicionarItem(produtoId, quantidade) {
    this.itens.push({ produtoId, quantidade });
  }
}

module.exports = Carrinho;
