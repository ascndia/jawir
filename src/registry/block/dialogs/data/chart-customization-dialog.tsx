"use client";

import * as React from "react";
import {
  BarChart3,
  LineChart,
  Loader2,
  PieChart,
  Settings,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/registry/components/dialog";
import Button from "@/registry/components/button/button-shadcn/button";
import { Input } from "@/registry/components/input";
import { Label } from "@/registry/components/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/components/tabs";
import { RadioGroup, RadioGroupItem } from "@/registry/components/radio-group";
import { Checkbox } from "@/registry/components/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/components/select";

import { ScrollArea } from "@/registry/components/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/components/accordion/accordion-shadcn/accordion";
import { Separator } from "@/registry/components/separator";

interface DataSeries {
  id: string;
  name: string;
  color?: string;
  visible?: boolean;
}

interface DataSource {
  id: string;
  name: string;
  series: DataSeries[];
}

interface ChartCustomizationDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onApplySettings?: (settings: ChartSettings) => void;
  onResetSettings?: () => void;
  isLoading?: boolean;
  initialSettings?: ChartSettings;
  dataSources?: DataSource[];
}

interface ChartSettings {
  chartType: "line" | "bar" | "pie" | "area" | "scatter" | "donut";
  dataSource: string;
  title: string;
  showLegend: boolean;
  legendPosition: "top" | "right" | "bottom" | "left";
  xAxis: {
    title: string;
    showGrid: boolean;
    showLabels: boolean;
  };
  yAxis: {
    title: string;
    showGrid: boolean;
    showLabels: boolean;
  };
  series: Record<
    string,
    {
      visible: boolean;
      color?: string;
    }
  >;
  colors: string[];
  stacked: boolean;
  showDataLabels: boolean;
  animation: boolean;
  theme: "light" | "dark" | "system";
}

export default function ChartCustomizationDialog({
  open = false,
  onOpenChange,
  onApplySettings,
  onResetSettings,
  isLoading = false,
  initialSettings = {
    chartType: "bar",
    dataSource: "sales-data",
    title: "Monthly Sales Performance",
    showLegend: true,
    legendPosition: "bottom",
    xAxis: {
      title: "Month",
      showGrid: false,
      showLabels: true,
    },
    yAxis: {
      title: "Revenue ($)",
      showGrid: true,
      showLabels: true,
    },
    series: {},
    colors: ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
    stacked: false,
    showDataLabels: false,
    animation: true,
    theme: "system",
  },
  dataSources = [
    {
      id: "sales-data",
      name: "Sales Data",
      series: [
        { id: "revenue", name: "Revenue", color: "#4f46e5" },
        { id: "profit", name: "Profit", color: "#10b981" },
        { id: "expenses", name: "Expenses", color: "#f59e0b" },
      ],
    },
    {
      id: "user-metrics",
      name: "User Metrics",
      series: [
        { id: "new-users", name: "New Users", color: "#4f46e5" },
        { id: "active-users", name: "Active Users", color: "#10b981" },
        { id: "churned-users", name: "Churned Users", color: "#ef4444" },
      ],
    },
    {
      id: "product-performance",
      name: "Product Performance",
      series: [
        { id: "product-a", name: "Product A", color: "#4f46e5" },
        { id: "product-b", name: "Product B", color: "#10b981" },
        { id: "product-c", name: "Product C", color: "#f59e0b" },
        { id: "product-d", name: "Product D", color: "#ef4444" },
      ],
    },
  ],
}: ChartCustomizationDialogProps) {
  const [settings, setSettings] =
    React.useState<ChartSettings>(initialSettings);
  const [activeTab, setActiveTab] = React.useState("general");

  React.useEffect(() => {
    if (open) {
      setSettings(initialSettings);

      // Initialize series visibility based on data source
      const dataSource = dataSources.find(
        (ds) => ds.id === initialSettings.dataSource
      );
      if (dataSource) {
        const seriesSettings: Record<
          string,
          { visible: boolean; color?: string }
        > = {};

        dataSource.series.forEach((series) => {
          seriesSettings[series.id] = {
            visible: initialSettings.series[series.id]?.visible ?? true,
            color: initialSettings.series[series.id]?.color ?? series.color,
          };
        });

        setSettings((prev) => ({
          ...prev,
          series: seriesSettings,
        }));
      }
    }
  }, [open]);
  // }, [open, initialSettings, dataSources]);

  const handleChartTypeChange = (value: string) => {
    setSettings((prev) => ({
      ...prev,
      chartType: value as ChartSettings["chartType"],
    }));
  };

  const handleDataSourceChange = (value: string) => {
    const dataSource = dataSources.find((ds) => ds.id === value);
    if (dataSource) {
      const seriesSettings: Record<
        string,
        { visible: boolean; color?: string }
      > = {};

      dataSource.series.forEach((series) => {
        seriesSettings[series.id] = {
          visible: true,
          color: series.color,
        };
      });

      setSettings((prev) => ({
        ...prev,
        dataSource: value,
        series: seriesSettings,
      }));
    }
  };

  const handleTitleChange = (value: string) => {
    setSettings((prev) => ({
      ...prev,
      title: value,
    }));
  };

  const handleToggleLegend = (checked: boolean) => {
    setSettings((prev) => ({
      ...prev,
      showLegend: checked,
    }));
  };

  const handleLegendPositionChange = (value: string) => {
    setSettings((prev) => ({
      ...prev,
      legendPosition: value as ChartSettings["legendPosition"],
    }));
  };

  const handleAxisTitleChange = (axis: "xAxis" | "yAxis", value: string) => {
    setSettings((prev) => ({
      ...prev,
      [axis]: {
        ...prev[axis],
        title: value,
      },
    }));
  };

  const handleAxisGridChange = (axis: "xAxis" | "yAxis", checked: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [axis]: {
        ...prev[axis],
        showGrid: checked,
      },
    }));
  };

  const handleAxisLabelsChange = (
    axis: "xAxis" | "yAxis",
    checked: boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      [axis]: {
        ...prev[axis],
        showLabels: checked,
      },
    }));
  };

  const handleSeriesVisibilityChange = (seriesId: string, checked: boolean) => {
    setSettings((prev) => ({
      ...prev,
      series: {
        ...prev.series,
        [seriesId]: {
          ...prev.series[seriesId],
          visible: checked,
        },
      },
    }));
  };

  const handleSeriesColorChange = (seriesId: string, color: string) => {
    setSettings((prev) => ({
      ...prev,
      series: {
        ...prev.series,
        [seriesId]: {
          ...prev.series[seriesId],
          color,
        },
      },
    }));
  };

  const handleToggleStacked = (checked: boolean) => {
    setSettings((prev) => ({
      ...prev,
      stacked: checked,
    }));
  };

  const handleToggleDataLabels = (checked: boolean) => {
    setSettings((prev) => ({
      ...prev,
      showDataLabels: checked,
    }));
  };

  const handleToggleAnimation = (checked: boolean) => {
    setSettings((prev) => ({
      ...prev,
      animation: checked,
    }));
  };

  const handleThemeChange = (value: string) => {
    setSettings((prev) => ({
      ...prev,
      theme: value as ChartSettings["theme"],
    }));
  };

  const handleApplySettings = () => {
    onApplySettings?.(settings);
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const handleResetSettings = () => {
    setSettings(initialSettings);
    onResetSettings?.();
  };

  const getChartTypeIcon = (type: string) => {
    switch (type) {
      case "line":
      case "area":
        return <LineChart className="h-4 w-4" />;
      case "bar":
        return <BarChart3 className="h-4 w-4" />;
      case "pie":
      case "donut":
        return <PieChart className="h-4 w-4" />;
      default:
        return <BarChart3 className="h-4 w-4" />;
    }
  };

  const currentDataSource = dataSources.find(
    (ds) => ds.id === settings.dataSource
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex flex-row items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Settings className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <DialogTitle>Customize Chart</DialogTitle>
            <DialogDescription className="mt-1.5">
              Configure the appearance and behavior of your chart
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="mt-4 flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="axes">Axes</TabsTrigger>
              <TabsTrigger value="series">Series</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
            </TabsList>

            <ScrollArea className="max-h-[calc(90vh-220px)] mt-4 pr-4">
              <TabsContent value="general" className="space-y-4">
                <div className="space-y-2">
                  <Label>Chart Type</Label>
                  <RadioGroup
                    value={settings.chartType}
                    onValueChange={handleChartTypeChange}
                    className="grid grid-cols-3 gap-2"
                  >
                    {["bar", "line", "area", "pie", "donut", "scatter"].map(
                      (type) => (
                        <Label
                          key={type}
                          htmlFor={`chart-type-${type}`}
                          className={`flex cursor-pointer items-center justify-center gap-2 rounded-md border p-3 ${
                            settings.chartType === type
                              ? "border-primary bg-primary/5"
                              : "hover:bg-muted"
                          }`}
                        >
                          <RadioGroupItem
                            value={type}
                            id={`chart-type-${type}`}
                            className="sr-only"
                          />
                          {getChartTypeIcon(type)}
                          <span className="capitalize">{type}</span>
                        </Label>
                      )
                    )}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="data-source">Data Source</Label>
                  <Select
                    value={settings.dataSource}
                    onValueChange={handleDataSourceChange}
                  >
                    <SelectTrigger id="data-source">
                      <SelectValue placeholder="Select data source" />
                    </SelectTrigger>
                    <SelectContent>
                      {dataSources.map((source) => (
                        <SelectItem key={source.id} value={source.id}>
                          {source.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chart-title">Chart Title</Label>
                  <Input
                    id="chart-title"
                    value={settings.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter chart title"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-legend" className="cursor-pointer">
                      Show Legend
                    </Label>
                    <Checkbox
                      id="show-legend"
                      checked={settings.showLegend}
                      onCheckedChange={handleToggleLegend}
                    />
                  </div>

                  {settings.showLegend && (
                    <div className="mt-2">
                      <Label htmlFor="legend-position">Legend Position</Label>
                      <Select
                        value={settings.legendPosition}
                        onValueChange={handleLegendPositionChange}
                      >
                        <SelectTrigger id="legend-position">
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="top">Top</SelectItem>
                          <SelectItem value="right">Right</SelectItem>
                          <SelectItem value="bottom">Bottom</SelectItem>
                          <SelectItem value="left">Left</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="axes" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">X-Axis Settings</h3>

                  <div className="space-y-2">
                    <Label htmlFor="x-axis-title">X-Axis Title</Label>
                    <Input
                      id="x-axis-title"
                      value={settings.xAxis.title}
                      onChange={(e) =>
                        handleAxisTitleChange("xAxis", e.target.value)
                      }
                      placeholder="Enter x-axis title"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="x-axis-grid" className="cursor-pointer">
                      Show X-Axis Grid Lines
                    </Label>
                    <Checkbox
                      id="x-axis-grid"
                      checked={settings.xAxis.showGrid}
                      onCheckedChange={(checked) =>
                        handleAxisGridChange("xAxis", !!checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="x-axis-labels" className="cursor-pointer">
                      Show X-Axis Labels
                    </Label>
                    <Checkbox
                      id="x-axis-labels"
                      checked={settings.xAxis.showLabels}
                      onCheckedChange={(checked) =>
                        handleAxisLabelsChange("xAxis", !!checked)
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Y-Axis Settings</h3>

                  <div className="space-y-2">
                    <Label htmlFor="y-axis-title">Y-Axis Title</Label>
                    <Input
                      id="y-axis-title"
                      value={settings.yAxis.title}
                      onChange={(e) =>
                        handleAxisTitleChange("yAxis", e.target.value)
                      }
                      placeholder="Enter y-axis title"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="y-axis-grid" className="cursor-pointer">
                      Show Y-Axis Grid Lines
                    </Label>
                    <Checkbox
                      id="y-axis-grid"
                      checked={settings.yAxis.showGrid}
                      onCheckedChange={(checked) =>
                        handleAxisGridChange("yAxis", !!checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="y-axis-labels" className="cursor-pointer">
                      Show Y-Axis Labels
                    </Label>
                    <Checkbox
                      id="y-axis-labels"
                      checked={settings.yAxis.showLabels}
                      onCheckedChange={(checked) =>
                        handleAxisLabelsChange("yAxis", !!checked)
                      }
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="series" className="space-y-4">
                {currentDataSource ? (
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Data Series</h3>

                    <div className="space-y-3">
                      {currentDataSource.series.map((series) => (
                        <div
                          key={series.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id={`series-${series.id}`}
                              checked={
                                settings.series[series.id]?.visible ?? true
                              }
                              onCheckedChange={(checked) =>
                                handleSeriesVisibilityChange(
                                  series.id,
                                  !!checked
                                )
                              }
                            />
                            <Label
                              htmlFor={`series-${series.id}`}
                              className="cursor-pointer"
                            >
                              {series.name}
                            </Label>
                          </div>

                          <div className="flex items-center gap-2">
                            <Input
                              type="color"
                              value={
                                settings.series[series.id]?.color ||
                                series.color ||
                                "#000000"
                              }
                              onChange={(e) =>
                                handleSeriesColorChange(
                                  series.id,
                                  e.target.value
                                )
                              }
                              className="h-8 w-12 cursor-pointer"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {(settings.chartType === "bar" ||
                      settings.chartType === "area") && (
                      <div className="flex items-center justify-between pt-2">
                        <Label htmlFor="stacked" className="cursor-pointer">
                          Stacked
                        </Label>
                        <Checkbox
                          id="stacked"
                          checked={settings.stacked}
                          onCheckedChange={handleToggleStacked}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground">
                    Select a data source to configure series
                  </p>
                )}
              </TabsContent>

              <TabsContent value="appearance" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="data-labels" className="cursor-pointer">
                      Show Data Labels
                    </Label>
                    <Checkbox
                      id="data-labels"
                      checked={settings.showDataLabels}
                      onCheckedChange={handleToggleDataLabels}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="animation" className="cursor-pointer">
                      Enable Animation
                    </Label>
                    <Checkbox
                      id="animation"
                      checked={settings.animation}
                      onCheckedChange={handleToggleAnimation}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select
                      value={settings.theme}
                      onValueChange={handleThemeChange}
                    >
                      <SelectTrigger id="theme">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="colors">
                      <AccordionTrigger className="text-sm">
                        Custom Color Palette
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-5 gap-2">
                          {settings.colors.map((color, index) => (
                            <div key={index} className="space-y-1">
                              <Input
                                type="color"
                                value={color}
                                onChange={(e) => {
                                  const newColors = [...settings.colors];
                                  newColors[index] = e.target.value;
                                  setSettings((prev) => ({
                                    ...prev,
                                    colors: newColors,
                                  }));
                                }}
                                className="h-8 w-full cursor-pointer"
                              />
                              <p className="text-center text-xs text-muted-foreground">
                                {color}
                              </p>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>

        <DialogFooter className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            onClick={handleResetSettings}
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            Reset
          </Button>
          <Button
            onClick={handleApplySettings}
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Applying...
              </>
            ) : (
              "Apply Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
