import "quill/dist/quill.snow.css";
import "./layout.css";

import { useEffect, useRef, useCallback } from "react";

import { ClientOnly } from "remix-utils/client-only";

const Q = async () => {
  const Q = (await import("quill")).default;
  return Q;
};

export const Editor = ({ value, onChange, content, setContent, initContent }: any) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);
  const isInitRef = useRef(false);

  const initEditor = useCallback(async () => {
    if (isInitRef.current || !editorRef.current) return;
    isInitRef.current = true;

    const Quill = await Q();
    quillRef.current = new Quill(editorRef.current, {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: 1 }, { header: 2 }, { font: [] }],
          [{ size: ["small", false, "large", "huge"] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["bold", "italic", "underline", "strike"],
          [{ align: [] }],
          ["link"],
          [{ color: [] }, { background: [] }],
          ["blockquote", "code-block"],
          ["clean"],
        ],
      },
    });

    const initial = (initContent ?? content ?? "") as string;
    quillRef.current.root.innerHTML = initial;
    quillRef.current?.on("text-change", () => {
      const next = quillRef.current?.root.innerHTML ?? "";
      onChange?.(next);
      setContent?.(next);
    });

    return quillRef;
  }, [initContent, content, onChange, setContent]);

  useEffect(() => {
    initEditor();
  }, [initEditor]);

  return (
    <div className="rr-quill-snow">
      <div
        ref={editorRef}
        style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}
      />
    </div>
  );
};

export const QuillEditor = ({ content, setContent, initContent }: any) => {
  return (
    <>
      <ClientOnly fallback={<>Loading...</>}>
        {() => {
          return <Editor initContent={initContent} content={content} setContent={setContent} />;
        }}
      </ClientOnly>
    </>
  );
};
