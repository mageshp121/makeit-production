

import client from "../baseUrl/axios.baseUrl";
import { Publish_Cours } from "../endPoints/commen";


export const Publishcours = async (id:string) =>{
    try {
      const data = await client().patch(Publish_Cours+id);
      return data
    } catch (error) {
      return error
    }
  }