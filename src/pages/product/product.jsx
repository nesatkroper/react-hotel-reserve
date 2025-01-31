import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProduct } from "@/app/reducer/product-slice.jsx";
import { ProductColumns } from "./components/product-columns.jsx";
import Layout from "@/components/app/layout";
import ProductAdd from "./components/product-add.jsx";
import AppDataTable from "@/components/app/table/app-data-table.jsx";

const Product = () => {
  const dispatch = useDispatch();
  const { proData, proLoading } = useSelector((state) => state?.products);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <Layout>
      <AppDataTable
        data={proData}
        columns={ProductColumns}
        title="Product Table"
        main="product_name"
        loading={proLoading}
        add="Add Product"
        addElement={
          <ProductAdd
            lastCode={parseInt(proData[0]?.product_code.split("-")[1], 10)}
          />
        }
      />
    </Layout>
  );
};

export default Product;
