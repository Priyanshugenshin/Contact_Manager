import axios from "axios";
import { React, useEffect, useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import Spinner from "../../Spinner/Spinner";


let EditContact = () => {
    let navigate = useNavigate()
    const {contactId} = useParams();

    let [state,setState] = useState({
        loading:false,
        groups:[],
        contact:{
            name:'',
            photo:'',
            mobile:'',
            email:'',
            company:'',
            title:'',
            groupId:''
        }
    })


    const fetchContactDetail= async()=>{
        setState({...state,loading:true});
        const response = await axios
        .get(`http://localhost:9000/contacts/${contactId}`)
        .catch((err) => {
            console.log('Err',err);
        })
        const groupResponse = await axios
         .get(`http://localhost:9000/groups/`)
        .catch((err) => {
            console.log("Err", err);
        })
        setState({...state,loading:false,contact:response.data,groups:groupResponse.data})
    }

    useEffect(()=>{
        fetchContactDetail()
    },[contactId])

    const updateInput = (event) => {
        setState({...state,contact:{
            ...state.contact,
            [event.target.name] : event.target.value
        }})
    }

    let submitForm = async (event) => {
        event.preventDefault();
        const response = await axios
        .put(`http://localhost:9000/contacts/${contactId}`,contact)
        .catch((err)=>{
            console.log("Err",err)
            setState({...state,err})
            navigate(`/contacts/edit/${contactId}`,{replace:false})
        })
        if(response){
            navigate("/contacts/list",{replace:true})
        }
    }

    let {loading,contact,groups} = state
    return(
        <>
        {
            loading ? <Spinner />: <>
             {/* <pre>{JSON.stringify(contact)}</pre> */}
        <section className="add-contact p-3">
            <div className="container">
                <div className="grid">
                    <div className="row my-3">
                        <div className="col">
                            <p className="h4 text-info">Edit Contact</p>
                            <p className="fst-italic">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut orci quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus sit amet congue leo. Donec mollis odio a purus sodales laoreet. Etiam hendrerit ex nulla, id faucibus purus auctor eu. Aliquam erat volutpat. Suspendisse sagittis orci pretium ornare tempor. Vivamus molestie dignissim turpis, in porttitor sapien facilisis eu. Sed in massa sodales, bibendum tortor a, imperdiet ante. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec malesuada maximus diam et luctus. Aenean urna diam, vulputate condimentum libero laoreet, rhoncus lacinia ante. Fusce sed mauris ac purus tristique scelerisque auctor ac orci. Proin suscipit blandit justo et porta.</p>
                        </div>
                    </div>
                    <div className="row align-items-center">
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
                                <select  name="groupId" value={contact.groupId} onChange={updateInput} className="form-control">
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
                                    <input type="submit" className="btn btn-info" value="Update" />
                                    <Link to={"/contacts/list"} className="btn btn-dark ms-2 my-2" >Back</Link>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-3">
                        <img src={contact.photo} alt="userImage" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
            </>
        }
       
        </>
    )
}

export default EditContact