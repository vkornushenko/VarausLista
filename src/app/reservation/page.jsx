'use client';

import CardLayout from '../components/ui/CardLayout';
import { sorce_sans_3 } from '@/app/utils/fonts';
import classes from './page.module.css';
import Image from 'next/image';
import LocationIcon from '../../../public/icons/location.svg';
import SharedPropertyNavigation from '../components/reservation/SharedPropertyNavigation';
import DateNavigation from '../components/reservation/DateNavigation';
import ReservationTable from '../components/reservation/ReservationTable';
import Button from '../components/ui/Button';
import { useState } from 'react';
import Reservation from '../components/modal/Reservation';

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

          {layoverState && <Reservation toggleLayover={toggleLayover} />}
        </CardLayout>
    </main>
  );
}
