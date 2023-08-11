import { useEffect, useState } from 'react'

export type validationsList = {
  minLength?: number
  maxLength?: number
  isEmpty?: boolean
  isEmail?: boolean
  isLink?: boolean
}

const useCheckValidation = (
  value: string,
  validationsList: validationsList,
  isResetField: boolean
) => {
  const [errors, setErrors] = useState({
    minLengthError: '',
    maxLengthError: '',
    emptyFieldError: '',
    incorrectEmailError: '',
    incorrectLinkError: '',
  })

  useEffect(() => {
    for (const validation in validationsList) {
      switch (validation) {
        case 'minLength':
          value.length < validationsList[validation]!
            ? setErrors((prev) => ({
                ...prev,
                minLengthError: `Минимальная длина - ${validationsList[validation]}`,
              }))
            : setErrors((prev) => ({
                ...prev,
                minLengthError: ``,
              }))
          break

        case 'maxLength':
          value.length > validationsList[validation]!
            ? setErrors((prev) => ({
                ...prev,
                maxLengthError: `Максимальная длина - ${validationsList[validation]}`,
              }))
            : setErrors((prev) => ({
                ...prev,
                maxLengthError: ``,
              }))

          break

        case 'isLink':
          if (validationsList[validation]) {
            value
              .toLowerCase()
              .match(
                /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/
              )
              ? setErrors((prev) => ({
                  ...prev,
                  incorrectLinkError: '',
                }))
              : setErrors((prev) => ({
                  ...prev,
                  incorrectLinkError:
                    'Введите URL в формате http://www.site.com',
                }))

            break
          }

        case 'isEmpty':
          if (validationsList[validation]) {
            value
              ? setErrors((prev) => ({
                  ...prev,
                  emptyFieldError: '',
                }))
              : setErrors((prev) => ({
                  ...prev,
                  emptyFieldError: 'Поле не может быть пустым',
                }))
          }
          break

        case 'isEmail':
          if (validationsList[validation]) {
            value
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              )
              ? setErrors((prev) => ({
                  ...prev,
                  incorrectEmailError: '',
                }))
              : setErrors((prev) => ({
                  ...prev,
                  incorrectEmailError: 'Некорректный E-mail',
                }))

            break
          }
      }
    }
  }, [value])

  const firstError = Object.values(errors).find((error) => error !== '') ?? ''

  return isResetField ? '' : firstError
}

export default useCheckValidation
