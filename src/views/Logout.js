import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { clienteService as useClienteService } from '../services/clienteService'

const Logout = () => {
    const clienteService = useClienteService()
    const history = useHistory()

    useEffect(() => {
        const doLogout = async () => {
            await clienteService.logout()
            history.push('/login')
        }

        doLogout()
    }, [])

    return <></>
}

export default Logout
