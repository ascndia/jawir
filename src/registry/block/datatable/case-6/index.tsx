// filepath: c:\Coding\jawir\src\registry\block\datatable\case-6\index.tsx
import { DataTable } from "./components/data-table";
import projects from "./data/projects.json";
import { columns } from "./components/columns";

export const DataTableCase6 = () => (
  <DataTable
	data={projects.map((project) => ({
	  ...project,
	  status: project.status as "active" | "completed" | "pending" | "canceled",
	}))}
	columns={columns}
  />
);
