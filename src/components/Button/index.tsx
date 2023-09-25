import React from 'react'

import { ButtonContainer } from './styles';

const Button = ({title,variant = "primary", onClick, types}:{
    title: string,
    variant?: string,
    onClick?: any,
    types?: string
}) => {
  return (
    <ButtonContainer variant={variant} onClick={onClick} typeof={types ? types : "button"} >{title}</ButtonContainer>
  )
}

export { Button }