

export async function getReservations({
  timeInterval,
  // address_id,
  property_id,
}) {
  // console.log(timeInterval)
  // console.log(property_id)
  const selectedDayIsoStringFrom = timeInterval.from;
  const selectedDayIsoStringTo = timeInterval.to;
  // api request
  const res = await fetch(`${location.origin}/api/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      selectedDayIsoStringFrom,
      selectedDayIsoStringTo,
      // address_id,
      property_id,
    }),
  });

  // important to await!!!
  let { error, data } = await res.json();

  if (error) {
    console.log('error from reservations table | apiRequests.js');
    console.log(error);
  }
  if (data) {
    // console.log(json.data);
    // console.log('ReservationData setted to useState() | DateNavigation.jsx')
    // router.refresh()
    // router.push('/reservation')
    // setReservationDataState(data);
    // console.log('data from reservations table | apiRequests.js');
    // console.log(data);
    return data;
  }
}