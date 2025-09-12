import { log } from "content/updateLog";
import styled from "styled-components";

const Card = styled.li`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: auto;
  background-color: #ddd;
  border-radius: 10px;
  overflow-x: hidden;
  padding: 10px;
  margin-bottom: 10px;
  border: #666 solid 2px;

  &:last-child{
    margin-bottom: 0px;
  }
`

type UpdateListProps = {
  className : string;
}

export function UpdateList({className} : UpdateListProps){
  return(
    <ul className={className}>
      {
        [...log].reverse().slice(0,10).map((l) => (
          <ContentCard 
          version={l.version} 
          patch={l.patch} 
          date={l.date} 
          title={l.title} 
          key={l.version}/>
        ))
      }
    </ul>
  )
}

type ContentCardProps = {
  version : string;
  patch : string[];
  date : string;
  title? :string;
}

function ContentCard({version, patch, date, title} : ContentCardProps){
  return(
    <Card>
      <h6 style={{fontSize:"16px"}}>{title ? title : version}</h6>
      <br />
      {patch.map((p) => (
        <p key={p} style={{overflow:"hidden", textOverflow:"ellipsis",whiteSpace:"nowrap"}}> - {p}</p>
      ))}
      <span style={{fontSize:"12px", fontWeight:"200", color:"#000", display:"inline-block", marginLeft:"auto", width:"auto"}}>{date}</span>
    </Card>
  )
}