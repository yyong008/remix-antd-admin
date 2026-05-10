import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { BlankLink } from "./blank-link";

export const ProjectInfo = () => {
  const { pkg, lastBuildTime } = __APP_INFO__;
  return (
    <Card>
      <CardHeader>
        <CardTitle>项目信息</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">版本</span>
            <Badge variant="secondary">{pkg.version}</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">最后编译时间</span>
            <Badge variant="secondary">{lastBuildTime}</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">GitHub</span>
            <BlankLink url={pkg.repository.url} text="GitHub" />
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">预览地址</span>
            <BlankLink url={pkg.homepage} text="预览地址" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};