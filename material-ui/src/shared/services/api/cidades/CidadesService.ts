import { Enviroment } from "../../../environment";

import { Api } from "../axios-config";

export interface IListagemCidades {
   id: number;
   nome: string,
   
}

export interface IDetalheCidades {
   id: number;
   nome: string,
   
}

type TCidadesComTotalCount = {
   data: IListagemCidades[],
   totalCount: number,
}



const getAll = async( page= 1, filter = '', id = ''): Promise<TCidadesComTotalCount | Error> => {
   try{
      const urlRelative = `/cidades?_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&nome_like=${filter}&id_like=${id}`;

      const { data, headers } = await Api.get(urlRelative);

      if(data){
         return {
            data,
            totalCount: Number(headers['x-total-count'] || Enviroment.LIMITE_DE_LINHAS),
         }
      }

      return new Error('Erro ao listar os registros.')
   } catch(error){
      console.error(error);
      return new Error((error as {message: string}).message || 'Erro ao listar os registros.')
   }
};

const getById = async(id: number): Promise<IDetalheCidades | Error> => {
   try{
      
      const { data } = await Api.get(`/cidades/${id}`);

      if(data){
         return data;
      }

      return new Error('Erro ao consultar o registro.')
   } catch(error){
      console.error(error);
      return new Error((error as {message: string}).message || 'Erro ao consultar o registro.')
   }
}

const create = async(dados: Omit<IDetalheCidades, 'id'> ): Promise<number | Error> => {
   try{
      
      const { data } = await Api.post<IDetalheCidades>(`/cidades`, dados);

      if(data){
         return data.id;
      }

      return new Error('Erro ao criar o registro.')
   } catch(error){
      console.error(error);
      return new Error((error as {message: string}).message || 'Erro ao criar o registro.')
   }
}

const updateById = async(id: number, dados: IDetalheCidades): Promise<void | Error> => {
   try{
       await Api.put(`/cidades/${id}`, dados);

   } catch(error){
      console.error(error);
      return new Error((error as {message: string}).message || 'Erro ao atualizar o registro.')
   }
}

const deleteById = async(id: number): Promise<void | Error> => {
   try{
      await Api.delete(`/cidades/${id}`);

  } catch(error){
     console.error(error);
     return new Error((error as {message: string}).message || 'Erro ao deletar o registro.')
  }
}

export const CidadesService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
   
};