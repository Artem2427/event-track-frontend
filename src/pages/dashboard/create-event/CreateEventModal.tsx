import { eventHooks } from '@entities/event/hooks';
import { EVENT_QUERY_KEYS } from '@entities/event/model';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@shared/shadcn-ui/dialog';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { EventForm } from './CreateEventForm';
import type { CreateEventSchema } from './schema';

const CreateEventModal = ({
  open,
  initialValues,
  eventId,
  onClose,
}: {
  open: boolean;
  initialValues?: Partial<CreateEventSchema>;
  eventId?: string;
  onClose: () => void;
}) => {
  const { t } = useTranslation('translations');
  const createEvent = eventHooks.useCreateEventMutation();
  const updateEvent = eventHooks.useUpdateEventMutation();

  const queryClient = useQueryClient();

  const handleSubmit = (values: CreateEventSchema, file: File | null) => {
    if (initialValues && eventId) {
      updateEvent.mutate(
        { input: values, imageFile: file, eventId },
        {
          onSuccess: async (response) => {
            console.log(response, 'response');

            toast.success('Success');
            await queryClient.invalidateQueries({
              queryKey: [EVENT_QUERY_KEYS.GET_ALL_EVENTS],
            });
            onClose();
          },
          onError: (error) => {
            toast.error(
              t(`errors.${error.response?.data.message}`, {
                defaultValue: 'Some error',
              }),
              {
                duration: 5000,
                richColors: true,
              },
            );
          },
        },
      );
      return;
    }

    createEvent.mutate(
      { input: values, imageFile: file },
      {
        onSuccess: async (response) => {
          console.log(response, 'response');

          toast.success('Success');
          await queryClient.invalidateQueries({
            queryKey: [EVENT_QUERY_KEYS.GET_ALL_EVENTS],
          });
          onClose();
        },
        onError: (error) => {
          toast.error(
            t(`errors.${error.response?.data.message}`, {
              defaultValue: 'Some error',
            }),
            {
              duration: 5000,
              richColors: true,
            },
          );
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {initialValues ? 'Update Event' : 'Create New Event'}
          </DialogTitle>
        </DialogHeader>
        <EventForm onSubmit={handleSubmit} initialValues={initialValues} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventModal;
