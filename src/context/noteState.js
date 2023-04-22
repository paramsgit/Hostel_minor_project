import { useReducer } from "react";
import noteContext from "./noteContext";

const initialState = {
    value: true,
    adminsidebar:true,
    user_name:"User",
    user_room:"0",
    user_mobile:"9876543210",
    user_email:"user@example.com",
    user_photo_url:"vec2.jpg",
    backend:"192.168.1.51",
    port:"5000"
    
  };
  function reducer(state, action) {
    switch (action.type) {
      case 'UPDATE_VALUE':
        return { ...state, value: action.payload };
      case 'UPDATE_AVALUE':
        return { ...state, adminsidebar: action.payload };
      case 'UPDATE_NAME':
        return { ...state, user_name: action.payload };
      case 'UPDATE_EMAIL':
        return { ...state, user_email: action.payload };
      case 'UPDATE_MOBILE':
        return { ...state, user_mobile: action.payload };
      case 'UPDATE_room':
        return { ...state, user_room: action.payload };
      case 'UPDATE_photo_url':
        return { ...state, user_photo_url: action.payload };
      
      default:
        return state;
    }
  }

const NoteState =(props)=>{
 
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <noteContext.Provider value={{state,dispatch}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;

