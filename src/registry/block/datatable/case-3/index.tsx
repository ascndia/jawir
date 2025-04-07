import { DataTable } from "./components/data-table";
import tasks from "./data/tasks.json";
import { columns } from "./components/columns"

export const DataTableCase3 = () => <DataTable data={tasks} columns={columns} />;
