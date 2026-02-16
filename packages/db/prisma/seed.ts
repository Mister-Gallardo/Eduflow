import { db, Level, StepType } from '../src/index.js'

// --- Helper Functions to Generate Content ---

// 1. TEXT
const createTextContent = (html: string) => ({ html })

// 2. VIDEO
const createVideoContent = (url: string) => ({ url })

// 3. TEST_SINGLE
const createTestSingleContent = (
  question: string,
  options: { id: string; text: string; isCorrect?: boolean }[],
) => ({
  question,
  options,
  correctOptionId: options.find((o) => o.isCorrect)?.id,
})

// 4. TEST_MULTIPLE
const createTestMultipleContent = (
  question: string,
  options: { id: string; text: string; isCorrect?: boolean }[],
) => ({
  question,
  options,
  correctOptionIds: options.filter((o) => o.isCorrect).map((o) => o.id),
})

// 5. MATCHING (Content logic: pairs define correct matches)
const createMatchingContent = (
  pairs: { leftId: string; leftContent: string; rightId: string; rightContent: string }[],
) => {
  return {
    left: pairs.map((p) => ({ id: p.leftId, content: p.leftContent })),
    right: pairs.map((p) => ({ id: p.rightId, content: p.rightContent })),
    pairs: pairs.map((p) => ({ leftId: p.leftId, rightId: p.rightId })),
  }
}

// 6. ORDERING (Content logic: items in correct order)
const createOrderingContent = (items: { id: string; content: string }[]) => ({
  items,
  correctOrder: items.map((i) => i.id),
})

// 7. INPUT_TEXT
const createInputTextContent = (question: string, correctAnswers: string[]) => ({
  question,
  correctAnswers,
})

// 8. INPUT_NUMBER
const createInputNumberContent = (question: string, correctAnswer: number) => ({
  question,
  correctAnswer,
})

// 9. FREE_TEXT
const createFreeTextContent = (question: string) => ({
  question,
})

// 10. FILL_GAPS
// Text should contain placeholders like {{id}}
const createFillGapsContent = (text: string, gaps: { id: string; correctAnswer: string }[]) => ({
  text,
  gaps,
})

// 11. TABLE
// correctCells are IDs of cells that should be selected (e.g. "Select all prime numbers")
const createTableContent = (
  columns: string[],
  rows: { id: string; cells: { id: string; text: string }[] }[],
  correctCells: string[],
) => ({
  columns,
  rows,
  correctCells,
})

// --- Data Definitions ---

interface StepDefinition {
  title: string
  type: StepType
  content: any
}

interface LessonDefinition {
  title: string
  steps: StepDefinition[]
}

interface ModuleDefinition {
  title: string
  lessons: LessonDefinition[]
}

interface CourseDefinition {
  title: string
  description: string
  price: number
  duration: string
  level: Level
  category: string
  modules: ModuleDefinition[]
}

const allCourses: CourseDefinition[] = [
  {
    title: 'Influencer Marketing',
    description:
      'Научитесь эффективно работать с блогерами и лидерами мнений для продвижения бренда.',
    price: 0,
    duration: '5 часов',
    level: Level.BEGINNER,
    category: 'marketing',
    modules: [
      {
        title: 'Введение в Influencer Marketing',
        lessons: [
          {
            title: 'Кто такие инфлюенсеры?',
            steps: [
              {
                title: 'Определение и типы',
                type: StepType.TEXT,
                content: createTextContent(
                  `<h3>Кто такой инфлюенсер?</h3><p>Инфлюенсер — это человек, который имеет влияние на определенную аудиторию.</p><p>Типы инфлюенсеров:</p><ul><li>Нано (1к-10к подписчиков)</li><li>Микро (10к-100к)</li><li>Макро (100к-1м)</li><li>Миллионники (1м+)</li></ul>`,
                ),
              },
              {
                title: 'Видео-разбор типов блогеров',
                type: StepType.VIDEO,
                content: createVideoContent('https://www.youtube.com/watch?v=dQw4w9WgXcQ'), // Placeholder
              },
              {
                title: 'Проверка знаний: Типы',
                type: StepType.MATCHING,
                content: createMatchingContent([
                  {
                    leftId: 'nano',
                    leftContent: 'Нано',
                    rightId: '1-10k',
                    rightContent: '1к - 10к',
                  },
                  {
                    leftId: 'micro',
                    leftContent: 'Микро',
                    rightId: '10-100k',
                    rightContent: '10к - 100к',
                  },
                  {
                    leftId: 'macro',
                    leftContent: 'Макро',
                    rightId: '100k-1m',
                    rightContent: '100к - 1м',
                  },
                ]),
              },
            ],
          },
          {
            title: 'Стратегия работы',
            steps: [
              {
                title: 'Цели кампании',
                type: StepType.TEXT,
                content: createTextContent(
                  `<p>Перед началом работы важно определить цели: охват, вовлеченность или продажи.</p>`,
                ),
              },
              {
                title: 'Выбор цели',
                type: StepType.TEST_SINGLE,
                content: createTestSingleContent('Что является главной целью имиджевой кампании?', [
                  { id: 'opt1', text: 'Прямые продажи', isCorrect: false },
                  { id: 'opt2', text: 'Повышение узнаваемости', isCorrect: true },
                  { id: 'opt3', text: 'Сбор лидов', isCorrect: false },
                ]),
              },
            ],
          },
        ],
      },
      {
        title: 'Поиск и проверка блогеров',
        lessons: [
          {
            title: 'Где искать?',
            steps: [
              {
                title: 'Инструменты поиска',
                type: StepType.TEST_MULTIPLE,
                content: createTestMultipleContent('Какие методы поиска блогеров существуют?', [
                  { id: 'm1', text: 'Хэштеги', isCorrect: true },
                  { id: 'm2', text: 'Геолокация', isCorrect: true },
                  { id: 'm3', text: 'Телепатия', isCorrect: false },
                  { id: 'm4', text: 'Специальные биржи', isCorrect: true },
                ]),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'TypeScript: Типизация',
    description:
      'Глубокое погружение в систему типов TypeScript. Generics, Union, Intersection и многое другое.',
    price: 3200,
    duration: '10 часов',
    level: Level.INTERMEDIATE,
    category: 'development',
    modules: [
      {
        title: 'Основы типов',
        lessons: [
          {
            title: 'Базовые типы',
            steps: [
              {
                title: 'Примитивы',
                type: StepType.TEXT,
                content: createTextContent(
                  `<p>TypeScript поддерживает все стандартные типы JavaScript: boolean, number, string.</p><pre><code>let isDone: boolean = false;</code></pre>`,
                ),
              },
              {
                title: 'Заполните пропуски',
                type: StepType.FILL_GAPS,
                content: createFillGapsContent(
                  'Для объявления строковой переменной используйте тип {{type}}. Примером значения типа boolean является {{bool}}.',
                  [
                    { id: 'type', correctAnswer: 'string' },
                    { id: 'bool', correctAnswer: 'true' }, // or false, simple check
                  ],
                ),
              },
            ],
          },
        ],
      },
      {
        title: 'Продвинутые типы',
        lessons: [
          {
            title: 'Generics',
            steps: [
              {
                title: 'Что такое Generic?',
                type: StepType.VIDEO,
                content: createVideoContent('https://www.youtube.com/watch?v=123456789'),
              },
              {
                title: 'Практика: Функция identity',
                type: StepType.INPUT_TEXT,
                content: createInputTextContent(
                  'Напишите ключевое слово, используемое для объявления функции в TS',
                  ['function'],
                ),
              },
            ],
          },
          {
            title: 'Utility Types',
            steps: [
              {
                title: 'Partial и Required',
                type: StepType.TABLE,
                content: createTableContent(
                  ['Тип', 'Описание'],
                  [
                    {
                      id: 'r1',
                      cells: [
                        { id: 'c11', text: 'Partial<T>' },
                        { id: 'c12', text: 'Делает все поля опциональными' },
                      ],
                    },
                    {
                      id: 'r2',
                      cells: [
                        { id: 'c21', text: 'Required<T>' },
                        { id: 'c22', text: 'Делает все поля обязательными' },
                      ],
                    },
                    {
                      id: 'r3',
                      cells: [
                        { id: 'c31', text: 'Readonly<T>' },
                        { id: 'c32', text: 'Только для чтения' },
                      ],
                    },
                  ],
                  ['c11', 'c12', 'c21', 'c22', 'c31', 'c32'], // Dummy "Select all" task or just reading
                ),
              },
            ],
          },
        ],
      },
      {
        title: 'Финальный тест',
        lessons: [
          {
            title: 'Экзамен',
            steps: [
              {
                title: 'Порядок компиляции',
                type: StepType.ORDERING,
                content: createOrderingContent([
                  { id: '1', content: 'Написание кода .ts' },
                  { id: '2', content: 'Запуск tsc' },
                  { id: '3', content: 'Генерация .js файлов' },
                  { id: '4', content: 'Исполнение в node/браузере' },
                ]),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Защита облаков AWS',
    description: 'Безопасность и доступы. IAM, VPC, CloudTrail.',
    price: 12500,
    duration: '20 часов',
    level: Level.ADVANCED,
    category: 'cybersecurity',
    modules: [
      {
        title: 'IAM (Identity and Access Management)',
        lessons: [
          {
            title: 'Политики и Роли',
            steps: [
              {
                title: 'JSON Policy Structure',
                type: StepType.TEXT,
                content: createTextContent(`<p>Политики AWS описываются в формате JSON.</p>`),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: '3D-моделирование в Blender',
    description: 'Создание сцен, моделирование объектов, рендеринг.',
    price: 9200,
    duration: '30 часов',
    level: Level.INTERMEDIATE,
    category: 'design',
    modules: [
      {
        title: 'Интерфейс Blender',
        lessons: [
          {
            title: 'Навигация',
            steps: [
              {
                title: 'Горячие клавиши',
                type: StepType.MATCHING,
                content: createMatchingContent([
                  {
                    leftId: 'g',
                    leftContent: 'G',
                    rightId: 'move',
                    rightContent: 'Перемещение (Grab)',
                  },
                  {
                    leftId: 'r',
                    leftContent: 'R',
                    rightId: 'rotate',
                    rightContent: 'Вращение (Rotate)',
                  },
                  {
                    leftId: 's',
                    leftContent: 'S',
                    rightId: 'scale',
                    rightContent: 'Масштаб (Scale)',
                  },
                ]),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Data Science: Старт',
    description: 'Pandas и NumPy. Основы анализа данных на Python.',
    price: 0,
    duration: '10 часов',
    level: Level.BEGINNER,
    category: 'analytics',
    modules: [
      {
        title: 'NumPy',
        lessons: [
          {
            title: 'Массивы',
            steps: [
              {
                title: 'Создание массива',
                type: StepType.INPUT_NUMBER,
                content: createInputNumberContent(
                  'Сколько измерений у массива np.array([1, 2, 3])?',
                  1,
                ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'E-mail маркетинг',
    description: 'Автоматизация писем.',
    price: 2900,
    duration: '10 часов',
    level: Level.BEGINNER,
    category: 'marketing',
    modules: [],
  },
  {
    title: 'SOC аналитик',
    description: 'Мониторинг атак.',
    price: 10800,
    duration: '18 часов',
    level: Level.INTERMEDIATE,
    category: 'cybersecurity',
    modules: [],
  },
  {
    title: 'Типографика для продвинутых',
    description: 'Шрифтовые пары.',
    price: 3800,
    duration: '10 часов',
    level: Level.ADVANCED,
    category: 'design',
    modules: [],
  },
  {
    title: 'BI аналитика',
    description: 'Дашборды.',
    price: 8200,
    duration: '18 часов',
    level: Level.INTERMEDIATE,
    category: 'analytics',
    modules: [],
  },
  {
    title: 'Go для высоких нагрузок',
    description: 'Горутины.',
    price: 13000,
    duration: '35 часов',
    level: Level.ADVANCED,
    category: 'development',
    modules: [],
  },
  {
    title: 'SEO-специалист',
    description: 'Продвижение сайтов.',
    price: 7800,
    duration: '20 часов',
    level: Level.INTERMEDIATE,
    category: 'marketing',
    modules: [],
  },
  {
    title: 'Ethical Hacking',
    description: 'Эксплойты.',
    price: 14500,
    duration: '28 часов',
    level: Level.ADVANCED,
    category: 'cybersecurity',
    modules: [],
  },
  {
    title: 'Айдентика и брендинг',
    description: 'Логотипы.',
    price: 8300,
    duration: '20 часов',
    level: Level.INTERMEDIATE,
    category: 'design',
    modules: [],
  },
  {
    title: 'Продуктовая аналитика',
    description: 'Метрики.',
    price: 11000,
    duration: '25 часов',
    level: Level.INTERMEDIATE,
    category: 'analytics',
    modules: [],
  },
  {
    title: 'Next.js 14',
    description: 'SSR и App Router.',
    price: 0,
    duration: '15 часов',
    level: Level.ADVANCED,
    category: 'development',
    modules: [
      {
        title: 'App Router',
        lessons: [
          {
            title: 'Routing',
            steps: [
              {
                title: 'File system routing',
                type: StepType.TEXT,
                content: createTextContent(
                  '<p>Next.js использует файловую систему для роутинга.</p>',
                ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Performance маркетинг',
    description: 'ROI и аналитика рекламных кампаний.',
    price: 14200,
    duration: '30 часов',
    level: Level.ADVANCED,
    category: 'marketing',
    modules: [],
  },
]

async function main() {
  console.log('🌱 Start seeding courses with rich content...')

  // Очистка перед заполнением
  // Удаляем в правильном порядке из-за foreign keys
  await db.userProgress.deleteMany()
  await db.enrollment.deleteMany()
  await db.step.deleteMany()
  await db.lesson.deleteMany()
  await db.module.deleteMany()
  await db.course.deleteMany()

  for (const courseDef of allCourses) {
    console.log(`Creating course: ${courseDef.title}`)

    const course = await db.course.create({
      data: {
        title: courseDef.title,
        description: courseDef.description,
        price: courseDef.price,
        duration: courseDef.duration,
        level: courseDef.level,
        category: courseDef.category,
      },
    })

    // Если модулей нет, создадим заглушку чтобы курс не был пустым
    const modulesToCreate =
      courseDef.modules.length > 0
        ? courseDef.modules
        : [
            {
              title: 'Введение',
              lessons: [
                {
                  title: 'Обзор курса',
                  steps: [
                    {
                      title: 'Добро пожаловать',
                      type: StepType.TEXT,
                      content: createTextContent(
                        `<p>Добро пожаловать на курс "${courseDef.title}"!</p>`,
                      ),
                    },
                  ],
                },
              ],
            },
          ]

    for (let mIndex = 0; mIndex < modulesToCreate.length; mIndex++) {
      const modDef = modulesToCreate[mIndex]
      const module = await db.module.create({
        data: {
          title: modDef.title,
          order: mIndex,
          courseId: course.id,
        },
      })

      for (let lIndex = 0; lIndex < modDef.lessons.length; lIndex++) {
        const lessonDef = modDef.lessons[lIndex]
        const lesson = await db.lesson.create({
          data: {
            title: lessonDef.title,
            order: lIndex,
            moduleId: module.id,
          },
        })

        for (let sIndex = 0; sIndex < lessonDef.steps.length; sIndex++) {
          const stepDef = lessonDef.steps[sIndex]
          await db.step.create({
            data: {
              title: stepDef.title,
              order: sIndex,
              type: stepDef.type,
              content: stepDef.content,
              lessonId: lesson.id,
            },
          })
        }
      }
    }
  }

  console.log(`✅ Success! Created ${allCourses.length} courses with nested content.`)
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
