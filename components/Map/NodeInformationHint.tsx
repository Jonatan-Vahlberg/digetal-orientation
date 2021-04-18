import React from 'react'
import Button from '../Button'

interface NodeInformationHintProps {
  hint: string
  index: number
  unlocked?: boolean
  timeLocked?: boolean
  openHints: number[]
  setOpenHints: React.Dispatch<React.SetStateAction<number[]>>
}

const NodeInformationHint: React.FC<NodeInformationHintProps> = ({
  hint,
  index,
  openHints,
  setOpenHints,
}) => {
  const hintIsOpen = openHints.some((hintIndex) => hintIndex === index)
  const isHintLocked = (() => {
    if (index === 0) return false
    if (openHints.length === 0) return true
    return openHints.some((hintIndex) => hintIndex !== index - 1)
  })()
  return (
    <div className="mb-2">
      {hintIsOpen ? (
        <p>{hint}</p>
      ) : (
        <Button
          disabled={isHintLocked}
          onClick={() => setOpenHints([...openHints, index])}
          small
          className={`${isHintLocked ? 'bg-red-400' : ''}`}
        >
          {index + 1}. Hint
        </Button>
      )}
    </div>
  )
}

export default NodeInformationHint
