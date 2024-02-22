import { sorce_sans_3 } from '@/app/utils/fonts';
import { source_serif_4 } from '@/app/utils/fonts';
import '@/app/globals.css';
import classes from './NeighboursList.module.css';
import { IoTrashOutline } from 'react-icons/io5';
import { useState } from 'react';
import { unsubscribeUser } from './actions';

export default function NeighboursList({
  usersList,
  userData,
  toggleAddNeighbour,
}) {
  // console.log('usersList from NeighboursList.jsx');
  // console.log(usersList);

  const handleUnsubscribeUser = async (users_id) => {
    console.log(`you are about to unsubscribe user with id = ${users_id}`);
    await unsubscribeUser(users_id);
    // console.log(`isUserUnsubscribed = ${isUserUnsubscribed}`)
  };

  return (
    <>
      <div className={classes.block}>
        <h3 className={sorce_sans_3.className}>
          {`${userData.address} neighbours list:`}
        </h3>
        <ul className={classes.list}>
          {usersList.map((user) => (
            <li key={user.users.id} title={user.users.user_id}>
              <p>{user.users.name} </p>
              {userData.user_id === user.users.user_id && (
                <IoTrashOutline
                  // width={32}
                  onClick={() => handleUnsubscribeUser(user.users.id)}
                  className={classes.delete_button}
                />
              )}
            </li>
          ))}
          <button
            type='button'
            onClick={toggleAddNeighbour}
            className={'text_button ' + source_serif_4.className}
          >
            + Add Neighbour
          </button>
        </ul>
      </div>
    </>
  );
}
