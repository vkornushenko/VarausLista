import { motion } from 'framer-motion';

import classes from './CardLayout.module.css';

export default function CardLayout(props) {
  return (
    <motion.div
      className={classes['content-card']}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 100, y: 0 },
      }}
      transition={{ ease: 'easeOut', stiffness: 500 }}
      initial='hidden'
      animate='visible'
      exit='hidden'
    >
      {props.children}
    </motion.div>
  );
}
