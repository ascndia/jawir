"use client";
import { DashboardLayout } from "@/registry/section/layout-content/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Layout1 from "@/registry/section/layout/layout-1/layout";
import LayoutShadcn1 from "@/registry/section/layout/layout-shadcn-1/layout";

// Sample data for charts
const chartData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
];

const projectData = [
  { name: 'Website Redesign', progress: 75, status: 'In Progress' },
  { name: 'Mobile App Development', progress: 45, status: 'In Progress' },
  { name: 'CRM Integration', progress: 90, status: 'Almost Done' },
  { name: 'Content Migration', progress: 30, status: 'Just Started' },
];

export default function DashboardPage() {
  return (
    <LayoutShadcn1>

    <DashboardLayout>
      <div className="grid gap-4">
        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total Revenue" value="$45,231.89" change="+20.1%" trend="up" />
          <StatsCard title="New Users" value="2,338" change="+15.3%" trend="up" />
          <StatsCard title="Active Sessions" value="18,325" change="-5.2%" trend="down" />
          <StatsCard title="Conversion Rate" value="4.28%" change="+2.5%" trend="up" />
        </div>

        {/* Chart and Project Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="monthly">
                <TabsList className="mb-4">
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="yearly">Yearly</TabsTrigger>
                </TabsList>
                <TabsContent value="weekly" className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="monthly" className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="yearly" className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {projectData.map((project, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{project.name}</div>
                      <div className="text-sm text-muted-foreground">{project.status}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={project.progress} className="h-2" />
                      <div className="text-sm font-medium">{project.progress}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { user: "Alex Johnson", action: "created a new project", time: "2 minutes ago", icon: "👨‍💼" },
                  { user: "Sarah Miller", action: "commented on a task", time: "25 minutes ago", icon: "💬" },
                  { user: "James Wilson", action: "completed Project X milestone", time: "1 hour ago", icon: "🏆" },
                  { user: "Emily Davis", action: "uploaded new files", time: "3 hours ago", icon: "📁" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      {activity.icon}
                    </div>
                    <div>
                      <p>
                        <span className="font-medium">{activity.user}</span>{" "}
                        <span className="text-muted-foreground">{activity.action}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "Add User", icon: "👤" },
                  { name: "New Project", icon: "📁" },
                  { name: "Generate Report", icon: "📊" },
                  { name: "Settings", icon: "⚙️" },
                ].map((action, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center p-3 bg-accent/50 rounded-md hover:bg-accent cursor-pointer"
                  >
                    <div className="text-2xl mb-1">{action.icon}</div>
                    <div className="text-sm">{action.name}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
    </LayoutShadcn1>

  );
}

// Stats Card Component
function StatsCard({ title, value, change, trend }: { title: string; value: string; change: string; trend: "up" | "down" }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className={`rounded-full p-1 ${trend === "up" ? "bg-green-100" : "bg-red-100"}`}>
            <span className={trend === "up" ? "text-green-600" : "text-red-600"}>{trend === "up" ? "↑" : "↓"}</span>
          </div>
        </div>
        <div className="text-2xl font-bold mt-2">{value}</div>
        <div className="flex items-center mt-1">
          <span className={trend === "up" ? "text-green-600" : "text-red-600"}>
            {change}
          </span>
          <span className="text-xs text-muted-foreground ml-1">vs. last month</span>
        </div>
      </CardContent>
    </Card>
  );
}