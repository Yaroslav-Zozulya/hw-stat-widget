import { useState, useEffect, FC } from 'react'
import { InfinitySpin } from 'react-loader-spinner'
import { fetchAPI } from '../../services/fetchAPI'
import { cultMaxTime } from './helpers/culcMaxTime'
import { checkAlarm } from './helpers/checkAlarm'
import audio from '../../assets/audio/alarm.mp3'

type StatsProps = {
  token: string
}

export const Stats: FC<StatsProps> = ({ token }) => {
  const [maxTime, setMaxTime] = useState('')
  const [numberOfHomeworks, setNumberOfHomeworks] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [allCompleted, setAllCompleted] = useState(false)
  const [alarm, setAlarm] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const getInfo = async (): Promise<void> => {
      try {
        const res = await fetchAPI.getStats(token)
        setIsLoading(false)
        const homeworks = res.filter((item) => item.status === 'checking')
        if (!homeworks.length) {
          setAllCompleted(true)
        }
        setNumberOfHomeworks(homeworks.length)
        setMaxTime(cultMaxTime(homeworks))
      } catch (error) {
        setIsError(true)
      }
    }
    getInfo()
    setInterval(() => {
      getInfo()
    }, 300000)
  }, [])

  useEffect(() => {
    setAlarm(checkAlarm(maxTime))
  }, [maxTime])

  return (
    <>
      {isLoading && <InfinitySpin width="200" color="#4fa94d" />}
      {!isLoading && !isError && !allCompleted && (
        <div>
          <p>Max time: {maxTime}</p>
          <p>Number of hw: {numberOfHomeworks}</p>
        </div>
      )}
      {allCompleted && <p>✅Mission complete✅</p>}
      {isError && <p>Something is wrong</p>}
      {alarm && (
        <audio autoPlay>
          <source src={audio} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      )}
    </>
  )
}
