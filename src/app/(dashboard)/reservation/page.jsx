import ReservationCard from './ReservationCard';

// supabase
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export default async function ReservationPage() {
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

  const address_id = 54;

  let { data, error } = await supabase
    .from('intersections_address_property')
    .select(
      `
        id,
        address_id,
        property_id,
        address(address_name),
        shared_property(name)
        `
    )
    .eq('address_id', address_id);
  if (error) {
    console.log(error);
  } else {
    //console.log(data);
  }

  console.log('data from reservation/page.jsx');
  console.log(data);



  return (
    <main>
      <ReservationCard propertyData={data}/>
    </main>
  );
}
