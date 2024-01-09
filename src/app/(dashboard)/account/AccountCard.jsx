'use client';

// redux
import { toggleConfirmation, toggleModal } from '@/redux/features/ui-slice';
import { setUser } from '@/redux/features/user-slice';

import { useDispatch, useSelector } from 'react-redux';

// react hooks
import { useEffect, useState } from 'react';

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
import AccountCardLogOut from './AccountCardLogOut';

export default function AccountCard({ userData }) {
  // redux
  const dispatch = useDispatch();

  const [useEffectCounterValue, setUseEffectCounterValue] = useState(0);
  // empty data state
  const [userDataIsEmpty, setUserDataIsEmpty] = useState(false);
  // if userData object empty => state is true
  useEffect(() => {
    setUseEffectCounterValue((prevState) => prevState + 1);
    console.log('useEffectCounterValue = ' + useEffectCounterValue);
    if (Object.keys(userData).length === 0) {
      setUserDataIsEmpty(true);
    }
  }, [userData]);

  // redux for user slice
  if (userData.email) {
    dispatch(setUser(userData));
    const userFromStore = useSelector((state) => state.userReducer);
    console.log('this is userFromStore state');
    console.log(userFromStore);

    userData = userFromStore;
    console.log('this is new userData');
    console.log(userData);
  }

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

  // content for info quote
  const infoQuoteContent = {
    type: 'info',
    message:
      'Create account to get access to VarausLista App from multiple devices and make reservations faster.',
  };

  return (
    <>
      <CardLayout>
        <AccountCardHeader name={userData?.name} />

        {!userDataIsEmpty && (
          <UserDataList
            toggleConfirmationHandler={toggleConfirmationHandler}
            userData={userData}
          />
        )}

        {userDataIsEmpty && <InfoQuote data={infoQuoteContent} />}

        <Button
          name={!userDataIsEmpty ? 'Edit Account' : 'Create Account'}
          action={toggleModalrHandler}
        />

        {!userDataIsEmpty ? <AccountCardLogOut /> : <AccountCardLogin />}
      </CardLayout>

      {showModal && (
        <AccountForm
          toggleLayover={toggleModalrHandler}
          userData={userData}
          userDataIsEmpty={userDataIsEmpty}
        />
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
