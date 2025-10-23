import clsx from 'clsx'
import Button from 'components/UI-kit/Buttons/Button'
import React from 'react'
import styles from './ExchangerTable.module.scss'
import exportIcon from '../../../public/icons/export.svg'
import plusIcon from '../../../public/icons/plus.svg'
import filterIcon from '../../../public/icons/filter.svg'
import Image from 'next/image'
import arrowUp from '../../../public/icons/arrow-up.svg'
import arrowDown from '../../../public/icons/arrow-down.svg'
import { firstTableTD, secondTableTD } from '../ExchangerLayout/constants'
import useMediaQuery from 'hooks/useMediaQuery'

interface ExchangerTableProps {
  control: any
  tabs?: any
  thData: any
  tdData: any
  isAnotherTable?: boolean
  isActive?: boolean
  isNoAnimation: boolean
}

const ExchangerTable = ({
  tabs,
  control,
  thData,
  tdData,
  isAnotherTable,
  isActive,
  isNoAnimation,
}: ExchangerTableProps) => {
  const isMobile = useMediaQuery('(max-width: 426px)')
  return (
    <div
      className={clsx(
        styles.tableBox,
        isAnotherTable && styles.anotherTable,
        isActive && styles.active,
        isNoAnimation && styles.noAnimation
      )}
    >
      {tabs && (
        <div className={styles.tableTabs}>
          {tabs.map((tab: any, index: number) => (
            <div
              key={index}
              className={clsx(
                styles.tableTab,
                tab.active && styles.active,
                tab.sticker && styles.sticker
              )}
            >
              {tab.value}
            </div>
          ))}
        </div>
      )}
      <div className={styles.tableControl}>
        <h2>
          {control.title}
          {control.titleValue && <span>{control.titleValue}</span>}
        </h2>
        <div className={styles.buttonsBox}>
          <div className={styles.filtersButton}>
            <Image src={filterIcon} alt='icon' /> Фильтры
          </div>
          <Button variant='outlined' size='small' icon={exportIcon}>
            Экспорт CSV
          </Button>
          {control.additionalButton && (
            <Button variant='contained' size='small' icon={plusIcon}>
              Создать Заявку
            </Button>
          )}
        </div>
      </div>
      <table>
        <thead>
          <tr>
            {thData.map((value: string, index: number) => (
              <th key={`${value}_${index}`}>{value}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tdData.map((arr: string[], index: number) => (
            <tr
              key={index}
              className={clsx(arr.includes('выше нормы') && styles.active)}
            >
              {arr.map((item: string, index: number) => (
                <td
                  key={`${item}_${index}`}
                  className={clsx(
                    (item === firstTableTD[0][2] ||
                      item === firstTableTD[0][6] ||
                      item === firstTableTD[0][7]) &&
                      styles.isBlueField
                  )}
                >
                  {index === 0 ? (
                    <span
                      className={clsx(item === 'Оплаченная' && styles.active)}
                    >
                      {item}
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width={isMobile ? '6' : '9'}
                        height={isMobile ? '5' : '8'}
                        viewBox='0 0 9 8'
                        fill='none'
                      >
                        <g clipPath='url(#clip0_471_10435)'>
                          <path
                            d='M4.51029 1.12207C3.91095 1.12207 3.32507 1.29979 2.82674 1.63277C2.32841 1.96574 1.94001 2.43901 1.71065 2.99273C1.48129 3.54645 1.42128 4.15574 1.53821 4.74356C1.65513 5.33138 1.94374 5.87133 2.36754 6.29513C2.79133 6.71892 3.33128 7.00753 3.91911 7.12446C4.50693 7.24138 5.11622 7.18137 5.66994 6.95202C6.22365 6.72266 6.69692 6.33426 7.0299 5.83593C7.36287 5.33759 7.5406 4.75172 7.5406 4.15238C7.5397 3.34896 7.22015 2.57871 6.65205 2.01061C6.08395 1.44251 5.3137 1.12296 4.51029 1.12207V1.12207ZM4.51029 6.57662C4.03082 6.57662 3.56212 6.43444 3.16345 6.16806C2.76478 5.90168 2.45406 5.52307 2.27058 5.0801C2.08709 4.63712 2.03908 4.14969 2.13262 3.67943C2.22616 3.20917 2.45705 2.77721 2.79609 2.43818C3.13513 2.09914 3.56708 1.86825 4.03734 1.77471C4.5076 1.68117 4.99503 1.72918 5.43801 1.91267C5.88098 2.09615 6.2596 2.40687 6.52597 2.80554C6.79235 3.2042 6.93453 3.67291 6.93453 4.15238C6.9338 4.7951 6.67815 5.41129 6.22368 5.86577C5.7692 6.32024 5.15301 6.57589 4.51029 6.57662V6.57662ZM4.51029 4.00086C4.42992 4.00086 4.35284 4.03279 4.29601 4.08962C4.23918 4.14645 4.20726 4.22352 4.20726 4.30389V5.21298C4.20726 5.29335 4.23918 5.37043 4.29601 5.42726C4.35284 5.48409 4.42992 5.51602 4.51029 5.51602C4.59066 5.51602 4.66773 5.48409 4.72456 5.42726C4.78139 5.37043 4.81332 5.29335 4.81332 5.21298V4.30389C4.81332 4.22352 4.78139 4.14645 4.72456 4.08962C4.66773 4.03279 4.59066 4.00086 4.51029 4.00086ZM4.51029 2.78874C4.43537 2.78874 4.36214 2.81095 4.29985 2.85258C4.23755 2.8942 4.189 2.95336 4.16033 3.02257C4.13166 3.09179 4.12416 3.16795 4.13878 3.24143C4.15339 3.3149 4.18947 3.3824 4.24245 3.43537C4.29542 3.48835 4.36291 3.52442 4.43639 3.53904C4.50987 3.55365 4.58603 3.54615 4.65524 3.51748C4.72446 3.48881 4.78362 3.44026 4.82524 3.37797C4.86686 3.31568 4.88908 3.24244 4.88908 3.16753C4.88908 3.06707 4.84917 2.97072 4.77813 2.89968C4.7071 2.82865 4.61075 2.78874 4.51029 2.78874V2.78874Z'
                            fill={item === 'Оплаченная' ? '#0ec8f1' : '#b9a7f6'}
                          />
                        </g>
                        <defs>
                          <clipPath id='clip0_471_10435'>
                            <rect
                              width='7.27274'
                              height='7.27274'
                              fill='white'
                              transform='translate(0.874023 0.515625)'
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                  ) : (
                    <>
                      {item === secondTableTD[0][2] &&
                        (arr.includes(secondTableTD[0][1]) ||
                          arr.includes(secondTableTD[1][1])) && (
                          <Image
                            src={
                              arr.includes(secondTableTD[0][1])
                                ? arrowUp
                                : arrowDown
                            }
                            alt='arrow'
                          />
                        )}
                      {item}
                      {item === firstTableTD[0][6] && (
                        <>
                          <br />
                          <p>Visa/MasterCard</p>
                        </>
                      )}
                    </>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ExchangerTable
