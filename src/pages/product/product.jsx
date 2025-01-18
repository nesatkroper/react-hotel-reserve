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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Ellipsis, ListCollapse, Pen, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { apiUrl } from "@/providers/api-url";
import { getProduct } from "@/app/reducer/productSlicce.jsx";
import { defimg } from "@/utils/resize-crop-image.js";
import Layout from "@/components/app/layout";
import ProductAdd from "./components/product-add.jsx";
import axios from "@/providers/axiosInstance.js";
import AppLoading from "@/components/app/app-loading.jsx";

const Product = () => {
  const dispatch = useDispatch();
  const local = apiUrl.split("/api").join("");
  const { data, loading, error } = useSelector((state) => state?.products);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await axios
      .delete(`/products/${id}`)
      .then(() => {
        dispatch(getProduct());
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
            <ProductAdd />
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
                    <TableHead>No</TableHead>
                    <TableHead>Picture</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Product Code</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                {!loading ? (
                  <TableBody>
                    {data?.map((item, index) => (
                      <TableRow key={index}>
                        <AlertDialog>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure to Delete this?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your data and remove your
                                data from our servers.
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
                          <TableCell className="font-bold">
                            {index + 1}
                          </TableCell>
                          <TableCell>
                            <img
                              src={`${local}/images/product/${item?.picture}`}
                              alt="product"
                              onError={(e) => (e.target.src = defimg)}
                              className="h-[80px] rounded-lg"
                            />
                          </TableCell>
                          <TableCell>{item.product_name || "N/A"}</TableCell>
                          <TableCell>{item.product_code || "N/A"}</TableCell>
                          <TableCell>
                            {item.categories?.category_name || "N/A"}
                          </TableCell>
                          <TableCell>$ {item.price || "0.99"}</TableCell>
                          <TableCell>{item.discount || "0"} %</TableCell>
                          <TableCell>
                            {item.status == "true" ? (
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
                  </TableBody>
                ) : (
                  <TableBody>
                    <AppLoading className="h-[200px]" />
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

export default Product;
