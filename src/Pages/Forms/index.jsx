import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { artsActions } from '../../store/store';
import useSearchArts from '../../api/useSearchArts';
import { useNavigate } from 'react-router-dom';

export default function SearchForm() {

    const { isError, error } = useSearchArts()

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const textInput = useSelector((state) => state.cart.textInput)
    const searchValue = useSelector((state) => state.cart.searchValue);
    const searchedValues = useSelector((state) => state.cart.searchedValues)

    function handleChange (e) {
        //console.log(e.target.value)
        dispatch(artsActions.setTextInput(e.target.value))
    }

    function handleSumbit(e) {
        e.preventDefault();
        dispatch(artsActions.setSearchArray([]))
        dispatch(artsActions.setSearchValue(textInput))
        dispatch(artsActions.setSearchedValues(textInput))
        navigate(`arts/search/${textInput}`);   
    }

        const searchedValuesArray = searchedValues.map((value, i) => {
            return(<Link className='search-value' key={i} to={`arts/search/${value}`}>{value}</Link>)
        })
    
    
  return (
      <form onSubmit={handleSumbit}>
              <input name={searchValue} type='text' placeholder='Search For Art' value={textInput} onChange={handleChange} id="form-search"/>
                
              <button type='submit' id='button'>search</button>
              {searchedValues && <ul id='search-value-array'>{searchedValuesArray}</ul>}
          </form>


  )
}   
