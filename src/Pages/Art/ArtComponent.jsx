import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { artsActions } from '../../store/store';
import { useSelector } from 'react-redux';

const ArtTest = React.forwardRef(({ art }, ref) => {
    const navigate =  useNavigate();
    const dispatch = useDispatch();
    const params = useParams()
    const [img, setImg] = useState('');
    const [imgLoaded, setImgLoaded] = useState(false);
    const searchValue = useSelector((state) => state.cart.searchValue);
    const isLoading = useSelector((state) => state.cart.isLoading);

    function checkArt () {
        if (searchValue) navigate(`${art.id}`)
        navigate(`${art.id}`, { state: { art: art } })
    }


    let postBody = (  
        <>
            <div className='frame'>
            <img src={`https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`}></img>
            </div>
            {/* <p>{art.artist_title}</p> */}
            {/* <p>{art.category_titles}</p> */}
            <p>{art.title}</p>
            <p>{art.credit_line}</p>
            <button onClick={checkArt}>Check out full img</button>
        </> 
    )

    if(searchValue) {

        postBody = (  
            <>
                <div className='frame'>
                {imgLoaded ? <img src={`https://www.artic.edu/iiif/2/${img}/full/843,/0/default.jpg`}
                ></img> : <>STILL LOADING</>}
                </div>
                <p>{art.title}</p>
                <p>{art.credit_line}</p>
                <button onClick={checkArt}>Check out full img for search</button>
            </> 
        )
    }

    useEffect(() => {

        setImgLoaded(false)
        function getImg () {
            axios(`https://api.artic.edu/api/v1/artworks/${art.id}`, {
                method: 'GET',
              })
              .then (art => {
                //console.log(art.data.data.image_id)
                setImg(art.data.data.image_id)
                setImgLoaded(true)
              })
              .catch(err => {
                console.warn(err)
              })           
          }
          getImg();

    }, [isLoading])


 const content = ref ? <div className='art' ref={ref}>{postBody}</div> : <div className='art'>{postBody}</div>
    
 return content
})

export default ArtTest
