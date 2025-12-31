import { trpc } from '../shared/api/trpc'

function App() {
  const { data } = trpc.example.useQuery()

  if (!data) return

  return <p>{data[0].name}</p>
}

export default App
