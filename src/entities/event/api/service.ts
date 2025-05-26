import { api } from '@shared/api';
import type { EventsQueryParams } from '../model';

class EventService {
  async getAllEvents(queryParams: EventsQueryParams): Promise<Event[]> {
    const res = await api.get(
      `/event?startDate=${queryParams.startDate}&endDate=${queryParams.endDate}&search=${queryParams.search}`,
    );

    return res.data;
  }

  async getEventOneById(eventId: string): Promise<Event> {
    const res = await api.get(`/event/${eventId}`);

    return res.data;
  }
}

export const eventService = new EventService();
