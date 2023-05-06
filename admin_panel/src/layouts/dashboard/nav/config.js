// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Distributors',
    path: '/dashboard/distributor',
    icon: icon('ic_user'),
  },
  {
    title: 'Retailers',
    path: '/dashboard/retailers',
    icon: icon('ic_user'),
  },
  {
    title: 'Customers',
    path: '/dashboard/customers',
    icon: icon('ic_user'),
  },
  {
    title: 'Transactions',
    path: '/dashboard/transactions',
    icon: icon('ic_lock'),
  },
  {
    title: 'Logout',
    path: '/logout',
    icon: icon('ic_logout'),
  },
];

export default navConfig;
