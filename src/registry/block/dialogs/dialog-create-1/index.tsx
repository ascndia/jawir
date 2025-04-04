import * as React from "react";
import { ReusableDialog } from "@/components/ui/reusable-dialog";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, FileCode, ListCheck, BarChart } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface DocumentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ title, description, icon, onClick }) => {
  return (
    <Card
      className="cursor-pointer shadow-none"
      onClick={onClick}
    >
      <CardHeader className="flex flex-col space-y-2">
        <CardTitle className="flex items-center gap-2 ">        
            <div className="w-6 h-6 text-gray-700">{icon}</div>
            {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export function DialogCreate1A({ open, onOpenChange }: Props) {
  return (
    <ReusableDialog open={open} onOpenChange={onOpenChange} title="Create New Document">
      <div className="grid grid-cols-2 gap-4">
        <DocumentCard
          title="Blank Document"
          description="Start with a clean slate"
          icon={<FileText />}
          onClick={() => console.log("Blank Document selected")}
        />
        <DocumentCard
          title="Technical Documentation"
          description="Template for technical specifications and documentation"
          icon={<FileCode />}
          onClick={() => console.log("Technical Documentation selected")}
        />
        <DocumentCard
          title="Checklist"
          description="Track tasks and progress"
          icon={<ListCheck />}
          onClick={() => console.log("Checklist selected")}
        />
        <DocumentCard
          title="Data Analysis"
          description="Template for data analysis and reporting"
          icon={<BarChart />}
          onClick={() => console.log("Data Analysis selected")}
        />
      </div>
    </ReusableDialog>
  );
}


export function DialogCreate1B({ open, onOpenChange }: Props) {
  const [selectedOption, setSelectedOption] = React.useState<string>("");

  const options = [
    {
      value: "blank",
      title: "Blank Document",
      description: "Start with a clean slate",
      icon: <FileText />,
    },
    {
      value: "technical",
      title: "Technical Documentation",
      description: "Template for technical specifications and documentation",
      icon: <FileCode />,
    },
    {
      value: "checklist",
      title: "Checklist",
      description: "Track tasks and progress",
      icon: <ListCheck />,
    },
    {
      value: "data",
      title: "Data Analysis",
      description: "Template for data analysis and reporting",
      icon: <BarChart />,
    },
  ];

  return (
    <ReusableDialog
      open={open}
      onOpenChange={onOpenChange}
      headerAlignment="left"
      title="Create New Document"
      description="Select a template to start creating your document."
      footer={
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            className="w-auto"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className="w-auto"
            onClick={() => console.log(`Selected option: ${selectedOption}`)}
          >
            Create
          </Button>
        </div>
      }
    >
      <RadioGroup
        className="flex flex-col space-y-4"
        value={selectedOption}
        onValueChange={setSelectedOption}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-start space-x-4 cursor-pointer"
          >
            <RadioGroupItem
              value={option.value}
              className="mt-1"
            />
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 text-gray-700">{option.icon}</div>
                <span className="font-medium">{option.title}</span>
              </div>
              <span className="text-sm text-gray-500">{option.description}</span>
            </div>
          </label>
        ))}
      </RadioGroup>
    </ReusableDialog>
  );
}


export function DialogCreate1C({ open, onOpenChange }: Props) {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  const options = [
    {
      value: "blank",
      title: "Blank Document",
      description: "Start with a clean slate",
      icon: <FileText />,
    },
    {
      value: "technical",
      title: "Technical Documentation",
      description: "Template for technical specifications and documentation",
      icon: <FileCode />,
    },
    {
      value: "checklist",
      title: "Checklist",
      description: "Track tasks and progress",
      icon: <ListCheck />,
    },
    {
      value: "data",
      title: "Data Analysis",
      description: "Template for data analysis and reporting",
      icon: <BarChart />,
    },
  ];

  const handleCheckboxChange = (value: string) => {
    setSelectedOptions((prev) =>
      prev.includes(value)
        ? prev.filter((option) => option !== value) // Remove if already selected
        : [...prev, value] // Add if not selected
    );
  };

  return (
    <ReusableDialog
      open={open}
      headerAlignment="left"
      onOpenChange={onOpenChange}
      title="Create New Document"
      description="Select one or more templates to start creating your document."
      footer={
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={() => console.log(`Selected options: ${selectedOptions}`)}
          >
            Create
          </Button>
        </div>
      }
    >
      <div className="flex flex-col space-y-4">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-start space-x-4 cursor-pointer"
          >
            <Checkbox
              checked={selectedOptions.includes(option.value)}
              onCheckedChange={() => handleCheckboxChange(option.value)}
            />
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 text-gray-700">{option.icon}</div>
                <span className="font-medium">{option.title}</span>
              </div>
              <span className="text-sm text-gray-500">{option.description}</span>
            </div>
          </label>
        ))}
      </div>
    </ReusableDialog>
  );
}

interface Option {
  value: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function DialogCreate1D({ open, onOpenChange }: Props) {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  const options: Option[] = [
    {
      value: "blank",
      title: "Blank Document",
      description: "Start with a clean slate",
      icon: <FileText />,
    },
    {
      value: "technical",
      title: "Technical Documentation",
      description: "Template for technical specifications and documentation",
      icon: <FileCode />,
    },
    {
      value: "checklist",
      title: "Checklist",
      description: "Track tasks and progress",
      icon: <ListCheck />,
    },
    {
      value: "data",
      title: "Data Analysis",
      description: "Template for data analysis and reporting",
      icon: <BarChart />,
    },
  ];

  const handleCheckboxChange = (value: string) => {
    setSelectedOptions((prev) =>
      prev.includes(value)
        ? prev.filter((option) => option !== value) // Remove if already selected
        : [...prev, value] // Add if not selected
    );
  };

  return (
    <ReusableDialog
        headerAlignment="left"
      open={open}
      onOpenChange={onOpenChange}
      title="Create New Document"
      description="Select one or more templates to start creating your document."
      footer={
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {console.log(`Selected options: ${selectedOptions}`); onOpenChange(false);}}
          >
            Create
          </Button>
        </div>
      }
    >
      <div className="flex flex-col space-y-4">
        {options.map((option) => (
          <Card
            key={option.value}
            className={`cursor-pointer border ${
              selectedOptions.includes(option.value) ? "border-primary" : ""
            } hover:shadow-lg transition-shadow`}
            onClick={() => {handleCheckboxChange(option.value)}}
          >
            <CardHeader className="flex items-start space-x-4 p-4">
              <Checkbox
              className="sr-only"
                checked={selectedOptions.includes(option.value)}
                onCheckedChange={() => handleCheckboxChange(option.value)}
              />
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 text-gray-700">{option.icon}</div>
                  <CardTitle>{option.title}</CardTitle>
                </div>
                <CardDescription>{option.description}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </ReusableDialog>
  );
}

import { Input } from "@/components/ui/input";


export function DialogCreate1E({ open, onOpenChange }: Props) {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [documentName, setDocumentName] = React.useState<string>("");

  const options: Option[] = [
    {
      value: "blank",
      title: "Blank Document",
      description: "Start with a clean slate",
      icon: <FileText />,
    },
    {
      value: "technical",
      title: "Technical Documentation",
      description: "Template for technical specifications and documentation",
      icon: <FileCode />,
    },
    {
      value: "checklist",
      title: "Checklist",
      description: "Track tasks and progress",
      icon: <ListCheck />,
    },
    {
      value: "data",
      title: "Data Analysis",
      description: "Template for data analysis and reporting",
      icon: <BarChart />,
    },
  ];

  const handleCheckboxChange = (value: string) => {
    setSelectedOptions((prev) =>
      prev.includes(value)
        ? prev.filter((option) => option !== value) // Remove if already selected
        : [...prev, value] // Add if not selected
    );
  };

  const handleCreate = () => {
    console.log(`Document Name: ${documentName}`);
    console.log(`Selected Options: ${selectedOptions}`);
    onOpenChange(false);
  };

  return (
    <ReusableDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create New Document"
      footer={
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!documentName || selectedOptions.length === 0}
          >
            Create
          </Button>
        </div>
      }
    >
      <div className="flex flex-col space-y-4">
        {/* Text Input for Document Name */}
        <div>
          <label htmlFor="document-name" className="block text-sm font-medium text-gray-700">
            Document Name
          </label>
          <Input
            id="document-name"
            placeholder="Enter document name"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            className="mt-1"
          />
        </div>

        {/* Card-Based Multi-Select Options */}
        {options.map((option) => (
          <Card
            key={option.value}
            className={`cursor-pointer border ${
              selectedOptions.includes(option.value) ? "border-primary" : ""
            } hover:shadow-lg transition-shadow`}
            onClick={() => handleCheckboxChange(option.value)}
          >
            <CardHeader className="flex items-start space-x-4 p-4">
              <Checkbox
                className="sr-only"
                checked={selectedOptions.includes(option.value)}
                onCheckedChange={() => handleCheckboxChange(option.value)}
              />
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 text-gray-700">{option.icon}</div>
                  <CardTitle>{option.title}</CardTitle>
                </div>
                <CardDescription>{option.description}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </ReusableDialog>
  );
}