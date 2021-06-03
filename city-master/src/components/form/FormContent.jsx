import { useState } from "react"
import { CSSTransition, SwitchTransition } from "react-transition-group"
import SignIn from "./SignIn"
import SignUp from "./SignUp"
import './loginAnim.css'

export const FormContent = () => {
  const [signIn, setSignIn] = useState(false)
  return (
    <>
    <SwitchTransition mode="out-in">
      <CSSTransition key={signIn} timeout={1750} classNames="login-anim">
        {/* <button
          className="waves-effect waves-light btn mr-6"
          onClick={() => editStatusHandler(id, completed)}
        >
          {completed ? "Не выполнено" : "Выполнено"}
        </button> */}
        {signIn ? <div><SignUp /></div> : <div><SignIn /></div>}
      </CSSTransition>
    </SwitchTransition>
    </>
  )
}
