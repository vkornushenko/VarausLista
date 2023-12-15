import classes from './ReservationTable.module.css';

export default function ReservationTable() {
  return (
    <>
      <div className='text_block no_content_placeholder'>
        <p>Laundry is not reserved by your neighbours for 19 November.</p>
        <p>You can be the first to reserve it.</p>
      </div>
      <div className={classes.reservations_grid}>
        <div className={classes.reservation_grid__first_column_items}>
          <p className={classes.reservation_grid__header_text}>name</p>
        </div>
        <div className={classes.reservation_grid__middle_column_items}>
          <p className={classes.reservation_grid__header_text}>asunto</p>
        </div>
        <div className={classes.reservation_grid__middle_column_items}>
          <p className={classes.reservation_grid__header_text}>machine</p>
        </div>
        <div className={classes.reservation_grid__last_column_items_header}>
          <p className={classes.reservation_grid__header_text}>time</p>
        </div>
        <div className={classes.reservation_grid__first_column_items}>
          Johanna
        </div>
        <div className={classes.reservation_grid__middle_column_items}>A1</div>
        <div className={classes.reservation_grid__middle_column_items}>3</div>
        <div className={classes.reservation_grid__last_column_items}>
          15<sup>00</sup> - 17<sup>00</sup>
        </div>
        <div className={classes.brake_line}></div>
        <div className={classes.reservation_grid__first_column_items}>Hugo</div>
        <div className={classes.reservation_grid__middle_column_items}>A1</div>
        <div className={classes.reservation_grid__middle_column_items}>1</div>
        <div className={classes.reservation_grid__last_column_items}>
          <p className={classes.reservation_grid__content_time}>
            15<sup>00</sup> - 17<sup>00</sup>
          </p>
        </div>
        <div className={classes.brake_line}></div>
        <div className={classes.reservation_grid__first_column_items}>
          Maija
        </div>
        <div className={classes.reservation_grid__middle_column_items}>A7</div>
        <div className={classes.reservation_grid__middle_column_items}>3</div>
        <div className={classes.reservation_grid__last_column_items}>
          <p className={classes.reservation_grid__content_time}>
            17<sup>00</sup> - 19<sup>00</sup>
          </p>
        </div>
        <div className={classes.brake_line}></div>
        <div className={classes.reservation_grid__first_column_items}>
          Heikki
        </div>
        <div className={classes.reservation_grid__middle_column_items}>A7</div>
        <div className={classes.reservation_grid__middle_column_items}>2</div>
        <div className={classes.reservation_grid__last_column_items}>
          <p className={classes.reservation_grid__content_time}>
            21<sup>00</sup> - 23<sup>00</sup>
          </p>
        </div>
      </div>
    </>
  );
}
