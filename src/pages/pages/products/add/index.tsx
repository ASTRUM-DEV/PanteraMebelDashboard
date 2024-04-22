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
import {AppContext} from '../../../../@core/context/AppContext'
import {useRouter} from 'next/router'
import {toastError, toastSuccess} from '../../../../toast/toast'
import {ISubCategory} from "../../../../http/types";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {createProduct} from "../../../../http/ProductsAPI";
import { getSubCategories } from 'src/http/SubCategoryAPI'

export const getStaticProps = async () => {
  const categories = await getSubCategories();
  
  return {props: {categories: categories.results}};
}

export interface IProductAdd {
  categories: ISubCategory[];
}

const ProductAdd: React.FC<IProductAdd> = ({categories}) => {
  const {saveAppState} = useContext(AppContext);
  const router = useRouter();

  return (
    <Card>
      <CardHeader title='Create Product' titleTypographyProps={{variant: 'h6'}}/>
      <Divider sx={{margin: 0}}/>
      <Formik
        initialValues={{
          name: '',
          description: '',
          category: 0,
          price: 0,
          currency: 'UZS',
          image: null,
        }}
        onSubmit={async (values, {setSubmitting}) => {
          saveAppState(prevState => ({...prevState, loading: true}))
          try {
            setSubmitting(true)
            await createProduct(values);
            toastSuccess('Succesfully Added');
            setSubmitting(false);
            router.push('/pages/products/');
          } catch (e) {
            setSubmitting(false);
            toastError('Error something')
          } finally {
            saveAppState(prevState => ({...prevState, loading: false}))
          }
        }}
      >
        {({
            values,
            handleChange,
            isSubmitting,
            handleSubmit,
            setFieldValue,
          }) => (
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
                    placeholder='Name'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={values.description}
                    onChange={handleChange}
                    name={'description'}
                    fullWidth
                    type='text'
                    label='Description'
                    placeholder='Description'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={values.price}
                    onChange={handleChange}
                    name={'price'}
                    fullWidth
                    type='number'
                    label='Price'
                    placeholder='Price'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                  >
                    <InputLabel
                      id="currency"
                    >
                      Currency
                    </InputLabel>
                    <Select
                      id='currency'
                      name="currency"
                      fullWidth
                      label={"Currency"}
                      value={values.currency}
                      onChange={handleChange}
                    >
                      <MenuItem
                        value={"UZS"}
                      >
                        UZS
                      </MenuItem>
                      <MenuItem
                        value={"USD"}
                      >
                        USD
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl
                    fullWidth
                  >
                    <InputLabel
                      id="category"
                    >
                      Category
                    </InputLabel>
                    <Select
                      id='category'
                      name="category"
                      fullWidth
                      label={"Category"}
                      value={values.category}
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    name={'image'}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const file = event.currentTarget.files?.[0] || null;
                      setFieldValue('image', file);
                    }}
                    fullWidth
                    type='file'
                    label='Image'
                    placeholder='Image'
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

export default ProductAdd;
