import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { artsActions } from '../../store/store';
import useSearchArts from '../../api/useSearchArts';
import { useNavigate } from 'react-router-dom';

export default function SearchForm() {

    const { isError, error } = useSearchArts()

    const dispatch = useDispatch();
    const textInput = useSelector((state) => state.cart.textInput)
    const searchValue = useSelector((state) => state.cart.searchValue);
    const navigate = useNavigate()

    function handleChange (e) {
        //console.log(e.target.value)
        dispatch(artsActions.setTextInput(e.target.value))
    }

    function handleSumbit(e) {
        e.preventDefault();
        dispatch(artsActions.setSearchArray([]))
        dispatch(artsActions.setSearchValue(textInput))
        navigate(`arts/search/${textInput}`);   
    }

let search = {
    pathname: '/arts',
    search: `?search=${textInput}`,
  }
    
  return (
      <form onSubmit={handleSumbit}>

              <input name={searchValue} type='text' placeholder='Search For Art' value={textInput} onChange={handleChange} id="form-search"/>
                
              <button type='submit' id='button'>search</button>
          </form>


  )
}
