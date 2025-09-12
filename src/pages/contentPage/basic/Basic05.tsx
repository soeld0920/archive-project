import image01 from "assets/img/basic/05_01.png"
import image02 from "assets/img/basic/05_02.png"
import image03 from "assets/img/basic/05_03.png"
import image04 from "assets/img/basic/05_04.png"
import image05 from "assets/img/basic/05_05.png"
import CodeBlock from "components/blocks/CodeBlock"
import HighlightBlock from "components/blocks/HighlightBlock"
import PageForm from "components/blocks/PageForm"
import TextBlockForm from "components/blocks/TextBlockForm"
import { CSpage05 } from "content/page"
import "styles/PageStyle.css"

export default function Basic05(){
  return(
    <PageForm page={CSpage05}>

      <TextBlockForm title="조건문의 필요성" img={image01}>
        사용자로부터 정보를 얻는 것이 프로그램의 기본 골자이다. <br />
        간단한 계산기 프로그램에서도 식을 입력받아야하고 테트리스와 같은 게임은 블록의 이동, 블록 교체 등 여러 명령을 받아야한다. <br />
        만약 입력받은 정보를 분류하지 못한다면 프로그램은 작동되지 않을 것이다. <br />
        이를 처리하기위해 등장한 것이 조건문이다.
      </TextBlockForm>
      <TextBlockForm title="조건문-if" img={image02}>
        if 예약어는 주로 다음의 구조를 가진다.(언어마다 상의) <br />
        if 조건문 실행문 <br /> <br />
        
        if문의 조건문이 참이면 실행하고 거짓이면 건너뛴다. <br />
        조건문의 경우 진리형 변수를 써도 되고 비교연산자를 이용한 식을 사용해도 된다.
      </TextBlockForm>
      <TextBlockForm title="조건문-else" img={image03}>
        조건문 - else <br />
        if와 함께 쓰이며 else 실행문 의 구조로 사용된다. <br />
        if의 조건문이 거짓일때 대신 else의 실행문이 실행되게된다. <br />
        if... else if... else...처럼 여러 조건을 분기하여 사용할 수 있다. <br />
      </TextBlockForm>

      <HighlightBlock type="compare" title="else의 유뮤" removePTag={true}>
        <div className="CS05_compare">
          <div className="CS05_code">
            <CodeBlock language="python" className="CS05_codeBlock">
              if true : <br />
              &nbsp;&nbsp;print(이 조건문은 참입니다!) <br />
              print(이 조건문은 거짓입니다.) <br />
              print(프로그램이 종료되었습니다.) <br /> <br />
              출력 결과 : <br />
              이 조건문은 참입니다! <br />
              이 조건문은 거짓입니다. <br />
              프로그램이 종료되었습니다.
            </CodeBlock>
            
          </div>
          <div className="CS05_code">
            <CodeBlock language="python" className="CS05_codeBlock">
              if true : <br />
              &nbsp;&nbsp;print(이 조건문은 참입니다!) <br />
              else : <br />
              &nbsp;&nbsp;print(이 조건문은 거짓입니다.) <br />
              print(프로그램이 종료되었습니다.) <br /><br />
              출력 결과 : <br />
              이 조건문은 참입니다! <br />
              프로그램이 종료되었습니다.
            </CodeBlock>
          </div>
        </div>
        else를 사용하지 않으면 거짓일때 시행되었어야할 코드도 실행될 수 있다.
      </HighlightBlock>
      
      <HighlightBlock type="addition" title="중첩 if문">
        if 또는 else의 실행문 부분에 또다른 if를 사용할 수 있다. <br />
        이를 중첩 if문이라고 하며 이로 2가지의 조건 이상을 분기할 수 있다.<br />
        하지만 너무 많은 if문은 가독성을 저해하므로 가능한 논리연산자 또는 else if를 이용하여 조건식을 표현하자.<br />
      </HighlightBlock>

      <TextBlockForm title="조건문 - switch" img={image04}>
        switch는 다음과 같은 구조로 사용된다.<br />
        switch 변수<br />
        &nbsp;&nbsp;case 값 : 코드<br />
        &nbsp;&nbsp;case 값 : 코드<br />
        <br />
        switch는 변수의 값에 따라 각기 다른 코드를 실행하게한다.<br />
        변수의 값이 case의 값과 일치할경우 해당 부분부터 코드를 실행한다.<br />
        값의 범위(ex. {"10 < a < 20"})를 지정할 수 없지만 커멘드같이 값의 종류가 제한되어있는 상황에서 주로 사용된다.<br />
        이때 주의할 점은 case로부터 코드가 실행되면 끝까지 계속 실행하게 되므로 주의해야한다. (fall-through)<br />
        이를 방지하기위해 break를 사용하면 해당 코드에서 탈출하게된다.
      </TextBlockForm>

      <HighlightBlock type="compare" title="break의 유무" removePTag={true}>
        <div className="CS05_compare">
          <div className="CS05_code">
            <CodeBlock language="java" className="CS05_codeBlock2">
              switch(value){"{"} <br />
              &nbsp;&nbsp;case 1 : <br />
              &nbsp;&nbsp;&nbsp;&nbsp;System.out.println("value는 1입니다!");<br />
              &nbsp;&nbsp;case 2 : <br />
              &nbsp;&nbsp;&nbsp;&nbsp;System.out.println("value는 2입니다!");<br />
              {"}"}<br />
              System.out.print("프로그램이 종료되었습니다.");<br /><br />
              결과 : <br />
              value는 1입니다! <br />
              value는 2입니다! <br />
              프로그램이 종료되었습니다.
            </CodeBlock>
            
          </div>
          <div className="CS05_code">
            <CodeBlock language="java" className="CS05_codeBlock2">
              switch(value){"{"} <br />
              &nbsp;&nbsp;case 1 : <br />
              &nbsp;&nbsp;&nbsp;&nbsp;System.out.println("value는 1입니다!");<br />
              &nbsp;&nbsp;&nbsp;&nbsp;break; <br />
              &nbsp;&nbsp;case 2 : <br />
              &nbsp;&nbsp;&nbsp;&nbsp;System.out.println("value는 2입니다!");<br />
              &nbsp;&nbsp;&nbsp;&nbsp;break; <br />
              {"}"}<br />
              System.out.print("프로그램이 종료되었습니다.");<br /><br />
              결과 : <br />
              value는 1입니다! <br />
              프로그램이 종료되었습니다.
            </CodeBlock>
          </div>
        </div>
      break가 없으면 value = 1일때 에러가 발생한다.
      </HighlightBlock>

      <TextBlockForm title="삼항연산자" img={image05}>
        삼항연산자란 간단히말해 if문을 간결히 표현한것이다. <br />
        예를 들어 value가 조건에 따라 a 또는 b를 가져야할때 if else로 긴 문장을 쓰지 않아도 된다. <br />
        단 삼항연산자는 코드를 실행하지는 못하고 값만 넣을 수 있다.
      </TextBlockForm>

      <TextBlockForm title="논리연산자">
        만약 조건 a와 b 둘 중 하나를 만족하면 if문을 실행하게 하려면 어떻게 해야할까? <br />
        이때 필요한 것이 논리 연산자이다. <br />
        if a && b와 같이 쓰면 a와 b 모두를 만족했을 때 실행할 수 있고 a || b와 같이 쓰면 a 또는 b 중 하나를 만족하면 실행하게 할 수 있다. <br />
      </TextBlockForm>

      <HighlightBlock type="addition" title="논리연산자의 특수성">
        논리연산을 할 때 앞의 있는 조건부터 체크하게 되는데 이때 뒤에 조건을 볼 필요없이 결과가 정해지면 즉시 조건 검사를 종료한다. <br />
        이를 통해 앞 조건을 오류가 발생할 값을 체크하고 뒤 조건을 원래 하고자하는 조건으로 하면 에러를 발생하지 않게 한다.
      </HighlightBlock>
    </PageForm>
  )
}