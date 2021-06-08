
import style from './button.module.css'
import { MiniLoader } from './Mini-loader'
import FavoriteIcon from '@material-ui/icons/Favorite';

export const Button = ({text, click}) => {
  return (
    <button className={style.btn} type="submit" onClick={() => click && click()}>{text}</button>
  )
}
export const ButtonCls = ({text, click}) => {
  return (
    <button className={style.btnCls} type="submit" onClick={() => click && click()}>{text}</button>
  )
}
export const ButtonLoader = ({click}) => {
  return (
    <button className={style.btn} type="submit" onClick={() => click}><MiniLoader /></button>
  )
}
export const ButtonLike = ({click}) => {
  return (
    <button className={[style.btn, style.like].join(' ')} type="submit" onClick={() => click && click()}>В избранное&nbsp;<FavoriteIcon /></button>
  )
}
