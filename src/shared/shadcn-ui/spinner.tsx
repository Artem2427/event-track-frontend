import { Loader as LoaderIcon } from 'lucide-react';

const sizeMap = {
  small: { spinner: 'size-4', text: 'text-xs' },
  medium: { spinner: 'size-6', text: 'text-sm' },
  large: { spinner: 'size-10', text: 'text-base' },
};

type SpinnerProps = {
  size: 'small' | 'medium' | 'large';
};

export const Spinner = ({ size }: SpinnerProps) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <LoaderIcon className={`animate-spin ${sizeMap[size].spinner}`} />
      <span className={`text-muted-foreground ${sizeMap[size].text}`}>
        Loading...
      </span>
    </div>
  );
};
