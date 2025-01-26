import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPcategory } from "@/app/reducer/pcategorySlicce.jsx";
import Layout from "@/components/app/layout";
import ProductCategoryAdd from "./components/product-category-add.jsx";
import AppDataTable from "@/components/app/table/app-data-table.jsx";
import { ProductCategoryColumns } from "./components/product-category-columns.jsx";

const ProductCategory = () => {
  const dispatch = useDispatch();
  const { pcaData, pcaLoading } = useSelector((state) => state?.pcategories);

  useEffect(() => {
    dispatch(getPcategory());
  }, [dispatch]);

  return (
    <Layout>
      <AppDataTable
        data={pcaData}
        columns={ProductCategoryColumns}
        title="Product Category Tables"
        main="category_name"
        loading={pcaLoading}
        add="Add Category"
        addElement={
          <ProductCategoryAdd
            lastCode={parseInt(pcaData[0]?.category_code.split("-")[1], 10)}
          />
        }
      />
    </Layout>
  );
};

export default ProductCategory;
