import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(5);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const generatePassword = useCallback(() => {
    let pass = " ";
    let str = "ABCDefgh";
    if (numberAllowed) {
      str = str + "123456789";
    }
    if (charAllowed) {
      str = str.concat("%$&*%^*");
    }
    for (let i = 1; i <= length; i++) {
      let randomIndex = Math.floor(Math.random() * str.length);
      pass = str.charAt(randomIndex) + pass;
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  }, [numberAllowed, length, charAllowed]);

  const passwordRef = useRef(null)

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Password Generator
        </h2>
        <div className="flex items-center gap-2 bg-amber-100">
          <input
            type="text"
            value={password}
            readOnly
            ref={passwordRef}
            className="flex-1 px-4 py-2 border rounded-lg text-gray-700 font-mono focus:outline-none"
          />
          <button onClick={copyToClipboard} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Copy
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {password}
          </label>
          <input
            type="range"
            min={5}
            max={10}
            className="w-full"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <p className="text-sm text-gray-500 mt-1">
            Length: <span className="font-semibold">{length}</span>
          </p>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              className="accent-blue-600"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            Include Characters
          </label>

          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              className="accent-blue-600"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            Include Numbers
          </label>
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePassword}
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
