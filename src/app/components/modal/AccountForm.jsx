import { useRouter } from 'next/navigation';

import '@/app/globals.css';

//supabase
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import CardLayout from '../ui/CardLayout';
import ModalLayout from '../ui/ModalLayout';
// fonts
import { sorce_sans_3 } from '@/app/utils/fonts';
import CardHeader from '../ui/CardHeader';
// import InfoQuote from '../ui/InfoQuote';
// import { useState } from 'react';

export default function AccountForm({
  toggleLayover,
  userData,
  userDataIsEmpty,
}) {
  // // state for error
  // const [errorIsFound, setErrorIsFound] = useState(false);

  const router = useRouter();

  // handle form Create Account submission
  const submitCreateAccountHandler = async (event) => {
    event.preventDefault();
    // set error to undefined when start (for resubmit cases)
    // error = undefined;

    // get form data
    const formData = new FormData(event.target);
    const dataFromForm = Object.fromEntries(formData.entries());

    // connect to supabase
    const supabase = createClientComponentClient();
    const { data, error } = await supabase.auth.signUp({
      email: dataFromForm.email,
      password: dataFromForm.password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
        // user_metadata
        data: {
          first_name: dataFromForm.first_name,
          address: dataFromForm.address,
          apartment: dataFromForm.apartment,
          password: dataFromForm.password,
        },
      },
    });

    if (error) {
      console.log(error);
    } else {
      router.push('/verify');
      // close popup
      toggleLayover();
    }
  };

  // handle Edit Account submission
  const submitEditAccountHandler = async (event) => {
    event.preventDefault();

    // get form data
    const formData = new FormData(event.target);
    const dataFromForm = Object.fromEntries(formData.entries());

    // connect to supabase
    const supabase = createClientComponentClient();
    const { data, error } = await supabase.auth.updateUser({
      data: {
        first_name: dataFromForm.first_name,
        address: dataFromForm.address,
        apartment: dataFromForm.apartment,
      },
    });
    if (error) {
      console.log(error);
    }
    if (!error) {
      router.push('/account');
      router.refresh();
      // close popup
      toggleLayover();
    }
  };

  return (
    <ModalLayout toggleLayover={toggleLayover}>
      <CardLayout>
        <CardHeader title='Create Account' />

        <form
          autoComplete='on'
          className='form'
          onSubmit={
            !userDataIsEmpty
              ? submitEditAccountHandler
              : submitCreateAccountHandler
          }
        >
          <div className='input_block'>
            <label htmlFor='email' className={sorce_sans_3.className}>
              Email address
            </label>
            <input
              autoComplete='email'
              type='email'
              id='email'
              name='email'
              placeholder='Your email'
              defaultValue={userData?.email || ''}
              className={sorce_sans_3.className}
              required
              disabled={!userDataIsEmpty}
            />
          </div>

          <div className='input_block'>
            <label htmlFor='password' className={sorce_sans_3.className}>
              Password
            </label>
            <input
              autoComplete={!userDataIsEmpty ? 'current-password' : 'new-password'}
              type='password'
              id='password'
              name='password'
              placeholder='Password'
              defaultValue={userData?.password || ''}
              className={sorce_sans_3.className}
              required
              disabled={!userDataIsEmpty}
            />
          </div>

          <div className='input_block'>
            <label htmlFor='username' className={sorce_sans_3.className}>
              Name
            </label>
            <input
              autoComplete='given-name'
              type='text'
              id='username'
              name='first_name'
              placeholder='Your name'
              defaultValue={userData?.name || ''}
              className={sorce_sans_3.className}
              required
            />
          </div>

          <div className='input_block'>
            <label htmlFor='address' className={sorce_sans_3.className}>
              Address
            </label>
            <input
              autoComplete='off'
              type='text'
              id='address'
              name='address'
              placeholder='Your address'
              defaultValue={userData?.address || ''}
              className={sorce_sans_3.className}
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
              required
            />
          </div>

          <button
            type='submit'
            className={sorce_sans_3.className + ' ' + 'submit_button'}
          >
            {!userDataIsEmpty ? 'Edit Account' : 'Create Account'}
          </button>

          {/* {errorIsFound && (
            <InfoQuote data={{ message: error.message, type: 'error' }} />
          )} */}
        </form>
      </CardLayout>
    </ModalLayout>
  );
}
