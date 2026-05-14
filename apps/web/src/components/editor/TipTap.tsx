// src/Tiptap.tsx
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Collaboration from "@tiptap/extension-collaboration";
import StarterKit from "@tiptap/starter-kit";
import { useMemo, useEffect } from "react";
import { MenuBar } from "./MenuBar";
import { getDocument } from "@/lib/yjs-doc-manager";
import { BroadcastChannelProvider } from "@/lib/broadcast-channel-provider";

interface TiptapProps {
  documentId?: string;
  // TODO: Add user info for collaboration awareness
  // user?: { id: string; name: string; color: string };
}

const Tiptap = ({ documentId = "default-doc" }: TiptapProps) => {
  // Get or create the Yjs document for this document ID
  // This ensures the document persists across re-renders
  const doc = useMemo(() => getDocument(documentId), [documentId]);

  // Initialize BroadcastChannel provider for cross-tab collaboration (development)
  // TODO: Replace with WebSocket/WebRTC provider when backend is ready
  useEffect(() => {
    const provider = new BroadcastChannelProvider(doc, documentId);
    return () => {
      provider.destroy();
    };
  }, [doc, documentId]);

  // TODO: Auto-save document to backend on changes
  // Uncomment this when you have a backend save endpoint:
  // import { useCallback } from "react";
  // import { saveDocument } from "@/lib/yjs-doc-manager";
  // const handleUpdate = useCallback(() => {
  //   saveDocument(documentId, doc);
  // }, [documentId, doc]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      Collaboration.configure({
        document: doc,
        // TODO: Add user info for cursor awareness
        // user: {
        //   name: user?.name || "Anonymous",
        //   color: user?.color || "#f58300",
        // },
      }),
    ],
    // Don't set initial content when using collaboration
    // The content comes from the Yjs document
    content: "",
    editorProps: {
      attributes: {
        class:
          "focus:outline-none min-h-[500px] px-8 py-6 text-base leading-relaxed",
      },
    },
    // TODO: Add onUpdate handler for auto-save
    // onUpdate: handleUpdate,
  });

  // Cleanup document on unmount
  useEffect(() => {
    return () => {
      // Optional: Cleanup document from memory when component unmounts
      // Uncomment this if you want to free memory:
      // import { cleanupDocument } from "@/lib/yjs-doc-manager";
      // cleanupDocument(documentId);
    };
  }, [documentId]);

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
