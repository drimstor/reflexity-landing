import { listItems } from '../const/static'

export const getPaymentData = (selectedMethod: string) => {
  const paymentGroup = listItems.find((item) =>
    item.list.find((listItem) => listItem.value === selectedMethod)
  )

  const paymentMethod = paymentGroup?.list.find(
    (listItem) => listItem.value === selectedMethod
  )

  return {
    group: paymentGroup,
    method: paymentMethod,
  }
}
