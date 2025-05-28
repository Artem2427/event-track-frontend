import type { EventType } from '@entities/event/model';
import { useHasRole } from '@entities/user-profile/hooks/useHasRole';
import { UserRolesEnumValue } from '@entities/user-profile/model';
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
  Lock,
  MapPin,
  MoreVertical,
  Unlock,
  User,
} from 'lucide-react';
import PlaceholderImage from '/assets/placeholder-image-event.png';

type Props = {
  event: EventType;
  onEdit: (event: EventType) => void;
  onShowParticipants: (event: EventType) => void;
};

export const EventCard = ({ event, onEdit, onShowParticipants }: Props) => {
  const imageSrc = event.image
    ? `${AppEnvironmentService.apiUrl}/${event.image}`
    : PlaceholderImage;

  const isAdmin = useHasRole(UserRolesEnumValue.Admin);

  const handleEdit = () => {
    onEdit(event);
  };

  const handleShowParticipants = () => {
    onShowParticipants(event);
  };

  return (
    <Card className="w-full max-w-2xl relative overflow-hidden">
      <img
        src={imageSrc}
        alt={event.title}
        className="w-full h-48 object-contain"
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
          {event.title}
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
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-2 text-muted-foreground">
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

        <Button size="sm" className="mt-2">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};
