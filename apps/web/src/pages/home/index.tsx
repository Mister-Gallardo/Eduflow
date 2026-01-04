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
    <div>
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )
}
