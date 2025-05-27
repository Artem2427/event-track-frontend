import { type BaseSyntheticEvent, useEffect, useMemo } from 'react';
import { authHooks } from '@entities/auth/hooks';
import { USER_PROFILE_QUERY_KEYS } from '@entities/user-profile/model';
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
import { type LogInFormSchema, getLogInSchema } from './schema';

export const LoginForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { t } = useTranslation('translations');

  const schema = useMemo(() => getLogInSchema(t), [t]);

  const logInForm = useForm<LogInFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signIn = authHooks.useSignInMutation();

  const onSubmit = (values: LogInFormSchema) => {
    signIn.mutate(values, {
      onSuccess: async (response) => {
        toast(t('loginSuccess'));
        storageService.remove(ACCESS_TOKEN_KEY);
        storageService.set(ACCESS_TOKEN_KEY, response.accessToken);
        await queryClient.invalidateQueries({
          queryKey: [USER_PROFILE_QUERY_KEYS.GET_ME_PROFILE],
        });
        navigate('/');
      },
      onError: (error) => {
        toast.error(
          t(`errors.${error.response?.data.message}`, {
            defaultValue: t('loginError'),
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
    const touchedFields = Object.keys(logInForm.formState.touchedFields);
    if (touchedFields.length > 0) {
      logInForm.trigger();
    }
  }, [schema, logInForm]);

  return (
    <div className="w-full max-w-md mx-auto bg-background border border-border rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-semibold text-center mb-6">
        {t('loginTitle')}
      </h2>
      <Form {...logInForm}>
        <form
          onSubmit={logInForm.handleSubmit(onSubmit)}
          className="flex gap-y-5 flex-col"
        >
          <FormField
            control={logInForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t('loginPlaceholderEmail')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={logInForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" autoComplete="off" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full mt-[8px]"
            size="lg"
            disabled={signIn.isPending}
          >
            {signIn.isPending ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              t('loginButton')
            )}
          </Button>
        </form>
      </Form>
      <div className="mt-6 text-sm text-center text-muted-foreground">
        {t('noAccount')}{' '}
        <Link to={ROUTE_PATHS.SIGN_UP} className="text-primary hover:underline">
          {t('createAccount')}
        </Link>
      </div>
    </div>
  );
};
