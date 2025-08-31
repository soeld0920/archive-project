type FontSizeFormProps = {
  onClick : (next:string) => void;
}

export default function FontSizeForm({onClick} : FontSizeFormProps){
  let id = 1;
  return(
      <div style={{width : "1280px", display : "flex", gap:"10px"}}>
        {
          [8,10,12,14,16,18,20,25,30,35,40,50,60].map(size => 
            (
              <button key={id++} value={size} onClick={(e) => onClick(e.currentTarget.value)}>{size}pt</button>
            )
          )
        }
      </div>
    )
}