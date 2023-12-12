'use client';

// fonts
import { sorce_sans_3 } from '@/app/utils/fonts';

import classes from './Button.module.css';

export default function Button(props) {
  return (
    <button
      onClick={props.action}
      className={sorce_sans_3.className + ' ' + classes.button}
    >
      {props.name}
    </button>
  );
}
