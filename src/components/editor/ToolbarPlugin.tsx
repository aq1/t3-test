import * as Toolbar from "@radix-ui/react-toolbar"
import { TOGGLE_LINK_COMMAND } from "@lexical/link"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { INSERT_COLLAPSIBLE_COMMAND } from "~/components/editor/CollapsiblePlugin"
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical"
import { cn } from "~/lib/utils"
import { useEffect, useState } from "react"

function ParagraphButton() {
  return (
    <DropdownMenu.Root>
      <Toolbar.Button asChild>
        <DropdownMenu.Trigger className="rounded-md px-1 hover:bg-gray-500">
          <span className="flex items-baseline gap-1">
            <i className="ri-paragraph"></i>
            Параграф
            <i className="ri-arrow-down-s-line text-green-500"></i>
          </span>
        </DropdownMenu.Trigger>
      </Toolbar.Button>
      <DropdownMenu.Portal>
        <DropdownMenu.Content></DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
function FormatButtons() {
  const [editor] = useLexicalComposerContext()
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        const selection = $getSelection()
        setIsBold($isRangeSelection(selection) && selection?.hasFormat("bold"))
        setIsItalic(
          $isRangeSelection(selection) && selection?.hasFormat("italic")
        )
        setIsUnderline(
          $isRangeSelection(selection) && selection?.hasFormat("underline")
        )
        return false
      },
      COMMAND_PRIORITY_CRITICAL
    )
  }, [editor])

  return (
    <Toolbar.ToggleGroup
      type="multiple"
      aria-label="Text formatting"
      className="flex gap-2"
    >
      <Toolbar.ToggleItem
        value="bold"
        aria-label="Bold"
        className={cn(
          "rounded-md px-1 hover:bg-gray-500",
          isBold ? "bg-gray-500" : ""
        )}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
        }}
      >
        <i className="ri-bold"></i>
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem
        className={cn(
          "rounded-md px-1 hover:bg-gray-500",
          isItalic ? "bg-gray-500" : ""
        )}
        value="italic"
        aria-label="Italic"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
        }}
      >
        <i className="ri-italic"></i>
      </Toolbar.ToggleItem>
      <Toolbar.ToggleItem
        className={cn(
          "rounded-md px-1 hover:bg-gray-500",
          isUnderline ? "bg-gray-500" : ""
        )}
        value="strikethrough"
        aria-label="Strike through"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
        }}
      >
        <i className="ri-underline"></i>
      </Toolbar.ToggleItem>
    </Toolbar.ToggleGroup>
  )
}
function LinkButton() {
  const [editor] = useLexicalComposerContext()

  return (
    <Toolbar.Button
      className="rounded-md px-1 hover:bg-gray-500"
      onClick={() => {
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://")
      }}
    >
      <i className="ri-link"></i>
    </Toolbar.Button>
  )
}
function TextColorButton() {
  return (
    <Toolbar.Button className="rounded-md px-1 hover:bg-gray-500">
      <i className="ri-font-color"></i>
      <i className="ri-arrow-down-s-line text-green-500"></i>
    </Toolbar.Button>
  )
}
function BackgroundColorButton() {
  return (
    <Toolbar.Button className="rounded-md px-1 hover:bg-gray-500">
      <i className="ri-paint-fill"></i>
      <i className="ri-arrow-down-s-line text-green-500"></i>
    </Toolbar.Button>
  )
}
function ExtraFormatButton() {
  return (
    <DropdownMenu.Root>
      <Toolbar.Button asChild>
        <DropdownMenu.Trigger className="rounded-md px-1 hover:bg-gray-500">
          <span className="flex items-baseline gap-1">
            <i className="ri-font-size"></i>
            <i className="ri-arrow-down-s-line text-green-500"></i>
          </span>
        </DropdownMenu.Trigger>
      </Toolbar.Button>
      <DropdownMenu.Portal>
        <DropdownMenu.Content></DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
function PluginsDropdown() {
  const [editor] = useLexicalComposerContext()

  return (
    <DropdownMenu.Root>
      <Toolbar.Button asChild>
        <DropdownMenu.Trigger className="rounded-md px-1 hover:bg-gray-500">
          <span className="flex items-baseline gap-1">
            <i className="ri-add-line"></i>
            Вставить
            <i className="ri-arrow-down-s-line text-green-500"></i>
          </span>
        </DropdownMenu.Trigger>
      </Toolbar.Button>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="cursor-pointer bg-gray-400 text-gray-100">
          <DropdownMenu.Item
            onClick={() =>
              editor.dispatchCommand(INSERT_COLLAPSIBLE_COMMAND, undefined)
            }
          >
            Карточку
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
function AlignmentDropdown() {
  return (
    <DropdownMenu.Root>
      <Toolbar.Button asChild>
        <DropdownMenu.Trigger className="rounded-md px-1 hover:bg-gray-500">
          <span className="flex items-baseline gap-1">
            <i className="ri-align-left"></i>
            Выравнивание
            <i className="ri-arrow-down-s-line text-green-500"></i>
          </span>
        </DropdownMenu.Trigger>
      </Toolbar.Button>
      <DropdownMenu.Portal>
        <DropdownMenu.Content></DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default function ToolbarPlugin() {
  return (
    <Toolbar.Root className="sticky top-0 flex justify-between rounded-md rounded-b-none bg-gray-400 p-2 px-4 text-gray-100 shadow-md outline-none">
      <ParagraphButton />
      <Toolbar.Separator className="mx-2 w-px bg-gray-300" />
      <FormatButtons />
      <LinkButton />
      <TextColorButton />
      <BackgroundColorButton />
      <Toolbar.Separator className="mx-2 w-px bg-gray-300" />
      <ExtraFormatButton />
      <Toolbar.Separator className="mx-2 w-px bg-gray-300" />
      <PluginsDropdown />
      <Toolbar.Separator className="mx-2 w-px bg-gray-300" />
      <AlignmentDropdown />
    </Toolbar.Root>
  )
}
