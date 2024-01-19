import CardHeader from '@/app/components/ui/CardHeader';
import CardLayout from '@/app/components/ui/CardLayout';
import AddressForm from './AddressForm';
import Link from 'next/link';
import InfoQuote from '@/app/components/ui/InfoQuote';

export default function AddressCard({ propertyList }) {
  return (
    <CardLayout>
      <CardHeader title='Manage Address' />
      <AddressForm propertyList={propertyList} />
      <InfoQuote
        data={{
          message: (
            <>
              If your neighbours already using VarausLista App, you need to {' '}
              <Link href='/'>Join Existing Address</Link>.
            </>
          ),
          type: 'info',
        }}
      />
    </CardLayout>
  );
}
