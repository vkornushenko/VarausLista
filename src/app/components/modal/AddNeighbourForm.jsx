import React from 'react'
import SubmitButton from '../ui/SubmitButton'
import { sorce_sans_3 } from '@/app/utils/fonts'

export default function AddNeighbourForm() {
  return (
    <form autoComplete='on' className='form' action={''}>
        <div className='input_block'>
        <label htmlFor='user_id' className={sorce_sans_3.className}>
            Neighbours User Id
          </label>
          <input
            type='text'
            id='user_id'
            name='user_id'
            value=''
          />
        </div>
        <SubmitButton />
      </form>
  )
}
