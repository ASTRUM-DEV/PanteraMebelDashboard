import Card from '@mui/material/Card'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import CardHeader from '@mui/material/CardHeader'
import {deleteCategory, getCategories} from '../../../http/CategoryAPI'
import {ICategory, ISubCategory} from '../../../http/types'
import React, {useContext, useState} from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Link from 'next/link'
import CardActions from "@mui/material/CardActions";
import Checkbox from "@mui/material/Checkbox";
import {AppContext} from "../../../@core/context/AppContext";
import {toastError, toastSuccess} from "../../../toast/toast";
import {useRouter} from "next/router";
import {useTheme} from "@mui/material/styles";
import CustomTable, {TableColumn} from "../../../components/CustomTable/CustomTable";
import {getSubCategories} from "../../../http/SubCategoryAPI";

export const getStaticProps = async () => {
  const subCategories = await getSubCategories();
  return {props: {subCategories: subCategories.results}};
}

export interface ICategories {
  subCategories: ISubCategory[];
}

const SubCategories: React.FC<ICategories> = ({subCategories: subCategoryList}) => {
  const [subCategories, setSubCategories] = useState(subCategoryList);
  const [selected, setSelected] = useState<number[]>([]);
  const {saveAppState} = useContext(AppContext);
  const theme = useTheme();
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
        await deleteCategory(item);
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
      await router.push(`/pages/categories/edit/${id}`);
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

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '20px'
        }}
      >
        <Link href='/pages/sub-categories/add'>
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
