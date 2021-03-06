import { useState } from "react"
import { useUser } from "../../../hooks"
import { Button } from "../../atoms"
import { Modal } from "../../molecules"
import { LoginForm, RegisterForm } from "../../organisms"

type AccountModalProps = {
   open: boolean
   onClose: () => void
}

const AccountModal: React.FC<AccountModalProps> = ({ open, onClose }) => {
   const [openSignUp, setOpenSignUp] = useState(false)
   const { user, logout } = useUser()

   return (
      <Modal open={open} onClose={onClose} size={"400px"}>
         {user ? (
            <Button onClick={logout} icon="logout">
               Logout
            </Button>
         ) : openSignUp ? (
            <RegisterForm openLogin={() => setOpenSignUp(false)} />
         ) : (
            <LoginForm
               openSignUp={() => setOpenSignUp(true)}
               close={onClose}
               open={open}
            />
         )}
      </Modal>
   )
}

export default AccountModal
