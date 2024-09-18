import { useEffect, useRef, useState } from "react";

// make this a markdown editor with extented features

// optimzed for mobile

export default function Statement(props) {
    let {lineNumber, val, changeVal, addStatement, changeFocus, removeStatement}=props;
    let inputRef = useRef(null);

    function selectAll() {
        inputRef.current.focus()
        inputRef.current.setSelectionRange(0, inputRef.current.value.length);
    }
    

    useEffect(()=>{
        if(val.inFocus!=-1) {
            inputRef.current.setSelectionRange(val.inFocus, val.inFocus);
        }
        let pos = inputRef.current.value.includes("#");
    })

    return (
        <div className="flex focus-within:bg-[#303135]">
            <span className="mx-3 my-1 mr-6 text-[#6a6a6a]" onClick={selectAll}>
                {lineNumber}
            </span>
            <input 
            type="text"
            autoFocus={val.inFocus!=-1}
            defaultValue={val.value}
            ref={inputRef}
            onClick={(e)=>{
                changeVal(e.target.value, e.target.selectionStart, lineNumber-1);                
            }}
            onChange={(e)=>{

                // console.log(e.nativeEvent.data);
                
                
                if(e.nativeEvent.data=="(") {
                    e.target.value+=")";
                } else if (e.nativeEvent.data=='[') {
                    e.target.value+="]";
                } else if (e.nativeEvent.data=='{') {
                    e.target.value+='}';
                } else if (e.nativeEvent.data=="'") {
                    e.target.value+="'";
                } else if (e.nativeEvent.data=='"') {
                    e.target.value+='"';
                }
                
                changeVal(e.target.value, e.target.selectionStart, lineNumber-1);
            }} 

            onKeyDown={(e)=>{

                // console.log(e);
                // alert(e.key)
                

                if(e.keyCode==13) {
                    e.preventDefault()
                    if(e.target.selectionStart<e.target.value.length) {
                        addStatement(lineNumber, e.target.selectionStart)
                    } else {
                        addStatement(lineNumber);
                    }
                } else if(e.key=="ArrowDown") {
                    e.preventDefault();
                    changeFocus(lineNumber);
                } else if(e.key=="ArrowUp") {
                    e.preventDefault()
                    changeFocus(lineNumber-2);
                } else if(e.key=="ArrowLeft" && e.shiftKey==false) {
                    changeVal(e.target.value, e.target.selectionStart, lineNumber-1);
                } else if(e.key=="ArrowRight" && e.shiftKey==false) {
                    changeVal(e.target.value, e.target.selectionStart, lineNumber-1);
                } else if(e.key=="Backspace") {
                    if(e.target.value.length==0) {
                        e.preventDefault();
                        removeStatement(lineNumber-1);
                    }
                }
                    
            }}
            
            className={"outline-none bg-[#27282A] text-[#f3f3f3] w-full focus:bg-[#303135] peer" + val.style}
            />
            <span className="text-sm hidden text-[#6a6a6a] peer-focus:inline">{val.value.length},{val.inFocus}</span>
        </div>
    )
}