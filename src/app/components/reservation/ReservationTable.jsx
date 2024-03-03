import { deleteReservation } from '@/app/(dashboard)/reservation/actions';
import InfoQuote from '../ui/InfoQuote';
import classes from './ReservationTable.module.css';
import '@/app/globals.css';
import TimeInterval from './TimeInterval';
import { motion } from 'framer-motion';
import React from 'react';

import { IoTrashOutline } from 'react-icons/io5';

export default function ReservationTable({
  reservationData,
  propertyName,
  selectedDateObject,
  setIsReserationDataOutdated,
  users_id,
}) {
  // console.log('reservationData[0] from ReservationTable.jsx');
  // console.log(reservationData[0]);

  // checking for any reservations for selectedPropertyId
  // const reservationsFound = reservationData?.some(
  //   (item) => item.property_id === selectedPropertyId
  // );
  // console.log('found value = ' + reservationsFound);

  const deleteReservationHandler = async (reservation_id) => {
    const result = await deleteReservation(reservation_id);
    // console.log(result);
    setIsReserationDataOutdated(true);
  };

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
    <motion.div
      layout
      transition={{ duration: 0.3 }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 100 },
      }}
      initial='hidden'
      animate='visible'
      exit='hidden'
    >
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

            <div className={classes.reservation_grid__time_column_items_header}>
              <p className={classes.reservation_grid__header_text}>time</p>
            </div>
            <div className={classes.reservation_grid__del_column_items}>
            </div>

            {reservationData.map((reservationItem) => (
              <React.Fragment key={reservationItem.id}>
                <div className={classes.reservation_grid__first_column_items}>
                  <p>{reservationItem.users.name}</p>
                </div>
                <div className={classes.reservation_grid__middle_column_items}>
                  <p>{reservationItem.users.apartment}</p>
                </div>

                <div className={classes.reservation_grid__time_column_items}>
                  <p
                    title={reservationItem.extra}
                    className={classes.reservation_grid__content_time}
                  >
                    <TimeInterval
                      start={reservationItem.start_time}
                      end={reservationItem.end_time}
                    />
                  </p>
                </div>
                <div className={classes.reservation_grid__del_column_items}>
                  {reservationItem.users_id === users_id && (
                    <IoTrashOutline
                      width={48}
                      onClick={() =>
                        deleteReservationHandler(reservationItem.id)
                      }
                      className='delete_button'
                    />
                  )}
                </div>
                {/* <div className={classes.brake_line}></div> */}
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}
