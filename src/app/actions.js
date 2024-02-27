'use server';

// supabase
import { createClient } from '@/app/utils/supabase/server';
import { cookies } from "next/headers";

// get address_id from user_address_map table by user_id
export async function getAddressIdFromUserAddressMapTable(users_id) {
  // no user_id no data fetching
  if (!users_id) {
    return null;
  }
  // connect to supabase
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let { data: user_address_map, error } = await supabase
    .from('user_address_map')
    .select('*')
    .eq('users_id', users_id)
    .single();
  if (error) {
    // console.log('user_address_map for users_id (error) | app/actions.js');
    // console.log(error);
    return null;
  } else {
    // console.log('user_address_map for users_id (data) | app/actions.js');
    // console.log(user_address_map);
    return user_address_map;
  }
}

// get address data by address_id from address table
export async function getAddressDataFromAddressTable(address_id) {
  // avoiding data fetching if no address_id provided
  if (!address_id) {
    return null;
  }

  // connect to supabase
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // fetching data
  let { data: address, error } = await supabase
    .from('address')
    .select('*')
    .eq('id', address_id)
    .single();
  if (error) {
    console.log('error occured while fetching address table | app/action.js');
    console.log(error);
    return null;
  } else {
    // console.log(
    //   'address data from address table (for address_id) | app/action.js'
    // );
    // console.log(address);
    return address;
  }
}

// check if user exists in users (public) table
export async function findUserInUsersTable(user_id) {
  // avoiding data fetching if no address_id provided
  if (!user_id) {
    return null;
  }
  // connect to supabase
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  // fetching data
  let { data: users, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', user_id);
  if (error) {
    console.log(
      'error occured while searching user in users (public) table | app/action.js'
    );
    console.log(error);
    return null;
  } else {
    if(users.length !== 0){
      // console.log('user was found -> user data from users (public) table | app/action.js');
      // console.log(users);
    }
    return users;
  }
}

// inserting user to users (public) table
export async function insertUserInUsersTable(
  user_id,
  name,
  apartment,
  email
) {
  // connect to supabase
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // inserting user
  const { data, error } = await supabase
    .from('users')
    .insert([{ user_id, name, apartment, email }])
    .select();

  if (error) {
    console.log(
      'error occured while inserting new user to (public) table users | app/action.js'
    );
    console.log(error);
    return false;
  } else {
    // console.log(
    //   'show result inserted new user to (public) table users | app/action.js'
    // );
    // console.log(data);
    return data[0];
  }
}
