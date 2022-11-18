import { React } from "react";
import {Routes,Route,Navigate } from "react-router-dom";
import  Navbar  from "./components/Header/Navbar";
import  ContactList  from "./components/contacts/ContactList/ContactList";
import  AddContact   from "./components/contacts/AddContact/AddContact";
import  EditContact  from "./components/contacts/EditContact/EditContact";
import  ViewContact  from "./components/contacts/ViewContact/ViewContact";
import Spinner from "./components/Spinner/Spinner";

function App()  {
  return (
    <>
    <Navbar />
    <Routes>
    <Route path={'/'} element={<Navigate to='/contacts/list' />} />
    <Route path={'/contacts/list'} element={<ContactList />} />
    <Route path={'/contacts/add'} element={<AddContact />} />
    <Route path={'/contacts/view/:contactId'} element={<ViewContact />} />
    <Route path={'/contacts/edit/:contactId'} element={<EditContact />} />
    </Routes>
    </>
  );
}

export default App;
