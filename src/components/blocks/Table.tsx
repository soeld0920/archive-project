import { scales, weight } from "styles/tokens/textStyle";

export type CaptionProps = {
  size? : keyof typeof scales;
  weight? : keyof typeof weight;
  align? : "left" | "center" | "right";
  text : string;
  className? : string;
}

function Caption({text, className, size = "m", weight = "bold", align = "center"} : CaptionProps){
  return (
    <caption
    className={className}
    style={{
      fontSize : `var(--scales-${size})`,
      fontWeight : `var(--weight-${weight})`,
      textAlign : align,
      border : "4px solid #333",
      borderBottom : "3px solid #333"
    }}
    >{text}</caption>
  )
}

type StrKey<T> = Extract<keyof T, string>

export type ColumnProps<T> = { //표의 열 주제
  key : StrKey<T>;
  title : string;
  mergerBy? : boolean;
  size? : keyof typeof scales;
  weight? : keyof typeof weight;
  align? : "left" | "center" | "right";
  width? : number | string;
  className? : string;
  render? : (value : T[StrKey<T>]) => React.ReactNode
}

export type TableData<T extends object> = {
  columns : ColumnProps<T>[];
  datas : T[];
  caption : CaptionProps;
  getRowId? : (value : T) => React.Key;
  part? : number
}

export function Table<T extends object>({columns , datas, caption, getRowId, part = 1}: TableData<T>){
  if(datas.length === 0) return (<>error!</>)

  columns.map(col => {
    col.size = col.size || "sm";
    col.weight = col.weight || "regular";
  })

  const stands = columns.filter(col => col.mergerBy).map(col => col.key);
  const merger = Object.fromEntries(
    stands.map(k => [k, Array(datas.length).fill(1)])
  ) as Record<StrKey<T>,number[]>;

  //1 = 정상, -1 = 제거, 2 이상 = 병합
  for(let i = 0; i < stands.length; i++){
    const stand = stands[i];
    let nowValue = datas[0][stand];
    let idx = 0;
    for(let j = 1; j < datas.length; j++){
      if(nowValue === datas[j][stand]){
        merger[stand][j] = -1;
        merger[stand][idx]++;
      }else{
        nowValue = datas[j][stand];
        idx = j;
      }
    }
  }

  let newDatas : T[][] = [];
  if(part !== 1){
    let temp : T[][] = [];

    let i = 0;
    while(i < datas.length){
      let temp2 : T[] = [];
      for(let j = 0; j < part; j++){
        if(i >= datas.length) break;
        temp2.push(datas[i++]);
      }
      temp.push(temp2)
    }

    newDatas = temp;
  }


  if(part === 1)
  return(
    <table style={{marginBottom : "50px", borderCollapse: "collapse", border : "4px solid #333", borderTop : "none"}}>
      <Caption text={caption.text} className={caption.className} align={caption.align} size={caption.size} weight={caption.weight}/>
      <thead>
        <tr>
          {
            columns.map((col) => (
              <th
                key = {col.key as string}
                style={{fontSize : `var(--scales-${col.size})`, fontWeight : `var(--weight-${col.weight})`, textAlign : col.align, width : col.width, borderRight : "1px solid #333", borderBottom : "1px solid #333"}}
                scope="col" className={col.className}
                >
                {col.title}
              </th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          datas.map((data,idx) => (
            <tr key={getRowId ? getRowId(data) : idx}>
              {
                columns.map((col) => {
                  let rowSpan = 1;
                  if(stands.indexOf(col.key) !== -1){
                    rowSpan = merger[col.key][idx];
                    if(rowSpan === -1) return null;
                  }

                  const content = col.render ? col.render(data[col.key]) : String(data[col.key]);
                  return (
                    <td key={col.key as string} 
                    style={{fontSize : `var(--scales-${col.size})`, fontWeight : `var(--weight-${col.weight})`, textAlign : col.align, 
                    borderRight : "1px solid #333", borderBottom : "1px solid #333",
                    padding : "0.2rem"}} rowSpan={rowSpan} className={col.className}>
                      {content}
                    </td>
                  )
                })
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  )
  else return(
    <table style={{marginBottom : "50px", borderCollapse: "collapse", border : "4px solid #333", borderTop : "none"}}>
      <Caption text={caption.text} className={caption.className} align={caption.align} size={caption.size} weight={caption.weight}/>
      <thead>
        <tr>
          {
            Array.from({length : part}, (_,i) => i+1).map(
              (_,i) => columns.map((col) => (
                <th
                  key = {(col.key as string) + i}
                  style={{fontSize : `var(--scales-${col.size})`, fontWeight : `var(--weight-${col.weight})`, textAlign : col.align, width : col.width, borderRight : "1px solid #333", borderBottom : "1px solid #333"}}
                  scope="col" className={col.className}
                  >
                  {col.title}
                </th>
              ))
            )
          }
        </tr>
      </thead>
      <tbody>
        {
          newDatas.map((datas,idx) => {
            return (
              <tr key={idx}>
                {
                  datas.map(data => (
                    columns.map((col) => {
                      const content = col.render ? col.render(data[col.key]) : String(data[col.key]);
                    
                    return (<td key={col.key as string} 
                      style={{fontSize : `var(--scales-${col.size})`, fontWeight : `var(--weight-${col.weight})`, textAlign : col.align, 
                      borderRight : "1px solid #333", borderBottom : "1px solid #333",
                      padding : "0.2rem"}} className={col.className}>{content}</td>
                    )})
                  ))
                  
                }
              </tr>
              )}
          )
        }
      </tbody>
    </table>
  )
}