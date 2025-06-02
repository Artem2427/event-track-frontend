import { useState } from 'react';
import { eventService } from '@entities/event/api/service';
import { eventHooks } from '@entities/event/hooks';
import {
  EVENT_QUERY_KEYS,
  type EventType,
  ParticipantRoleValue,
  RegistrationStatusValue,
} from '@entities/event/model';
import { WithRole } from '@entities/user/hooks';
import { UserRolesEnumValue } from '@entities/user/model';
import { useUserProfileStore } from '@entities/user/store';
import { DateRangePicker } from '@shared/custom-ui';
import { sharedHooks } from '@shared/hooks';
import { Button, Input, Spinner } from '@shared/shadcn-ui';
import { mapEventToFormValues } from '@shared/utils/utils';
import { useQueryClient } from '@tanstack/react-query';
import { type DateRange } from 'react-day-picker';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import CreateEventModal from '../create-event/CreateEventModal';
import ParticipantsEventModal from '../participants-event/ParticipantsModal';
import { EnhancedEventCard } from './EnhancedEventCard';

const EventList = () => {
  const { t } = useTranslation('translations');
  const [searchValue, setSearchValue] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const searchValueDebounce = sharedHooks.useDebounce(searchValue);

  const { data: events, isLoading } = eventHooks.useGetAllEventsQuery({
    search: searchValueDebounce,
    startDate: dateRange?.from ? dateRange.from.toISOString() : '',
    endDate: dateRange?.to ? dateRange.to.toISOString() : '',
  });

  const registerToEvent = eventHooks.useRegisterToEventMutation();

  const { user } = useUserProfileStore();

  const queryClient = useQueryClient();

  const [editEvent, setEditEvent] = useState<EventType | null>(null);

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenShowParticipantsModal, setIsOpenShowParticipantsModal] =
    useState(false);

  const isLoadingWithMinDelay =
    sharedHooks.useLoadingWithMinDisplayTime(isLoading);

  const handleClearFilters = () => {
    setDateRange(undefined);
    setSearchValue('');
  };

  const handleEditEvent = (event: EventType) => {
    setEditEvent(event);
    setIsOpenCreateModal(true);
  };

  const handleShowParticipantModal = (event: EventType) => {
    setEditEvent(event);
    setIsOpenShowParticipantsModal(true);
  };

  const handleParticipate = (event: EventType) => {
    if (user) {
      registerToEvent.mutate(
        {
          eventId: event.id,
          role:
            user.role === 'speaker'
              ? ParticipantRoleValue.SPEAKER
              : ParticipantRoleValue.ATTENDEE,
          status: RegistrationStatusValue.REGISTERED,
        },
        {
          onSuccess: async (response) => {
            console.log(response, 'response');

            toast.success(t('signUpSuccess'));
            await Promise.all([
              queryClient.prefetchQuery({
                queryKey: [EVENT_QUERY_KEYS.GET_REGISTRATION_ON_EVENTS],
                queryFn: () => eventService.getRegistrationOnEvents(),
              }),
              queryClient.invalidateQueries({
                queryKey: [EVENT_QUERY_KEYS.GET_ALL_EVENTS],
              }),
            ]);
          },
          onError: (error) => {
            toast.error(
              t(`errors.${error.response?.data.message}`, {
                defaultValue: t('signUpError'),
              }),
              {
                duration: 5000,
                richColors: true,
              },
            );
          },
        },
      );
    }
  };

  return (
    <section className="py-8 px-4 w-full">
      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
        <div className="w-[340px]">
          <label className="block text-sm font-medium mb-1 text-muted-foreground">
            {t('search')}
          </label>
          <Input
            type="search"
            placeholder={t('searchTitle')}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full md:w-auto">
          <label className="block text-sm font-medium mb-1 text-muted-foreground">
            {t('dateRange')}
          </label>
          <DateRangePicker
            date={dateRange}
            setDate={setDateRange}
            className="w-[340px]"
          />
        </div>

        <Button onClick={handleClearFilters}>{t('clear')}</Button>

        <WithRole roles={UserRolesEnumValue.Admin}>
          <div className="ml-auto">
            <Button onClick={() => setIsOpenCreateModal(true)}>
              {t('createEvent')}
            </Button>
          </div>
        </WithRole>
      </div>

      {/* Loading */}
      {isLoadingWithMinDelay && (
        <div className="flex items-center justify-center min-h-[calc(100vh-280px)]">
          <Spinner size="large" />
        </div>
      )}

      {/* No Results */}
      {!isLoadingWithMinDelay && events?.length === 0 && (
        <div className="text-center text-muted-foreground mt-10">
          <p className="text-lg">{t('errors.noEventsFound')}</p>
        </div>
      )}

      {/* Event Grid */}
      {!isLoadingWithMinDelay && events?.length !== 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events?.map((event) => (
            <EnhancedEventCard
              key={event.id}
              event={event}
              onEdit={handleEditEvent}
              onShowParticipants={handleShowParticipantModal}
              onParticipate={handleParticipate}
            />
          ))}
        </div>
      )}

      {editEvent && (
        <ParticipantsEventModal
          open={isOpenShowParticipantsModal}
          eventId={editEvent.id}
          onClose={() => setIsOpenShowParticipantsModal(false)}
        />
      )}

      <CreateEventModal
        open={isOpenCreateModal}
        eventId={editEvent?.id}
        initialValues={editEvent ? mapEventToFormValues(editEvent) : undefined}
        onClose={() => setIsOpenCreateModal(false)}
      />
    </section>
  );
};

export default EventList;
