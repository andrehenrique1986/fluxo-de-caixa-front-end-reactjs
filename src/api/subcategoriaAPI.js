import axios from "axios";

const API_BASE_URL = "https://localhost:44395/Subcategoria/";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 2000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const adicionarSubcategoria = async (subcategoria) => {
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
  


