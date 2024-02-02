'use client';

import CardHeader from '@/app/components/ui/CardHeader';
import CardLayout from '@/app/components/ui/CardLayout';
import AddressForm from './AddressForm';
import Link from 'next/link';
import InfoQuote from '@/app/components/ui/InfoQuote';
import ModalLayout from '@/app/components/ui/ModalLayout';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '@/redux/features/ui-slice';
import Button from '@/app/components/ui/Button';
import '@/app/globals.css';

const infoQuoteData = {
  message: (
    <>
      If your neighbours already using VarausLista App - copy 'User Id' from
      your Account Page and send to any of your neighbours. After they add your
      'User Id' to existing address, you will be able to see and make
      reservations together with your neighbours.{' '}
      <Link href='/account'>Check your 'User Id'</Link>.
    </>
  ),
  type: 'info',
};

export default function AddressCard({ propertyList, usersList }) {
  const userData = useSelector((state) => state.userReducer);
  // console.log(userData);
  // redux
  const dispatch = useDispatch();
  // for layover
  const toggleModalrHandler = () => {
    dispatch(toggleModal());
    // if we want to pass a payload/action/data to a function:
    // dispatch(logIn(given-name));
  };
  const showModal = useSelector(
    (state) => state.uiReducer.value.modalIsVisible
    // the same way we can get data from the store:
    // (state) => state.uiReducer.value.first_name
  );

  return (
    <>
      <CardLayout>
        <CardHeader title='Manage Address' />
        <div className='text_block'>
          <p>Your address is {userData.address}.</p>
          <p>
            To add neighbours to this address and use VarausLista App together,
            ask them to create an account and share 'User Id' with you.
          </p>
          <p>
            After you add neighbours 'User Id' to address {userData.address},
            you will be able to see and make reservations together with your
            neighbours.
          </p>
        </div>
        <ul>
          {usersList.map((user) => (
            <li key={user.id}>{user.user_id} | end</li>
          ))}
        </ul>

        {/* <InfoQuote data={infoQuoteData} /> */}

        <Button name={'Manage Address'} action={toggleModalrHandler} />
      </CardLayout>

      {showModal && (
        <ModalLayout toggleLayover={toggleModalrHandler}>
          <CardLayout>
            <AddressForm propertyList={propertyList} />
          </CardLayout>
        </ModalLayout>
      )}
    </>
  );
}
