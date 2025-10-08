import PageForm from "components/blocks/PageForm";
import TextBlockForm from "components/blocks/TextBlockForm";
import { CSpage06 } from "content/page";
import image01 from "assets/img/basic/06_01.png"
import image02 from "assets/img/basic/06_02.png"
import image03 from "assets/img/basic/06_03.png"
import image04 from "assets/img/basic/06_04.png"
import CodeBlock from "components/blocks/CodeBlock";
import HighlightBlock from "components/blocks/HighlightBlock";

export default function Basic06(){
  return(
    <PageForm page={CSpage06}>
      <TextBlockForm title="반복문이란?" img={image01}>
        어떠한 행동을 5번 해야하는데 그 행동이 매우 유사하다면? <br />
        이를 위해 비슷한 코드를 5번 쓰는 것은 매우 비효율적이다. <br />
        더군다나 추후에 50번으로 바뀐다면? <br />
        이는 코드의 유지보수에도 큰 하자로 남을 것이다. <br /><br />

        이를 방지하기 위해 만들어진것이 반복문으로 <br />
        특정 코드를 지정한만큼 반복하게 한다. <br />
        그리고 시행 횟수에 따라 약간씩 다른 코드를 실행하게 할 수도 있다. <br />
      </TextBlockForm>

      <TextBlockForm title="for문" img={image02} hasGap={false} removePTag={true}>
        for문은 다음과 같이 사용된다. <br />
        <CodeBlock language="python">
          for 변수 in range(시행 횟수): <br />
          &nbsp;&nbsp;코드
        </CodeBlock> <br />
        <CodeBlock language="java">
          //가장 기초적인 형태. 다른 형태도 많다. <br/>
          for(int 변수 = 0; 변수 {"<"} 시행 횟수; 변수++){"{"}코드{"}"}
        </CodeBlock> <br />
        <br />
        "시행 횟수"에는 "코드"를 몇 번 실행할지를 적는다. <br />
        코드에는 시행될 코드를 쓰는데 이때 "변수"를 사용할 수 있다. <br />
        위의 코드에서 변수는 처음 실행될때 0, 그 이후 1, 2, 3...으로 가다 시행 횟수에 도달하면 반복을 종료한다. <br />
        이 "변수"를 통해 코드 시행 횟수에 따라 각기 다른 코드를 실행하게 할 수 있다.
      </TextBlockForm>

      <HighlightBlock type="example" removePTag={true} hasGap={false}>
        <img src={image04} alt="" style={{border:"1px solid #333", margin : "10px 0px"}}/>
        <CodeBlock language="python">
          for i in range(5): <br />
          &nbsp;&nbsp;print(i) <br />
          <br />
          결과 : 0 1 2 3 4
        </CodeBlock>
      </HighlightBlock>

      <HighlightBlock type="addition" title="왜 0 부터일까?" hasGap={false}>
        컴퓨터가 연속된 메모리를 저장할때 첫번째 칸의 주소는 00000000, 0이다. <br />
        연속된 자료를 저장할 일이 많아 메모리 주소에 대한 규칙이 필요해졌고 첫번째를 0이라 하는 것이 규칙화되었다. <br />
        그리고 이러한 자료와 연계되는 for문 또한 0부터 사용되는 것이 자연스럽다. <br />
        다만 언어에 따라 1부터 시작될수도 있다.
      </HighlightBlock>

      <HighlightBlock type="exception">
        for문의 변수가 항상 0부터 시작해 "시행 횟수" - 1까지만 실행되지는 않는다. <br />
        선언을 다르게 하면 1부터 시작하게 할 수도 있고 "시행 횟수"까지 실행되게 할 수도 있다. <br />
        또 변수를 매 실행마다 2씩 올릴 수도 있고 1씩 감소하게 할 수도 있다.
        이는 각 언어에서 자세히 다루도록 하겠다.
      </HighlightBlock>

      <TextBlockForm title="while문" img={image03} removePTag={true} hasGap={false}>
        while문은 주로 다음과 같이 사용된다.
        <CodeBlock language="python">
          while 조건문 : <br />
          &nbsp;&nbsp;실행문
        </CodeBlock><br />
        <CodeBlock language="java">
          while (조건문) "{"{"}실행문{"}"}
        </CodeBlock><br />
        조건문이 참이면 해당 실행문을 실행한다. <br />
        while은 실행 횟수가 정확하지 않을때 주로 사용된다. <br /> <br />
        하지만 조건이 이상하면 실행문을 무한히 반복하는 현상이 나타날 수 있다.(무한 루프)
      </TextBlockForm>

      <HighlightBlock type="addition" title="do-while문" removePTag={true}>
        c 또는 java 등 몇몇 언어에 존재하는 while문의 변형판으로 <br />
        이는 실행문을 최소 1번 실행해야할때 사용되는 반복문이다. <br />
        <CodeBlock language="java">
          do{"{"}
            실행문
          {"}"}while(조건문)
        </CodeBlock>
      </HighlightBlock>

      <TextBlockForm title="break와 continue">
        반복문에서 사용되는 break와 continue문은 반복을 제어하는 명령들이다. <br />
        break는 해당 단계의 반복문을 강제로 종료시키고 continue는 즉시 다음 반복으로 이동한다. <br />
      </TextBlockForm>
    </PageForm>
  )
}