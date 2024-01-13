// fonts
import { source_serif_4 } from '@/app/utils/fonts';
// style
import '@/app/globals.css';

import Navbar from './components/Navbar';
import bg from '../../public/img/bg-img.png';
import StoreProvider from './StoreProvider';

// supabase
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
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
import { revalidatePath } from 'next/cache';

export default async function RootLayout({ children }) {
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
