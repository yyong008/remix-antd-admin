import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { BlankLink } from "./blank-link";

export const ProjectProductionDep = () => {
  const { pkg } = __APP_INFO__;
  return (
    <Card>
      <CardHeader>
        <CardTitle>生产依赖</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(pkg.dependencies)?.map((value, index) => (
            <div key={index} className="flex justify-between items-center py-1">
              <span className="text-sm font-medium">{value}</span>
              <BlankLink url={value} text={pkg.dependencies[value]} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};