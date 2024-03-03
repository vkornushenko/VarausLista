'use client';

import { useEffect, useState } from 'react';
import LoadingReservationTable from './LoadingReservationTable';

import { AnimatePresence } from 'framer-motion';

import CardLayout from '@/app/components/ui/CardLayout';
import SharedPropertyNavigation from '@/app/components/reservation/SharedPropertyNavigation';
import DateNavigation from '@/app/components/reservation/DateNavigation';

import ReservationTable from '@/app/components/reservation/ReservationTable';
// const ReservationTable = lazy(() => import('@/app/components/reservation/ReservationTable'));

import Button from '@/app/components/ui/Button';
import ReservationForm from '@/app/components/modal/ReservationForm';

// redux
import { toggleModal } from '@/redux/features/ui-slice';
import { useDispatch, useSelector } from 'react-redux';
import ReservationCardHeader from './ReservationCardHeader';
import { getReservations } from '@/app/utils/apiRequests';
import {
  getTimeInterval,
  monthNamesArray,
  returnDatePlusMonth,
} from '@/app/utils/time';
import { returnPropertyName } from '@/app/components/reservation/utils';
import { getReservationData } from './actions';
import { useRouter } from 'next/navigation';

export default function ReservationCard({
  address_id,
  initialPropertyId,
  // initialTimeInterval,
  propertyData,
  initialReservationData,
}) {
const router = useRouter();

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  const [reservationData, setReservationData] = useState(
    initialReservationData
  );
  // when we get initial reservation data from server - it is NOT outdated
  // it should be set as outdated, when date or property changed
  const [isReservationDataOutdated, setIsReserationDataOutdated] =
    useState(false);
  // we need to use propertyId in severalchild components (initially it comes from server)
  const [selectedPropertyId, setSelectedPropertyId] =
    useState(initialPropertyId);

  const [selectedDateObject, setSelectedDateObject] = useState(new Date());

  // refresh outdated reservations data
  const refreshReservationData = async () => {
    setIsLoading(true);
    // preparing request for data fetching
    const timeInterval = getTimeInterval(selectedDateObject);
    const selectValues = {
      timeInterval,
      property_id: selectedPropertyId,
    };
    // fetching fresh data
    // const reservationData = await getReservations(selectValues);
const reservationData = await getReservationData(address_id, selectedPropertyId, timeInterval)
    setReservationData(reservationData);
    setIsLoading(false);
    // console.log('Res Data refreshed')
  };

  useEffect(() => {
    if (isReservationDataOutdated) {
      // console.log('reservation data need to be refreshed');
      setReservationData([]);
      refreshReservationData();
      // without refreshing router, initial data will be outdated (from cache)
      router.refresh('/reservation');
    }
    // return data to outdated = false after refreshing
    setIsReserationDataOutdated(false);
  }, [isReservationDataOutdated, reservationData, selectedDateObject]);

  const userData = useSelector((state) => state.userReducer);
  // console.log('userData')
  // console.log(userData)

  // current property name
  const currentPropertyName = returnPropertyName(
    propertyData,
    selectedPropertyId
  );

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
  );

  return (
    <>
      <CardLayout>
        <ReservationCardHeader address={userData.address} />
        <SharedPropertyNavigation
          propertyData={propertyData}
          selectedPropertyId={selectedPropertyId}
          setSelectedPropertyId={setSelectedPropertyId}
          setIsReserationDataOutdated={setIsReserationDataOutdated}
        />
        <DateNavigation
          setIsReserationDataOutdated={setIsReserationDataOutdated}
          setSelectedDateObject={setSelectedDateObject}
        />
        <AnimatePresence>
          {isLoading ? (
            <LoadingReservationTable />
          ) : (
            <ReservationTable
              reservationData={reservationData}
              propertyName={currentPropertyName}
              selectedDateObject={selectedDateObject}
              setIsReserationDataOutdated={setIsReserationDataOutdated}
              users_id={userData.users_id}
            />
          )}
        </AnimatePresence>

        <Button
          action={toggleModalrHandler}
          name={`Reserve ${currentPropertyName}
          for ${returnDatePlusMonth(selectedDateObject, monthNamesArray)}
          `}
        />
      </CardLayout>
      {showModal && (
        <ReservationForm
          setIsReserationDataOutdated={setIsReserationDataOutdated}
          selectedDateObject={selectedDateObject}
          toggleLayover={toggleModalrHandler}
          propertyName={currentPropertyName}
          userData={userData}
          property_id={selectedPropertyId}
        />
      )}
    </>
  );
}
