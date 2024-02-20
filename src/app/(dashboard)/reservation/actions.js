'use server';

import { getDurationInSeconds } from '@/app/utils/time';
import { getEndTime } from '@/app/utils/time';
// supabase
import { createClient } from '@/app/utils/supabase/server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// get address and property data by address_id
export async function getPropertyData(address_id) {
  // connect to supabase
  const supabase = createClient();

  let { data, error } = await supabase
    .from('address_property_map')
    .select(
      `
      property_id,
      property(name)
      `
    )
    .eq('address_id', address_id)
    .order('property_id', { ascending: true });
  if (error) {
    console.log(error);
  } else {
    return data;
  }
}

// get reservations data start from Day for address_id
export async function getReservationData(property_id, timeInterval) {
  // console.log(property_id + ' ' + todayIsoString)
  // connect to supabase
  const supabase = createClient();

  const reservationData = await supabase
    .from('reservations')
    .select(
      `
        *,
        property(*),
        users(*, user_address_map(*))
      `
    )
    .eq('property_id', property_id)
    .gte('start_time', timeInterval.from)
    .lte('start_time', timeInterval.to)
    .order('start_time', { ascending: true });
  if (reservationData.error) {
    console.log('error from reservations table - reservations/actions.js');
    console.log(reservationData.error);
    return reservationData.error;
  } else {
    // console.log('data from reservations table - reservations/actions.js');
    // console.log(reservationData.data);
    return reservationData.data;
  }
}

export async function sendReservation(_, reservationFormData) {
  // connect to supabase
  const supabase = createClient();

  // console.log('reservationFormData');
  // console.log(reservationFormData);
  // cleaning data from form
  const cleanReservationFormData = Object.fromEntries(reservationFormData);
  console.log(cleanReservationFormData);
  // return;

  // check server TimeZoneOffset
  const now = new Date()
  const serverTimeZoneOffset = now.getTimezoneOffset();
  console.log('serverTimeZoneOffset')
  console.log(serverTimeZoneOffset)

  // client time zone offset (in min)
  const clientTimeZoneOffset = cleanReservationFormData.clientTimeZoneOffset;
  console.log('clientTimeZoneOffset');
  console.log(clientTimeZoneOffset);

  // will save time in 000Z (-2 hrs for finland)

  let start_time = new Date(cleanReservationFormData.start_time);
  // TimeZoneOffset correction
  // in case server is not in UTC calc a summ of server and client offsets
  const timeZoneOffset = clientTimeZoneOffset - serverTimeZoneOffset;
  // calc start time in UTC
  start_time = new Date(start_time.setHours(start_time.getHours() + timeZoneOffset/60));

  const durationInSeconds = getDurationInSeconds(
    cleanReservationFormData.duration
  );
  console.log(durationInSeconds);

  const end_time = getEndTime(start_time, durationInSeconds);
  console.log(end_time);

  // insert data to supabase
  const { data, error } = await supabase
    .from('reservations')
    .insert([
      {
        users_id: cleanReservationFormData.users_id,
        property_id: cleanReservationFormData.property_id,
        start_time: start_time,
        end_time: end_time,
        extra: `input_time = ${cleanReservationFormData.start_time} | ClientTimezoneOffset = ${cleanReservationFormData.clientTimeZoneOffset} | serverTimeZoneOffset = ${serverTimeZoneOffset} | timeZoneOffset = ${timeZoneOffset} | start_time = ${start_time} | end_time = ${end_time}`,
      },
    ])
    .select();
  if (error) {
    console.log(error);
  } else {
    console.log(
      'this was inserted in reservations table | reservation/actions.js'
    );
    // console.log(data);
    // return;
  }
  revalidatePath('/reservation');
  return true;
  // redirect('/reservation');

  // TODO
  // after form submission
  // modal not closing
  // !!! data not revalidating !!!
}

export async function getPublicUsersIdByUserId(user_id) {
  // connect to supabase
  const supabase = createClient();

  let { data: users, error } = await supabase
    .from('users')
    .select('id')
    .eq('user_id', user_id)
    .single();
  if (error) {
    console.log(error);
  } else {
    // console.log('getPublicUsersIdByUserId | reservation/actions.js');
    // console.log(users);
    return users.id;
  }
}

// get users address_id from user_address_map table
// returns null if no address attached

export async function getUserDataFromSession() {
  // connect to supabase
  const supabase = createClient();

  // getSession().session.user
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.log('error getUserDataFromSession');
    console.log(error);
  } else {
    // console.log('data getUserDataFromSession');
    // console.log(data.session.user);
    if (!data.session?.user) {
      redirect('/login');
    } else {
      return data.session.user;
    }
  }
}

export async function getUsersAddressId() {
  const userFromSession = await getUserDataFromSession();
  if (!userFromSession) {
    redirect('/login');
  }

  const user_id = userFromSession.id;
  // connect to supabase
  const supabase = createClient();

  let { data: users, error } = await supabase
    .from('users')
    .select(
      `
        id,
        user_address_map (
          address_id
        )
      `
    )
    .eq('user_id', user_id)
    .single();
  if (error) {
    console.log('error from getUsersAddressId');
    console.log(error);
  } else {
    // console.log('data from getUsersAddressId')
    // console.log(users.user_address_map[0].address_id)
    // console.log(users?.user_address_map[0]?.address_id)
    return users?.user_address_map[0]?.address_id;
  }
}
