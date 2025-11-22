//index.ts를 감싸는 store 컴포넌트
import React from "react";
import { combineReducers, createStore } from "redux";
import loginReducer from "./login";
import { Provider } from "react-redux";

export default function Store({children} : {children : React.ReactNode}){
  
  const rootReducer = combineReducers({
    login : loginReducer,
  })

  const store = createStore(rootReducer);

  return(
    <Provider store={store}>
      {children}
    </Provider>
  )
}

