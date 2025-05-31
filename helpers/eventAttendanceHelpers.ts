import { EventAttendanceStatus } from "@/types/eventAttendace";

export const getSelectedColor = (status: EventAttendanceStatus | null) => {
  switch (status) {
    case EventAttendanceStatus.Going:
      return 'green';
    case EventAttendanceStatus.Interested:
      return 'blue';
    case EventAttendanceStatus.Not_going:
      return 'red';
  }
};