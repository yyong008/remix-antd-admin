/**
 * Adapts AI SDK `toTextStreamResponse()` (UTF-8 text chunks) to the shape
 * {@link OpenAIChatProvider} expects in {@link OpenAIChatProvider.transformMessage}
 * when Content-Type is not `text/event-stream`.
 */
export function createTextStreamToOpenAIChunkTransform(): TransformStream<
  string,
  { choices: { delta: { content: string } }[] }
> {
  return new TransformStream({
    transform(textChunk, controller) {
      if (textChunk) {
        controller.enqueue({
          choices: [{ delta: { content: textChunk } }],
        });
      }
    },
  });
}
