import { useEffect, useState } from "react"
import { CSSTransition, SwitchTransition } from "react-transition-group"
import SignIn from "./SignIn"
import SignUp from "./SignUp"
import './loginAnim.css'
import { useLocation } from "react-router"

export const FormContent = () => {
  const [toggler, setToggler] = useState(true)
  let location = useLocation()

  useEffect(() => {
    location === "signin" ? setToggler(true) : setToggler(false)
  }, [location])

  return (
    <>
    <SwitchTransition mode="out-in">
      <CSSTransition key={toggler} timeout={1750} classNames="login-anim">
        {toggler ? <div><SignUp /></div> : <div><SignIn /></div>}
      </CSSTransition>
    </SwitchTransition>
    </>
  )
}
