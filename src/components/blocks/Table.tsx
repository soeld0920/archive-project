export type CaptionProps = {
  size? : number | string;
  weight? : 400 | 700;
  align? : "left" | "center" | "right";
  text : string;
  className? : string;
}

function Caption({text, className, size = "20px", weight = 700, align = "center"} : CaptionProps){
  return (
    <caption
    className={className}
    style={{
      fontSize : size,
      fontWeight : weight,
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
  size? : number | string;
  weight? : 400 | 700;
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
}

export function Table<T extends object>({columns , datas, caption, getRowId}: TableData<T>){
  if(datas.length === 0) return (<>error!</>)

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


  return(
    <table style={{marginBottom : "50px", borderCollapse: "collapse", border : "4px solid #333", borderTop : "none"}}>
      <Caption text={caption.text} className={caption.className} align={caption.align} size={caption.size} weight={caption.weight}/>
      <thead>
        <tr>
          {
            columns.map((col) => (
              <th
                key = {col.key as string}
                style={{fontSize : col.size, fontWeight : col.weight, textAlign : col.align, width : col.width, borderRight : "1px solid #333", borderBottom : "1px solid #333"}}
                scope="col"
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
                    style={{fontSize : col.size, fontWeight : col.weight, textAlign : col.align, 
                    borderRight : "1px solid #333", borderBottom : "1px solid #333",
                    padding : "0.2rem"}} rowSpan={rowSpan}>
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
}