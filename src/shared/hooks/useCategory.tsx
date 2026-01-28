import { useReducer } from "react";
import type { MainCategory, SubCategory } from "shared/types/MainCategory";
import type { SeletedCategory } from "shared/types/SeletedCategory";


type Action = 
  {type : "SET_MAINCATEGORY", payload : MainCategory | undefined} |
  {type : "SET_SUBCATEGORY", payload : SubCategory | undefined} |
  {type : "SET_ALL", payload : {mainCategory : MainCategory | undefined, subCategory : SubCategory | undefined}} |
  {type : "RESET"}

const initalState : SeletedCategory = {mainCategory : undefined, subCategory : undefined}

function reduce(state : SeletedCategory, action : Action) : SeletedCategory{
  switch(action.type){
    case "SET_MAINCATEGORY" :
      return {...state, mainCategory : action.payload}
    case "SET_SUBCATEGORY" : 
      return {...state, subCategory : action.payload}
    case "SET_ALL" :
      return {...state, mainCategory : action.payload.mainCategory, subCategory : action.payload.subCategory}
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