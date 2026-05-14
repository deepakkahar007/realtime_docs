import type { Editor } from "@tiptap/core";
import type { EditorStateSnapshot } from "@tiptap/react";
import { useEditorState } from "@tiptap/react";
import {
	Bold,
	Code,
	Code2,
	Eraser,
	Heading1,
	Heading2,
	Heading3,
	Italic,
	List,
	ListOrdered,
	Quote,
	Redo,
	SeparatorHorizontal,
	Strikethrough,
	Type,
	Undo,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { Toggle } from "../ui/toggle";
import { ToggleGroup } from "../ui/toggle-group";

export function menuBarStateSelector(ctx: EditorStateSnapshot<Editor>) {
	return {
		// Text formatting
		isBold: ctx.editor.isActive("bold") ?? false,
		canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
		isItalic: ctx.editor.isActive("italic") ?? false,
		canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
		isStrike: ctx.editor.isActive("strike") ?? false,
		canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
		isCode: ctx.editor.isActive("code") ?? false,
		canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
		canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,

		// Block types
		isParagraph: ctx.editor.isActive("paragraph") ?? false,
		isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
		isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
		isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
		isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
		isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
		isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,

		// Lists and blocks
		isBulletList: ctx.editor.isActive("bulletList") ?? false,
		isOrderedList: ctx.editor.isActive("orderedList") ?? false,
		isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
		isBlockquote: ctx.editor.isActive("blockquote") ?? false,

		// History
		canUndo: ctx.editor.can().chain().undo().run() ?? false,
		canRedo: ctx.editor.can().chain().redo().run() ?? false,
	};
}

export type MenuBarState = ReturnType<typeof menuBarStateSelector>;

export const MenuBar = ({ editor }: { editor: Editor | null }) => {
	const editorState = useEditorState({
		editor,
		selector: menuBarStateSelector,
	});

	if (!editor) {
		return null;
	}

	return (
		<div className="flex flex-wrap items-center gap-2 border-b bg-background p-2">
			{/* Text Formatting */}
			<ToggleGroup type="multiple" spacing={0}>
				<Toggle
					pressed={editorState.isBold}
					onPressedChange={() => editor.chain().focus().toggleBold().run()}
					disabled={!editorState.canBold}
					aria-label="Bold"
					size="sm"
				>
					<Bold className="h-4 w-4" />
				</Toggle>
				<Toggle
					pressed={editorState.isItalic}
					onPressedChange={() => editor.chain().focus().toggleItalic().run()}
					disabled={!editorState.canItalic}
					aria-label="Italic"
					size="sm"
				>
					<Italic className="h-4 w-4" />
				</Toggle>
				<Toggle
					pressed={editorState.isStrike}
					onPressedChange={() => editor.chain().focus().toggleStrike().run()}
					disabled={!editorState.canStrike}
					aria-label="Strikethrough"
					size="sm"
				>
					<Strikethrough className="h-4 w-4" />
				</Toggle>
				<Toggle
					pressed={editorState.isCode}
					onPressedChange={() => editor.chain().focus().toggleCode().run()}
					disabled={!editorState.canCode}
					aria-label="Code"
					size="sm"
				>
					<Code className="h-4 w-4" />
				</Toggle>
			</ToggleGroup>

			<Separator orientation="vertical" className="h-6" />

			{/* Headings */}
			<ToggleGroup type="multiple" spacing={0}>
				<Toggle
					pressed={editorState.isParagraph}
					onPressedChange={() => editor.chain().focus().setParagraph().run()}
					aria-label="Paragraph"
					size="sm"
				>
					<Type className="h-4 w-4" />
				</Toggle>
				<Toggle
					pressed={editorState.isHeading1}
					onPressedChange={() =>
						editor.chain().focus().toggleHeading({ level: 1 }).run()
					}
					aria-label="Heading 1"
					size="sm"
				>
					<Heading1 className="h-4 w-4" />
				</Toggle>
				<Toggle
					pressed={editorState.isHeading2}
					onPressedChange={() =>
						editor.chain().focus().toggleHeading({ level: 2 }).run()
					}
					aria-label="Heading 2"
					size="sm"
				>
					<Heading2 className="h-4 w-4" />
				</Toggle>
				<Toggle
					pressed={editorState.isHeading3}
					onPressedChange={() =>
						editor.chain().focus().toggleHeading({ level: 3 }).run()
					}
					aria-label="Heading 3"
					size="sm"
				>
					<Heading3 className="h-4 w-4" />
				</Toggle>
			</ToggleGroup>

			<Separator orientation="vertical" className="h-6" />

			{/* Lists */}
			<ToggleGroup type="multiple" spacing={0}>
				<Toggle
					pressed={editorState.isBulletList}
					onPressedChange={() =>
						editor.chain().focus().toggleBulletList().run()
					}
					aria-label="Bullet List"
					size="sm"
				>
					<List className="h-4 w-4" />
				</Toggle>
				<Toggle
					pressed={editorState.isOrderedList}
					onPressedChange={() =>
						editor.chain().focus().toggleOrderedList().run()
					}
					aria-label="Ordered List"
					size="sm"
				>
					<ListOrdered className="h-4 w-4" />
				</Toggle>
			</ToggleGroup>

			<Separator orientation="vertical" className="h-6" />

			{/* Blocks */}
			<ToggleGroup type="multiple" spacing={0}>
				<Toggle
					pressed={editorState.isCodeBlock}
					onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
					aria-label="Code Block"
					size="sm"
				>
					<Code2 className="h-4 w-4" />
				</Toggle>
				<Toggle
					pressed={editorState.isBlockquote}
					onPressedChange={() =>
						editor.chain().focus().toggleBlockquote().run()
					}
					aria-label="Blockquote"
					size="sm"
				>
					<Quote className="h-4 w-4" />
				</Toggle>
				<Toggle
					onPressedChange={() =>
						editor.chain().focus().setHorizontalRule().run()
					}
					aria-label="Horizontal Rule"
					size="sm"
				>
					<SeparatorHorizontal className="h-4 w-4" />
				</Toggle>
			</ToggleGroup>

			<Separator orientation="vertical" className="h-6" />

			{/* Clear Actions */}
			<ToggleGroup type="single" spacing={0}>
				<Toggle
					onPressedChange={() => editor.chain().focus().unsetAllMarks().run()}
					aria-label="Clear Formatting"
					size="sm"
				>
					<Eraser className="h-4 w-4" />
				</Toggle>
			</ToggleGroup>

			<Separator orientation="vertical" className="h-6" />

			{/* History */}
			<ToggleGroup type="single" spacing={0}>
				<Toggle
					onPressedChange={() => editor.chain().focus().undo().run()}
					disabled={!editorState.canUndo}
					aria-label="Undo"
					size="sm"
				>
					<Undo className="h-4 w-4" />
				</Toggle>
				<Toggle
					onPressedChange={() => editor.chain().focus().redo().run()}
					disabled={!editorState.canRedo}
					aria-label="Redo"
					size="sm"
				>
					<Redo className="h-4 w-4" />
				</Toggle>
			</ToggleGroup>
		</div>
	);
};
