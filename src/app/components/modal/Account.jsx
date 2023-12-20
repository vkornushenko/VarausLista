import { useRouter } from 'next/navigation';

import CardLayout from '../ui/CardLayout';
import ModalLayout from '../ui/ModalLayout';
import classes from './Reservation.module.css';
// fonts
import { sorce_sans_3 } from '@/app/utils/fonts';

export default function Account(props) {
  const router = useRouter();
  // handle form submission
  const submitHandler = async (event) => {
    event.preventDefault();
    // To do: get form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    const newUser = {
      first_name: data.first_name,
      address: data.address,
      apartment: data.apartment,
      email: data.email,
      password: data.password,
    };

    const res = await fetch('http://localhost:4001/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });

    if (res.status === 201) {
      // refresh to refresh cach (page is not refreshing)
      router.refresh();
      // // navigate to tickets
      // router.push('/account');
    }

    // close popup
    props.toggleLayover();
  };

  return (
    <ModalLayout toggleLayover={props.toggleLayover}>
      <CardLayout>
        <h1 className={sorce_sans_3.className + ' ' + classes.popup_header}>
          Create Account
        </h1>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.input_block}>
            <label htmlFor='username' className={sorce_sans_3.className}>
              Name
            </label>
            <input
              type='text'
              id='username'
              name='first_name'
              placeholder='Your name'
              className={sorce_sans_3.className}
              required
            />
          </div>

          <div className={classes.input_block}>
            <label htmlFor='address' className={sorce_sans_3.className}>
              Address
            </label>
            <input
              type='text'
              id='address'
              name='address'
              placeholder='Your address'
              className={sorce_sans_3.className}
              required
            />
          </div>

          <div className={classes.input_block}>
            <label htmlFor='apartment' className={sorce_sans_3.className}>
              Apartment No
            </label>
            <input
              type='text'
              id='apartment'
              name='apartment'
              placeholder='Apartment number'
              className={sorce_sans_3.className}
              required
            />
          </div>

          <div className={classes.input_block}>
            <label htmlFor='email' className={sorce_sans_3.className}>
              Email address
            </label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Your email'
              className={sorce_sans_3.className}
              required
            />
          </div>

          <div className={classes.input_block}>
            <label htmlFor='password' className={sorce_sans_3.className}>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Password'
              className={sorce_sans_3.className}
              required
            />
          </div>

          <button
            type='submit'
            className={sorce_sans_3.className + ' ' + classes.submit_button}
          >
            Create Account
          </button>
        </form>
      </CardLayout>
    </ModalLayout>
  );
}
