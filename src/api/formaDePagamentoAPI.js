import axios from "axios";

const API_BASE_URL = "https://localhost:44374/FormaDePagamento/";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 6000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const adicionarFormaDePagamento = async (formaDePagamento) => {
    try {
       const response = await api.post('api/adicionarFormaDePagamento', formaDePagamento);
       return response.data; 
    } catch (error) {
        console.error('Erro ao adicionar forma de pagamento', error);
    }
}

export const listarFormaDePagamento = async () => {
    try {
      const response = await api.get("api/recuperarFormaDePagamento");
      return response.data;
    } catch (error) {
      console.error("Erro ao listar as formas de pagamento");
      throw error;
    }
  };

  export const listarFormaDePagamentoPorId = async (id) => {
    try {
      const response = await api.get(`api/recuperarFormaDePagamentoPorId/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao listar as formas de pagamento pelo ID", error);
      throw error;
    }
  };
  
  export const atualizarFormaDePagamento = async (formaDePagamento) => {
    try {
      const response = await api.put(`api/atualizarFormaDePagamento/${formaDePagamento.idFormaDePagamento}`, formaDePagamento);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar forma de pagamento", error);
      throw error;
    }
  };
  
  export const excluirFormaDePagamento = async (formaDePagamento) => {
    try {
      const response = await api.delete(`api/excluirFormaDePagamento/${formaDePagamento.idFormaDePagamento}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao excluir forma de pagamento", error);
      throw error;
    }
  };
  

