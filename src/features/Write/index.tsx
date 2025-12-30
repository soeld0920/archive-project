/*
  글 작성 페이지
  url : /write
*/

import Wrapper from "shared/components/blocks/Wrapper";
import EditorToolbar from "./Components/EditorToolbar";
import WritingMetadata from "./Components/WritingMetadata";
import ContentEditor from "./Components/ContentEditor";
import { EditorProvider } from "./context/useEditorContext";
import { TextStyleProvider } from "./context/useTextStyleContext";
import Tags from "./Components/Tags/Index";
import { WriteProvider } from "./context/useWriteContext";

export default function WriteFeature(){
  return(
    <EditorProvider>
      <WriteProvider>
        <WriteFeatureContent/>
      </WriteProvider>
    </EditorProvider>
  )
}

function WriteFeatureContent(){
  return(
    <>
      <TextStyleProvider>
        <EditorToolbar/>
      </TextStyleProvider>
      <main style={{backgroundColor: "#fafafa"}}>
        <Wrapper>
          <WritingMetadata/>
          <ContentEditor/>
          <Tags/>
        </Wrapper>
      </main>
    </>
  )
}