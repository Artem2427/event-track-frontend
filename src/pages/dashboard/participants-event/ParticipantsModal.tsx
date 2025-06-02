import { eventHooks } from '@entities/event/hooks';
import type { EventParticipant } from '@entities/event/model';
import { ScrollArea, Spinner } from '@shared/shadcn-ui';
import { Avatar, AvatarFallback, AvatarImage } from '@shared/shadcn-ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@shared/shadcn-ui/dialog';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ParticipantsEventModal = ({
  open,
  eventId,
  onClose,
}: {
  open: boolean;
  eventId: string;
  onClose: () => void;
}) => {
  const { t } = useTranslation('translations');

  const { data, isLoading, isError } = eventHooks.useGetEventParticipantsQuery(
    eventId,
    {
      enabled: open && Boolean(eventId),
    },
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{t('participants.title', 'Participants')}</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Spinner size="large" />
          </div>
        ) : isError ? (
          <p className="text-sm text-red-500">
            {t('participants.error', 'Failed to load participants')}
          </p>
        ) : !data?.length ? (
          <p className="text-sm text-muted-foreground">
            {t('participants.empty', 'No participants yet')}
          </p>
        ) : (
          <ScrollArea className="max-h-[400px] space-y-4">
            {data.map((participant: EventParticipant) => {
              const fullName = `${participant.user.firstName} ${participant.user.lastName}`;
              return (
                <Link
                  to={`/profile/${participant.userId}`}
                  key={participant.id}
                  className="flex items-center gap-4 border-b pb-3 hover:bg-muted/30 transition rounded px-2 py-1"
                >
                  <Avatar>
                    <AvatarImage
                      src={participant.user.avatar ?? undefined}
                      alt={fullName}
                    />
                    <AvatarFallback>
                      {participant.user.firstName?.[0] ?? 'U'}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col">
                    <span className="font-medium">{fullName}</span>
                    <span className="text-sm text-muted-foreground">
                      {participant.role} • {participant.status}
                    </span>
                  </div>
                </Link>
              );
            })}
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ParticipantsEventModal;
