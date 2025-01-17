import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/app/layout";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Heart,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPcategory } from "@/app/reducer/pcategorySlicce";
import defimg from "@/public/default.png";
import { getProduct } from "@/app/reducer/productSlicce";
import { apiUrl } from "@/providers/api-url";

const POS = () => {
  const dispatch = useDispatch();
  const local = apiUrl.split("/api").join("");
  const pcategories = useSelector((state) => state?.pcategories?.data);
  const products = useSelector((state) => state?.products?.data);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [order, setOrder] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState();

  useEffect(() => {
    if (!pcategories) dispatch(getPcategory());
    if (!products) dispatch(getProduct());
  }, [pcategories, products]);

  const filtedCate = pcategories?.map(
    ({ product_category_id, category_name }) => ({
      product_category_id,
      category_name,
    })
  );

  const filteredProducts = products?.filter(
    (product) =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (value ? product.product_category_id === Number(value) : true)
  );

  const total = Object.entries(order).reduce((sum, [productId, qty]) => {
    const product = products.find((p) => p.id === Number(productId));
    return sum + (product?.price || 0) * qty;
  }, 0);

  const handleQuantityChange = (productId, increment) => {
    setOrder((prevOrder) => {
      const updatedQuantity = Math.max(
        0,
        (prevOrder[productId] || 0) + increment
      );
      if (updatedQuantity === 0) {
        const { [productId]: _, ...rest } = prevOrder;
        return rest;
      }
      return { ...prevOrder, [productId]: updatedQuantity };
    });
  };

  return (
    <>
      <Layout>
        <div className="p-2">
          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <Label>Product Category</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[250px] justify-between"
                  >
                    {value
                      ? filtedCate?.find(
                          (room) => String(room.product_category_id) === value
                        )?.category_name
                      : "All Category"}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[250px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search product category..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No Product Category found.</CommandEmpty>

                      <CommandGroup>
                        {filtedCate?.map((room) => (
                          <CommandItem
                            key={room.product_category_id}
                            value={String(room.product_category_id)}
                            onSelect={(currentValue) => {
                              setValue(currentValue);
                              setOpen(false);
                              setData((prevData) => ({
                                ...prevData,
                                product_category_id: Number(currentValue),
                              }));
                            }}
                          >
                            {room.category_name}
                            <Check
                              className={cn(
                                "ml-auto",
                                value === room.product_category_id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Search Product</Label>
              <div className="flex gap-1">
                <Input
                  type="text"
                  name="search"
                  className="w-[350px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search your wish product here"
                />
                <Button>
                  <Search />
                </Button>
              </div>
            </div>
          </div>
          <Separator className="my-2" />
          <div className="grid grid-cols-5 gap-3">
            <div className="col-span-3 grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-3 mt-4">
              {products?.map((item, index) => (
                <Card key={index} className="relative">
                  <CardContent className="p-0">
                    <div className="bg-white border w-[40px] h-[40px] absolute right-2 top-2 rounded-full flex items-center justify-center transform transition duration-200 active:scale-90">
                      <Heart />
                    </div>
                    <img
                      src={`${local}/images/product/${item?.picture}`}
                      onError={(e) => (e.target.src = defimg)}
                      alt={item.product_name}
                      className="rounded-t-lg"
                    />
                    <div className="px-3 pt-1 flex justify-between">
                      <p className="font-semibold text-lg">Pizzar</p>
                      <p className="font-bold text-lg text-red-600">$ 100</p>
                    </div>
                    <div className="px-3 pb-2 flex justify-between">
                      <p className="">Food</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="col-span-2 mt-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-xl font-semibold mt-2">Cart Order</p>
                  <Separator className="my-2" />
                  {/* <div className="flex flex-col gap-2">
                    {Array.from({ length: 12 }, (_, i) => (
                      <Card key={i}>
                        <CardContent className="p-1 flex justify-between">
                          <div className="flex gap-3">
                            <img
                              src={defimg}
                              alt=""
                              className="h-[70px] w-[70px] object-cover"
                            />
                            <div className="flex flex-col justify-between py-1">
                              <p className="font-semibold text-lg">Pizzar</p>
                              <p className="text-red-700 font-semibold">
                                $ 100.99
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center pr-2 font-semibold">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleQuantityChange(i.id, -1)}
                              disabled={!order[i.id]}
                            >
                              <ChevronLeft />
                            </Button>
                            <p className="text-lg mx-2">{order} pcs</p>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleQuantityChange(i.id, 1)}
                            >
                              <ChevronRight />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div> */}
                  <div className="flex flex-col gap-2">
                    {Object.entries(order).map(([productId, qty]) => {
                      const product = products.find(
                        (p) => p.id === Number(productId)
                      );
                      return (
                        <Card key={productId}>
                          <CardContent className="p-1 flex justify-between">
                            <div className="flex gap-3">
                              <img
                                src={`${local}/images/product/${product?.picture}`}
                                onError={(e) => (e.target.src = defimg)}
                                alt={product?.product_name}
                                className="h-[70px] w-[70px] object-cover"
                              />
                              <div className="flex flex-col justify-between py-1">
                                <p className="font-semibold text-lg">
                                  {product?.product_name}
                                </p>
                                <p className="text-red-700 font-semibold">
                                  ${product?.price}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center pr-2 font-semibold">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  handleQuantityChange(productId, -1)
                                }
                                disabled={qty === 0}
                              >
                                <ChevronLeft />
                              </Button>
                              <p className="text-lg mx-2">{qty} pcs</p>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  handleQuantityChange(productId, 1)
                                }
                              >
                                <ChevronRight />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  <Separator className="my-2" />
                  <div className="flex ">
                    <div className="w-full">
                      <div className="flex justify-between w-full text-md font-semibold">
                        <p>Total :</p>
                        <p className="text-red-700">$ 100.00</p>
                      </div>
                      <div className="flex justify-between w-full text-md font-semibold">
                        <p>Discount :</p>
                        <p className="text-red-700">$ 0.01</p>
                      </div>
                      <Separator className="my-1" />
                      <div className="flex justify-between w-full text-lg font-semibold">
                        <p>Amount :</p>
                        <p className="text-red-700">$ 99.99</p>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full mt-2">Check Out</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default POS;
