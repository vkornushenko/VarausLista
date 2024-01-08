'use client';

import { sorce_sans_3 } from '@/app/utils/fonts';
import { useState } from 'react';
import Image from 'next/image';

import LocationIcon from '../../../../public/icons/location.svg';

import CardLayout from '@/app/components/ui/CardLayout';
import SharedPropertyNavigation from '@/app/components/reservation/SharedPropertyNavigation';
import DateNavigation from '@/app/components/reservation/DateNavigation';
import ReservationTable from '@/app/components/reservation/ReservationTable';
import Button from '@/app/components/ui/Button';
import ReservationForm from '@/app/components/modal/ReservationForm';

import classes from './page.module.css';

// redux
import { toggleModal } from '@/redux/features/ui-slice';
import { useDispatch, useSelector } from 'react-redux';

export default function ReservationPage() {
  // redux
  const dispatch = useDispatch();
  // for layover
  const toggleModalrHandler = () => {
    dispatch(toggleModal());
    // if we want to pass a payload/action/data to a function:
    // dispatch(logIn(username));
  };
  // NOTE!!!
  // selector could be used in another component separatly
  // all we need is to import selector and use useSelector
  // like we using it below
  const showModal = useSelector(
    (state) => state.uiReducer.value.modalIsVisible
    // the same way we can get data from the store:
    // (state) => state.uiReducer.value.username
  );

  const [currentSharedPropertyIndex, setCurrentSharedPropertyIndex] =
    useState(0);

  const sharedPropertyList = ['Sauna', 'Laundry', 'GYM', 'Grill'];
  const SharedPropName = sharedPropertyList[currentSharedPropertyIndex];

  return (
    <main>
      <CardLayout>
        <div className={classes.reservation__header_block}>
          <Image src={LocationIcon} alt='location icon' height={20} />
          <h1 className={sorce_sans_3.className}>Kulmakatu 47</h1>
        </div>
        <SharedPropertyNavigation
          selectedProperty={SharedPropName}
          sharedPropertyList={sharedPropertyList}
          changeProperty={setCurrentSharedPropertyIndex}
        />
        <DateNavigation />
        <ReservationTable />
        <Button
          action={toggleModalrHandler}
          name={`Reserve ${SharedPropName}`}
        />
      </CardLayout>
      {showModal && <ReservationForm toggleLayover={toggleModalrHandler} />}
    </main>
  );
}
