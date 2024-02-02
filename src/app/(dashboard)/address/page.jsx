import AddressCard from './AddressCard';
import { getPropertyList, getUserIdList } from './actions';

export default async function AddressPage() {
  const propertyList = await getPropertyList();
  const usersList = await getUserIdList(54);
  console.log(usersList);

  return (
    <main>
      <AddressCard propertyList={propertyList} usersList={usersList}/>
    </main>
  );
}
