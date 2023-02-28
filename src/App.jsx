import { useEffect, useState } from 'react'
import './App.css'
import PhotoComponent from './component/PhotoComponent'

function App() {
  const apiKey = `Iv2GvHOGSHue1ZUpCH5e_9aDhyMLHMs5m5XiceF3Fwo`
  const [photo,setPhotos] = useState([])
  const [page,setPage] =useState(1)
  const [isLoading,setIsLoading] = useState(false)

  const fetchImage =async()=>{
    setIsLoading(true)
    try{
       const apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&page=${page}`
        const response = await fetch(apiUrl)
        const data =await response.json()
        setPhotos((oldData)=>{
          return [...oldData,...data]
        })
    }catch(error){
      console.log(error)
    }
    setIsLoading(false)
  }

  useEffect(()=>{
    fetchImage()
  },[page])

  useEffect(()=>{
   const event= window.addEventListener('scroll',()=>{
      if(window.innerHeight+window.scrollY>document.body.offsetHeight-500 && !isLoading){
        setPage((oldPage)=>{
          return oldPage+1
        })
      }
    })
    return ()=>{
      window.removeEventListener('scroll',event)
    }
  },[])

  return (
    <main>
      <h1>Infinite Scroll Photo | Unsplash API</h1>
      <section className='photo'>
        <div className="display-photo">
          {photo.map((data,index)=>{
            return  <PhotoComponent key={index} {...data}/>
          })}
        </div>

      </section>
     
    </main>
  )
}

export default App
