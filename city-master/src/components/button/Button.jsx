import style from './button.module.css'

export const Button = ({text, click}) => {
  return (
    <button class={style.btn} type="submit" onClick={() => click && click()}>{text}</button>
  )
}
