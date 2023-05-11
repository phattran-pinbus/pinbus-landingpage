import React from 'react'
import ReactTable from 'react-table'
import selectTableHOC from 'react-table/lib/hoc/selectTable'

const SelectTable = selectTableHOC(ReactTable)

const SELECT_NONE_STYLE = {
  MozUserSelect: 'none',
  msUserSelect: 'none',
  WebkitUserSelect: 'none',
  userSelect: 'none'
}

export default class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRowId: null,
      selectedIdsSet: new Set(),
      allSelected: false
    }

    const { onResourceSelected, onUpdate } = props

    this.onResourceSelected = onResourceSelected || (() => {})
    this.onUpdate = onUpdate || (() => {})

    this.isRowSelected = this.isRowSelected.bind(this)
    this.toggleAll = this.toggleAll.bind(this)
    this.toggleSelection = this.toggleSelection.bind(this)
    this.onTableViewChanged = this.onTableViewChanged.bind(this)
    this.triggerUpdate = this.triggerUpdate.bind(this)
    this.tableState = this.tableState.bind(this)

    // Use a Ref to the table so that we can access the sortedData in its state.
    this.reactTableRef = React.createRef()
  }

  componentDidMount() {
    this.triggerUpdate()
  }

  onTableViewChanged() {
    this.setState({ allSelected: this.allPageRowsSelected() })
    this.triggerUpdate()
  }

  isRowSelected(id) {
    const { selectedIdsSet } = this.state
    return selectedIdsSet.has(id)
  }

  selectAllOnPage() {
    const { selectedIdsSet } = this.state
    const pageIds = this.pageIds()
    pageIds.forEach((id) => {
      selectedIdsSet.add(id)
    })
    this.setState({ selectedIdsSet, allSelected: true })
    this.triggerUpdate()
  }

  selectNoneOnPage() {
    const { selectedIdsSet } = this.state
    const pageIds = this.pageIds()
    pageIds.forEach((id) => {
      selectedIdsSet.delete(id)
    })
    this.setState({ selectedIdsSet, allSelected: false })
    this.triggerUpdate()
  }

  toggleAll() {
    const { allSelected } = this.state
    if (allSelected) this.selectNoneOnPage()
    else this.selectAllOnPage()
  }

  selectBetweenIds(fromId, toId) {
    const pageIds = this.pageIds()

    const idxA = Math.max(0, pageIds.indexOf(fromId))
    const idxB = pageIds.indexOf(toId)

    const fromIdx = Math.min(idxA, idxB)
    const toIdx = Math.max(idxA, idxB)

    const { selectedIdsSet } = this.state
    for (let idx = 0; idx < pageIds.length; idx++) {
      const id = pageIds[idx]
      if (fromIdx <= idx && idx <= toIdx) {
        selectedIdsSet.add(id)
      } else {
        selectedIdsSet.delete(id)
      }
    }
    this.setState({ selectedIdsSet, allSelected: this.allPageRowsSelected() })
    this.triggerUpdate()
  }

  toggleRow(id) {
    const { selectedIdsSet } = this.state
    if (selectedIdsSet.has(id)) {
      selectedIdsSet.delete(id)
    } else {
      selectedIdsSet.add(id)
    }
    this.setState({
      selectedIdsSet,
      selectedRowId: id,
      allSelected: this.allPageRowsSelected()
    })
    this.triggerUpdate()
  }

  // ids on the current page
  pageIds() {
    const { sortedData, page, pageSize } = this.tableState()
    const pageRows = sortedData.slice(page * pageSize, (page + 1) * pageSize)
    return pageRows.map((r) => r.partner_nanoid)
  }

  toggleSelection(key, shift, row) {
    const { selectedRowId } = this.state
    const { partner_nanoid } = row
    if (shift) {
      this.selectBetweenIds(selectedRowId, partner_nanoid)
    } else {
      this.toggleRow(partner_nanoid)
    }
  }

  tableState() {
    if (!this.reactTableRef) return null
    if (!this.reactTableRef.current) return null
    const reactTable = this.reactTableRef.current.getWrappedInstance()
    return reactTable.getResolvedState()
  }

  // Returns true if all the rows on the page of the table are selected.
  allPageRowsSelected() {
    const { selectedIdsSet } = this.state
    const pageIds = this.pageIds()
    return pageIds.length > 0 && pageIds.every((id) => selectedIdsSet.has(id))
  }

  triggerUpdate() {
    if (this.tableState()) {
      const { allVisibleColumns, sortedData, page, pageSize } = this.tableState()
      const { selectedIdsSet } = this.state
      const selectedIds = Array.from(selectedIdsSet)
      const sortedIds = sortedData.map((r) => r.partner_nanoid)
      const pageIds = sortedIds.slice(page * pageSize, (page + 1) * pageSize)
      const selectedSortedIds = sortedIds.filter((id) => selectedIdsSet.has(id))
      const selectedPageIds = pageIds.filter((id) => selectedIdsSet.has(id))
      const columnIds = allVisibleColumns.map((column) => column.id).filter((id) => !id.startsWith('_'))
      this.onUpdate({
        columnIds,
        selectedIds,
        sortedIds,
        pageIds,
        selectedSortedIds,
        selectedPageIds,
        sortedData
      })
    }
  }

  render() {
    const {
      tableColumns = [],
      tableSorting = [],
      data = [],
      hideFilter,
      numRows,
      rowsSelectable,
      loading = false
    } = this.props
    const { allSelected } = this.state

    const ReactOrSelectTable = rowsSelectable ? SelectTable : ReactTable

    const selectTableProps = {
      isSelected: this.isRowSelected,
      selectAll: allSelected,
      toggleAll: this.toggleAll,
      toggleSelection: this.toggleSelection,
      selectType: 'checkbox',
      keyField: 'partner_nanoid',
      ref: this.reactTableRef,
      onPageChange: this.onTableViewChanged,
      onPageSizeChange: this.onTableViewChanged,
      onSortedChange: this.onTableViewChanged,
      onFilteredChange: this.onTableViewChanged,
      onResizedChange: this.onTableViewChanged,
      onExpandedChange: this.onTableViewChanged
    }

    return (
      <ReactOrSelectTable
        filterable={!hideFilter}
        data={data}
        loading={loading}
        columns={tableColumns}
        className="fullpage-with-headings has-corners has-background-white -striped -highlight"
        defaultPageSize={numRows || 10}
        defaultSorted={tableSorting}
        style={SELECT_NONE_STYLE}
        getTdProps={(state, rowInfo, column, instance) => {
          if (column.id === '_selector') {
            // Clicking a table cell in the checkbox column behaves
            // the same as clicking on the checkbox.
            return {
              onClick: (e, handleOriginal) => {
                if (column.hasCustomClickHandler || !rowInfo) return null

                this.toggleSelection(`select-${rowInfo.original.partner_nanoid}`, e.shiftKey, rowInfo.row)
                if (handleOriginal) handleOriginal()
              }
            }
          }

          return {
            onClick: (e, handleOriginal) => {
              if (column.hasCustomClickHandler || !rowInfo) return null

              if (rowsSelectable && (e.ctrlKey || e.shiftKey)) {
                // Holding Ctrl when clicking on table cell selects the row.
                // Holding Shift when clicking will select a range of rows.
                this.toggleSelection(`select-${rowInfo.original.partner_nanoid}`, e.shiftKey, rowInfo.row)
              } else {
                const { original: selected } = rowInfo
                this.onResourceSelected(selected)
                this.setState({ selectedRowId: selected.partner_nanoid })
              }
              if (handleOriginal) handleOriginal()
            }
          }
        }}
        getTrProps={(state, rowInfo, column) => {
          if (rowInfo !== undefined) {
            const { original } = rowInfo
            return {
              className: this.isRowSelected(original.partner_nanoid) ? 'selected-row' : ''
            }
          }

          return {}
        }}
        {...(rowsSelectable && selectTableProps)}
      />
    )
  }
}
