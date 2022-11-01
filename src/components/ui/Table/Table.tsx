import React from 'react'
import styles from './Table.module.scss'
import {FixedSizeList, ListChildComponentProps} from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

export const Table = React.memo(<T extends Record<string, any>, K extends keyof T>(p: ITable<T, K>) => {
  const onRowClick = React.useCallback((rowData: T, index: number) => () => {
    if (p.onRowClick) p.onRowClick(rowData, index)
  }, [p.onRowClick])

  const renderRow = React.useCallback(({index, style}: ListChildComponentProps) => {
    const rowData = p.data[index]
    return (
      <div className={styles.row}
        onClick={onRowClick(rowData, index)}
        key={index}
        style={style}>
        {p.columns.map(({key}) => (
          <div key={`${key as string} ${index}`}>
            {rowData[key] === null ? '-' : rowData[key]}
          </div>
        ))}
      </div>
    )
  }, [p.data])

  const renderColumns = React.useMemo(() => (
    <div className={styles.header}>
      {p.columns.map(({key, title}) => (
        <div key={key as string}>
          {title}
        </div>
      ))}
    </div>
  ), [p.columns])

  return (
    <div className={`${styles.table} ${p.className || ''}`}>
      {renderColumns}

      <AutoSizer className={styles.listWrapper}>
        {({height, width}) => (
          <FixedSizeList className={styles.list}
            height={height}
            itemCount={p.data.length}
            itemSize={100}
            width={width}>
            {renderRow}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  )
})

export interface ITable<T, K extends keyof T> {
  className?: string
  onRowClick?: (rowData: T, index: number) => void
  data: T[]
  columns: IColumnDefinition<T, K>[]
}

interface IColumnDefinition<T, K extends keyof T> {
  key: K
  title: React.ReactNode
}
