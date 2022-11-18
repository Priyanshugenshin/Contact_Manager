import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { ContactService } from "../../../services/ContactService";
import axios from "axios";
import Spinner from "../../Spinner/Spinner";


let ContactList = () => {

    let[query,setQuery] = useState({
        text:''
    })

    let [state, setState] = useState({
        loading: false,
        contacts: [],
        filteredContact: [],
        errorMessage: ''
    });

    // useEffect(async()=>{
    //     try {
    //         let response = await ContactService.getAllContacts();
    //         console.log(response.data);
    //     } catch (error) {

    //     }
    // },[]);

    const fetchContactDetail = async () => {
        setState({ ...state, loading: true })
        const response = await axios
            .get('http://localhost:9000/contacts')
            .catch((err) => {
                console.log("Err", err);
            })
        setState({
            ...state,
            loading: false,
            contacts: response.data,
            filteredContact:response.data
        });
    }

    useEffect(() => {
        fetchContactDetail()
    }, []);


    // Delete 

    let clickDelete = async (contactId) => {
        const deleteResponse = await axios
        .delete(`http://localhost:9000/contacts/${contactId}`)
        .catch((err)=>{
            if(err) {
                console.log('Err',err)
            }
        })

        if(deleteResponse){
            setState({...state,loadng:true})
            const response = await axios
            .get('http://localhost:9000/contacts')
            .catch((err) => {
                console.log("Err", err);
                
            })
            setState({...state,loading:false,contacts:response.data})
        }
    }

    // SEARCH

    let searchContacts = (event) => {
        setQuery({...query,text : event.target.value})
        let theContacts = state.contacts.filter(contact => {
            return contact.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setState({
            ...state,
            filteredContact:theContacts
        })
    }

    let { loading, contacts ,filteredContact } = state

    return (
        <>
            {/* <pre>{JSON.stringify(contacts)}</pre> */}
            {/* <pre>{JSON.stringify(query.text)}</pre> */}

            <section className="contact-search">
                <div className="container">
                    <div className="grid">
                        <div className="row my-3">
                            <div className="col">
                                <p className="h3">Contact Manager
                                    <Link to={'/contacts/add'} className="btn btn-warning ms-3">
                                        <i class="fa-solid fa-user-plus me-2"></i>New</Link>
                                </p>
                                <p className="fst-italic">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut orci quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus sit amet congue leo. Donec mollis odio a purus sodales laoreet. Etiam hendrerit ex nulla, id faucibus purus auctor eu. Aliquam erat volutpat. Suspendisse sagittis orci pretium ornare tempor. Vivamus molestie dignissim turpis, in porttitor sapien facilisis eu. Sed in massa sodales, bibendum tortor a, imperdiet ante. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec malesuada maximus diam et luctus. Aenean urna diam, vulputate condimentum libero laoreet, rhoncus lacinia ante. Fusce sed mauris ac purus tristique scelerisque auctor ac orci. Proin suscipit blandit justo et porta.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <form className="row">
                                    <div className="col">
                                        <div className="mb-2">
                                            <input name="text" value={query.text} onChange={searchContacts} className="form-control" type="text" placeholder="Search Name" />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-2">
                                            <button type="submit" class="btn btn-outline-dark btn-warning" placeholder="Name">
                                                <i class="fa-sharp fa-solid fa-magnifying-glass"></i> Search
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {
                loading ? <Spinner /> : <>

                    <section className="class-list my-3">
                        <div className="container">
                            <div className="row">
                                {
                                    filteredContact.length > 0 &&
                                    filteredContact.map(contact => {

                                        return (

                                            <div className="col-md-6" key={contact.id}>
                                                <div className="card mb-2">
                                                    <div className="card-body">
                                                        <div className="row align-item-center">
                                                            <div className="col-md-4">
                                                                <img src={contact.photo} alt="userImage" className="img-fluid" />
                                                            </div>
                                                            <div className="col-md-7">
                                                                <ul className="list-group">

                                                                    <li className="list-group-item list-group-item-action">
                                                                        Name : <span className="fw-bold">{contact.name}</span>
                                                                    </li>

                                                                    <li className="list-group-item list-group-item-action">
                                                                        Mobile : <span className="fw-bold">{contact.mobile}</span>
                                                                    </li>

                                                                    <li className="list-group-item list-group-item-action">
                                                                        Email : <span className="fw-bold">{contact.email}</span>
                                                                    </li>

                                                                </ul>
                                                            </div>
                                                            <div className="col-md-1 d-flex flex-column align-items-center">

                                                                <Link to={`/contacts/view/${contact.id}`} className="btn btn-warning my-1">
                                                                    <i class="fa-solid fa-eye"></i>
                                                                </Link>

                                                                <Link to={`/contacts/edit/${contact.id}`} className="btn btn-info my-1">
                                                                    <i class="fa-solid fa-pen"></i>
                                                                </Link>

                                                                <button className="btn btn-danger my-1" onClick={()=>clickDelete(contact.id)}>
                                                                    <i class="fa-solid fa-trash"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }


                            </div>
                        </div>
                    </section>
                </>
            }


        </>
    )
}

export default ContactList