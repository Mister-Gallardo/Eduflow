import express from 'express'

const x: number = '5'

const app = express()
const PORT = 3000

app.get('/', (_, res) => {
  res.status(200).json({ message: 'API Server is running successfully!' })
})

app.listen(PORT, () => {
  console.info(`API Server is running on http://localhost:${PORT}`, x)
})
