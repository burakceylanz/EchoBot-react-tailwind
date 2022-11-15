import { useState, useEffect } from 'react'
import echoboticon from '../Assets/img/echobot-icon.webp'
import sendicon from '../Assets/img/send-icon.webp'
import arrowicon from '../Assets/img/arrow-down.png'

export default function Chatbot() {
    const [echobot, setEchobot] = useState(false);
    const toggleEchoBot = () => {
        setEchobot(!echobot)
    }
    const date = new Date();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    const minute = date.getMinutes();
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();

    const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar']
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']

    const [time, setTime] = useState(padTo2Digits(hours) + ':' + padTo2Digits(minute));
    const [dateTime, setDateTime] = useState(`${days[day]},${months[month]},${year}`);

    //if the date is single digit we add  0
    function padTo2Digits(num) {
        return String(num).padStart(2, '0');
    }
      
    const newMessage = document.querySelector("#newMessage");
    const sendBtn = document.getElementById("send-btn");

    const handleChange = (event) => {
        if(newMessage.value ===''){
            sendBtn.style.display = "none";
            return false;
        }else{
            sendBtn.style.display = "block";
            return true;
        }
    }

    const handlekeyDown = (event) => {
        if(event.key === "Enter"){
          event.preventDefault();
          sendBtn.click();
          return true;
        }
        };
  
        useEffect(()=>{
          window.addEventListener('keydown', handlekeyDown);
          // clear addeventlistener
          return () => {
            window.removeEventListener('keydown', handlekeyDown);
          };
        },[handlekeyDown])
        
    const handleInput = () => {
        if(newMessage.value===''){
            return false;
        }else{
        // new user message
        const newUserMessage = document.createElement("div");
        newUserMessage.className = "text-right mr-8";
        document.querySelector("#messageList").appendChild(newUserMessage);
        const newUserMessageContent = document.createElement("div");
        newUserMessageContent.className="p-3 text-left rounded-2 max-w-[70%] inline-block bg-[#4652e7] my-4 text-[14px] text-white usermsg";
        newUserMessage.appendChild(newUserMessageContent);
        newUserMessageContent.innerHTML = newMessage.value;
    
        // the date the message was sent for user
        const dateFieldUser = document.createElement("span");
        dateFieldUser.className = "text-[10px] text-[#a8a8a8] block";
        newUserMessageContent.appendChild(dateFieldUser);
        dateFieldUser.innerHTML = time +" "+ dateTime;
       
        //new bot message
        const newBotMessage = document.createElement("div");
        newBotMessage.className = "text-left ml-8";
        document.querySelector("#messageList").appendChild(newBotMessage);
        const newBotMessageContent = document.createElement("div");
        newBotMessageContent.className="p-3 text-left rounded-2 max-w-[70%] inline-block bg-[#F4F7F9] my-4 text-[14px] text-black botmsg";
        newBotMessage.appendChild(newBotMessageContent);
        newBotMessageContent.innerHTML = newMessage.value;

        // the date the message was sent for bot
        const dateFieldBot = document.createElement("span");
        dateFieldBot.className = "text-[10px] text-[#a8a8a8] block";
        newBotMessageContent.appendChild(dateFieldBot);
        dateFieldBot.innerHTML = time +" "+ dateTime;

        // scroll to last message
        const scrollLastMessage = document.getElementById("messageList");
        scrollLastMessage.scrollTop = scrollLastMessage.scrollHeight;

        // delete message when no message and remove button
        newMessage.value = '';
        sendBtn.style.display = "none";
        }
    }
    return (
        <>
            <div className='text-center'>
                <div className='h-screen bg-[#282c34] flex justify-center items-center'>
                    <div className='block hero-section'>
                        <h1 className='text-center text-white text-[48px]'>Welcome to EchoBot!</h1>
                        <span className='text-xs text-gray-300'>You say it, it will repeat!</span>
                    </div>
                </div>
            </div>
            <div className='fixed right-4 bottom-4 cursor-pointer' onClick={toggleEchoBot}>
                <div className={echobot ? 'hidden' : 'flex items-center bg-[#4652e7] rounded-full'}>
                    <img src={echoboticon} className='h-16 rounded-full' alt="echobot icon" />
                    <h1 className='pr-6 text-white text-base'>EchoBot</h1>
                </div>
            </div>
            <div className='fixed right-4 bottom-4'>
                <div className={echobot ? 'block text-white' : 'hidden'}>
                    <div className='relative w-[400px] h-[450px] rounded-[35px] bg-white echobot'>
                        <div className='absolute top-0 left-0 right-0 flex items-center bg-[#4652e7] rounded-[35px]'>
                            <img src={echoboticon} className='h-16 rounded-full' alt="echobot icon" />
                            <div className='block items-center'>
                                <h1 className='pr-6 text-white text-base'>EchoBot</h1>
                                <span className='text-green-300 text-sm text-extrabold status' id='active'>Aktif</span>
                            </div>
                            <div className='absolute right-6 cursor-pointer' onClick={toggleEchoBot}>
                                <img src={arrowicon} className='h-8' alt="close icon" />
                            </div>
                        </div>
                        <div className='absolute top-20 left-0 right-0 bottom-20 overflow-x-hidden overflow-y-overlay text-black' id='messageList'>
                        </div>
                        <div className='absolute bottom-0 right-0 left-0'>
                            <div className='flex items-center rounded-[35px] border-t border-[#4652e7] overflow-hidden'>
                                <div className='mt-2 px-4'>
                                    <textarea id='newMessage' onChange={handleChange} className="text-black outline-none w-[330px] overflow-hidden h-8" height="6" placeholder="Mesajınızı yazın"></textarea>
                                </div>
                                <div className='relative right-2'>
                                    <button onClick={handleInput} id='send-btn' className='hidden'><img src={sendicon} className='h-6' alt="send icon" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) 
    }