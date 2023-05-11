import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  image: string
  title: string
  description: string
  link?: string
  linkLable?: string
}

const ImageCard = ({ image, title, description, link, linkLable }: Props) => {
  return (
    <div className="xl:w-1/3 md:w-1/2 my-2 w-full">
      <div className="bg-dark-400 rounded-xl h-full mx-2 relative shadow-md">
        <figure className="relative h-0 pb-3/4">
          <Image
            className="absolute inset-0 object-cover rounded-t-xl"
            src={image}
            alt="card-image"
            height="752"
            width="1126"
          />
        </figure>
        <div className="px-6 flex flex-col pb-12">
          <h2 className="text-lg mt-2 font-bold title-font mb-2">{title}</h2>
          <p className="leading-relaxed text-base text-gray-400 mb-6">{description}</p>

          <div className="absolute bottom-4 left-10 right-10">
            {link && (
              <Link href={link}>
                <a
                  className={`rounded-3xl btn-sm bg-dark-100 text-primary-400 w-full hover:text-dark-400 hover:bg-primary-400`}
                >
                  {linkLable}
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageCard
