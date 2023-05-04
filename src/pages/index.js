import { useState } from 'react'
import { useFeatureFlag } from '@moveinc/rdc-app-context'

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
  const { getFeatureVariables } = useFeatureFlag()
  const featureVariables = getFeatureVariables('CCX_HP_EXPO_TEST')
  const { isEnabled, variables } = featureVariables
  const variation = variables?.Variation

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
      {
        isEnabled && variation === 'V1'
          ? <a href={variation}>link {variation}</a>
          : <button onClick={handleClick}>{variation} Like ({likes})</button>
      }
    </div>
  )
}
