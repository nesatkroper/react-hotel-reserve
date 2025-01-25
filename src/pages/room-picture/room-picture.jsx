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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Ellipsis, ListCollapse, Pen, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRpicture } from "@/app/reducer/rpictureSlice";
import { apiUrl } from "@/providers/api-url";
import { defimg } from "@/utils/resize-crop-image";
import { ScrollArea } from "@/components/ui/scroll-area";
import Layout from "@/components/app/layout";
import RoomPictureAdd from "./components/room-picture-add";
import axios from "@/providers/axiosInstance";
import RoomPictureUpdate from "./components/room-picture-update";
import NoData from "@/components/app/components/no-data";
import AppLoading from "@/components/app/components/app-loading";

const RoomPicture = () => {
  const dispatch = useDispatch();
  const local = apiUrl.split("/api").join("");
  const { rpiData, rpiLoading, rpiError } = useSelector(
    (state) => state?.rpictures
  );

  useEffect(() => {
    dispatch(getRpicture());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await axios
      .delete(`/room-picture/${id}`)
      .then(() => {
        dispatch(getRpicture());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Layout>
        <Card>
          <Dialog>
            <RoomPictureAdd />
            <CardHeader className="pb-0">
              <div className="flex flex-row justify-between">
                <div>
                  <CardTitle>Room Picture Tables</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </div>
                <DialogTrigger>
                  <Button className="h-[30px]">
                    <Plus /> Add Room Picture
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
                    <TableHead className="w-[70px]">No</TableHead>
                    <TableHead className="w-[150px]">Picture</TableHead>
                    <TableHead>Room Number</TableHead>
                    <TableHead>Picture Name</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                {rpiLoading ? (
                  <AppLoading cols={1} />
                ) : (
                  <TableBody>
                    {rpiData?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-bold">{index + 1}</TableCell>
                        <TableCell>
                          <img
                            src={`${local}/images/rooms/${item.picture}`}
                            onError={(e) => (e.target.src = defimg)}
                            alt="room"
                            className="h-[80px] rounded-lg"
                          />
                        </TableCell>
                        <TableCell>{item?.rooms?.room_name || "N/A"}</TableCell>
                        <TableCell>{item.picture_name || "Unnamed"}</TableCell>
                        <Dialog>
                          <TableCell>
                            {/* THIS IS UPDATE PAGES */}
                            <RoomPictureUpdate item={item} />
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
                    {rpiData ? "" : <NoData cols={4} />}
                  </TableBody>
                )}
              </ScrollArea>
            </Table>
          </CardContent>
        </Card>
      </Layout>
    </>
  );
};

export default RoomPicture;
