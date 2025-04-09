"use client";
import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"

// Define user data structure
interface User {
  id: string
  name: string
  email: string
  role: string
  avatarUrl: string
}

// Sample user data
const users: User[] = [
  {
    id: "1",
    name: "Alex Thompson",
    email: "alex@example.com",
    role: "Admin",
    avatarUrl: "https://i.pravatar.cc/150?u=alex",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Editor",
    avatarUrl: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "michael@example.com",
    role: "Viewer",
    avatarUrl: "https://i.pravatar.cc/150?u=michael",
  },
  {
    id: "4",
    name: "Lisa Rodriguez",
    email: "lisa@example.com",
    role: "Editor",
    avatarUrl: "https://i.pravatar.cc/150?u=lisa",
  },
  {
    id: "5",
    name: "David Williams",
    email: "david@example.com",
    role: "Viewer",
    avatarUrl: "https://i.pravatar.cc/150?u=david",
  },
]

export function TableCase2() {
  // Handlers for user actions
  const handleEdit = (userId: string) => {
    console.log(`Edit user with ID: ${userId}`)
    // Implement edit functionality here
  }

  const handleDelete = (userId: string) => {
    console.log(`Delete user with ID: ${userId}`)
    // Implement delete functionality here
  }

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">User</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell className="hidden md:table-cell">{user.email}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                  user.role === 'Admin' 
                    ? 'bg-blue-50 text-blue-700' 
                    : user.role === 'Editor'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-gray-50 text-gray-700'
                }`}>
                  {user.role}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Open menu">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => handleEdit(user.id)}
                      className="flex items-center cursor-pointer"
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDelete(user.id)}
                      className="flex items-center cursor-pointer text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
