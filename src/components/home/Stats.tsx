import { getSectionById } from './../../utils/APIs'
import React, { useEffect } from 'react'
import { ISectionContent, ISectionProps } from '../../utils/interface'
import Image from 'next/image'
import RenderHTML from './../atoms/RenderHTML'

const Stats = ({ sectionData }: { sectionData: ISectionProps }) => {
  const [stats, setStats] = React.useState<ISectionContent[]>([])

  useEffect(() => {
    const getStats = async () => {
      try {
        const {
          data: { message }
        } = await getSectionById(sectionData.home_nanoid)
        setStats(message)
      } catch (error) {
        console.error('err when get header post section: ', error)
      }
    }

    getStats()
  }, [sectionData.home_nanoid])

  return (
    <section className="relative bg-primary-400" data-aos="fade-down" data-aos-delay="450">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-24">
        <div className="flex flex-wrap -m-2" data-aos-id-stats>
          {stats &&
            stats.map((item, index) => (
              <div className="xl:w-1/3 md:w-1/2 my-2 w-full" key={index}>
                <div
                  className="bg-dark-400 py-10 px-4 shadow-md rounded-xl text-white mx-2 text-center"
                  data-aos="fade-down"
                  data-aos-anchor="[data-aos-id-stats]"
                >
                  <div className="flex justify-center pb-4">
                    <figure className="relative">
                      {item?.home_detail_media?.media_url && (
                        <Image
                          src={item?.home_detail_media?.media_url}
                          alt={item.home_detail_nanoid}
                          width={90}
                          height={110}
                        />
                      )}
                    </figure>
                  </div>
                  <div className="font-inter text-xl font-extrabold tracking-tighter mb-2">
                    {item.home_detail_title}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    <RenderHTML content={item.home_detail_content[0]} />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
