import { ReactNodeViewRenderer } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import ResizeableNodeView from "features/Write/Components/ResizeableNodeView";
import Image from "@tiptap/extension-image";

export const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: 'auto',
      },
      height: {
        default: 'auto',
      },
    }
  },
  addNodeView() {
    return ReactNodeViewRenderer(ResizeableNodeView);
  }
})

export const editorExtensions = [
  StarterKit,
  ResizableImage.configure({
    allowBase64: false,
    inline : false
  })
]