import "./layout.css";

import { useEffect, useRef, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function TiptapEditor({
  value,
  onChange,
  content,
  setContent,
  initContent,
}: any) {
  const editorRef = useRef<ReturnType<typeof useEditor>>(null);
  const isInitRef = useRef(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: initContent ?? content ?? "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
      setContent?.(html);
    },
  });

  editorRef.current = editor;

  const initEditor = useCallback(() => {
    if (isInitRef.current || !editor) return;
    isInitRef.current = true;

    const initial = (initContent ?? content ?? "") as string;
    if (initial && editor) {
      editor.commands.setContent(initial);
    }
  }, [initContent, content, editor]);

  useEffect(() => {
    initEditor();
  }, [initEditor]);

  useEffect(() => {
    if (editor && value && !isInitRef.current) {
      const currentHtml = editor.getHTML();
      if (value !== currentHtml) {
        editor.commands.setContent(value);
      }
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="rr-tiptap-editor">
      <EditorContent editor={editor} />
    </div>
  );
}