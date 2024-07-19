import "quill/dist/quill.snow.css";

import { useEffect, useRef } from "react";

import { ClientOnly } from "remix-utils/client-only";

const Q = async () => {
  const Q = (await import("quill")).default;
  return Q;
};

export const Editor = ({
  value,
  onChange,
  content,
  setContent,
  initContent,
}: any) => {
  const editorRef = useRef<any>(null);
  const quillRef = useRef<any>();

  const init = async () => {
    const Quill = await Q();
    quillRef.current = new Quill(editorRef.current, {
      theme: "snow",
    });

    quillRef.current?.on("text-change", () => {
      const content = quillRef.current?.root.innerHTML;
      onChange?.(content);
      setContent(content);
    });

    return quillRef;
  };

  useEffect(() => {
    if (initContent && quillRef.current) {
      quillRef.current?.clipboard.dangerouslyPasteHTML(initContent);
      // quillRef.current.root.innerHTML = content
    }
  }, [initContent]);

  useEffect(() => {
    if (!quillRef.current) {
      init();
    }

    return () => {
      quillRef.current?.off("text-change");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={editorRef} />;
};

export const QuillEditor = ({ content, setContent, initContent }: any) => {
  return (
    <>
      <ClientOnly fallback={<>Loading...</>}>
        {() => {
          return (
            <Editor
              initContent={initContent}
              content={content}
              setContent={setContent}
            />
          );
        }}
      </ClientOnly>
    </>
  );
};
