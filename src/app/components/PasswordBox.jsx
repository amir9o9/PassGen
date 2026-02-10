"use client";
import React, { useRef, useState } from 'react';
import Image from 'next/image';

  // Character sets
  const upperCase = "ABCDEFGHIJKLMNOPQRTSUVWXYZ";
  const lowerCase = "abcdefghijklmnopqrtsuvwxyz";
  const numbers   = "0123456789";
  const symbols   = "@#$%^&*()_-=+<>/|";

function PassCheck(password){
  let passLevel = 0;
  if(password.length>8){
    passLevel += 1;
  }

  const hasUpperCase = 
    upperCase.split('').some(char=>
    password.includes(char))
  const hasLowerCase = 
    lowerCase.split('').some(char=>
    password.includes(char))

  const hasNumber = 
    numbers.split('').some(char=>
    password.includes(char))

  const hasSymbol = 
    symbols.split('').some(char=>
    password.includes(char))

  if(hasUpperCase){
    passLevel+=1;
  }
  if(hasLowerCase){
    passLevel+=1;
  }
  if(hasNumber){
    passLevel+=1;
  }
  if(hasSymbol){
    passLevel+=1;
  }
  
  if(passLevel<=0 || passLevel<=2){
    return "weake"
  }else if(passLevel == 3){
    return "avreage"
  }else if(passLevel==4 || passLevel>=5){
    return "strong"
  }
  
}

function PasswordBox() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [copied, setCopied] = useState(false);

  // Checkbox states
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);

  const inputRef = useRef(null);


  //password check
  const [passLevel,setPassLevel]=useState("");


  const getAllowedChars = () => {
    let chars = "";
    if (useUppercase) chars += upperCase;
    if (useLowercase) chars += lowerCase;
    if (useNumbers)   chars += numbers;
    if (useSymbols)   chars += symbols;
    return chars;
  };

  const generatePassword = () => {
    const allowedChars = getAllowedChars();

    if (allowedChars.length === 0) {
      setPassword("Please select at least one character type");
      return;
    }

    let result = "";

    // Guarantee at least one character from each selected type
    if (useUppercase) {
      result += upperCase[Math.floor(Math.random() * upperCase.length)];
    }
    if (useLowercase) {
      result += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    }
    if (useNumbers) {
      result += numbers[Math.floor(Math.random() * numbers.length)];
    }
    if (useSymbols) {
      result += symbols[Math.floor(Math.random() * symbols.length)];
    }

    // Fill the rest with random characters from allowed set
    while (result.length < length) {
      result += allowedChars[Math.floor(Math.random() * allowedChars.length)];
    }

    // Trim if somehow longer (very rare)
    if (result.length > length) {
      result = result.slice(0, length);
    }

    setPassword(result);
    setCopied(false);
    
    setPassLevel(PassCheck(result))
  };

  const copyToClipboard = async () => {
    if (inputRef.current && password) {
      await navigator.clipboard.writeText(inputRef.current.value);
      setCopied(true);
    }
  };



  return (
    <section>
      <div className="bg-white rounded-2xl min-w-[320px] md:min-w-[450px] px-8 py-6 flex flex-col mx-auto items-center justify-between text-black shadow-lg">
        <div>
          <p className='mb-2 text-1xl'>*
            {passLevel}*
          </p>
        </div>
        {/* Password display + copy */}
        <div className="flex outline outline-1 rounded-full w-full h-[65px] px-5 py-3 mb-6 justify-between items-center bg-gray-50">
          <input
            type="text"
            readOnly
            placeholder="Password will appear here"
            ref={inputRef}
            value={password}
            className="w-full bg-transparent focus:outline-none text-xl font-mono"
          />
          <Image
            src="/copy_icon.png"
            width={30}
            height={30}
            alt="copy"
            className="cursor-pointer hover:opacity-80"
            onClick={copyToClipboard}
          />
        </div>

        {copied && (
          <p className="text-green-600 text-sm mb-4">Copied to clipboard!</p>
        )}

        {/* Checkboxes */}
        <div className="w-full flex flex-wrap justify-around gap-4 mb-6">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="uppercase"
              checked={useUppercase}
              onChange={(e) => setUseUppercase(e.target.checked)}
            />
            <label htmlFor="uppercase">Uppercase</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="lowercase"
              checked={useLowercase}
              onChange={(e) => setUseLowercase(e.target.checked)}
            />
            <label htmlFor="lowercase">Lowercase</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="numbers"
              checked={useNumbers}
              onChange={(e) => setUseNumbers(e.target.checked)}
            />
            <label htmlFor="numbers">Numbers</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="symbols"
              checked={useSymbols}
              onChange={(e) => setUseSymbols(e.target.checked)}
            />
            <label htmlFor="symbols">Symbols</label>
          </div>
        </div>

        {/* Password length */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-6 mb-8">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label htmlFor="length" className="whitespace-nowrap">
              Password Length
            </label>
            <input
              type="range"
              id="length"
              min="4"
              max="30"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full sm:w-48"
            />
          </div>

          <div className="w-[140px]">
            <input
              type="number"
              min="4"
              max="30"
              value={length}
              onChange={(e) => {
                let val = Number(e.target.value);
                if (val < 4) val = 4;
                if (val > 30) val = 30;
                setLength(val);
              }}
              className="w-full h-10 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Generate button */}
        <button
          onClick={generatePassword}
          className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold rounded-full flex items-center justify-center gap-3 hover:opacity-90 transition"
        >
          <Image
            src="/generate_icon.png"
            width={22}
            height={22}
            alt="generate"
          />
          Generate Password
        </button>
      </div>
    </section>
  );
}

export default PasswordBox;