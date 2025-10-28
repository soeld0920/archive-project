import { useReducer } from "react"
type State = {
  great : number,
  clicked : boolean
}

type Action = 
  {type : "on"} |
  {type : "off"}

const reducer = (state : State, action : Action) => {
  switch(action.type){
    case "on" : 
      return {great : state.great + 1, clicked : true}
    case "off" :
      return {great : state.great - 1, clicked : false}
  }
}

export default function useGreatToggle(great : number, clicked : boolean) : [State, (type : boolean) => void]{
  const [state, dispatch] = useReducer(reducer, {great  :great, clicked : clicked})
  const onToggle = (type : boolean) => {
    if(type) dispatch({type : "on"})
    else dispatch({type : "off"})
  }
  return [state, onToggle]
}