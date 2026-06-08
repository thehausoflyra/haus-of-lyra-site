'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WeddingsRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/wedding-photo');
  }, [router]);

  return (
    <div style={{ background: '#0F0E0C', color: '#FAF8F5', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <p>Redirecting to Wedding Photography...</p>
    </div>
  );
}
