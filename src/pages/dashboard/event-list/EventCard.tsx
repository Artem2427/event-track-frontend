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

  // Перевіряємо чи подія вже завершилась
  const now = new Date();
  const eventEndDate = new Date(event.endDate);
  const eventStartDate = new Date(event.startDate);
  const isEventPast = eventEndDate < now;
  const isEventOngoing = eventStartDate <= now && eventEndDate >= now;

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

    // Якщо подія вже завершилась
    if (isEventPast) {
      if (isParticipant) {
        return (
          <Button size="sm" variant="outline" disabled className="mt-2">
            <Check className="w-4 h-4 mr-2" />
            Ви брали участь
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
          Подія завершена
        </Button>
      );
    }

    // Якщо подія триває зараз
    if (isEventOngoing) {
      if (isParticipant) {
        return (
          <Button size="sm" variant="outline" disabled className="mt-2">
            <Check className="w-4 h-4 mr-2" />
            Ви берете участь
          </Button>
        );
      }
      return (
        <Button size="sm" variant="outline" disabled className="mt-2">
          <Clock className="w-4 h-4 mr-2" />
          Подія триває
        </Button>
      );
    }

    // Майбутня подія
    if (isParticipant) {
      return (
        <Button size="sm" variant="outline" disabled className="mt-2">
          <Check className="w-4 h-4 mr-2" />
          Ви вже берете участь
        </Button>
      );
    }

    return (
      <Button size="sm" onClick={handleParticipate} className="mt-2">
        Взяти участь
      </Button>
    );
  };

  const getEventStatusBadge = () => {
    if (isEventPast) {
      return (
        <Badge variant="secondary" className="bg-gray-100 text-gray-600">
          <Clock size={14} className="mr-1" />
          Завершено
        </Badge>
      );
    }

    if (isEventOngoing) {
      return (
        <Badge variant="destructive" className="bg-green-100 text-green-700">
          <Clock size={14} className="mr-1" />
          Триває
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
              Show Participants
            </DropdownMenuItem>
            {isAdmin && (
              <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
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
                  <Unlock size={14} /> Public
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Lock size={14} /> Private
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
              ? ` / ${event.maxParticipants} participants`
              : ' registered'}
          </span>
        </div>

        <div>
          <strong>Price:</strong> {event.price ? `$${event.price}` : '--'}
        </div>

        {renderParticipationButton()}
      </CardContent>
    </Card>
  );
};
