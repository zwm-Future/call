import React ,{ createContext,useReducer } from 'react';
export const Authtext = createContext({})
const Authreducer = (state, action) => {
    console.log(state, action);
    switch (action) {
      case 'addAuth':
        return true
      case 'removeAuth':
        return false
        default:
          return state;
    }
}
export default function Auth(props){
    const [authed,dispatch] = useReducer(Authreducer,false)
    return (
        <Authtext.Provider value={{authed,dispatch}}>
            {props.children}
        </Authtext.Provider>
    )
}
