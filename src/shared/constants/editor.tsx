import { ReactNodeViewRenderer } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import ResizeableNodeView from "features/Write/Components/ResizeableNodeView";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import Color from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import {TextStyleKit} from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Blockquote from "@tiptap/extension-blockquote";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import { TableKit } from "@tiptap/extension-table";

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
  }),
  Highlight.configure({
    multicolor: true,
  }),
  Color,
  Heading,
  TextStyleKit,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Blockquote,
  HorizontalRule,
  Link.configure({
    openOnClick: false,
    HTMLAttributes : {
      class : "editorLink"
    }
  }),
  ListItem,
  TableKit
]