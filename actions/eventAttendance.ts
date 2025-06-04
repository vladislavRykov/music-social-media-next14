'use server';

import {
  createNewEventAttendance,
  deleteEventAttendance,
  getAllUserEventAttendances,
  getEAWithUserArrayByEventId,
  getEventAttendance,
  updateEventAttendanceStatus,
} from '@/dal/eventAttendance';
import { getUserFriends } from '@/dal/relation';
import { getUserLocation, getUserProfByUserName, setUserLocation } from '@/dal/user';
import { verifySession } from '@/lib/sessions';
import { Overwrite } from '@/types/common';
import {
  EventAttendanceMongooseT,
  EventAttendanceStatus,
  GroupedEventsT,
} from '@/types/eventAttendace';
import { UserProfileData } from '@/types/types';

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
    return { ok: true, message: 'Статус события успешно изменен.' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, message: error.message };
    }
    return { ok: false, message: 'Неизвестная ошибка' };
  }
};
export const deleteCurrentUserEventAttendanceA = async (eventId: string) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, message: 'Вы не авторизированы' };
    }
    const existingEventAttendance = await getEventAttendance(session.userId, eventId);

    if (!existingEventAttendance) return { ok: false, message: 'У вас нет статуса у события' };
    await deleteEventAttendance(session.userId, eventId);
    if (existingEventAttendance.user.toString() !== session.userId.toString())
      return { ok: false, message: 'Нет прав' };
    return { ok: true, message: 'Событие удалено из профиля' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, message: error.message };
    }
    return { ok: false, message: 'Неизвестная ошибка' };
  }
};

export const getAllUserEventAttendancesA = async (username: string) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, data: null, message: 'Вы не авторизированы' };
    }
    const user = await getUserProfByUserName(username);
    if (!user) return { ok: false, data: null, message: 'Пользователь не найден' };
    const eventAttendances = await getAllUserEventAttendances(user._id);
    const groupedEvents = eventAttendances.reduce<GroupedEventsT>(
      (acc, eventAttendace) => {
        const { status } = eventAttendace;

        acc[status].push(eventAttendace.eventId);

        return acc;
      },
      {
        [EventAttendanceStatus.Going]: [],
        [EventAttendanceStatus.Not_going]: [],
        [EventAttendanceStatus.Interested]: [],
      },
    );
    return { ok: true, data: groupedEvents, message: 'Айди событий пользователя получены' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, data: null, message: error.message };
    }
    return { ok: false, data: null, message: 'Неизвестная ошибка' };
  }
};
export const getFriendsEAByEventId = async (eventId: string) => {
  try {
    const session = await verifySession();
    if (!session) {
      return { ok: false, data: null, message: 'Вы не авторизированы' };
    }
    const friendRelation = await getUserFriends({ currentUserId: session.userId });
    const otherIds: string[] = [];

    for (let doc of friendRelation) {
      if (doc.userA.toString() === session.userId.toString()) {
        otherIds.push(doc.userB.toString()); // Если usedA соответствует, добавляем usedB
      } else if (doc.userB.toString() === session.userId.toString()) {
        otherIds.push(doc.userA.toString()); // Иначе используем usedA
      }
    }
    const eventAttendaces = await getEAWithUserArrayByEventId<
      Overwrite<
        EventAttendanceMongooseT,
        {
          user: {
            _id: string;
            username: string;
            avatar?: string;
          };
        }
      >[]
    >(eventId, otherIds, [{ path: 'user', select: 'avatar _id username' }]);
    return { ok: true, data: eventAttendaces, message: 'Статусы по событию друзей получены' };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, data: null, message: error.message };
    }
    return { ok: false, data: null, message: 'Неизвестная ошибка' };
  }
};
