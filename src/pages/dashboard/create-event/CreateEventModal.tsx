import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@shared/shadcn-ui/dialog';
import { EventForm } from './CreateEventForm';
import type { CreateEventSchema } from './schema';

const CreateEventModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const handleSubmit = (values: CreateEventSchema, file: File | null) => {
    console.log(values, 'values');
    console.log(file, 'file');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
        </DialogHeader>
        <EventForm onSubmit={handleSubmit} isSubmitting={true} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventModal;
