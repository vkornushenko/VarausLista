'use server';

// supabase
import { createClient } from '@/app/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getPublicUsersIdByUserId } from '../reservation/actions';

export async function addAddress(addressFormData) {
  // connect to supabase
  const supabase = createClient();
  
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
  // console.log('formData address/actions.js');
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
          users_id: formData.users_id,
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

  // TODO close modal (the same way as 'addNeighbour')
  revalidatePath('/address');
  redirect('/address');
}

export async function getPropertyList() {
  // connect to supabase
  const supabase = createClient();
  const { data, error } = await supabase.from('property').select();
  if (error) {
    console.log(error.message);
  }
  return data;
}

export async function getUserIdList(address_id) {
  if (address_id === null) {
    return null;
  }
  // connect to supabase
  const supabase = createClient();

  let { data: users, error } = await supabase
    .from('user_address_map')
    .select(`
    users (
      id, name, user_id
    )
  `)
    .eq('address_id', address_id);
  // console.log('users | address/actions.js');
  // console.log(users);
  return users;
}

export async function addNeighbour(_, addNeighbourFormData) {
  // console.log('addNeighbourFormData from address/actions.js');
  // console.log(addNeighbourFormData);
  // cleaning data from form
  const formData = Object.fromEntries(addNeighbourFormData);
  // console.log('formData');
  // console.log(formData);

  const users_id = await getPublicUsersIdByUserId(formData.user_id);

  // check if user_id exists in users table
  const userIdExistsInUsersTable = await isValueExistsInTablesColumn(
    users_id,
    'users',
    'id'
  );
  // console.log('userIdExistsInUsersTable');
  // console.log(userIdExistsInUsersTable);
  if (!userIdExistsInUsersTable) {
    return 'User is not found. Check User Id and try again.';
  }

  // check if user_id exists in user_address_map table
  const usersIdExistsInUserAddressMapTable = await isValueExistsInTablesColumn(
    users_id,
    'user_address_map',
    'users_id'
  );
  // console.log('usersIdExistsInUserAddressMapTable');
  // console.log(usersIdExistsInUserAddressMapTable);

  // cancel submitting data, user already has address
  if (usersIdExistsInUserAddressMapTable) {
    return 'User is already have been attached to address. Check User Id and try again.';
  }





  // // WE PROPBABLY DON'T NEED IT ANYMORE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // // update address_id for users table (for this user_id)
  // const isAddressIdUpdated = await updateAddressIdInUsersTable(
  //   formData.address_id,
  //   formData.user_id
  // );
  // console.log('isAddressIdUpdated');
  // console.log(isAddressIdUpdated);

  // // this will revalidate data and new neighbour will be already on address page
  // if (isAddressIdUpdated) {
  //   console.log('address_id was successfully updated in users table');
  //   var formSubmissionResult = 'success';
  // }
  // else{
  //   return 'Error. Attaching user to address was failed. Problem was detected in users table.'
  // }

  // // WE PROPBABLY DON'T NEED IT ANYMORE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!







  // insert user_id and address_id in user_address_map table
  const isUsersIdAndAddressIdInserted =
    await insertUserIdAndAddressIdInUserAddressMap(
      users_id,
      formData.address_id
    );
  // console.log('isUsersIdAndAddressIdInserted');
  // console.log(isUsersIdAndAddressIdInserted);

if (isUsersIdAndAddressIdInserted) {
  var formSubmissionResult = 'success'
}
else{
  return 'Error. Attaching user to address was failed. Problem was detected in user_address_map table.';
}

  // redirect('/address');
  revalidatePath('/address');
  return formSubmissionResult;
}

// check if value exists in table
export async function isValueExistsInTablesColumn(
  value,
  tableName,
  columnName
) {
  // connect to supabase
  const supabase = createClient();

  let { data, error } = await supabase
    .from(tableName)
    .select('*')
    .eq(columnName, value);
  if (error) {
    console.log(error);
    return false;
  } else {
    // console.log(data);
    // console.log(typeof data);
    // console.log(data.length);
    return data.length === 0 ? false : true;
    // return true;
  }
}

// update address_id for users table (for this user_id)
export async function updateAddressIdInUsersTable(address_id, user_id) {
  // connect to supabase
  const supabase = createClient();

  const { data, error } = await supabase
    .from('users')
    .update({ address_id: address_id })
    .eq('user_id', user_id)
    .select();
  if (error) {
    console.log(error);
    return false;
  } else {
    // console.log('users table updated successfully | address/actions.js');
    // console.log(data);
    return true;
  }
}

// insert user_id and address_id in user_address_map table
export async function insertUserIdAndAddressIdInUserAddressMap(
  users_id,
  address_id
) {
  // connect to supabase
  const supabase = createClient();

  const { data, error } = await supabase
    .from('user_address_map')
    .insert([{ users_id: users_id, address_id: address_id }])
    .select();
  if (error) {
    console.log(error);
    return false;
  } else {
    // console.log(
    //   'users_id and address_id inserted successfully in user_address_map table | address/actions.js'
    // );
    // console.log(data);
    return true;
  }
}
