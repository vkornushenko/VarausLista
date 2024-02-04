import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const selectValues = await request.json();
  // console.log('selectValues');
  // console.log(selectValues);

  // get current user session
  //   const { data: { session } } = await supabase.auth.getSession()

  // insert the data
  const { data, error } = await supabase
    .from('reservations')
    .select(
      `
    *,
    property(id, name)
    `
    )
    .eq('address_id', selectValues.address_id)
    .gte('start_time', selectValues.selectedDayIsoStringFrom)
    .lte('start_time', selectValues.selectedDayIsoStringTo)
    .order('start_time', { ascending: true });

// console.log(data);
  return NextResponse.json({ data, error });
}
