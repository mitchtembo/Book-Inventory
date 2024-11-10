import supabase from "../superbaseClient"
import { useState, useEffect } from "react"


const useBooks = () => {

    const [books, setBooks] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const {data, error: supabaseError} = await supabase.from('books').select('*');

                if(supabaseError) {
                    console.log("Error occured while fetching from supabase: ",supabaseError)
                }else {
                    setBooks(data || [])
                    
                }
            }catch(error) {
                setError(error)
                console.log("caught error:",error)
            }finally {
                setLoading(false)
            }
        }
        fetchBooks();
        
    },[])

    return {books,error,loading}
}

export default useBooks;