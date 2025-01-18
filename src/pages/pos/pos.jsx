import Layout from "@/components/app/layout";
import POSSearch from "./components/pos-search";
import POSCart from "./components/pos-cart";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "@/app/reducer/productSlicce";
import { apiUrl } from "@/providers/api-url";
import { addItem } from "@/app/reducer/counter";
import { defimg } from "@/utils/resize-crop-image";
import AppLoading from "@/components/app/app-loading";

const POS = () => {
  const dispatch = useDispatch();
  const local = apiUrl.split("/api").join("");
  const { data, loading, error } = useSelector((state) => state?.products);
  const [isOpenShift, setOpenShift] = useState(
    sessionStorage.getItem("shiftcode") ? true : false
  );

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const handleOpenShift = () => {
    setOpenShift(!isOpenShift);
  };

  const handleAddToCart = (item) => {
    dispatch(addItem(item));
  };

  return (
    <>
      <Layout>
        <div className="p-2">
          <POSSearch shift={isOpenShift} setShift={() => handleOpenShift} />
          <Separator className="my-2" />
          {isOpenShift ? (
            <div className="grid lg:grid-cols-4 md:grid-cols-5 gap-3">
              {!loading ? (
                <ScrollArea className="w-full h-[80vh] col-span-3 rounded-2xl">
                  <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3">
                    {data?.map((item) => (
                      <Card
                        key={item.product_id}
                        onClick={() => handleAddToCart(item)}
                        className="relative cursor-pointer shadow"
                      >
                        <CardContent className="p-0">
                          <div className="bg-white border w-[40px] h-[40px] absolute right-2 top-2 rounded-full flex items-center justify-center transform transition duration-200 active:scale-90">
                            <Heart />
                          </div>
                          <img
                            src={`${local}/images/product/${item?.picture}`}
                            onError={(e) => (e.target.src = defimg)}
                            alt={item?.product_name}
                            className="rounded-t-lg h-[150px] w-full object-cover"
                          />
                          <div className="px-3 pt-1 flex justify-between">
                            <p className="font-semibold text-md">
                              {item?.product_name}
                            </p>
                            <p className="font-bold text-red-500">
                              ${item?.price}
                            </p>
                          </div>
                          <div className="px-3 pb-2 flex justify-between">
                            <p>
                              {item?.categories?.category_name ||
                                "Uncategorized"}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="w-full h-[80vh] col-span-3 rounded-2xl flex  justify-center">
                  <AppLoading />
                  <p className="text-red-500 text-lg"> {error ? error : ""}</p>
                </div>
              )}
              <POSCart />
            </div>
          ) : (
            <p className="text-lg text-center font-semibold">
              Open Shift to continue working...
            </p>
          )}
        </div>
      </Layout>
    </>
  );
};

export default POS;
