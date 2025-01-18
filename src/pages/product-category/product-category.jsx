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
import Layout from "@/components/app/layout";
import ProductCategoryAdd from "./components/product-category-add.jsx";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Ellipsis, ListCollapse, Pen, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPcategory } from "@/app/reducer/pcategorySlicce.jsx";
import axios from "@/providers/axiosInstance.js";
import { apiUrl } from "@/providers/api-url";
import { defimg } from "@/utils/resize-crop-image.js";
import AppLoading from "@/components/app/app-loading.jsx";

const ProductCategory = () => {
  const dispatch = useDispatch();
  const local = apiUrl.split("/api").join("");
  const { data, loading, error } = useSelector((state) => state?.pcategories);

  useEffect(() => {
    dispatch(getPcategory());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await axios
      .delete(`/product-category/${id}`)
      .then(() => {
        dispatch(getPcategory());
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
            <ProductCategoryAdd />
            <CardHeader className="p-4">
              <div className="flex flex-row justify-between">
                <div>
                  <CardTitle>Product Category Tables</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </div>
                <DialogTrigger>
                  <Button className="h-[30px]">
                    <Plus /> Add Product Category
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
                  <TableHead>Category Name</TableHead>
                  <TableHead>Category Code</TableHead>
                  <TableHead>Description</TableHead>
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
                              permanently delete your data and remove your data
                              from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleDelete(item.product_category_id)
                              }
                              className="bg-red-500"
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                        <TableCell className="font-bold">{index + 1}</TableCell>
                        <TableCell>
                          <img
                            src={`${local}/images/category/${item?.picture}`}
                            alt="product"
                            onError={(e) => (e.target.src = defimg)}
                            className="h-[80px] rounded-lg"
                          />
                        </TableCell>
                        <TableCell>{item.category_name || "N/A"}</TableCell>
                        <TableCell>{item.category_code || "CAT-N/A"}</TableCell>
                        <TableCell>{item.memo || "N/A"}</TableCell>
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
                  <AppLoading />
                </TableBody>
              )}
            </Table>
          </CardContent>
        </Card>
      </Layout>
    </>
  );
};

export default ProductCategory;
