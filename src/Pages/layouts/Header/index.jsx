import React from "react";
import { useParams , NavLink, Outlet, useLocation, } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { artsActions } from "../../../store/store";
import LoadingSpinner from "../../LoadingSpinner";
import SearchForm from "../../Forms";

const Header = () => {
    const { name } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    //isLoading is shared between useGetArts and useSearchArts
    const isLoading = useSelector((state) => state.cart.isLoading);
    
    return( 
        <>
          <nav id='nav'>  
        {location.pathname !== '/' && <NavLink className='home' to='/'>Home</NavLink>}
        {location.pathname !== '/' && <NavLink className='credit' to='/credit'>Credit</NavLink>}
        <SearchForm />
          </nav>

        {location.pathname === '/' && <NavLink className='enter' to='arts'>Enter</NavLink>}
        <br />
        <br />
        <Outlet />
        {isLoading && <LoadingSpinner />}
    </>
    )
}

export default Header
