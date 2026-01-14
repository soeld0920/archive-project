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
import { WriteModeProvider } from "./context/useWriteModeContext";

export default function WriteFeature({mode} : {mode : "write" | "edit"}){
  return(
    <WriteModeProvider initialMode={mode}>
      <EditorProvider>
        <WriteProvider>
          <WriteFeatureContent/>
        </WriteProvider>
      </EditorProvider>
    </WriteModeProvider>
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