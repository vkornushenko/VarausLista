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

export default function AccountCard() {
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
    name: 'Johanna',
    address: 'Kulmakatu 47',
    apartment: 'A1',
    email: 'johanna@gmail.com',
    password: '8ff4cc7a21005',
    invitationLink: '4cae2cc2a0017e88ff4cc7a210051a79',
  };
  // const userData = null;

  const userDataFromSupabase = {
    userData,
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
        <AccountCardHeader name={userDataFromSupabase.userData.name} />

        <UserDataList
          toggleConfirmationHandler={toggleConfirmationHandler}
          userData={userDataFromSupabase.userData}
        />

        <InfoQuote data={infoQuoteContent} />

        <Button name='Create Account' action={toggleModalrHandler} />
        <AccountCardLogin />
      </CardLayout>

      {showModal && <AccountForm toggleLayover={toggleModalrHandler} />}

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
