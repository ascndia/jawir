import React from "react";
import { ReusableDialog } from "@/components/ui/reusable-dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, LogOut, LayoutDashboard } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DialogAccounts1A({ open, onOpenChange }: Props) {
  const [selectedAccount, setSelectedAccount] = React.useState<string>("orlando");

  const accounts = [
    {
      id: "orlando",
      name: "Orlando Diggs",
      username: "@orlando",
      email: "orlando@catalog.app",
      avatar: "/path/to/avatar1.png",
    },
    {
      id: "lana",
      name: "Lana Steiner",
      username: "@lana",
      email: "lana@catalog.app",
      avatar: "/path/to/avatar2.png",
    },
    {
      id: "phoenix",
      name: "Phoenix Baker",
      username: "@phoenix",
      email: "phoenix@catalog.app",
      avatar: "/path/to/avatar3.png",
    },
    {
      id: "catalog-team",
      name: "Catalog Team",
      username: "@catalogapp",
      email: "team@catalog.app",
      avatar: "/path/to/avatar4.png",
    },
  ];

  return (
    <ReusableDialog
      open={open}
      onOpenChange={onOpenChange}
      title={
        <div className="flex items-center space-x-3 mb-4">
          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
            <LayoutDashboard size={24} className="text-blue-500" />
          </div>
          <div className="flex flex-col items-start">
            <h2 className="text-lg font-semibold text-gray-800">Manage accounts</h2>
            <p className="text-sm text-gray-600">Switch and manage your accounts.</p>
          </div>
        </div>
      }
      className="!max-w-md"
      footer={
        <div className="flex mt-4 justify-between items-center w-full">
          <Button variant="outline" className="flex items-center space-x-2">
            <LogOut size={16} />
            <span>Log out</span>
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={() => alert(`Selected account: ${selectedAccount}`)}>
              Continue
            </Button>
          </div>
        </div>
      }
    >
      <RadioGroup
        value={selectedAccount}
        onValueChange={setSelectedAccount}
        // className="space-y-3"
      >
        {accounts.map((account) => (
          <label
            key={account.id}
            className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer ${
              selectedAccount === account.id ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={account.avatar} alt={account.name} />
              <AvatarFallback>{account.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-gray-800">{account.name}</p>
              <p className="text-sm text-gray-600">
                {account.username} · {account.email}
              </p>
            </div>
            <RadioGroupItem value={account.id} checked={selectedAccount === account.id} />
          </label>
        ))}      
        <div className="flex items-center justify-center border space-x-2 border-gray-300 p-4 rounded-lg cursor-pointer text-blue-500">
        <Plus size={16} />
        <span className="text-sm font-medium">Add account</span>
      </div>
      </RadioGroup>

    </ReusableDialog>
  );
}