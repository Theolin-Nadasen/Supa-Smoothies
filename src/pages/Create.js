import { useState } from "react"
import supabase from '../config/supabaseClient'
import { useNavigate } from "react-router-dom"

const Create = () => {
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null)

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()

    if(!title || !method || !rating){
      setFormError('Please fill in the form')
      return
    }

    const {data, error} = await supabase
      .from('smoothies')
      .insert([{title : title, method : method, rating: rating}])
      .select()

    if(error){
      console.log(error)
      setFormError('Please fill in the form')
    }

    if(data){
      console.log(data)
      setFormError(null)
      navigate('/')
    }
  }

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} />
        <label htmlFor="method">Method</label>
        <input id="method" type="text" value={method} onChange={(e) => { setMethod(e.target.value) }} />
        <label htmlFor="rating">Rating</label>
        <input id="rating" type="text" value={rating} onChange={(e) => { setRating(e.target.value) }} />

        <input type="submit" />
      </form>
    </div>
  )
}

export default Create