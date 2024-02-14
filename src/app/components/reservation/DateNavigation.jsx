'use client';
//import { motion } from 'framer-motion';

//import Link from 'next/link';
import classes from './DateNavigation.module.css';
import { sorce_sans_3 } from '@/app/utils/fonts';

import returnSevenDaysObject from '../../utils/sevenDays.js';
import { useEffect, useState } from 'react';
import { returnStartOfTheDayByOffset } from '@/app/utils/time';
import { getReservations } from '@/app/utils/apiRequests';
// import { useRouter } from 'next/navigation';

export default function DateNavigation({
  setSelectedDateObject,
  setReservationDataState,
  property_id,
  setTimeIntervalState
}) {
  // const router = useRouter();
  // offset -1 means that the list of the days starts from today - 1 = yesterday
  const [offset, setOffset] = useState(-1);
  // console.log('offset | DateNavigation.jsx');
  // console.log(offset);

  // async because of the await api request
  const offsetHandler = async (event) => {
    // we need this '+' to convert string to number
    setOffset(+event.currentTarget.getAttribute('offset'));

    const selectedDayOffset = +event.currentTarget.getAttribute(
      'selected_day_offset'
    );
    const selectedDayFrom = returnStartOfTheDayByOffset(selectedDayOffset);
    const selectedDayTo = returnStartOfTheDayByOffset(selectedDayOffset + 1);
    // console.log(selectedStartOfTheDay);

    // data for fetch request
    const selectedDayIsoStringFrom = selectedDayFrom.toISOString();
    const selectedDayIsoStringTo = selectedDayTo.toISOString();
    const timeInterval = {from: selectedDayIsoStringFrom, to: selectedDayIsoStringTo}
    setTimeIntervalState(timeInterval)

    const selectValues = {
      timeInterval,
      property_id
    };

    // api request
    const data = await getReservations(selectValues);
    setReservationDataState(data);
  };

  const sevenDays = returnSevenDaysObject(offset);
  const selectedDateObjectValue = sevenDays[1]['date'];

  useEffect(() => {
    // console.log(selectedDateObjectValue);
    setSelectedDateObject(selectedDateObjectValue);
    // console.log('setSelectedDateObject triggered');
  }, [offset]);

  return (
    <nav>
      <ul className={classes.date_nav}>
        {sevenDays.map((element, index) => (
          <li
            onClick={offsetHandler}
            offset={element.offset - 1}
            title={element.offset}
            selected_day_offset={element.offset}
            key={index}
            className={`${classes.date_nav_item} ${
              index === 1 && classes.date_nav_item__selected
            }`}
          >
            <p className={classes.date_nav_item__weekday}>
              {element.weekdayName}
            </p>
            <p
              className={
                sorce_sans_3.className + ' ' + classes.date_nav_item__day_number
              }
            >
              {element.weekday}
            </p>
          </li>
        ))}
      </ul>
    </nav>
  );
}
