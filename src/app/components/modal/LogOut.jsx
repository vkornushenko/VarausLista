import Link from 'next/link';
import classes from './PopupMenu.module.css';
import { sorce_sans_3 } from '../../utils/fonts';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

// redux
import { unsetUser } from '@/redux/features/user-slice';
import { useDispatch } from 'react-redux';

export default function LogOut({toggleMenu}) {
  const router = useRouter();
  
  const dispatch = useDispatch();

  const handleLogout = async () => {
    // supabase
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signOut();
    if (!error) {
      // close menu
      toggleMenu();
      // unsetUser from Store
      dispatch(unsetUser());
      // after logout user refresh data from DB
      router.refresh();
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
