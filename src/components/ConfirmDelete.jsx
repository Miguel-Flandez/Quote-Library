
 export default function ConfirmDelete({onConfirm}){

    const handleConfirm = () =>{
        onConfirm(true)
    }

    const handleCancel = () =>{
        onConfirm(false)
    }

    return(
            <div className="flex flex-col gap-15 p-5 bg-white rounded-[20px] border-2 border-gray-400 absolute top-1/3">
                <span className="text-gray-400 font-mono">Delete this item permanently?</span>
                <div className="flex justify-between">
                    <button className="text-gray-400 hover:text-gray-500 hover:font-bold font-mono" onClick={handleConfirm}>Confirm</button>
                    <button className="text-gray-400 hover:text-gray-500  hover:font-bold font-mono" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
    )
 }