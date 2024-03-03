'use server';

import { getDurationInSeconds } from '@/app/utils/time';
import { getEndTime } from '@/app/utils/time';
// supabase
import { createClient } from '@/app/utils/supabase/server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getReservations } from '@/app/utils/apiRequests';

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
export async function getReservationData(
  address_id,
  property_id,
  timeInterval
) {
  // const address_id = 63;
  // console.log(property_id + ' ' + todayIsoString)
  // connect to supabase
  const supabase = createClient();

  const reservationData = await supabase
    .from('reservations')
    .select(
      `
        id,
        users_id,
        property_id,
        start_time,
        end_time,
        extra,
        property!inner(id, name),
        users!inner(id, name, apartment, email, user_id, user_address_map!inner(id, address_id, users_id))
      `
    )
    .eq('users.user_address_map.address_id', address_id)
    .eq('property.id', property_id)
    .gte('start_time', timeInterval.from)
    // .gte('end_time', timeInterval.from)
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

// check reservation availability
export async function isReservationTimeAvailable(
  property_id,
  timeInterval,
  address_id
) {
  // console.log(property_id + ' ' + todayIsoString)
  // connect to supabase
  const supabase = createClient();

  const reservationData = await supabase
    .from('reservations')
    .select(
      `
        property!inner(id),
        users!inner(user_address_map!inner(address_id))
      `
    )
    .eq('users.user_address_map.address_id', address_id)
    .eq('property.id', property_id)
    .gt('end_time', timeInterval.from)
    .lt('start_time', timeInterval.to)
    .order('start_time', { ascending: true });
  if (reservationData.error) {
    console.log('error from reservations table - reservations/actions.js');
    console.log(reservationData.error);
    return reservationData.error;
  } else {
    console.log('data from reservations table - reservations/actions.js');
    console.log(reservationData.data);
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
  // console.log(cleanReservationFormData);
  // return;

  // check server TimeZoneOffset
  const now = new Date();
  const serverTimeZoneOffset = now.getTimezoneOffset();
  // console.log('serverTimeZoneOffset');
  // console.log(serverTimeZoneOffset);

  // client time zone offset from input (in min)
  const clientTimeZoneOffset = cleanReservationFormData.clientTimeZoneOffset;
  // console.log('clientTimeZoneOffset');
  // console.log(clientTimeZoneOffset);

  // will save time in 000Z (-2 hrs for finland)
  // creating new data object and correcting with timezone offset
  let start_time = new Date(cleanReservationFormData.start_time);

  // TimeZoneOffset correction
  /*
  if server offset is 0 (regularry it is UTC = 0) than we need to -120 - 0 = -120
  if server offset is different (localhost can be -120) than -120 - (-120) = 0
  */
  // in case server is not in UTC calc client - server offsets
  const timeZoneOffset = clientTimeZoneOffset - serverTimeZoneOffset;
  // calc correct start time in UTC
  start_time = new Date(
    start_time.setHours(start_time.getHours() + timeZoneOffset / 60)
  );

  const durationInSeconds = getDurationInSeconds(
    cleanReservationFormData.duration
  );
  // console.log(durationInSeconds);

  const end_time = getEndTime(start_time, durationInSeconds);
  // console.log(end_time);

  // before insert data to reservations checking if this time already reserved
  const timeInterval = {
    from: start_time.toISOString(),
    to: end_time.toISOString(),
  };
  // console.log('timeInterval | reservation/actions.js')
  // console.log(timeInterval)
  const property_id = cleanReservationFormData.property_id;
  // const selectedDateObject = {timeInterval, property_id}

  const address_id = await getUsersAddressId(cleanReservationFormData.users_id);
  if (!address_id) {
    return { error: { message: 'no address found for user' } };
  }
  const reservations = await isReservationTimeAvailable(
    property_id,
    timeInterval,
    address_id
  );
  console.log('reservations in input interval | reservation/actions.js');
  console.log(reservations);
  if (reservations.length !== 0) {
    let response = {
      error: { message: 'The time is already reserved by someone else.' },
    };
    return response;
  }

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
    // console.log(
    //   'this was inserted in reservations table | reservation/actions.js'
    // );
    // console.log(data);
    // return;
  }
  revalidatePath('/reservation');
  let response = {
    success: {
      message: 'The reservation was successfully added to reservation list.',
      data: data,
    },
  };

  return response;
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
export async function getUsersAddressId() {
  // connect to supabase
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const user_id = user?.id;
  if (!user_id) {
    redirect('/login');
  }

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

export async function deleteReservation(reservation_id) {
  // connect to supabase
  const supabase = createClient();

  const { data, error } = await supabase
    .from('reservations')
    .delete()
    .eq('id', reservation_id);

  if (error) {
    console.log(error);
    return false;
  } else {
    console.log(data);
    console.log(`reservation_id = ${reservation_id} was deleted`);
    return true;
  }
}
