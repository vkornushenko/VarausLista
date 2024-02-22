'use client';

// redux
import { toggleConfirmation, toggleModal } from '@/redux/features/ui-slice';
// import { setUser } from '@/redux/features/user-slice';

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
import { useRouter } from 'next/navigation';

export default function AccountCard() {
  const router = useRouter();
  const userData = useSelector((state) => state.userReducer);
  // redux
  const dispatch = useDispatch();

  // empty data state
  const [userDataIsEmpty, setUserDataIsEmpty] = useState(false);
  // if userData object empty => state is true
  useEffect(() => {
    if (Object.values(userData).every((el) => el === undefined)) {
      setUserDataIsEmpty(true);
    }
  }, [userData]);

  // for layover
  const toggleModalrHandler = () => {
    // redux dispatch
    dispatch(toggleModal());
  };
  // redux, state value
  const showModal = useSelector(
    (state) => state.uiReducer.value.modalIsVisible
  );

  // // redux, state value
  // const showConfirmation = useSelector(
  //   (state) => state.uiReducer.value.confirmationIsVisible
  // );
  // // for deleting address confirmation
  // const toggleConfirmationHandler = () => {
  //   dispatch(toggleConfirmation());
  // };

  // content for info quote
  const infoQuoteContent = {
    type: 'info',
    message:
      'Create account to get access to VarausLista App from multiple devices and make reservations faster.',
  };
  // join your neighbours address info
  const howToJoinNeighboursAddressQuoteData = {
    message: (
      <>
        If your neighbours already using VarausLista App, ask any of them to
        attach your User Id to existing address.
      </>
    ),
    type: 'info',
  };

  return (
    <>
      <CardLayout>
        <AccountCardHeader name={userData?.name} />

        {!userDataIsEmpty && (
          <UserDataList
            // toggleConfirmationHandler={toggleConfirmationHandler}
            userData={userData}
          />
        )}

        {userDataIsEmpty && <InfoQuote data={infoQuoteContent} />}

        {!userData.address && !userDataIsEmpty && (
          <InfoQuote data={howToJoinNeighboursAddressQuoteData} />
        )}

        {userDataIsEmpty ? (
          <Button name={'Create Account'} action={toggleModalrHandler} />
        ) : (
          <Button
            name={userData.address ? 'Edit Account' : 'Manage Address'}
            action={
              userData.address
                ? toggleModalrHandler
                : () => router.push('/address')
            }
          />
        )}

        {!userDataIsEmpty ? (
          <AccountCardLogOut />
        ) : (
          <AccountCardLogin
            questionText={'Already a user?'}
            actionText={'LogIn'}
            actionLink={'/login'}
          />
        )}
      </CardLayout>

      {showModal && (
        <AccountForm
          toggleLayover={toggleModalrHandler}
          userData={userData}
          userDataIsEmpty={userDataIsEmpty}
        />
      )}

      {/* {showConfirmation && (
        <ModalLayout toggleLayover={toggleConfirmationHandler}>
          <CardLayout>
            <ConfirmationCard />
          </CardLayout>
        </ModalLayout>
      )} */}
    </>
  );
}
