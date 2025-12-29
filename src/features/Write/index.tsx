/*
  글 작성 페이지
  url : /write
*/

import Wrapper from "shared/components/blocks/Wrapper";
import EditorToolbar from "./Components/EditorToolbar";
import WritingMetadata from "./Components/WritingMetadata";
import ContentEditor from "./Components/ContentEditor";
import TagInput from "./Components/TagInput";
import { EditorProvider } from "./context/useEditorContext";

export default function WriteFeature(){
  return(
    <EditorProvider>
      <WriteFeatureContent/>
    </EditorProvider>
  )
}

function WriteFeatureContent(){
  return(
    <>
      <EditorToolbar/>
      <main>
        <Wrapper>
          <WritingMetadata/>
          <ContentEditor/>
          <TagInput/>
        </Wrapper>
      </main>
    </>
  )
}