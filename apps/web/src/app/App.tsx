import { trpc } from '../shared/api/trpc'

function App() {
  const { data } = trpc.example.useQuery()

  if (!data) return

  return <p>{data[0].desc}</p>
}

export default App
