import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUpDown,
  Copy,
  FilePenLine,
  Fullscreen,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import axiosInstance from "@/providers/axiosInstance";
import { Button } from "@/components/ui/button";
import { defimg, local } from "@/utils/resize-crop-image";
import { useDispatch } from "react-redux";
import { getProduct } from "@/app/reducer/product-slice";

export const RoomActions = () => {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      await axiosInstance
        .delete(`/room/${id}`)
        .then(() => {
          dispatch(getProduct());
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return { handleDelete };
};

export const RoomColumns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div
          className={`capitalize ${
            status == "available"
              ? "text-green-600"
              : status == "maintenance"
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          {row.getValue("status")}
        </div>
      );
    },
  },
  {
    accessorKey: "picture",
    header: () => <div className="text-start">Picture</div>,
    cell: ({ row }) => {
      const img = row.original.room_pictures[0]?.picture;
      return (
        <img
          src={`${local}/images/rooms/${img}`}
          alt="product"
          onError={(e) => (e.target.src = defimg)}
          className="h-[80px] rounded-lg"
        />
      );
    },
  },
  {
    accessorKey: "room_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Room Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("room_name")}</div>
    ),
  },
  {
    accessorKey: "room_type",
    header: () => <div className="text-center">Room Type</div>,
    cell: ({ row }) => {
      return (
        <div className="text-start capitalize">{row.getValue("room_type")}</div>
      );
    },
  },
  {
    accessorKey: "is_ac",
    header: () => <div className="text-center">AC</div>,
    cell: ({ row }) => {
      const check = row.original.is_ac || false;

      return (
        <div className="flex justify-center">
          <Checkbox checked={check} />
        </div>
      );
    },
  },
  {
    accessorKey: "is_booked",
    header: () => <div className="text-center">Book</div>,
    cell: ({ row }) => {
      const book = row.original.is_booked || false;

      return (
        <div className="flex justify-center">
          <Checkbox checked={book} />
        </div>
      );
    },
  },
  {
    accessorKey: "size",
    header: () => <div className="text-center">Size</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center capitalize">{row.getValue("size")} m²</div>
      );
    },
  },
  {
    accessorKey: "capacity",
    header: () => <div className="text-center">Capacity</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center capitalize">
          {row.getValue("capacity")} p
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-start">Price</div>,
    cell: ({ row }) => {
      return (
        <div className="text-start capitalize">
          $ {row.getValue("price") || "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "discount_rate",
    header: () => <div className="text-center">Discount Rate</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center capitalize">
          {row.getValue("discount_rate") || "0"} %
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original;
      const { handleDelete } = RoomActions();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <Dialog>
            {/* // */}
            {/* <ProductCategoryUpdate items={item} /> */}
            <AlertDialog>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you absolutely sure to Delete this?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your data and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(item.room_id)}
                    className="bg-red-500"
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="text-center">
                  Actions
                </DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() =>
                    navigator.clipboard.writeText(item.product_category_id)
                  }
                >
                  <Copy className="me-1" />
                  Copy ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => console.log(item.category_name)}
                >
                  <Fullscreen className="me-1" />
                  View Item
                </DropdownMenuItem>
                <div className="flex flex-col">
                  <DialogTrigger>
                    <DropdownMenuItem>
                      <FilePenLine className="me-1" /> Edit Item
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <AlertDialogTrigger>
                    <DropdownMenuItem className="text-red-500">
                      <Trash2 className="me-1" /> Delete Item
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </div>
              </DropdownMenuContent>
            </AlertDialog>
          </Dialog>
        </DropdownMenu>
      );
    },
  },
];
