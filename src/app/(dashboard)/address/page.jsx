import { getUsersAddressId } from '../reservation/actions';
import { getPropertyList, getUserIdList } from './actions';
import AddressCard from './AddressCard';

export default async function AddressPage() {
  const propertyList = await getPropertyList();

  // will return null if user is not mapped to any address_id
  const address_id = await getUsersAddressId();

  // will return null if no address_id provided
  const usersList = await getUserIdList(address_id);

  return (
    <main>
      <AddressCard propertyList={propertyList} usersList={usersList} />
    </main>
  );
}
