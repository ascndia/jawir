"use client"

import { ColorThumb as ColorThumbPrimitive, type ColorThumbProps } from "react-aria-components"


const ColorThumb = (props: ColorThumbProps) => {
  return (
    <ColorThumbPrimitive
      {...props}
      style={({ defaultStyle, isDisabled }) => ({
        ...defaultStyle,
        backgroundColor: isDisabled ? undefined : defaultStyle.backgroundColor,
      })}
    />
  )
}

export { ColorThumb }
