import { ReactNode } from "react"
import NavBar from "./NavBar"

interface Props {
    children: ReactNode,
    title?: string
}

const Layout = ({children,title}: Props) => {
    return(
        <>
            <NavBar title={title}/>
            {children}
        </>
    )
}

export default Layout