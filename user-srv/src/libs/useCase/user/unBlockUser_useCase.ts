

export const unBlockUser_useCase =(dependencies:any)=>{
    const {
        repository: { userRepository },
      } = dependencies;
       const exicutefunction=async(data:any)=>{
        console.log(data,'usedatataa');
        
              const blockres = await userRepository.unBlock(data.id);
              return blockres
        
       };

       return{ exicutefunction }
}