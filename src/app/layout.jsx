// fonts
import { source_serif_4 } from '@/app/utils/fonts';
// style
import '@/app/globals.css';
import bg from '../../public/img/bg-img.png';

import Navbar from './components/Navbar';
import StoreProvider from './StoreProvider';

// supabase
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'VarausLista App',
  description:
    'Online self checkin to your shared property like Sauna, Laundry etc...',
};

// disable the route cache
export const dynamic = 'force-dynamic';
// after a mutation you should also invalidate the cache
// https://nextjs.org/docs/app/api-reference/functions/revalidatePath
// import { revalidatePath } from 'next/cache';

export default async function RootLayout({ children }) {
  // get user from supabase
  // from supabase we getting user=null or object with data
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // TO DO
  // here we need try to check address for this user
  // and put it to store if it exists
  let intersections_user_address = await supabase
    .from('intersections_user_address')
    .select('*')
    .eq('user_id', user?.id)
    .single();
  if (intersections_user_address.error) {
    console.log(intersections_user_address.error);
  } else {
    console.log('from layout.jsx:');
    console.log(intersections_user_address.data);
  }

  let table_address = await supabase
    .from('address')
    .select('*')
    .eq('id', intersections_user_address.data?.address_id)
    .single();
  if (table_address.error) {
    console.log(table_address.error);
  } else {
    console.log('from table address, layout.jsx:');
    console.log(table_address.data);
  }

  // destructure supabase data to userData
  const userData = {
    name: user?.user_metadata.first_name,
    address: table_address.data?.address_name,
    apartment: user?.user_metadata.apartment,
    email: user?.email,
    password: user?.user_metadata.password,
    // invitationLink: 'canBeSendToEmail',
    user_id: user?.id,
    address_id: table_address.data?.id
    // property_id_list
    // property_name_list
  };

  return (
    <html lang='en'>
      <body className={source_serif_4.className}>
        <StoreProvider userData={userData}>
          <div className='page' style={{ backgroundImage: `url(${bg.src})` }}>
            <Navbar />
            {children}
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}