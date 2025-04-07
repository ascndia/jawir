import { DataTable } from "./components/data-table";
import products from "./data/products.json";
import { columns } from "./components/columns";

export const DataTableCase4 = () => <DataTable data={products} columns={columns} />;