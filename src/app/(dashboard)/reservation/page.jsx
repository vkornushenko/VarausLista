import ReservationCard from './ReservationCard';
import {
  getAddressPropertyData,
  getReservationData,
  getUsersAddressId,
} from './actions';

export default async function ReservationPage() {
  const address_id = await getUsersAddressId();

  const data = await getAddressPropertyData(address_id);

  // calculate today
  var now = new Date();
  var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayIsoString = startOfDay.toISOString();

  const reservationData = await getReservationData(address_id, todayIsoString);
  console.log('reservationData from reservations/page.jsx line 18')
  console.log(reservationData)
  

  return (
    <main>
      <ReservationCard
        propertyData={data}
        reservationData={reservationData}
      />
    </main>
  );
}
