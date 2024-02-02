'use server';

import { getDurationInSeconds } from '@/app/utils/time';
import { getEndTime } from '@/app/utils/time';
// supabase
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// connect to supabase
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

// actions

export async function sendReservation(reservationFormData) {
  console.log('reservationFormData');
  console.log(reservationFormData);
  // cleaning data from form
  const cleanReservationFormData = Object.fromEntries(reservationFormData);
  console.log(cleanReservationFormData);

  // will save time in 000Z (-2 hrs for finland)
  const start = new Date(cleanReservationFormData.start_time);
  // console.log('start');
  // console.log(start);

  // will output hours in local time (+2 hrs for finland)
  // console.log(start.getHours());

  const durationInSeconds = getDurationInSeconds(
    cleanReservationFormData.duration
  );
  console.log('durationInSeconds');
  console.log(durationInSeconds);

  const endTime = getEndTime(start, durationInSeconds);

  // insert data to supabase
  const { data, error } = await supabase
    .from('reservations')
    .insert([
      {
        user_id: cleanReservationFormData.user_id,
        name: cleanReservationFormData.first_name,
        address_id: cleanReservationFormData.address_id,
        apartment: cleanReservationFormData.apartment,
        property_id: cleanReservationFormData.property_id,
        start_time: start,
        end_time: endTime,
      },
    ])
    .select();
  if (error) {
    console.log(error);
  } else {
    console.log('this was inserted in reservations table');
    console.log(data);
  }
  revalidatePath('/reservation');
  redirect('/reservation');
}

export async function getUsersAddressId() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // console.log(user.id);

  let { data: user_address_map, error } = await supabase
    .from('user_address_map')
    .select('address_id')
    .eq('user_id', user.id);
  if (user_address_map) {
    return user_address_map[0].address_id;
  } else {
    console.log(error);
  }
}
