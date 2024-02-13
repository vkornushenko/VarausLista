import { motion } from 'framer-motion';

import classes from './SharedPropertyNavigation.module.css';
import Link from 'next/link';
import { getReservations } from '@/app/utils/apiRequests';

export default function SharedPropertyNavigation({
  selectedPropertyId,
  setSelectedPropertyId,
  propertyData,
  timeIntervalState,
  setReservationDataState
}) {

  const handlePropertyChange = async (property_id) => {
    setSelectedPropertyId(property_id);

    const selectValues = {
      timeInterval: timeIntervalState,
      property_id: property_id
    }
    // api request
    const data = await getReservations(selectValues);
    // console.log(data)
    setReservationDataState(data);
  };

  return (
    <>
      <nav>
        <ul className={classes.shared_property_nav}>
          {propertyData.map((item, index) => (
            <li
              key={index}
              property_id={item.property_id}
              onClick={() => {
                handlePropertyChange(item.property_id);
              }}
              className={`${classes.share_property_nav_item}${
                item.property_id === selectedPropertyId &&
                ' ' + classes.selected
              }`}
            >
              <p>{item.property.name}</p>
              {item.property_id === selectedPropertyId && (
                <motion.div layoutId='underlined' className={classes.line} />
              )}
            </li>
          ))}
          <li>
            <Link href={'/address'}>+Add</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
