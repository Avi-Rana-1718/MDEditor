// make this a markdown editor with extented features

// optimzed for mobile

export default function Statement(props) {
    const {lineNumber, setData, data} = props;
    return (
        <div className="flex focus-within:bg-[#303135]">
            <span className="mx-3 my-1 mr-6 text-[#6a6a6a]">
                {lineNumber}
            </span>
        <span
        contentEditable={true}
        className="text-[#f3f3f3] focus:outline-none w-full"
        onKeyDown={(e)=>{
                if(e.key=="Enter") {
                    e.preventDefault();
                    let nArr = [...data];
                    nArr.splice(lineNumber,0, {value:"",  updateID: Math.random().toString(16).slice(2)})
                    setData(nArr)
                } 
        }}
        >
        {data[lineNumber-1].value}
        </span>
            {/* <span className="text-sm hidden text-[#6a6a6a] peer-focus:inline">{val.value.length},{val.inFocus}</span> */}
        </div>
    )
}