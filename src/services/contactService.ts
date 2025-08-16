import axios from "axios";

const SERVER_URL = 'https://json-server-contact-react-js.vercel.app/api/'

//  contacts
export const getAllContact = () =>{
    const url = `${SERVER_URL}/contacts/`;
    return axios.get(url)
}

export const getContact = (id:string) =>{
    const url = `${SERVER_URL}/contacts/${id}/`;
    return axios.get(url)
}

export const updateContact = (id:string, data) =>{
    const url = `${SERVER_URL}/contacts/${id}/`;
    return axios.put(url,data)
}

export const removeContact = (id:string) =>{
    const url = `${SERVER_URL}/contacts/${id}/`;
    return axios.delete(url)
}

export const createContact = (data:any) =>{
    const url = `${SERVER_URL}/contacts/`;
    return axios.post(url,data)
}

// groups
export const getAllGroup = () =>{
    const url = `${SERVER_URL}/groups/`;
    return axios.get(url)
}

export const getGroup = (id:string) =>{
    const url = `${SERVER_URL}/groups/${id}/`;
    return axios.get(url)
}