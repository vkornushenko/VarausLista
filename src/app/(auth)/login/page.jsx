import CardLayout from '@/app/components/ui/CardLayout';
import LoginForm from './LoginForm';
import AccountCardLogin from '@/app/(dashboard)/account/AccountCardLogin';

export default function LoginPage() {
  return (
    <CardLayout>
      <LoginForm />
      <AccountCardLogin questionText={'Don\'t have account?'} actionText={'Create Account'} actionLink={'/account'} />
    </CardLayout>
  );
}
