import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import {deleteCategory, getCategories} from '../../../http/CategoryAPI'
import {ICategory} from '../../../http/types'
import React, {useContext, useState} from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Link from 'next/link'
import CardActions from "@mui/material/CardActions";
import {AppContext} from "../../../@core/context/AppContext";
import {toastError, toastSuccess} from "../../../toast/toast";
import {useRouter} from "next/router";
import CustomTable, {TableColumn} from "../../../components/CustomTable/CustomTable";

export const getStaticProps = async () => {
  const categories = await getCategories()

  return {props: {categories: categories.results}}
}

export interface ICategories {
  categories: ICategory[]
}

const Categories: React.FC<ICategories> = ({categories: categoryList}) => {
  const [categories, setCategories] = useState(categoryList);
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
    if (selected.length === categories.length) {
      setSelected([]);
    } else {
      setSelected(categories.map(category => category.id));
    }
  };

  const handleDelete = async () => {
    try {
      saveAppState(prevState => ({...prevState, loading: true}));
      for (const item of selected) {
        await deleteCategory(item);
      }
      setCategories((prevState) => prevState.filter((item) => selected.indexOf(item.id) === -1));
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
      await router.push(`/pages/categories/edit/${id}`);
    }
  }

  const isAllSelected = categories.length > 0 && selected.length === categories.length;

  const columns: TableColumn[] = [
    { id: "id", label: "ID" },
    { id: "name", label: "Name" },
    { id: "name_en", label: "Name EN" },
    { id: "name_uz", label: "Name UZ" },
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
        <Link href='/pages/categories/add'>
          <Button type='submit' variant='contained' size='medium'>
            Create Category
          </Button>
        </Link>
      </Box>
      <Card>
        <CardActions sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <CardHeader title='Categories' titleTypographyProps={{variant: 'h6'}}/>
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
          data={categories}
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

export default Categories;
