'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const page = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/chat');
  }, []);
  return <div>page</div>;
};

export default page;
