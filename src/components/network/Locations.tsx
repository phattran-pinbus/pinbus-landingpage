import React, { useEffect } from 'react'
import { getHighlightLocation } from '../../utils/APIs'
import { IHighlightLocation } from '../../utils/interface'
import Image from 'next/image'
import { getDistrict, getProvince } from '../../utils'
import { provineList, districtList, fields } from '../../utils/constants'

const Locations = () => {
  const [locations, setLocations] = React.useState<IHighlightLocation[]>([])
  const [locationHolder, setLocationHolder] = React.useState<IHighlightLocation[]>([])
  const [selectedProvince, setSelectedProvince] = React.useState<string>('')
  const [selectedDistrict, setSelectedDistrict] = React.useState<string>('')
  const [selectedField, setSelectedField] = React.useState<string>('')

  const [text, setText] = React.useState<string>('')

  useEffect(() => {
    getLocations()
  }, [])

  useEffect(() => {
    if (text === '') {
      setLocations(locationHolder)
    }
    if (text) {
      const searchTring = text.trim().toLowerCase()
      const filteredLocations = locationHolder.filter((location) => {
        const locationTitle = location.highlight_position_title.toLowerCase()
        const locationAddress = location.highlight_position_address.toLowerCase()
        const locationFields = location.highlight_position_fields.toLowerCase()
        return (
          locationTitle.includes(searchTring) ||
          locationAddress.includes(searchTring) ||
          locationFields.includes(searchTring)
        )
      })
      setLocations(filteredLocations)
    }
  }, [locationHolder, text])

  useEffect(() => {
    if (selectedProvince) {
      const newLocations = locationHolder.filter(
        (location) => location.highlight_position_province === selectedProvince
      )
      setLocations(newLocations)
    }

    if (selectedDistrict) {
      const newLocations = locationHolder.filter(
        (location) => location.highlight_position_district === selectedDistrict
      )
      setLocations(newLocations)
    }

    if (selectedField) {
      const newLocations = locationHolder.filter((location) => location.highlight_position_fields === selectedField)
      setLocations(newLocations)
    }
  }, [locationHolder, selectedProvince, selectedDistrict, selectedField])

  useEffect(() => {
    if (selectedProvince === '') {
      setLocations(locationHolder)
    }
  }, [locationHolder, selectedProvince])

  const getLocations = async () => {
    try {
      const {
        data: { message }
      } = await getHighlightLocation()
      setLocations(message)
      setLocationHolder(message)
    } catch (error) {
      console.error('err when get header post section: ', error)
    }
  }

  const LocationTable = () => {
    return (
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto" data-aos="fade-down" data-aos-delay="450">
        <div className="inline-block min-w-full overflow-hidden">
          <div className="h-128 overflow-auto">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3  border-b border-gray-200 text-gray-200 font-bold  text-left text-sm uppercase"
                  ></th>
                  <th
                    scope="col"
                    className="px-5 py-3  border-b border-gray-200 text-gray-200 font-bold  text-left text-sm uppercase"
                  >
                    Tên cửa hàng
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3  border-b border-gray-200 text-gray-200 font-bold  text-left text-sm uppercase"
                  >
                    Địa chỉ
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-3  border-b border-gray-200 text-gray-200 font-bold  text-left text-sm uppercase"
                  >
                    Tỉnh/ Thành phố
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3  border-b border-gray-200 text-gray-200 font-bold  text-left text-sm uppercase"
                  >
                    Quận,huyện
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3  border-b border-gray-200 text-gray-200 font-bold  text-left text-sm uppercase"
                  >
                    Lĩnh vực
                  </th>
                </tr>
              </thead>
              <tbody>
                {locations &&
                  locations.map((location, index) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm text-center w-24">
                        <figure className="relative pb-9/16">
                          <Image
                            src={location.highlight_position_img}
                            alt={location.highlight_position_nanoid}
                            layout="fill"
                            className="w-32 h-32 object-cover"
                          />
                        </figure>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        <p className="text-gray-200 whitespace-no-wrap">{location.highlight_position_title}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        <p className="text-gray-200 whitespace-no-wrap">{location.highlight_position_address}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        <p className="text-gray-200 whitespace-no-wrap">
                          {getProvince(location.highlight_position_province)}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        <p className="text-gray-200 whitespace-no-wrap">
                          {getDistrict(location.highlight_position_district)}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 text-sm">
                        <p className="text-gray-200 whitespace-no-wrap">{location.highlight_position_fields}</p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  const provinceArr = Object.keys(provineList)
    .map((key) => provineList[key])
    .sort((a, b) => a.name.localeCompare(b.name))

  const districtArr = Object.keys(districtList).map((key) => districtList[key])

  const getDistrictData = (provineId) => {
    return provineId ? districtArr.filter((d) => Number(d.parent_code) === Number(provineId)) : []
  }

  return (
    <section className="bg-dark-400 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="dark relative bg-gray-800 py-10 px-8 md:py-16 md:px-12 rounded-md">
          <div className="relative">
            <div className="mb-6 lg:mr-16 lg:mb-0 text-center lg:text-left lg:w-2/3">
              <h3 className="h3 font-inter text-gray-100">Danh Sách Các Trạm Sạc</h3>
            </div>

            <form className="w-full mt-4">
              <div className="flex flex-col sm:flex-row justify-center max-w-xs mx-auto sm:max-w-md lg:max-w-none">
                <input
                  type="text"
                  className="form-input w-full mb-2 sm:mb-0 sm:mr-2"
                  placeholder="Tìm kiếm"
                  aria-label="Tìm kiếm"
                  onChange={(e) => setText(e.target.value)}
                />
                <select
                  id="country"
                  className="form-select w-full sm:mb-0 sm:mr-2"
                  onChange={(e) => {
                    setSelectedProvince(e.target.value)
                    setSelectedDistrict('')
                  }}
                  value={selectedProvince}
                >
                  <option value="">Tỉnh/Thành Phố</option>
                  {provinceArr.map((p) => (
                    <option key={p.code} value={p.code}>
                      {p.name}
                    </option>
                  ))}
                </select>
                <select
                  id="country"
                  className="form-select w-full sm:mb-0 sm:mr-2"
                  required
                  onChange={(e) => {
                    setSelectedDistrict(e.target.value)
                  }}
                >
                  <option value="">Quận Huyện</option>
                  {getDistrictData(selectedProvince).map((p) => (
                    <option key={p.code} value={p.code}>
                      {p.name}
                    </option>
                  ))}
                </select>
                <select
                  id="country"
                  className="form-select w-full"
                  onChange={(e) => {
                    setSelectedField(e.target.value)
                  }}
                >
                  <option value="">Lĩnh Vực</option>
                  {fields.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                  {/* fields */}
                </select>
              </div>
            </form>

            <LocationTable />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Locations
