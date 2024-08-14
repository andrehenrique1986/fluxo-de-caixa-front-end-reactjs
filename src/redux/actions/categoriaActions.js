export const ADICIONAR_CATEGORIA = 'ADICIONAR_CATEGORIA';
export const CARREGAR_CATEGORIAS = 'CARREGAR_CATEGORIAS';
export const ERRO_CATEGORIA = 'ERRO_CATEGORIA';

export const adicionarCategoria = (categoria) => ({
    type: 'ADICIONAR_CATEGORIA',
    payload: categoria
});

export const carregarCategorias = (categorias) => ({
    type: 'CARREGAR_CATEGORIAS',
    payload: categorias
  });

  export const erroCategoria = (error) => ({
    type: 'ERRO_CATEGORIA',
    payload: error
});