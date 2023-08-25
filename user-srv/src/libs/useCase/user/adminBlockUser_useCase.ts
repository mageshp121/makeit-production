

export const blockUser_useCase =(dependencies:any)=>{
    const {
        repository: { userRepository },
      } = dependencies;
       const exicutefunction=async(data:any)=>{
        console.log(data,'dhjhdjasdh');
        
              const blockres = await userRepository.blockUser(data.id);
              return blockres
        
       };

       return{ exicutefunction }
}