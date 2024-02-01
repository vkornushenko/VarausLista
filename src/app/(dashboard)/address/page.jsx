import AddressCard from './AddressCard';
// supabase
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

async function getPropertyList() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data, error } = await supabase.from('property').select();
  if (error) {
    console.log(error.message);
  }
  return data;
}

export default async function AddressPage() {
  const propertyList = await getPropertyList();
  //   console.log('logging property list:');
  //   console.log(propertyList);

  return (
    <main>
      <AddressCard propertyList={propertyList} />
    </main>
  );
}
