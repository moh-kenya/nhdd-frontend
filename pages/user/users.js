import { useEffect, useState } from "react"

const API_BASE_URL  = 'http://41.89.92.186:8000/users'


export default function Home() {
    const [data, setData] = useState([])
    useEffect(()=>{
        fetch(API_BASE_URL).then((res)=>{
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