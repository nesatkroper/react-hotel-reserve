import Layout from "@/components/app/layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import DepartmentAdd from "./components/department-add";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDepartments } from "@/app/reducer/departmentSlice";
import NoData from "@/components/app/no-data";
import AppLoading from "@/components/app/app-loading";

const Department = () => {
  const dispatch = useDispatch();
  const { depData, depLoading, depError } = useSelector(
    (state) => state?.departments
  );

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  // console.log(depData[0]?.department_code);

  return (
    <>
      <Layout>
        <Dialog>
          <DepartmentAdd lastCode={depData[0]?.department_code} />
          <Card>
            <CardHeader className="pb-0">
              <div className="flex flex-row justify-between">
                <div>
                  <CardTitle>Department Tables</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </div>
                <DialogTrigger>
                  <Button className="h-[30px]">
                    <Plus /> Add Department
                  </Button>
                </DialogTrigger>
              </div>
              <Separator />
            </CardHeader>
            <CardContent className="p-1">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60px]">No.</TableHead>
                    <TableHead>Department Name</TableHead>
                    <TableHead>Department Code</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                {depLoading ? (
                  <AppLoading cols={4} />
                ) : (
                  <TableBody>
                    {depData?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.department_name}</TableCell>
                        <TableCell>{row.department_code}</TableCell>
                        <TableCell> {row.memo}</TableCell>
                      </TableRow>
                    ))}
                    {depData ? "" : <NoData cols={4} />}
                  </TableBody>
                )}
              </Table>
            </CardContent>
          </Card>
        </Dialog>
      </Layout>
    </>
  );
};

export default Department;
