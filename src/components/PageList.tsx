import {type Page} from "content/page"
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

type PageListProps = {
  className : string;
  pages : Page[]
}

export function PageList({className, pages} : PageListProps){
  return(
    <ul className={className}>
      {
        [...pages].map((p) => (
          <ContentCard 
          id={p.id}
          title={p.title}
          seriesNum={p.seriesNum}
          tags={p.tags}
          date={p.date}
          summary={p.summary}
          contentPath={p.contentPath}
          />
        ))
      }
    </ul>
  )
}

function ContentCard({id,title,seriesNum,tags,date,summary,contentPath} : Page){
  return(
    <Card>
      <h6 style={{fontSize:"16px"}}>{title}</h6>
      <br />
      <p style={{overflow:"hidden", textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{summary}</p>
      <span style={{fontSize:"12px", fontWeight:"200", color:"#000", display:"inline-block", marginLeft:"auto", width:"auto"}}>{date}</span>
    </Card>
  )
}