import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader'
import {deleteCategory} from '../../../http/CategoryAPI'
import {ISubCategory} from '../../../http/types'
import React, {useContext, useEffect, useState} from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Link from 'next/link'
import CardActions from "@mui/material/CardActions";
import {AppContext} from "../../../@core/context/AppContext";
import {toastError, toastSuccess} from "../../../toast/toast";
import {useRouter} from "next/router";
import CustomTable, {TableColumn} from "../../../components/CustomTable/CustomTable";
import {deleteSubCategory, getSubCategories} from "../../../http/SubCategoryAPI";

export interface ICategories {
  subCategories: ISubCategory[];
}

const SubCategories: React.FC<ICategories> = ({subCategories: subCategoryList}) => {
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const {saveAppState} = useContext(AppContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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
    if (selected.length === subCategories.length) {
      setSelected([]);
    } else {
      setSelected(subCategories.map(category => category.id));
    }
  };

  const handleDelete = async () => {
    try {
      saveAppState(prevState => ({...prevState, loading: true}));
      for (const item of selected) {
        await deleteSubCategory(item);
      }
      setSubCategories((prevState) => prevState.filter((item) => selected.indexOf(item.id) === -1));
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
      await router.push(`/pages/sub-categories/edit/${id}`);
    }
  }

  const isAllSelected = subCategories.length > 0 && selected.length === subCategories.length;

  const columns: TableColumn[] = [
    { id: "id", label: "ID" },
    { id: "name", label: "Name" },
    { id: "name_en", label: "Name EN" },
    { id: "name_uz", label: "Name UZ" },
    { id: "sub_category", label: "Parent caregory ID" },
  ];

  const fetchCategories = async () => {
    try {
      const subCategories = await getSubCategories();
      setSubCategories(subCategories.results);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  if(loading) {
    return null;
  }

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
          href='/pages/sub-categories/add'
          passHref
        >
          <Button type='submit' variant='contained' size='medium'>
            Create Sub category
          </Button>
        </Link>
      </Box>
      <Card>
        <CardActions sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <CardHeader title='Sub categories' titleTypographyProps={{variant: 'h6'}}/>
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
          data={subCategories}
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

export default SubCategories;
