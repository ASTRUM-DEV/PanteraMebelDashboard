import Card from '@mui/material/Card'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import CardHeader from '@mui/material/CardHeader'
import { getCategories } from '../../../http/CategoryAPI'
import { ICategory } from '../../../http/types'
import React from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Link from 'next/link'

export const getStaticProps = async () => {
  const categories = await getCategories()
  console.log(categories)

  return { props: { categories: categories.results } }
}

interface ICategories {
  categories: ICategory[]
}

const Categories: React.FC<ICategories> = ({ categories }) => {
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
        <CardHeader title='Categories' titleTypographyProps={{ variant: 'h6' }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
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
