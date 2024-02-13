import { redirect } from 'next/navigation';
import ReservationCard from './ReservationCard';
import {
  getAddressPropertyData,
  getReservationData,
  getUsersAddressId,
} from './actions';
import { getTimeInterval } from '@/app/utils/time';

export default async function ReservationPage() {
  // get address_id via session
  const address_id = await getUsersAddressId();

  // redirect to address if no address attached to user
  if (address_id === null) {
    redirect('/address');
  }

  const propertyData = await getAddressPropertyData(address_id);
  const initialPropertyId = propertyData[0].property_id;
  // console.log('getAddressPropertyData');
  // console.log(propertyData);




  // // calculate today
  // var now = new Date();

  // var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  // console.log('startOfDay: ' + startOfDay)
  // var startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), (now.getDate() + 1));
  // console.log('startOfTomorrow: ' + startOfTomorrow)

  // const todayIsoString = startOfDay.toISOString();
  // console.log('todayIsoString: ' + todayIsoString)

  const timeInterval = getTimeInterval();







  const reservationData = await getReservationData(
    initialPropertyId,
    timeInterval
  );
  // console.log('reservationData from reservations/page.jsx line 18')
  // console.log(reservationData)

  return (
    <main>
      <ReservationCard
      timeInterval={timeInterval}
        propertyData={propertyData}
        reservationData={reservationData}
        initialPropertyId={initialPropertyId}
      />
    </main>
  );
}
