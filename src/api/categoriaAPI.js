import axios from "axios";

const API_BASE_URL = "https://localhost:44374/Categoria/";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const adicionarNovaCategoria = async (categoria) => {
  try {
    const response = await api.post("api/adicionarCategoria", categoria);
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar categoria", error);
    throw error;
  }
};

export const listarCategoria = async () => {
  try {
    const response = await api.get("api/recuperarCategoria");
    return response.data;
  } catch (error) {
    console.error("Erro ao listar as categorias");
    throw error;
  }
};

export const listarCategoriaPorId = async (id) => {
  try {
    const response = await api.get(`api/recuperarCategoriaPorId/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar as categorias pelo ID", error);
    throw error;
  }
};

export const atualizarCategoria = async (categoria) => {
  try {
    const response = await api.put(`api/atualizarCategoria/${categoria.idCategoria}`, categoria);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar categoria", error);
    throw error;
  }
};

export const excluirCategoria = async (id) => {
  try {
    const response = await api.delete(`api/excluirCategoria/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir categoria", error);
    throw error;
  }
};
