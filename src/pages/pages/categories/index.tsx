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
import {ICategory} from '../../../http/types'
import React, {useContext, useState} from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Link from 'next/link'
import CardActions from "@mui/material/CardActions";
import Checkbox from "@mui/material/Checkbox";
import {AppContext} from "../../../@core/context/AppContext";
import {toastError, toastSuccess} from "../../../toast/toast";

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

  const isAllSelected = categories.length > 0 && selected.length === categories.length;

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
            Edit Category
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
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell width={"20px"}>
                  <Checkbox
                    checked={isAllSelected}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Name EN</TableCell>
                <TableCell>Name UZ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map(category => (
                <TableRow
                  key={category.id}
                  sx={{
                    '&:last-of-type td, &:last-of-type th': {
                      border: 0
                    }
                  }}
                >
                  <TableCell>
                    <Checkbox
                      checked={selected.indexOf(category.id) !== -1}
                      onChange={() => handleToggle(category.id)}
                    />
                  </TableCell>
                  <TableCell align={"left"} component='th' scope='row'>
                    <Link href={`/pages/categories/edit/${category.id}`}>
                      {category.id}
                    </Link>
                  </TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.name_en}</TableCell>
                  <TableCell>{category.name_uz}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  )
}

export default Categories
