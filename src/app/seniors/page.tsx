'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SeniorsRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/senior-photo');
  }, [router]);

  return (
    <div style={{ background: '#0F0E0C', color: '#FAF8F5', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <p>Redirecting to Senior Experience...</p>
    </div>
  );
}
