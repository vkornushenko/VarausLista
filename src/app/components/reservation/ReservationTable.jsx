import InfoQuote from '../ui/InfoQuote';
import classes from './ReservationTable.module.css';
import TimeInterval from './TimeInterval';

export default function ReservationTable({
  reservationData,
  propertyName,
  selectedDateObject,
}) {
  // console.log('reservationData from ReservationTable.jsx');
  // console.log(reservationData);

  // checking for any reservations for selectedPropertyId
  // const reservationsFound = reservationData?.some(
  //   (item) => item.property_id === selectedPropertyId
  // );
  //console.log('found value = ' + reservationsFound);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // empty reservations message
  const quoteData = {
    message: `${propertyName} is not reserved by your neighbours for ${selectedDateObject?.getDate()} ${
      monthNames[selectedDateObject?.getMonth()]
    }. You can be the first to reserve it.`,
    type: 'info',
  };
  return (
    <>
      {/* <div className='text_block no_content_placeholder'>
        <p>Laundry is not reserved by your neighbours for 19 November.</p>
        <p>You can be the first to reserve it.</p>
      </div> */}
      {reservationData.length === 0 ? (
        <InfoQuote data={quoteData} />
      ) : (
        <>
          <div className={classes.reservations_grid}>
            {/* table header */}
            <div className={classes.reservation_grid__first_column_items}>
              <p className={classes.reservation_grid__header_text}>name</p>
            </div>
            <div className={classes.reservation_grid__middle_column_items}>
              <p className={classes.reservation_grid__header_text}>asunto</p>
            </div>
            {/* <div className={classes.reservation_grid__middle_column_items}>
            <p className={classes.reservation_grid__header_text}>machine</p>
          </div> */}
            <div className={classes.reservation_grid__last_column_items_header}>
              <p className={classes.reservation_grid__header_text}>time</p>
            </div>

            {/* {reservationData.map((item, index) => (
            <>
              {selectedPropertyId === item.property_id && (
                <>
                  <div className={classes.reservation_grid__first_column_items}>
                    {item.name}
                  </div>
                  <div
                    className={classes.reservation_grid__middle_column_items}
                  >
                    {item.apartment}
                  </div>
                  <div className={classes.reservation_grid__middle_column_items}>3</div>
                  <div className={classes.reservation_grid__last_column_items}>
                    <TimeInterval start={item.start_time} end={item.end_time} />
                  </div>

                  <div className={classes.brake_line}></div>
                </>
              )}
            </>
          ))} */}
          </div>
          <div>
            {reservationData.map((reservationItem) => (
              <div
                key={reservationItem.id}
                className={classes.reservation_table__row}
              >
                <div>
                  <p>{reservationItem.users.name}</p>
                </div>
                <div>
                  <p>{reservationItem.users.apartment}</p>
                </div>
                <div>
                  <p>
                    <TimeInterval
                      start={reservationItem.start_time}
                      end={reservationItem.end_time}
                    />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
