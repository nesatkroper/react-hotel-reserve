import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Layout from "@/components/app/layout";
import AppLoading from "@/components/app/components/app-loading";
import { Trash, Plus, Pen, ListCollapse, Ellipsis } from "lucide-react";
import axiosInstance from "@/providers/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "@/app/reducer/employeeSlice";
import { useEffect } from "react";
import { defimg, local } from "@/utils/resize-crop-image";
import NoData from "@/components/app/components/no-data";
import EmployeeAdd from "./components/employee-add";

const Employee = () => {
  const dispatch = useDispatch();
  const { empData, empLoading, empError } = useSelector(
    (state) => state?.employees
  );

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  console.log(empData);

  const handleDelete = async (id) => {
    await axiosInstance
      .delete(`/employee/${id}`)
      .then(() => {
        dispatch(getEmployees());
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Layout>
      <Card>
        <Dialog>
          <EmployeeAdd
            lastCode={parseInt(empData.employee_code?.split("-")[1], 10) || 0}
          />
          <CardHeader className="pb-0">
            <div className="flex flex-row justify-between">
              <div>
                <CardTitle>Product Tables</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </div>
              <DialogTrigger>
                <Button className="h-[30px]">
                  <Plus /> Add Product
                </Button>
              </DialogTrigger>
            </div>
            <Separator />
          </CardHeader>
        </Dialog>
        <CardContent className="p-1">
          <Table>
            <ScrollArea className="h-[80vh] w-full rounded-lg">
              <TableHeader>
                <TableRow>
                  <TableHead className="">No.</TableHead>
                  <TableHead>Picture</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>DOB</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Hired</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              {!empLoading ? (
                <TableBody>
                  {empData?.map((item, index) => (
                    <TableRow key={index}>
                      <AlertDialog>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure to Delete this?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your data and remove your data
                              from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(item.product_id)}
                              className="bg-red-500"
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                        <TableCell className="font-bold">{index + 1}</TableCell>
                        <TableCell>
                          <img
                            src={`${local}/images/employee/${item?.picture}`}
                            alt="product"
                            onError={(e) => (e.target.src = defimg)}
                            className="h-[80px] rounded-lg"
                          />
                        </TableCell>
                        <TableCell>
                          {`${item.first_name} ${item.last_name}`}
                        </TableCell>
                        <TableCell>{item.gender ? "Male" : "Female"}</TableCell>
                        <TableCell>{item.dob || "N/A"}</TableCell>
                        <TableCell>{item.phone || "N/A"}</TableCell>
                        <TableCell>{item.email || "N/A"} %</TableCell>
                        <TableCell>
                          {item.departments?.department_name || "N/A"}
                        </TableCell>
                        <TableCell>
                          {item.positions?.position_name || "N/A"}
                        </TableCell>
                        <TableCell>${item.salary || "N/A"}</TableCell>
                        <TableCell>{item.address || "N/A"}</TableCell>
                        <TableCell>{item.hired_date || "N/A"}</TableCell>
                        <TableCell>
                          {item.account_status == "true" ? (
                            <Checkbox checked disabled />
                          ) : (
                            <Checkbox disabled />
                          )}
                        </TableCell>
                        <Dialog>
                          <TableCell>
                            {/* THIS IS UPDATE PAGES */}
                            {/* <RoomUpdate optionID={item.room_id} /> */}
                            <DropdownMenu>
                              <DropdownMenuTrigger>
                                <Ellipsis />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuLabel className="text-center">
                                  Options
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-blue-600">
                                  <ListCollapse />
                                  Detail
                                </DropdownMenuItem>
                                <DialogTrigger className="w-full">
                                  <DropdownMenuItem className="text-yellow-600">
                                    <Pen />
                                    Update
                                  </DropdownMenuItem>
                                </DialogTrigger>
                                <AlertDialogTrigger className="w-full">
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash />
                                    Delete
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </Dialog>
                      </AlertDialog>
                    </TableRow>
                  ))}
                  {empData ? "" : <NoData colSpan={8} />}
                </TableBody>
              ) : (
                <AppLoading className="h-[200px]" />
              )}
            </ScrollArea>
          </Table>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Employee;
