import Layout from "@/components/app/layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import RoomDialog from "./room-dialog";
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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRooms } from "@/app/reducer/roomSlice";

const Room = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state?.rooms?.data);
  console.log(rooms);

  useEffect(() => {
    if (!rooms) dispatch(getRooms());
  }, [rooms]);
  return (
    <>
      <Layout>
        <Dialog>
          <RoomDialog />
          <Card>
            <CardHeader className="p-4">
              <div className="flex flex-row justify-between">
                <div>
                  <CardTitle>Room Tables</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </div>
                <DialogTrigger>
                  <Button className="h-[30px]">
                    <Plus /> Add Room
                  </Button>
                </DialogTrigger>
              </div>
              <Separator />
            </CardHeader>
            <CardContent className="p-1">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Picture</TableHead>
                    <TableHead>Room Number</TableHead>
                    <TableHead>Room Type</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>AC</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rooms?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.picture}</TableCell>
                      <TableCell>{item.room_name}</TableCell>
                      <TableCell>{item.room_type}</TableCell>
                      <TableCell>${item.price}</TableCell>
                      <TableCell>
                        {item.is_ac == "true" ? (
                          <Checkbox checked disabled />
                        ) : (
                          <Checkbox disabled />
                        )}
                      </TableCell>
                      <TableCell>{item.capacity} People</TableCell>
                      <TableCell>{item.size} m²</TableCell>
                      <TableCell>{item.discount_rate} %</TableCell>
                      <TableCell>
                        {item.status == "available" ? (
                          <p className="text-green-600">Available</p>
                        ) : item.status == "maintenance" ? (
                          <p className="text-yellow-600">Maintenance</p>
                        ) : (
                          <p className="text-red-600">OutofService</p>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Dialog>
      </Layout>
    </>
  );
};

export default Room;
