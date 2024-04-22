import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader'
import React, {useContext, useState} from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Link from 'next/link'
import CardActions from "@mui/material/CardActions";
import {AppContext} from "../../../@core/context/AppContext";
import {toastError, toastSuccess} from "../../../toast/toast";
import {useRouter} from "next/router";
import CustomTable, {TableColumn} from "../../../components/CustomTable/CustomTable";
import {deleteProduct, getProducts} from "../../../http/ProductsAPI";
import {IProduct} from "../../../http/types";

export const getStaticProps = async () => {
  const products = await getProducts();

  return { props: {products: products.results}, revalidate: 1 }
}

export interface IProductsComponent {
  products: IProduct[];
}

const Products: React.FC<IProductsComponent> = ({products: productList}) => {
  const [products, setProducts] = useState(productList);
  const [selected, setSelected] = useState<number[]>([]);
  const {saveAppState} = useContext(AppContext);
  const router = useRouter();

  const handleToggle = (id: number) => {
    const currentIndex = selected.indexOf(id);
    const newSelected = [...selected];

    if (currentIndex === -1) {
      newSelected.push(id);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelected(newSelected);
  }

  const handleSelectAllClick = () => {
    if (selected.length === products.length) {
      setSelected([]);
    } else {
      setSelected(products.map(product => product.id));
    }
  };

  const handleDelete = async () => {
    try {
      saveAppState(prevState => ({...prevState, loading: true}));
      for (const item of selected) {
        await deleteProduct(item);
      }
      setProducts((prevState) => prevState.filter((item) => selected.indexOf(item.id) === -1));
      setSelected([]);
      toastSuccess("Successfully deleted");
    } catch (e) {
      console.log(e);
      toastError("Error occurred when deleting category");
    } finally {
      saveAppState(prevState => ({...prevState, loading: false}));
    }
  }
  const handleClick = async (e: any, id: number) => {
    if (e.detail === 2) {
      await router.push(`/pages/products/edit/${id}`);
    }
  }

  const isAllSelected = products.length > 0 && selected.length === products.length;

  const columns: TableColumn[] = [
    { id: "id", label: "ID" },
    { id: "name", label: "Name" },
    { id: "description", label: "Description" },
    { id: "category", label: "Category" },
    { id: "price", label: "Price" },
    { id: "currency", label: "Currency" },
    { id: "photo", label: "Photo", type: "img" },
  ];

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '20px'
        }}
      >
        <Link
          href='/pages/products/add'
          passHref
        >
          <Button type='submit' variant='contained' size='medium'>
            Create Product
          </Button>
        </Link>
      </Box>
      <Card>
        <CardActions sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <CardHeader title='Products' titleTypographyProps={{variant: 'h6'}}/>
          {selected.length > 0 && (
            <Button
              onClick={handleDelete}
              type={"submit"}
              variant={"contained"}
              size={"small"}
            >
              Delete category
            </Button>
          )}
        </CardActions>
        <CustomTable
          columns={columns}
          data={products}
          selected={selected}
          onSelectAll={handleSelectAllClick}
          onSelectToggle={handleToggle}
          onRowClick={handleClick}
          isAllSelected={isAllSelected}
        />
      </Card>
    </>
  )
}

export default Products;
