import classes from './InfoQuote.module.css';

export default function InfoQuote({ data }) {
  // data.message - text
  // data.type - 'info' or 'error' or 'success'

  return (
    <div className={`${classes.info_block} ${classes[data.type]}`}>
      <p>{data.message}</p>
    </div>
  );
}
