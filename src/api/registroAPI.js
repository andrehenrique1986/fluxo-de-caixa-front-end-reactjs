import axios from "axios";

const API_BASE_URL = "https://localhost:44374/Registro/";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 200000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const adicionarRegistro = async (registro) => {
    try {
       const response = await api.post('api/adicionarRegistro', registro);
       return response.data; 
    } catch (error) {
        console.error('Erro ao adicionar registro', error);
        throw error;
    }
}

export const listarRegistro = async () => {
    try {
      const response = await api.get("api/recuperarRegistro");
      return response.data;
    } catch (error) {
      console.error("Erro ao listar os registros");
      throw error;
    }
  };

  export const listarRegistroPorId = async (id) => {
    try {
      const response = await api.get(`api/recuperarRegistroPorId/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao listar os registros pelo ID", error);
      throw error;
    }
  };
  
  export const atualizarRegistro = async (registro) => {
    try {
      const response = await api.put(`api/atualizarRegistro/${registro.idRegistro}`, registro);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar o registro", error);
      throw error;
    }
  };
  
  export const excluirRegistro = async (registro) => {
    try {
      const response = await api.delete(`api/excluirRegistro/${registro.idRegistro}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao excluir o registro", error);
      throw error;
    }
  };

  export const calcularGastosPorCategoria = async (idCategoria) => {
    try {
        const response = await api.get(`api/calcularGastosPorCategoria/${idCategoria}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao realizar o cálculo", error);
        throw error;
    }
  }


  export const calcularRegistroPorFormasDePagamento = async (idFormaDePagamento) => {
    try {
        const response = await api.get(`api/calcularRegistroPorFormasDePagamento/${idFormaDePagamento}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao realizar o cálculo", error);
        throw error;
    }
  }


  export const calcularRegistroPorCusto = async (idCusto) => {
    try {
        const response = await api.get(`api/calcularRegistroPorCusto/${idCusto}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao realizar o cálculo", error);
        throw error;
    }
  }

  export const calcularPorcentagemPorCusto = async (idCusto) => {
    try {
        const response = await api.get(`api/calcularPorcentagemPorCusto/${idCusto}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao realizar o cálculo", error);
        throw error;
    }
  }

  export const calcularRegistroPorFluxo = async (idFluxo) => {
    try {
        const response = await api.get(`api/calcularRegistroPorFluxo/${idFluxo}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao realizar o cálculo", error);
        throw error;
    }
  }

  export const filtrarRegistrosPorData = async (filtro) => {
    try {
        const response = await api.get("api/filtrarRegistrosPorData", { params: filtro });
        return response.data;
    } catch (error) {
        console.error("Erro ao filtrar os registros", error);
        throw error;
    }
};






  

