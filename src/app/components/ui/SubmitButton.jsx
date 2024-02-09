import { useFormStatus } from 'react-dom';

import { sorce_sans_3 } from '@/app/utils/fonts';
import '@/app/globals.css';

export default function SubmitButton({ pendingButtonName, buttonName }) {
  // for the button loading
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type='submit'
      className={sorce_sans_3.className + ' ' + 'submit_button'}
    >
      {pending
        ? pendingButtonName || 'Saving changes...'
        : buttonName || 'Save Changes'}
    </button>
  );
}
