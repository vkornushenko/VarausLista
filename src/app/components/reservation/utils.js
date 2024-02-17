export function returnPropertyName(propertyData, propertyId) {
  let propertyArr = {};
  propertyData.map(
    (item) => (propertyArr[item.property_id] = item.property.name)
  );
  return propertyArr[propertyId];
}
