import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name, options) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )

  // write to users: name, email, apartment,
  // write to addresses: address_name, email

  // get user data from form
  // write to auth: email (return userId or email) - need confirmation
  // write to users: name, apartment no, user_uid (automatically)
  // write to address: address, user_uid (automatically) | return addressId

  const user = await request.json();

  // get supabase instance
  // const supabase = createRouteHandlerClient({ cookies });

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
