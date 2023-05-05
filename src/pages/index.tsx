import { FeatureVariable } from '@moveinc/rdc-app-context/lib/FeatureFlagContext/optimizely/createOptimizely'
import { ReactElement, useState } from 'react'
import { useFeatureFlag } from '@moveinc/rdc-app-context'

function Header ({ title }): ReactElement {
  return <h1>{title ?? 'Default title'}</h1>
}

export default function HomePage (): ReactElement {
  const values = [
    'People are our foundation',
    'Consumers are our north star',
    'Build, reconstruct, build better',
    'We own it'
  ]

  const [likes, setLikes] = useState(0)
  const { getFeatureVariables } = useFeatureFlag()
  const featureVariables: FeatureVariable = getFeatureVariables('CCX_HP_EXPO_TEST')
  const { isEnabled, variables } = featureVariables
  const variation = variables?.Variation

  function handleClick (): void {
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
        isEnabled === true && variation === 'V1'
          ? <a href={variation}>link {variation}</a>
          : <button onClick={handleClick}>{variation} Like ({likes})</button>
      }
    </div>
  )
}
