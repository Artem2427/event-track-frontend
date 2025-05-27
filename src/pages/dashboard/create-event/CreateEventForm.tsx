import { useEffect, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from '@shared/shadcn-ui';
import { DialogClose, DialogFooter } from '@shared/shadcn-ui/dialog';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { type CreateEventSchema, getEventSchema } from './schema';

type Props = {
  initialValues?: Partial<CreateEventSchema>;
  onSubmit: (values: CreateEventSchema, file: File | null) => void;
  isSubmitting?: boolean;
};

export const EventForm = ({ initialValues, onSubmit, isSubmitting }: Props) => {
  const { t } = useTranslation('translations');
  const schema = useMemo(() => getEventSchema(t), [t]);

  const form = useForm<CreateEventSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initialValues?.title || '',
      description: initialValues?.description || '',
      location: initialValues?.location || '',
      startDate: initialValues?.startDate || '',
      endDate: initialValues?.endDate || '',
      isPublic: initialValues?.isPublic || false,
      isOffline: initialValues?.isOffline || false,
      maxParticipants: initialValues?.maxParticipants || undefined,
      minParticipants: initialValues?.minParticipants || undefined,
      price: initialValues?.price || undefined,
      image: initialValues?.image || undefined,
    },
  });

  const handleSubmit = (values: CreateEventSchema) => {
    const file = values.image instanceof File ? values.image : null;
    onSubmit(values, file);
  };

  const isPublic = form.watch('isPublic');

  useEffect(() => {
    if (isPublic) {
      form.setValue('price', undefined);
    }
  }, [isPublic, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} maxLength={255} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} maxLength={255} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input {...field} type="datetime-local" required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input {...field} type="datetime-local" required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="minParticipants"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Min Participants</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxParticipants"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Participants</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center space-x-2">
          <FormField
            control={form.control}
            name="isPublic"
            render={({ field }) => (
              <FormItem className="!flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) =>
                      field.onChange(Boolean(checked))
                    }
                  />
                </FormControl>
                <FormLabel>Public Event</FormLabel>
              </FormItem>
            )}
          />
        </div>

        {!isPublic && (
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input {...field} type="number" min={0} step="0.01" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex items-center space-x-2">
          <FormField
            control={form.control}
            name="isOffline"
            render={({ field }) => (
              <FormItem className="!flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) =>
                      field.onChange(Boolean(checked))
                    }
                  />
                </FormControl>
                <FormLabel>Offline Event</FormLabel>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Image</FormLabel>
              <FormControl>
                <Input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter className="pt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isSubmitting}>
            {initialValues ? 'Update' : 'Create'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
