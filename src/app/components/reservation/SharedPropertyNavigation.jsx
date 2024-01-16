import { motion } from 'framer-motion';

import classes from './SharedPropertyNavigation.module.css';

export default function SharedPropertyNavigation(props) {

  const sharedPropertyList = props.sharedPropertyList;
  const selected = props.selectedProperty;

  const changePropertyHandler = (event) => {
    props.changeProperty(event.currentTarget.getAttribute('property_id'));
  };

  return (
    <nav>
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
    </nav>
  );
}
