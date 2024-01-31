import React, {useContext} from 'react'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import {Formik} from 'formik'
import { getCategoryById, updateCategory} from '../../../../http/CategoryAPI'
import {AppContext} from '../../../../@core/context/AppContext'
import {useRouter} from 'next/router'
import {toastError, toastSuccess} from 'src/toast/toast'
import {ICategory} from "../../../../http/types";

export async function getServerSideProps({params}: { params: { slug: string } }) {
  const category = await getCategoryById(params.slug);
  
  return {props: {category: category}};
}

interface ICategoryEdit {
  category: ICategory;
}

const CategoryEdit: React.FC<ICategoryEdit> = ({category}) => {
  const {saveAppState} = useContext(AppContext)
  const router = useRouter();
  const { slug } = router.query;

  return (
    <Card>
      <CardHeader title='Create category' titleTypographyProps={{variant: 'h6'}}/>
      <Divider sx={{margin: 0}}/>
      <Formik
        initialValues={{
          name: category.name,
          name_ru: category.name_ru,
          name_en: category.name_en,
          name_uz: category.name_uz
        }}
        onSubmit={async (values, {setSubmitting}) => {
          saveAppState(prevState => ({...prevState, loading: true}))
          try {
            setSubmitting(true)
            await updateCategory(slug, values)
            toastSuccess('Successfully Edited');
            setSubmitting(false)
            router.push('/pages/categories/');
          } catch (e) {
            setSubmitting(false)
            toastError('Error something')
          } finally {
            saveAppState(prevState => ({...prevState, loading: false}))
          }
        }}
      >
        {({values, handleChange, isSubmitting, handleSubmit}) => (
          <form onSubmit={handleSubmit}>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Typography variant='body2' sx={{fontWeight: 600}}>
                    Category
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={values.name}
                    onChange={handleChange}
                    name={'name'}
                    fullWidth
                    type='text'
                    label='Name'
                    placeholder='Category'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={values.name_ru}
                    onChange={handleChange}
                    name={'name_ru'}
                    fullWidth
                    type='text'
                    label='Name RU'
                    placeholder='Category'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={values.name_en}
                    onChange={handleChange}
                    name={'name_en'}
                    fullWidth
                    type='text'
                    label='Name EN'
                    placeholder='Category'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={values.name_uz}
                    onChange={handleChange}
                    name={'name_uz'}
                    fullWidth
                    type='text'
                    label='Name UZ'
                    placeholder='Category'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{marginBottom: 0}}/>
                </Grid>
              </Grid>
            </CardContent>
            <Divider sx={{margin: 0}}/>
            <CardActions>
              <Button size='large' type='submit' disabled={isSubmitting} sx={{mr: 2}} variant='contained'>
                Submit
              </Button>
              <Button
                onClick={() => router.push('/pages/categories/')}
                size='large'
                color='secondary'
                variant='outlined'
              >
                Cancel
              </Button>
            </CardActions>
          </form>
        )}
      </Formik>
    </Card>
  )
}

export default CategoryEdit;
