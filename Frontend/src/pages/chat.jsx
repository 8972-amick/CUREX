import React , {useState}from 'react'

const chat = () => {
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        console.log("Sending message:", message);
        setMessage(''); 
    };

  return (
    <div>
        <h1 className='text-3xl font-bold text-center mt-10'>Chat Page</h1>
        <p className='text-center mt-4 text-gray-600'>This is where the chat functionality will be implemented.</p>
            <div className="flex items-center justify-center mt-10">
                <div className="w-full max-w-md">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                                Enter your message
                            </label>
                            <input

                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="message"
                                type="text"
                                value= {message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your message here..."
                            />
                        </div>  
                        <div className="flex items-center justify-between">
                            <button
                            onClick={handleSendMessage}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default chat