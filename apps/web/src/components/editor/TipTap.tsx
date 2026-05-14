// src/Tiptap.tsx
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useMemo } from "react";
import { MenuBar } from "./MenuBar";

const Tiptap = () => {
	const editor = useEditor({
		extensions: [StarterKit],
		content: "<p>Hello World!</p>",
		editorProps: {
			attributes: {
				class:
					"focus:outline-none min-h-[500px] px-8 py-6 text-base leading-relaxed",
			},
		},
	});

	// Memoize the provider value to avoid unnecessary re-renders
	const providerValue = useMemo(() => ({ editor }), [editor]);

	return (
		<EditorContext.Provider value={providerValue}>
			<div className="flex flex-col h-full bg-gray-50">
				<MenuBar editor={editor} />
				<div className="flex-1 overflow-auto">
					<div className="mx-auto max-w-4xl bg-white shadow-sm min-h-[800px] my-4 rounded-lg border">
						<EditorContent editor={editor} />
					</div>
				</div>
			</div>
		</EditorContext.Provider>
	);
};

export default Tiptap;
