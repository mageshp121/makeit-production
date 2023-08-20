

import client from "../baseUrl/axios.baseUrl";
import { Delete_Category } from "../endPoints/commen";
export const deleteCategory = async (id:string) =>{
    console.log(id);
    
    try {
      const data = await client().delete(Delete_Category+id)
      return data
    } catch (error) {
      return error
    }
  }