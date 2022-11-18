import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../../Spinner/Spinner";


let ViewContact = () => {

    let { contactId } = useParams()

    let [state, setState] = useState({
        loading: false,
        contacts: [],
        groups:[],
        errorMessage: ''
    });

    const fetchContactDetail = async () => {
        setState({ ...state, loading: true })
        const response = await axios
            .get(`http://localhost:9000/contacts/${contactId}`)
            .catch((err) => {
                console.log("Err", err);
            })
        console.log(response.data)
        const contactData = response.data
        
        let groupId = contactData.groupId
        console.log(groupId)
        const groupResponse = await axios
             .get(`http://localhost:9000/groups/${groupId}`)
            .catch((err) => {
                console.log("Err", err);
            })
            console.log(groupResponse.data)
        setState({
            ...state,
            loading: false,
            contacts: response.data,
            groups:groupResponse.data
        });
    }

    useEffect(() => {
        fetchContactDetail()
    }, []);

    let { loading, contacts,groups } = state


    return (
        <>
            <section className="view-contact-intro my-2">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-warning">View Contact</p>
                            <p className="fst-italic">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut orci quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus sit amet congue leo. Donec mollis odio a purus sodales laoreet. Etiam hendrerit ex nulla, id faucibus purus auctor eu. Aliquam erat volutpat. Suspendisse sagittis orci pretium ornare tempor. Vivamus molestie dignissim turpis, in porttitor sapien facilisis eu. Sed in massa sodales, bibendum tortor a, imperdiet ante. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec malesuada maximus diam et luctus. Aenean urna diam, vulputate condimentum libero laoreet, rhoncus lacinia ante. Fusce sed mauris ac purus tristique scelerisque auctor ac orci. Proin suscipit blandit justo et porta.</p>
                        </div>
                    </div>
                </div>
            </section>

            {
                loading ? <Spinner /> :
                    <>
                    {
                        Object.keys(contacts).length>0 && Object.keys(groups).length>0 &&
                        <section className="view-contact">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-4">
                                        <img src={contacts.photo} alt="userImage" className="img-fluid" />
                                    </div>
                                    <div className="col-md-7 ">
                                        <form>
                                            <ul className="list-group">

                                                <li className="list-group-item list-group-item-action">
                                                    Name : <span className="fw-bold">{contacts.name}</span>
                                                </li>

                                                <li className="list-group-item list-group-item-action">
                                                    Mobile : <span className="fw-bold">{contacts.mobile}</span>
                                                </li>

                                                <li className="list-group-item list-group-item-action">
                                                    Email : <span className="fw-bold">{contacts.email}</span>
                                                </li>

                                                <li className="list-group-item list-group-item-action">
                                                    Company : <span className="fw-bold">{contacts.company}</span>
                                                </li>

                                                <li className="list-group-item list-group-item-action">
                                                    Title : <span className="fw-bold">{contacts.title}</span>
                                                </li>

                                                <li className="list-group-item list-group-item-action">
                                                    Group : <span className="fw-bold">{groups.name}</span>
                                                </li>
                                            </ul>
                                            <div className="mb-2">
                                                <Link to={"/contacts/list"} className="btn btn-dark ms-2 my-2" >Back</Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </section>
} 
                    </>
            }
        </>
    )
}

export default ViewContact