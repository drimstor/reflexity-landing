import axios from 'axios'
import Button from 'components/UI-kit/Buttons/Button'
import Input from 'components/UI-kit/Input/Input'
import useValidation from 'hooks/useValidatiton/useValidation'
import React, { useEffect, useState } from 'react'
import { inputsValues } from './constants'
import styles from './ContactModal.module.scss'
import Checkbox from 'components/UI-kit/Checkbox/Checkbox'
import Link from 'next/link'
import ButtonLoader from 'components/UI-kit/Loaders/ButtonLoader'
import Snackbar from 'components/UI-kit/Notifications/Snackbar/Snackbar'

const ContactModal = () => {
  const [error, setError] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSnackbar, setShowSnackbar] = useState(false)
  const { runCheck, isCheckError, checkValidate, isNoError, formFields } =
    useValidation()

  const handleSendTelegramMessage = async (args: any) => {
    // await axios.post('/api/addUser', args)
    const text = `Новая заявка:
Сайт - ${args.site}
Почта - ${args.email}
Телеграм - ${args.nickname}
Описание продукта - ${args.description}`

    const telegramBotToken = '8265187193:AAH5-oIji2WJY92HSbGWY3VPnboNOByyuYM'

    const apiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`
    // Попробуйте использовать username канала вместо ID
    // Замените @your_channel_username на реальный username вашего канала
    const payload = { chat_id: '-1003101579495', text }
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
