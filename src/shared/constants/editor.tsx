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
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import { TableKit } from "@tiptap/extension-table";
import { ListItem } from "@tiptap/extension-list";

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

export const CustomClassHorizontalRule = HorizontalRule.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class : {
        default: null,
        parseHTML: element => element.getAttribute('class'),
        renderHTML: attributes => {
          if (!attributes.class) return {};
          return { class: attributes.class };
        }
      }
    }
  }
})

export const editorExtensions = [
  StarterKit.configure({
    orderedList: false,
    bulletList: false,
  }),
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
  CustomClassHorizontalRule,
  Link.configure({
    openOnClick: false,
    HTMLAttributes : {
      class : "editorLink"
    }
  }),
  BulletList.configure({
    HTMLAttributes : {
      class : "bullet-list"
    }
  }), 
  OrderedList.configure({
    HTMLAttributes : {
      class : "ordered-list"
    }
  }), 
  ListItem,
  TableKit
]