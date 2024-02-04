import ReservationCard from './ReservationCard';
import { getUsersAddressId } from './actions';

// supabase
import { createClient } from '@/app/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function ReservationPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // hardcoded address_id
  // const address_id = 54;
  const address_id = await getUsersAddressId();

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
    // console.log(data);
  }

  // console.log('data from address_property_map table reservation/page.jsx');
  // console.log(data);

  // calculate today
  var now = new Date();
  var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  // console.log('Date(' + now.getFullYear() + ' ' + now.getMonth() + ' ' + now.getDate() + ')');
  // console.log('startOfDay');
  // console.log(startOfDay);
  // var timestamp = startOfDay / 1000;
  // console.log('from page.jsx - start of today timestamp');
  // console.log(timestamp);
  const todayIsoString = startOfDay.toISOString();
  // console.log(todayIsoString);

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
  } else {
    // console.log('data from reservations table - reservations/page.jsx')
    // console.log(reservationData.data);
  }

  return (
    <main>
      <ReservationCard
        propertyData={data}
        reservationData={reservationData.data}
      />
    </main>
  );
}
