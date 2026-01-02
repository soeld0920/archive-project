import { useEditor } from "@tiptap/react";
import { useMessageContext } from "app/providers/message";
import { editorExtensions } from "shared/constants/editor";
import type { Level } from "@tiptap/extension-heading";
import type { TextStyle } from "../types/TextStyle";

export default function useCustomEditor(){
  const editor = useEditor({
    extensions: editorExtensions,
  })
  const [messageApi] = useMessageContext();

  //글 크기, 폰트 조절
  const handleHeading = (level : number) => {
    editor?.chain().focus().toggleHeading({ level : level as Level }).run();
  }
  const handleFontStyle = (style : string) => {
    editor?.chain().focus().setFontFamily(style).run();
  }
  const handleFontSize = (size : number) => {
    editor?.chain().focus().setFontSize(size + "px").run();
  }

  //글 스타일 
  const handleBold = (bold? : boolean) => {
    if(bold == undefined) {
      editor?.chain().focus().toggleBold().run();
    } else {
      if(bold) {
        editor?.chain().focus().setBold().run();
      } else {
        editor?.chain().focus().unsetBold().run();
      }
    }
  }
  const handleItalic = (italic? : boolean) => {
    if(italic == undefined) {
      editor?.chain().focus().toggleItalic().run();
    } else {
      if(italic) {
        editor?.chain().focus().setItalic().run();
      } else {
        editor?.chain().focus().unsetItalic().run();
      }
    }
  }
  const handleUnderline = (underline? : boolean) => {
    if(underline == undefined) {
      editor?.chain().focus().toggleUnderline().run();
    } else {
      if(underline) {
        editor?.chain().focus().setUnderline().run();
      } else {
        editor?.chain().focus().unsetUnderline().run();
      }
    }
  }
  const handleStrike = (strikeout? : boolean) => {
    if(strikeout == undefined) {
      editor?.chain().focus().toggleStrike().run();
    } else {
      if(strikeout) {
        editor?.chain().focus().setStrike().run();
      } else {
        editor?.chain().focus().unsetStrike().run();
      }
    }
  }
  const handleTextColor = (color? : string) => {
    if(color == undefined) {
      editor?.chain().focus().unsetColor().run();
    } else {
      editor?.chain().focus().setColor(color).run();
    }
  }
  const handleHighlight = (color? : string) => {
    if(color == undefined) {
      editor?.chain().focus().unsetHighlight().run();
    } else {
      editor?.chain().focus().setHighlight({ color: color }).run();
    }
  }
  const handleCode = () => {
    editor?.chain().focus().toggleCode().run();
  }
  //글 정렬
  const handleLeftAlign = () => {
    editor?.chain().focus().setTextAlign("left").run();
  }
  const handleCenterAlign = () => {
    editor?.chain().focus().setTextAlign("center").run();
  }
  const handleRightAlign = () => {
    editor?.chain().focus().setTextAlign("right").run();
  }
  const resetAlign = () => {
    editor?.chain().focus().unsetTextAlign().run();
  }
  //사진
  const handleImage = (src : string) => {
    editor?.chain().focus().setImage({ src: src }).run();
  }
  //동영상
  const handleVideo = (src : string) => {
    messageApi.open({type : "error", content : "동영상 업로드 기능은 현재 지원하지 않습니다.", duration : 2});
  }
  //인용
  const handleBlockquote = () => {
    editor?.chain().focus().toggleBlockquote().run();
  }
  //수평선
  const handleHorizontalRule = (type : "long" | "short" | "think") => {
    const className = type === "long" ? "editorLongHorizontalRule" 
    : type === "short" ? "editorShortHorizontalRule" 
    : "editorThinkHorizontalRule" 
    
    editor?.chain().focus().insertContent({
      type: 'horizontalRule',
      attrs: { class: className }
    }).run();
  }
  //링크
  const insertLink = (href : string, title : string) => {
    editor?.chain().focus().insertContent({type : "text", text : title, marks : [{type : "link", attrs : {href : href}}]}).run();
  }
  //목록
  const handleOrderedList = () => {
    editor?.chain().focus().toggleOrderedList().run();
  }
  const handleBulletList = () => {
    editor?.chain().focus().toggleBulletList().run();
  }
  //표
  const insertTable = (row : number, column : number) => {
    editor?.chain().focus().insertTable({ rows: row, cols: column }).run();
  }
  //todo : 코드블럭, 실행터미널, 객체 설명, 커스텀 박스

  const handleSubmit = () => {
    console.log(editor?.getJSON());
  }

  //TextStyle로 현 상황 즉시 업데이트
  const updateTextStyle = (ts : TextStyle) => {
    if(ts.textRole.code === "h1") {
      handleHeading(1);
    } else if(ts.textRole.code === "h2") {
      handleHeading(2);
    } else if(ts.textRole.code === "h3") {
      handleHeading(3);
    }

    handleFontStyle(ts.fontFamily.key);
    handleFontSize(ts.size);
    handleBold(ts.bold);
    handleItalic(ts.italic);
    handleUnderline(ts.underline);
    handleStrike(ts.strikeout);
    handleTextColor(ts.color ?? undefined);
    handleHighlight(ts.highlight ?? undefined);
    if(ts.align == "left") {
      handleLeftAlign();
    } else if(ts.align == "center") {
      handleCenterAlign();
    } else if(ts.align == "right") {
      handleRightAlign();
    } else{
      resetAlign();
    }
  }
  return {
    handleHeading,
    handleFontStyle,
    handleFontSize,
    handleBold,
    handleItalic,
    handleUnderline,
    handleStrike,
    handleTextColor,
    handleHighlight,
    handleCode,
    handleLeftAlign,
    handleCenterAlign,
    handleRightAlign,
    resetAlign,
    handleImage,
    handleVideo,
    handleBlockquote,
    handleHorizontalRule,
    insertLink,
    handleOrderedList,
    handleBulletList,
    insertTable,
    handleSubmit,
    updateTextStyle,
    editor
  }
}