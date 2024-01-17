import classes from './AccountCardLogin.module.css';
import Link from 'next/link';
import { sorce_sans_3 } from '@/app/utils/fonts';

import { createBrowserClient } from '@supabase/ssr';

import { useDispatch } from 'react-redux';
import { unsetUser } from '@/redux/features/user-slice';
// import { revalidatePath } from 'next/cache';

export default function AccountCardLogOut() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    // supabase
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    const { error } = await supabase.auth.signOut();
    if (!error) {
      // unsetUser from Store
      dispatch(unsetUser());
    }
    if (error) {
      console.log(error);
    }
  };
  return (
    <div className={classes.login_container}>
      <p className={sorce_sans_3.className}>Want to leave this device?</p>
      <Link
        href='/login'
        className={sorce_sans_3.className}
        onClick={handleLogout}
      >
        LogOut
      </Link>
    </div>
  );
}
