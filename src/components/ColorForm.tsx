import { FaBan } from "react-icons/fa";

type colorFormProps = {
  onClick : (next:string) => void;
}

export default function ColorForm({onClick} : colorFormProps){
  const colorList = [
    {
      id : 1,
      color : "제거",
      code : "none"
    },
    {
      id : 2,
      color : "하양",
      code : "#fff"
    },
    {
      id : 3,
      color : "검정",
      code : "#333"
    },
    {
      id : 4,
      color : "회색",
      code : "#666"
    },
    {
      id : 5,
      color : "밝은 회색",
      code : "#999"
    },
    {
      id : 6,
      color : "빨강",
      code : "#f00"
    },
    {
      id : 7,
      color : "주황",
      code : "#f90"
    },
    {
      id : 8,
      color : "노랑",
      code : "#ff0"
    },
    {
      id : 9,
      color : "초록",
      code : "#0f0"
    },
    {
      id : 10,
      color : "파랑",
      code : "#00f"
    },
    {
      id : 11,
      color : "보라",
      code : "#90f"
    },
    {
      id : 12,
      color : "분홍",
      code : "#f99"
    }
  ]
  return(
    <div style={{width : "1280px", display : "flex", gap:"10px"}}>
      {
        colorList.map(color => 
          color.id === 1 ? 
            <button key={color.id} style={{width:"30px", height:"30px",border:"none",backgroundColor:"none", fontSize : "30px", textAlign : "center", padding : "0", color : "red"}} 
            value={color.code} aria-label={color.color} onClick={(e) => onClick(e.currentTarget.value)}><FaBan/></button>
            : <button key={color.id} style={{width:"30px", height:"30px",border:"1px solid #333",backgroundColor:color.code,borderRadius:"50%"}} 
            value={color.code} aria-label={color.color} onClick={(e) => onClick(e.currentTarget.value)}/>
          
        )
      }
    </div>
  )
}