import type { EventType } from '@entities/event/model';
import AppEnvironmentService from '@shared/services/env.service';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@shared/shadcn-ui';
import { format } from 'date-fns';
import {
  Calendar,
  Check,
  Clock,
  Lock,
  MapPin,
  MoreVertical,
  Unlock,
  User,
} from 'lucide-react';
import PlaceholderImage from '/assets/placeholder-image-event.png';
import { useTranslation } from 'react-i18next';

type Props = {
  event: EventType;
  isAdmin: boolean;
  isParticipant: boolean;
  onParticipate?: (event: EventType) => void;
  onEdit: (event: EventType) => void;
  onShowParticipants: (event: EventType) => void;
};

export const EventCard = ({
  event,
  onEdit,
  onShowParticipants,
  isAdmin,
  isParticipant,
  onParticipate,
}: Props) => {
  const imageSrc = event.image
    ? `${AppEnvironmentService.apiUrl}/${event.image}`
    : PlaceholderImage;

  const now = new Date();
  const eventEndDate = new Date(event.endDate);
  const eventStartDate = new Date(event.startDate);
  const isEventPast = eventEndDate < now;
  const isEventOngoing = eventStartDate <= now && eventEndDate >= now;

  const { t } = useTranslation('translations');

  const handleEdit = () => {
    onEdit(event);
  };

  const handleShowParticipants = () => {
    onShowParticipants(event);
  };

  const handleParticipate = () => {
    if (onParticipate) {
      onParticipate(event);
    }
  };

  const renderParticipationButton = () => {
    if (isAdmin) {
      return null;
    }

    if (isEventPast) {
      if (isParticipant) {
        return (
          <Button size="sm" variant="outline" disabled className="mt-2">
            <Check className="w-4 h-4 mr-2" />
            {t('event.alreadyParticipated')}
          </Button>
        );
      }
      return (
        <Button
          size="sm"
          variant="outline"
          disabled
          className="mt-2 opacity-50"
        >
          <Clock className="w-4 h-4 mr-2" />
          {t('event.eventEnded')}
        </Button>
      );
    }

    if (isEventOngoing) {
      if (isParticipant) {
        return (
          <Button size="sm" variant="outline" disabled className="mt-2">
            <Check className="w-4 h-4 mr-2" />
            {t('event.participating')}
          </Button>
        );
      }
      return (
        <Button size="sm" variant="outline" disabled className="mt-2">
          <Clock className="w-4 h-4 mr-2" />
          {t('event.ongoing')}
        </Button>
      );
    }

    if (isParticipant) {
      return (
        <div className="flex gap-10">
          <Button size="sm" variant="outline" disabled className="mt-2">
            <Check className="w-4 h-4 mr-2" />
            {t('event.alreadyParticipating')}
          </Button>
          <Button size="sm" variant="outline" disabled className="mt-2">
            <Check className="w-4 h-4 mr-2" />
            {t('event.signOut')}
          </Button>
        </div>
      );
    }

    return (
      <Button size="sm" onClick={handleParticipate} className="mt-2">
        {t('event.participate')}
      </Button>
    );
  };

  const getEventStatusBadge = () => {
    if (isEventPast) {
      return (
        <Badge variant="secondary" className="bg-gray-100 text-gray-600">
          <Clock size={14} className="mr-1" />
          {t('event.status.finished')}
        </Badge>
      );
    }

    if (isEventOngoing) {
      return (
        <Badge variant="destructive" className="bg-green-100 text-green-700">
          <Clock size={14} className="mr-1" />
          {t('event.status.ongoing')}
        </Badge>
      );
    }

    return null;
  };

  return (
    <Card
      className={`w-full max-w-2xl relative overflow-hidden ${isEventPast ? 'opacity-75' : ''}`}
    >
      <img
        src={imageSrc}
        alt={event.title}
        className={`w-full h-48 object-contain ${isEventPast ? 'grayscale' : ''}`}
      />
      <div className="absolute top-2 right-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="rounded-full">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleShowParticipants}>
              {t('event.showParticipants')}
            </DropdownMenuItem>
            {isAdmin && (
              <DropdownMenuItem onClick={handleEdit}>{t('common.edit')}</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-between gap-2">
          <span className={isEventPast ? 'text-gray-500' : ''}>
            {event.title}
          </span>
          <div className="flex gap-2">
            {getEventStatusBadge()}
            <Badge variant={event.isPublic ? 'default' : 'destructive'}>
              {event.isPublic ? (
                <div className="flex items-center gap-1">
                  <Unlock size={14} /> {t('common.public')}
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Lock size={14} /> {t('common.private')}
                </div>
              )}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent
        className={`text-sm space-y-2 ${isEventPast ? 'text-gray-400' : 'text-muted-foreground'}`}
      >
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>
            {format(new Date(event.startDate), 'dd MMM yyyy, HH:mm')} —{' '}
            {format(new Date(event.endDate), 'dd MMM yyyy, HH:mm')}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={16} />
          <span>{event.location ?? '--'}</span>
        </div>

        <div className="flex items-center gap-2">
          <User size={16} />
          <span>
            {event.registeredCount}
            {event.maxParticipants
              ? ` / ${event.maxParticipants} ${t('common.participants')}`
              : t('common.registered')}
          </span>
        </div>

        <div>
          <strong>{t('common.price')}</strong> {event.price ? `$${event.price}` : '--'}
        </div>

        {renderParticipationButton()}
      </CardContent>
    </Card>
  );
};
