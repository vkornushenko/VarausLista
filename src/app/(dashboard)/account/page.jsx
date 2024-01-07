import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import AccountCard from './AccountCard';

export default async function AccountPage() {

  const supabase = createServerComponentClient({ cookies });
  // destructuring data
  const { data } = await supabase.auth.getSession();
  // we need only session
  const session = data.session;
  console.log(data);
  //console.log('consol', data.session.user.user_metadata);

  return (
    <main>
      <AccountCard session={session}/>
    </main>
  );
}
