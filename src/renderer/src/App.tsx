import { FC, useState } from 'react'
import { AuthForm } from './components/AuthForm/AuthForm'
import { Stats } from './components/Stats/Stats'

export const App: FC = () => {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const [token, setToken] = useState<string | null>(null)

  return (
    <>
      {!token && <AuthForm setToken={setToken} />}
      {token && <Stats token={token} />}
    </>
  )
}
