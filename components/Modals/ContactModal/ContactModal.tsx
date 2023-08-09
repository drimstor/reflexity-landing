import axios from 'axios'
import Button from 'components/UI-kit/Buttons/Button'
import Input from 'components/UI-kit/Input/Input'
import React, { FormEvent } from 'react'
import { inputsValues } from './constants'
import styles from './ContactModal.module.scss'

const ContactModal = () => {
  const handleSendTelegramMessage = async (args: any) => {
    // await axios.post('/api/addUser', args)
    const text = `Новая заявка: 
  
Сайт - ${args.site}
Почта - ${args.email}
Ник в телеграм - ${args.nickname}
Описание продукта - ${args.description}`

    const telegramBotToken = '6471286629:AAGE74rskDfOtA-ukKd59X6BisBND4W1drk'
    const apiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`
    const payload = { chat_id: 558687674, text }
    await axios.post(apiUrl, payload)
  }

  const onSubmitHandler = (event: any) => {
    event.preventDefault()
    const site = String(event.target[0].value)
    const email = String(event.target[1].value)
    const nickname = String(event.target[2].value)
    const description = String(event.target[3].value)
    const date = new Date().toISOString().replace('T', ' ').split('.')[0]
    handleSendTelegramMessage({ site, email, nickname, description, date })
  }

  // const fetchUsers = async () => {
  //   const response = await axios.get('/api/getUsers')
  // }

  return (
    <div className={styles.modalBox}>
      <h3>Подать заявку</h3>
      <form onSubmit={onSubmitHandler}>
        {inputsValues.map((input, key) => (
          <Input
            key={key}
            title={input.title}
            isTextArea={key === 3}
            name={key}
          />
        ))}
        <Button variant='contained' size='medium' typeSubmit fullWidth>
          Присоединиться
        </Button>
      </form>
    </div>
  )
}

export default ContactModal
