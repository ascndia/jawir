"use client";

import { Fragment, useEffect, useState } from "react";

import { Button } from "@/registry/components/button/select";
import { ThemeButton, ThemeLink } from "@/component/theme-link";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/registry/components/drawer";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/registry/components/form";
// import { Input } from "@/registry/components/input/input-shadcn/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/components/popover";
import { Skeleton } from "@/registry/components/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/components/tabs";
import { shadcnThemes } from "@/lib/shadcn-themes";
import { useIsMobile } from "@jlns/hooks";
// import { useZodForm } from "@jlns/form/zod";
import { atom, useAtom } from "jotai";
import { RemoveScroll } from "react-remove-scroll";
import { range } from "remeda";
import { Globe } from "lucide-react";
import { ThemeItem } from "@/lib/theme-config";
import axios from "axios";

const exploreTab = atom<string>("community");

export const Explore = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button>
            <Globe className="size-4 lg:mr-2" />
            <span className="max-lg:sr-only">Explore</span>
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <RemoveScroll className="max-h-[80svh] overflow-auto p-4 scrollbar-thin">
            <Content />
          </RemoveScroll>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button disabled>
          <Globe className="size-4 lg:mr-2" />
          <span className="max-lg:sr-only">Explore</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-h-[50vh] w-screen max-w-screen-lg overflow-auto scrollbar-thin">
        <Content />
      </PopoverContent>
    </Popover>
  );
};

const Content = () => {
  const [tab, setTab] = useAtom(exploreTab);

  return (
    <div>
      <div className="flex flex-col gap-1.5 pb-4">
        <p className="text-lg font-semibold leading-none tracking-tight">
          Explore
        </p>
        <p className="text-sm text-muted-foreground">
          Find themes from other users that have been shared with the community.
        </p>
      </div>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList defaultValue="community">
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="shadcn">shadcn</TabsTrigger>
        </TabsList>
        <TabsContent value="community">
          <Themes />
        </TabsContent>
        <TabsContent value="shadcn">
          <ShadcnDefaultThemes />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Themes = () => {
  const [themes, setThemes] = useState<ThemeItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get<ThemeItem[]>("/theme/index.json").then((res) => {
      setThemes((prevThemes) => [...prevThemes, ...res.data]);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col gap-4 px-2 py-6">
      <div className="grid w-full grid-cols-2 gap-6 lg:grid-cols-5">
        {isLoading ? (
          <Fragment>
            {range(0, 5).map((i) => (
              <Skeleton className="h-28" key={`explore-skeleton-${i}`} />
            ))}
          </Fragment>
        ) : (
          <Fragment>
            {themes.map((theme, index) => (
              <ThemeLink {...theme} key={index} />
            ))}
          </Fragment>
        )}
      </div>
    </div>
  );
};

const ShadcnDefaultThemes = () => {
  return (
    <div>
      <div className="grid w-full grid-cols-2 gap-6 lg:grid-cols-5">
        {shadcnThemes.map((theme) => (
          <ThemeButton
            config={theme.config}
            name={theme.name}
            key={theme.name}
          />
        ))}
      </div>
    </div>
  );
};
