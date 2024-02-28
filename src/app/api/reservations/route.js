import { NextResponse } from 'next/server';
import { createClient } from '@/app/utils/supabase/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  const supabase = createClient();

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
    property(*),
    users(*, user_address_map(*))
    `
    )
    .eq('property_id', selectValues.property_id)
    .gte('start_time', selectValues.selectedDayIsoStringFrom)
    .lte('start_time', selectValues.selectedDayIsoStringTo)
    .order('start_time', { ascending: true });

  if(error){
    console.log('error from reservations/route.js')
    console.log(error)
  }
  else{
    // console.log('data from reservations/route.js')
    // console.log(data)
  }
  return NextResponse.json({ data, error });
}
