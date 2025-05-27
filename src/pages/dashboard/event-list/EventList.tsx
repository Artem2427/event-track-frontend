import { useState } from 'react';
import { eventHooks } from '@entities/event/hooks';
import { WithRole } from '@entities/user-profile/hooks';
import { UserRolesEnumValue } from '@entities/user-profile/model';
import { DateRangePicker } from '@shared/custom-ui';
import { sharedHooks } from '@shared/hooks';
import { Button, Input, Spinner } from '@shared/shadcn-ui';
import { type DateRange } from 'react-day-picker';
import { useTranslation } from 'react-i18next';
import CreateEventModal from '../create-event/CreateEventModal';
import { EventCard } from './EventCard';

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

  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  const isLoadingWithMinDelay =
    sharedHooks.useLoadingWithMinDisplayTime(isLoading);

  const handleClearFilters = () => {
    setDateRange(undefined);
    setSearchValue('');
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
          {events?.map((event) => <EventCard key={event.id} event={event} />)}
        </div>
      )}

      <CreateEventModal
        open={isOpenCreateModal}
        onClose={() => setIsOpenCreateModal(false)}
      />
    </section>
  );
};

export default EventList;
