import { useCallback, useEffect, useState } from "react"
import { AccountModal, MainPage } from "./components"
import { FavModal } from "./components/pages"
import LoginContext from "./context/LoginContext"

function App() {
   const [accountOpen, setAccountOpen] = useState(false)
   const [favListOpen, setFavListOpen] = useState(false)

   window.fbAsyncInit = () => {
      FB.init({
         appId: process.env.REACT_APP_FB_APP_ID,
         status: true,
         xfbml: false,
         cookie: true,
         version: "v11.0",
      })
   }

   useEffect(() => {
      setTimeout(() => {
         const ovrflwState = favListOpen || accountOpen ? "hidden" : "auto"
         document.querySelector("body")!.style.overflow = ovrflwState
      }, 150)
   }, [favListOpen, accountOpen])

   return (
      <LoginContext>
         <MainPage
            openAccount={useCallback(() => {
               setAccountOpen(true)
            }, [setAccountOpen])}
            openList={() => setFavListOpen(true)}
         />
         <AccountModal
            open={accountOpen}
            onClose={useCallback(() => setAccountOpen(false), [setAccountOpen])}
         />
         <FavModal
            open={favListOpen}
            onClose={useCallback(() => setFavListOpen(false), [setFavListOpen])}
         />
      </LoginContext>
   )
}

export default App
