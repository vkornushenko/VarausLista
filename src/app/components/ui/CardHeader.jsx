import { sorce_sans_3 } from '@/app/utils/fonts';
import classes from './CardHeader.module.css';

export default function CardHeader({ title }) {
  return (
      <h1 className={sorce_sans_3.className + ' ' + classes.header}>{title}</h1>
  );
}
