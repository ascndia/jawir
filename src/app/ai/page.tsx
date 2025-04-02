"use client"
import { Camera, FileCode, Upload, Layout, UserPlus } from "lucide-react"
import { ChevronDown, Code, Image, Box } from "lucide-react"
import { useState } from "react"
import {  Folder, FolderOpen } from "lucide-react"
import { Paperclip, X, Maximize2, ArrowUp } from "lucide-react"
import { Globe, GraduationCap, Users } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu';

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
function TagsSuggestion() {
    const tags = [
      "UI/UX",
      "Design System",
      "Dark Mode",
      "Responsive",
      "Mobile First",
      "Accessibility",
      "Animation",
      "Typography",
      "Color Theory",
      "Layout",
    ]
  
    return (
      <div className="mt-3">
        <p className="mb-2 text-xs font-medium text-gray-400">SUGGESTED TAGS</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-md bg-zinc-800 px-2 py-1 text-xs text-gray-300 hover:bg-zinc-700 cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    )
  }
  
  
function SearchSuggestions() {
  const suggestions = [
    "Trump's 25% Auto Tariffs Implemented",
    "Nintendo to Reveal Switch 2 Details",
    "Democrats Win Wisconsin Supreme Court Race",
    "Myanmar Earthquake Death Toll Rises",
    "Motorola Edge 60 Fusion Launch",
    "iOS 18.4 Bug Resurrects Deleted Apps",
    "Bangkok Building Collapse Rescue Efforts",
    "Greece's 25B Euro Defense Plan",
  ]

  return (
    <div className="p-2">
      <div className="space-y-1">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-zinc-800">
            <Search size={16} className="text-gray-500" />
            <p className="text-sm text-gray-400">{suggestion}</p>
          </div>
        ))}
      </div>
    </div>
  )
}



function SearchCategories() {
  return (
    <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-xl bg-zinc-900 p-3">
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-lg p-2 hover:bg-zinc-800">
          <div className="flex items-center gap-3">
            <Globe size={18} className="text-teal-400" />
            <div>
              <p className="text-sm font-medium text-white">Web</p>
              <p className="text-xs text-gray-400">Search across the entire Internet</p>
            </div>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between rounded-lg p-2 hover:bg-zinc-800">
          <div className="flex items-center gap-3">
            <GraduationCap size={18} className="text-gray-400" />
            <div>
              <p className="text-sm font-medium text-white">Academic</p>
              <p className="text-xs text-gray-400">Search academic papers</p>
            </div>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between rounded-lg p-2 hover:bg-zinc-800">
          <div className="flex items-center gap-3">
            <Users size={18} className="text-gray-400" />
            <div>
              <p className="text-sm font-medium text-white">Social</p>
              <p className="text-xs text-gray-400">Discussions and opinions</p>
            </div>
          </div>
          <Switch />
        </div>
      </div>
    </div>
  )
}


interface Attachment {
  name: string
  size: string
}

interface FileAttachmentsProps {
  attachments: Attachment[]
}
function FileAttachments({ attachments }: FileAttachmentsProps) {
  if (attachments.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {attachments.map((attachment, index) => (
        <div key={index} className="flex items-center gap-2 rounded-md bg-zinc-800 px-2 py-1">
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-400">{attachment.name}</span>
            <span className="text-xs text-gray-500">{attachment.size}</span>
          </div>
          <button className="text-gray-500 hover:text-gray-400">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}


function ActionButtons() {
  const buttons = [
    { icon: <Camera size={16} />, label: "Clone a Screenshot" },
    { icon: <FileCode size={16} />, label: "Import from Figma" },
    { icon: <Upload size={16} />, label: "Upload a Project" },
    { icon: <Layout size={16} />, label: "Landing Page" },
    { icon: <UserPlus size={16} />, label: "Sign Up Form" },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {buttons.map((button, index) => (
        <button
          key={index}
          className="flex items-center gap-2 rounded-md bg-zinc-800 px-3 py-2 text-sm text-gray-300 hover:bg-zinc-700"
        >
          {button.icon}
          <span>{button.label}</span>
        </button>
      ))}
    </div>
  )
}

interface Mode {
    name: string;
    icon: React.ReactNode;
  }
  

  function AgentModeSelector() {
    const [selectedMode, setSelectedMode] = useState("App Developer");
  
    const modes: Mode[] = [
      { name: "App Developer", icon: <Code size={14} /> },
      { name: "Design Pattern Expert", icon: <Layout size={14} /> },
      { name: "Image Analyzer", icon: <Image size={14} /> },
      { name: "Component Designer", icon: <Box size={14} /> },
    ];
  
    const selectMode = (mode: string) => {
      setSelectedMode(mode);
    };
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 bg-zinc-800 text-gray-300 hover:bg-zinc-700 border-none px-2 py-1 h-auto"
          >
            <span className="text-xs">{selectedMode}</span>
            <ChevronDown size={14} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-48 bg-zinc-800 border-zinc-700"
        >
          {modes.map((mode, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => selectMode(mode.name)}
              className="flex items-center gap-2 px-3 py-2 text-xs text-gray-300 hover:bg-zinc-700 cursor-pointer"
            >
              {mode.icon}
              <span>{mode.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }



// function ProjectSelector() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [selectedProject, setSelectedProject] = useState<string | null>(null)

//   const projects = [
//     { id: "p1", name: "E-commerce Dashboard", icon: <Layout size={14} /> },
//     { id: "p2", name: "Portfolio Website", icon: <Code size={14} /> },
//     { id: "p3", name: "Mobile App UI", icon: <Layout size={14} /> },
//     { id: "p4", name: "API Integration", icon: <Code size={14} /> },
//   ]

//   const toggleDropdown = () => setIsOpen(!isOpen)

//   const selectProject = (id: string, name: string) => {
//     setSelectedProject(name)
//     setIsOpen(false)
//   }

//   return (
//     <div className="relative">
//       <button
//         onClick={toggleDropdown}
//         className="flex items-center gap-2 rounded-md bg-zinc-800 px-2 py-1 text-xs text-gray-300 hover:bg-zinc-700"
//       >
//         {selectedProject ? (
//           <>
//             <FolderOpen size={14} className="text-gray-400" />
//             <span>{selectedProject}</span>
//           </>
//         ) : (
//           <>
//             <Folder size={14} className="text-gray-400" />
//             <span>No project selected</span>
//           </>
//         )}
//         <ChevronDown size={14} />
//       </button>

//       {isOpen && (
//         <div className="absolute left-0 top-full z-20 mt-1 w-64 rounded-md bg-zinc-800 py-1 shadow-lg">
//           {projects.map((project) => (
//             <button
//               key={project.id}
//               className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-gray-300 hover:bg-zinc-700"
//               onClick={() => selectProject(project.id, project.name)}
//             >
//               {project.icon}
//               <span>{project.name}</span>
//             </button>
//           ))}
//           <div className="my-1 border-t border-zinc-700"></div>
//           <button className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-gray-300 hover:bg-zinc-700">
//             <Folder size={14} className="text-gray-400" />
//             <span>Create new project...</span>
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }
interface Project {
    id: string;
    name: string;
    icon: React.ReactNode;
  }

function ProjectSelector() {
    const [selectedProject, setSelectedProject] = useState<string | null>(null);
  
    const projects: Project[] = [
      { id: "p1", name: "E-commerce Dashboard", icon: <Layout size={14} /> },
      { id: "p2", name: "Portfolio Website", icon: <Code size={14} /> },
      { id: "p3", name: "Mobile App UI", icon: <Layout size={14} /> },
      { id: "p4", name: "API Integration", icon: <Code size={14} /> },
    ];
  
    const selectProject = (name: string) => {
      setSelectedProject(name);
    };
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2 bg-zinc-800 text-gray-300 hover:bg-zinc-700 border-none justify-start px-2 py-1 h-auto">
            {selectedProject ? (
              <>
                <FolderOpen size={14} className="text-gray-400" />
                <span className="text-xs">{selectedProject}</span>
              </>
            ) : (
              <>
                <Folder size={14} className="text-gray-400" />
                <span className="text-xs">No project selected</span>
              </>
            )}
            <ChevronDown size={14} className="ml-auto" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 bg-zinc-800 border-zinc-700">
          {projects.map((project) => (
            <DropdownMenuItem
              key={project.id}
              onClick={() => selectProject(project.name)}
              className="flex items-center gap-2 px-3 py-2 text-xs text-gray-300 hover:bg-zinc-700 cursor-pointer"
            >
              {project.icon}
              <span>{project.name}</span>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator className="bg-zinc-700" />
          <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-xs text-gray-300 hover:bg-zinc-700 cursor-pointer">
            <Folder size={14} className="text-gray-400" />
            <span>Create new project...</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  

export default function Home() {
  const [showCategories, setShowCategories] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [inputFocused, setInputFocused] = useState(false)
  const [attachments, setAttachments] = useState([
    { name: "Screen_191851...", size: "17.18kB" },
    { name: "Screen_191710...", size: "25.43kB" },
    { name: "Screen_191701...", size: "47.31kB" },
  ])

  const handleFileUpload = () => {
    // In a real app, this would open a file picker
    console.log("File upload clicked")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-4">
      <div className="w-full max-w-2xl">
        {/* Premium banner */}
        <div className="mb-2 flex items-center justify-between rounded-lg bg-zinc-900 px-4 py-2">
          <p className="text-sm text-white">Need more messages? Get higher limits with Premium.</p>
          <div className="flex items-center gap-2">
            <button className="text-sm font-medium text-teal-400 hover:underline">Upgrade Plan</button>
            <X size={16} className="text-gray-400 hover:text-gray-300" />
          </div>
        </div>

        {/* Main input container */}
        <div className="rounded-xl bg-zinc-900 p-4">
          {/* File attachments */}
          <FileAttachments attachments={attachments} />

          {/* Text input */}
          <div className="relative mt-3">
            <textarea
              placeholder="Ask anything..."
              className="min-h-[60px] w-full resize-none bg-transparent text-gray-300 outline-none placeholder:text-gray-500"
              onFocus={() => {
                setInputFocused(true)
                setShowSuggestions(true)
              }}
              onClick={() => setShowCategories((prev) => !prev)}
              defaultValue="advanced ai input. no real functionality, ui ux only. no messages no interfaces. dont include things unrelated to inputs"
            />

            {/* Input controls */}
            <div className="mt-2 flex items-center justify-between">
              <ProjectSelector />

              <div className="flex items-center gap-3">
                <AgentModeSelector />
                <button className="text-gray-400 hover:text-gray-300">
                  <Maximize2 size={18} />
                </button>
                <button className="text-gray-400 hover:text-gray-300" onClick={handleFileUpload}>
                  <Paperclip size={18} />
                </button>
                <button className="rounded-full bg-zinc-700 p-1 text-gray-300 hover:bg-zinc-600">
                  <ArrowUp size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Tags suggestion inside the card */}
          <TagsSuggestion />

          {/* Search categories dropdown */}
          {showCategories && <SearchCategories />}
        </div>

        {/* Action buttons outside the card */}
        <div className="mt-2 rounded-xl bg-zinc-900 p-3">
          <ActionButtons />
        </div>

        {/* Search suggestions */}
        {showSuggestions && (
          <div className="mt-2 rounded-xl bg-zinc-900">
            <SearchSuggestions />
          </div>
        )}
      </div>
    </main>
  )
}

