import React, { useState, WheelEvent } from 'react'
import styles from './PageCarousel.module.scss'

import FirstScreen from 'components/FirstScreen/FirstScreen'
import SecondScreen from 'components/SecondScreen/SecondScreen'
import clsx from 'clsx'

const PageCarousel = () => {
  const [screenNumber, setScreenNumber] = useState(0)

  const onPageWheelHandler = (e: WheelEvent<HTMLElement>) => {
    console.log(e.nativeEvent.deltaY)
    if (e.nativeEvent.deltaY === 125) {
      setScreenNumber(1)
    } else {
      setScreenNumber(0)
    }
  }

  return (
    <section
      className={clsx(styles.globalBox, screenNumber === 1 && styles.active)}
      onWheel={onPageWheelHandler}
    > 
      <FirstScreen />
      <SecondScreen screenNumber={screenNumber} />
    </section>
  )
}

export default PageCarousel
