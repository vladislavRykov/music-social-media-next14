import React, { useEffect, useState } from 'react';

import UserHeader from './UserHeader/UserHeader';
import { verifySession } from '@/lib/sessions';
import UnAuthUserHeader from './UnAuthUserHeader/UnAuthUserHeader';
import API from '@/services/api/api';
import { getSession } from '@/dal/user';

const Header = async () => {
  const session = await getSession();

  //
  if (session) {
    return <UserHeader />;
  }
  return <UnAuthUserHeader />;
};

export default Header;
