// import { logger } from '@eduflow/logger'
import { db, Level } from '../src/index.js'

// async function main() {
//   console.log('🌱 Start seeding...')

//   // Используем upsert, чтобы сид можно было запускать многократно (идемпотентность)
//   const admin = await db.example.upsert({
//     where: {
//       name: 'admin@eduflow.local',
//     },
//     update: {},
//     create: {
//       name: 'admin@eduflow.local',
//     },
//   })

//   console.log('Admin upserted: ', admin.name)

//   // Пример создания связанных данных
//   //   const exampleProject = await db.project.upsert({
//   //     where: { slug: 'welcome-project' },
//   //     update: {},
//   //     create: {
//   //       title: 'Welcome Project',
//   //       slug: 'welcome-project',
//   //       authorId: admin.id,
//   //     },
//   //   })

//   //   console.log(`✅ Created project: ${exampleProject.title}`)
//   console.log('✅ Success!')
// }

// main()
//   .catch((e) => {
//     console.error('❌ Seeding error:', e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await db.$disconnect()
//   })

async function main() {
  console.log('🌱 Start seeding courses...')

  // Очистка перед заполнением
  await db.course.deleteMany()

  const courses = [
    {
      title: 'Pentest: Взлом веб-приложений',
      description: 'OWASP Top 10 и практика атак.',
      price: 9800,
      duration: '20 часов',
      level: Level.INTERMEDIATE,
      category: 'cybersecurity',
    },
    {
      title: 'UX/UI Дизайн: Проектирование',
      description: 'От анализа пользователей до прототипов.',
      price: 7500,
      duration: '15 часов',
      level: Level.BEGINNER,
      category: 'design',
    },
    {
      title: 'React для начинающих',
      description: 'Компоненты и хуки.',
      price: 0,
      duration: '8 часов',
      level: Level.BEGINNER,
      category: 'development',
    },
    {
      title: 'SQL для анализа данных',
      description: 'Оконные функции.',
      price: 5400,
      duration: '14 часов',
      level: Level.INTERMEDIATE,
      category: 'analytics',
    },
    {
      title: 'Influencer Marketing',
      description: 'Работа с блогерами.',
      price: 0,
      duration: '5 часов',
      level: Level.BEGINNER,
      category: 'marketing',
    },

    {
      title: 'Защита облаков AWS',
      description: 'Безопасность и доступы.',
      price: 12500,
      duration: '20 часов',
      level: Level.ADVANCED,
      category: 'cybersecurity',
    },
    {
      title: '3D-моделирование в Blender',
      description: 'Создание сцен.',
      price: 9200,
      duration: '30 часов',
      level: Level.INTERMEDIATE,
      category: 'design',
    },
    {
      title: 'Data Science: Старт',
      description: 'Pandas и NumPy.',
      price: 0,
      duration: '10 часов',
      level: Level.BEGINNER,
      category: 'analytics',
    },
    {
      title: 'TypeScript: Типизация',
      description: 'Generics и infer.',
      price: 3200,
      duration: '10 часов',
      level: Level.INTERMEDIATE,
      category: 'development',
    },
    {
      title: 'E-mail маркетинг',
      description: 'Автоматизация писем.',
      price: 2900,
      duration: '10 часов',
      level: Level.BEGINNER,
      category: 'marketing',
    },

    {
      title: 'SOC аналитик',
      description: 'Мониторинг атак.',
      price: 10800,
      duration: '18 часов',
      level: Level.INTERMEDIATE,
      category: 'cybersecurity',
    },
    {
      title: 'Типографика для продвинутых',
      description: 'Шрифтовые пары.',
      price: 3800,
      duration: '10 часов',
      level: Level.ADVANCED,
      category: 'design',
    },
    {
      title: 'BI аналитика',
      description: 'Дашборды.',
      price: 8200,
      duration: '18 часов',
      level: Level.INTERMEDIATE,
      category: 'analytics',
    },
    {
      title: 'Go для высоких нагрузок',
      description: 'Горутины.',
      price: 13000,
      duration: '35 часов',
      level: Level.ADVANCED,
      category: 'development',
    },
    {
      title: 'SEO-специалист',
      description: 'Продвижение сайтов.',
      price: 7800,
      duration: '20 часов',
      level: Level.INTERMEDIATE,
      category: 'marketing',
    },

    {
      title: 'Ethical Hacking',
      description: 'Эксплойты.',
      price: 14500,
      duration: '28 часов',
      level: Level.ADVANCED,
      category: 'cybersecurity',
    },
    {
      title: 'Айдентика и брендинг',
      description: 'Логотипы.',
      price: 8300,
      duration: '20 часов',
      level: Level.INTERMEDIATE,
      category: 'design',
    },
    {
      title: 'Продуктовая аналитика',
      description: 'Метрики.',
      price: 11000,
      duration: '25 часов',
      level: Level.INTERMEDIATE,
      category: 'analytics',
    },
    {
      title: 'Next.js 14',
      description: 'SSR и App Router.',
      price: 0,
      duration: '15 часов',
      level: Level.ADVANCED,
      category: 'development',
    },
    {
      title: 'Performance маркетинг',
      description: 'ROI.',
      price: 14200,
      duration: '30 часов',
      level: Level.ADVANCED,
      category: 'marketing',
    },

    {
      title: 'Безопасность API и JWT',
      description: 'Атаки токенов.',
      price: 6200,
      duration: '12 часов',
      level: Level.INTERMEDIATE,
      category: 'cybersecurity',
    },
    {
      title: 'Дизайн-системы в Figma',
      description: 'Компоненты.',
      price: 12000,
      duration: '22 часа',
      level: Level.ADVANCED,
      category: 'design',
    },
    {
      title: 'A/B тестирование',
      description: 'Эксперименты.',
      price: 9500,
      duration: '15 часов',
      level: Level.ADVANCED,
      category: 'analytics',
    },
    {
      title: 'PostgreSQL тюнинг',
      description: 'Индексы.',
      price: 7200,
      duration: '24 часа',
      level: Level.INTERMEDIATE,
      category: 'development',
    },
    {
      title: 'Копирайтинг',
      description: 'Контент для продаж.',
      price: 3500,
      duration: '12 часов',
      level: Level.INTERMEDIATE,
      category: 'marketing',
    },

    {
      title: 'Криптография для разработчиков',
      description: 'Хэши и шифрование.',
      price: 8600,
      duration: '16 часов',
      level: Level.INTERMEDIATE,
      category: 'cybersecurity',
    },
    {
      title: 'Веб-дизайн и адаптивность',
      description: 'Responsive сетки.',
      price: 6100,
      duration: '18 часов',
      level: Level.INTERMEDIATE,
      category: 'design',
    },
    {
      title: 'Big Data в облаках',
      description: 'Массивы данных.',
      price: 15500,
      duration: '30 часов',
      level: Level.ADVANCED,
      category: 'analytics',
    },
    {
      title: 'Docker и Kubernetes',
      description: 'Контейнеры.',
      price: 4900,
      duration: '12 часов',
      level: Level.INTERMEDIATE,
      category: 'development',
    },
    {
      title: 'SMM стратегия',
      description: 'Продвижение брендов.',
      price: 5600,
      duration: '18 часов',
      level: Level.INTERMEDIATE,
      category: 'marketing',
    },

    {
      title: 'Forensics и расследования',
      description: 'Цифровые следы.',
      price: 10200,
      duration: '20 часов',
      level: Level.ADVANCED,
      category: 'cybersecurity',
    },
    {
      title: 'Иллюстрация в Procreate',
      description: 'Рисование на iPad.',
      price: 4500,
      duration: '12 часов',
      level: Level.BEGINNER,
      category: 'design',
    },
    {
      title: 'Математика для Data Science',
      description: 'Статистика.',
      price: 6700,
      duration: '22 часа',
      level: Level.ADVANCED,
      category: 'analytics',
    },
    {
      title: 'Swift iOS разработка',
      description: 'SwiftUI.',
      price: 9900,
      duration: '30 часов',
      level: Level.BEGINNER,
      category: 'development',
    },
    {
      title: 'Интернет-маркетолог',
      description: 'SEO и реклама.',
      price: 15000,
      duration: '4 месяца',
      level: Level.BEGINNER,
      category: 'marketing',
    },

    {
      title: 'Zero Trust архитектура',
      description: 'Современная безопасность.',
      price: 13200,
      duration: '18 часов',
      level: Level.ADVANCED,
      category: 'cybersecurity',
    },
    {
      title: 'Графический дизайн база',
      description: 'Визуальные принципы.',
      price: 0,
      duration: '4 часа',
      level: Level.BEGINNER,
      category: 'design',
    },
    {
      title: 'Python для отчетов',
      description: 'Автоматизация данных.',
      price: 0,
      duration: '8 часов',
      level: Level.BEGINNER,
      category: 'analytics',
    },
    {
      title: 'Алгоритмы и структуры данных',
      description: 'База для интервью.',
      price: 5500,
      duration: '40 часов',
      level: Level.BEGINNER,
      category: 'development',
    },
    {
      title: 'ORM и репутация бренда',
      description: 'Работа с отзывами.',
      price: 8800,
      duration: '14 часов',
      level: Level.ADVANCED,
      category: 'marketing',
    },

    {
      title: 'Cloud Security Monitoring',
      description: 'Логи и алерты.',
      price: 9900,
      duration: '16 часов',
      level: Level.INTERMEDIATE,
      category: 'cybersecurity',
    },
    {
      title: 'Figma для верстальщика',
      description: 'Экспорт ассетов.',
      price: 0,
      duration: '3 часа',
      level: Level.BEGINNER,
      category: 'design',
    },
    {
      title: 'Веб-аналитика профи',
      description: 'GA4.',
      price: 4200,
      duration: '5 часов',
      level: Level.INTERMEDIATE,
      category: 'analytics',
    },
    {
      title: 'Fullstack Python + React',
      description: 'Веб-сервисы.',
      price: 18900,
      duration: '6 месяцев',
      level: Level.INTERMEDIATE,
      category: 'development',
    },
    {
      title: 'Targeted Ads',
      description: 'Таргетированная реклама.',
      price: 0,
      duration: '6 часов',
      level: Level.BEGINNER,
      category: 'marketing',
    },

    {
      title: 'Red Team практикум',
      description: 'Имитация атак.',
      price: 15800,
      duration: '26 часов',
      level: Level.ADVANCED,
      category: 'cybersecurity',
    },
    {
      title: 'Motion Design',
      description: 'Анимация интерфейсов.',
      price: 11000,
      duration: '25 часов',
      level: Level.ADVANCED,
      category: 'design',
    },
    {
      title: 'Машинное обучение основы',
      description: 'Модели и обучение.',
      price: 8900,
      duration: '20 часов',
      level: Level.INTERMEDIATE,
      category: 'analytics',
    },
    {
      title: 'Backend на Node.js',
      description: 'Микросервисы.',
      price: 12500,
      duration: '45 часов',
      level: Level.ADVANCED,
      category: 'development',
    },
    {
      title: 'Контент-стратегия бренда',
      description: 'Планирование контента.',
      price: 6400,
      duration: '16 часов',
      level: Level.INTERMEDIATE,
      category: 'marketing',
    },
  ]

  const created = await db.course.createMany({
    data: courses,
  })

  console.log(`✅ Success! Created ${created.count} courses.`)
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
