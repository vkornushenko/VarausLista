import { printTimeInterval } from '@/app/utils/time';
import InfoQuote from '../ui/InfoQuote';
import classes from './ReservationTable.module.css';
import TimeInterval from './TimeInterval';

export default function ReservationTable({
  reservationData,
  selectedPropertyId,
}) {
  // console.log('reservationData from ReservationTable.jsx');
  // console.log(reservationData);
  // const reservationTableData = false;
  const reservationTableData = { data: 'data' };

  const quoteData = {
    message:
      'Laundry is not reserved by your neighbours for 19 November. You can be the first to reserve it.',
    type: 'info',
  };

  return (
    <>
      {/* <div className='text_block no_content_placeholder'>
        <p>Laundry is not reserved by your neighbours for 19 November.</p>
        <p>You can be the first to reserve it.</p>
      </div> */}
      {!reservationTableData ? (
        <InfoQuote data={quoteData} />
      ) : (
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

          {reservationData.map((item, index) => (
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
                  {/* <div className={classes.reservation_grid__middle_column_items}>3</div> */}
                  <div className={classes.reservation_grid__last_column_items}>
                    <TimeInterval start={item.start_time} end={item.end_time} />
                  </div>
                  <div className={classes.brake_line}></div>
                </>
              )}
            </>
          ))}
        </div>
      )}
    </>
  );
}
