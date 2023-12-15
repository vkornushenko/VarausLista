'use client';

import { sorce_sans_3 } from '@/app/utils/fonts';
import { useState } from 'react';
import Image from 'next/image';

import LocationIcon from '../../../public/icons/location.svg';

import CardLayout from '../components/ui/CardLayout';
import SharedPropertyNavigation from '../components/reservation/SharedPropertyNavigation';
import DateNavigation from '../components/reservation/DateNavigation';
import ReservationTable from '../components/reservation/ReservationTable';
import Button from '../components/ui/Button';
import Reservation from '../components/modal/Reservation';

import classes from './page.module.css';

export default function ReservationPage() {
  const [currentSharedPropertyIndex, setCurrentSharedPropertyIndex] =
    useState(0);
  // state for layover
  const [layoverState, setLayoverState] = useState(false);
  // toggle for layover
  const toggleLayover = () => {
    setLayoverState(!layoverState);
    console.log(layoverState);
  };

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
        <Button action={toggleLayover} name={`Reserve ${SharedPropName}`} />
      </CardLayout>
      {layoverState && <Reservation toggleLayover={toggleLayover} />}
    </main>
  );
}
