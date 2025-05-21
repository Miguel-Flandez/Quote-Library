import { useEffect, useRef, useState } from "react"
import { createClient } from '@supabase/supabase-js'
import styles from '@/css/Textarea.module.css'
import ConfirmDelete from "./ConfirmDelete"

const supabaseUrl = 'https://xnhfclnixcqivuudknst.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuaGZjbG5peGNxaXZ1dWRrbnN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2MzU3NDgsImV4cCI6MjA2MzIxMTc0OH0.Lv38PuB4RCNZaI0sOFxjYKLe13zQkNfqMJkznpDg4sk'
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Textarea(){

        const inputs = useRef(null);

        const [list, setlist] = useState([]) // contains the list of inputs
        const [quote, displayedQuote] = useState('Remember what you\'ve learned and realized') // the currently displayed quote

        const [showInputField, setShowInputField] = useState(false); // show the input field or not
        const [addOrCreate, setAddOrCreate] = useState(false); // show the add button or the create button
        const [random, setRandom] = useState(false); // just to manipulate the random index
        const [showDeleteModal, setShowDeleteModal] = useState(false);

        // show the input or the div
        const showInput = () =>{
            setAddOrCreate(prev=>!prev)
            setShowInputField(prev=>!prev)
            
        }

        // add a single input or a list
        const addInput = () =>{
            setAddOrCreate(false)
            setShowInputField(false)

            const newQuotes = inputs.current.value.split(/^\s*-/m).filter(item=>item!='')
            setlist((prevList)=>[...prevList.filter(item=>item), ...newQuotes])

            async function insertQuotes(newQuotes) {
                for (const quote of newQuotes) {
                    const {data, error} = await supabase.from("Quotes").insert([{quote:quote}]);
                    if(error) console.error("Error: ",error )
                        else console.log('Inserted: ',data)
                }
            }
            insertQuotes(newQuotes)
        }

        // delete current quote from the database
        const deleteModal = () =>{
            setShowDeleteModal(true)
        }

        const handleConfirm = (data) =>{

            if(data){
                const deleteThis = quote;

                setlist((prevList)=>[...prevList.filter(item=>item!=deleteThis)]);

                async function deleteQuote(deleteThis){
                    const {data, error}  = await supabase.from("Quotes").delete().eq("quote", deleteThis).select()

                    if(error)console.error("Error: ", error)
                    else{
                        console.log("Successfully Deleted: ", data)
                        alert("Quote deleted succesfully")
                    }
                }
                deleteQuote(deleteThis);
                setRandom(prev=>!prev)
                setShowDeleteModal(false)
            
            }else{
                setShowDeleteModal(false)
            }
        }



        // change the value of random which is a dependency to run useeffect
        const newQuote = () =>{
            setRandom(prev=>!prev)
        }
        // display a random quote at the start
        useEffect(()=>{
            const randomQuote = Math.floor(Math.random() * list.length)
            if(list.length){
                displayedQuote(list[randomQuote].replace(/^\s*[a-z]/, match=>match.toUpperCase()).replace(/\.\s*$/, ''))
            }
            
        },[random])

        useEffect(()=>{
        async function fetchQuotes() {
            const {data,error} = await supabase.from('Quotes').select('quote');
            if(error) console.error ('Error: ',error )
                else setlist(data.map(item=>item.quote))
        }
        fetchQuotes();
        },[])

        return(
            <>
            
            {showDeleteModal && <ConfirmDelete onConfirm={handleConfirm}/>}{/*  hide the modal */}
                <div className="flex flex-col gap-2 bg-white border-gray-400 rounded-[20px] w-[75%] min-h-[85%] max-h-[85%] p-10">
                    {showInputField && <textarea name="input" id="textbox" 
                    className="w-full min-h-[90%] text-gray-400 p-2 resize-none border-2 border-gray-400"
                    ref={inputs}>
                    </textarea>}
                    {!showInputField && <div className="w-full min-h-[90%] text-gray-400 text-3xl font-bold font-mono text-center p-2 resize-non overflow-y-auto">
                        {quote}
                    </div>}
                    <div className="flex justify-center gap-2 bg-gray border-t-2 border-gray-400 pt-2">
                        {/* you need template literals and call the css like an object if youre using css modules */}
                        {!addOrCreate && <button className={`${styles.button}`} onClick={showInput}>Create</button>}
                        {!addOrCreate && <button className={`${styles.button}`} onClick={deleteModal}>Delete</button>}
                        {!addOrCreate && <button className={`${styles.button}`} onClick={newQuote}>New Quote</button>}

                        {addOrCreate && <button className={`${styles.button}`} onClick={addInput}>Add</button>}
                        {addOrCreate && <button className={`${styles.button}`} onClick={showInput}>Cancel</button>}
                      
                        
                    </div>
                </div>
            </>
        )
    }
