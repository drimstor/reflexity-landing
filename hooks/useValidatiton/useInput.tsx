import { ChangeEvent, useState } from 'react'
import useCheckValidation, { validationsList } from './useCheckValidation'

const useInput = (initialValue: string, validationsList: validationsList) => {
  const [isResetField, setIsResetField] = useState(false)
  const [inputValue, setInputValue] = useState(initialValue)

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e?.target?.value)
    if (isResetField) setIsResetField(false)
  }

  const [isOutFocus, setIsOutFocus] = useState(false)
  const onBlur = () => {
    setIsOutFocus(true)
  }

  const validateError = useCheckValidation(
    inputValue,
    validationsList,
    isResetField
  )

  const resetField = () => {
    setInputValue('')
    setIsResetField(true)
  }

  return {
    inputValue,
    onChange,
    onBlur,
    isOutFocus,
    validateError,
    resetField,
  }
}

export default useInput
