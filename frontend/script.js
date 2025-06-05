function carregarProdutos() {
  fetch('/api/produtos')
    .then(res => res.json())
    .then(produtos => {
      const div = document.getElementById('produtos');
      div.innerHTML = '';
      produtos.forEach(p => {
        div.innerHTML += `<div class="card"><p>${p.nome} - R$ ${p.preco}</p></div>`;
      });
    })
    .catch(err => console.error(err));
}

document.getElementById('formProduto').addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const preco = parseFloat(document.getElementById('preco').value);

  fetch('/api/produtos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, preco })
  })
    .then(res => {
      if (res.ok) {
        document.getElementById('formProduto').reset();
        carregarProdutos();
      } else {
        return res.text().then(msg => alert(msg));
      }
    })
    .catch(err => console.error(err));
});

carregarProdutos();
