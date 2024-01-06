import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function POST(request) {
  // write to users: name, email, apartment,
  // write to addresses: address_name, email

  // get user data from form
  // write to auth: email (return userId or email) - need confirmation
  // write to users: name, apartment no, user_uid (automatically)
  // write to address: address, user_uid (automatically) | return addressId

  const user = await request.json();

  // get supabase instance
  const supabase = createRouteHandlerClient({ cookies });

  // get current user session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // insert the data
  const { data, error } = await supabase
    .from('users')
    .insert({
      ...user,
      user_email: session.user.email,
    })
    .select()
    .single();

  return NextResponse.json({ data, error });
}
