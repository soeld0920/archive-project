import PageForm from "components/blocks/PageForm";
import TextBlockForm from "components/blocks/TextBlockForm";
import { HTMLpage01 } from "content/page";
import image01 from "assets/img/html/01_01.png"
import CodeBlock from "components/blocks/CodeBlock";
import HighlightBlock from "components/blocks/HighlightBlock";

export default function HTML01(){
  return (
    <PageForm page={HTMLpage01}>

      <TextBlockForm title="HTML이란?" img={image01}>
        HTML은 웹 페이지의 구조를 정의하기 위해 존재하는 언어이다. <br />
        <br />
        브라우저는 코드를 읽고 해당 코드를 화면에 구현(랜더링)합니다. <br />
        개발자는 문서(웹 페이지)의 제목, 글, 이미지, 링크 등을 구조화합니다.
      </TextBlockForm>

      <TextBlockForm title="HTML의 기초" removePTag={true} hasGap={false}>
        html은 태그를 이용하여 웹 페이지의 구조를 설명한다. <br />
        태그는 html의 기초 단위로, 각각의 구조의 최소 단위이다. <br />
        {"<>"}를 이용하여 표현되며 꺽쇠 안에 단어를 넣어 해당 구조가 어떤 역할인지를 설명한다. <br />
        <br />
        <CodeBlock language="html">
          {"<!DOCTYPE html>"} <br />
          {"<html>"} <br />
          &nbsp;&nbsp;{"<head>"} <br />
          &nbsp;&nbsp;&nbsp;&nbsp;{"<title>첫 페이지</title>"} <br />
          &nbsp;&nbsp;{"</head>"} <br />
          &nbsp;&nbsp;{"<body>"} <br />
          &nbsp;&nbsp;&nbsp;&nbsp;{"<h1>안녕하세요!</h1>"} <br />
          &nbsp;&nbsp;&nbsp;&nbsp;{"<p>첫 페이지에 오신 것을 환영합니다.</p>"} <br />
          &nbsp;{"</body>"} <br />
          {"</html>"}
        </CodeBlock>
        ※기초적인 html의 구조<br />
        <br />
        각각의 태그는 {"<태그명>"}으로 열고 {"</태그명>"}으로 닫는다. <br />
        그리고 태그명 안에 여러 정보를 담아 표현할 수 있다.
      </TextBlockForm>
      <HighlightBlock type="exception" hasGap={false}>
        모든 태그가 여는 태그와 닫는 태그 두 가지가 필요하지는 않는다. <br />
        이미지처럼 태그 안에 또다른 정보가 필요하지 않으면 {"<태그명/>"}만으로 구조가 표현될 수 있다. <br />
        이를 빈 태그(void tag)라 한다.
      </HighlightBlock>
      <HighlightBlock type="example" removePTag={true} title="HTML 미리보기">
        1. 본문 태그 
        <CodeBlock language="html">
          {"<p>이 곳에 본문을 적어주세요.</p>"}
        </CodeBlock>
        2. 이미지 태그
        <CodeBlock language="html">
          {"<img src=\"../img01.png\" alt=\"대체텍스트\"/>"}
        </CodeBlock>
        3. 표 태그
        <CodeBlock language="html">
          {"<table>"} <br />
          &nbsp;&nbsp;{"<tr>"}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;{"<td>1행 1열</td>"}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;{"<td>1행 2열</td>"}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;{"<td>1행 3열</td>"}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;{"<td>1행 4열</td>"}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;{"<td>1행 5열</td>"}<br />
          &nbsp;&nbsp;{"</tr>"}<br />
          &nbsp;&nbsp;{"<tr>"}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;{"<td>2행 1열</td>"}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;{"<td>2행 2열</td>"}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;{"<td>2행 3열</td>"}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;{"<td>2행 4열</td>"}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;{"<td>2행 5열</td>"}<br />
          &nbsp;&nbsp;{"</tr>"}<br />
          {"</table>"}
        </CodeBlock>
      </HighlightBlock>


    </PageForm>
  )
} 