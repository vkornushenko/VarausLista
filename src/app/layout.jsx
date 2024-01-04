// fonts
import { source_serif_4 } from '@/app/utils/fonts';
// style
import '@/app/globals.css';
import { ReduxProvider } from '@/redux/provider';

export const metadata = {
  title: 'VarausLista App',
  description:
    'Online self checkin to your shared property like Sauna, Laundry etc...',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={source_serif_4.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
