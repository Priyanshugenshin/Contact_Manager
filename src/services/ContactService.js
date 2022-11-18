import axios from "axios";

export class ContactService {

    static serverURL = "http://localhost:9000";

        static getAllContacts(){
            let dataURL = `${this.serverURL}/contacts`;
            return axios.get(dataURL);
        }

    static getContact(contactId) {
        let dataURL = `${this.serverURL}/contacts/${contactId}`
        return axios.get(dataURL)
    }

        static getAllGroups(){
            let dataURL = `${this.serverURL}/groups`;
            return axios.get(dataURL);
        }

    static getGroup(contact){
    
        let dataURL = `${this.serverURL}/groups/${contact.groupId}`
        return axios.get(dataURL);
    }

}

