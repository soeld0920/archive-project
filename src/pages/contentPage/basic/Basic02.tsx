import image01 from "assets/img/basic/02_01.jpg"
import image02 from "assets/img/basic/02_02.png"
import image03 from "assets/img/basic/02_03.png"
import HighlightBlock from "components/blocks/HighlightBlock"
import PageForm from "components/blocks/PageForm"
import TextBlockForm from "components/blocks/TextBlockForm"
import { CSpage02 } from "content/page"

export default function Basic02(){
  return (
    <PageForm page={CSpage02}>

      <TextBlockForm title="비트(bit)와 바이트(byte)" img={image01} hasGap={false}>
        1편에서 컴퓨터는 각 칸에 전자를 담아 0과 1로 저장한다고 하였다. 이때 이 칸을 비트(bit)라고 한다.<br />
        그러나 이 bit 하나로 표현 가능한 정보는 2개 (0,1)이므로 더 많은 데이터를 담기위해 바이트(byte)라는 개념을 만들었다.<br />
        바이트는 8개의 비트를 묶은 것으로 2^8개(256)의 데이터를 담을 수 있다.
      </TextBlockForm>

      <HighlightBlock type="addition" title="왜 8비트일까?">
        초기에는 6비트, 7비트 등 다양했다.
        그러다가 각 문자('A','V','$' 등등)을 표현할 때 필요한 양이 128~256개였었다.<br />
        이때 하나의 문자를 표현하기 위한 단위인 8비트가 보편적으로 사용되며 이가 현제의 1바이트가 되었다.<br />
        그리고 8이 2의 세제곱수이므로 다루기 쉬웠으므로 보편적으로 이용된다.
      </HighlightBlock>

      <TextBlockForm title="문장과 주석, ;" img={image02}>
        문장이란 컴퓨터가 처리하는 작업의 단위이다.<br />
        대부분의 프로그램은 각 문장을 세미콜론(;)으로 끊어야 컴퓨터가 이를 인식할 수 있다.<br />
        <br />
        이때 컴퓨터에게 명령할 거는 아니지만 사람 간의 이해를 위해 주석을 이용할 수 있다.<br />
        주석은 컴퓨터에게 실행되지 않는 부분으로 주로 설명에 이용된다.
      </TextBlockForm>

      <TextBlockForm title="예약어" img={image03}>
        예약어란 프로그램에서 사용하기 위해 미리 선점한 단어이다. <br />
        이 단어들은 프로그램이 코드를 읽을 때 혼동을 막기 위해 몇몇 상황에서 사용이 불가하다.
      </TextBlockForm>
    </PageForm>
  )
}