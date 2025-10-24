import axios from 'axios'
import Button from 'components/UI-kit/Buttons/Button'
import Checkbox from 'components/UI-kit/Checkbox/Checkbox'
import Input from 'components/UI-kit/Input/Input'
import ButtonLoader from 'components/UI-kit/Loaders/ButtonLoader'
import Snackbar from 'components/UI-kit/Notifications/Snackbar/Snackbar'
import useValidation from 'hooks/useValidatiton/useValidation'
import { useEffect, useState } from 'react'
import { inputsValues } from './constants'
import styles from './ContactModal.module.scss'

const ContactModal = () => {
  const [error, setError] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const { runCheck, isCheckError, checkValidate, isNoError, formFields } =
    useValidation()

  const handleSendTelegramMessage = async (args: any) => {
    const text = `Новая заявка:
Сайт - ${args.site}
Почта - ${args.email}
Телеграм - ${args.nickname}
Описание продукта - ${args.description}`

    const telegramBotToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
    const telegramChatId = process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_ID

    const apiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`
    const payload = { chat_id: telegramChatId, text }
    await axios
      .post(apiUrl, payload)
      .then(
        () => setError(''),
        (error) => setError(error.message)
      )
      .finally(() => {
        setIsLoading(false)
        setShowSnackbar(true)
      })
  }

  // const fetchUsers = async () => {
  //   const response = await axios.get('/api/getUsers')
  // }

  const onSubmitHandler = (e: any) => {
    e.preventDefault()
    runCheck()
  }

  useEffect(() => {
    if (isNoError) {
      const site = formFields['0']
      const email = formFields['1']
      const nickname = formFields['2']
      const description = formFields['3']
      const date = new Date().toISOString().replace('T', ' ').split('.')[0]
      handleSendTelegramMessage({ site, email, nickname, description, date })
      setIsLoading(true)
    }
  }, [isNoError])

  useEffect(() => {
    if (showSnackbar) {
      setTimeout(() => setShowSnackbar(false), 5000)
    }
  }, [showSnackbar])

  const [isChecked, setIsChecked] = useState(false)

  return (
    <>
      {showSnackbar && (
        <Snackbar
          value='Спасибо за обращение. Наши операторы скоро свяжутся с вами.'
          isReject={error ?? ''}
        />
      )}
      <div className={styles.modalBox}>
        <h3>Подать заявку</h3>
        <form onSubmit={onSubmitHandler}>
          {inputsValues.map((input, key) => (
            <Input
              key={key}
              multiline={key === 3}
              label={input.label}
              placeholder={input.placeholder}
              type={input.type}
              validation={input.validation}
              isCheckError={isCheckError}
              checkValidate={checkValidate}
              name={String(key)}
              isNoError={isNoError}
              error={error}
            />
          ))}
          <div className={styles.privacyPoliсy}>
            <Checkbox
              isChecked={isChecked}
              onChange={setIsChecked}
              title={
                <>
                  Я принимаю правила{' '}
                  <a target='_blank' href='/terms'>
                    пользования сайтом
                  </a>{' '}
                  и
                  <a target='_blank' href='/privacy'>
                    {' '}
                    политику обработки персональных данных
                  </a>
                </>
              }
            />
          </div>
          <Button
            variant='contained'
            size='medium'
            typeSubmit
            fullWidth
            disabled={!isChecked}
          >
            {isLoading ? <ButtonLoader /> : 'Присоединиться'}
          </Button>
        </form>
      </div>
    </>
  )
}

export default ContactModal
