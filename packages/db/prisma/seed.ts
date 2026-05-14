import { Category, db, Level, StepType } from '../src/index.js'
import argon2 from 'argon2'

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

// 10. ORDERING
const createOrderingContent = (items: { id: string; content: string }[]) => ({
  items,
  correctOrder: items.map((i) => i.id),
})

// 11. FILL_GAPS
const createFillGapsContent = (
  text: string,
  gaps: { id: string; type: 'text'; correctAnswer: string }[],
) => ({
  text,
  gaps,
})

// --- Data Definitions ---

const categories = [Category.DEVELOPMENT, Category.DESIGN, Category.ANALYTICS, Category.MARKETING]

const categoryTopics: Record<string, string[]> = {
  DEVELOPMENT: [
    'Frontend: React 19 Mastery',
    'Backend Node.js & NestJS',
    'Go для высоконагруженных систем',
    'Python: от основ до ООП',
    'Мобильная разработка: React Native',
    'Архитектура ПО: System Design',
    'DevOps и CI/CD: Базовый курс',
    'Продвинутый TypeScript',
  ],
  DESIGN: [
    'Основы UI/UX Дизайна',
    'Типографика как искусство',
    'Теория цвета и композиция',
    'Figma: от новичка до профи',
    '3D моделирование в Blender',
    'Айдентика и создание брендинга',
    'Основы веб-анимации',
    'Паттерны мобильного дизайна',
  ],
  ANALYTICS: [
    'Основы SQL для аналитиков',
    'Python в Data Science (Pandas)',
    'Машинное обучение Data Science',
    'A/B тестирование',
    'Продуктовые метрики',
    'Углубленная визуализация данных',
    'Инженерия больших данных',
    'Спортивная аналитика',
  ],
  MARKETING: [
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

const REACT_19_MASTERY_TITLE = 'Frontend: React 19 Mastery'
const REACT_19_MODULE_TITLES = [
  'React 19 в production-приложениях',
  'Архитектурные решения',
  'Глубокое погружение',
  'Закрепляем навыки',
  'Проектные задания',
]
const REACT_19_MATCHING_SHOWCASE = {
  moduleIndex: 1,
  lessonIndex: 1,
  stepIndex: 0,
}

const levels = [Level.BEGINNER, Level.INTERMEDIATE, Level.ADVANCED]

// Все типы шагов
const allowedStepTypes = [
  StepType.TEXT,
  StepType.VIDEO,
  StepType.TEST_SINGLE,
  StepType.TEST_MULTIPLE,
  StepType.MATCHING,
  StepType.ORDERING,
  StepType.INPUT_TEXT,
  StepType.INPUT_NUMBER,
  StepType.FREE_TEXT,
  StepType.FILL_GAPS,
]

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function createReact19MasteryIntroContent() {
  return createTextContent(`
<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 420'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%23141a2f'/%3E%3Cstop offset='52%25' stop-color='%231f3b57'/%3E%3Cstop offset='100%25' stop-color='%230f766e'/%3E%3C/linearGradient%3E%3Cfilter id='soft'%3E%3CfeGaussianBlur stdDeviation='24'/%3E%3C/filter%3E%3C/defs%3E%3Crect width='1200' height='420' rx='28' fill='url(%23bg)'/%3E%3Cg opacity='.72' filter='url(%23soft)'%3E%3Ccircle cx='210' cy='96' r='86' fill='%2361dafb'/%3E%3Ccircle cx='1010' cy='325' r='128' fill='%2334d399'/%3E%3C/g%3E%3Cg fill='none' stroke='%2361dafb' stroke-width='5' opacity='.88' transform='translate(600 208)'%3E%3Cellipse rx='184' ry='54'/%3E%3Cellipse rx='184' ry='54' transform='rotate(60)'/%3E%3Cellipse rx='184' ry='54' transform='rotate(120)'/%3E%3Ccircle r='15' fill='%2361dafb' stroke='none'/%3E%3C/g%3E%3Ctext x='82' y='112' fill='%23ffffff' font-family='Inter,Arial,sans-serif' font-size='58' font-weight='800'%3EReact 19 Mastery%3C/text%3E%3Ctext x='82' y='174' fill='%23dbeafe' font-family='Inter,Arial,sans-serif' font-size='28'%3EActions, Server Components, optimistic UI%3C/text%3E%3Cg transform='translate(82 246)' fill='%23ffffff' font-family='Inter,Arial,sans-serif'%3E%3Crect width='284' height='78' rx='18' fill='rgba(255,255,255,.14)' stroke='rgba(255,255,255,.32)'/%3E%3Ctext x='28' y='32' font-size='18' opacity='.8'%3EProduction focus%3C/text%3E%3Ctext x='28' y='58' font-size='26' font-weight='700'%3EReact 19%3C/text%3E%3C/g%3E%3Cg transform='translate(846 76)' fill='%23ffffff' font-family='Inter,Arial,sans-serif'%3E%3Crect width='272' height='258' rx='22' fill='rgba(15,23,42,.55)' stroke='rgba(255,255,255,.24)'/%3E%3Ctext x='28' y='52' font-size='22' font-weight='700'%3ELesson map%3C/text%3E%3Ctext x='28' y='96' font-size='17' fill='%23bfdbfe'%3E01 Mental model%3C/text%3E%3Ctext x='28' y='134' font-size='17' fill='%23a7f3d0'%3E02 Actions%3C/text%3E%3Ctext x='28' y='172' font-size='17' fill='%23fde68a'%3E03 Streaming UI%3C/text%3E%3Ctext x='28' y='210' font-size='17' fill='%23fecaca'%3E04 Production patterns%3C/text%3E%3C/g%3E%3C/svg%3E" alt="Визуальная схема курса React 19 Mastery" />

<h1>React 19: современный фронтенд без лишнего шума</h1>

<p>
  Добро пожаловать в первый урок курса <strong>Frontend: React 19 Mastery</strong>. Здесь мы
  начинаем не с абстрактных определений, а с рабочей картины: как React 19 помогает строить
  интерфейсы, где данные, формы, серверные операции и оптимистичные обновления связаны в один
  понятный поток.
</p>

<blockquote>
  Цель урока: научиться смотреть на компонент не как на набор обработчиков, а как на экран,
  который уверенно проходит через состояния ожидания, успеха, ошибки и обновления данных.
</blockquote>

<h2>Что изменилось в мышлении React-разработчика</h2>

<p>
  React 19 усиливает подход, где пользовательское действие становится центральной единицей
  интерфейса. Вместо ручного склеивания <code>loading</code>, <code>error</code> и
  <code>submit</code>-логики мы проектируем действие, а UI естественно отражает его состояние.
</p>

<ul>
  <li><strong>Actions</strong> описывают мутацию данных как часть пользовательского сценария.</li>
  <li><strong>useActionState</strong> помогает хранить результат отправки формы рядом с UI.</li>
  <li><strong>useOptimistic</strong> делает интерфейс быстрым даже до ответа сервера.</li>
  <li><strong>use</strong> упрощает чтение асинхронных ресурсов в компонентах и связке с Suspense.</li>
</ul>

<h2>Мини-кейс урока: форма публикации комментария</h2>

<p>
  Представим реальный продукт: студент оставляет комментарий к уроку, видит его мгновенно,
  а приложение аккуратно синхронизирует состояние с сервером. Такой сценарий встречается в
  LMS, CRM, маркетплейсах, кабинетах аналитики и почти любом SaaS-интерфейсе.
</p>

<pre><code>function CommentForm({ addComment }) {
  const [state, formAction, isPending] = useActionState(addComment, {
    status: 'idle',
    message: '',
  })

  return (
    &lt;form action={formAction}&gt;
      &lt;textarea name="text" placeholder="Ваш вопрос по уроку" /&gt;
      &lt;button disabled={isPending}&gt;
        {isPending ? 'Отправляем...' : 'Опубликовать'}
      &lt;/button&gt;
      {state.message &amp;&amp; &lt;p&gt;{state.message}&lt;/p&gt;}
    &lt;/form&gt;
  )
}</code></pre>

<h3>Как читать этот пример</h3>

<ol>
  <li>Форма вызывает <code>formAction</code>, а не отдельный обработчик с ручным контролем событий.</li>
  <li><code>isPending</code> показывает, что действие выполняется прямо сейчас.</li>
  <li><code>state</code> хранит понятный результат: сообщение об успехе, ошибку или данные ответа.</li>
  <li>Компонент остается декларативным: он описывает экран, а не микроменеджит каждую фазу запроса.</li>
</ol>

<h2>Практический ориентир</h2>

<p>
  В этом модуле мы соберем основу production-подхода: формы, оптимистичные обновления,
  границы ожидания, серверные данные и типизированные сценарии. После урока вы сможете
  объяснить, почему React 19 делает сложные интерфейсы проще поддерживать, и где его новые
  возможности реально экономят код.
</p>

<p>
  Для сверки с первоисточником держите под рукой
  <a href="https://react.dev/blog/2024/12/05/react-19" target="_blank" rel="noreferrer">обзор React 19</a>
  и обращайте внимание не только на API, но и на продуктовые сценарии, которые эти API закрывают.
</p>
`)
}

function createReact19MatchingShowcaseContent() {
  return createMatchingContent([
    {
      leftId: 'concept-actions',
      leftContent: 'Actions в React 19',
      rightId: 'purpose-actions',
      rightContent: 'Описывают мутацию данных как часть пользовательского сценария формы.',
    },
    {
      leftId: 'concept-action-state',
      leftContent: 'useActionState',
      rightId: 'purpose-action-state',
      rightContent: 'Возвращает состояние результата, action-функцию и pending-флаг для UI.',
    },
    {
      leftId: 'concept-optimistic',
      leftContent: 'useOptimistic',
      rightId: 'purpose-optimistic',
      rightContent: 'Показывает ожидаемый результат сразу, пока сервер подтверждает изменение.',
    },
    {
      leftId: 'concept-suspense',
      leftContent: 'Suspense boundary',
      rightId: 'purpose-suspense',
      rightContent: 'Изолирует ожидание данных и оставляет остальную страницу отзывчивой.',
    },
    {
      leftId: 'concept-server-component',
      leftContent: 'Server Component',
      rightId: 'purpose-server-component',
      rightContent: 'Загружает данные ближе к серверу и не добавляет лишний JavaScript в клиент.',
    },
    {
      leftId: 'concept-transition',
      leftContent: 'startTransition',
      rightId: 'purpose-transition',
      rightContent: 'Помечает некритичное обновление, чтобы ввод и клики оставались плавными.',
    },
  ])
}

function getModuleCount(courseTitle: string) {
  return courseTitle === REACT_19_MASTERY_TITLE ? REACT_19_MODULE_TITLES.length : 4
}

function getModuleTitle(courseTitle: string, moduleIndex: number) {
  if (courseTitle === REACT_19_MASTERY_TITLE) {
    return REACT_19_MODULE_TITLES[moduleIndex] ?? `Модуль ${moduleIndex + 1}: React 19`
  }

  return `Модуль ${moduleIndex + 1}: Глубокое погружение`
}

function getLessonTitle(courseTitle: string, moduleIndex: number, lessonIndex: number) {
  if (courseTitle === REACT_19_MASTERY_TITLE && moduleIndex === 0 && lessonIndex === 0) {
    return 'Урок 1: Actions, формы и новая ментальная модель UI'
  }

  if (courseTitle === REACT_19_MASTERY_TITLE && moduleIndex === 0 && lessonIndex === 1) {
    return 'Урок 2: Функциональные компоненты и хуки'
  }

  if (courseTitle === REACT_19_MASTERY_TITLE && moduleIndex === 1 && lessonIndex === 0) {
    return 'Урок 1: Границы ответственности компонентов'
  }

  if (courseTitle === REACT_19_MASTERY_TITLE && moduleIndex === 1 && lessonIndex === 1) {
    return 'Урок 2: Сопоставляем API и production-сценарии'
  }

  return `Урок ${lessonIndex + 1}: Практика и теория`
}

function getCourseDescription(title: string, category: Category) {
  if (title === REACT_19_MASTERY_TITLE) {
    return 'Продвинутый практический курс по React 19: Actions, Server Components, Suspense, оптимистичные интерфейсы и production-паттерны для современных фронтенд-команд.'
  }

  return `Подробный курс по "${title}" в категории ${category}.`
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
    case StepType.ORDERING:
      return createOrderingContent([
        { id: 'o1', content: 'Первый этап' },
        { id: 'o2', content: 'Второй этап' },
        { id: 'o3', content: 'Третий этап' },
        { id: 'o4', content: 'Четвёртый этап' },
      ])
    case StepType.FILL_GAPS:
      return createFillGapsContent(
        'Язык программирования {{gap-1}} был создан компанией {{gap-2}} в {{gap-3}} году.',
        [
          { id: 'gap-1', type: 'text', correctAnswer: 'JavaScript' },
          { id: 'gap-2', type: 'text', correctAnswer: 'Netscape' },
          { id: 'gap-3', type: 'text', correctAnswer: '1995' },
        ],
      )
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

  const passwordHash = async (password: string) =>
    await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 19456,
      timeCost: 2,
      parallelism: 1,
    })

  const teacherData = [
    { email: 'name1@mail.ru', fullName: 'Name1', password: 'Pass12345', role: 'TEACHER' as const },
    { email: 'name2@mail.ru', fullName: 'Name2', password: 'Pass12345', role: 'TEACHER' as const },
    { email: 'name3@mail.ru', fullName: 'Name3', password: 'Pass12345', role: 'TEACHER' as const },
  ]

  const teacherUsers = await Promise.all(
    teacherData.map(async ({ password, ...data }) =>
      db.user.upsert({
        where: { email: data.email },
        update: {},
        create: { ...data, passwordHash: await passwordHash(password) },
      }),
    ),
  )

  // 4 категории
  for (const cat of categories) {
    const topics = categoryTopics[cat]

    // 8 курсов в каждой категории (4 * 8 = 32 курса)
    for (let i = 0; i < 8; i++) {
      const title = topics[i] || `${cat.toUpperCase()} Course ${i + 1}`
      const course = await db.course.create({
        data: {
          title: title,
          description: getCourseDescription(title, cat),
          price: title === REACT_19_MASTERY_TITLE ? 24900 : Math.floor(Math.random() * 20) * 1000,
          duration: title === REACT_19_MASTERY_TITLE ? 42 : Math.floor(Math.random() * 40) + 10,
          level: title === REACT_19_MASTERY_TITLE ? Level.ADVANCED : getRandomItem(levels),
          category: cat,
          authorId: teacherUsers[0].id,
        },
      })

      // Несколько модулей в курсе
      for (let m = 0; m < getModuleCount(title); m++) {
        const module = await db.module.create({
          data: {
            title: getModuleTitle(title, m),
            order: m,
            courseId: course.id,
          },
        })

        // Несколько уроков в модуле (3 урока)
        for (let l = 0; l < 3; l++) {
          const lesson = await db.lesson.create({
            data: {
              title: getLessonTitle(title, m, l),
              order: l,
              moduleId: module.id,
            },
          })

          // Несколько шагов в уроке (5 шагов), каждый шаг случайного (НО РАЗРЕШЕННОГО) типа
          for (let s = 0; s < 5; s++) {
            const isReact19ShowcaseStep =
              title === REACT_19_MASTERY_TITLE && m === 0 && l === 0 && s === 0
            const isReact19MatchingShowcaseStep =
              title === REACT_19_MASTERY_TITLE &&
              m === REACT_19_MATCHING_SHOWCASE.moduleIndex &&
              l === REACT_19_MATCHING_SHOWCASE.lessonIndex &&
              s === REACT_19_MATCHING_SHOWCASE.stepIndex
            const stepType = isReact19ShowcaseStep
              ? StepType.TEXT
              : isReact19MatchingShowcaseStep
                ? StepType.MATCHING
                : getRandomItem(allowedStepTypes)

            await db.step.create({
              data: {
                title: isReact19ShowcaseStep
                  ? 'Шаг 1: Большая картина React 19'
                  : isReact19MatchingShowcaseStep
                    ? 'Шаг 1: Сопоставьте API React 19 с production-сценарием'
                    : `Шаг ${s + 1} (${stepType})`,
                order: s,
                type: stepType,
                content: isReact19ShowcaseStep
                  ? createReact19MasteryIntroContent()
                  : isReact19MatchingShowcaseStep
                    ? createReact19MatchingShowcaseContent()
                    : generateStepContent(stepType, s),
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
    `🚀 Done! Created 32 courses across 4 categories (all step types). Richly nested with steps.`,
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
