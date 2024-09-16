import axios from "axios";

const API_BASE_URL = "https://localhost:44374/Custo/";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 2000,
  headers: {
    "Content-Type": "application/json",
  },
});


export const listarCusto = async () => {
  try {
    const response = await api.get("api/recuperarCusto");
    return response.data;
  } catch (error) {
    console.error("Erro ao listar os tipos de custo");
    throw error;
  }
};

export const listarCustoPorId = async (id) => {
  try {
    const response = await api.get(`api/recuperarCustoPorId/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao listar os tipos de custo pelo ID", error);
    throw error;
  }
};
