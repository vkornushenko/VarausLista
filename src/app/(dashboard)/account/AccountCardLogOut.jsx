import classes from './AccountCardLogin.module.css';
import Link from 'next/link';
import { sorce_sans_3 } from '@/app/utils/fonts';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { unsetUser } from '@/redux/features/user-slice';
// import { revalidatePath } from 'next/cache';

export default function AccountCardLogOut() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    // supabase
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signOut();
    if (!error) {
      // unsetUser from Store
      dispatch(unsetUser());
      // revalidatePath('/');
      console.log('logout successfully');
      // // after logout user data is still on account page
      router.refresh();
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
