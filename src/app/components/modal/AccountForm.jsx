// hooks
import { useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';

// fonts
import { sorce_sans_3 } from '@/app/utils/fonts';
import '@/app/globals.css';

// components
import ModalLayout from '../ui/ModalLayout';
import CardLayout from '../ui/CardLayout';
import CardHeader from '../ui/CardHeader';
import { createAccount, editAccount } from '@/app/(dashboard)/account/actions';
import SubmitButton from '../ui/SubmitButton';

export default function AccountForm({
  toggleLayover,
  userData,
  userDataIsEmpty,
}) {
  const [formActionEditState, formActionEdit] = useFormState(editAccount, null);
  const [formActionCreateState, formActionCreate] = useFormState(
    createAccount,
    null
  );

  const router = useRouter();

  // const dispatch = useDispatch();

  if (formActionCreateState) {
    console.log(formActionCreateState.status);
    console.log(formActionCreateState?.data);
    console.log(formActionCreateState?.error);
    
    if (formActionCreateState?.status === 200) {
      console.log('user was created | AccountForm.jsx');
      // close popup
      toggleLayover();
      router.push('/verify');
    }
  }

  useEffect(() => {
    if (formActionEditState?.status === 200) {
      // let updatedUserData = {
      //   ...userData,
      //   apartment: formActionEditState.data[0].apartment,
      //   name: formActionEditState.data[0].name,
      // };
      // console.log(updatedUserData)
      // // update user store
      // dispatch(setUser(updatedUserData));

      // close popup
      toggleLayover();
    }
  }, [formActionEditState, userData]);

  return (
    <ModalLayout toggleLayover={toggleLayover}>
      <CardLayout>
        <CardHeader title='Create Account' />

        <form
          autoComplete='on'
          className='form'
          action={!userDataIsEmpty ? formActionEdit : formActionCreate}
        >
          <div className='input_block'>
            <input
              type='hidden'
              id='users_id'
              name='users_id'
              value={userData.users_id}
            />
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
              autoComplete={
                !userDataIsEmpty ? 'current-password' : 'new-password'
              }
              type='password'
              id='password'
              name='password'
              placeholder='Password'
              defaultValue={userData?.password || ''}
              className={sorce_sans_3.className}
              required
              minLength={6}
              disabled={!userDataIsEmpty}
            />
          </div>

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

          <SubmitButton
            pendingButtonName={
              !userDataIsEmpty ? 'Editing Account...' : 'Creating Account...'
            }
            buttonName={!userDataIsEmpty ? 'Edit Account' : 'Create Account'}
          />
        </form>
      </CardLayout>
    </ModalLayout>
  );
}
