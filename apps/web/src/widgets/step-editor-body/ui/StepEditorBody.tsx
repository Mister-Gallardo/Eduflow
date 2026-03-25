import type { EditorStepType } from '@eduflow/shared'
import { Box, Chip, TextField, Typography } from '@mui/material'
import { useCallback, useState } from 'react'

import { useCourseEditorContext } from '@/entities/course-editor'
import {
  EditFreeTextStep,
  EditInputNumberStep,
  EditInputTextStep,
  EditMatchingStep,
  EditTestStep,
  EditTextStep,
  EditVideoStep,
  useMatchingStepForm,
  useTestStepForm,
  useTextStepForm,
} from '@/features/edit-step'

// ─── Step Type Labels ───

const STEP_TYPE_LABELS: Record<EditorStepType, string> = {
  TEXT: 'Текст',
  VIDEO: 'Видео',
  TEST_SINGLE: 'Тест (один)',
  TEST_MULTIPLE: 'Тест (несколько)',
  MATCHING: 'Соответствие',
  INPUT_TEXT: 'Ввод текста',
  INPUT_NUMBER: 'Ввод числа',
  FREE_TEXT: 'Свободный ответ',
}

// ─── Main Component ───

export const StepEditorBody = () => {
  const { selectedStep, updateStep } = useCourseEditorContext()

  if (!selectedStep) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          py: 8,
          color: 'text.secondary',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Выберите шаг
        </Typography>
        <Typography variant="body2">Выберите шаг в структуре курса или создайте новый</Typography>
      </Box>
    )
  }

  return <StepEditorForm key={selectedStep.id} step={selectedStep} onUpdate={updateStep} />
}

// ─── Step Editor Form ───

interface StepEditorFormProps {
  step: { id: string; title: string; type: string; content: unknown }
  onUpdate: (
    stepId: string,
    data: { title?: string; content?: Record<string, unknown> },
  ) => Promise<void>
}

const StepEditorForm = ({ step, onUpdate }: StepEditorFormProps) => {
  const [title, setTitle] = useState(step.title)

  const handleTitleBlur = useCallback(() => {
    if (title !== step.title && title.trim()) {
      void onUpdate(step.id, { title: title.trim() })
    }
  }, [title, step.title, step.id, onUpdate])

  const handleContentSave = useCallback(
    (content: Record<string, unknown>) => {
      void onUpdate(step.id, { content })
    },
    [step.id, onUpdate],
  )

  return (
    <Box sx={{ py: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Step Type Badge */}
      <Chip
        label={STEP_TYPE_LABELS[step.type as EditorStepType] ?? step.type}
        size="small"
        sx={{
          alignSelf: 'flex-start',
          fontWeight: 600,
          fontSize: 11,
          letterSpacing: '0.03em',
        }}
      />

      {/* Title */}
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handleTitleBlur}
        placeholder="Название шага"
        variant="standard"
        fullWidth
        slotProps={{
          input: {
            disableUnderline: true,
            sx: {
              fontSize: 20,
              fontWeight: 700,
              '&:hover': { borderBottom: '1px solid', borderColor: 'divider' },
              '&.Mui-focused': { borderBottom: '2px solid', borderColor: 'primary.main' },
            },
          },
        }}
      />

      {/* Content Editor by Type */}
      <StepContentEditor
        type={step.type as EditorStepType}
        content={step.content as Record<string, unknown> | null}
        onSave={handleContentSave}
      />
    </Box>
  )
}

// ─── Content Editor Switch ───

interface StepContentEditorProps {
  type: EditorStepType
  content: Record<string, unknown> | null
  onSave: (content: Record<string, unknown>) => void
}

const StepContentEditor = ({ type, content, onSave }: StepContentEditorProps) => {
  switch (type) {
    case 'TEXT':
      return <TextEditor content={content} onSave={onSave} />
    case 'VIDEO':
      return <VideoEditor content={content} onSave={onSave} />
    case 'TEST_SINGLE':
    case 'TEST_MULTIPLE':
      return <TestEditor testType={type} content={content} onSave={onSave} />
    case 'MATCHING':
      return <MatchingEditor content={content} onSave={onSave} />
    case 'INPUT_TEXT':
      return <InputTextEditor content={content} onSave={onSave} />
    case 'INPUT_NUMBER':
      return <InputNumberEditor content={content} onSave={onSave} />
    case 'FREE_TEXT':
      return <FreeTextEditor content={content} onSave={onSave} />
    default:
      return (
        <Typography variant="body2" color="error">
          Тип «{type}» не поддерживается
        </Typography>
      )
  }
}

// ─── Individual Editors ───

interface EditorProps {
  content: Record<string, unknown> | null
  onSave: (content: Record<string, unknown>) => void
}

const TextEditor = ({ content, onSave }: EditorProps) => {
  const { html, setHtml } = useTextStepForm((content as { html?: string } | null)?.html ?? '')

  const handleBlur = () => {
    onSave({ html })
  }

  return (
    <Box onBlur={handleBlur}>
      <EditTextStep html={html} onChange={setHtml} />
    </Box>
  )
}

const VideoEditor = ({ content, onSave }: EditorProps) => {
  const [url, setUrl] = useState((content as { url?: string } | null)?.url ?? '')

  const handleBlur = () => {
    onSave({ url })
  }

  return (
    <Box onBlur={handleBlur}>
      <EditVideoStep url={url} onChange={setUrl} />
    </Box>
  )
}

const TestEditor = ({
  testType,
  content,
  onSave,
}: EditorProps & { testType: 'TEST_SINGLE' | 'TEST_MULTIPLE' }) => {
  const typedContent = content as {
    question?: string
    options?: { id: string; text: string; isCorrect?: boolean }[]
    correctOptionId?: string
    correctOptionIds?: string[]
  } | null

  const initialOptions = typedContent?.options?.map((o) => ({
    id: o.id,
    text: o.text,
    isCorrect:
      o.isCorrect ??
      (testType === 'TEST_SINGLE'
        ? o.id === typedContent?.correctOptionId
        : (typedContent?.correctOptionIds?.includes(o.id) ?? false)),
  }))

  const form = useTestStepForm({
    question: typedContent?.question ?? '',
    options: initialOptions,
  })

  const handleSave = () => {
    onSave(form.getContent(testType))
  }

  return (
    <Box onBlur={handleSave}>
      <EditTestStep
        testType={testType}
        question={form.question}
        options={form.options}
        onQuestionChange={form.setQuestion}
        onAddOption={form.addOption}
        onRemoveOption={form.removeOption}
        onUpdateOptionText={form.updateOptionText}
        onToggleCorrect={testType === 'TEST_SINGLE' ? form.toggleCorrectSingle : form.toggleCorrect}
      />
    </Box>
  )
}

const MatchingEditor = ({ content, onSave }: EditorProps) => {
  const typedContent = content as {
    left?: { id: string; content: string }[]
    right?: { id: string; content: string }[]
    pairs?: { leftId: string; rightId: string }[]
  } | null

  const initialPairs = typedContent?.pairs?.map((pair) => ({
    id: pair.leftId.replace('left-', ''),
    left: typedContent.left?.find((l) => l.id === pair.leftId)?.content ?? '',
    right: typedContent.right?.find((r) => r.id === pair.rightId)?.content ?? '',
  }))

  const form = useMatchingStepForm(initialPairs)

  const handleSave = () => {
    onSave(form.getContent())
  }

  return (
    <Box onBlur={handleSave}>
      <EditMatchingStep
        pairs={form.pairs}
        onAddPair={form.addPair}
        onRemovePair={form.removePair}
        onUpdateLeft={form.updatePairLeft}
        onUpdateRight={form.updatePairRight}
      />
    </Box>
  )
}

const InputTextEditor = ({ content, onSave }: EditorProps) => {
  const typedContent = content as {
    question?: string
    correctAnswers?: string[]
  } | null

  const [question, setQuestion] = useState(typedContent?.question ?? '')
  const [answers, setAnswers] = useState<string[]>(typedContent?.correctAnswers ?? [''])

  const handleSave = () => {
    onSave({ question, correctAnswers: answers.filter(Boolean) })
  }

  return (
    <Box onBlur={handleSave}>
      <EditInputTextStep
        question={question}
        correctAnswers={answers}
        onQuestionChange={setQuestion}
        onAddAnswer={() => setAnswers((prev) => [...prev, ''])}
        onRemoveAnswer={(index) => setAnswers((prev) => prev.filter((_, i) => i !== index))}
        onUpdateAnswer={(index, value) =>
          setAnswers((prev) => prev.map((a, i) => (i === index ? value : a)))
        }
      />
    </Box>
  )
}

const InputNumberEditor = ({ content, onSave }: EditorProps) => {
  const typedContent = content as {
    question?: string
    correctAnswer?: number
  } | null

  const [question, setQuestion] = useState(typedContent?.question ?? '')
  const [answer, setAnswer] = useState(String(typedContent?.correctAnswer ?? ''))

  const handleSave = () => {
    onSave({ question, correctAnswer: Number(answer) })
  }

  return (
    <Box onBlur={handleSave}>
      <EditInputNumberStep
        question={question}
        correctAnswer={answer}
        onQuestionChange={setQuestion}
        onAnswerChange={setAnswer}
      />
    </Box>
  )
}

const FreeTextEditor = ({ content, onSave }: EditorProps) => {
  const typedContent = content as {
    question?: string
    minLength?: number
  } | null

  const [question, setQuestion] = useState(typedContent?.question ?? '')
  const [minLength, setMinLength] = useState(String(typedContent?.minLength ?? ''))

  const handleSave = () => {
    onSave({
      question,
      minLength: minLength ? Number(minLength) : 0,
    })
  }

  return (
    <Box onBlur={handleSave}>
      <EditFreeTextStep
        question={question}
        minLength={minLength}
        onQuestionChange={setQuestion}
        onMinLengthChange={setMinLength}
      />
    </Box>
  )
}
