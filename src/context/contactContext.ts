import { createContext } from "react";


export const ContactContext = createContext({
    loading: false,
    setLoading: (bool:any)=>{},
    contact:{},
    setContacts:(contact:any)=>{},
    setFillteredContacts:(fillteredContact:any)=>{},
    contacts: [],
    filteredContacts: [],
    groups: [],
    errors: [],
    onContactChange: (data:any)=>{},
    deleteContact: (contactId:any,data:any)=>{},
    createContact: (data:any)=>{},
    contactSearch: (data:any)=>{},
    
}) 