import { useState, useEffect } from "react";
import axios from 'axios'
import { getArtsAxios } from "./axios";
import { useSelector, useDispatch } from 'react-redux';
import { artsActions } from "../store/store";

const useGetArts = () => {
    const [results, setResults] = useState([])
    //const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState({})
    //const [hasNextPage, setHasNextPage] = useState(false)
    const [arrayLength, setArrayLength] = useState(0)

    const dispatch = useDispatch()

    const pageNum = useSelector((state) => state.cart.pageNum);
    const isLoading = useSelector((state) => state.cart.isLoading);


    useEffect(() => {
        console.log('useGetArts')
        dispatch(artsActions.setIsLoading(true))
        setIsError(false)
        setError({})

        const controller = new AbortController();
        const { signal } = controller;

    
        getArtsAxios(pageNum, signal)
        .then(data => {
            console.log(data)
            setResults(prev =>[...prev, ...data.data])
            setArrayLength(results.length)
            dispatch(artsActions.setIsLoading(false))
        })
        .catch((err)=> {    
            dispatch(artsActions.setIsLoading(false))
            //signal.aborted happens when controller.abort() gets called
            //by the user therefore do not need to return the err msg
            if(signal.aborted) return;
            setIsError(true)
            setError({ message: err.message })
        })


        return () => controller.abort();    

    }, [pageNum])

    return { isLoading, isError, error, results, arrayLength, setResults };
}

export default useGetArts;
