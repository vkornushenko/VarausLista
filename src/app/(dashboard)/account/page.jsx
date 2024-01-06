import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import AccountCard from './AccountCard';

export default async function AccountPage() {
  const supabase = createServerComponentClient({ cookies });
  // destructuring data
  const { data } = await supabase.auth.getSession();
  console.log(data);

  return (
    <main>
      <AccountCard />
    </main>
  );
}
