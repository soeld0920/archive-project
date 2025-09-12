import image01 from "assets/img/basic/04_01.png"
import PageForm from "components/blocks/PageForm";
import TextBlockForm from "components/blocks/TextBlockForm";
import { Table, type ColumnProps, type TableData } from "components/blocks/Table";
import HighlightBlock from "components/blocks/HighlightBlock";
import { CSpage04 } from "content/page";

type Row = {
  category : string;
  operater : string;
  name : string;
  intro : string;
  ableType : string;
  etc : string;
}

const columns : ColumnProps<Row>[] = [
  {
    key : "category",
    title : "대분류",
    mergerBy : true,
    weight : 700,
    width : "5rem",
    align : "center"
  },
  {
    key : "operater",
    title : "연산자"
  },
  {
    key : "name",
    title : "이름"
  },
  {
    key : "intro",
    title : "설명"
  },
  {
    key : "ableType",
    title : "연산 가능 타입"
  },
  {
    key : "etc",
    title : "비고"
  }
]

const tableContent : TableData<Row> = {
  columns : columns,
  datas : [
    {
      category : "산술연산자",
      operater : "+",
      name : "-",
      intro : "두 변수의 합을 반환한다",
      ableType : "정수형, 실수형, 문자형",
      etc : "-"
    },
    {
      category : "산술연산자",
      operater : "-",
      name : "-",
      intro : "두 변수의 차를 반환한다",
      ableType : "정수형, 실수형",
      etc : "-"
    },
    {
      category : "산술연산자",
      operater : "*",
      name : "-",
      intro : "두 변수의 곱을 반환한다",
      ableType : "정수형, 실수형",
      etc : "python에는 문자열의 반복으로 사용 가능하다."
    },
    {
      category : "산술연산자",
      operater : "/",
      name : "-",
      intro : "두 변수간의 나누기를 한 값을 반환한다",
      ableType : "정수형, 실수형",
      etc : "정수형간의 나눗셈 연산 시 값의 정수 부분만 남는다.(언어마다 상의)"
    },
    {
      category : "산술연산자",
      operater : "%",
      name : "나머지 연산자",
      intro : "두 변수 간의 나누기를 한 나머지를 반환한다.",
      ableType : "정수형, 실수형",
      etc : "-"
    },
    {
      category : "비교연산자",
      operater : "==",
      name : "-",
      intro : "두 값이 같으면 true를, 아니면 false를 반환한다.",
      ableType : "모든 타입",
      etc : "참조형 변수의 경우 원하는 결과가 나오지 않을 수 있다."
    },
    {
      category : "비교연산자",
      operater : ">, <",
      name : "-",
      intro : "왼쪽의 / 오른쪽의 값이 더 크면 true를, 아니면 false를 반환한다.",
      ableType : "정수형, 실수형",
      etc : "-"
    },
    {
      category : "비교연산자",
      operater : ">=, <=",
      name : "-",
      intro : "왼쪽의 / 오른쪽의 값이 더 크거나 같으면 true를, 아니면 false를 반환한다.",
      ableType : "정수형, 실수형",
      etc : "-"
    },
    {
      category : "비교연산자",
      operater : "!=",
      name : "-",
      intro : "두 값이 다르면 true를, 아니면 false를 반환한다.",
      ableType : "모든 타입",
      etc : "참조형 변수의 경우 원하는 결과가 나오지 않을 수 있다."
    },
    {
      category : "논리연산자",
      operater : "&&",
      name : "and 연산자",
      intro : "양 옆의 값이 다 true이면 true를, 하나 이상이 false이면 false를 반환한다.",
      ableType : "논리형",
      etc : "앞의 값이 false이면 그 즉시 false를 반환한다."
    },
    {
      category : "논리연산자",
      operater : "||",
      name : "or 연산자",
      intro : "양 옆의 값이 다 false이면 false를,  하나 이상이 true이면 true를 반환한다.",
      ableType : "논리형",
      etc : "앞의 값이 true이면 그 즉시 true를 반환한다."
    },
    {
      category : "논리연산자",
      operater : "!",
      name : "NOT 연산자",
      intro : "값 앞에 선언하며, 값이 true이면 false를, false이면 true를 반환한다.",
      ableType : "논리형",
      etc : "-"
    },
    {
      category : "대입연산자",
      operater : "=",
      name : "대입자",
      intro : "왼쪽 변수에 오른쪽 값을 대입한다.",
      ableType : "-",
      etc : "왼쪽에는 변수 하나만 존재해야한다."
    },
    {
      category : "대입연산자",
      operater : "+=, -=...",
      name : "-",
      intro : "왼쪽 변수에 기본 값과 오른쪽 값이랑 연산한 값을 대입한다.",
      ableType : "-",
      etc : "왼쪽에는 변수 하나만 존재해야한다."
    },
    {
      category : "증감연산자",
      operater : "++,--",
      name : "증감연산자",
      intro : "변수에 바로 붙여서 사용하며 변수의 값을 1 증가/감소 시킨다.",
      ableType : "정수형, 실수형",
      etc : "앞에 선언하는 거와 뒤에 선언하는 것이 효과가 다르다."
    },
    {
      category : "괄호",
      operater : "()",
      name : "괄호",
      intro : "괄호 내의 연산을 우선하도록 한다.",
      ableType : "-",
      etc : "-"
    },
  ],
  caption : {
    text : "연산자 총 정리",
  },
  getRowId : (data) => data.operater
}

export default function Basic04(){
  return(
    <PageForm page={CSpage04}>

      <TextBlockForm title="연산자란?" hasGap = {false}>
        "7+3", "3*4"와 같이 두 변수 간의 연산을 실행하는 기호들을 말한다. <br />
        연산자의 종류로는 대입 연산자, 산술 연산자, 비교 연산자, 증감 연산자, 비트 연산자 등이 존재한다.
      </TextBlockForm>

      <HighlightBlock type='exception'>
        프로그래밍 언어마다 존재하거나 존재하지 않는 연산자가 있다.<br />
        Python에는 증감 연산자가 없으며 C언어에는 몇몇 대입 연산자가 존재하지 않는다.<br />
        이는 연산자에만 해당하는 말은 아니고 추후에 배울 개념들 또한 언어에 따라 존재하지 않을 수 있다.<br />
        <br />
        이 문서에서는 대부분의 언어에 존재하는 개념을 정리해두었으니, 특정 언어의 개념을 공부하고자 한다면 해당 언어의 문서로 가기를 바란다.
      </HighlightBlock>

      <Table<Row> columns={tableContent.columns} datas={tableContent.datas} caption={tableContent.caption}/>

      <TextBlockForm title="산술 연산자">
        수학의 기초적인 연산(더하기, 빼기, 곱하기, 나누기)를 시행하는 연산자이다.<br />
        사용법은 변수 a, b에 대해 a+b와 같이 사용한다.<br />
        정수형끼리의 나머지 연산은 C와 Java에서 정수 부분만을 반환하지만 Python은 실수 전체를 반환한다.
      </TextBlockForm>

      <TextBlockForm title="비교 연산자">
        두 변수의 값을 비교하여 해당 연산이 올바른지(true) 올바르지 않은지(false)를 반환한다.<br />
        사용법은 {"a >= b"}와 같이 사용한다.<br />
        참고로 =는 대입 연산자라 에러를 일으키니 반드시 ==를 써야한다.<br />
        참조형 변수의 비교는 ==으로 할 시 두 값이 같아도 false를 반환할 수 있다. 이를 해결하는 법은 각 언어에서 설명하겠다.
      </TextBlockForm>

      <TextBlockForm title="논리 연산자">
        "조건식1과 조건식2가 전부 만족할 때"와 같이 조건식 여러개를 사용할때 주로 사용된다.<br />
        a && b처럼 사용하며 만약 3개 이상의 조건식을 사용하면 a && (b || c)처럼 먼저 검사할 조건에 ()를 사용해야한다.<br />
        a && b에서 a가 false이면 b의 참거짓에 상관없이 거짓이므로 b 조건을 검사하지 않고 false를 반환한다.<br />
        이는 ||에서도 마찬가지이다.
      </TextBlockForm>

      <TextBlockForm title="대입연산자">
        a = (식, 값)으로 사용하며 우항의 모든 연산을 마친 뒤 좌항에 값을 대입한다.<br />
        기존 변수의 값은 제거되지만, += -=과 같은 대입자는 기존의 값에서 우항의 값과 연산한 값을 저장한다.<br />
        예를 들어 변수 a가 5인 상황에서 a+=1;을 하면 a는 6이 된다.
      </TextBlockForm>

      <TextBlockForm title="증감연산자" img={image01}>
        변수 앞 또는 뒤에 사용 가능하며 변수의 값을 1 증가하거나 감소한다.<br />
        앞에 사용하는 거에 뒤에 사용하는 거는 큰 차이가 있다.<br />
        예{")"} a가 5인 상황에서 b = ++a의 경우 b가 6이 되며 b = a++의 경우 b는 5이다.
      </TextBlockForm>

    </PageForm>
  )
}