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
const createFreeTextContent = (question: string, minLength: number = 0) => ({
  question,
  minLength,
})

// --- Data Definitions ---

const categories = ['development', 'design', 'analytics', 'marketing']

const categoryTopics: Record<string, string[]> = {
  development: [
    'Frontend: React 19 Mastery',
    'Backend Node.js & NestJS',
    'Go для высоконагруженных систем',
    'Python: от основ до ООП',
    'Мобильная разработка: React Native',
    'Архитектура ПО: System Design',
    'DevOps и CI/CD: Базовый курс',
    'Продвинутый TypeScript',
  ],
  design: [
    'Основы UI/UX Дизайна',
    'Типографика как искусство',
    'Теория цвета и композиция',
    'Figma: от новичка до профи',
    '3D моделирование в Blender',
    'Айдентика и создание брендинга',
    'Основы веб-анимации',
    'Паттерны мобильного дизайна',
  ],
  analytics: [
    'Основы SQL для аналитиков',
    'Python в Data Science (Pandas)',
    'Машинное обучение Data Science',
    'A/B тестирование',
    'Продуктовые метрики',
    'Углубленная визуализация данных',
    'Инженерия больших данных',
    'Спортивная аналитика',
  ],
  marketing: [
    'Стратегия SEO-продвижения',
    'Контент-маркетинг',
    'Гид по SMM (Telegram, VK)',
    'Email маркетинг и автоматизация',
    'Performance и таргетированная реклама',
    'Influencer: работа с блогерами',
    'B2B продажи и маркетинг',
    'Искусство копирайтинга',
  ],
}

const levels = [Level.BEGINNER, Level.INTERMEDIATE, Level.ADVANCED]

// Strict allowed types without ORDERING and FILL_GAPS
const allowedStepTypes = [
  StepType.TEXT,
  StepType.VIDEO,
  StepType.TEST_SINGLE,
  StepType.TEST_MULTIPLE,
  StepType.MATCHING,
  StepType.INPUT_TEXT,
  StepType.INPUT_NUMBER,
  StepType.FREE_TEXT,
]

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

// Генарация содержимого шага в зависимости от его типа
function generateStepContent(type: StepType, stepIndex: number) {
  switch (type) {
    case StepType.TEXT:
      return createTextContent(
        `<h2>Теория: Шаг ${stepIndex}</h2><p>Полезный текст для изучения важных концепций в рамках данного курса.</p>`,
      )
    case StepType.VIDEO:
      return createVideoContent('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    case StepType.TEST_SINGLE:
      return createTestSingleContent(`Выберите один правильный ответ (${stepIndex}):`, [
        { id: '1', text: 'Неправильно', isCorrect: false },
        { id: '2', text: 'Правильно', isCorrect: true },
        { id: '3', text: 'Тоже нет', isCorrect: false },
      ])
    case StepType.TEST_MULTIPLE:
      return createTestMultipleContent(`Выберите несколько правильных вариантов (${stepIndex}):`, [
        { id: '1', text: 'Вариант 1 (Да)', isCorrect: true },
        { id: '2', text: 'Вариант 2 (Нет)', isCorrect: false },
        { id: '3', text: 'Вариант 3 (Да)', isCorrect: true },
        { id: '4', text: 'Вариант 4 (Нет)', isCorrect: false },
      ])
    case StepType.MATCHING:
      return createMatchingContent([
        { leftId: 'l1', leftContent: 'Термин А', rightId: 'r1', rightContent: 'Определение А' },
        { leftId: 'l2', leftContent: 'Термин Б', rightId: 'r2', rightContent: 'Определение Б' },
        { leftId: 'l3', leftContent: 'Термин В', rightId: 'r3', rightContent: 'Определение В' },
      ])
    case StepType.INPUT_TEXT:
      return createInputTextContent('Напиши слово "test" с маленькой буквы:', ['test', 'Test'])
    case StepType.INPUT_NUMBER:
      return createInputNumberContent(`Сколько будет ${stepIndex} + 2?`, stepIndex + 2)
    case StepType.FREE_TEXT:
      return createFreeTextContent('Напиши эссе на тему этого урока (минимум 50 слов).', 10)
    default:
      return createTextContent('<p>Fallback content</p>')
  }
}

async function main() {
  console.log('🌱 Start generating massive seed data programmatically...')

  // Очистка перед заполнением
  await db.userProgress.deleteMany()
  await db.enrollment.deleteMany()
  await db.step.deleteMany()
  await db.lesson.deleteMany()
  await db.module.deleteMany()
  await db.course.deleteMany()

  // 4 категории
  for (const cat of categories) {
    const topics = categoryTopics[cat]

    // 8 курсов в каждой категории (4 * 8 = 32 курса)
    for (let i = 0; i < 8; i++) {
      const title = topics[i] || `${cat.toUpperCase()} Course ${i + 1}`
      const course = await db.course.create({
        data: {
          title: title,
          description: `Подробный курс по "${title}" в категории ${cat}.`,
          price: Math.floor(Math.random() * 20) * 1000,
          duration: `${Math.floor(Math.random() * 40) + 10} часов`,
          level: getRandomItem(levels),
          category: cat,
        },
      })

      // Несколько модулей в курсе (4 модуля)
      for (let m = 0; m < 4; m++) {
        const module = await db.module.create({
          data: {
            title: `Модуль ${m + 1}: Глубокое погружение`,
            order: m,
            courseId: course.id,
          },
        })

        // Несколько уроков в модуле (3 урока)
        for (let l = 0; l < 3; l++) {
          const lesson = await db.lesson.create({
            data: {
              title: `Урок ${l + 1}: Практика и теория`,
              order: l,
              moduleId: module.id,
            },
          })

          // Несколько шагов в уроке (5 шагов), каждый шаг случайного (НО РАЗРЕШЕННОГО) типа
          for (let s = 0; s < 5; s++) {
            const stepType = getRandomItem(allowedStepTypes)
            await db.step.create({
              data: {
                title: `Шаг ${s + 1} (${stepType})`,
                order: s,
                type: stepType,
                content: generateStepContent(stepType, s),
                lessonId: lesson.id,
              },
            })
          }
        }
      }
      console.log(`✅ Created course: ${course.title} (${cat})`)
    }
  }

  console.log(
    `🚀 Done! Created 32 courses across 4 categories (No ORDERING, No FILL_GAPS). Richly nested with steps.`,
  )
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
