import { cookies } from "next/headers";
// fonts
import { source_serif_4 } from '@/app/utils/fonts';
// style
import '@/app/globals.css';
import bg from '../../public/img/bg-img.png';

import Navbar from './components/Navbar';
import StoreProvider from './StoreProvider';

// supabase
import { createClient } from './utils/supabase/server';
import {
  findUserInUsersTable,
  getAddressDataFromAddressTable,
  getAddressIdFromUserAddressMapTable,
  insertUserInUsersTable,
} from './actions';

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
  // connect to supabase
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // console.log('user from supabase (auth) user table');
  // console.log(user);

  // destructure supabase data to userData
  const userData = {
    name: user?.user_metadata.first_name,
    address: undefined,
    apartment: user?.user_metadata.apartment,
    email: user?.email,
    password: user?.user_metadata.password,
    user_id: user?.id,
    address_id: undefined,
    users_id: undefined,
  };

  // console.log('userData from (auth) user table:');
  // console.log(userData);

if(user !== null){



  // checking if user exists in table users by user_id
  const users = await findUserInUsersTable(userData?.user_id);

  // if user not exists -> insert user in users table
  if (users?.length === 0) {
    // inserting user
    const isUserInserted = await insertUserInUsersTable(
      userData?.user_id,
      userData?.name,
      userData?.apartment,
      userData?.email
    );

    // console.log('app/layout.jsx | isUserInserted = ');
    // console.log(isUserInserted);
    // console.log(
    //   'new user was added to users table + users_id was added to userData obj!!!'
    // );

    userData.users_id = isUserInserted?.id;
    // console.log(
    //   'userData after new user was inserted to (public) table users:'
    // );
    // console.log(userData);
  } else {
    // console.log(
    //   'user already was in users table + users_id was added to userData obj!!!'
    // );
    userData.users_id = users[0].id;
  }

  // check users address from user_address_map table
  const user_address_map = await getAddressIdFromUserAddressMapTable(
    userData?.users_id
  );
  // add address_id to userData from user_address_map
  userData.address_id = user_address_map?.address_id;

  // get address name by address_id
  const table_address = await getAddressDataFromAddressTable(
    user_address_map?.address_id
  );
  if (table_address) {
    // console.log(
    //   'adding address_name = (' +
    //     table_address?.address_name +
    //     ') to userData'
    // );
    userData.address = table_address?.address_name;
  }
  // console.log('final userData before adding to Redux Store | app/layout.jsx');
  // console.log(userData);
}

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
