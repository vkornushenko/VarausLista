'use server';

// supabase
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { user } from '@/redux/features/user-slice';

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
  // console.log('formData');
  // console.log(formData);

  // insert for table 'address'
  const insertValForTable_address = [{ address_name: formData.address }];

  const { data, error } = await supabase
    .from('address')
    .insert(insertValForTable_address)
    .select();

  if (error) {
    console.log(error);
  } else {
    // console.log(data);

    // here should be new adress_id from DB
    const address_id = data[0].id;

    // if everything fine -> lets create 2nd table
    // prepare insert with new address_id
    let insertValForTable_address_property_map = [];
    formData.property_types.map((property_id, index) => {
      insertValForTable_address_property_map[index] = {
        address_id: address_id,
        property_id: property_id,
      };
    });

    const responce = await supabase
      .from('address_property_map')
      .insert(insertValForTable_address_property_map)
      .select();
    if (responce.error) {
      console.log(responce.error);
    } else {
      // console.log('data inserted in table (address_property_map):')
      // console.log(insertValForTable_address_property_map);
      // console.log('data returned from table (address_property_map) after insert:')
      // console.log(responce.data);

      // now insert to the table 'user_address_map'
      // user_id + address_id

      // prepare insert object:
      const insertValForTable_user_address_map = [
        {
          address_id: address_id,
          user_id: formData.user_id,
        },
      ];

      const responceFrom_user_address_map = await supabase
        .from('user_address_map')
        .insert(insertValForTable_user_address_map)
        .select();
      if (responce.error) {
        console.log(responceFrom_user_address_map.error);
      } else {
        // console.log('responceFrom_user_address_map!!!');
        // console.log(responceFrom_user_address_map.data);
      }
    }
  }

  revalidatePath('/account');
  redirect('/account');
}

export async function getPropertyList() {
  const { data, error } = await supabase.from('property').select();
  if (error) {
    console.log(error.message);
  }
  return data;
}

export async function getUserIdList(address_id) {
  let { data: user_address_map, error } = await supabase
    .from('user_address_map')
    .select(
      `user_id, id, users (user_id, name)`
    )
    .eq('address_id', address_id);
  // console.log('user_address_map | address/actions.js');
  // console.log(user_address_map);
  return user_address_map;
}
