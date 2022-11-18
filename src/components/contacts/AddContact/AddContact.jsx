import  axios  from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

let AddContact = () => {

    let navigate = useNavigate()

    let [state,setState] = useState({
        groups:[],
        contact:{
            name:'',
            photo:'',
            mobile:'',
            email:'',
            company:'',
            title:'',
            groupId:'',
            },
            loading:false
            
});


let updateInput = (event) => {
    setState({
        ...state,
        contact:{
            ...state.contact,
            [event.target.name] : event.target.value
        }
    })
}

const fetchContactDetail = async () => {    
    setState({ ...state, loading: true })
    const groupResponse = await axios
         .get(`http://localhost:9000/groups/`)
        .catch((err) => {
            console.log("Err", err);
        })
        console.log(groupResponse.data)
        setState({
            ...state,
            loading: false,
            groups:groupResponse.data
        });
    }

    useEffect(() => {
        fetchContactDetail()
    }, []);

    let submitForm = async (event) => {
        event.preventDefault();
        const response = await axios
        .post(`http://localhost:9000/contacts/`,contact)
        .catch((err)=>{
            console.log("Err",err)
            setState({...state,err})
            navigate("/contacts/add",{replace:false})
        })
        if(response){
            navigate("/contacts/list",{replace:true})
        }
    }
    

    let { loading, contact,groups } = state

    return(
    <>
    {/* <pre>{JSON.stringify(state.contact)}</pre> */}
    <section className="">
        <div className="container">
            <div className="grid">
                <div className="row my-3">
                    <div className="col">
                        <p className="h4 text-success">Create Contact</p>
                        <p className="fst-italic">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut orci quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus sit amet congue leo. Donec mollis odio a purus sodales laoreet. Etiam hendrerit ex nulla, id faucibus purus auctor eu. Aliquam erat volutpat. Suspendisse sagittis orci pretium ornare tempor. Vivamus molestie dignissim turpis, in porttitor sapien facilisis eu. Sed in massa sodales, bibendum tortor a, imperdiet ante. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec malesuada maximus diam et luctus. Aenean urna diam, vulputate condimentum libero laoreet, rhoncus lacinia ante. Fusce sed mauris ac purus tristique scelerisque auctor ac orci. Proin suscipit blandit justo et porta.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <form onSubmit={submitForm}>
                            <div className="mb-2">
                                <input name="name" value={contact.name} onChange={updateInput} type="text" className="form-control" placeholder="Name"/>
                            </div>
                            <div className="mb-2">
                                <input name="photo" value={contact.photo} onChange={updateInput} className="form-control" placeholder="Photo Url"/>
                            </div>
                            <div className="mb-2">
                                <input name="mobile" value={contact.mobile} onChange={updateInput} type="number" className="form-control" placeholder="Mobile"/>
                            </div>
                            <div className="mb-2">
                                <input name="email" value={contact.email} onChange={updateInput} type="email" className="form-control" placeholder="Email"/>
                            </div>
                            <div className="mb-2">
                                <input name="company" value={contact.company} onChange={updateInput} type="text" className="form-control" placeholder="Company"/>
                            </div>
                            <div className="mb-2">
                                <input name="title" value={contact.title} onChange={updateInput} type="text" className="form-control" placeholder="Title"/>
                            </div>
                            <div className="mb-2">
                                <select required={true} name="groupId" value={contact.groupId} onChange={updateInput} className="form-control">
                                    <option value="">Select a Group</option>
                                    {
                                        groups.length >0 && 
                                            groups.map(group => {
                                                return(
                                                    <option key={group.id} value={group.id}>{group.name}</option>
                                                )
                                            }) 
                                    }
                                </select>
                            </div>
                            <div className="mb-2">
                                <input type="submit" className="btn btn-success" value="Create" />
                                <Link to={"/contacts/list"} className="btn btn-dark ms-2 my-2" >Back</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
    )
}

export default AddContact