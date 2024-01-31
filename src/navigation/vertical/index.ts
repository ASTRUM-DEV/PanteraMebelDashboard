import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'

import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/',
    },
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Categories',
      icon: AccountPlusOutline,
      path: '/pages/categories',
    },
    {
      title: 'Products',
      icon: AlertCircleOutline,
      path: '/pages/products',
    },
    {
      sectionTitle: 'Web site'
    },
    {
      title: 'Home Slider',
      icon: Login,
      path: '/pages/slider',
    },
    {
      title: 'About Us',
      icon: AlertCircleOutline,
      path: '/pages/about-us',
    },
    {
      title: 'Contact Us',
      icon: AlertCircleOutline,
      path: '/pages/contact',
    },
    {
      sectionTitle: "Orders",
    },
    {
      title: 'Orders',
      icon: AlertCircleOutline,
      path: '/pages/orders',
    },
    {
      title: 'Forms',
      icon: AlertCircleOutline,
      path: '/pages/forms',
    },
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Typography',
      icon: FormatLetterCase,
      path: '/typography'
    },
    {
      title: 'Icons',
      path: '/icons',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Cards',
      icon: CreditCardOutline,
      path: '/cards'
    },
    {
      title: 'Tables',
      icon: Table,
      path: '/tables'
    },
    {
      icon: CubeOutline,
      title: 'Form Layouts',
      path: '/form-layouts'
    }
  ]
}

export default navigation
