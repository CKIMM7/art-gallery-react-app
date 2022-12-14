import { useState, useEffect } from "react";
import axios from 'axios'
import { getArtsAxios } from "./axios";
import { useSelector, useDispatch } from 'react-redux';
import { artsActions } from "../store/store";
import { useNavigate } from "react-router-dom";

const useSearchArts = () => {

    const navigate = useNavigate()
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState({})


    const dispatch = useDispatch()

    const searchValue = useSelector((state) => state.cart.searchValue);
    const pageNumSearch = useSelector((state) => state.cart.pageNumSearch);
    const searchArray = useSelector((state) => state.cart.searchArray);
    const nextPage = useSelector((state) => state.cart.nextPage);

    useEffect(() => {
        dispatch(artsActions.setIsLoading(true))
        dispatch(artsActions.setIsError(false))
        dispatch(artsActions.setError({}))

        const controller = new AbortController();
        const { signal } = controller;

        console.log(searchValue)
    
        getArtsAxios(pageNumSearch, signal, searchValue)
        .then(data => { 
            console.log(searchValue)    


            let newArray = searchArray.concat(data.data)
            console.log(newArray)

            dispatch(artsActions.setSearchArray(newArray))
            dispatch(artsActions.setIsLoading(false))
            dispatch(artsActions.setIsError(false))
        })
        .catch((err)=> {
            dispatch(artsActions.setIsLoading(false))
            //signal.aborted happens when controller.abort() gets called
            //by the user therefore do not need to return the err msg
            if(signal.aborted) return;
            dispatch(artsActions.setIsError(true))
            dispatch(artsActions.setError({ message: err.message }))
        })


        return () => controller.abort();    

    }, [searchValue, pageNumSearch, nextPage])

    return { isError, error };
}

export default useSearchArts;
