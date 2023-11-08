// import  { useEffect } from 'react'
// declare global {
//     interface Window { 
//     kommunicate: any;
//     }
//   }
//   const id  = import.meta.env.VITE_CHAT_APP_ID
// const Chat = ()=> {
// useEffect(()=>{
//     (function(_d, m){
//         var kommunicateSettings = {"appId":id,"popupWidget":true,"automaticChatOpenOnNavigation":true};
//         var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
//         s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
//         var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
//         window.kommunicate = m; m._globals = kommunicateSettings;
//       })(document, window.kommunicate || {});
// },[])
//   return (
//     <></>
//   )
// }
// export default Chat