"use client"
import { ArrowLeft, Check, Clock, LayoutDashboard, MoreHorizontal, Search, Shield, Star, ThumbsUp } from "lucide-react"
import { useState } from "react"
import { ChevronRight, RotateCcw } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { ActiveTool } from "../types"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

interface SettingsAISidebarProps {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

function SettingsSection({
    activeTab,
    onActiveTabChange,
}: TabsContentProps) {
    
  const [speed, setSpeed] = useState(50)
  const [stability, setStability] = useState(50)
  const [similarity, setSimilarity] = useState(75)

  const resetValues = () => {
    setSpeed(50)
    setStability(50)
    setSimilarity(75)
  }

  return (
    <div className="p-4">
        <div className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
        <div className="space-y-2">
            <h3 className="text-base font-medium">Voice</h3>
            <button onClick={() => onActiveTabChange("voice")} className="w-full flex items-center justify-between bg-gray-100 dark:bg-zinc-900 rounded-lg p-3 hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors">
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white">
                R
                </div>
                <span>Rachel</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
        </div>

        <div className="space-y-2">
            <h3 className="text-base font-medium">Model</h3>
            <button onClick={() => onActiveTabChange("model")} className="w-full flex items-center justify-between bg-gray-100 dark:bg-zinc-900 rounded-lg p-3 hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors">
            <div className="flex items-center gap-2">
                <div className="text-xs px-1.5 py-0.5 rounded bg-gray-200 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700">
                v2.5
                </div>
                <span>Eleven Flash v2.5</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
        </div>

        <div className="space-y-3">
            <h3 className="text-base font-medium">Speed</h3>
            <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Slower</span>
                <span>Faster</span>
            </div>
            <Slider
                value={[speed]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => setSpeed(value[0])}
                className="cursor-pointer"
            />
            </div>
        </div>

        <div className="space-y-3">
            <h3 className="text-base font-medium">Stability</h3>
            <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>More variable</span>
                <span>More stable</span>
            </div>
            <Slider
                value={[stability]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => setStability(value[0])}
                className="cursor-pointer"
            />
            </div>
        </div>

        <div className="space-y-3">
            <h3 className="text-base font-medium">Similarity</h3>
            <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Low</span>
                <span>High</span>
            </div>
            <Slider
                value={[similarity]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => setSimilarity(value[0])}
                className="cursor-pointer"
            />
            </div>
        </div>

        <button
            onClick={resetValues}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mx-auto mt-4"
        >
            <RotateCcw className="h-4 w-4" />
            Reset values
        </button>
        </div>
    </div>
  )
}
type Tabs = "settings" | "history" | "model" | "voice"

export default function SettingsAISidebar({ activeTool, onChangeActiveTool }: SettingsAISidebarProps) {
  const [activeTab, setActiveTab] = useState<Tabs>("settings")

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "settings-ai" ? "visible" : "hidden",
      )}
    >
      <ScrollArea className="h-full max-h-full w-full overflow-y-auto">
          <Tabs value={activeTab} defaultValue="settings" className="w-full ">
            <TabsContent value="model">
                <ModelSelection activeTab={activeTab} onActiveTabChange={setActiveTab} />
            </TabsContent>
            <TabsContent value="settings">
              <SettingsSection activeTab={activeTab} onActiveTabChange={setActiveTab} />
            </TabsContent>
            <TabsContent value="history">
              <HistorySection activeTab={activeTab} onActiveTabChange={setActiveTab} />
            </TabsContent>
            <TabsContent value="voice">
              <VoiceSelection activeTab={activeTab} onActiveTabChange={setActiveTab} />
            </TabsContent>
          </Tabs>
      </ScrollArea>
    </aside>
  )
}

interface TabsContentProps {
    activeTab: Tabs;
    onActiveTabChange: (value: Tabs) => void;
}

function ModelSelection({
    activeTab,
    onActiveTabChange,
}: TabsContentProps) {
  const [expanded, setExpanded] = useState(false)
  const [selectedModel, setSelectedModel] = useState(2)
  
  const models = [
    {
      id: 1,
      name: "Eleven Multilingual v2",
      badge: "High Quality",
      description:
        "Our most life-like, emotionally rich mode in 29 languages. Best for voice overs, audiobooks, post-production, or any other content creation needs.",
      languages: ["English", "Japanese", "Chinese"],
      moreLanguages: 26,
      recommended: true,
      checked: false,
    },
    {
      id: 2,
      name: "Eleven Flash v2.5",
      badge: "50% cheaper",
      description: "Our ultra low latency model in 32 languages. Ideal for conversational use cases.",
      languages: ["English", "Japanese", "Chinese"],
      moreLanguages: 29,
      recommended: false,
      checked: true,
    },
    {
      id: 3,
      name: "Eleven English v1",
      badge: "Legacy",
      description: "Our original English-only model. Good for general purpose voice generation.",
      languages: ["English"],
      moreLanguages: 0,
      recommended: false,
      checked: false,
    },
    {
      id: 4,
      name: "Eleven Turbo",
      badge: "Fastest",
      description: "Optimized for real-time applications with minimal latency. Supports 15 languages.",
      languages: ["English", "Japanese"],
      moreLanguages: 13,
      recommended: false,
      checked: false,
    },
  ]

  const visibleModels = expanded ? models : models.slice(0, 2)

  return (
    <div className="p-4 max-w-[360px] flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
        <Button onClick={() => onActiveTabChange("settings")} variant={"outline"} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-base font-medium">Select a model</h2>
      </div>
    <ScrollArea className="flex-1 w-full overflow-y-auto">
        
      <div className="space-y-3">
        {visibleModels.map((model) => (
          <Card
            key={model.id}
            className={cn(
              "border cursor-pointer border-gray-200 dark:border-zinc-800",
              selectedModel === model.id
                ? "border-blue-500 dark:border-blue-400 shadow-md"
                : "hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md",
            )}
            onClick={() => {
              setSelectedModel(model.id)
            }}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <CardTitle>{model.name}</CardTitle>
                  <span className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-zinc-800 rounded-full text-gray-600 dark:text-gray-300">
                    {model.badge}
                  </span>
                </div>
                {model.checked && <Check className="h-5 w-5 text-gray-600 dark:text-gray-300" />}
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {model.description}
              </CardDescription>
              <div className="flex flex-wrap gap-2 mb-3">
                {model.languages.map((language) => (
                  <Badge className="rounded-full" variant={"secondary"} key={language}>
                    {language}
                  </Badge>
                ))}
                {model.moreLanguages > 0 && (
                  <Badge className="rounded-full" variant={"secondary"}>
                    +{model.moreLanguages} more...
                  </Badge>
                )}
              </div>
              {model.recommended && (
                <div className="flex items-center gap-2 text-sm">
                  <ThumbsUp className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  <span>Recommended for</span>
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">
                    R
                  </div>
                  <span>Rachel</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {!expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="w-full py-2 text-center text-sm hover:bg-gray-200 dark:hover:bg-zinc-900 rounded-lg transition-colors"
          >
            Show all models
          </button>
        )}
      </div>
      </ScrollArea>
    </div>
  )
}

function VoiceSelection({
    activeTab,
    onActiveTabChange,
}: TabsContentProps) {


 const [activeVoiceTab, setActiveVoiceTab] = useState("all");
 type Voice = {
    id: number;
    name: string;
    avatar: string;
    avatarColor: string;
    badges: {
      id: number;
      text: string;
      icon: React.ReactNode;
    }[];
    more: number;
    verified: boolean;
    moderated: boolean;
    quality: boolean;
    official?: boolean;
  };
  const topPickVoices: Voice[] = [
    {
      id: 1,
      name: "Putra",
      avatar: "P",
      avatarColor: "bg-green-500",
      badges: [
        { id: 1, text: "2 years", icon: <Clock className="h-3 w-3 mr-1" /> },
        { id: 2, text: "Indonesian", icon: null },
        { id: 3, text: "Excited", icon: null },
      ],
      more: 1,
      verified: true,
      moderated: false,
      quality: false,
    },
    {
      id: 2,
      name: "Mahaputra",
      avatar: "M",
      avatarColor: "bg-blue-500",
      badges: [
        { id: 1, text: "Live Moderation", icon: <Shield className="h-3 w-3 mr-1" /> },
        { id: 2, text: "2 years", icon: <Clock className="h-3 w-3 mr-1" /> },
      ],
      more: 3,
      verified: true,
      moderated: true,
      quality: false,
    },
    {
      id: 3,
      name: "Andi",
      avatar: "A",
      avatarColor: "bg-blue-300",
      badges: [
        { id: 1, text: "HQ", icon: null },
        { id: 2, text: "Live Moderation", icon: <Shield className="h-3 w-3 mr-1" /> },
      ],
      more: 4,
      verified: true,
      moderated: true,
      quality: true,
    },
  ]

  const defaultVoices : Voice[] = [
    {
      id: 4,
      name: "Alice",
      avatar: "A",
      avatarColor: "bg-teal-400",
      badges: [
        { id: 1, text: "News", icon: null },
        { id: 2, text: "British", icon: null },
        { id: 3, text: "Confident", icon: null },
      ],
      more: 2,
      verified: false,
      moderated: false,
      quality: false,
      official: true,
    },
    {
      id: 5,
      name: "Aria",
      avatar: "A",
      avatarColor: "bg-purple-400",
      badges: [
        { id: 1, text: "Social media", icon: null },
        { id: 2, text: "American", icon: null },
      ],
      more: 3,
      verified: false,
      moderated: false,
      quality: false,
      official: true,
    },
    {
      id: 6,
      name: "Bill",
      avatar: "B",
      avatarColor: "bg-teal-400",
      badges: [
        { id: 1, text: "Narration", icon: null },
        { id: 2, text: "American", icon: null },
      ],
      more: 3,
      verified: false,
      moderated: false,
      quality: false,
      official: true,
    },
    {
      id: 7,
      name: "Bob",
      avatar: "B",
      avatarColor: "bg-teal-400",
      badges: [
        { id: 1, text: "Narration", icon: null },
        { id: 2, text: "American", icon: null },
      ],
      more: 3,
      verified: false,
      moderated: false,
      quality: false,
    },
    {
      id: 8,
      name: "Charlie",
      avatar: "C",
      avatarColor: "bg-teal-400",
      badges: [
        { id: 1, text: "Narration", icon: null },
        { id: 2, text: "American", icon: null },
      ],
      more: 3,
      verified: false,
      moderated: false,
      quality: false,
    },
    {
      id: 9,
      name: "Diana",
      avatar: "D",              
      avatarColor: "bg-teal-400",
      badges: [
        { id: 1, text: "Narration", icon: null },
        { id: 2, text: "American", icon: null },
      ],
        more: 3,
        verified: false,
        moderated: false,
        quality: false,
    },
    {
      id: 10,
      name: "Eve",
      avatar: "E",
      avatarColor: "bg-teal-400",
      badges: [
        { id: 1, text: "Narration", icon: null },
        { id: 2, text: "American", icon: null },
      ],
      more: 3,
      verified: false,
      moderated: false,
      quality: false,
    },
    {
      id: 11,
      name: "Frank",
      avatar: "F",
      avatarColor: "bg-teal-400",
      badges: [
        { id: 1, text: "Narration", icon: null },
        { id: 2, text: "American", icon: null },
      ],
      more: 3,
      verified: false,
      moderated: false,
      quality: false,
    },
    {
      id: 12,
      name: "Grace",
      avatar: "G",
      avatarColor: "bg-teal-400",
      badges: [
        { id: 1, text: "Narration", icon: null },
        { id: 2, text: "American", icon: null },
      ],
      more: 3,
      verified: false,
      moderated: false,
      quality: false,   
    },
    {
      id: 13,
      name: "Hannah",
      avatar: "H",
      avatarColor: "bg-teal-400",
      badges: [
        { id: 1, text: "Narration", icon: null },
        { id: 2, text: "American", icon: null },
      ],
      more: 3,
      verified: false,
      moderated: false,
      quality: false,
    },
    {
      id: 14,
      name: "Ivan",
      avatar: "I",
      avatarColor: "bg-teal-400",
      badges: [
        { id: 1, text: "Narration", icon: null },
        { id: 2, text: "American", icon: null },
      ],
      more: 3,
      verified: false,
      moderated: false,
      quality: false,
    },
    {
      id: 15,
      name: "Julia",
      avatar: "J",
      avatarColor: "bg-teal-400",
      badges: [
        { id: 1, text: "Narration", icon: null },
        { id: 2, text: "American", icon: null },
      ],
      more: 3,
      verified: false,
      moderated: false,
      quality: false,
    },
    {
      id: 16,
      name: "Katarina",
      avatar: "K",
      avatarColor: "bg-teal-400",
      badges: [
        { id: 1, text: "Narration", icon: null },
        { id: 2, text: "American", icon: null },
      ],
      more: 3,
      verified: false,
      moderated: false,
      quality: false,
    },
    {
      id: 17,
      name: "Lucas",
      avatar: "L",
      avatarColor: "bg-teal-400",
      badges: [
        { id: 1, text: "Narration", icon: null },
        { id: 2, text: "American", icon: null },
      ],
      more: 3,
      verified: false,
      moderated: false,
      quality: false,
    }
  ]

  const renderVoice = (voice: Voice) => (
    <div key={voice.id} className="flex items-center justify-between">
      <div className="flex items-center gap-3">
      <div className="relative">
            <Avatar className={`overflow-hidden rounded-full ${voice.avatarColor}`}>
                <AvatarFallback className={voice.avatarColor}>{voice.avatar}</AvatarFallback>
            </Avatar>
            {voice.verified && (
                <Badge
                variant="secondary"
                className="absolute -top-1 -right-1 bg-yellow-400 text-white p-0.5 rounded-full"
                >
                <Star className="h-3 w-3" fill="white" />
                </Badge>
            )}
            {voice.official && (
            <Badge
                variant="secondary"
                className="absolute -top-1 -right-1 p-0.5 rounded-full"
                >
                <Check className="h-3 w-3" />
            </Badge>
            )}
    </div>
        <div>
          <h4 className="font-medium">{voice.name}</h4>
          <div className="flex flex-wrap gap-1 mt-1">
            {voice.badges.map((badge) => (
              <Badge
                key={badge.id}
                variant="secondary"
                className="text-xs rounded-full py-0 px-2 h-5 bg-gray-200 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300"
              >
                {badge.icon}
                {badge.text}
              </Badge>
            ))}
            {voice.more > 0 && (
              <Badge
                variant="secondary"
                className="text-xs rounded-full py-0 px-2 h-5 bg-gray-200 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300"
              >
                +{voice.more} more...
              </Badge>
            )}
          </div>
        </div>
      </div>
      <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
        <MoreHorizontal className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      </button>
    </div>
  );

  return (
    <div className="p-4 max-w-[360px] flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <Button onClick={() => onActiveTabChange("settings")} variant={"outline"} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-base font-medium">Select a voice</h2>
      </div>
      <ScrollArea className="flex-1 w-full">
      <Card className="mb-4">
        <CardContent className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-24 h-16 rounded-xl bg-purple-400 flex items-center justify-center">
              <LayoutDashboard className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="font-medium">Explore Voice Library</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Find high quality voices from the community. Perfect for any occasion.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <Input placeholder="Search voices..." className="pl-9" />
      </div>

        <Tabs value={activeVoiceTab} defaultValue="top-picks" className="mb-4" onValueChange={setActiveVoiceTab}>
          <TabsList className="bg-gray-100 dark:bg-zinc-900 p-1 h-auto w-full rounded-lg">
            <TabsTrigger
              value="all"
              className="text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="top-picks"
              className="text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800"
            >
              Top Picks
            </TabsTrigger>
            <TabsTrigger
              value="default"
              className="text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800"
            >
              Default
            </TabsTrigger>
          </TabsList>


          <TabsContent value="all" className="mt-4">
          {/* Top Picks Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Voice Library - Top Picks for You</h3>
            </div>
            <div className="space-y-3">{topPickVoices.map(renderVoice)}</div>
          </div>

          {/* Default Section */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Default</h3>
              <button className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                View all
              </button>
            </div>
            <div className="space-y-4">{defaultVoices.map(renderVoice)}</div>
          </div>
        </TabsContent>

        <TabsContent value="top-picks" className="mt-4">
          <div className="mb-3">
            <h3 className="text-sm text-gray-500 dark:text-gray-400">Voice Library - Top Picks for You</h3>
          </div>
          <div className="space-y-4">{topPickVoices.map(renderVoice)}</div>
        </TabsContent>

        <TabsContent value="default" className="mt-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm text-gray-500 dark:text-gray-400">Default</h3>
            <button className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              View all
            </button>
          </div>
          <div className="space-y-4">{defaultVoices.map(renderVoice)}</div>
        </TabsContent>
        </Tabs>
      </ScrollArea>
    </div>
  );
}

function HistorySection({
    activeTab,
    onActiveTabChange,
}: TabsContentProps) {

  return (
    <div className="p-4">
        <div className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <div className="space-y-2">
                History content goes here
            </div>
        </div>
    </div>
  )
}