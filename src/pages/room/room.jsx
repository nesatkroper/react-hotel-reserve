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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Layout from "@/components/app/layout";
import RoomAdd from "./room-add";
import axios from "@/providers/axiosInstance";
import RoomUpdate from "./room-update";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Ellipsis, ListCollapse, Pen, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getRooms } from "@/app/reducer/roomSlice";
import { apiUrl } from "@/providers/api-url";
import defimg from "@/public/default.png";

const Room = () => {
  const dispatch = useDispatch();
  const local = apiUrl.split("/api").join("");
  const rooms = useSelector((state) => state?.rooms?.data);
  const [load, setLoading] = useState(true);

  useEffect(() => {
    if (!rooms) {
      if (rooms !== undefined) setLoading(false);
      dispatch(getRooms());
    }
  }, [rooms]);

  const handleDelete = async (id) => {
    await axios
      .delete(`/room/${id}`)
      .then(() => {
        dispatch(getRooms());
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(true);
      });
  };

  return (
    <>
      <Layout>
        <Card>
          <Dialog>
            <RoomAdd />
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
          </Dialog>
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
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rooms?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-bold">{index + 1}</TableCell>
                    <TableCell>
                      <img
                        src={`${local}/images/rooms/${item?.room_pictures[0]?.picture}`}
                        alt="room"
                        onError={(e) => (e.target.src = defimg)}
                        className="h-[80px] rounded-lg"
                      />
                    </TableCell>
                    <TableCell>{item.room_name}</TableCell>
                    <TableCell>
                      {item.room_type == "single" ? (
                        <p>Single Room</p>
                      ) : item.room_type == "double" ? (
                        <p>Double Room</p>
                      ) : (
                        <p>Suite Room</p>
                      )}
                    </TableCell>
                    <TableCell>$ {item.price}</TableCell>
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
                    <Dialog>
                      <TableCell>
                        {/* THIS IS UPDATE PAGES */}
                        <RoomUpdate optionID={item.room_id} />
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
                            <DropdownMenuItem
                              onClick={() => handleDelete(item.room_id)}
                              className="text-red-600"
                            >
                              <Trash />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </Dialog>
                  </TableRow>
                ))}
                {!load ? (
                  <TableRow>
                    <TableCell colspan={10} className="text-center font-bold">
                      No Data Here 😢
                    </TableCell>
                  </TableRow>
                ) : (
                  ""
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Layout>
    </>
  );
};

export default Room;
