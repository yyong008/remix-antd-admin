import "quill/dist/quill.snow.css";

import { useEffect, useRef } from "react";

import { ClientOnly } from "remix-utils/client-only";

const Q = async () => {
  const Q = (await import("quill")).default;
  return Q;
};

export const Editor = ({ value, onChange }: any) => {
  const editorRef = useRef<any>(null);
  const quillRef = useRef<any>();

  const init = async () => {
    const Quill = await Q();
    quillRef.current = new Quill(editorRef.current, {
      theme: "snow",
    });

    quillRef.current?.on("text-change", () => {
      onChange(quillRef.current?.root.innerHTML);
    });

    return quillRef;
  };

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

export const QuillEditor = () => {
  return (
    <>
      <ClientOnly fallback={<>Loading...</>}>
        {() => {
          return <Editor />;
        }}
      </ClientOnly>
    </>
  );
};
