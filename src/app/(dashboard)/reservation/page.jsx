import { redirect } from 'next/navigation';
import ReservationCard from './ReservationCard';
import {
  getPropertyData,
  getReservationData,
  getUsersAddressId,
} from './actions';
import { getTimeInterval } from '@/app/utils/time';

// export const dynamic = 'force-dynamic'
// export const revalidate = 0

export default async function ReservationPage() {
  // get address_id via session
  const address_id = await getUsersAddressId();

  // redirect to address if no address attached to user
  if (address_id === null) {
    redirect('/address');
  }

  const propertyData = await getPropertyData(address_id);
  const initialPropertyId = propertyData[0].property_id;

  // // calculate today
  // var now = new Date();

  // var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  // console.log('startOfDay: ' + startOfDay)
  // var startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), (now.getDate() + 1));
  // console.log('startOfTomorrow: ' + startOfTomorrow)

  // const todayIsoString = startOfDay.toISOString();
  // console.log('todayIsoString: ' + todayIsoString)

  // will return initial from/to date ready to set as filter for supabase
  const initialTimeInterval = getTimeInterval(null);

  const reservationData = await getReservationData(
    initialPropertyId,
    initialTimeInterval
  );
  console.log('reservationData from reservations/page.jsx');
  console.log(reservationData);

  return (
    <main>
      <ReservationCard
        initialPropertyId={initialPropertyId}
        // initialTimeInterval={initialTimeInterval}
        propertyData={propertyData}
        initialReservationData={reservationData}
      />
    </main>
  );
}
