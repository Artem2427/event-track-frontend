import { type BaseSyntheticEvent, useEffect, useMemo } from 'react';
import { authHooks } from '@entities/auth/hooks';
import { USER_QUERY_KEYS } from '@entities/user/model';
import { zodResolver } from '@hookform/resolvers/zod';
import { storageService } from '@shared/services/storage.service';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@shared/shadcn-ui';
import { ACCESS_TOKEN_KEY } from '@shared/utils/constants';
import { ROUTE_PATHS } from '@shared/utils/routes';
import { useQueryClient } from '@tanstack/react-query';
import { LoaderIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { type SignUpFormSchema, getSignUpSchema } from './schema';

export const SignUpForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { t } = useTranslation('translations');

  const schema = useMemo(() => getSignUpSchema(t), [t]);

  const signUpForm = useForm<SignUpFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'participant',
    },
  });

  const signUp = authHooks.useSignUpMutation();

  const onSubmit = (values: SignUpFormSchema) => {
    signUp.mutate(values, {
      onSuccess: async (response) => {
        toast.success(t('signUpSuccess'));
        storageService.set(ACCESS_TOKEN_KEY, response.accessToken);
        await queryClient.invalidateQueries({
          queryKey: [USER_QUERY_KEYS.GET_ME_PROFILE],
        });
        navigate('/');
      },
      onError: (error) => {
        toast.error(
          t(`errors.${error.response?.data.message}`, {
            defaultValue: t('signUpError'),
          }),
          {
            duration: 5000,
            richColors: true,
          },
        );
      },
    });

    return (event: BaseSyntheticEvent) => {
      event.preventDefault();
    };
  };

  useEffect(() => {
    const touchedFields = Object.keys(signUpForm.formState.touchedFields);
    if (touchedFields.length > 0) {
      signUpForm.trigger();
    }
  }, [schema, signUpForm]);

  return (
    <div className="w-full max-w-md mx-auto bg-background border border-border rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-semibold text-center mb-6">
        {t('signUpTitle')}
      </h2>
      <Form {...signUpForm}>
        <form
          onSubmit={signUpForm.handleSubmit(onSubmit)}
          className="flex gap-y-5 flex-col"
        >
          <FormField
            control={signUpForm.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('signUpFirstName')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t('signUpFirstNamePlaceholder')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={signUpForm.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('signUpLastName')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t('signUpLastNamePlaceholder')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={signUpForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="m@example.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={signUpForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    autoComplete="new-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full mt-[8px]"
            size="lg"
            disabled={signUp.isPending}
          >
            {signUp.isPending ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              t('signUpButton')
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-sm text-center text-muted-foreground">
        {t('alreadyHaveAccount')}{' '}
        <Link to={ROUTE_PATHS.LOGIN} className="text-primary hover:underline">
          {t('logInLink')}
        </Link>
      </div>
    </div>
  );
};
