/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, ReactNode, useCallback, useRef, useState } from "react";

import Button from "@/registry/components/button/button-shadcn/button";
import { Card, CardContent } from "@/registry/components/card/card-shadcn/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/registry/components/dropdown-menu/dropdown-menu-shadcn/dropdown-menu";
import { ChevronDown } from "lucide-react";

export type UseBackgroundSelectProps<T = any> = {
  components: { component: T; id: string; name: string }[];
  initialComponentId?: string;
};

export type UseBackgroundSelectReturn<T = any> = {
  selectedComponent: { component: T; id: string; name: string };
  selectComponent: (componentId: string) => void;
  availableComponents: { component: T; id: string; name: string }[];
};

// Custom hook for component selection logic
export function useBackgroundSelect<T = any>({
  components,
  initialComponentId,
}: UseBackgroundSelectProps<T>): UseBackgroundSelectReturn<T> {
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

// Types for the BackgroundSelect HOC
export type BackgroundSelectProps<T = any> = {
  components: { component: T; id: string; name: string }[];
  initialComponentId?: string;
  children?: (component: T) => ReactElement;
};

// Higher-order component for component selection
export function BackgroundtSelect<T = any>({
  components,
  initialComponentId,
  children,
}: BackgroundSelectProps<T>) {
  const { selectedComponent, selectComponent, availableComponents } =
    useBackgroundSelect({
      components,
      initialComponentId,
    });

  const component = children ? children(selectedComponent.component) : null;

  return (
    <>
      <ActiveComponentWrapper
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
  children,
  availableComponents,
  selectedComponent,
  selectComponent,
}: {
  children: ReactNode;
  availableComponents?: { component: any; id: string; name: string }[];
  selectedComponent?: { component: any; id: string; name: string };
  selectComponent?: (componentId: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  if (!availableComponents || !selectComponent) {
    return <>{children}</>;
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="absolute top-2 right-2 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <Card className="border-0 p-0 shadow-none">
              <CardContent className="p-1">
                <div className="flex flex-col space-y-1">
                  {availableComponents.map((comp) => (
                    <Button
                      key={comp.id}
                      variant={
                        selectedComponent?.id === comp.id
                          ? "secondary"
                          : "ghost"
                      }
                      className="justify-start text-sm h-8 w-full"
                      onClick={() => {
                        selectComponent(comp.id);
                      }}
                    >
                      {comp.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {children}
    </div>
  );
}
