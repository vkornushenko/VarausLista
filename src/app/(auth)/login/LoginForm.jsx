'use client';

import CardHeader from '@/app/components/ui/CardHeader';
import InfoQuote from '@/app/components/ui/InfoQuote';
import '@/app/globals.css';
import { sorce_sans_3 } from '@/app/utils/fonts';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import '@/app/globals.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const router = useRouter();
  // eerorState
  const [errorMessage, setErrorMessage] = useState();
  
  const messageCreateAccount = (
    <p>
      If you don't have account, navigate to{' '}
      <Link href='/account'>Create Account page</Link>.
    </p>
  )
  


  const submitHandler = async (event) => {
    event.preventDefault();
    // get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    //console.log(data);

    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    error
      ? (setErrorMessage(error), console.log(JSON.stringify(errorMessage)))
      : (router.push('/account'), router.refresh());
  };

  return (
    <>
      <CardHeader title='Log In' />
      <form className='form' onSubmit={submitHandler}>
        <div className='input_block'>
          <label htmlFor='email' className={sorce_sans_3.className}>
            Email address
          </label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Your email'
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
            className={sorce_sans_3.className}
            required
          />
        </div>
        <button
          type='submit'
          className={sorce_sans_3.className + ' ' + 'submit_button'}
        >
          Log In
        </button>

        {errorMessage && (
          <>
            <InfoQuote
              data={{ message: errorMessage.message, type: 'error' }}
            />

            <InfoQuote data={{ message: messageCreateAccount, type: 'info' }} />
          </>
        )}
      </form>
    </>
  );
}
