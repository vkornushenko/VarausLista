
import { getUsersAddressId } from '../reservation/actions';
import { getPropertyList, getUserIdList } from './actions';
import AddressCard from './AddressCard';


export default async function AddressPage() {

  const propertyList = await getPropertyList();
  const address_id = await getUsersAddressId();
  const usersList = await getUserIdList(address_id);


  return (
    <main>
      <AddressCard propertyList={propertyList} usersList={usersList}/>
    </main>
  );
}
