import image01 from 'assets/img/basic/03_01.png'
import image02 from 'assets/img/basic/03_02.png'
import image03 from 'assets/img/basic/03_03.png'
import HighlightBlock from 'components/blocks/HighlightBlock'
import PageForm from 'components/blocks/PageForm'
import { Table, type ColumnProps, type TableData } from 'components/blocks/Table'
import TextBlockForm from 'components/blocks/TextBlockForm'
import { CSpage03 } from 'content/page'
import { Link } from 'react-router-dom'

type Row = {
  category : string;
  name : string;
  storageSize : string;
  valueSize : string;
  etc : string;
}

const columns : ColumnProps<Row>[] = [
  {
    key : "category",
    title : "대분류",
    mergerBy : true,
  },
  {
    key : "name",
    title : "타입명",
  },
  {
    key : "storageSize",
    title : "저장 공간 크기",
  },
  {
    key : "valueSize",
    title : "값의 최대 크기",
  },
  {
    key : "etc",
    title : "비고",
  }
]

const table : TableData<Row> = {
  columns : columns,
  datas : [
    {
      category : "정수형",
      name : "byte",
      storageSize : "1 byte",
      valueSize : '-128 ~ 127',
      etc : "-"
    },
    {
      category : "정수형",
      name : "short",
      storageSize : "2 byte",
      valueSize : '-32,768 ~ 32,767',
      etc : "-"
    },
    {
      category : "정수형",
      name : "int",
      storageSize : "4 byte",
      valueSize : '-2,147,483,648 ~ 2,147,483,647',
      etc : "-"
    },
    {
      category : "정수형",
      name : "long",
      storageSize : "8 byte",
      valueSize : '≈ ±922경',
      etc : "-"
    },
    {
      category : "실수형",
      name : "float",
      storageSize : "4 byte",
      valueSize : '≈ ±3.4 * 10^38',
      etc : "소숫점 7자리까지 유효함"
    },
    {
      category : "실수형",
      name : "double",
      storageSize : "8 byte",
      valueSize : '≈ ±1.7 * 10^308',
      etc : "소숫점 15자리까지 유효함"
    },{
      category : "문자형",
      name : "char",
      storageSize : "2 byte",
      valueSize : '문자 1개',
      etc : "유니코드 문자"
    },
    {
      category : "문자형",
      name : "String",
      storageSize : "가변(길이에 따라 다름)",
      valueSize : '-',
      etc : "참조형"
    },
    {
      category : "진리형",
      name : "boolean",
      storageSize : "언어마다 다름",
      valueSize : 'true / false',
      etc : "크기·표현은 언어/구현별 상이"
    }
  ],
  caption : {
    text : "변수 타입 요약",
  },
  getRowId : (val : Row) => val.name
}

export default function Basic03(){
  return(
    <PageForm page={CSpage03}>
      <TextBlockForm title="변수란?" img={image01}>
        변수란 값을 담는 저장공간을 의미한다. 이 저장공간은 컴퓨터에 저장되어 작업 중에 호출하여 사용할 수 있다. <br />
        담을 수 있는 변수의 종류는 크게 숫자와 문자, 진리(참, 거짓)뿐이지만 여러 변수를 한 변수에 담는 방법 또한 존재한다.
      </TextBlockForm>

      <TextBlockForm title="변수의 종류" img={image02}>
        변수는 크게 "기본형 변수"와 "참조형 변수"로 나뉜다.<br />
        기본형 변수는 변수를 저장할 위치에 값을 그대로 저장하는 종류의 변수를 의미한다.<br />
        참조형 변수는 값을 임의의 공간에 저장하고 그 값의 시작점을 저장하는 종류의 변수를 의미한다.<br />
        주로 참조형 변수는 길이가 있는(문자열, 배열 등) 변수이다.
      </TextBlockForm>

      <HighlightBlock type='addition' title='저장공간의 차이'>
        메모리(데이터를 저장하는 위치)는 크게 스택(Stack), 힙(Heap), 매서드(Method Area)로 이루어져있다.<br />
        이때 기본형 변수와 참조형 변수의 시작점을 저장하는 변수는 스택 영역에 저장되고<br />
        참조형 변수의 값등은 Heap 영역에 저장된다.<br />
        오른쪽으로 갈 수록 더욱 장기적으로 기억되며 삭제되지 않는다.
      </HighlightBlock>

      <Table columns={table.columns} datas={table.datas} caption={table.caption} getRowId={table.getRowId}/>
      
      <TextBlockForm title='변수의 종류'>
        정수형 : 정수를 담을 수 있습니다.<br />
        실수형 : 실수를 담을 수 있습니다.<br />
        문자형 : "ㄱ","A"와 같은 문자를 담을 수 있습니다.<br />
        진리형 : 참, 거짓을 담을 수 있습니다.
      </TextBlockForm>
      
      <TextBlockForm title='아스키코드와 UTF' img={image03}>
        컴퓨터는 모든 정보를 0과 1로만 저장한다.<br />
        이때문에 문자를 직접 저장할 수는 없으므로 각 문자마다 숫자를 할당해두었다.<br />
        이를 아스키코드라고 한다.<br />
        <br />
        컴퓨터의 발전 이후 약 512개의 숫자만으로는 모든 문자를 설명할 수 없어졌다.<br />
        이때문에 저장공간을 2byte로 늘리고 모든 문자(한글, 일본어 등등)를 담기 위함 문자 채계가 필요해졌다.<br />
        이를 구현한 것이 유니코드(UTF)이다.
      </TextBlockForm>

      <HighlightBlock type='addition' title='UTF-8, UTF-16'>
        유니코드(UTF)뒤의 숫자는 각 문자가 몇 비트로 저장될 지를 표시한다.<br />
        아스키코드와 호환성이 높은 UTF-8이 주로 이용되며<br />
        여러 이모티콘등이 포함된 UTF-16 또한 이용된다.
      </HighlightBlock>

      <h3>추가 자료 : 아스키코드 표</h3>
      <Link to="">{`아스키코드 표 보러가기>`}</Link>

      
    </PageForm>
  )
}