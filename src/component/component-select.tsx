"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import Button from "@/registry/components/button/button-shadcn/button";
import { Card, CardContent } from "@/registry/components/card/card-shadcn/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/registry/components/hover-card/hover-card-shadcn/hover-card";
import { cn } from "@/lib/utils";

export type UseComponentSelectProps<T = any> = {
  components: { component: T; id: string; name: string }[];
  initialComponentId?: string;
};

export type UseComponentSelectReturn<T = any> = {
  selectedComponent: { component: T; id: string; name: string };
  selectComponent: (componentId: string) => void;
  availableComponents: { component: T; id: string; name: string }[];
};

// Custom hook for component selection logic
export function useComponentSelect<T = any>({
  components,
  initialComponentId,
}: UseComponentSelectProps<T>): UseComponentSelectReturn<T> {
  const [selectedComponentId, setSelectedComponentId] = useState<string>(
    initialComponentId || components[0]?.id || ""
  );

  const selectComponent = useCallback((componentId: string) => {
    setSelectedComponentId(componentId);
  }, []);

  const selectedComponent =
    components.find((c) => c.id === selectedComponentId) || components[0];

  return {
    selectedComponent,
    selectComponent,
    availableComponents: components,
  };
}

// Types for the ComponentSelect HOC
export type ComponentSelectProps<T = any> = {
  disabled: boolean;
  components: { component: T; id: string; name: string }[];
  initialComponentId?: string;
  children?: (component: T) => ReactElement;
  className?: string;
};

// Higher-order component for component selection
export function ComponentSelect<T = any>({
  disabled = false,
  components,
  initialComponentId,
  className = "",
  children,
}: ComponentSelectProps<T>) {
  const { selectedComponent, selectComponent, availableComponents } =
    useComponentSelect({
      components,
      initialComponentId,
    });

  const component = children ? children(selectedComponent.component) : null;

  return (
    <>
      <ActiveComponentWrapper
        disabled={disabled}
        className={className}
        availableComponents={availableComponents}
        selectedComponent={selectedComponent}
        selectComponent={selectComponent}
      >
        {component}
      </ActiveComponentWrapper>
    </>
  );
}

// Active Component Wrapper
export function ActiveComponentWrapper({
  disabled,
  children,
  availableComponents,
  selectedComponent,
  selectComponent,
  className,
}: {
  disabled: boolean;
  children: ReactNode;
  availableComponents?: { component: any; id: string; name: string }[];
  selectedComponent?: { component: any; id: string; name: string };
  selectComponent?: (componentId: string) => void;
  className?: string;
}) {
  const [position, setPosition] = useState<string>("right");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;

      const spaceOnRight = windowWidth - rect.right;

      setPosition(spaceOnRight < 280 ? "left" : "right");
    }
  }, []);

  if (!availableComponents || !selectComponent) {
    return <>{children}</>;
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <HoverCard>
        <HoverCardTrigger>{children}</HoverCardTrigger>
        <HoverCardContent
          hidden={disabled}
          side={position as "right" | "left" | "top" | "bottom"}
          className="w-56 p-0"
          sideOffset={5}
        >
          <Card className="border-0 p-0 shadow-none">
            <CardContent className="p-1">
              <div className="flex flex-col space-y-1">
                {availableComponents.map((comp) => (
                  <Button
                    key={comp.id}
                    variant={
                      selectedComponent?.id === comp.id ? "secondary" : "ghost"
                    }
                    className="justify-start text-sm h-8 w-full"
                    onClick={() => {
                      selectComponent(comp.id);
                    }}
                    disabled={disabled}
                  >
                    {comp.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
