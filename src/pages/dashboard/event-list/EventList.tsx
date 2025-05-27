import { useState } from 'react';
import { eventHooks } from '@entities/event/hooks';
import { DateRangePicker } from '@shared/custom-ui';
import { sharedHooks } from '@shared/hooks';
import { Input, Spinner } from '@shared/shadcn-ui';
import { type DateRange } from 'react-day-picker';
import { useTranslation } from 'react-i18next';

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

  const isLoadingWithMinDelay =
    sharedHooks.useLoadingWithMinDisplayTime(isLoading);

  return (
    <div className="py-6 w-full">
      <div className="flex flex-col md:flex-row gap-4 justify-start items-start w-full">
        <Input
          type="search"
          placeholder={t('searchTitle')}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full md:max-w-[400px]"
        />
        <DateRangePicker date={dateRange} setDate={setDateRange} className="" />
      </div>

      {isLoadingWithMinDelay && (
        <div className="flex items-center justify-center min-h-[calc(100vh_-_180px)]">
          <Spinner size="large" />
        </div>
      )}
      {events?.length === 0 && !isLoadingWithMinDelay && (
        <p>{t('errors.noEventsFound')}</p>
      )}

      {events?.length !== 0 && !isLoadingWithMinDelay && (
        <div className="text-blue-600">{events?.length} - count</div>
      )}

      {/* <ul className="space-y-4">
        {events?.map((event) => (
          <li
            key={event.id}
            className="p-4 border rounded shadow-sm bg-background w-full"
          >
            <h3 className="font-semibold text-xl mb-1">{event.title}</h3>
            {event.description && (
              <p className="text-sm text-muted-foreground mb-2">
                {event.description}
              </p>
            )}
            <p className="text-sm font-medium">
              {new Date(event.startDate).toLocaleString()} —{' '}
              {new Date(event.endDate).toLocaleString()}
            </p>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default EventList;
