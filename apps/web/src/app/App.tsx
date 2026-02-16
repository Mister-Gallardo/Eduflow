import { Providers } from './providers'
import { AppRouter } from './routes'

const App = () => {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  )
}

export default App
