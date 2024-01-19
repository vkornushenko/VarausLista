'use server';

// supabase
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addAddress(addressFormData) {
  // data from form
  const formData = Object.fromEntries(addressFormData);
  // insert for table 'address'
  const insertValForTable_address = [{ address_name: formData.address }];

  // connect to supabase
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

  // preparing insert for table 'intersections_address_property'
  // get property values arr from the form
  const propertyTypeArr = Object.values(
    Object.fromEntries(Object.entries(formData).slice(2))
  );
  // left only unique values in property list
  const uniquePropertyTypeArr = [...new Set(propertyTypeArr)];

  const { data, error } = await supabase
    .from('address')
    .insert(insertValForTable_address)
    .select();

  if (error) {
    console.log(error);
  } else {
    console.log(data);

    // here should be new adress_id from DB
    const address_id = data[0].id;

    // if everything fine -> lets create 2nd table
    // prepare insert with new address_id
    let insertValForTable_intersections_address_property = [];
    uniquePropertyTypeArr.map((property_id, index) => {
      insertValForTable_intersections_address_property[index] = {
        address_id: address_id,
        property_id: property_id,
      };
    });

    const responce = await supabase
      .from('intersections_address_property')
      .insert(insertValForTable_intersections_address_property)
      .select();
    if (responce.error) {
      console.log(responce.error);
    } else {
      console.log(responce.data);

      // now insert to the table 'intersections_user_address'
      // user_id + address_id

      // prepare insert object:
      const insertValForTable_intersections_user_address = [
        {
          address_id: address_id,
          user_id: '08be59a3-7c3f-4668-8779-0699ec06ded5',
        },
      ];

      const responceFrom_intersections_user_address = await supabase
        .from('intersections_user_address')
        .insert(insertValForTable_intersections_user_address)
        .select();
      if (responce.error) {
        console.log(responceFrom_intersections_user_address.error);
      } else {
        console.log(responceFrom_intersections_user_address.data);
      }
    }
  }

  revalidatePath('/account');
  redirect('/account');
}
