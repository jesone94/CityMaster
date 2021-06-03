import { useState } from 'react'
import style from './input.module.css'

export const Input = ({placeholder, type, label}) => {
  const [labelParams, setlabelParams] = useState(false)
  const [input, setInput] = useState('')
  return (
    <>
    <label>{label}</label>
    <input placeholder={placeholder} type={type} onChange = {e => setInput(e.target.value)} value={input}/>
    </>
  )
}
