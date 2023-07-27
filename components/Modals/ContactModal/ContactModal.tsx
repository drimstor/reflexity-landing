import Button from 'components/UI-kit/Buttons/Button'
import Input from 'components/UI-kit/Input/Input'
import React from 'react'
import { inputsValues } from './constants'
import styles from './ContactModal.module.scss'

const ContactModal = () => {
  return (
    <div className={styles.modalBox}>
      <h3>Подать заявку</h3>
      <form>
        {inputsValues.map((input, key) => (
          <Input
            key={key}
            title={input.title}
            placeholder={input.placeholder}
            isTextArea={key === 3}
          />
        ))}
        <Button variant='contained' size='medium' fullWidth>
          Присоединиться
        </Button>
      </form>
    </div>
  )
}

export default ContactModal
