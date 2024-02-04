import Link from 'next/link';
import classes from './PopupMenu.module.css';
import { sorce_sans_3 } from '../../utils/fonts';

import { createClient } from '@/app/utils/supabase/client';
// redux
import { unsetUser } from '@/redux/features/user-slice';
import { useDispatch } from 'react-redux';
// import { revalidatePath } from 'next/cache';

export default function LogOut({ toggleMenu }) {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    // supabase
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (!error) {
      // close menu
      toggleMenu();
      // unsetUser from Store
      dispatch(unsetUser());
    }
    if (error) {
      console.log(error);
    }
  };

  return (
    <Link
      href='/login'
      className={sorce_sans_3.className + ' ' + classes.link}
      onClick={handleLogout}
    >
      Log Out
    </Link>
  );
}
