import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useLocationStore, useUserStore } from '~/helpers/stores'
import Radar from '../Map/Radar'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import { GoDash } from 'react-icons/go'
import { caluclateDistance } from '~/helpers/functions'
import Button from '../Button'
import { useIntl } from 'react-intl'
interface RadarStepComponentProps {
  step: Step
  radar: RadarData
  routeId: string
}

// const step: Step = {
//   stepIndex: 1,
//   type: 'CODE',
//   stepData: {
//     title: 'Testing route system',
//     description: 'Testing more than that',
//     hints: [],
//     node: ploy ,
//   },
// }

// const ploy: PolygonNodeType = {
//   vertices: [ {lat:59.2851255144915,lng: 18.038505839647919},
//     {lat:59.28524470267394,lng: 18.03881437387636},
//     {lat:59.284876176943975,lng: 18.039348133470323},
//     {lat:59.284755617474765,lng: 18.039026268388536},],
//   information: {
//     title: "",
//     description: "football field",
//     hints: ["NO you dont need one"]
//   }
// }

const RadarStepComponent: React.FC<RadarStepComponentProps> = ({
  radar,
  step,
  routeId,
}) => {
  const { formatMessage: f } = useIntl()
  const locationStore = useLocationStore()
  const userStore = useUserStore()

  const [distance, setDistance] = useState<number>()
  const [movementState, setMovementState] =
    useState<'NUETRAL' | 'POSITIVE' | 'NEGATIVE'>('NUETRAL')
  useEffect(() => {
    if (locationStore.coordinates) {
      setDistance((state) => {
        const newDistance = locationStore.getDistance(radar.node.pointOfOrigin)
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
  let textColor = ''
  textColor = movementState === 'POSITIVE' ? 'text-green-700' : textColor
  textColor = movementState === 'NEGATIVE' ? 'text-red-700' : textColor
  return (
    <div>
      <Radar distance={distance} />
      <p
        className={`text-2xl w-full text-center mt-3 font-semibold mb-3 ${textColor}`}
      >
        {distance ? `${distance} M` : f({ id: 'step.nodata' })}
        <span>
          {movementState === 'NUETRAL' && <GoDash className="inline" />}
          {movementState === 'POSITIVE' && <FaArrowUp className="inline" />}
          {movementState === 'NEGATIVE' && <FaArrowDown className="inline" />}
        </span>
      </p>
      <div className="flex flex-grow items-end w-full">
        <Button
          onClick={() => {
            userStore.markStepAsCompleted(routeId, step, () => {})
          }}
          disabled={radar.node.radius <= distance}
        >
          {f({ id: 'step.next' }).toUpperCase()}
        </Button>
      </div>
    </div>
  )
}

export default observer(RadarStepComponent)
