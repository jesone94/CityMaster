import { useState } from 'react'


export const Input = ({placeholder, type, label}) => {

  const [input, setInput] = useState('')
  return (
    <>
    <label>{label}</label>
    <input placeholder={placeholder} type={type} onChange = {e => setInput(e.target.value)} value={input}/>
    </>
  )
}
