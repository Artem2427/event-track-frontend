import type { EventType } from '@entities/event/model';
import type { CreateEventSchema } from '@pages/dashboard/create-event/schema';

function toDatetimeLocalFormat(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const hours = `${date.getHours()}`.padStart(2, '0');
  const minutes = `${date.getMinutes()}`.padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function mapEventToFormValues(
  event: EventType,
): Partial<CreateEventSchema> {
  return {
    title: event.title,
    description: event.description || '',
    location: event.location || '',
    startDate: toDatetimeLocalFormat(event.startDate),
    endDate: toDatetimeLocalFormat(event.endDate),
    isPublic: event.isPublic,
    isOffline: event.isOffline,
    maxParticipants: event.maxParticipants?.toString() || undefined,
    minParticipants: event.minParticipants?.toString() || undefined,
    price:
      event.price && event.price !== '0' ? event.price.toString() : undefined,
    image: event.image ?? undefined,
  };
}
