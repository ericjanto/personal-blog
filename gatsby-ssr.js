import React from 'react'

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([<html-comment></html-comment>])
}
