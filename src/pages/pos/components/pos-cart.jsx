import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "@/app/reducer/counter";
import { defimg } from "../../../../../react-ts/src/utils/resize-crop-image";
import { apiUrl } from "@/providers/api-url";

const POSCart = () => {
  const dispatch = useDispatch();
  const local = apiUrl.split("/api").join("");
  const products = useSelector((state) => state?.products?.data);
  const cart = useSelector((state) => state?.counters?.cart);

  const handleQuantityChange = (productId, increment) => {
    const newQty = (cart[productId] || 0) + increment;
    if (newQty <= 0) {
      const updatedCart = { ...cart };
      delete updatedCart[productId];
      dispatch(updateCart(updatedCart));
    } else {
      dispatch(updateCart({ ...cart, [productId]: newQty }));
    }
  };

  // Calculate totals
  const calculateTotals = () => {
    let total = 0;
    Object.entries(cart).forEach(([productId, qty]) => {
      const product = products?.find((p) => p.id === Number(productId));
      if (product) total += product.price * qty;
    });
    const discount = total * 0.01; // Example: 1% discount
    const amount = total - discount;

    return { total, discount, amount };
  };

  const { total, discount, amount } = calculateTotals();

  return (
    <div className="lg:col-span-1 col-span-2 mt-4">
      <Card>
        <CardContent className="p-4">
          <p className="text-xl font-semibold mt-2">Cart Order</p>
          <Separator className="my-2" />
          <div className="flex flex-col gap-2">
            {cart?.map((product) => (
              <Card key={product.product_id}>
                <CardContent className="p-1 flex justify-between">
                  <div className="flex gap-3">
                    <img
                      src={`${local}/images/product/${product?.picture}`}
                      onError={(e) => (e.target.src = defimg)}
                      alt={product?.product_name}
                      className="h-[70px] object-cover"
                    />
                    <div className="flex flex-col justify-between py-1">
                      <p className="font-semibold">{product?.product_name}</p>
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
                        handleQuantityChange(product.product_id, -1)
                      }
                    >
                      <ChevronLeft />
                    </Button>
                    <p className="text-lg mx-2">{} pcs</p>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleQuantityChange(product.product_id, 1)
                      }
                    >
                      <ChevronRight />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator className="my-2" />
          <div className="flex ">
            <div className="w-full">
              <div className="flex justify-between w-full text-md font-semibold">
                <p>Total :</p>
                <p className="text-red-700">$ {total.toFixed(2)}</p>
              </div>
              <div className="flex justify-between w-full text-md font-semibold">
                <p>Discount :</p>
                <p className="text-red-700">$ {discount.toFixed(2)}</p>
              </div>
              <Separator className="my-1" />
              <div className="flex justify-between w-full text-lg font-semibold">
                <p>Amount :</p>
                <p className="text-red-700">$ {amount.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <Button className="w-full mt-2">Check Out</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default POSCart;
