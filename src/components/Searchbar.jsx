import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import data from '../MOCK_DATA.json';
import { Button } from '@mui/material';

export default function Searchbar() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [editable, setEditable] = useState(false);
    const [showTable, setShowTable] = useState(false); // Khởi tạo showTable là false

    useEffect(() => {
        setUsers(data);
    }, []);

    useEffect(() => {
        if (search.trim() === '') {
            setShowTable(false); // Không hiển thị bảng nếu không có kết quả tìm kiếm
            return;
        }

        const filteredUsers = users.filter(user =>
            user.username.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
        );

        setShowTable(filteredUsers.length > 0); // Hiển thị bảng nếu có kết quả tìm kiếm
    }, [search, users]);

    function handlePressEnter(e) {
        if (e.keyCode === 13) {
          setEditable(false)
        }
      }

    function handleEditAll() {
        setEditable(true); // Bật chế độ chỉnh sửa cho tất cả user
    }

    return (
        <div className="flex flex-col items-center">
           <div className='text-5xl font-sans'>Search</div>
            <div className="border-2 border-black rounded-lg w-96 absolute left-1/2 -translate-x-1/2 mt-16">
                <SearchIcon className='text-blue-600' />
                <input
                    className="outline-none px-4 py-2"
                    placeholder='Type to search ...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className='mt-20'>
                {showTable && (
                    <table className='table-auto'>
                        <thead>
                            <tr>
                                <th className='pt-5 px-10'>Username</th>
                                <th className='pt-5 px-10'>Email</th>
                                <th className='pt-5 px-10'>Birthday</th>
                                <th className='pt-5 px-10'>
                                    <button 
                                        className='bg-slate-500 rounded-xl text-slate-50 w-24' 
                                        onClick={handleEditAll} // Khi bấm nút này, bật chế độ chỉnh sửa
                                    >
                                        Edit All
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users
                                .filter(item =>
                                    item.username.toLowerCase().includes(search.toLowerCase()) ||
                                    item.email.toLowerCase().includes(search.toLowerCase())
                                )
                                .map((item, index) => (
                                    <tr key={index} className='text-center'>
                                        
                                        <td className='pt-5 px-10'>
                                            {editable ? (
                                                <input 
                                                    onBlur={() => setEditable(false)}
                                                    onKeyUp={(e) => handlePressEnter(e)}
                                                    type="text"
                                                    value={item.username}
                                                    onChange={(e) => {
                                                        const updatedUsers = [...users];
                                                        updatedUsers[index].username = e.target.value;
                                                        setUsers(updatedUsers);
                                                    }}
                                                />
                                            ) : (
                                                item.username
                                            )}
                                        </td>
                                        <td className='pt-5 px-10'>{item.email}</td>
                                        <td className='pt-5 px-10'>{item.birthday}</td>       
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
