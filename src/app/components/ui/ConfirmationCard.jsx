import CardHeader from '@/app/components/ui/CardHeader';
import Button from '@/app/components/ui/Button';

export default function ConfirmationCard() {
  return (
    <>
      <CardHeader title='Are you sure?' />
      <div className='text_block'>
        <p>
          You are going to delete your address. To return it back you will need
          an invitation link from your neighbours or you will need to create a
          new address.
        </p>
        <p>
          Please confirm deleting address only if you 100% aware of what you are
          doing.
        </p>
      </div>
      <Button name='Confirm deleting address' />
    </>
  );
}
