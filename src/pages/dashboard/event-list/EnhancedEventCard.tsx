import React from 'react';
import type { EventType } from '@entities/event/model';
import { useHasRole } from '@entities/user/hooks/useHasRole';
import { UserRolesEnumValue } from '@entities/user/model';
import { useUserProfileStore } from '@entities/user/store';
import { EventCard } from './EventCard';

export type EventCardWithActionsProps = {
  event: EventType;
  onEdit: (event: EventType) => void;
  onShowParticipants: (event: EventType) => void;
  isAdmin: boolean;
  isParticipant: boolean;
  onParticipate?: (event: EventType) => void;
};

export function withEventActions<P extends EventCardWithActionsProps>(
  WrappedComponent: React.ComponentType<P>,
) {
  return function EventCardWithActions(
    props: Omit<P, 'isAdmin' | 'isParticipant' | 'onParticipate'> & {
      onParticipate?: (event: EventType) => void;
    },
  ) {
    const { event, onParticipate, ...restProps } = props;

    const isAdmin = useHasRole(UserRolesEnumValue.Admin);

    const { registrationEventIds } = useUserProfileStore();

    console.log(registrationEventIds, 'registrationEventIds');

    const isParticipant = registrationEventIds.includes(event.id);

    return (
      <WrappedComponent
        {...(restProps as P)}
        event={event}
        isAdmin={isAdmin}
        isParticipant={isParticipant}
        onParticipate={onParticipate}
      />
    );
  };
}

export const EnhancedEventCard = withEventActions(EventCard);
