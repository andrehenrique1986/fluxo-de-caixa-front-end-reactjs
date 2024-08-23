import axios from "axios";

const API_BASE_URL = "https://localhost:44395/Subcategoria/";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const adicionarNovaSubcategoria = async (subcategoria) => {
    try {
       const response = await api.post('api/adicionarSubcategoria', subcategoria);
       return response.data; 
    } catch (error) {
        console.error('Erro ao adicionar subcategoria', error);
    }
}

export const listarSubcategoria = async () => {
    try {
      const response = await api.get("api/recuperarSubcategoria");
      return response.data;
    } catch (error) {
      console.error("Erro ao listar as subcategorias");
      throw error;
    }
  };

  export const listarSubcategoriaPorId = async (id) => {
    try {
      const response = await api.get(`api/recuperarSubcategoriaPorId/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao listar as subcategorias pelo ID", error);
    }
  };
  
  export const atualizarSubcategoria = async (subcategoria) => {
    try {
      const response = await api.put(`api/atualizarSubcategoria/${subcategoria.idSubcategoria}`, subcategoria);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar subcategoria", error);
    }
  };

  export const excluirSubcategoria = async (id) => {
    try {
      const response = await api.delete(`api/excluirSubcategoria/${id.idSubcategoria}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao excluir subcategoria", error);
    }
  };
  


