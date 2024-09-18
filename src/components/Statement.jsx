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

            console.log(e);

                let nArr = [...data];
                nArr[lineNumber-1].value = e.target.innerText + e.key;
                nArr[lineNumber-1].updateID = Math.random().toString(16).slice(2);
                setData(nArr);



                if(e.key=="Enter") {
                    //get cursor pos
                    let sel = document.getSelection();
                    sel.modify("extend", "backward", "paragraphboundary");
                    let pos = sel.toString().length;
                    if(sel.anchorNode != undefined) sel.collapseToEnd();

                    e.preventDefault();
                    let nArr = [...data];
                                
                    if(pos<data[lineNumber-1].value.length) {
                        console.log(1);
                        
                        let nStr = data[lineNumber-1].value.substring(pos);
                        nArr[lineNumber-1].value = data[lineNumber-1].value.substring(0, pos);
                        nArr[lineNumber-1].updateID = Math.random().toString(16).slice(2);
                        console.log(nStr);
                        
                        nArr.splice(lineNumber, 0, {value: nStr, updateID: Math.random().toString(16).slice(2)})
                    } else {
                        nArr.splice(lineNumber,0, {value:"",  updateID: Math.random().toString(16).slice(2)})
                    }
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