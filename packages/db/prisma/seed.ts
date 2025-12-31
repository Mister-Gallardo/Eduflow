import { logger } from '@eduflow/logger'
import { db } from '../src/index.js'

async function main() {
  console.log('🌱 Start seeding...')

  // Используем upsert, чтобы сид можно было запускать многократно (идемпотентность)
  const admin = await db.example.upsert({
    where: {
      name: 'admin@eduflow.local',
    },
    update: {},
    create: {
      name: 'admin@eduflow.local',
    },
  })

  console.log('Admin upserted: ', admin.name)

  // Пример создания связанных данных
  //   const exampleProject = await db.project.upsert({
  //     where: { slug: 'welcome-project' },
  //     update: {},
  //     create: {
  //       title: 'Welcome Project',
  //       slug: 'welcome-project',
  //       authorId: admin.id,
  //     },
  //   })

  //   console.log(`✅ Created project: ${exampleProject.title}`)
  console.log('✅ Success!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
