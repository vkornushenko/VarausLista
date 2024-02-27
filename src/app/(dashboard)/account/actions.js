'use server';
import { cookies } from "next/headers";

// supabase
import { createClient } from '@/app/utils/supabase/server';

export async function updateUsersTable(id, name, apartment) {
  // connect to supabase
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error, status } = await supabase
    .from('users')
    .update({ name: name, apartment: apartment })
    .eq('id', id)
    .select();

  if (error) {
    console.log(error);
    return false;
  } else {
    console.log(data);
    return { data, status };
  }
}

export async function updateUserAuthSchema(updateData) {
  // connect to supabase
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) {
    return false;
  } else {
    console.log('data from update user (auth schema)');
    // console.log(data)
    let { apartment, first_name } = data.user.user_metadata;
    console.log(apartment);
    console.log(first_name);
    console.log(data.user.user_metadata);
    return true;
  }
}

export async function editAccount(_, accountFormData) {
  // get form data
  const { users_id, first_name, apartment } =
    Object.fromEntries(accountFormData);

  const updateData = { data: {first_name, apartment} };

  const isUserAuthUpdated = await updateUserAuthSchema(updateData);
  if (isUserAuthUpdated) {
    const { data, status } = await updateUsersTable(
      users_id,
      first_name,
      apartment
    );
    console.log('public users table updated | data = ')
    console.log(data);
    console.log(status);
    return { data, status };
  } else {
    return false;
  }
}

export async function createAccount(_, accountFormData) {
  // connect to supabase
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  console.log('createAccount action triggered');

  // get form data
  const { email, password, first_name, apartment } = Object.fromEntries(accountFormData);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // emailRedirectTo: `${location.origin}/api/auth/callback`,
      emailRedirectTo: `${process.env.URL_LOCATION}/api/auth/callback`,
      // user_metadata
      data: {
        first_name,
        apartment,
        password,
      },
    },
  });

  if (error) {
    console.log(error);
    return false;
  } else {
    console.log('data after user sign up')
    console.log(data);
    
    return true;
    // // close popup
    // toggleLayover();
  }
}
