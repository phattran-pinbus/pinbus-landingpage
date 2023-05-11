import { provineList, districtList } from './constants'

export const getProvince = (provinceId: string) => {
  const province = provineList[provinceId]?.name
  return province
}

export const getDistrict = (districtId: string) => {
  const districtArr = Object.keys(districtList).map((key) => districtList[key])
  const district = districtArr.find((item) => item.code === districtId)
  return district?.name
}
