import { motion } from 'framer-motion';
import classes from './LoadingReservationTable.module.css';

export default function LoadingReservationTable() {
  return (
    <motion.div
      layout
      transition={{ duration: 0.3 }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 100 },
      }}
      initial='hidden'
      animate='visible'
      exit='hidden'
    >
      <p className={classes.loading_text}>Loading...</p>

    </motion.div>
  );
}
