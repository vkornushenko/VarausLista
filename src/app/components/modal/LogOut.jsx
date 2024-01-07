import Link from 'next/link';
import classes from './PopupMenu.module.css';
import { sorce_sans_3 } from '../../utils/fonts';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function LogOut(props) {
  const router = useRouter();
  const handleLogout = async () => {
    // supabase
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signOut();
    if (!error) {
      // router.push('/login');
      // close menu
      props.toggleMenu();
      // after logout user data is still on account page
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
