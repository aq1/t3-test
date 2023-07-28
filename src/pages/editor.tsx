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
import { useEffect } from "react"
import { type EditorState } from "lexical"
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

export default function EditorView() {
  const initialConfig: InitialConfigType = {
    namespace: "RetryEditor",
    theme: {
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
    ],
    editorState: null,
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="flex h-screen w-screen items-center justify-center overflow-x-hidden py-10 text-white">
        <div className="relative min-h-max w-3/4 p-2">
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
      </div>
    </LexicalComposer>
  )
}
