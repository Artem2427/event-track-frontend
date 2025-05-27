import { type Dispatch, type SetStateAction } from 'react';
import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@shared/shadcn-ui';
import clsx from 'clsx';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { type DateRange } from 'react-day-picker';
import { useTranslation } from 'react-i18next';
import { uk, enUS } from 'date-fns/locale';

type Props = {
  className?: string;
  date?: DateRange;
  setDate: Dispatch<SetStateAction<DateRange | undefined>>;
  align?: 'center' | 'end' | 'start';
  isOpen?: boolean;
};



export const DateRangePicker = (props: Props) => {
  const { setDate, align, className, date, isOpen } = props;
  const { t, i18n } = useTranslation('translations');

  const formatDateRange = (from?: Date, to?: Date) => {
    if (!from) return t('datePickerPlaceholder');
    if (to)
      return `${format(from, 'dd MMMM yyyy')} - ${format(to, 'dd MMMM yyyy')}`;
    return format(from, 'dd MMMM yyyy');
  };

  return (
    <div className={clsx('grid gap-2', className)}>
      {isOpen ? (
        <div className="flex flex-col items-end">
          <Button
            id="date"
            variant="outline"
            className={clsx('justify-end text-left font-normal mb-[5px]', {
              'text-muted-foreground': !date,
            })}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDateRange(date?.from, date?.to)}
          </Button>
          <div className="w-auto p-0 border rounded-md bg-background">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </div>
        </div>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant="outline"
              className={clsx('justify-start text-left font-normal h-9', {
                'text-muted-foreground': !date,
              })}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formatDateRange(date?.from, date?.to)}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-background" align={align}>
            <Calendar
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              locale={i18n.resolvedLanguage === 'en' ? enUS : uk}
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};
