import classes from './AccountCardLogin.module.css'
import Link from 'next/link';
import { sorce_sans_3 } from '@/app/utils/fonts';

export default function AccountCardLogin({questionText, actionText, actionLink}) {
  return (
    <div className={classes.login_container}>
      <p className={sorce_sans_3.className}>{questionText}</p>
      <Link href={actionLink} className={sorce_sans_3.className}>
        {actionText}
      </Link>
    </div>
  );
}
