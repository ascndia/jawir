"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { GradeBadge } from "./grade-badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LabelList,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"
export const TableCase5 = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleRowExpansion = (id: number) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

const data = [
    {
        id: 1,
        salesperson: { name: "John Doe", avatar: "https://i.pravatar.cc/150?u=john", icon: "🌟" },
        dealsClosed: 25,
        status: "Active",
        performanceScore: { score: 85, grade: "A" },
        country: { region: "US", flag: "https://flagcdn.com/w20/us.png" },
        clients: { count: 50, percentage: 75 },
        revenue: { amount: "$500,000", percentage: 90 },
        charts: {
            performance: [
                { month: "Jan", score: 80 },
                { month: "Feb", score: 85 },
                { month: "Mar", score: 82 },
                { month: "Apr", score: 88 },
                { month: "May", score: 90 },
                { month: "Jun", score: 87 }
            ],
            productBreakdown: [
                { name: "Product A", value: 30 },
                { name: "Product B", value: 25 },
                { name: "Product C", value: 20 },
                { name: "Product D", value: 25 }
            ]
        }
    },
    {
        id: 2,
        salesperson: { name: "Jane Smith", avatar: "https://i.pravatar.cc/150?u=jane", icon: "🔥" },
        dealsClosed: 30,
        status: "Active",
        performanceScore: { score: 63, grade: "C" },
        country: { region: "UK", flag: "https://flagcdn.com/w20/gb.png" },
        clients: { count: 60, percentage: 80 },
        revenue: { amount: "$600,000", percentage: 95 },
        charts: {
            performance: [
                { month: "Jan", score: 85 },
                { month: "Feb", score: 90 },
                { month: "Mar", score: 88 },
                { month: "Apr", score: 92 },
                { month: "May", score: 94 },
                { month: "Jun", score: 93 }
            ],
            productBreakdown: [
                { name: "Product A", value: 35 },
                { name: "Product B", value: 30 },
                { name: "Product C", value: 20 },
                { name: "Product D", value: 15 }
            ]
        }
    },
    {
        id: 3,
        salesperson: { name: "Alice Johnson", avatar: "https://i.pravatar.cc/150?u=alice", icon: "💎" },
        dealsClosed: 20,
        status: "Inactive",
        performanceScore: { score: 70, grade: "B" },
        country: { region: "Japan", flag: "https://flagcdn.com/w20/jp.png" },
        clients: { count: 40, percentage: 60 },
        revenue: { amount: "$400,000", percentage: 80 },
        charts: {
            performance: [
                { month: "Jan", score: 65 },
                { month: "Feb", score: 70 },
                { month: "Mar", score: 68 },
                { month: "Apr", score: 72 },
                { month: "May", score: 75 },
                { month: "Jun", score: 70 }
            ],
            productBreakdown: [
                { name: "Product A", value: 25 },
                { name: "Product B", value: 20 },
                { name: "Product C", value: 30 },
                { name: "Product D", value: 25 }
            ]
        }
    },
    {
        id: 4,
        salesperson: { name: "Wu Chen", avatar: "https://i.pravatar.cc/150?u=wu", icon: "🇨🇳" },
        dealsClosed: 15,
        status: "Active",
        performanceScore: { score: 85, grade: "A" },
        country: { region: "China", flag: "https://flagcdn.com/w20/cn.png" },
        clients: { count: 30, percentage: 50 },
        revenue: { amount: "$300,000", percentage: 70 },
        charts: {
            performance: [
                { month: "Jan", score: 80 },
                { month: "Feb", score: 85 },
                { month: "Mar", score: 82 },
                { month: "Apr", score: 88 },
                { month: "May", score: 90 },
                { month: "Jun", score: 85 }
            ],
            productBreakdown: [
                { name: "Product A", value: 40 },
                { name: "Product B", value: 30 },
                { name: "Product C", value: 15 },
                { name: "Product D", value: 15 }
            ]
        }
    },
];

  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="divide-x divide-border">
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Salesperson</TableHead>
              <TableHead>Deals Closed</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Performance Score</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Clients</TableHead>
              <TableHead>Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody >
            {data.map((row) => {
              const isExpanded = expandedRow === row.id;
              return (
                <React.Fragment key={row.id}>
                  <TableRow className="divide-x divide-border">
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRowExpansion(row.id)}
                        aria-label={isExpanded ? "Collapse row" : "Expand row"}
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <img
                          src={row.salesperson.avatar}
                          alt={row.salesperson.name}
                          className="h-8 w-8 rounded-full"
                        />
                        <span>{row.salesperson.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{row.dealsClosed}</TableCell>
                    <TableCell>
                      <span className="badge">{row.status}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span>{row.performanceScore.score}</span>
                        <GradeBadge grade={row.performanceScore.grade} />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <img
                          src={row.country.flag}
                          alt={row.country.region}
                          className="h-5 w-5"
                        />
                        <span>{row.country.region}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span>{row.clients.count}</span>
                        <Progress value={row.clients.percentage} className="w-full" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span>{row.revenue.amount}</span>
                        <Progress value={row.revenue.percentage} className="w-full" />
                      </div>
                    </TableCell>
                  </TableRow>
                  {isExpanded && (
                    <TableRow>
                      <TableCell colSpan={8} className="p-4 bg-muted/50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card>
                            <CardHeader>
                              <CardTitle>Performance Over Time</CardTitle>
                            </CardHeader>
                            <CardContent>
                            <ChartContainer className="h-48 w-full" config={{}}>
                                <LineChart
                                data={row.charts.performance}
                                margin={{
                                    left: 12,
                                    right: 12,
                                }}
                                >
                                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
                                <Line
                                    type="natural"
                                    dataKey="score"
                                    stroke="#8884d8"
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                />
                                </LineChart>
                            </ChartContainer>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle>Product Category Breakdown</CardTitle>
                            </CardHeader>
                            <CardContent>
                            <ChartContainer config={{}} className="h-48 w-full">
                                <PieChart>
                                <Pie
                                    data={row.charts.productBreakdown}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                >
                                {row.charts.productBreakdown.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index % 4]}
                                    />
                                    ))}
                                </Pie>
                                <ChartTooltip
                                    content={<ChartTooltipContent hideLabel />} // Custom ShadCN styled Tooltip
                                    cursor={false} // No cursor line
                                />
                                {/* <Legend /> */}

                                </PieChart>
                            </ChartContainer>
                            </CardContent>
                          </Card>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};