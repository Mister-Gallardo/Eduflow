import { Outlet, useNavigation } from 'react-router-dom'

import { GlobalLoader } from '@/shared/ui/feedback/global-loader'

export const RootLayout = () => {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  return (
    <>
      {isLoading && <GlobalLoader />}
      <Outlet />
    </>
  )
}
