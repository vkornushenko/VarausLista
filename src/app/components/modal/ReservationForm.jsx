import CardHeader from '../ui/CardHeader';
import CardLayout from '../ui/CardLayout';
import ModalLayout from '../ui/ModalLayout';

// fonts
import { sorce_sans_3 } from '@/app/utils/fonts';
import '@/app/globals.css';
import { sendReservation } from '@/app/(dashboard)/reservation/actions';

export default function ReservationForm({
  userData,
  property_id,
  propertyName,
  toggleLayover,
}) {
  // get current time, count timezone, prepare for input format
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const currentTime = now.toISOString().slice(0, 16);

  // // handle form submission
  // const submitHandler = (event) => {
  //   event.preventDefault();
  //   // To do: get form data

  //   // close popup
  //   toggleLayover();
  // }

  return (
    <ModalLayout toggleLayover={toggleLayover}>
      <CardLayout>
        {/* <h1 className={sorce_sans_3.className + ' ' + classes.popup_header}>
          Reserve Laundry
        </h1> */}
        <CardHeader title={`Reserve ${propertyName}`} />
        <form className='form' action={sendReservation}>
          <input
            type='hidden'
            id='user_id'
            name='user_id'
            value={userData.user_id}
          />
          <input
            type='hidden'
            id='address_id'
            name='address_id'
            value={userData.address_id}
          />
          <input
            type='hidden'
            id='property_id'
            name='property_id'
            value={property_id}
          />
          <div className='input_block'>
            <label htmlFor='given-name' className={sorce_sans_3.className}>
              Name
            </label>
            <input
              autoComplete='given-name'
              type='text'
              id='given-name'
              name='first_name'
              placeholder='Your name'
              defaultValue={userData?.name || ''}
              className={sorce_sans_3.className}
              // disabled={userData.name}
              required
            />
          </div>
          <div className='input_block'>
            <label htmlFor='apartment' className={sorce_sans_3.className}>
              Apartment No
            </label>
            <input
              autoComplete='off'
              type='text'
              id='apartment'
              name='apartment'
              placeholder='Apartment number'
              defaultValue={userData?.apartment || ''}
              className={sorce_sans_3.className}
              // disabled={userData.apartment}
              required
            />
          </div>
          {/* <div className='input_block'>
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
          </div> */}
          <div className='input_block'>
            <label htmlFor='start_time' className={sorce_sans_3.className}>
              Start time
            </label>
            <input
              type='datetime-local'
              id='start_time'
              name='start_time'
              defaultValue={currentTime}
              className={sorce_sans_3.className}
              required
            />
          </div>
          {/* <div className='input_block'>
            <label htmlFor='end_time' className={sorce_sans_3.className}>
              End time
            </label>
            <input
              type='datetime-local'
              id='end_time'
              name='end_time'
              defaultValue={currentTime}
              className={sorce_sans_3.className}
            />
          </div> */}
          <div className='input_block'>
            <label htmlFor='duration' className={sorce_sans_3.className}>
              Duration
            </label>
            <input
              type='time'
              id='duration'
              name='duration'
              defaultValue='02:00'
              className={sorce_sans_3.className}
              required
            />
          </div>
          <button
            type='submit'
            className={sorce_sans_3.className + ' ' + 'submit_button'}
          >
            {`Reserve ${propertyName}`}
          </button>
        </form>
      </CardLayout>
    </ModalLayout>
  );
}
