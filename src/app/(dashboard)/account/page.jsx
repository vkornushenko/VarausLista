// supabase
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
// components
import AccountCard from './AccountCard';

export default async function AccountPage() {
  // get user from supabase
  // from supabase we getting user=null or object with data
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // destructure supabase data to userData
  const userData = {
    name: user?.user_metadata.first_name,
    address: user?.user_metadata.address,
    apartment: user?.user_metadata.apartment,
    email: user?.email,
    password: user?.user_metadata.password,
    // invitationLink: 'canBeSendToEmail',
  };

  return (
    <main>
      <AccountCard userData={userData} />
    </main>
  );
}
