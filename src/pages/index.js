import { useState } from 'react'

function Header ({ title }) {
  return <h1>{title || 'Default title'}</h1>
}

export default function HomePage () {
  const values = [
    'People are our foundation',
    'Consumers are our north star',
    'Build, reconstruct, build better',
    'We own it'
  ]

  const [likes, setLikes] = useState(0)

  function handleClick () {
    setLikes(likes + 1)
  }

  return (
    <div>
      <Header title='🚀' />
      <ul>
        {values.map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>

      <button onClick={handleClick}>Like ({likes})</button>
    </div>
  )
}
