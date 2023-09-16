import axios from 'axios'
import Button from 'components/UI-kit/Buttons/Button'
import Input from 'components/UI-kit/Input/Input'
import ThankYouSnackbar from 'components/UI-kit/Notifications/ThankYouSnackbar/ThankYouSnackbar'
import useValidation from 'hooks/useValidatiton/useValidation'
import React, { useEffect, useState } from 'react'
import { inputsValues } from './constants'
import styles from './ContactModal.module.scss'
import Checkbox from 'components/UI-kit/Checkbox/Checkbox'
import Link from 'next/link'
import ButtonLoader from 'components/UI-kit/Loaders/ButtonLoader'

const ContactModal = () => {
  const [error, setError] = useState<null | string>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showThankYouSnackbar, setShowThankYouSnackbar] = useState(false)
  const { runCheck, isCheckError, checkValidate, isNoError, formFields } =
    useValidation()

  const handleSendTelegramMessage = async (args: any) => {
    // await axios.post('/api/addUser', args)
    const text = `Новая заявка:
  Сайт - ${args.site}
  Почта - ${args.email}
  Ник в телеграм - ${args.nickname}
  Описание продукта - ${args.description}`

    const telegramBotToken = '6471286629:AAGE74rskDfOtA-ukKd59X6BisBND4W1drk'
    const apiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`
    const payload = { chat_id: -1001920591192, text }
    await axios
      .post(apiUrl, payload)
      .then(
        () => setError(''),
        (error) => setError(error.message)
      )
      .finally(() => {
        setIsLoading(false)
        setShowThankYouSnackbar(true)
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
    if (showThankYouSnackbar) {
      setTimeout(() => setShowThankYouSnackbar(false), 5000)
    }
  }, [showThankYouSnackbar])

  const [isChecked, setIsChecked] = useState(false)

  return (
    <>
      {showThankYouSnackbar && <ThankYouSnackbar isReject={error ?? ''} />}
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
