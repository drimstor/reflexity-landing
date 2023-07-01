import React, { useState, WheelEvent } from 'react'
import styles from './PageCarousel.module.scss'
import FirstScreen from 'components/FirstScreen/FirstScreen'
import Planet from 'components/Planet/Planet'
import clsx from 'clsx'
import SecondScreen from 'components/SecondScreen/SecondScreen'

const PageCarousel = () => {
  const [screenNumber, setScreenNumber] = useState(0)

  const onPageWheelHandler = (e: WheelEvent<HTMLElement>) => {
    if (e.nativeEvent.deltaY > 0) {
      setScreenNumber(1)
    } else {
      setScreenNumber(0)
    }
  }

  return (
    <>
      <Planet screenNumber={screenNumber} />
      <section
        className={clsx(styles.globalBox, screenNumber === 1 && styles.active)}
        onWheel={onPageWheelHandler}
      >
        <FirstScreen />
        <SecondScreen isActiveScreen={screenNumber === 1} />
      </section>
    </>
  )
}

export default PageCarousel
