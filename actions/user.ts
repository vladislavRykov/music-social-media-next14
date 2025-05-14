'use server';
import { searchUsersByUsername, searchUsersByUsernameScroll } from '@/dal/user';
import { verifySession } from '@/lib/sessions';
import { UserProfileData } from '@/types/types';

export const searchUsersByUsernameA = async ({
  searchValue,
  lastPostId,
}: {
  searchValue: string;
  lastPostId: string | null;
}) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, data: null, message: 'Вы не авторизированы' };
    }
    const users = await searchUsersByUsernameScroll<UserProfileData[]>({
      searchString: searchValue,
      currentUserId: session.userId,
      lastPostId,
      selectedFields: ['avatar', 'username', '_id'],
    });
    return { ok: true, data: users, message: 'Пользователи найдены.' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, data: null, message: error.message };
    }
    return { ok: false, data: null, message: 'Неизвестная ошибка.' };
  }
};
