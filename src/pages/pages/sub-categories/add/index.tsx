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
import {getCategories} from '../../../../http/CategoryAPI'
import {AppContext} from '../../../../@core/context/AppContext'
import {useRouter} from 'next/router'
import {toastError, toastSuccess} from '../../../../toast/toast'
import {createSubCategory} from "../../../../http/SubCategoryAPI";
import {ICategory} from "../../../../http/types";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

export const getStaticProps = async () => {
  const categories = await getCategories();

  return {props: {categories: categories.results}};
}

export interface ISubcategories {
  categories: ICategory[];
}

const SubcategoryAdd = ({categories}: ISubcategories) => {
  const {saveAppState} = useContext(AppContext)
  const router = useRouter();

  return (
    <Card>
      <CardHeader title='Create Subcategory' titleTypographyProps={{variant: 'h6'}}/>
      <Divider sx={{margin: 0}}/>
      <Formik
        initialValues={{
          name: '',
          name_ru: '',
          name_en: '',
          name_uz: '',
          sub_category: 0,
        }}
        onSubmit={async (values, {setSubmitting}) => {
          saveAppState(prevState => ({...prevState, loading: true}))
          try {
            setSubmitting(true)
            await createSubCategory(values);
            toastSuccess('Succesfully Added');
            setSubmitting(false);
            router.push('/pages/sub-categories/');
          } catch (e) {
            setSubmitting(false);
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
                    Subcategory
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
                <Grid item xs={12} sm={12}>
                  <FormControl
                    fullWidth
                  >
                    <InputLabel
                      id="parent-category"
                    >
                      Parent category
                    </InputLabel>
                    <Select
                      id='parent-category'
                      name="sub_category"
                      fullWidth
                      label={"Category"}
                      value={values.sub_category}
                      onChange={handleChange}
                    >
                      {categories.map((category) => (
                        <MenuItem
                          key={category.id}
                          value={category.id}
                        >
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                onClick={() => router.push('/pages/sub-categories/')}
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

export default SubcategoryAdd;
