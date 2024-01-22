'use server';

// supabase
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addAddress(addressFormData) {
  // console.log('this we get RAW from the form addressFormData');
  // console.log(addressFormData);

  // collecting data from multiple selects with the same input name
  // otherwise they will be overwrited
  const propertyTypeList = addressFormData.getAll('property_types');
  // left only unique values
  const uniquePropertyTypeArr = [...new Set(propertyTypeList)];
  
  // cleaning data from form
  const formData = Object.fromEntries(addressFormData);
  
  // write unique property array in formData obj
  formData.property_types = uniquePropertyTypeArr;
  
  // at the moment we are getting user_id from the hidden input
  // we can get it from the supabase also
  console.log('formData');
  console.log(formData);


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
    formData.property_types.map((property_id, index) => {
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
      console.log('data inserted in table (intersections_address_property):')
      console.log(insertValForTable_intersections_address_property);
      console.log('data returned from table (intersections_address_property) after insert:')
      console.log(responce.data);

      // now insert to the table 'intersections_user_address'
      // user_id + address_id

      // prepare insert object:
      const insertValForTable_intersections_user_address = [
        {
          address_id: address_id,
          user_id: formData.user_id,
        },
      ];

      const responceFrom_intersections_user_address = await supabase
        .from('intersections_user_address')
        .insert(insertValForTable_intersections_user_address)
        .select();
      if (responce.error) {
        console.log(responceFrom_intersections_user_address.error);
      } else {
        console.log('responceFrom_intersections_user_address!!!');
        console.log(responceFrom_intersections_user_address.data);
      }
    }
  }

  revalidatePath('/account');
  redirect('/account');
}
