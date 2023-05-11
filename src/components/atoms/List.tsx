import React from 'react'
import Table from './Table'

class List extends React.Component {
  render() {
    const {
      onResourceSelected,
      onUpdate,
      resourceList,
      tableSchema,
      rowsSelectable = true,
      loading = false
    }: any = this.props

    return (
      <Table
        loading={loading}
        tableColumns={tableSchema.columns}
        tableSorting={tableSchema.sorting}
        data={resourceList}
        rowsSelectable={rowsSelectable}
        onResourceSelected={onResourceSelected}
        onUpdate={onUpdate}
      />
    )
  }
}

export default List
