'use server';

import { getDurationInSeconds } from '@/app/utils/time';
import { getEndTime } from '@/app/utils/time';
// supabase
import { createClient } from '@/app/utils/supabase/server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// connect to supabase
// const cookieStore = cookies();
// const supabase = createClient();

// actions

// get address and property data by address_id
export async function getAddressPropertyData(address_id) {
  // connect to supabase
  const supabase = createClient();

  let { data, error } = await supabase
    .from('address_property_map')
    .select(
      `
      *,
      address(address_name),
      property(name)
      `
    )
    .eq('address_id', address_id);
  if (error) {
    console.log(error);
  } else {
    return data;
  }
}

// get reservations data start from Day for address_id
export async function getReservationData(address_id, todayIsoString) {
  // connect to supabase
  const supabase = createClient();

  const reservationData = await supabase
    .from('reservations')
    .select(
      `
        *,
        property(id, name)
        `
    )
    .eq('address_id', address_id)
    .gte('start_time', todayIsoString)
    .order('start_time', { ascending: true });
  if (reservationData.error) {
    console.log(reservationData.error);
    return reservationData.error;
  } else {
    console.log('data from reservations table - reservations/page.jsx');
    console.log(reservationData.data);
    return reservationData.data;
  }
}

export async function sendReservation(reservationFormData) {
  // connect to supabase
  const supabase = createClient();

  // console.log('reservationFormData');
  // console.log(reservationFormData);
  // cleaning data from form
  const cleanReservationFormData = Object.fromEntries(reservationFormData);
  // console.log(cleanReservationFormData);

  // will save time in 000Z (-2 hrs for finland)
  const start = new Date(cleanReservationFormData.start_time);
  // console.log('start');
  // console.log(start);

  // will output hours in local time (+2 hrs for finland)
  // console.log(start.getHours());

  const durationInSeconds = getDurationInSeconds(
    cleanReservationFormData.duration
  );
  // console.log('durationInSeconds');
  // console.log(durationInSeconds);

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
  revalidatePath('/');
  redirect('/reservation');

  // TODO
  // after form submission
  // modal not closing
  // !!! data not revalidating !!!
}

export async function getPublicUsersIdByUserId(user_id){
  // connect to supabase
  const supabase = createClient();


  let { data: users, error } = await supabase
  .from('users')
  .select('id')
  .eq('user_id', user_id)
  .single()
  if(error){
    console.log(error)
  }else{
    console.log('getPublicUsersIdByUserId | reservation/actions.js')
    console.log(users)
    return users.id
  }
}

// get users address_id from user_address_map table
// returns null if no address attached
export async function getUsersAddressId() {
  // connect to supabase
  const supabase = createClient();

  // TODO replase with getSession().session.user
  // get user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  
  console.log('try to get user | reservation/action.js');
  console.log(user?.id);
  console.log(user?.user_metadata);

  const users_id = await getPublicUsersIdByUserId(user?.id);

  // if no user found, redirect to login (maybe better to redirect to account)
  if (user === null) {
    // if user not loged in and trying to reach reservations page
    // he will be redirected to login page
    redirect('/login');
  }

  // get address_id from user_address_map for the user
  let { data: user_address_map, error } = await supabase
    .from('user_address_map')
    .select('address_id')
    .eq('users_id', users_id);
  // if no address attached to user (or error)
  // we will get empty array [] -> so return null
  if (user_address_map.length !== 0) {
    console.log('user_address_map');
    console.log(user_address_map);
    return user_address_map[0].address_id;
  } else {
    console.log('error | reservation/action.js');
    console.log(error);
    return null;
  }
}
