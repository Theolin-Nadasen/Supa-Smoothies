import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react"
import SmoothieCard from "../components/smoothieCard"

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')

  useEffect(() => {

    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from('smoothies')
        .select()
        .order(orderBy, {ascending: false})

      if (error) {
        setFetchError('could not fetch smoothies')
        setSmoothies(null)
        console.log(error)
      }

      if (data) {
        setSmoothies(data)
        setFetchError(null)
      }
    }

    fetchSmoothies()

  }, [orderBy])

  const handleDelete = (id) => {
    setSmoothies((prevSmoothies) => {
      return prevSmoothies.filter(sm => sm.id !== id)
    })
  }

  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {smoothies && (
        <div className="smoothies">
          <div>
            <p>order by:</p>
            <button onClick={() => {setOrderBy('created_at')}}>date</button>
            <button onClick={() => {setOrderBy('title')}}>title</button>
            <button onClick={() => {setOrderBy('rating')}}>rating</button>
          </div>
          <div className="smoothie-grid">
            {smoothies.map(smoothie => (
              <SmoothieCard key={smoothie.id} smoothie={smoothie} onDelete={handleDelete}></SmoothieCard>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home