import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(request) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name, options) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );

  const selectValues = await request.json();
  console.log('selectValues');
  console.log(selectValues);

  // get current user session
  //   const { data: { session } } = await supabase.auth.getSession()

  // insert the data
  const { data, error } = await supabase
    .from('reservations')
    .select(
      `
    *,
    shared_property(id, name)
    `
    )
    .eq('address_id', selectValues.address_id)
    .gte('start_time', selectValues.selectedDayIsoStringFrom)
    .lte('start_time', selectValues.selectedDayIsoStringTo)
    .order('start_time', { ascending: true });

// console.log(data);
  return NextResponse.json({ data, error });
}
