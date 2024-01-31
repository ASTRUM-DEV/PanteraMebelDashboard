import Card from '@mui/material/Card'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import CardHeader from '@mui/material/CardHeader'
import {getCategories} from '../../../http/CategoryAPI'
import {ICategory} from '../../../http/types'
import React, {useState} from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Link from 'next/link'
import CardActions from "@mui/material/CardActions";
import Checkbox from "@mui/material/Checkbox";

export const getStaticProps = async () => {
  const categories = await getCategories()
  console.log(categories)

  return {props: {categories: categories.results}}
}

export interface ICategories {
  categories: ICategory[]
}

const Categories: React.FC<ICategories> = ({categories: categoryList}) => {
  const [categories, setCategories] = useState(categoryList);
  const [selected, setSelected] = useState<number[]>([]);

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
    selected.forEach(async () => {

    })
    // setCategories((prevState) => prevState.filter((item) => {
    //   selected.indexOf(item) !== -1
    // }))
    setSelected([]);
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
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    checked={isAllSelected}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell>ID</TableCell>
                <TableCell align='right'>Name</TableCell>
                <TableCell align='right'>Name EN</TableCell>
                <TableCell align='right'>Name UZ</TableCell>
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
                  <TableCell component='th' scope='row'>
                    {category.id}
                  </TableCell>
                  <TableCell align='right'>{category.name}</TableCell>
                  <TableCell align='right'>{category.name_en}</TableCell>
                  <TableCell align='right'>{category.name_uz}</TableCell>
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
