import image01 from "assets/img/basic/01_01.png"
import image02 from "assets/img/basic/01_02.png"
import image03 from "assets/img/basic/01_03.png"
import HighlightBlock from "components/blocks/HighlightBlock"
import PageForm from "components/blocks/PageForm"
import TextBlockForm from "components/blocks/TextBlockForm"
import { CSpage01 } from "content/page"

export default function Basic01(){
  return (
    <PageForm page={CSpage01}>
      <TextBlockForm title="프로그래밍이란">
        1차 산업 혁명은 대량 생산을 이끌고 규모의 경제 및 자동화의 욕구를 생성했다. <br />
        하지만 자동화를 위해서는 여러 논리 연산, 데이터 예측, 대규모 데이터 처리가 필요해졌다.<br />
        이를 인간의 힘만으로는 해결할 수 없는 영역이기에 산업의 발전은 멈출 줄 알았다.<br />
        하지만 컴퓨터의 발명으로 인해 인류는 제 3차 산업 혁명을 격고 자동화의 시대에 돌입할 수 있었다.<br />
        <br />
        그러나, 컴퓨터의 활용은 기존 언어와의 큰 차이점을 가졌고, 이는 프로그래밍의 필요를 불러왔다.<br />
        프로그래밍이란 간단히 말해서는 컴퓨터에게 명령하는 법을 배우는 학문이다.<br />
        간단하게는 계산기, 데이터 저장을 시작으로 데이터 가공, 최적화를 넘어 인류를 표방하는 AI 등 여러 명령이 가능하다.<br />
        <br />
        AI의 잠재력 등 컴퓨터의 잠재력은 인간이 예측하기에는 불가능한 수준에 존재한다. <br />
        하지만 이를 명령하기 위해서는 프로그래밍 학문에 대한 방대한 지식이 필요하다.<br />
        모든 학문이든 시작이 어렵지만, 배움을 개을히 하지 않으면 언젠가는 체화하고 습득할 수 있다.
      </TextBlockForm>

      <TextBlockForm title="컴퓨터의 작동 원리" img={image01}>
        컴퓨터가 작동하는 방식은 전기의 유무를 이용한다. 각 전자가 들어갈 칸이 있는 컴퓨터는 작동에 따라 각 칸에 전자가 있거나 없을 수 있다.<br />
        이때 각 저장소에서 전자가 없으면 false(거짓), 0이라 표현하고 전자가 있으면 true(참), 1이라고 표현한다.<br />
      </TextBlockForm>
      
      <TextBlockForm title="" img={image02}>
        이때 데이터를 저장할 때에 "이진수"라는 기법을 이용한다. 인간이 수를 표현하는 방법인 십진수와는 다르게 각 자리가 2마다 바뀌는 체계이다.<br />
        이는 각 자리를 0과 1 두가지로만 저장 가능한 컴퓨터에게 적절한 수 표현 방법이다.<br />
        그리고 기존 인간의 수 체계와 같은 사칙연산이 가능하여 여러 연산에도 이용 가능하다.<br />
        수 이외의 저장방식은 추후에 다루어보도록 하겠다.
      </TextBlockForm>

      <TextBlockForm title="컴퓨터의 일처리" img={image03} hasGap={false}>
        컴퓨터는 인간의 기초 지식(도덕, 습관)등이 없으므로 명령된대로만 작업을 처리한다. <br />
        그리고 각 작업은 순차적으로 처리되므로 기본적으로 하나의 작업이 실행됩니다. <br />
        기본적으로 작업 순서는 프로그래밍의 코드 순서를 따라가지만 우선적으로 작업되는 경우도 있다.
      </TextBlockForm>

      <HighlightBlock type="exception">
        프로그램의 이런 작업 과정이 다소 비효율적이기에 이를 효율적으로 만든 "비동기 프로그램"이 존재합니다.
        이는 작업이 끝나기전에 다음 작업을 진행하는 프로그램을 말합니다.
      </HighlightBlock>
    </PageForm>
  )
}