import React from 'react'
import _ from 'lodash'
import SkeletonRow from './SkeletonRow'

interface LoadingSkeletonProps {
  columns?: number
  rows?: number
  spesificRows?: SkeletonRow[]
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  columns = 1,
  rows = 10,
  spesificRows,
}) => {
  return (
    <div className={`flex w-full animate-pulse `}>
      {_.times(columns, (colIndex) => (
        <div key={`LOADING-COL${Math.random() * colIndex}`} className="w-full">
          {spesificRows
            ? spesificRows.map((row, rowIndex) => (
                <SkeletonRow
                  key={`LOADING-ROW${Math.random() * rowIndex}`}
                  {...generateSkeletonRow(row)}
                />
              ))
            : _.times(rows, () => <SkeletonRow {...generateSkeletonRow()} />)}
        </div>
      ))}
    </div>
  )
}

const generateSkeletonRow = (row?: SkeletonRow) => {
  let newRow = { ...row } ?? {}
  if (!newRow.width) {
    newRow.width = Math.floor(Math.random() * 80) + 25
  }
  if (!newRow.height) {
    newRow.height = 16
  }
  if (newRow.highlighted === undefined) {
    newRow.highlighted = false
  }
  return {
    ...newRow,
    width: newRow.width,
    height: newRow.height,
    highlighted: newRow.highlighted,
    className: newRow.className,
  }
}

export default LoadingSkeleton
