'use client';

import { useState } from 'react';

import CardLayout from '@/app/components/ui/CardLayout';
import SharedPropertyNavigation from '@/app/components/reservation/SharedPropertyNavigation';
import DateNavigation from '@/app/components/reservation/DateNavigation';
import ReservationTable from '@/app/components/reservation/ReservationTable';
import Button from '@/app/components/ui/Button';
import ReservationForm from '@/app/components/modal/ReservationForm';

// redux
import { toggleModal } from '@/redux/features/ui-slice';
import { useDispatch, useSelector } from 'react-redux';
import ReservationCardHeader from './ReservationCardHeader';

export default function ReservationCard({ propertyData, reservationData }) {
  console.log('propertyData | ReservationCard.jsx')
  console.log(propertyData)

  const [reservationDataState, setReservationDataState] = useState(reservationData);

  const [selectedDateObject, setSelectedDateObject] = useState();
  const [selectedPropertyId, setSelectedPropertyId] = useState(
    propertyData[0].property_id
  );
  const userData = useSelector((state) => state.userReducer);
  // console.log(userData);

  // return property array with key as id
  let propertyArr = {};
  propertyData.map(
    (item) => (propertyArr[item.property_id] = item.property.name)
  );
  const currentPropertyName = propertyArr[selectedPropertyId];

  // redux
  const dispatch = useDispatch();
  // for layover
  const toggleModalrHandler = () => {
    dispatch(toggleModal());
    // if we want to pass a payload/action/data to a function:
    // dispatch(logIn(given-name));
  };
  // NOTE!!!
  // selector could be used in another component separatly
  // all we need is to import selector and use useSelector
  // like we using it below
  const showModal = useSelector(
    (state) => state.uiReducer.value.modalIsVisible
    // the same way we can get data from the store:
    // (state) => state.uiReducer.value.first_name
  );

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  
  // const sharedPropertyList = ['Sauna', 'Laundry', 'GYM', 'Grill'];
  // const SharedPropName = sharedPropertyList[currentSharedPropertyIndex];

  return (
    <>
      <CardLayout>
        <ReservationCardHeader address={userData.address} />
        <SharedPropertyNavigation
          propertyData={propertyData}
          selectedPropertyId={selectedPropertyId}
          setSelectedPropertyId={setSelectedPropertyId}
        />
        <DateNavigation setSelectedDateObject={setSelectedDateObject} setReservationDataState={setReservationDataState} address_id={userData.address_id} />
        <ReservationTable
          reservationData={reservationDataState}
          selectedPropertyId={selectedPropertyId}
          propertyName={currentPropertyName}
          selectedDateObject={selectedDateObject}
        />
        <Button
          action={toggleModalrHandler}
          name={`Reserve ${currentPropertyName}
          for ${selectedDateObject?.getDate()} ${
            monthNames[selectedDateObject?.getMonth()]
          }
          `}
        />
      </CardLayout>
      {showModal && (
        <ReservationForm
          userData={userData}
          property_id={selectedPropertyId}
          propertyName={currentPropertyName}
          toggleLayover={toggleModalrHandler}
          selectedDateObject={selectedDateObject}
        />
      )}
    </>
  );
}
