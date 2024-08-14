export const ADICIONAR_SUBCATEGORIA = 'ADICIONAR_SUBCATEGORIA';
export const CARREGAR_SUBCATEGORIAS = 'CARREGAR_SUBCATEGORIAS';
export const ERRO_SUBCATEGORIA = 'ERRO_SUBCATEGORIA';

export const adicionarSubcategoria = (subcategoria) => ({
    type: 'ADICIONAR_SUBCATEGORIA',
    payload: subcategoria
});

export const carregarSubcategorias = (subcategorias) => ({
    type: 'CARREGAR_SUBCATEGORIAS',
    payload: subcategorias
  });

 
export const erroSubcategoria = (error) => ({
    type: 'ERRO_SUBCATEGORIA',
    payload: error
});