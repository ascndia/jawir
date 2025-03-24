import { ArrowDown, ArrowUp } from "lucide-react";
import { Card, CardContent } from "@/registry/components/card/card-shadcn/card";

export default function StatsAdmin() {
  return (
    <div className="container py-10">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <p className="text-md tracking-wide text-muted-foreground">
                Total users
              </p>
              <div className="mt-1 flex items-center gap-x-2">
                <h3 className="text-xl sm:text-2xl font-medium">72,540</h3>
                <span className="flex items-center gap-x-1 text-green-700 dark:text-green-400">
                  <ArrowUp className="w-4 h-4" />
                  <span className="text-sm">1.7%</span>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <p className="text-md tracking-wide text-muted-foreground">
                Sessions
              </p>
              <div className="mt-1 flex items-center gap-x-2">
                <h3 className="text-xl sm:text-2xl font-medium">29.4%</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <p className="text-md tracking-wide text-muted-foreground">
                Avg. Click Rate
              </p>
              <div className="mt-1 flex items-center gap-x-2">
                <h3 className="text-xl sm:text-2xl font-medium">56.8%</h3>
                <span className="flex items-center gap-x-1 text-red-700 dark:text-red-400">
                  <ArrowDown className="w-4 h-4" />
                  <span className="text-sm">1.7%</span>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <p className="text-md tracking-wide text-muted-foreground">
                Pageviews
              </p>
              <div className="mt-1 flex items-center gap-x-2">
                <h3 className="text-xl sm:text-2xl font-medium">92,913</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
