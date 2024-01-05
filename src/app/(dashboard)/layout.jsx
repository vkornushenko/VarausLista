// //supabase
// import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';

export default async function DashboardLayout({ children }) {
  // // supabase
  // const supabase = createServerComponentClient({ cookies });
  // const { data } = await supabase.auth.getSession();
  // const userEmail = data.session.user.email;

  return (
    <>
    {children}
    </>
    );
}
