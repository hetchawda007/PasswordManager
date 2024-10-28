import { useEffect, useState, useRef } from "react"
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const Manager = () => {

    const eye = useRef()
    const pass = useRef()
    const [Pass, setPass] = useState({ site: "", username: "", password: "" })
    const [localpass, setlocalpass] = useState([])
    const save = useRef(null)
    const submit = useRef(null)

    const getpass = async () => {
        let req = await fetch("http://localhost:3000")
        let pass = await req.json()
        setlocalpass(pass)
    }

    useEffect(() => {
        getpass()
    }, [])


    const showpassword = () => {
        if (eye.current.src.includes("/public/eye-hidden.png")) {
            pass.current.type = "text"
            eye.current.src = "/public/eye.png"
        }
        else {
            pass.current.type = "password"
            eye.current.src = "/public/eye-hidden.png"
        }
    }

    const handlechange = (e) => {
        setPass({ ...Pass, [e.target.name]: e.target.value })
    }

    const handleadd = async () => {

        if (Pass.site.length > 3 && Pass.username.length > 3 && Pass.password.length > 3) {
            setlocalpass([...localpass, { ...Pass, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...localpass, Pass]))
            await fetch("http://localhost:3000", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Pass) })
            setPass({ site: "", username: "", password: "" })
            toast('Password Added ✅', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

        else {
            toast('Enter valid Url, Username and Password');
            setPass({ site: "", username: "", password: "" })
        }
    }

    const copytext = (text) => {
        navigator.clipboard.writeText(text)
        toast('Copied to clipboard ✅', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const handleedit = (item) => {
        setPass(item)
        save.current.style.display = "block"
        submit.current.style.display = "none"
    }


    const handlesave = async (item) => {

        toast('Password Edited ✅', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        save.current.style.display = "none"
        submit.current.style.display = "block"

        console.log(item);
        console.log(item._id);
        console.log(item.password);
        await fetch("http://localhost:3000", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) })

        let req = await fetch("http://localhost:3000")
        let pass = await req.json()
        setlocalpass(pass)
        setPass({ site: "", username: "", password: "" })

    }

    const handledelete = async (item) => {

        const confirm = window.confirm('Do you really want to delete this password ?')
        if (confirm) {
            toast('Password Deleted ✅', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            await fetch("http://localhost:3000", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ "site": item.site, "username": item.username, "password": item.password }) })

            let req = await fetch("http://localhost:3000")
            let pass = await req.json()
            setlocalpass(pass)
            setPass({ site: "", username: "", password: "" })

        }
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition='Bounce'
            />
            <ToastContainer />
          
            <div className="box flex flex-col justify-center items-center w-[80%] mx-auto gap-5 max-md:w-[95%] overflow-y-auto">
                <div className="head flex items-center  mt-10">
                    <span className="text-red-600 font-extrabold text-4xl max-md:text-2xl">&lt;</span>
                    <span className="cursor-pointer text-4xl font-extrabold text-gray-900 max-md:text-2xl">iPassword</span>
                    <span className="text-red-600 font-extrabold text-4xl max-md:text-2xl">Manager /&gt;</span>
                </div>
                <div className="head flex gap-2 justify-center">
                    <p className="text-lg font-bold max-md:text-base text-wrap">Manage Your Passwords At One Place</p>
                    <div className="smile">
                        <lord-icon
                            src="https://cdn.lordicon.com/ebvizisb.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#121331,secondary:#6c16c7"
                            style={{ 'width': '30px', 'height': '30px' }}>
                        </lord-icon>
                    </div>
                </div>

                <input onChange={handlechange} value={Pass.site} className="placeholder-gray-900 rounded-full text-center py-1 border-purple-500 border w-[60%] pt-1 max-md:w-full" placeholder="Enter website URL" type="text" name="site" id="site" />

                <div className="flex relative justify-center w-full gap-5 max-md:flex-col">

                    <input onChange={handlechange} value={Pass.username} className="rounded-full text-center py-1 border-purple-500 border placeholder-gray-700 w-[28%] pt-1 max-md:w-full" placeholder="Enter Username" type="text" name="username" id="username" />
                    <div className="relative flex items-center">
                        <input onChange={handlechange} value={Pass.password} ref={pass} className="rounded-full text-center py-1 border-purple-500 border placeholder-gray-700 pt-1 max-md:w-full" placeholder="Enter Password" type="password" name="password" id="password" />
                        <span className="absolute right-3 cursor-pointer" onClick={showpassword}><img ref={eye} width={16} src="/public/eye-hidden.png" alt="show" /></span>
                    </div>

                </div>
                <button onClick={handleadd} ref={submit} className="border border-purple-950 bg-purple-500 hover:bg-purple-400 rounded-full px-5 py-2 w-fit text-base font-semibold mt-3 transition-all">

                    <div className="submit flex items-center space-x-1 justify-center text-lg">
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                            colors="primary:#320a5c"
                            style={{ width: '28px', height: '28px' }}>
                        </lord-icon>

                        <p>Add</p>
                    </div>
                </button>

                <button onClick={() => { handlesave(Pass) }} ref={save} className="border border-purple-950 bg-purple-500 hover:bg-purple-400 rounded-full px-4 w-fit py-1 text-base font-semibold items-center gap-2 justify-center mt-3 transition-all hidden">
                    <div className="add flex items-center gap-2 justify-center text-lg">

                        <lord-icon
                            src="https://cdn.lordicon.com/fkaukecx.json"
                            trigger="hover"
                            colors="primary:#320a5c"
                            style={{ width: '30', height: '30' }}>
                        </lord-icon>
                        <p>Save</p>
                    </div>
                </button>

            </div>
            <h1 className="font-bold text-2xl my-8 flex justify-center">Your Passwords</h1>

            {localpass.length > 0 ? <div className="showpasswords w-[80%] mx-auto border flex flex-col items-center space-y-8">
                <div className="pass">

                    <table className="table-auto rounded-2xl overflow-hidden mb-14">
                        <thead className="bg-purple-700">
                            <tr>
                                <th className="max-lg:px-0 px-24 py-2 max-md:text-sm">Url</th>
                                <th className="max-lg:px-0 px-24 py-2 max-md:text-sm">Username</th>
                                <th className="max-lg:px-0 px-24 py-2 max-md:text-sm">Password</th>
                                <th className="max-lg:px-0 px-8 py-2 max-md:text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-purple-200 text-wrap">

                            {localpass.map((item) => (

                                <tr className="text-center" key={item._id}>
                                    <td className="border border-white px-4 py-2 max-md:px-1">
                                        <div className="site flex gap-3 items-center justify-center max-md:text-[12px] max-sm:text-[10px] max-sm:flex-col">
                                            <a target="_blank" href={item.site}>{item.site}</a>
                                            <div className="Copy" onClick={() => copytext(item.username)}>
                                                <img className="h-4 hidden max-sm:block" src="/public/copy.png" alt="" />
                                            </div>
                                            <div className="copy cursor-pointer max-sm:hidden" onClick={() => copytext(item.site)}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/hmqxevgf.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                    state="hover-slide"
                                                    colors="primary:#121331,secondary:#6c16c7"
                                                    style={{ width: '20px', height: '20px' }}>
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="border border-white px-4 py-2 max-md:px-1">
                                        <div className="site flex gap-3 items-center justify-center max-md:text-[12px] max-md:gap-2 max-sm:text-[10px] max-sm:flex-col">
                                            <div>{item.username}</div>
                                            <div className="Copy" onClick={() => copytext(item.username)}>
                                                <img className="h-4 hidden max-sm:block" src="/public/copy.png" alt="" />
                                            </div>
                                            <div className="copy cursor-pointer max-sm:hidden" onClick={() => copytext(item.username)}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/hmqxevgf.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                    state="hover-slide"
                                                    colors="primary:#121331,secondary:#6c16c7"
                                                    style={{ width: '20px', height: '20px' }}
                                                >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="border border-white px-4 py-2 max-md:px-1 text-center">

                                        <div className="site flex gap-3 items-center justify-center max-md:text-[12px] max-sm:text-[10px] max-sm:flex-col">
                                            <div>{"*".repeat(item.password.length)}</div>
                                            <div className="Copy" onClick={() => copytext(item.password)}>
                                                <img className="h-4 hidden max-sm:block" src="/public/copy.png" alt="" />
                                            </div>
                                            <div className="copy cursor-pointer max-sm:hidden" onClick={() => copytext(item.password)}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/hmqxevgf.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                    state="hover-slide"
                                                    colors="primary:#121331,secondary:#6c16c7"
                                                    style={{ width: '20px', height: '20px' }}>
                                                </lord-icon>
                                            </div>
                                        </div>

                                    </td>

                                    <td className="border border-white px-4 py-2 max-md:px-1 ">
                                        <div className="flex justify-evenly items-center max-sm:gap-1">
                                            <div onClick={() => { handleedit(item) }} className="update hidden max-sm:block"><img className="h-4" src="/public/edit.png" alt="" /></div>
                                            <div className="edit cursor-pointer max-sm:hidden" onClick={() => { handleedit(item) }}>

                                                <lord-icon
                                                    src="https://cdn.lordicon.com/ogkflacg.json"
                                                    trigger="hover"
                                                    style={{ width: '28px', height: '28px' }}>
                                                </lord-icon>
                                            </div>

                                            <div onClick={() => { () => handledelete(item) }} className="update hidden max-sm:block"><img className="h-4" src="/public/delete.png" alt="" /></div>

                                            <div className="delete cursor-pointer max-sm:hidden" onClick={() => { handledelete(item) }}>

                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ width: '28px', height: '28px' }}>
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>

                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div >
                : <div className="w-[80%] mx-auto text-2xl font-bold flex justify-center mb-14 max-md:font-semibold max-md:text-xl ">No passwords to show please enter some :(</div>}

        </>
    )
}

export default Manager
