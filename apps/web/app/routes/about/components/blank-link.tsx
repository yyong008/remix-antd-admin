import { Badge } from "@workspace/ui/components/badge";
import { IconExternalLink } from "@tabler/icons-react";

export const BlankLink = ({ url = "", text = "" }: { url?: string; text?: string }) => {
  const target = /^http(s)?:/.test(url) ? url : `https://www.npmjs.com/package/${url}`;
  return (
    <a href={target} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1">
      <Badge variant="secondary">{text}</Badge>
      <IconExternalLink className="size-3" />
    </a>
  );
};
