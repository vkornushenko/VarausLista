// temporarily (oposite is permanent)
'use client';
//import { motion } from 'framer-motion';

//import Link from 'next/link';
import classes from './DateNavigation.module.css';
import { sorce_sans_3 } from '@/app/utils/fonts';

import returnSevenDaysObject from '../../utils/sevenDays.js';
import { useState } from 'react';

export default function DateNavigation() {
  const[offset, setOffset] = useState(-1);

  const offsetHandler = (event) => {
    // we need this + to convert string to number
    setOffset(+ event.currentTarget.getAttribute('offset'));
  }

  const sevenDays = returnSevenDaysObject(offset);
  //console.log(sevenDays);

  return (
    <nav>
      <ul className={classes.date_nav}>
        {sevenDays.map((element, index) => (
          <li
            onClick={offsetHandler}
            offset={element.offset - 1}
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
