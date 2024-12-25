import { useCallback, useState, useEffect, useRef } from 'react'
//import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumber] = useState(false)
  const [charAllowed, setChar] = useState(false)
  const [password, setpassword] = useState("")
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllowed) {
      str += '0123456789'
    }
    if (charAllowed) {
      str += "!@#$%^&*()_+-="
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setpassword(pass)

  }, [length, numAllowed, charAllowed, setpassword])

  const copyToClipboard = useCallback(() =>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {passwordGenerator()}, [length, numAllowed, charAllowed, passwordGenerator]
  )
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-xl px-4 py-3 my-8 text-white bg-black '>
        <h1 className='text-center text-3xl my-3'>Password Generator</h1>
        <div className='flex shadow rounded-xl overflow-hidden mb-4'>
          <input type="text" 
          value={password}
          className='outline-none w-full py-1 px-3 text-black'
          placeholder='Password'
          readOnly
          ref={passwordRef}
          />
          <button 
          onClick={copyToClipboard}
          className='bg-blue-500 outline-none px-3 py-0.5 shrink-0'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" 
            min={8}
            max={16}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" 
            defaultChecked = {numAllowed}
            id='numberInput'
            onChange={() => {
              setNumber((prev) => !prev)
            }}
            
            />
            <label >Number</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" 
            defaultChecked = {charAllowed}
            id='charInput'
            onChange={() => {
              setChar((prev) => !prev)
            }}
            
            />
            <label >Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
