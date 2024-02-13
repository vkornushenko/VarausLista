import { sorce_sans_3 } from '@/app/utils/fonts';
import { source_serif_4 } from '@/app/utils/fonts';
import '@/app/globals.css';

export default function NeighboursList({
  usersList,
  userData,
  toggleAddNeighbour,
}) {
  // console.log('usersList from NeighboursList.jsx');
  // console.log(usersList);

  return (
    <ul>
      <h3 className={sorce_sans_3.className}>
        Current Neighbours list for {userData.address}:
      </h3>
      {usersList.map((user) => (
        <li key={user.users.id} title={user.users.user_id}>
          {user.users.name} {userData.user_id === user.users.user_id && '(you)'}
        </li>
      ))}
      <button type='button' onClick={toggleAddNeighbour} className={'text_button ' + source_serif_4.className}>+ Add Neighbour</button>
    </ul>
  );
}
