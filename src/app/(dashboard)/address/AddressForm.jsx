'use client';

import '@/app/globals.css';
import classes from './AddressForm.module.css';
import { sorce_sans_3 } from '@/app/utils/fonts';
import { source_serif_4 } from '@/app/utils/fonts';
import { useState } from 'react';

import { addAddress } from './actions';
import SubmitButton from '@/app/components/ui/SubmitButton';
import { useSelector } from 'react-redux';
import CardHeader from '@/app/components/ui/CardHeader';

export default function AddressForm({ propertyList, formTitle }) {
  const userData = useSelector((state) => state.userReducer);
  // console.log(userData);
  
  const [sharedPlaceQty, setSharedPlaceQty] = useState(1);

  const addSharedPlaceHandler = () => {
    setSharedPlaceQty((prevState) => prevState + 1);
  };
  const deleteSharedPlaceHandler = () => {
    setSharedPlaceQty((prevState) => prevState - 1);
  };

  let sharedPlaceQtyArr = [...Array(sharedPlaceQty)];

  return (
    <>
      <CardHeader title={formTitle} />
      <form autoComplete='on' className='form' action={addAddress}>
        <div className='input_block'>
          <input
            type='hidden'
            id='users_id'
            name='users_id'
            value={userData.users_id}
          />
          <label htmlFor='address' className={sorce_sans_3.className}>
            Address
          </label>
          <input
            autoComplete='off'
            type='text'
            id='address'
            name='address'
            placeholder='Example: Kulmakatu 47'
            defaultValue={userData.address || ''}
            className={sorce_sans_3.className}
            // disabled={userData.address}
            required
          />
        </div>

        {sharedPlaceQtyArr.map((item, index) => (
          <div key={index} className='input_block'>
            <label
              htmlFor={`shared_property_type_${index}`}
              className={sorce_sans_3.className}
            >
              Select shared property type
            </label>
            <select
              id={`shared_property_type_${index}`}
              name={`property_types`}
              size='1'
            >
              {propertyList.map((propertyItem, itemIndex) => (
                <option key={propertyItem.id} value={propertyItem.id + 0}>
                  {propertyItem.name}
                </option>
              ))}
            </select>

            {/* show buttons only for the last select element */}
            {index + 1 === sharedPlaceQty && (
              <div className={classes.delete_add_btn_block}>
                {/* add more button condition */}
                {sharedPlaceQty < propertyList.length && (
                  <button
                    type='button'
                    className={
                      sorce_sans_3.className + ' ' + 'form_text_button'
                    }
                    onClick={addSharedPlaceHandler}
                  >
                    + Click to add 1 more property
                  </button>
                )}
                {/* delete button condition */}
                {sharedPlaceQty > 1 && (
                  <button
                    type='button'
                    className={
                      source_serif_4.className +
                      ' ' +
                      'form_text_button delete_text_btn'
                    }
                    onClick={deleteSharedPlaceHandler}
                  >
                    Delete last property
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
        <SubmitButton pendingButtonName={'Saving New Address'} buttonName={'Save New Address'}/>

        {/* {errorIsFound && (
            <InfoQuote data={{ message: error.message, type: 'error' }} />
          )} */}
      </form>
    </>
  );
}
