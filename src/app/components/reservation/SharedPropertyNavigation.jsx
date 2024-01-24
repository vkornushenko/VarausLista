import { motion } from 'framer-motion';

import classes from './SharedPropertyNavigation.module.css';
// import { useState } from 'react';

export default function SharedPropertyNavigation({selectedPropertyId, setSelectedPropertyId, propertyData}) {
  // const[selectedPropertyId, setSelectedPropertyId] = useState(propertyData[0].property_id);
  return (
    <>
      <nav>
        <ul className={classes.shared_property_nav}>
          {propertyData.map((item, index) => (
            <li
              key={index}
              property_id={item.property_id}
              onClick={() => {setSelectedPropertyId(item.property_id)}}
              className={`${classes.share_property_nav_item}${
                item.property_id === selectedPropertyId && ' ' + classes.selected
              }`}
            >
              <p>{item.shared_property.name}</p>
              {item.property_id === selectedPropertyId && (
                <motion.div layoutId='underlined' className={classes.line} />
              )}
            </li>
          ))}
          <li>+Add</li>
        </ul>
      </nav>
      {/* <nav>
        <ul className={classes.shared_property_nav}>
          {sharedPropertyList.map((propertyItem, index) => (
            <li
              key={index}
              property_id={index}
              onClick={changePropertyHandler}
              className={`${classes.share_property_nav_item}${
                propertyItem === selected && ' ' + classes.selected
              }`}
            >
              <p>{propertyItem}</p>
              {propertyItem === selected && (
                <motion.div layoutId='underlined' className={classes.line} />
              )}
            </li>
          ))}
          <li>+Add</li>
        </ul>
      </nav> */}
    </>
  );
}
