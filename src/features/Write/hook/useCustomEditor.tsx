import { useEditor } from "@tiptap/react";
import { useMessageContext } from "app/providers/message";
import { editorExtensions } from "shared/constants/editor";
import type { Level } from "@tiptap/extension-heading";

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
  const handleBold = () => {
    editor?.chain().focus().toggleBold().run();
  }
  const handleItalic = () => {
    editor?.chain().focus().toggleItalic().run();
  }
  const handleUnderline = () => {
    editor?.chain().focus().toggleUnderline().run();
  }
  const handleStrike = () => {
    editor?.chain().focus().toggleStrike().run();
  }
  const handleTextColor = (color : string) => {
    editor?.chain().focus().setColor(color).run();
  }
  const resetTextColor = () => {
    editor?.chain().focus().unsetColor().run();
  }
  const handleHighlight = (color : string) => {
    editor?.chain().focus().setHighlight({ color: color }).run();
  }
  const resetHighlight = () => {
    editor?.chain().focus().unsetHighlight().run();
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
  const handleHorizontalRule = () => {
    editor?.chain().focus().setHorizontalRule().run();
  }
  //링크
  const handleLink = (href : string) => {
    editor?.chain().focus().setLink({ href: href }).run();
  }
  const resetLink = () => {
    editor?.chain().focus().unsetLink().run();
  }
  //목록
  const handleOrderedList = () => {
    editor?.chain().focus().toggleOrderedList().run();
  }
  const handleBulletList = () => {
    editor?.chain().focus().toggleBulletList().run();
  }
  //표
  const handleTable = () => {
    editor?.chain().focus().toggleTable().run();
  }
  const handleTableCell = () => {
    editor?.chain().focus().toggleTableCell().run();
  }
  const handleTableHeader = () => {
    editor?.chain().focus().toggleTableHeader().run();
  }
  const handleTableBody = () => {
    editor?.chain().focus().toggleTableBody().run();
  }
  const handleTableFooter = () => {
    editor?.chain().focus().toggleTableFooter().run();
  }
  const handleTableRow = () => {
    editor?.chain().focus().toggleTableRow().run();
  }
  const handleTableColumn = () => {
    editor?.chain().focus().toggleTableColumn().run();
  }
}