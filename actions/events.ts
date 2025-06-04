'use server';

import { getArrayEventAttendancesByIds } from '@/dal/eventAttendance';
import { getUserLocation, setUserLocation } from '@/dal/user';
import { verifySession } from '@/lib/sessions';
import { EventAttendanceMongooseT } from '@/types/eventAttendace';

export const getUserLocationA = async () => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, data: null, message: 'Вы не авторизированы' };
    }

    const location = await getUserLocation(session.userId);
    return { ok: true, data: location, message: 'Локация пользователя получена' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, data: null, message: error.message };
    }
    return { ok: false, data: null, message: 'Неизвестная ошибка' };
  }
};
export const setUserLocationA = async (newLocationSlug: string) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, data: null, message: 'Вы не авторизированы' };
    }

    const user = await setUserLocation(session.userId, newLocationSlug);
    return {
      ok: true,
      data: { updatedLocation: user?.location, userId: user?._id },
      message: 'Локация пользователя изменена',
    };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, data: null, message: error.message };
    }
    return { ok: false, data: null, message: 'Неизвестная ошибка' };
  }
};
export const getEventsAByArrayIdsA = async (eventIds: string[]) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, data: null, message: 'Вы не авторизированы' };
    }

    const eventAttendaces = await getArrayEventAttendancesByIds(session.userId, eventIds);
       const cleanEventAttendances:EventAttendanceMongooseT[] = eventAttendaces.map((attendance) => ({
         ...attendance,
         _id: attendance._id.toString(),
         user: attendance.user.toString(),
    }));
    return {
      ok: true,
      data: cleanEventAttendances,
      message: 'Статус событий пользователя получены.',
    };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, data: null, message: error.message };
    }
    return { ok: false, data: null, message: 'Неизвестная ошибка' };
  }
};
