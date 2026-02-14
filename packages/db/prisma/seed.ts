import { db, Level, StepType } from '../src/index.js'

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
  console.log('🌱 Start seeding courses with rich content...')

  // Очистка перед заполнением
  await db.userProgress.deleteMany()
  await db.enrollment.deleteMany()
  await db.step.deleteMany()
  await db.lesson.deleteMany()
  await db.module.deleteMany()
  await db.course.deleteMany()

  const coursesData: any[] = [
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
      modules: {
        create: [
          {
            title: 'Модуль 1: Основы UX и Дизайн-мышление',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'Урок 1.1: Что такое UX на самом деле?',
                  order: 1,
                  steps: {
                    create: [
                      {
                        title: 'Определение UX',
                        type: StepType.TEXT,
                        order: 1,
                        content: {
                          body: 'User Experience (UX) — это то, как человек взаимодействует с продуктом. Это его чувства, эмоции и практический опыт.',
                        },
                      },
                      {
                        title: 'Процесс проектирования',
                        type: StepType.VIDEO,
                        order: 2,
                        content: {
                          url: 'https://www.youtube.com/watch?v=TtInP9mP-50',
                          provider: 'youtube',
                          description: 'Посмотрите это короткое видео о дизайн-процессе.',
                        },
                      },
                      {
                        title: 'Проверка знаний: UX vs UI',
                        type: StepType.TEST_SINGLE,
                        order: 3,
                        content: {
                          question: 'Правда ли, что UX — это только то, как выглядит интерфейс?',
                          options: [
                            { id: '1', text: 'Да, абсолютно', isCorrect: false },
                            {
                              id: '2',
                              text: 'Нет, UX — это про опыт и логику, а UI — про визуал',
                              isCorrect: true,
                            },
                            { id: '3', text: 'Это одно и то же', isCorrect: false },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  title: 'Урок 1.2: Психология пользователя',
                  order: 2,
                  steps: {
                    create: [
                      {
                        title: 'Закон Хика',
                        type: StepType.TEXT_IMAGE,
                        order: 1,
                        content: {
                          body: 'Чем больше вариантов выбора у пользователя, тем больше времени ему требуется на принятие решения.',
                          imageUrl: 'https://example.com/hicks-law.jpg',
                        },
                      },
                      {
                        title: 'Сопоставление законов UX',
                        type: StepType.MATCHING,
                        order: 2,
                        content: {
                          left: [
                            { id: 'l1', content: 'Закон Хика' },
                            { id: 'l2', content: 'Закон Фиттса' },
                            { id: 'l3', content: 'Закон близости' },
                          ],
                          right: [
                            { id: 'r1', content: 'Время принятия решения зависит от числа опций' },
                            {
                              id: 'r2',
                              content: 'Элементы поблизости воспринимаются как связанные',
                            },
                            {
                              id: 'r3',
                              content: 'Время движения к цели зависит от её размера и расстояния',
                            },
                          ],
                          pairs: [
                            { leftId: 'l1', rightId: 'r1' },
                            { leftId: 'l2', rightId: 'r3' },
                            { leftId: 'l3', rightId: 'r2' },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: 'Модуль 1: Основы UX и Дизайн-мышление',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'Урок 1.1: Что такое UX на самом деле?',
                  order: 1,
                  steps: {
                    create: [
                      {
                        title: 'Определение UX',
                        type: StepType.TEXT,
                        order: 1,
                        content: {
                          body: 'User Experience (UX) — это то, как человек взаимодействует с продуктом. Это его чувства, эмоции и практический опыт.',
                        },
                      },
                      {
                        title: 'Процесс проектирования',
                        type: StepType.VIDEO,
                        order: 2,
                        content: {
                          url: 'https://www.youtube.com/watch?v=TtInP9mP-50',
                          provider: 'youtube',
                          description: 'Посмотрите это короткое видео о дизайн-процессе.',
                        },
                      },
                      {
                        title: 'Проверка знаний: UX vs UI',
                        type: StepType.TEST_SINGLE,
                        order: 3,
                        content: {
                          question: 'Правда ли, что UX — это только то, как выглядит интерфейс?',
                          options: [
                            { id: '1', text: 'Да, абсолютно', isCorrect: false },
                            {
                              id: '2',
                              text: 'Нет, UX — это про опыт и логику, а UI — про визуал',
                              isCorrect: true,
                            },
                            { id: '3', text: 'Это одно и то же', isCorrect: false },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  title: 'Урок 1.2: Психология пользователя',
                  order: 2,
                  steps: {
                    create: [
                      {
                        title: 'Закон Хика',
                        type: StepType.TEXT_IMAGE,
                        order: 1,
                        content: {
                          body: 'Чем больше вариантов выбора у пользователя, тем больше времени ему требуется на принятие решения.',
                          imageUrl: 'https://example.com/hicks-law.jpg',
                        },
                      },
                      {
                        title: 'Сопоставление законов UX',
                        type: StepType.MATCHING,
                        order: 2,
                        content: {
                          left: [
                            { id: 'l1', content: 'Закон Хика' },
                            { id: 'l2', content: 'Закон Фиттса' },
                            { id: 'l3', content: 'Закон близости' },
                          ],
                          right: [
                            { id: 'r1', content: 'Время принятия решения зависит от числа опций' },
                            {
                              id: 'r2',
                              content: 'Элементы поблизости воспринимаются как связанные',
                            },
                            {
                              id: 'r3',
                              content: 'Время движения к цели зависит от её размера и расстояния',
                            },
                          ],
                          pairs: [
                            { leftId: 'l1', rightId: 'r1' },
                            { leftId: 'l2', rightId: 'r3' },
                            { leftId: 'l3', rightId: 'r2' },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: 'Модуль 1: Основы UX и Дизайн-мышление',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'Урок 1.1: Что такое UX на самом деле?',
                  order: 1,
                  steps: {
                    create: [
                      {
                        title: 'Определение UX',
                        type: StepType.TEXT,
                        order: 1,
                        content: {
                          body: 'User Experience (UX) — это то, как человек взаимодействует с продуктом. Это его чувства, эмоции и практический опыт.',
                        },
                      },
                      {
                        title: 'Процесс проектирования',
                        type: StepType.VIDEO,
                        order: 2,
                        content: {
                          url: 'https://www.youtube.com/watch?v=TtInP9mP-50',
                          provider: 'youtube',
                          description: 'Посмотрите это короткое видео о дизайн-процессе.',
                        },
                      },
                      {
                        title: 'Проверка знаний: UX vs UI',
                        type: StepType.TEST_SINGLE,
                        order: 3,
                        content: {
                          question: 'Правда ли, что UX — это только то, как выглядит интерфейс?',
                          options: [
                            { id: '1', text: 'Да, абсолютно', isCorrect: false },
                            {
                              id: '2',
                              text: 'Нет, UX — это про опыт и логику, а UI — про визуал',
                              isCorrect: true,
                            },
                            { id: '3', text: 'Это одно и то же', isCorrect: false },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  title: 'Урок 1.2: Психология пользователя',
                  order: 2,
                  steps: {
                    create: [
                      {
                        title: 'Закон Хика',
                        type: StepType.TEXT_IMAGE,
                        order: 1,
                        content: {
                          body: 'Чем больше вариантов выбора у пользователя, тем больше времени ему требуется на принятие решения.',
                          imageUrl: 'https://example.com/hicks-law.jpg',
                        },
                      },
                      {
                        title: 'Сопоставление законов UX',
                        type: StepType.MATCHING,
                        order: 2,
                        content: {
                          left: [
                            { id: 'l1', content: 'Закон Хика' },
                            { id: 'l2', content: 'Закон Фиттса' },
                            { id: 'l3', content: 'Закон близости' },
                          ],
                          right: [
                            { id: 'r1', content: 'Время принятия решения зависит от числа опций' },
                            {
                              id: 'r2',
                              content: 'Элементы поблизости воспринимаются как связанные',
                            },
                            {
                              id: 'r3',
                              content: 'Время движения к цели зависит от её размера и расстояния',
                            },
                          ],
                          pairs: [
                            { leftId: 'l1', rightId: 'r1' },
                            { leftId: 'l2', rightId: 'r3' },
                            { leftId: 'l3', rightId: 'r2' },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: 'Модуль 1: Основы UX и Дизайн-мышление',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'Урок 1.1: Что такое UX на самом деле?',
                  order: 1,
                  steps: {
                    create: [
                      {
                        title: 'Определение UX',
                        type: StepType.TEXT,
                        order: 1,
                        content: {
                          body: 'User Experience (UX) — это то, как человек взаимодействует с продуктом. Это его чувства, эмоции и практический опыт.',
                        },
                      },
                      {
                        title: 'Процесс проектирования',
                        type: StepType.VIDEO,
                        order: 2,
                        content: {
                          url: 'https://www.youtube.com/watch?v=TtInP9mP-50',
                          provider: 'youtube',
                          description: 'Посмотрите это короткое видео о дизайн-процессе.',
                        },
                      },
                      {
                        title: 'Проверка знаний: UX vs UI',
                        type: StepType.TEST_SINGLE,
                        order: 3,
                        content: {
                          question: 'Правда ли, что UX — это только то, как выглядит интерфейс?',
                          options: [
                            { id: '1', text: 'Да, абсолютно', isCorrect: false },
                            {
                              id: '2',
                              text: 'Нет, UX — это про опыт и логику, а UI — про визуал',
                              isCorrect: true,
                            },
                            { id: '3', text: 'Это одно и то же', isCorrect: false },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  title: 'Урок 1.2: Психология пользователя',
                  order: 2,
                  steps: {
                    create: [
                      {
                        title: 'Закон Хика',
                        type: StepType.TEXT_IMAGE,
                        order: 1,
                        content: {
                          body: 'Чем больше вариантов выбора у пользователя, тем больше времени ему требуется на принятие решения.',
                          imageUrl: 'https://example.com/hicks-law.jpg',
                        },
                      },
                      {
                        title: 'Сопоставление законов UX',
                        type: StepType.MATCHING,
                        order: 2,
                        content: {
                          left: [
                            { id: 'l1', content: 'Закон Хика' },
                            { id: 'l2', content: 'Закон Фиттса' },
                            { id: 'l3', content: 'Закон близости' },
                          ],
                          right: [
                            { id: 'r1', content: 'Время принятия решения зависит от числа опций' },
                            {
                              id: 'r2',
                              content: 'Элементы поблизости воспринимаются как связанные',
                            },
                            {
                              id: 'r3',
                              content: 'Время движения к цели зависит от её размера и расстояния',
                            },
                          ],
                          pairs: [
                            { leftId: 'l1', rightId: 'r1' },
                            { leftId: 'l2', rightId: 'r3' },
                            { leftId: 'l3', rightId: 'r2' },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: 'Модуль 1: Основы UX и Дизайн-мышление',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'Урок 1.1: Что такое UX на самом деле?',
                  order: 1,
                  steps: {
                    create: [
                      {
                        title: 'Определение UX',
                        type: StepType.TEXT,
                        order: 1,
                        content: {
                          body: 'User Experience (UX) — это то, как человек взаимодействует с продуктом. Это его чувства, эмоции и практический опыт.',
                        },
                      },
                      {
                        title: 'Процесс проектирования',
                        type: StepType.VIDEO,
                        order: 2,
                        content: {
                          url: 'https://www.youtube.com/watch?v=TtInP9mP-50',
                          provider: 'youtube',
                          description: 'Посмотрите это короткое видео о дизайн-процессе.',
                        },
                      },
                      {
                        title: 'Проверка знаний: UX vs UI',
                        type: StepType.TEST_SINGLE,
                        order: 3,
                        content: {
                          question: 'Правда ли, что UX — это только то, как выглядит интерфейс?',
                          options: [
                            { id: '1', text: 'Да, абсолютно', isCorrect: false },
                            {
                              id: '2',
                              text: 'Нет, UX — это про опыт и логику, а UI — про визуал',
                              isCorrect: true,
                            },
                            { id: '3', text: 'Это одно и то же', isCorrect: false },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  title: 'Урок 1.2: Психология пользователя',
                  order: 2,
                  steps: {
                    create: [
                      {
                        title: 'Закон Хика',
                        type: StepType.TEXT_IMAGE,
                        order: 1,
                        content: {
                          body: 'Чем больше вариантов выбора у пользователя, тем больше времени ему требуется на принятие решения.',
                          imageUrl: 'https://example.com/hicks-law.jpg',
                        },
                      },
                      {
                        title: 'Сопоставление законов UX',
                        type: StepType.MATCHING,
                        order: 2,
                        content: {
                          left: [
                            { id: 'l1', content: 'Закон Хика' },
                            { id: 'l2', content: 'Закон Фиттса' },
                            { id: 'l3', content: 'Закон близости' },
                          ],
                          right: [
                            { id: 'r1', content: 'Время принятия решения зависит от числа опций' },
                            {
                              id: 'r2',
                              content: 'Элементы поблизости воспринимаются как связанные',
                            },
                            {
                              id: 'r3',
                              content: 'Время движения к цели зависит от её размера и расстояния',
                            },
                          ],
                          pairs: [
                            { leftId: 'l1', rightId: 'r1' },
                            { leftId: 'l2', rightId: 'r3' },
                            { leftId: 'l3', rightId: 'r2' },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: 'Модуль 1: Основы UX и Дизайн-мышление',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'Урок 1.1: Что такое UX на самом деле?',
                  order: 1,
                  steps: {
                    create: [
                      {
                        title: 'Определение UX',
                        type: StepType.TEXT,
                        order: 1,
                        content: {
                          body: 'User Experience (UX) — это то, как человек взаимодействует с продуктом. Это его чувства, эмоции и практический опыт.',
                        },
                      },
                      {
                        title: 'Процесс проектирования',
                        type: StepType.VIDEO,
                        order: 2,
                        content: {
                          url: 'https://www.youtube.com/watch?v=TtInP9mP-50',
                          provider: 'youtube',
                          description: 'Посмотрите это короткое видео о дизайн-процессе.',
                        },
                      },
                      {
                        title: 'Проверка знаний: UX vs UI',
                        type: StepType.TEST_SINGLE,
                        order: 3,
                        content: {
                          question: 'Правда ли, что UX — это только то, как выглядит интерфейс?',
                          options: [
                            { id: '1', text: 'Да, абсолютно', isCorrect: false },
                            {
                              id: '2',
                              text: 'Нет, UX — это про опыт и логику, а UI — про визуал',
                              isCorrect: true,
                            },
                            { id: '3', text: 'Это одно и то же', isCorrect: false },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  title: 'Урок 1.2: Психология пользователя',
                  order: 2,
                  steps: {
                    create: [
                      {
                        title: 'Закон Хика',
                        type: StepType.TEXT_IMAGE,
                        order: 1,
                        content: {
                          body: 'Чем больше вариантов выбора у пользователя, тем больше времени ему требуется на принятие решения.',
                          imageUrl: 'https://example.com/hicks-law.jpg',
                        },
                      },
                      {
                        title: 'Сопоставление законов UX',
                        type: StepType.MATCHING,
                        order: 2,
                        content: {
                          left: [
                            { id: 'l1', content: 'Закон Хика' },
                            { id: 'l2', content: 'Закон Фиттса' },
                            { id: 'l3', content: 'Закон близости' },
                          ],
                          right: [
                            { id: 'r1', content: 'Время принятия решения зависит от числа опций' },
                            {
                              id: 'r2',
                              content: 'Элементы поблизости воспринимаются как связанные',
                            },
                            {
                              id: 'r3',
                              content: 'Время движения к цели зависит от её размера и расстояния',
                            },
                          ],
                          pairs: [
                            { leftId: 'l1', rightId: 'r1' },
                            { leftId: 'l2', rightId: 'r3' },
                            { leftId: 'l3', rightId: 'r2' },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: 'Модуль 1: Основы UX и Дизайн-мышление',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'Урок 1.1: Что такое UX на самом деле?',
                  order: 1,
                  steps: {
                    create: [
                      {
                        title: 'Определение UX',
                        type: StepType.TEXT,
                        order: 1,
                        content: {
                          body: 'User Experience (UX) — это то, как человек взаимодействует с продуктом. Это его чувства, эмоции и практический опыт.',
                        },
                      },
                      {
                        title: 'Процесс проектирования',
                        type: StepType.VIDEO,
                        order: 2,
                        content: {
                          url: 'https://www.youtube.com/watch?v=TtInP9mP-50',
                          provider: 'youtube',
                          description: 'Посмотрите это короткое видео о дизайн-процессе.',
                        },
                      },
                      {
                        title: 'Проверка знаний: UX vs UI',
                        type: StepType.TEST_SINGLE,
                        order: 3,
                        content: {
                          question: 'Правда ли, что UX — это только то, как выглядит интерфейс?',
                          options: [
                            { id: '1', text: 'Да, абсолютно', isCorrect: false },
                            {
                              id: '2',
                              text: 'Нет, UX — это про опыт и логику, а UI — про визуал',
                              isCorrect: true,
                            },
                            { id: '3', text: 'Это одно и то же', isCorrect: false },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  title: 'Урок 1.2: Психология пользователя',
                  order: 2,
                  steps: {
                    create: [
                      {
                        title: 'Закон Хика',
                        type: StepType.TEXT_IMAGE,
                        order: 1,
                        content: {
                          body: 'Чем больше вариантов выбора у пользователя, тем больше времени ему требуется на принятие решения.',
                          imageUrl: 'https://example.com/hicks-law.jpg',
                        },
                      },
                      {
                        title: 'Сопоставление законов UX',
                        type: StepType.MATCHING,
                        order: 2,
                        content: {
                          left: [
                            { id: 'l1', content: 'Закон Хика' },
                            { id: 'l2', content: 'Закон Фиттса' },
                            { id: 'l3', content: 'Закон близости' },
                          ],
                          right: [
                            { id: 'r1', content: 'Время принятия решения зависит от числа опций' },
                            {
                              id: 'r2',
                              content: 'Элементы поблизости воспринимаются как связанные',
                            },
                            {
                              id: 'r3',
                              content: 'Время движения к цели зависит от её размера и расстояния',
                            },
                          ],
                          pairs: [
                            { leftId: 'l1', rightId: 'r1' },
                            { leftId: 'l2', rightId: 'r3' },
                            { leftId: 'l3', rightId: 'r2' },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: 'Модуль 1: Основы UX и Дизайн-мышление',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'Урок 1.1: Что такое UX на самом деле?',
                  order: 1,
                  steps: {
                    create: [
                      {
                        title: 'Определение UX',
                        type: StepType.TEXT,
                        order: 1,
                        content: {
                          body: 'User Experience (UX) — это то, как человек взаимодействует с продуктом. Это его чувства, эмоции и практический опыт.',
                        },
                      },
                      {
                        title: 'Процесс проектирования',
                        type: StepType.VIDEO,
                        order: 2,
                        content: {
                          url: 'https://www.youtube.com/watch?v=TtInP9mP-50',
                          provider: 'youtube',
                          description: 'Посмотрите это короткое видео о дизайн-процессе.',
                        },
                      },
                      {
                        title: 'Проверка знаний: UX vs UI',
                        type: StepType.TEST_SINGLE,
                        order: 3,
                        content: {
                          question: 'Правда ли, что UX — это только то, как выглядит интерфейс?',
                          options: [
                            { id: '1', text: 'Да, абсолютно', isCorrect: false },
                            {
                              id: '2',
                              text: 'Нет, UX — это про опыт и логику, а UI — про визуал',
                              isCorrect: true,
                            },
                            { id: '3', text: 'Это одно и то же', isCorrect: false },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  title: 'Урок 1.2: Психология пользователя',
                  order: 2,
                  steps: {
                    create: [
                      {
                        title: 'Закон Хика',
                        type: StepType.TEXT_IMAGE,
                        order: 1,
                        content: {
                          body: 'Чем больше вариантов выбора у пользователя, тем больше времени ему требуется на принятие решения.',
                          imageUrl: 'https://example.com/hicks-law.jpg',
                        },
                      },
                      {
                        title: 'Сопоставление законов UX',
                        type: StepType.MATCHING,
                        order: 2,
                        content: {
                          left: [
                            { id: 'l1', content: 'Закон Хика' },
                            { id: 'l2', content: 'Закон Фиттса' },
                            { id: 'l3', content: 'Закон близости' },
                          ],
                          right: [
                            { id: 'r1', content: 'Время принятия решения зависит от числа опций' },
                            {
                              id: 'r2',
                              content: 'Элементы поблизости воспринимаются как связанные',
                            },
                            {
                              id: 'r3',
                              content: 'Время движения к цели зависит от её размера и расстояния',
                            },
                          ],
                          pairs: [
                            { leftId: 'l1', rightId: 'r1' },
                            { leftId: 'l2', rightId: 'r3' },
                            { leftId: 'l3', rightId: 'r2' },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: 'Модуль 1: Основы UX и Дизайн-мышление',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'Урок 1.1: Что такое UX на самом деле?',
                  order: 1,
                  steps: {
                    create: [
                      {
                        title: 'Определение UX',
                        type: StepType.TEXT,
                        order: 1,
                        content: {
                          body: 'User Experience (UX) — это то, как человек взаимодействует с продуктом. Это его чувства, эмоции и практический опыт.',
                        },
                      },
                      {
                        title: 'Процесс проектирования',
                        type: StepType.VIDEO,
                        order: 2,
                        content: {
                          url: 'https://www.youtube.com/watch?v=TtInP9mP-50',
                          provider: 'youtube',
                          description: 'Посмотрите это короткое видео о дизайн-процессе.',
                        },
                      },
                      {
                        title: 'Проверка знаний: UX vs UI',
                        type: StepType.TEST_SINGLE,
                        order: 3,
                        content: {
                          question: 'Правда ли, что UX — это только то, как выглядит интерфейс?',
                          options: [
                            { id: '1', text: 'Да, абсолютно', isCorrect: false },
                            {
                              id: '2',
                              text: 'Нет, UX — это про опыт и логику, а UI — про визуал',
                              isCorrect: true,
                            },
                            { id: '3', text: 'Это одно и то же', isCorrect: false },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  title: 'Урок 1.2: Психология пользователя',
                  order: 2,
                  steps: {
                    create: [
                      {
                        title: 'Закон Хика',
                        type: StepType.TEXT_IMAGE,
                        order: 1,
                        content: {
                          body: 'Чем больше вариантов выбора у пользователя, тем больше времени ему требуется на принятие решения.',
                          imageUrl: 'https://example.com/hicks-law.jpg',
                        },
                      },
                      {
                        title: 'Сопоставление законов UX',
                        type: StepType.MATCHING,
                        order: 2,
                        content: {
                          left: [
                            { id: 'l1', content: 'Закон Хика' },
                            { id: 'l2', content: 'Закон Фиттса' },
                            { id: 'l3', content: 'Закон близости' },
                          ],
                          right: [
                            { id: 'r1', content: 'Время принятия решения зависит от числа опций' },
                            {
                              id: 'r2',
                              content: 'Элементы поблизости воспринимаются как связанные',
                            },
                            {
                              id: 'r3',
                              content: 'Время движения к цели зависит от её размера и расстояния',
                            },
                          ],
                          pairs: [
                            { leftId: 'l1', rightId: 'r1' },
                            { leftId: 'l2', rightId: 'r3' },
                            { leftId: 'l3', rightId: 'r2' },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: 'Модуль 1: Основы UX и Дизайн-мышление',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'Урок 1.1: Что такое UX на самом деле?',
                  order: 1,
                  steps: {
                    create: [
                      {
                        title: 'Определение UX',
                        type: StepType.TEXT,
                        order: 1,
                        content: {
                          body: 'User Experience (UX) — это то, как человек взаимодействует с продуктом. Это его чувства, эмоции и практический опыт.',
                        },
                      },
                      {
                        title: 'Процесс проектирования',
                        type: StepType.VIDEO,
                        order: 2,
                        content: {
                          url: 'https://www.youtube.com/watch?v=TtInP9mP-50',
                          provider: 'youtube',
                          description: 'Посмотрите это короткое видео о дизайн-процессе.',
                        },
                      },
                      {
                        title: 'Проверка знаний: UX vs UI',
                        type: StepType.TEST_SINGLE,
                        order: 3,
                        content: {
                          question: 'Правда ли, что UX — это только то, как выглядит интерфейс?',
                          options: [
                            { id: '1', text: 'Да, абсолютно', isCorrect: false },
                            {
                              id: '2',
                              text: 'Нет, UX — это про опыт и логику, а UI — про визуал',
                              isCorrect: true,
                            },
                            { id: '3', text: 'Это одно и то же', isCorrect: false },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  title: 'Урок 1.2: Психология пользователя',
                  order: 2,
                  steps: {
                    create: [
                      {
                        title: 'Закон Хика',
                        type: StepType.TEXT_IMAGE,
                        order: 1,
                        content: {
                          body: 'Чем больше вариантов выбора у пользователя, тем больше времени ему требуется на принятие решения.',
                          imageUrl: 'https://example.com/hicks-law.jpg',
                        },
                      },
                      {
                        title: 'Сопоставление законов UX',
                        type: StepType.MATCHING,
                        order: 2,
                        content: {
                          left: [
                            { id: 'l1', content: 'Закон Хика' },
                            { id: 'l2', content: 'Закон Фиттса' },
                            { id: 'l3', content: 'Закон близости' },
                          ],
                          right: [
                            { id: 'r1', content: 'Время принятия решения зависит от числа опций' },
                            {
                              id: 'r2',
                              content: 'Элементы поблизости воспринимаются как связанные',
                            },
                            {
                              id: 'r3',
                              content: 'Время движения к цели зависит от её размера и расстояния',
                            },
                          ],
                          pairs: [
                            { leftId: 'l1', rightId: 'r1' },
                            { leftId: 'l2', rightId: 'r3' },
                            { leftId: 'l3', rightId: 'r2' },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: 'Модуль 1: Основы UX и Дизайн-мышление',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'Урок 1.1: Что такое UX на самом деле?',
                  order: 1,
                  steps: {
                    create: [
                      {
                        title: 'Определение UX',
                        type: StepType.TEXT,
                        order: 1,
                        content: {
                          body: 'User Experience (UX) — это то, как человек взаимодействует с продуктом. Это его чувства, эмоции и практический опыт.',
                        },
                      },
                      {
                        title: 'Процесс проектирования',
                        type: StepType.VIDEO,
                        order: 2,
                        content: {
                          url: 'https://www.youtube.com/watch?v=TtInP9mP-50',
                          provider: 'youtube',
                          description: 'Посмотрите это короткое видео о дизайн-процессе.',
                        },
                      },
                      {
                        title: 'Проверка знаний: UX vs UI',
                        type: StepType.TEST_SINGLE,
                        order: 3,
                        content: {
                          question: 'Правда ли, что UX — это только то, как выглядит интерфейс?',
                          options: [
                            { id: '1', text: 'Да, абсолютно', isCorrect: false },
                            {
                              id: '2',
                              text: 'Нет, UX — это про опыт и логику, а UI — про визуал',
                              isCorrect: true,
                            },
                            { id: '3', text: 'Это одно и то же', isCorrect: false },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  title: 'Урок 1.2: Психология пользователя',
                  order: 2,
                  steps: {
                    create: [
                      {
                        title: 'Закон Хика',
                        type: StepType.TEXT_IMAGE,
                        order: 1,
                        content: {
                          body: 'Чем больше вариантов выбора у пользователя, тем больше времени ему требуется на принятие решения.',
                          imageUrl: 'https://example.com/hicks-law.jpg',
                        },
                      },
                      {
                        title: 'Сопоставление законов UX',
                        type: StepType.MATCHING,
                        order: 2,
                        content: {
                          left: [
                            { id: 'l1', content: 'Закон Хика' },
                            { id: 'l2', content: 'Закон Фиттса' },
                            { id: 'l3', content: 'Закон близости' },
                          ],
                          right: [
                            { id: 'r1', content: 'Время принятия решения зависит от числа опций' },
                            {
                              id: 'r2',
                              content: 'Элементы поблизости воспринимаются как связанные',
                            },
                            {
                              id: 'r3',
                              content: 'Время движения к цели зависит от её размера и расстояния',
                            },
                          ],
                          pairs: [
                            { leftId: 'l1', rightId: 'r1' },
                            { leftId: 'l2', rightId: 'r3' },
                            { leftId: 'l3', rightId: 'r2' },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: 'Модуль 1: Основы UX и Дизайн-мышление',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'Урок 1.1: Что такое UX на самом деле?',
                  order: 1,
                  steps: {
                    create: [
                      {
                        title: 'Определение UX',
                        type: StepType.TEXT,
                        order: 1,
                        content: {
                          body: 'User Experience (UX) — это то, как человек взаимодействует с продуктом. Это его чувства, эмоции и практический опыт.',
                        },
                      },
                      {
                        title: 'Процесс проектирования',
                        type: StepType.VIDEO,
                        order: 2,
                        content: {
                          url: 'https://www.youtube.com/watch?v=TtInP9mP-50',
                          provider: 'youtube',
                          description: 'Посмотрите это короткое видео о дизайн-процессе.',
                        },
                      },
                      {
                        title: 'Проверка знаний: UX vs UI',
                        type: StepType.TEST_SINGLE,
                        order: 3,
                        content: {
                          question: 'Правда ли, что UX — это только то, как выглядит интерфейс?',
                          options: [
                            { id: '1', text: 'Да, абсолютно', isCorrect: false },
                            {
                              id: '2',
                              text: 'Нет, UX — это про опыт и логику, а UI — про визуал',
                              isCorrect: true,
                            },
                            { id: '3', text: 'Это одно и то же', isCorrect: false },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  title: 'Урок 1.2: Психология пользователя',
                  order: 2,
                  steps: {
                    create: [
                      {
                        title: 'Закон Хика',
                        type: StepType.TEXT_IMAGE,
                        order: 1,
                        content: {
                          body: 'Чем больше вариантов выбора у пользователя, тем больше времени ему требуется на принятие решения.',
                          imageUrl: 'https://example.com/hicks-law.jpg',
                        },
                      },
                      {
                        title: 'Сопоставление законов UX',
                        type: StepType.MATCHING,
                        order: 2,
                        content: {
                          left: [
                            { id: 'l1', content: 'Закон Хика' },
                            { id: 'l2', content: 'Закон Фиттса' },
                            { id: 'l3', content: 'Закон близости' },
                          ],
                          right: [
                            { id: 'r1', content: 'Время принятия решения зависит от числа опций' },
                            {
                              id: 'r2',
                              content: 'Элементы поблизости воспринимаются как связанные',
                            },
                            {
                              id: 'r3',
                              content: 'Время движения к цели зависит от её размера и расстояния',
                            },
                          ],
                          pairs: [
                            { leftId: 'l1', rightId: 'r1' },
                            { leftId: 'l2', rightId: 'r3' },
                            { leftId: 'l3', rightId: 'r2' },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: 'Модуль 3: 3 модуль',
            order: 2,
            lessons: {
              create: [
                {
                  title: 'Урок 3.1: Исследование пользователей',
                  order: 1,
                  steps: {
                    create: [
                      {
                        title: 'Создание Personas',
                        type: StepType.ORDERING,
                        order: 1,
                        content: {
                          items: [
                            { id: 'o1', content: 'Анализ данных интервью' },
                            { id: 'o2', content: 'Сбор информации о пользователях' },
                            { id: 'o3', content: 'Отрисовка карточки персонажа' },
                            { id: 'o4', content: 'Сегментация аудитории' },
                          ],
                          correctOrder: ['o2', 'o1', 'o4', 'o3'],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: 'Модуль 4: Аналитика и Исследования',
            order: 2,
            lessons: {
              create: [
                {
                  title: 'Урок 4.1: Исследование пользователей',
                  order: 1,
                  steps: {
                    create: [
                      {
                        title: 'Создание Personas',
                        type: StepType.ORDERING,
                        order: 1,
                        content: {
                          items: [
                            { id: 'o1', content: 'Анализ данных интервью' },
                            { id: 'o2', content: 'Сбор информации о пользователях' },
                            { id: 'o3', content: 'Отрисовка карточки персонажа' },
                            { id: 'o4', content: 'Сегментация аудитории' },
                          ],
                          correctOrder: ['o2', 'o1', 'o4', 'o3'],
                        },
                      },
                    ],
                  },
                },
                {
                  title: 'Урок 4.2: Исследование пользователей',
                  order: 1,
                  steps: {
                    create: [
                      {
                        title: 'Создание Personas',
                        type: StepType.ORDERING,
                        order: 1,
                        content: {
                          items: [
                            { id: 'o1', content: 'Анализ данных интервью' },
                            { id: 'o2', content: 'Сбор информации о пользователях' },
                            { id: 'o3', content: 'Отрисовка карточки персонажа' },
                            { id: 'o4', content: 'Сегментация аудитории' },
                          ],
                          correctOrder: ['o2', 'o1', 'o4', 'o3'],
                        },
                      },
                    ],
                  },
                },
                {
                  title: 'Урок 4.3: Исследование пользователей',
                  order: 1,
                  steps: {
                    create: [
                      {
                        title: 'Создание Personas',
                        type: StepType.ORDERING,
                        order: 1,
                        content: {
                          items: [
                            { id: 'o1', content: 'Анализ данных интервью' },
                            { id: 'o2', content: 'Сбор информации о пользователях' },
                            { id: 'o3', content: 'Отрисовка карточки персонажа' },
                            { id: 'o4', content: 'Сегментация аудитории' },
                          ],
                          correctOrder: ['o2', 'o1', 'o4', 'o3'],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: 'Модуль 2: Аналитика и Исследования',
            order: 2,
            lessons: {
              create: [
                {
                  title: 'Урок 2.1: Исследование пользователей',
                  order: 1,
                  steps: {
                    create: [
                      {
                        title: 'Создание Personas',
                        type: StepType.ORDERING,
                        order: 1,
                        content: {
                          items: [
                            { id: 'o1', content: 'Анализ данных интервью' },
                            { id: 'o2', content: 'Сбор информации о пользователях' },
                            { id: 'o3', content: 'Отрисовка карточки персонажа' },
                            { id: 'o4', content: 'Сегментация аудитории' },
                          ],
                          correctOrder: ['o2', 'o1', 'o4', 'o3'],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      title: 'React для начинающих',
      description: 'Компоненты и хуки.',
      price: 0,
      duration: '8 часов',
      level: Level.BEGINNER,
      category: 'development',
      modules: {
        create: [
          {
            title: 'Модуль 1: Основы React',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'Урок 1.1: Знакомство с JSX',
                  order: 1,
                  steps: {
                    create: [
                      {
                        title: 'Что такое JSX?',
                        type: StepType.TEXT,
                        order: 1,
                        content: {
                          body: 'JSX — это расширение синтаксиса JavaScript, которое выглядит как HTML.',
                        },
                      },
                      {
                        title: 'Выбор правильных ответов',
                        type: StepType.TEST_MULTIPLE,
                        order: 2,
                        content: {
                          question: 'Какие утверждения о JSX верны?',
                          options: [
                            {
                              id: '1',
                              text: 'Нужно импортировать React для JSX в старых версиях',
                              isCorrect: true,
                            },
                            { id: '2', text: 'JSX — это валидный HTML', isCorrect: false },
                            {
                              id: '3',
                              text: 'В JSX можно вставлять выражения в фигурных скобках',
                              isCorrect: true,
                            },
                            {
                              id: '4',
                              text: 'class используется вместо className',
                              isCorrect: false,
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: 'Модуль 2: Хуки',
            order: 2,
            lessons: {
              create: [
                {
                  title: 'Урок 2.1: useState и useEffect',
                  order: 1,
                  steps: {
                    create: [
                      {
                        title: 'Название хука',
                        type: StepType.INPUT_TEXT,
                        order: 1,
                        content: {
                          question:
                            'Напишите название хука, который используется для управления состоянием в функциональных компонентах.',
                          correctAnswers: ['useState'],
                        },
                      },
                      {
                        title: 'Код на React',
                        type: StepType.FILL_GAPS,
                        order: 2,
                        content: {
                          text: 'const [count, setCount] = {{gap1}}(0); \n {{gap2}}(() => { console.log("mounted") }, []);',
                          gaps: [
                            { id: 'gap1', type: 'text', correctAnswer: 'useState' },
                            { id: 'gap2', type: 'text', correctAnswer: 'useEffect' },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      title: 'SQL для анализа данных',
      description: 'Оконные функции.',
      price: 5400,
      duration: '14 часов',
      level: Level.INTERMEDIATE,
      category: 'analytics',
      modules: {
        create: [
          {
            title: 'Модуль 1: Продвинутый SQL',
            order: 1,
            lessons: {
              create: [
                {
                  title: 'Урок 1.1: Оконные функции',
                  order: 1,
                  steps: {
                    create: [
                      {
                        title: 'Синтаксис OVER',
                        type: StepType.TEXT,
                        order: 1,
                        content: {
                          body: 'Оконная функция выполняется над набором строк, который называется окном.',
                        },
                      },
                      {
                        title: 'Количество строк в окне',
                        type: StepType.INPUT_NUMBER,
                        order: 2,
                        content: {
                          question:
                            'Сколько строк вернет запрос с COUNT(*) OVER(), если в таблице 10 строк?',
                          correctAnswer: 10,
                        },
                      },
                      {
                        title: 'Ранжирование в SQL',
                        type: StepType.TABLE,
                        order: 3,
                        content: {
                          columns: ['Функция', 'Пропуски в рангах', 'Дубликаты'],
                          rows: [
                            {
                              id: 'r1',
                              cells: [
                                { id: 'c1', text: 'ROW_NUMBER()' },
                                { id: 'c2', text: 'Нет' },
                                { id: 'c3', text: 'Разные ранги' },
                              ],
                            },
                            {
                              id: 'r2',
                              cells: [
                                { id: 'c4', text: 'RANK()' },
                                { id: 'c5', text: 'Да' },
                                { id: 'c6', text: 'Одинаковые ранги' },
                              ],
                            },
                            {
                              id: 'r3',
                              cells: [
                                { id: 'c7', text: 'DENSE_RANK()' },
                                { id: 'c8', text: 'Нет' },
                                { id: 'c9', text: 'Одинаковые ранги' },
                              ],
                            },
                          ],
                          correctCells: ['c1', 'c4', 'c7'], // Пример выбора именно функций
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
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
  ]

  for (const courseItem of coursesData) {
    await db.course.create({
      data: courseItem,
    })
  }

  console.log(`✅ Success! Created ${coursesData.length} courses with nested content.`)
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
