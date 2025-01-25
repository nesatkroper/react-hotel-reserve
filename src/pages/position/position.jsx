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
import PositionAdd from "./components/position-add";
import AppLoading from "@/components/app/components/app-loading";
import NoData from "@/components/app/components/no-data";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPositions } from "@/app/reducer/positionSlice";
import { ScrollArea } from "@/components/ui/scroll-area";

const Position = () => {
  const dispatch = useDispatch();
  const { posData, posLoading, posError } = useSelector(
    (state) => state.positions
  );

  useEffect(() => {
    dispatch(getPositions());
  }, [dispatch]);

  // console.log(posData);
  return (
    <>
      <Layout>
        <Dialog>
          <PositionAdd
            lastCode={parseInt(posData[0]?.position_code.split("-")[1], 10)}
          />
          <Card>
            <CardHeader className="pb-0">
              <div className="flex flex-row justify-between">
                <div>
                  <CardTitle>Position Tables</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </div>
                <DialogTrigger>
                  <Button className="h-[30px]">
                    <Plus /> Add Position
                  </Button>
                </DialogTrigger>
              </div>
              <Separator />
            </CardHeader>
            <CardContent className="p-1">
              <Table>
                <ScrollArea className="h-[80vh] w-full rounded-lg">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[70px]">No.</TableHead>
                      <TableHead>Position Name</TableHead>
                      <TableHead>Position Code</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Desription</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  {posLoading ? (
                    <AppLoading cols={6} />
                  ) : (
                    <TableBody>
                      {posData?.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            {item.position_name || "Unnamed"}
                          </TableCell>
                          <TableCell>{item.position_code || "N/A"}</TableCell>
                          <TableCell>
                            {item.departments.department_name}
                          </TableCell>
                          <TableCell>{item.memo || "N/A"}</TableCell>
                        </TableRow>
                      ))}
                      {posData ? "" : <NoData cols={6} />}
                    </TableBody>
                  )}
                </ScrollArea>
              </Table>
            </CardContent>
          </Card>
        </Dialog>
      </Layout>
    </>
  );
};

export default Position;
