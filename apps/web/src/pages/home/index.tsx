import { Box } from '@mui/material'

import { trpc } from '../../shared/api'

export const HomePage = () => {
  const { data, isError, isLoading } = trpc.example.useQuery()

  if (isError || !data) {
    return <div>Error occurred</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Box
      sx={{ backgroundColor: { xs: 'red', sm: 'green', md: 'blue', lg: 'yellow', xl: 'purple' } }}
    >
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </Box>
  )
}
