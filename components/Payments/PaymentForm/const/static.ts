import ruIcon from 'public/icons/RU.svg'
import kzIcon from 'public/icons/KZ.svg'
import cryptIcon from 'public/icons/crypt.svg'
import kaspiIcon from 'public/icons/eurasian.svg'
import jusabIcon from 'public/icons/jusan.svg'
import sberIcon from 'public/icons/sber.svg'
import tinkoffIcon from 'public/icons/tinkoff.svg'
import raiffIcon from 'public/icons/raiff.svg'
import TRON_TRC20_USDTIcon from 'public/icons/TRON_TRC20_USDT.svg'
import ETHEREUM_ERC20_USDTIcon from 'public/icons/ETHEREUM_ERC20_USDT.svg'
import btcIcon from 'public/icons/btc.svg'

export const listItems = [
  {
    label: 'Банки России',
    icon: ruIcon,
    id: 'rus',
    list: [
      {
        label: 'Сбербанк',
        icon: sberIcon,
        value: 'sber',
      },
      {
        label: 'Тинькофф',
        icon: tinkoffIcon,
        value: 'tinkoff',
      },
      {
        label: 'Райфайзен',
        icon: raiffIcon,
        value: 'raiff',
      },
    ],
  },
  {
    label: 'Банки Казахстана',
    icon: kzIcon,
    id: 'kz',
    list: [
      {
        label: 'Kaspi',
        icon: kaspiIcon,
        value: 'Kaspi',
      },
      {
        label: 'Jusab',
        icon: jusabIcon,
        value: 'Jusab',
      },
    ],
  },
  {
    label: 'Криптовалюты',
    icon: cryptIcon,
    id: 'crypt',
    list: [
      {
        label: 'USDT TRC20',
        icon: TRON_TRC20_USDTIcon,
        value: 'USDT TRC20',
      },
      {
        label: 'USDT ERC20',
        icon: ETHEREUM_ERC20_USDTIcon,
        value: 'USDT ERC20',
      },
      {
        label: 'BTC',
        icon: btcIcon,
        value: 'BTC',
      },
    ],
  },
]
export type UnpackInfer<T> = T extends Array<infer U> ? U : T
export type PaymentsListItem = UnpackInfer<typeof listItems>
