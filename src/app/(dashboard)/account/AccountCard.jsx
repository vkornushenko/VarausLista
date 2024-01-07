'use client';

// redux
import { toggleConfirmation, toggleModal } from '@/redux/features/ui-slice';
import { useDispatch, useSelector } from 'react-redux';

// components
import CardLayout from '@/app/components/ui/CardLayout';
import Button from '@/app/components/ui/Button';
import AccountForm from '@/app/components/modal/AccountForm';
import ModalLayout from '@/app/components/ui/ModalLayout';
import InfoQuote from '@/app/components/ui/InfoQuote';
import AccountCardHeader from './AccountCardHeader';
import UserDataList from './UserDataList';
import AccountCardLogin from './AccountCardLogin';

import ConfirmationCard from '@/app/components/ui/ConfirmationCard';
import { useEffect, useState } from 'react';
import AccountCardLogOut from './AccountCardLogOut';

export default function AccountCard({ session }) {
  // const [user, setUser] = useState('');
  // useEffect(() => {
  //   if (data) {
  //     setUser(data.session?.user);
  //   }
  // }, [data]);

  // redux
  const dispatch = useDispatch();

  // for layover
  const toggleModalrHandler = () => {
    // redux dispatch
    dispatch(toggleModal());
  };

  // redux, state value
  const showModal = useSelector(
    (state) => state.uiReducer.value.modalIsVisible
  );

  // redux, state value
  const showConfirmation = useSelector(
    (state) => state.uiReducer.value.confirmationIsVisible
  );

  // for deleting address confirmation
  const toggleConfirmationHandler = () => {
    // redux, dispatch
    dispatch(toggleConfirmation());
  };

  // todo fetch user data from supabase
  const userData = {
    name: session?.user.user_metadata.first_name,
    address: session?.user.user_metadata.address,
    apartment: session?.user.user_metadata.apartment,
    email: session?.user.email,
    password: session?.user.user_metadata.password,
    invitationLink: 'canBeSendToEmail',
  };
  // const userData = null;

  // const userDataFromSupabase = {
  //   userData,
  // };

  // content for info quote
  const infoQuoteContent = {
    type: 'info',
    message:
      'Create account to get access to VarausLista App from multiple devices and make reservations faster.',
  };
  console.log(userData);

  return (
    <>
      <CardLayout>
        <AccountCardHeader name={userData.name} />

        {session && (
          <UserDataList
            toggleConfirmationHandler={toggleConfirmationHandler}
            userData={userData}
          />
        )}

        <InfoQuote data={infoQuoteContent} />

        <Button
          name={session ? 'Edit Account' : 'Create Account'}
          action={toggleModalrHandler}
        />

        {session ? <AccountCardLogOut /> : <AccountCardLogin />}

      </CardLayout>

      {showModal && (
        <AccountForm toggleLayover={toggleModalrHandler} user={session?.user} />
      )}

      {showConfirmation && (
        <ModalLayout toggleLayover={toggleConfirmationHandler}>
          <CardLayout>
            <ConfirmationCard />
          </CardLayout>
        </ModalLayout>
      )}
    </>
  );
}
