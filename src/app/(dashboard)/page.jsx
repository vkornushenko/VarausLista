'use client';

import CardLayout from '../components/ui/CardLayout';
import Intro from '../components/Intro';

export default function Home() {
  return (
    <main style={{paddingTop: '135px'}}>
      <CardLayout>
        <Intro />
      </CardLayout>
    </main>
  );
}
