import axios from 'axios'
import Button from 'components/UI-kit/Buttons/Button'
import Input from 'components/UI-kit/Input/Input'
import React, { FormEvent } from 'react'
import { inputsValues } from './constants'
import styles from './ContactModal.module.scss'

const ContactModal = () => {
  const handleAddUser = async (args: any) => {
    await axios.post('/api/addUser', args)
  }

  const onSubmitHandler = (event: any) => {
    event.preventDefault()
    const site = event.target[0].value
    const email = event.target[1].value
    const nickname = event.target[2].value
    const description = event.target[3].value
    const date = new Date().toISOString().replace('T', ' ').split('.')[0]
    handleAddUser({ site, email, nickname, description, date })
  }

  const fetchUsers = async () => {
    const response = await axios.get('/api/getUsers')
    console.log(response.data)
  }

  return (
    <div className={styles.modalBox}>
      <h3>Подать заявку</h3>
      <form onSubmit={onSubmitHandler}>
        {inputsValues.map((input, key) => (
          <Input
            key={key}
            title={input.title}
            placeholder={input.placeholder}
            isTextArea={key === 3}
            name={key}
          />
        ))}
        <Button variant='contained' size='medium' typeSubmit fullWidth>
          Присоединиться
        </Button>
        <Button
          variant='contained'
          size='medium'
          onClick={fetchUsers}
          fullWidth
        >
          Показать
        </Button>
      </form>
    </div>
  )
}

export default ContactModal
