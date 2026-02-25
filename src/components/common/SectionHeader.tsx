import React from 'react'

type Props = {
  title?: string
  subtitle?: string
  titleClass?: string
  suntitleClass?: string
}

const SectionHeader = ({ title, subtitle, titleClass, suntitleClass }: Props) => {
  return (
    <>
      {title && <h2 className={` ${titleClass} text-center text-[12px] sm:text-[14px] md:text-[16px] uppercase text-primary tracking-[3px] font-medium mb-2`}>
        {title}
      </h2>}
      {subtitle && <h3 className={` ${suntitleClass} text-center  text-[28px] sm:text-[32px] leading-[100%] md:text-[45px] font-normal text-muted-foreground md:mb-6`}>
        {subtitle}
      </h3>}
    </>
  )
}

export default SectionHeader