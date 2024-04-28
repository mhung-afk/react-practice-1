import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import data from "../MOCK_DATA.json"
function Searchbar() {
    const [search, setSearch] = useState("")
    return (
        <div className="flex flex-col items-center">
            <div className="border-2 border-black rounded-lg w-96 absolute left-1/2 -translate-x-1/2 mt-2">
                <SearchIcon className='text-blue-600' />
                <input className="outline-none px-4 py-2" placeholder='Type to search ...' value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className='text-center mt-16 bg-slate-300 border-black rounded-md'>
                <table className='table-auto'>
                    <thead className='p-32'>
                        <tr>
                            <th className='p-5'>Username</th>
                            <th className='p-5'>Email</th>
                            <th className='p-5'>Birthday</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.filter((item) => {
                            return search.toLowerCase() === '' ? item : 
                            item.username.toLowerCase().includes(search) 
                            ||
                            item.email.toLowerCase().includes(search)
                            ||
                            item.birthday.toLowerCase().includes(search)                            
                        }).map((item, index) => (
                            <tr key={index}>
                                <td className='p-5'>{item.username}</td>
                                <td className='p-5'>{item.email}</td>
                                <td className='p-5'>{item.birthday}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Searchbar