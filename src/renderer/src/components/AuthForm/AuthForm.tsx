import { FC, useEffect, useState } from 'react'
import { fetchAPI } from '@renderer/services/fetchAPI'
import s from './styles.module.css'
type AuthFormProps = {
  setToken: (token: string) => void
}

export const AuthForm: FC<AuthFormProps> = ({ setToken }) => {
  const [data, setData] = useState<{ username: string; password: string }>({
    username: '',
    password: ''
  })
  const [isError, setIsError] = useState('')

  useEffect(() => {
    const refreshAuth = async (): Promise<void | undefined> => {
      const localStorageData = localStorage.getItem('authData')
      if (!localStorageData) return

      const authData = JSON.parse(localStorageData)
      if (!authData.username || !authData.password) return

      setData(authData)

      try {
        setIsError('')
        const token = await fetchAPI.auth(authData)
        if (!token) {
          return setIsError('Email or pasword is wrong')
        }
        setToken(token)
      } catch (error) {
        setIsError('Email or pasword is wrong')
      }
    }
    refreshAuth()
  }, [])

  const onChangeHandler = (evt): void => {
    setData((prevState) => {
      const newData = { ...prevState, [evt.target.name]: evt.target.value }
      localStorage.setItem('authData', JSON.stringify(newData))
      return newData
    })
  }

  const submitHandler = async (evt): Promise<void> => {
    evt.preventDefault()
    try {
      const token = await fetchAPI.auth(data)
      if (!token) {
        setIsError('Email or pasword is wrong')
      }
      setToken(token)
    } catch (error) {
      setIsError('Email or pasword is wrong')
    }
  }

  return (
    <>
      <form className={s.form} onSubmit={submitHandler}>
        <input
          className={s.input}
          type="email"
          name="username"
          placeholder="e-mail"
          value={data.username}
          onChange={onChangeHandler}
        />
        <input
          className={s.input}
          type="password"
          name="password"
          placeholder="password"
          value={data.password}
          onChange={onChangeHandler}
        />
        <button className={s.btn} type="submit">
          Login
        </button>
      </form>
      {isError && <p className={s.error}>{isError}</p>}
    </>
  )
}
