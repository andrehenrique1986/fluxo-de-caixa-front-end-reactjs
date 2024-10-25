import { BrowserRouter } from "react-router-dom"
import PaginaPrincipal from "../PaginaPrincipal/PaginaPrincipal"



const PaginaPrincipalWrapper = () => {
    return (
        <BrowserRouter>
            <PaginaPrincipal />
        </BrowserRouter>
    )
}

export default PaginaPrincipalWrapper;