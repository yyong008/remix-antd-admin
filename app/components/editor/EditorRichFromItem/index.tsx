import { Editor } from "@tinymce/tinymce-react";

export default function EditorRichFromItem(props: any) {
  return (
    <Editor
      apiKey={props.data.TINYMCE_KEY}
      init={{
        ai_request: false,
        plugins:
          "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table   | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
      }}
      value={props.value}
      onChange={(e) => {
        props.onChange(e.target.getContent());
      }}
    />
  );
}
