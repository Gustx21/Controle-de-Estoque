let itens = {}; // Declarando um objeto
let opcao = 0; // Criando a variável do While

// Função de criar os parâmetros
function criar() {
  let nome, total;
  let i = 0;

  total = parseInt(prompt("Quantos itens serão adicionados:")); // Valor do Loop For

  for (; i < total; i++) {
    // O For repete as perguntas até 'I' ser igual a 'Total'
    nome = prompt("Digite o nome do produto:").toUpperCase().trim();
    quantidade = parseFloat(prompt(`Digite a quantidade total de ${nome}:`));
    
    itens[nome] = quantidade; // Criando as lista dentro do Objeto
  };
};

// Função remove os parâmetros
function remover() {
  let remove = prompt("Insira o nome da pasta a ser removida:").toUpperCase();

  delete itens[remove]; //Remoção do nome do Objeto inserido pelo usuário
};

// Repetição para Chamar Menu até que usuário selecione a opção Sair
while (opcao !== 3) {
  opcao = parseInt(prompt("Insira uma opção:\n1. Criar.\n2. Remover.\n3. Sair."));

  // Chamada da função apartir do Switch
  switch (opcao) {
    case 1:
      criar();
      break;
    case 2:
      remover();
      break;
    case 3:
      alert("Encerrando.");
      break;
    default:
      alert("Insira um valor válido.");
      break;
  };
};