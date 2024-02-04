import { redirect } from 'next/navigation';
import { getUsersAddressId } from '../reservation/actions';
import { getPropertyList, getUserIdList } from './actions';
import AddressCard from './AddressCard';

export default async function AddressPage() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();
  console.log('isSupabaseConnected?')
  console.log(isSupabaseConnected)
  if(!isSupabaseConnected){
    redirect('/login');
  }


  const propertyList = await getPropertyList();
  const address_id = await getUsersAddressId();
  const usersList = await getUserIdList(address_id);
  // console.log(usersList);


  return (
    <main>
      <AddressCard propertyList={propertyList} usersList={usersList}/>
    </main>
  );
}
