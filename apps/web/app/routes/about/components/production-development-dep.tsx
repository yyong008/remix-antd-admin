import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { BlankLink } from "./blank-link";

export const ProjectDevelopmentDep = () => {
  const { pkg } = __APP_INFO__;
  return (
    <Card>
      <CardHeader>
        <CardTitle>开发依赖</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(pkg.devDependencies)?.map((value, index) => (
            <div key={index} className="flex justify-between items-center py-1">
              <span className="text-sm font-medium">{value}</span>
              <BlankLink url={value} text={pkg.devDependencies[value]} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};