import { ReactNodeViewRenderer } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
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
import TiptapCodeBlockView from "shared/components/features/NodeViewCodeBlock";
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import {all, createLowlight} from 'lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import python from 'highlight.js/lib/languages/python'
import java from 'highlight.js/lib/languages/java'
import c from 'highlight.js/lib/languages/c'
import cpp from 'highlight.js/lib/languages/cpp'

const lowlight = createLowlight(all)

lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)
lowlight.register('python', python)
lowlight.register('java', java)
lowlight.register('c', c)
lowlight.register('cpp', cpp)

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

export const CustomCodeBlock = CodeBlockLowlight.extend({
  addAttributes() {
    return {
      language: {
        default: "plaintext",
        parseHTML: element => element.getAttribute("data-language"),
        renderHTML: attributes => ({ "data-language": attributes.language }),
      }
    }
  },
  addNodeView() {
    return ReactNodeViewRenderer(TiptapCodeBlockView);
  }
})

export const editorExtensions = [
  StarterKit.configure({
    orderedList: false,
    bulletList: false,
    codeBlock: false, 
    link : false,
    heading : false,
    listItem : false,
    blockquote : false,
    horizontalRule : false
  }),
  Image.configure({
    resize: {
      enabled: true,
      directions: ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
      minWidth: 50,
      minHeight: 50
    }
  }),
  Highlight.configure({
    multicolor: true,
  }),
  Color,
  Heading,
  TextStyleKit.configure({
    color : false
  }),
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
  TableKit.configure({
    table: { resizable: true },
  }),
  CustomCodeBlock.configure({
    lowlight: lowlight,
  })
]