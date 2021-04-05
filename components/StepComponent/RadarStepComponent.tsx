import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useLocationStore } from '~/helpers/stores'
import Radar from '../Map/Radar'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import { GoDash } from 'react-icons/Go'
import { caluclateDistance } from '~/helpers/functions'
import Button from '../Button'
import { useIntl } from 'react-intl'
interface RadarStepComponentProps {
  step?: Step
}

const RadarStepComponent: React.FC<RadarStepComponentProps> = ({ step }) => {
  const { formatMessage: f } = useIntl()
  const locationStore = useLocationStore()
  const stepdetails = step?.stepData as RadarData
  const [distance, setDistance] = useState(50)
  const [movementState, setMovementState] = useState<
    'NUETRAL' | 'POSITIVE' | 'NEGATIVE'
  >('NUETRAL')
  useEffect(() => {
    if (locationStore.coordinates && stepdetails) {
      setDistance((state) => {
        const newDistance = locationStore.getDistance(
          stepdetails.node.pointOfOrigin
        )
        setMovementState(
          state === newDistance
            ? 'NUETRAL'
            : state > newDistance
            ? 'POSITIVE'
            : 'NEGATIVE'
        )
        return newDistance
      })
    }
  }, [locationStore.coordinates])
  let textColor = 'text-white'
  textColor = movementState === 'POSITIVE' ? 'text-green-700' : textColor
  textColor = movementState === 'NEGATIVE' ? 'text-red-700' : textColor
  console.log(textColor, movementState)

  return (
    <div className={'flex flex-col h-full items-center'}>
      <Radar distance={distance} />
      <p
        className={`text-2xl w-full text-center mt-3 font-semibold ${textColor}`}
      >
        {distance} M
        <span>
          {movementState === 'NUETRAL' && <GoDash className="inline" />}
          {movementState === 'POSITIVE' && <FaArrowUp className="inline" />}
          {movementState === 'NEGATIVE' && <FaArrowDown className="inline" />}
        </span>
      </p>
      <div className="flex flex-grow items-end w-full">
        <Button disabled={stepdetails?.node.radius <= distance}>
          {f({ id: 'step.next' }).toUpperCase()}
        </Button>
      </div>
    </div>
  )
}

export default observer(RadarStepComponent)
