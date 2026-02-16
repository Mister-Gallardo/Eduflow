import { type LoginInput, zLoginInput } from '@eduflow/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Box, Button, Collapse, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { trpc } from '@/shared/api'
import { paths } from '@/shared/config'
import { useSnackbar } from '@/shared/ui'

import { alertStyles } from './LoginForm.styles'

export const LoginForm = () => {
  const navigate = useNavigate()
  const showSnackbar = useSnackbar()

  const [authError, setAuthError] = useState<string | null>(null)

  const {
    register,
    setError,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(zLoginInput),
    mode: 'onTouched',
  })

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: () => {
      void navigate(paths.home())
    },
    onError: (error) => {
      const isPublic = error.data?.isPublic

      if (isPublic) {
        setAuthError('Неправильный email или пароль.')
        setError('email', { type: 'manual' })
        setError('password', { type: 'manual' })
      } else {
        void showSnackbar({
          message: 'Что-то пошло не так. Попробуйте еще раз.',
          severity: 'error',
        })
      }
    },
  })

  const onSubmit = (data: LoginInput) => {
    void loginMutation.mutateAsync(data)
  }

  const handleFieldChange = () => {
    if (authError) setAuthError(null)
    clearErrors(['email', 'password'])
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
    >
      <TextField
        {...register('email', { onChange: handleFieldChange })}
        label="Email"
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
        sx={{
          mt: 1,
          '& .MuiOutlinedInput-root': { borderRadius: 2 },
        }}
      />

      <TextField
        {...register('password', { onChange: handleFieldChange })}
        type="password"
        label="Пароль"
        fullWidth
        error={!!errors.password}
        helperText={errors.password?.message}
        sx={{
          '& .MuiOutlinedInput-root': { borderRadius: 2 },
        }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Typography
          variant="caption"
          component="a"
          // href='#'
          onClick={() =>
            showSnackbar({ severity: 'warning', message: 'Данная функция в разработке...' })
          }
          sx={{
            color: 'text.secondary',
            textDecoration: 'none',
            cursor: 'pointer',
            ':hover': { textDecoration: 'underline' },
          }}
        >
          Забыли пароль?
        </Typography>
      </Box>

      <Collapse in={!!authError}>
        <Alert severity="error" icon={false} variant="standard" sx={alertStyles}>
          {authError}
        </Alert>
      </Collapse>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loginMutation.isPending}
        sx={{
          mt: 1,
          py: 1.5,
          textTransform: 'none',
        }}
      >
        {loginMutation.isPending ? 'Вход...' : 'Войти'}
      </Button>
    </Box>
  )
}
