import {
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  ElementNode,
  type LexicalCommand,
  type NodeKey,
} from "lexical"
import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

export interface ImagePayload {
  altText: string
  caption?: string
  height?: number
  key?: NodeKey
  maxWidth?: number
  showCaption?: boolean
  src: string
  width?: number
  captionsEnabled?: boolean
}

export const INSERT_IMAGE_COMMAND: LexicalCommand<ImagePayload> = createCommand(
  "INSERT_IMAGE_COMMAND"
)

export class ImageNode extends ElementNode {
  static getType() {
    return "image"
  }
  createDOM(): HTMLElement {
    const div = document.createElement("div")
    div.className = "w-full flex justify-center"
    const img = document.createElement("img")
    div.appendChild(img)
    return div
  }

  updateDOM(): boolean {
    return false
  }
}

export default function ImagePlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerCommand<ImagePayload>(
      INSERT_IMAGE_COMMAND,
      (payload: ImagePayload) => {
        console.log(payload)
        return true
        // const imageNode = $createImageNode(payload)
        // $insertNodes([imageNode])
        // if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
        //   $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd()
        // }
        //
        // return true
      },
      COMMAND_PRIORITY_EDITOR
    )
  }, [editor])
  return null
}
