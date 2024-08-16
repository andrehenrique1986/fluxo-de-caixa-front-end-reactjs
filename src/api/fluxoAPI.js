import axios from "axios";

const API_BASE_URL = "https://localhost:44395/Fluxo";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 2000,
  headers: {
    "Content-Type": "application/json",
  },
});


export const listarFluxo = async () => {
  try {
    const response = await api.get("api/recuperarFluxo");
    return response.data;
  } catch (error) {
    console.error("Erro ao listar os tipos de fluxo");
    throw error;
  }
};

export const listarFluxoPorId = async (id) => {
  try {
    const response = await api.get(`api/recuperarFluxoPorId/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar os tipos de fluxo pelo ID", error);
  }
};

