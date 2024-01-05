// fonts
import { source_serif_4 } from '@/app/utils/fonts';
// style
import '@/app/globals.css';
import { ReduxProvider } from '@/redux/provider';
import Navbar from './components/Navbar';
import bg from '../../public/img/bg-img.png';

export const metadata = {
  title: 'VarausLista App',
  description:
    'Online self checkin to your shared property like Sauna, Laundry etc...',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={source_serif_4.className}>

        <ReduxProvider>
        <div className='page' style={{ backgroundImage: `url(${bg.src})` }}>
        <Navbar />
          {children}
          </div>
          </ReduxProvider>
      </body>
    </html>
  );
}
