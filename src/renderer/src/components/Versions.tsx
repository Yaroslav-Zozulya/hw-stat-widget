import { useEffect, useState } from 'react'
import axios from 'axios'
function Versions(): JSX.Element {
  const [versions] = useState(window.electron.process.versions)
  useEffect(() => {
    axios
      .post('https://api.admin.edu.goit.global/api/v1/auth/login', {
        password: '123456Zz.',
        url: 'https://www.admin.edu.goit.global/uk/account/login',
        username: 'y.zozulya@goit.ua'
      })
      .then((r) => console.log(r))
  }, [])

  return (
    <ul className="versions">
      <li className="electron-version">Electron v{versions.electron}</li>
      <li className="chrome-version">Chromium v{versions.chrome}</li>
      <li className="node-version">Node v{versions.node}</li>
    </ul>
  )
}

export default Versions
