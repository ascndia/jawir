"use client"
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    ColumnDef,
  } from "@tanstack/react-table"
  import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
  } from "@/components/ui/table"
  
  type Person = {
    id: number
    name: string
    email: string
  }
  
  const columns: ColumnDef<Person>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
  ]
  
  const data: Person[] = [
    { id: 1, name: "Jane Doe", email: "jane@example.com" },
    { id: 2, name: "John Smith", email: "john@example.com" },
    { id: 3, name: "Molly Johnson", email: "molly@example.com" },
    { id: 4, name: "Bob Williams", email: "bob@example.com" },
    { id: 5, name: "Samantha Brown", email: "samantha@example.com" },
  ]
  
  export function DataTableCase2() {
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    })
  
    return (
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  