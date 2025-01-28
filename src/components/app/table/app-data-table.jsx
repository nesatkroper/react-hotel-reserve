import { useState } from "react";
import PropTypes from "prop-types";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ChevronDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { demo } from "./demo";
import { column } from "./column";
import AppLoading from "../components/app-loading";

const AppDataTable = (props) => {
  const { data, columns, main, btnSize, addElement, title, des, loading } =
    props;

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });
  return (
    <Card>
      <Dialog>
        {addElement}
        <CardHeader className="p-4">
          <div className="flex flex-row justify-between">
            <div>
              <CardTitle>{`${title} Table`}</CardTitle>
              <CardDescription>{des || "Card Description"}</CardDescription>
            </div>
            <DialogTrigger>
              <Button className={`w-[${btnSize}px]`}>
                <Plus /> {`Add ${title}`}
              </Button>
            </DialogTrigger>
          </div>
        </CardHeader>
      </Dialog>
      <CardContent className="p-4 pt-0">
        <div className="w-full">
          <div className="flex gap-4 items-center pb-4">
            <Input
              placeholder={`Filter ${main
                .split("_")
                ?.map(
                  (m) => m.charAt(0).toUpperCase() + m.slice(1).toLowerCase()
                )
                .join(" ")}s...`}
              value={table.getColumn(main)?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn(main)?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <Select onValueChange={(event) => table.setPageSize(Number(event))}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="5 Rows" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={5}>5 Rows</SelectItem>
                <SelectItem value={10}>10 Rows</SelectItem>
                <SelectItem value={15}>15 Rows</SelectItem>
                <SelectItem value={25}>25 Rows</SelectItem>
                <SelectItem value={50}>50 Rows</SelectItem>
                <SelectItem value={100}>100 Rows</SelectItem>
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-[${btnSize}px] ml-auto`}
                >
                  Columns <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  ?.map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id
                          .split("_")
                          ?.map(
                            (m) =>
                              m.charAt(0).toUpperCase() +
                              m.slice(1).toLowerCase()
                          )
                          .join(" ")}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups()?.map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers?.map((header) => {
                      return (
                        <TableHead key={header.id} className="font-bold">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              {loading ? (
                <AppLoading />
              ) : (
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table?.getRowModel()?.rows?.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells()?.map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              )}
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 pt-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>

            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

AppDataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.object),
  main: PropTypes.string,
  btnSize: PropTypes.number,
  addElement: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  title: PropTypes.string,
  des: PropTypes.string,
  loading: PropTypes.bool,
};

AppDataTable.defaultProps = {
  data: demo,
  columns: column,
  main: "name",
  btnSize: 200,
  addElement: null,
  editElement: null,
  title: "Default Title",
  des: "Default Description",
  loading: false,
};

export default AppDataTable;
