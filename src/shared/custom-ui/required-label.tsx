import { type ComponentProps } from 'react';
import { Label } from '@shared/shadcn-ui';

type Props = ComponentProps<typeof Label> & {
  required?: boolean;
};

export const RequiredLabel = ({
  children,
  required = false,
  ...props
}: Props) => (
  <Label {...props}>
    {children}
    {required && <span className="text-destructive ml-0.5">*</span>}
  </Label>
);
