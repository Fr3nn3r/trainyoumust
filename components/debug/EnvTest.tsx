'use client';

import { useEffect } from 'react';

export default function EnvTest() {
  useEffect(() => {
    console.log('[EnvTest Component] Attempting to access NEXT_PUBLIC_STRIPE_BASIC_MONTH_PRICE_ID:', process.env.NEXT_PUBLIC_STRIPE_BASIC_MONTH_PRICE_ID);

    console.log('[EnvTest Component] All NEXT_PUBLIC_ variables:');
    let found = false;
    for (const key in process.env) {
      if (key.startsWith('NEXT_PUBLIC_')) {
        console.log(`[EnvTest Component] ${key}: ${process.env[key]}`);
        found = true;
      }
    }
    if (!found) {
      console.log('[EnvTest Component] No NEXT_PUBLIC_ variables found in process.env.');
    }
  }, []);

  return <div style={{ display: 'none' }}>Env Test Component Loaded (check console)</div>;
} 