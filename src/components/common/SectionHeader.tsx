import React from 'react'

type Props = {
  title?: String
  subtitle?: String
}

const SectionHeader = ({ title, subtitle }: Props) => {
  return (
    <>
      {title && <h2 className="text-center text-[12px] sm:text-[14px] md:text-[16px] uppercase text-primary tracking-[3px] font-medium mb-2">
        {title}
      </h2>}
      {subtitle && <h3 className="text-center  text-[28px] sm:text-[32px] leading-[100%] md:text-[45px] font-normal text-secondary md:mb-6">
        {subtitle}
      </h3>}
    </>
  )
}

export default SectionHeader