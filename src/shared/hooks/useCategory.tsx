import { useReducer } from "react";
import type { SeletedCategory } from "shared/types/SeletedCategory";
import type { MainCategory, SubCategory } from "shared/types/MainCategory";


type Action = 
  {type : "SET_MAINCATEGORY", payload : MainCategory | undefined} |
  {type : "SET_SUBCATEGORY", payload : SubCategory | undefined} |
  {type : "RESET"}

const initalState : SeletedCategory = {mainCategory : undefined, subCategory : undefined}

function reduce(state : SeletedCategory, action : Action) : SeletedCategory{
  switch(action.type){
    case "SET_MAINCATEGORY" :
      return {...state, mainCategory : action.payload}
    case "SET_SUBCATEGORY" : 
      return {...state, subCategory : action.payload}
    case "RESET":
      return initalState;
  }
}

export function useCategory(){
  const [state, dispatch] = useReducer(reduce,initalState);
  const dispatchCategory = (action : Action)  => {
    if(action.type === "SET_SUBCATEGORY" && state.mainCategory === undefined){
      console.error(" main이 없는데 sub가 설정되려함.")
      return;
    }
    dispatch(action);
  }
  return [state, dispatchCategory] as const
}