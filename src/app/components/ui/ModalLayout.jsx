import classes from './ModalLayout.module.css';

export default function ModalLayout(props) {
  return (
    <>
      <div className={classes.backdrop} onClick={props.toggleLayover}></div>
      <div className={classes.modal}>{props.children}</div>
    </>
  );
}
