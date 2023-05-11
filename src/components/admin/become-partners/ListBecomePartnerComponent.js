/* eslint-disable react/display-name */
import { isEmpty } from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { DateRangePicker } from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import SlidingPane from 'react-sliding-pane'
import 'react-sliding-pane/dist/react-sliding-pane.css'
import 'react-table/react-table.css'
import { toast } from 'react-toastify'
import ReactTooltip from 'react-tooltip'
import { partnerRequestSchema } from '../../../forms'
import { getAdminUser, getAllPartner, updatePartner } from '../../../utils/APIs'
import { IAdmin, IPartner } from '../../../utils/interface'
import FormComponent from '../../atoms/Form'
import List from '../../atoms/List'
import HeaderEditor from '../HeaderEditor'
import BecomePartnerPostComponent from './BecomePartnerPostComponent'

const { Parser } = require('json2csv')

const downloadFile = (syntheticEvent, contents, filename, mimeType = 'text/csv') => {
  const blob = new Blob([contents], { type: mimeType })
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, filename)
    syntheticEvent.preventDefault()
  } else {
    const link = syntheticEvent.currentTarget
    link.href = URL.createObjectURL(blob)
    link.download = filename
  }
}

const columnStringFilter = (filter, row, column) => {
  let f = filter.value.toString().toLowerCase()
  if (!row[filter.id]) return false
  let v = row[filter.id].toString().toLowerCase()
  return v.indexOf(f) >= 0
}
const columnStringSorter = (a, b, desc) => {
  return a.toLowerCase().localeCompare(b.toLowerCase())
}

const exactStringFilter = (filter, row, column) => {
  if (!row[filter.id]) return false
  return row[filter.id] === filter.value
}

const createTextFilterFromEnums = (enums, filter, onChange) => {
  return (
    <select
      onChange={(event) => onChange(event.target.value)}
      style={{ width: '100%' }}
      value={filter ? filter.value : ''}
    >
      <option value="">ALL</option>
      {enums.map((x) => (
        <option value={x} key={`${x}`}>
          {x}
        </option>
      ))}
    </select>
  )
}

const filterStatus = (enums, filter, onChange) => {
  return (
    <select
      onChange={(event) => onChange(event.target.value)}
      style={{ width: '100%' }}
      value={filter ? filter.value : ''}
    >
      <option value="">ALL</option>
      {enums.map((x, index) => (
        <option value={x.value} key={`${index}`}>
          {x.name}
        </option>
      ))}
    </select>
  )
}

const ListBecomePartnerComponent = ({ currentUser }) => {
  const [partners, setPartners] = useState([])
  const [users, setUsers] = useState([])

  const [holder, setHolder] = useState([])
  const [opening, setOpening] = useState(null)
  const [date, setDate] = useState({
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  })
  const [focusedInput, setFocusedInput] = useState(null)

  const [selection, setSelection] = useState({
    selectedIds: [],
    selectedIdsOnPage: [],
    columnIds: []
  })

  useEffect(() => {
    fetchPartner()
    fetchUsers()
  }, [])

  //filter data when date changed
  useEffect(() => {
    if (holder) {
      const filteredPartners = holder.filter((x) => {
        return (
          moment(x.created_at).isBetween(date.startDate, date.endDate, 'day', '[]') ||
          moment(x.created_at).isSame(date.startDate, 'day') ||
          moment(x.created_at).isSame(date.endDate, 'day')
        )
      })
      setPartners(filteredPartners)
    }
  }, [date.startDate, date.endDate, holder])
  const fetchPartner = async () => {
    try {
      const {
        data: { message }
      } = await getAllPartner()
      setPartners(message)
      setHolder(message)
    } catch (error) {
      console.error('err when get partner: ', error)
    }
  }

  const fetchUsers = async () => {
    try {
      const {
        data: { message }
      } = await getAdminUser()
      setUsers(message)
    } catch (error) {
      console.error('err when get users: ', error)
    }
  }

  const partnerTable = () => {
    const t = {
      title: 'Claims',
      list: 'ClaimsRequestList',
      sorting: [{ id: 'created_at', desc: true }],
      columns: [
        {
          Header: 'ID',
          className: 'text-center',
          accessor: 'partner_nanoid',
          maxWidth: 100,
          filterMethod: columnStringFilter,
          sortMethod: columnStringSorter
        },
        {
          Header: 'Tên doanh nghiệp',
          accessor: 'partner_company_name',
          filterMethod: columnStringFilter,
          sortMethod: columnStringSorter
        },
        {
          Header: 'Địa chỉ',
          accessor: 'partner_company_address',
          filterMethod: columnStringFilter,
          sortMethod: columnStringSorter
        },
        {
          Header: 'Thành Phố',
          className: 'text-center',
          accessor: 'partner_city_name',
          filterMethod: columnStringFilter,
          sortMethod: columnStringSorter
        },
        {
          Header: 'SĐT',
          className: 'text-center',
          accessor: 'partner_phone_number',
          filterMethod: columnStringFilter,
          sortMethod: columnStringSorter
        },
        {
          Header: 'Email',
          className: 'text-center',
          accessor: 'partner_email',
          filterMethod: columnStringFilter,
          sortMethod: columnStringSorter
        },
        {
          Header: 'Created At',
          accessor: 'created_at',
          className: 'text-center',
          Cell: (v) => {
            return <div>{moment(v.value).format('YYYY-MM-DD')}</div>
          }
        },
        {
          Header: 'Source',
          accessor: 'source',
          Cell: (v) => {
            return <div>{v.value && v.value.toUpperCase()}</div>
          },
          filterMethod: exactStringFilter,
          sortMethod: columnStringSorter,
          Filter: ({ filter, onChange }) => createTextFilterFromEnums(['accesstrade', 'Pinbus'], filter, onChange)
        },
        {
          Header: 'Trạng Thái',
          accessor: 'status',
          className: 'text-center',
          Cell: (v) => {
            return (
              <div>
                {v.value === '0' ? 'Chờ xử lý' : v.value === '1' ? 'Thành công' : v.value === '2' ? 'Từ chối' : v.value}
              </div>
            )
          },
          filterMethod: exactStringFilter,
          sortMethod: columnStringSorter,
          Filter: ({ filter, onChange }) =>
            filterStatus(
              [
                {
                  name: 'Chờ xử lý',
                  value: '0'
                },
                {
                  name: 'Thành công',
                  value: '1'
                },
                {
                  name: 'Từ chối',
                  value: '2'
                }
              ],
              filter,
              onChange
            )
        },
        {
          Header: 'Phụ trách',
          accessor: 'assigned',
          filterMethod: (filter, row, column) => {
            const user = users.find((x) => x.email === filter.value)
            if (!row[filter.id]) return false
            return row[filter.id] === user.user_nanoid
          },
          sortMethod: columnStringSorter,
          Cell: (v) => {
            const userData = users.find((x) => x.user_nanoid === v.value)
            return <div>{userData ? userData.email : ''}</div>
          },
          Filter: ({ filter, onChange }) =>
            createTextFilterFromEnums(
              users.map((u) => u.email),
              filter,
              onChange
            )
        }
      ]
    }

    return (
      <div className="-mx-4 sm:-mx-8 px-4 py-4 overflow-x-auto">
        <div className="inline-block min-w-full  overflow-hidden">
          {/* <ReactTable
            filterable
            defaultSorted={[{ id: 'created_at', desc: true }]}
            defaultPageSize={10}
            className="-striped -highlight"
            data={partners}
            columns={columns}
            getTdProps={(state, rowInfo, column, instance) => {
              return {
                onClick: (e, handleOriginal) => {
                  setOpening(rowInfo.original)
                  if (handleOriginal) {
                    handleOriginal()
                  }
                }
              }
            }}
          /> */}

          <List
            tableSchema={t}
            resourceList={partners}
            onResourceSelected={(e) => setOpening(e)}
            onUpdate={(tableIdsDict) => {
              setSelection({
                selectedIds: tableIdsDict.selectedIds,
                selectedIdsOnPage: tableIdsDict.selectedPageIds,
                columnIds: tableIdsDict.columnIds
              })
            }}
          />
        </div>
      </div>
    )
  }

  const updateData = async (params) => {
    try {
      const {
        data: { message }
      } = await updatePartner(params.partner_nanoid, {
        ...params,
        note: params.note ? params.note : undefined,
        tracking_id: params.tracking_id !== 'null' ? params.tracking_id : undefined,
        partner_description: params.partner_description ? params.partner_description : undefined
      })
      const removeOldPartner = partners.filter((partner) => partner.partner_nanoid !== message[0].partner_nanoid)
      setPartners([...removeOldPartner, message[0]])
      toast.success('Update successfully')
      setOpening(null)
    } catch (error) {
      console.error('err when update partner: ', error)
    }
  }

  const filteredData = (data, withIds) => {
    return withIds.map((id) => data.find((item) => item.partner_nanoid === id))
  }

  const toCSV = (fields, data) => {
    const parser = new Parser({ fields: [...fields] })
    const processData = data?.map((item) => ({
      ...item,
      id: item.partner_nanoid,
      company_name: item.partner_company_name,
      company_address: item.partner_company_address,
      city: item.partner_city_name,
      phone_number: item.partner_phone_number,
      email: item.partner_email,
      date: item.created_at,
      source: item.source,
      status:
        item.status === '0'
          ? 'Chờ xử lý'
          : item.status === '1'
          ? 'Thành công'
          : item.status === '2'
          ? 'Từ chối'
          : item.status,
      assigned: item.assigned ? users.find((x) => x.user_nanoid === item.assigned)?.email : '-'
    }))

    return parser.parse(processData)
  }

  const selectedIdsCount = selection.selectedIds.length
  const selectedIdsOnPageCount = selection.selectedIdsOnPage.length

  const csvAll = toCSV(selection.columnIds, partners)
  const csvSelected = toCSV(selection.columnIds, filteredData(partners, selection?.selectedIds))
  const csvSelectedOnPage = toCSV(selection.columnIds, filteredData(partners, selection?.selectedIdsOnPage))

  return (
    <>
      <SlidingPane
        closeIcon={<div>Đóng</div>}
        isOpen={!isEmpty(opening)}
        from="right"
        width="400px"
        className="z-auto"
        onRequestClose={() => setOpening({})}
      >
        <FormComponent
          schema={partnerRequestSchema}
          formData={{
            ...opening,
            tracking_id: opening?.tracking_id ? opening.tracking_id : 'null',
            note: opening?.note ? opening.note : '',
            updated_by: opening?.updated_by !== null ? opening?.updated_by : currentUser.user_nanoid,
            partner_description: opening?.partner_description ? opening.partner_description : ''
          }}
          onSubmit={({ formData }) => updateData(formData)}
        />
      </SlidingPane>

      <HeaderEditor sectionName="partners" />
      <div className="mb-6">
        <BecomePartnerPostComponent />
      </div>
      <div className="relative bg-white p-6">
        <div className="items-center flex justify-between">
          <div className="font-inter flex items-center">
            <div className="text-xl mr-2">List Request Partners</div>

            <div className="bg-blue-400 p-1 cursor-pointer rounded-md">
              <a data-tip data-for="clickme" data-event="click" className="text-white flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>Export</span>
              </a>

              <ReactTooltip id="clickme" place="right" effect="solid" clickable={true}>
                <>
                  <div className="cursor-pointer">
                    {selectedIdsOnPageCount > 0 && (
                      <a
                        onClick={(e) => downloadFile(e, csvSelectedOnPage, `merchants-data.csv`)}
                        className="dropdown-item"
                      >
                        <span>Download Selected</span>
                        <span className="has-text-grey ml-2">(This Page, {selectedIdsOnPageCount} Rows)</span>
                      </a>
                    )}
                  </div>
                  {selectedIdsCount > selectedIdsOnPageCount && (
                    <a onClick={(e) => downloadFile(e, csvSelected, `merchants-data.csv`)} className="dropdown-item">
                      Download Selected
                      <p className="has-text-grey">Multiple Pages, {selectedIdsCount} Rows</p>
                    </a>
                  )}
                  <a onClick={(e) => downloadFile(e, csvAll, `merchants-data.csv`)} className="dropdown-item">
                    Download All
                    <span className="has-text-grey ml-2">({partners?.length} Rows)</span>
                  </a>
                </>
              </ReactTooltip>
            </div>
          </div>
          <div>
            <DateRangePicker
              startDate={date.startDate || moment()} // momentPropTypes.momentObj or null,
              startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
              endDate={date.endDate || moment()} // momentPropTypes.momentObj or null,
              endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
              onDatesChange={({ startDate, endDate }) =>
                setDate({
                  startDate,
                  endDate
                })
              }
              focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
              onFocusChange={(focusedInput) => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
              displayFormat="D MMM YYYY"
              hideKeyboardShortcutsPanel
              isOutsideRange={() => false}
            />
          </div>
        </div>
        <div className="container mx-auto px-4 ">{partnerTable()}</div>
      </div>
    </>
  )
}

export default ListBecomePartnerComponent
