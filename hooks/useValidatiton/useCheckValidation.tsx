import { useEffect, useReducer, useState } from 'react'

export type validationsList = {
  minLength?: number
  maxLength?: number
  isEmpty?: boolean
  isEmail?: boolean
  isLink?: boolean
}
const setErrorsFields = (state: any, action: { [key: string]: string }) => {
  return {
    ...state,
    ...action,
  }
}

const useCheckValidation = (
  value: string,
  validationsList: validationsList,
  isResetField: boolean
) => {
  const [errors, setErrors] = useReducer(setErrorsFields, {
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
            ? setErrors({
                minLengthError: `Минимальная длина - ${validationsList[validation]}`,
              })
            : setErrors({
                minLengthError: ``,
              })
          break

        case 'maxLength':
          value.length > validationsList[validation]!
            ? setErrors({
                maxLengthError: `Максимальная длина - ${validationsList[validation]}`,
              })
            : setErrors({
                maxLengthError: ``,
              })

          break

        case 'isLink':
          if (validationsList[validation]) {
            value
              .toLowerCase()
              .match(
                /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/
              )
              ? setErrors({
                  incorrectLinkError: '',
                })
              : setErrors({
                  incorrectLinkError:
                    'Введите URL в формате http://www.site.com',
                })

            break
          }

        case 'isEmpty':
          if (validationsList[validation]) {
            value
              ? setErrors({
                  emptyFieldError: '',
                })
              : setErrors({
                  emptyFieldError: 'Поле не может быть пустым',
                })
          }
          break

        case 'isEmail':
          if (validationsList[validation]) {
            value
              .toLowerCase()
              .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              )
              ? setErrors({
                  incorrectEmailError: '',
                })
              : setErrors({
                  incorrectEmailError: 'Некорректный E-mail',
                })

            break
          }
      }
    }
  }, [value])

  const firstError = Object.values(errors).find((error) => error !== '') ?? ''

  return isResetField ? '' : String(firstError)
}

export default useCheckValidation
