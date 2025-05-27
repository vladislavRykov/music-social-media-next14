'use server';

import {
  createNewEventAttendance,
  deleteEventAttendance,
  getEventAttendance,
  updateEventAttendanceStatus,
} from '@/dal/eventAttendance';
import { getUserLocation, setUserLocation } from '@/dal/user';
import { verifySession } from '@/lib/sessions';
import { EventAttendanceStatus } from '@/types/eventAttendace';

export const setEventAttendanceA = async (
  eventId: string,
  status: EventAttendanceStatus | null,
) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, message: 'Вы не авторизированы' };
    }
    const existingEventAttendance = await getEventAttendance(session.userId, eventId);
    if (status) {
      if (existingEventAttendance) {
        const oldEventAttendance = await updateEventAttendanceStatus(
          session.userId,
          eventId,
          status,
        );
      } else {
        const createdEventAttendance = await createNewEventAttendance({
          eventId,
          user: session.userId,
          status,
        });
      }
    } else {
      if (!existingEventAttendance) return { ok: false, message: 'У вас нет статуса у события' };
      await deleteEventAttendance(session.userId, eventId);
    }
    return { ok: true, message: 'Локация пользователя получена' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, message: error.message };
    }
    return { ok: false, message: 'Неизвестная ошибка' };
  }
};
