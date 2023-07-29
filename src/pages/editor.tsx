import {
  type InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer"
import { AutoLinkNode, LinkNode } from "@lexical/link"
import ToolbarPlugin from "~/components/editor/ToolbarPlugin"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useEffect, useRef } from "react"
import { type EditorState, type NodeKey } from "lexical"
import CollapsiblePlugin from "~/components/editor/CollapsiblePlugin"
import { CollapsibleContainerNode } from "~/components/editor/CollapsiblePlugin/CollapsibleContainerNode"
import { CollapsibleContentNode } from "~/components/editor/CollapsiblePlugin/CollapsibleContentNode"
import { CollapsibleTitleNode } from "~/components/editor/CollapsiblePlugin/CollapsibleTitleNode"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin"
import { ListPlugin } from "@lexical/react/LexicalListPlugin"
import { ListItemNode, ListNode } from "@lexical/list"
import DragDropPastePlugin from "~/components/editor/DragDropPastePlugin"
import ImagePlugin from "~/components/editor/ImagePlugin"
import AutoLinkPlugin from "~/components/editor/AutoLinkPlugin"
import { HeadingNode, type HeadingTagType } from "@lexical/rich-text"
import LexicalTableOfContents from "@lexical/react/LexicalTableOfContents"
import { cn } from "~/lib/utils"

// function JSONView() {
//   const [editor] = useLexicalComposerContext()
//   const [state, setState] = useState<SerializedEditorState>()
//
//   useEffect(() => {
//     return editor.registerUpdateListener(({ editorState }) => {
//       const j = editorState.toJSON()
//       setState(j)
//       localStorage.setItem("editor", JSON.stringify(j))
//     })
//   }, [editor])
//   return (
//     <pre className="h-full w-full overflow-y-scroll rounded-xl border-2 border-red-400">
//       {JSON.stringify(state, null, 1)}
//     </pre>
//   )
// }

function onChange(editorState: EditorState) {
  localStorage.setItem("editor", JSON.stringify(editorState))
}

function LocalStoragePlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!localStorage?.editor) {
      return
    }
    const state = editor.parseEditorState(localStorage?.editor as string)
    editor.setEditorState(state)
  }, [editor])

  return null
}

type TableOfContentsEntry = [key: NodeKey, text: string, tag: HeadingTagType]

function TableOfContents({
  tableOfContents,
}: {
  tableOfContents: Array<TableOfContentsEntry>
}) {
  const [editor] = useLexicalComposerContext()
  const selectedIndex = useRef(0)

  function scrollToNode(key: NodeKey, currIndex: number) {
    editor.getEditorState().read(() => {
      const domElement = editor.getElementByKey(key)
      if (domElement !== null) {
        domElement.scrollIntoView()
        selectedIndex.current = currIndex
      }
    })
  }

  return (
    <div className="border-l border-gray-200 pt-5">
      {tableOfContents.map(([key, text, tag], index) => (
        <div
          key={key}
          onClick={() => scrollToNode(key, index)}
          className={cn(tag === "h2" ? "px-2" : "", tag === "h3" ? "px-4" : "")}
        >
          {text}
        </div>
      ))}
    </div>
  )
}

export default function EditorView() {
  const initialConfig: InitialConfigType = {
    namespace: "RetryEditor",
    theme: {
      heading: {
        h1: "text-3xl",
        h2: "text-2xl",
        h3: "text-xl",
      },
      link: "text-green-500",
      text: {
        bold: "font-bold",
        italic: "italic",
        underline: "underline",
      },
    },
    onError() {},
    nodes: [
      LinkNode,
      ListNode,
      ListItemNode,
      CollapsibleContainerNode,
      CollapsibleContentNode,
      CollapsibleTitleNode,
      // ImageNode,
      AutoLinkNode,
      HeadingNode,
    ],
    editorState: null,
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="flex justify-center gap-5 px-16 text-gray-100">
        <div className=" flex-grow-0 basis-1/4">
          <div className="sticky top-0">
            <LexicalTableOfContents>
              {(tableOfContents) => {
                return <TableOfContents tableOfContents={tableOfContents} />
              }}
            </LexicalTableOfContents>
          </div>
        </div>
        <div className="relative">
          <ToolbarPlugin />
          <OnChangePlugin onChange={onChange} />
          <CollapsiblePlugin />
          <LocalStoragePlugin />
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="h-full w-full rounded-xl rounded-t-none bg-gray-400 px-4 py-6 focus:outline-none" />
            }
            placeholder={
              <div className="pointer-events-none absolute top-12 px-4 py-6 text-gray-200">
                <p className="text-base">Начни добавление текста</p>
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <DragDropPastePlugin />
          <ImagePlugin />
          <LinkPlugin validateUrl={() => true} />
          <AutoLinkPlugin />
          <ListPlugin />
          <HistoryPlugin />
        </div>
        <div className="flex-grow-0 basis-1/4"></div>
      </div>
    </LexicalComposer>
  )
}
