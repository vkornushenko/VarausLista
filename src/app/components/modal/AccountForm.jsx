import { useRouter } from 'next/navigation';

import '@/app/globals.css';

//supabase
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import CardLayout from '../ui/CardLayout';
import ModalLayout from '../ui/ModalLayout';
// fonts
import { sorce_sans_3 } from '@/app/utils/fonts';
import CardHeader from '../ui/CardHeader';
import InfoQuote from '../ui/InfoQuote';
import { useState } from 'react';

export default function AccountForm(props) {
  // // state for error
  // const [errorIsFound, setErrorIsFound] = useState(false);

  const router = useRouter();

  // handle form submission
  const submitHandler = async (event) => {
    event.preventDefault();
    // set error to undefined when start (for resubmit cases)
    // error = undefined;

    // To do: get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    // const newUser = {
    //   first_name: data.first_name,
    //   address: data.address,
    //   apartment: data.apartment,
    //   email: data.email,
    //   password: data.password,
    // };

    // connect to supabase
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
        // user_metadata
        data: {
          first_name: data.first_name,
          address: data.address,
          apartment: data.apartment,
          password: data.password,
        },
      },
    });

    if (error) {
      // setErrorIsFound(true);
      console.log(error.message);
    } else {
      router.push('/verify');
      // close popup
      props.toggleLayover();
    }
  };

  return (
    <ModalLayout toggleLayover={props.toggleLayover}>
      <CardLayout>
        <CardHeader title='Create Account' />

        <form className='form' onSubmit={submitHandler}>
          <div className='input_block'>
            <label htmlFor='username' className={sorce_sans_3.className}>
              Name
            </label>
            <input
              type='text'
              id='username'
              name='first_name'
              placeholder='Your name'
              defaultValue={props.user?.user_metadata.first_name || ''}
              className={sorce_sans_3.className}
              required
            />
          </div>

          <div className='input_block'>
            <label htmlFor='address' className={sorce_sans_3.className}>
              Address
            </label>
            <input
              type='text'
              id='address'
              name='address'
              placeholder='Your address'
              defaultValue={props.user?.user_metadata.address || ''}
              className={sorce_sans_3.className}
              required
            />
          </div>

          <div className='input_block'>
            <label htmlFor='apartment' className={sorce_sans_3.className}>
              Apartment No
            </label>
            <input
              type='text'
              id='apartment'
              name='apartment'
              placeholder='Apartment number'
              defaultValue={props.user?.user_metadata.apartment || ''}
              className={sorce_sans_3.className}
              required
            />
          </div>

          <div className='input_block'>
            <label htmlFor='email' className={sorce_sans_3.className}>
              Email address
            </label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Your email'
              defaultValue={props.user?.email || ''}
              className={sorce_sans_3.className}
              required
            />
          </div>

          <div className='input_block'>
            <label htmlFor='password' className={sorce_sans_3.className}>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Password'
              defaultValue={props.user?.user_metadata.password || ''}
              className={sorce_sans_3.className}
              required
            />
          </div>

          <button
            type='submit'
            className={sorce_sans_3.className + ' ' + 'submit_button'}
          >
            Create Account
          </button>

          {/* {errorIsFound && (
            <InfoQuote data={{ message: error.message, type: 'error' }} />
          )} */}
        </form>
      </CardLayout>
    </ModalLayout>
  );
}
