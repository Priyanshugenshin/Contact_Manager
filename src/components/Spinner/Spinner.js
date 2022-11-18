import { React } from "react";

let Spinner = () => {
    return (
        <>
        <div>
        <img src={require("../../assets/img/colorful-loading.gif")} alt="Spinner" className="rounded mx-auto d-block " style = {{width:"200px"}}/>
        </div>
        </>
    )
    
}

export default Spinner;