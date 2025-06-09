import { useNavigate, useParams } from "react-router-dom"
import supabase from '../config/supabaseClient'
import { useEffect, useState } from "react"

const Update = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')

  useEffect(() => {
    const fetchItem = async() => {
      const {data, error} = await supabase
        .from('smoothies')
        .select()
        .eq('id', id)
        .single()
    
      if (error){
        navigate('/', {replace : true})
      }

      if(data){
        setTitle(data.title)
        setMethod(data.method)
        setRating(data.rating)

        console.log(title, method, rating)
      }
    }

    fetchItem()

  }, [id, navigate])


  const sumbmitHandler = async(e) => {
    e.preventDefault()

    if(!title || !method || !rating){
      console.log('data did not load')
      return
    }

    const {data, error} = await supabase
      .from('smoothies')
      .update({title, method, rating})
      .eq('id', id)
      .select()

    if (error){
      console.log('error when updating')
      return
    }

    if(data){
      navigate('/')
    }
  }

  return (
    <div className="page update">
      <h2>Update - {id}</h2>


      <form onSubmit={sumbmitHandler}>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} />
        <label htmlFor="method">Method</label>
        <input id="method" type="text" value={method} onChange={(e) => { setMethod(e.target.value) }} />
        <label htmlFor="rating">Rating</label>
        <input id="rating" type="text" value={rating} onChange={(e) => { setRating(e.target.value) }} />

        <input type="submit" value={'Update'}/>
      </form>
    </div>
  )
}

export default Update