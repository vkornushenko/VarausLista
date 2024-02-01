import ReservationCard from './ReservationCard';

// supabase
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export default async function ReservationPage() {
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

  const address_id = 54;

  let { data, error } = await supabase
    .from('address_property_map')
    .select(
      `
        *,
        address(address_name),
        shared_property(name)
        `
    )
    .eq('address_id', address_id);
  if (error) {
    console.log(error);
  } else {
    // console.log(data);
  }

  // console.log('data from intersections_address_property table reservation/page.jsx');
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
      shared_property(id, name)
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
      <ReservationCard propertyData={data} reservationData={reservationData.data} />
    </main>
  );
}
