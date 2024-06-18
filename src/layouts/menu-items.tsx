import { routes } from '@/config/routes';
import { BsShop } from 'react-icons/bs';
import { HiOutlineCog8Tooth } from 'react-icons/hi2';
import { LuBarChart3, LuUsers } from 'react-icons/lu';
import { MdQrCodeScanner } from 'react-icons/md';
import { PiBellRinging, PiCurrencyDollar, PiNewspaperClippingLight } from 'react-icons/pi';

export const menuItems: { [key: string]: any } = {
  admin: [
    {
      name: 'Analytics',
      href: routes.admin.dashboard,
      icon: <LuBarChart3 />,
    },
    {
      name: 'Customers',
      href: routes.admin.user.home,
      icon: <LuUsers />,
    },
    {
      name: 'Retailers',
      href: routes.admin.retailer.home,
      icon: <BsShop />,
    },
    {
      name: 'Scans',
      href: routes.admin.user.home,
      icon: <MdQrCodeScanner />,
    },
    {
      name: 'Push Notifications',
      href: routes.admin.user.home,
      icon: <PiBellRinging />,
    },
    {
      name: 'Billings',
      href: routes.admin.user.home,
      icon: <PiCurrencyDollar />,
    },
    {
      name: 'Pages',
      href: routes.admin.user.home,
      icon: <PiNewspaperClippingLight />,
    },
    {
      name: 'General Settings',
      href: routes.admin.generalSettings,
      icon: <HiOutlineCog8Tooth />,
    },
  ],
};
