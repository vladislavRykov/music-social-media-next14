import Chat from '@/pages/Chat/Chat';
import React, { Suspense } from 'react';

const page = () => {
  return <Chat />
  // <Suspense fallback={<div>123</div>}>
    // {/* </Suspense> */}
};

export default page;
