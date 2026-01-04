import { pick } from '@eduflow/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { trpc } from '../../../shared/api'
import { type RegisterFormSchema, registerFormSchema } from '../../../shared/lib'
import { useSnackbar } from '../../../shared/ui'

export const RegisterForm = () => {
  const navigate = useNavigate()
  const showSnackbar = useSnackbar()

  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: () => {
      void navigate('/')
    },
    onError: (error) => {
      const isPublic = error.data?.isPublic
      const status = error.data?.httpStatus
      const code = error.data?.code

      if (
        isPublic &&
        (status === 409 || code === 'CONFLICT' || error.message === 'Email already in use')
      ) {
        setError('email', {
          type: 'server',
          message: 'Этот Email уже зарегистрирован',
        })
      } else {
        void showSnackbar({
          message: 'Что-то пошло не так. Попробуйте еще раз.',
          severity: 'error',
        })
      }
    },
  })

  const {
    register,
    handleSubmit,
    trigger,
    setError,
    formState: { errors },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    mode: 'onTouched',
  })

  const onSubmit = (data: RegisterFormSchema) => {
    void registerMutation.mutateAsync(pick(data, ['fullName', 'email', 'password']))
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
      }}
    >
      <TextField
        {...register('fullName')}
        label="Имя и фамилия"
        fullWidth
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
        onBlur={(e) => {
          void register('fullName').onBlur(e)
        }}
        sx={{
          mt: 1,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            backgroundColor: '#fff',
          },
        }}
      />

      <TextField
        {...register('email')}
        label="Email"
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
        onBlur={(e) => {
          void register('email').onBlur(e)
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            backgroundColor: '#fff',
          },
        }}
      />

      <TextField
        {...register('password')}
        type="password"
        label="Пароль"
        fullWidth
        error={!!errors.password}
        helperText={errors.password?.message}
        onBlur={(e) => {
          void register('password').onBlur(e)
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            backgroundColor: '#fff',
          },
        }}
      />

      <TextField
        {...register('confirmPassword')}
        type="password"
        label="Подтверждение пароля"
        fullWidth
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        onBlur={(e) => {
          void register('confirmPassword').onBlur(e)
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            backgroundColor: '#fff',
          },
        }}
      />

      <FormControlLabel
        control={
          <Checkbox
            {...register('terms')}
            onChange={async (e) => {
              await register('terms').onChange(e)
              await trigger('terms')
            }}
            disableRipple
            sx={{
              color: errors.terms ? 'error.main' : 'default',
              alignSelf: 'flex-start',
              transition: '0.2s',
              '&:hover': {
                backgroundColor: 'transparent',
                color: 'primary.main',
                transition: '0.2s',
              },
              '&.Mui-checked': {
                color: 'primary.main',
              },
            }}
          />
        }
        label={
          <Typography variant="caption" sx={{ color: 'text.secondary', userSelect: 'none' }}>
            Я разрешаю обрабатывать мои персональные данные
          </Typography>
        }
        sx={{ alignItems: 'center', ml: -1.5 }}
      />
      {errors.terms && (
        <Typography variant="caption" color="error" mt={-1}>
          {errors.terms.message}
        </Typography>
      )}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={registerMutation.isPending}
        sx={{
          py: 1.5,
          mt: 1,
          borderRadius: 2,
          textTransform: 'none',
          backgroundColor: 'primary.main',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        }}
      >
        {registerMutation.isPending ? 'Регистрация...' : 'Зарегистрироваться'}
      </Button>
    </Box>
  )
}
