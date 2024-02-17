import CardHeader from '../ui/CardHeader';
import CardLayout from '../ui/CardLayout';
import ModalLayout from '../ui/ModalLayout';

// fonts
import { sorce_sans_3 } from '@/app/utils/fonts';
import '@/app/globals.css';
import { sendReservation } from '@/app/(dashboard)/reservation/actions';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import SubmitButton from '../ui/SubmitButton';
import { getCurrentTimeForInput } from '@/app/utils/time';

export default function ReservationForm({
  setIsReserationDataOutdated,
  selectedDateObject,
  toggleLayover,
  propertyName,
  userData,
  property_id
}) {
  // form state
  const [formActionState, formAction] = useFormState(sendReservation, null);

  // useEffect for form state
  useEffect(() => {
    if (formActionState) {
      // close popup
      toggleLayover();
      // data need to be refreshed
      setIsReserationDataOutdated(true);
    }
  }, [formActionState]);

  // get current time, count timezone, prepared for input defaultValue
  const currentTime = getCurrentTimeForInput(selectedDateObject);

  return (
    <ModalLayout toggleLayover={toggleLayover}>
      <CardLayout>
        <CardHeader title={`Reserve ${propertyName}`} />
        <form className='form' action={formAction}>
          <input
            type='hidden'
            id='users_id'
            name='users_id'
            value={userData.users_id}
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
              disabled={userData.name}
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
              disabled={userData.apartment}
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
          <div className='input_block'>
            <label htmlFor='duration' className={sorce_sans_3.className}>
              Duration (hh:mm)
            </label>
            <input
              type='text'
              id='duration'
              name='duration'
              defaultValue='02:00'
              className={sorce_sans_3.className}
              pattern='([01][0-9]|2[0-3]):([0-5][0-9])'
              required
            />
          </div>
          <SubmitButton
            pendingButtonName={`Reserving ${propertyName}...`}
            buttonName={`Reserve ${propertyName}`}
          />
        </form>
      </CardLayout>
    </ModalLayout>
  );
}
