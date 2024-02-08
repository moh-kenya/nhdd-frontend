import { useEffect, useState } from "react"
import { API_BASE_URL } from '../index';



export default function Home() {
    const [data, setData] = useState([])
    useEffect(()=>{
        fetch(`${API_BASE_URL}/users`).then((res)=>{
            return res.json()
        })
        .then((data)=>{
            setData(data)
        })
    },[])
    return(
        <div>
            {
                data.map((user)=> (
                    <li key={`user.name`}>{user.name}</li>
                ))
            }
        </div>
    )
}