import CardLayout from '../ui/CardLayout';
import ModalLayout from '../ui/ModalLayout';
import classes from './Reservation.module.css';
// fonts
import { sorce_sans_3 } from '@/app/utils/fonts';

export default function Reservation(props) {

  // get current time, count timezone, prepare for input format
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const currentTime = now.toISOString().slice(0, 16);

  // handle form submission
  const submitHandler = (event) => {
    event.preventDefault();
    // To do: get form data

    // close popup
    props.toggleLayover();
  }

  return (
    <ModalLayout toggleLayover={props.toggleLayover}>
      <CardLayout>
        <h1 className={sorce_sans_3.className + ' ' + classes.popup_header}>
          Reserve Laundry
        </h1>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.input_block}>
            <label htmlFor='username' className={sorce_sans_3.className}>
              Name
            </label>
            <input
              type='text'
              id='username'
              name='first_name'
              placeholder='Your name'
              className={sorce_sans_3.className}
            />
          </div>
          <div className={classes.input_block}>
            <label htmlFor='apartment' className={sorce_sans_3.className}>
              Apartment No
            </label>
            <input
              type='text'
              id='apartment'
              name='apartment'
              placeholder='Apartment number'
              className={sorce_sans_3.className}
            />
          </div>
          <div className={classes.input_block}>
            <label htmlFor='washing_machine' className={sorce_sans_3.className}>
              Washing machine No
            </label>
            <input
              type='text'
              id='washing_machine'
              name='washing machine'
              placeholder='Washing machine number'
              className={sorce_sans_3.className}
            />
          </div>
          <div className={classes.input_block}>
            <label htmlFor='start_time' className={sorce_sans_3.className}>
              Start time
            </label>
            <input
              type='datetime-local'
              id='start_time'
              name='start time'
              defaultValue={currentTime}
              className={sorce_sans_3.className}
            />
          </div>
          <div className={classes.input_block}>
            <label htmlFor='duration' className={sorce_sans_3.className}>
              Duration
            </label>
            <input
              type='time'
              id='duration'
              name='duration'
              defaultValue='02:00'
              className={sorce_sans_3.className}
            />
          </div>
          <button type='submit' className={sorce_sans_3.className + ' ' + classes.submit_button}>Reserve Sauna</button>
        </form>
      </CardLayout>
    </ModalLayout>
  );
}
