import PageForm from "components/blocks/PageForm";
import TextBlockForm from "components/blocks/TextBlockForm";
import { CSpage07 } from "content/page";
import image01 from "assets/img/basic/07_01.png"
import image02 from "assets/img/basic/07_02.png"
import image03 from "assets/img/basic/07_03.png"
import CodeBlock from "components/blocks/CodeBlock";
import HighlightBlock from "components/blocks/HighlightBlock";

export default function Basic07(){
  return(
    <PageForm page={CSpage07}>
      <TextBlockForm title="배열(array)이란?" img={image01}>
        연관이 있는 자료들을 각각 다른 변수에 할당하는 것은 매우 비효율적이다. <br />
        이를 해결하기 위해 만든 것이 배열이다. <br />
        <br />
        배열은 간단히 말해 여러 변수를 줄지어놓은 것이다. <br />
        할당할 크기를 설정하면 그 크기에 맞는 공간을 컴퓨터가 할당하고 각각의 공간에 값을 넣을 수 있다. <br />
      </TextBlockForm>
      <TextBlockForm title="배열 선언" removePTag={true} hasGap={false}>
        <CodeBlock language="c">
          변수 타입 array[배열 크기];
        </CodeBlock><br />
        <CodeBlock language="java">
          변수 타입[] array = new 변수 타입[배열 크기];
        </CodeBlock>
        배열은 각각의 언어마다 특징이 크게 다르므로, 여기서는 공통된 부분만 다룰 것이다. <br />
        그리고 python의 배열은 엄밀히 말해 "리스트"이므로 여기서는 c와 java의 고전적인 배열만 다룰 것이다. <br/>
        <br />
        배열은 다음의 특징을 가진다. <br />
        - 고정된 크기 <br />
        - 인덱스로 각각의 값에 접근 가능 <br />
        - 한 종류의 변수 종류만 담을 수 있음<br />
        <br />
        인덱스로 인해 각각의 자료에 매우 쉽게 접근이 가능하다. <br />
        그리고 반복문에 사용하기 매우 용이하다. 
      </TextBlockForm>

      <HighlightBlock type="exception">
        python의 리스트는 고정되지 않은 크기, 여러 종류의 변수를 담을 수 있다. <br />
        하지만 배열처럼 인덱스로 각각의 자료에 접근할 수 있다.
      </HighlightBlock>

      <TextBlockForm title="인덱스(index)" img={image02} hasGap={false}>
        인덱스란 쉽게 말해 주소이다. <br />
        인덱스는 0번부터 시작하고 배열의 크기 - 1만큼 존재한다. <br />
        0번 인덱스란 배열의 0번째(= 가장 앞의 자료)를 의미하고 인덱스가 1 올라갈때마다 그 다음의 자료를 의미하게된다. <br />
        배열의 4번 인덱스는 배열의 5번째 값을 의미하는 것이다.
      </TextBlockForm>

      <HighlightBlock type="addition" title="크기를 넘어간 인덱스" hasGap={false}>
        만약 크기를 넘어선 index를 사용하면 언어마다 다른 현상을 보인다. <br />
        python과 java는 outOfIndex 에러를 일으키지만 <br />
        c언어는 에러를 발생하지 않고 쓰레기값을 반환한다.
      </HighlightBlock>

      <HighlightBlock type="example" removePTag={true}>
        <CodeBlock language="java">
          int[] array = new int[5]; //배열 선언 <br />
          array[0] = 3; //배열의 0번 인덱스에 3 대입 <br />
          System.out.print(array[0]); //배열의 0번 인덱스를 출력
        </CodeBlock>
      </HighlightBlock>

      <TextBlockForm title="for문과 array" removePTag={true}>
        배열의 가장 기초적인 활용법은 for문과의 연계이다. <br />
        for문의 변수를 인덱스로 사용해서 매 실행마다 다른 값을 불러올 수 있다. <br />
        <CodeBlock language="java">
          //array.length는 array의 길이를 의미하는 값이다. <br/> <br/>
          for(int i = 0; i {"<"} array.length; i++){"{"}  <br/>
          &nbsp;&nbsp;System.out.println(array[i]); //array의 i번째 값을 출력 <br />
          {"}"}
        </CodeBlock>
        <br /> <br />
        또한 직접적으로 특정 변수에 array의 값들을 순차적으로 받아오는 방법이 있는데 <br />
        이를 향상된 for문이라고 한다. <br />
        <CodeBlock language="python">
          for 변수명 in array: <br />
          &nbsp;&nbsp; 코드
        </CodeBlock><br />
        <CodeBlock language="java">
          for(타입 변수명 : array){"{"}코드{"}"}
        </CodeBlock><br />
        이를 통해 인덱스로 한번 더 접근하는 불필요한 행동을 줄일 수 있다. <br />
        하지만 인덱스를 코드에서 사용해야할 때는 이 방법은 실용적이지 못하다.
      </TextBlockForm>

      <TextBlockForm title="2차원 배열" img={image03} removePTag={true} hasGap={false}>
        배열 안에 또 다른 배열을 쓰는 것을 이차원 배열이라고 한다. <br />
        이는 위 그림의 아파트처럼 행과 열이 있는 자료에 사용된다. <br />
        <br />
        <CodeBlock language="c">
          변수 타입 array[배열 크기1][배열 크기2];
        </CodeBlock><br />
        <CodeBlock language="java">
          변수 타입[][] array = new 변수 타입[배열 크기1][배열 크기2];
        </CodeBlock>
        ※java의 배열 크기2는 선언하지 않아도 사용할 수 있다. <br /><br />
        이를 통해 더욱 직관적인 자료구조를 가질 수 있다. <br />
        예를 들어 303호의 주민은 apartment[2][2]로 접근할 수 있다. <br />
      </TextBlockForm>

      <HighlightBlock type="addition" title="언어에 따른 이차원 배열의 차이">
        C언어에서 이차원 배열은 행 * 열의 일차원 배열을 이차원처럼 해석한 것이다. <br />
        고로 c에서 각기 다른 열을 가지게 선언할 수 없다. <br /><br />
        Java의 이차원 배열을 배열을 담은 일차원 배열을 의미한다. <br />
        그러므로 Java는 각 행에 대해 다른 열 갯수를 가진 배열을 담을 수 있다.
      </HighlightBlock>

      <TextBlockForm title="이중 for문" removePTag={true}>
        2차원 배열의 모든 정보를 탐색하기 위해서는 x, y 두가지의 변수로 배열을 순회해야한다. <br />
        이를 위해 이중 for문을 사용하게 된다. <br />
        <br />
        이중 for문은 for문 안에 또 다른 for문이 있는 것으로 다음과 같이 사용된다. <br />
        <CodeBlock language="java">
          for(int i = 0; i {"<"} 3; i++){"{"} <br/>
          &nbsp;&nbsp;for(int j = 0; j {"<"} 3; j++){"{"}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;array[i][j]<br/>
          &nbsp;&nbsp;{"}"}<br/>
          {"}"}
        </CodeBlock><br/>
        이를 통해 각각의 배열공간에 대한 연산이 가능하다. <br />
        <br />
        그리고 안쪽에 break를 시행하면 안의 for문만 종료되고 바깥의 for문은 다음 반복으로 넘어가게된다.
      </TextBlockForm>
    </PageForm>
  )
}