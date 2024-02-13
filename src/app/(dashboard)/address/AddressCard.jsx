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

import { useState } from 'react';
import AddNeighbourForm from '@/app/components/modal/AddNeighbourForm';
import NeighboursList from './NeighboursList';

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

const howToFindUserIdQuoteData = {
  message: (
    <>
      You can see and copy your User Id at{' '}
      <Link href={'/account'}>Account Page</Link>
    </>
  ),
  type: 'info',
};

export default function AddressCard({ propertyList, usersList }) {
  const [isAddNeighbourVisible, setIsAddNeighbourVisible] = useState(false);

  const toggleAddNeighbour = () => {
    setIsAddNeighbourVisible((prevState) => !prevState);
  };

  // console.log('usersList from AddressCard.jsx');
  // console.log(usersList);

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
        {!userData.address && (
          <>
            <div className='text_block'>
              <p>
                If your neighbours already using VarausLista App, ask any of
                them to attach your User Id to existing address.
              </p>

              <p>
                Otherwise you need to create new address and attach your
                neighbours by their Users Id.
              </p>
            </div>
            <InfoQuote data={howToFindUserIdQuoteData} />
          </>
        )}

        {userData.address && (
          <div className='text_block'>
            <p>Your address is {userData.address}.</p>
            <p>
              To add neighbours to this address and use VarausLista App
              together, ask them to create an account and share 'User Id' with
              you.
            </p>
            <p>
              After you add neighbours 'User Id' to address {userData.address},
              you will be able to see and make reservations together.
            </p>
          </div>
        )}

        {usersList && (
          <NeighboursList
            usersList={usersList}
            userData={userData}
            toggleAddNeighbour={toggleAddNeighbour}
          />
        )}

        {/* <InfoQuote data={infoQuoteData} /> */}

        <Button
          name={userData.address ? 'Edit Address' : 'Create New Address'}
          action={toggleModalrHandler}
        />
      </CardLayout>

      {showModal && (
        <ModalLayout toggleLayover={toggleModalrHandler}>
          <CardLayout>
            <AddressForm
              propertyList={propertyList}
              formTitle={
                userData.address ? 'Manage Address' : 'Create New Address'
              }
            />
          </CardLayout>
        </ModalLayout>
      )}

      {isAddNeighbourVisible && (
        <ModalLayout toggleLayover={toggleAddNeighbour}>
          <CardLayout>
            <AddNeighbourForm
              address_id={userData.address_id}
              toggleLayover={toggleAddNeighbour}
            />
          </CardLayout>
        </ModalLayout>
      )}
    </>
  );
}
