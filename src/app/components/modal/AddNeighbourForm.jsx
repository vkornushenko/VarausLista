import React, { useEffect } from 'react';
import SubmitButton from '../ui/SubmitButton';
import { sorce_sans_3 } from '@/app/utils/fonts';
import { addNeighbour } from '@/app/(dashboard)/address/actions';
import { useFormState } from 'react-dom';
import InfoQuote from '../ui/InfoQuote';

export default function AddNeighbourForm({ address_id, toggleLayover }) {
  const [formActionState, formAction] = useFormState(addNeighbour, null);
  console.log('stateAddNeighbour | AddNeighbourForm.jsx');
  console.log(formActionState);

  useEffect(() => {
    if (formActionState === 'success') {
      toggleLayover();
      console.log('modal closed');
    }
  }, [formActionState]);

  return (
    <form autoComplete='on' className='form' action={formAction}>
      <div className='input_block'>
        <label htmlFor='user_id' className={sorce_sans_3.className}>
          Neighbour User Id
        </label>
        <input
          type='hidden'
          id='address_id'
          name='address_id'
          value={address_id}
        />
        <input
          type='text'
          id='user_id'
          name='user_id'
          placeholder='32cfd5ae-a8bb-4095-9cd2-726b98763427'
          defaultValue=''
          required
        />
      </div>
      <SubmitButton
        buttonName={'Add neighbour'}
        pendingButtonName={'Adding neighbour...'}
      />
      {formActionState && (
        <InfoQuote data={{ message: formActionState, type: 'error' }} />
      )}
    </form>
  );
}
