import type { CreateEventSchema } from '@pages/dashboard/create-event/schema';
import { api } from '@shared/api';
import type {
  EventParticipant,
  EventType,
  EventsQueryParams,
  RegisterEvent,
  RegisterToEventInput,
} from '../model';

class EventService {
  async getAllEvents(queryParams: EventsQueryParams): Promise<EventType[]> {
    const res = await api.get(
      `/event?startDate=${queryParams.startDate}&endDate=${queryParams.endDate}&search=${queryParams.search}`,
    );

    return res.data;
  }

  async getEventOneById(eventId: string): Promise<Event> {
    const res = await api.get(`/event/${eventId}`);

    return res.data;
  }

  async createEvent(
    input: CreateEventSchema,
    imageFile: File | null,
  ): Promise<EventType> {
    const formData = new FormData();

    formData.append('title', input.title);
    formData.append('startDate', input.startDate);
    formData.append('endDate', input.endDate);
    formData.append('isPublic', String(input.isPublic));
    formData.append('isOffline', String(input.isOffline));

    if (input.description) {
      formData.append('description', input.description);
    }

    if (input.location) {
      formData.append('location', input.location);
    }

    if (input.minParticipants !== undefined) {
      formData.append('minParticipants', input.minParticipants.toString());
    }

    if (input.maxParticipants !== undefined) {
      formData.append('maxParticipants', input.maxParticipants.toString());
    }

    if (!input.isPublic && input.price !== undefined) {
      formData.append('price', input.price.toString());
    }

    if (imageFile) {
      formData.append('image', imageFile);
    }

    const res = await api.post<EventType>('/event', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  }

  async updateEventById(
    eventId: string,
    input: CreateEventSchema,
    imageFile: File | null,
  ): Promise<EventType> {
    const formData = new FormData();

    formData.append('title', input.title);
    formData.append('startDate', input.startDate);
    formData.append('endDate', input.endDate);
    formData.append('isPublic', String(input.isPublic));
    formData.append('isOffline', String(input.isOffline));

    if (input.description) {
      formData.append('description', input.description);
    }

    if (input.location) {
      formData.append('location', input.location);
    }

    if (input.minParticipants !== undefined) {
      formData.append('minParticipants', input.minParticipants.toString());
    }

    if (input.maxParticipants !== undefined) {
      formData.append('maxParticipants', input.maxParticipants.toString());
    }

    if (!input.isPublic && input.price !== undefined) {
      formData.append('price', input.price.toString());
    }

    if (imageFile) {
      formData.append('image', imageFile);
    }

    const res = await api.patch<EventType>(`/event/${eventId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  }

  async getEventParticipants(eventId: string): Promise<EventParticipant[]> {
    const res = await api.get<EventParticipant[]>(
      `/registration/${eventId}/participants`,
    );

    return res.data;
  }

  async getRegistrationOnEvents(): Promise<string[]> {
    const res = await api.get<string[]>('/registration/my-events');

    return res.data;
  }

  async registerToEvent(input: RegisterToEventInput): Promise<RegisterEvent> {
    const res = await api.post<RegisterEvent>('/registration', input);

    return res.data;
  }
}

export const eventService = new EventService();
