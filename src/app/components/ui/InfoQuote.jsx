import classes from './InfoQuote.module.css';

export default function InfoQuote({ data }) {
  return (
    <div className={classes.info_block}>
      <p>{data.message}</p>
    </div>
  );
}
