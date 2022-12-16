import React from "react";
import { useParams , NavLink, Outlet } from 'react-router-dom'

const Welcome = () => {

    return(
        <>
        <div id="welcome"></div>
        <NavLink className='content' to='arts'>The Art Institute of Chicago Museum</NavLink>

        {/* <h1 class='content'>The Art Institute of Chicago Museum</h1> */}
        </>
    )
}

export default Welcome
