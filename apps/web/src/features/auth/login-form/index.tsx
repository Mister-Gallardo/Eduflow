import { type LoginInput, zLoginInput } from '@eduflow/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(zLoginInput),
    mode: 'onTouched',
  })

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true)
    console.info('Login data:', data)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
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
        {...register('email')}
        label="Email"
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
        onBlur={(e) => {
          void register('email').onBlur(e)
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

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Typography
          variant="caption"
          component="a"
          href="#"
          sx={{
            color: 'text.secondary',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: '0.2s',
            ':hover': {
              textDecoration: 'underline',
              color: 'text.primary',
              transition: '0.2s',
            },
          }}
        >
          Забыли пароль?
        </Typography>
      </Box>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isLoading}
        sx={{
          py: 1.5,
          mt: 1,
          borderRadius: 2,
          backgroundColor: 'primary.main',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        }}
      >
        {isLoading ? 'Вход...' : 'Войти'}
      </Button>
    </Box>
  )
}
