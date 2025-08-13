import { useState , useEffect } from "react";
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import _ from 'lodash'
import {
  Navbar,
  Contacts,
  ViewContact,
  EditContact,
  AddContact
} from './components'
import { createContact, getAllContact, getAllGroup, removeContact } from "./services/contactService";
import { CURRENTLINE, PURPLE, YELLOW, FOREGROUND, COMMENT } from "./helpers/colors";
import { confirmAlert } from "react-confirm-alert";
import { ContactContext } from "./context/contactContext";
import { contactSchema } from "./validations/contactValidation";

const App = () =>{

  const [contacts , setContacts] = useState([])
  const [groups , setGroups] = useState([])
  const [filteredContacts , setFillteredContacts] = useState([])
  const [loading , setLoading] = useState(false)
  const [contact, setContact] = useState({});
  const [errors, setErrors] = useState([])

  const navigate = useNavigate()
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        setLoading(true);
        const {data : contactsData} = await getAllContact()
        const {data : groupsData} = await getAllGroup()
        setContacts(contactsData)
        setFillteredContacts(contactsData)
        setGroups(groupsData)
        setLoading(false)
      }
      catch(error:any) {
        console.log(error)
        setLoading(false)
      }
    }

    fetchData();
  },[])

  const onContactChange = (event)=>{
    setContact({
      ...contact,
      [event.target.name] : event.target.value
    })
  }

  const createContactForm = async (event)=>{
    event.preventDefault();
    try{
      setLoading((prev)=> !prev)
      await contactSchema.validate(contact,{abortEarly:false})
      const { status , data } = await createContact(contact);
      if(status=== 201){
        const allContacts = [...contacts, data]
        setContacts(allContacts)
        setFillteredContacts(allContacts)
        setLoading((prev)=> !prev)
        setContact({})
        setErrors([])
        navigate('/contacts')
      }
    }catch(err){
      setLoading((prev)=> !prev)
      console.log(err.message)
      setErrors(err.inner)
    }
  }

  const deleteContact = async (contactId)=>{
    const copyContacts = [...contacts]
    try{
      const filteredContacts = contacts.filter(c=>c.id != contactId)
      setContacts(filteredContacts)
      setFillteredContacts(filteredContacts)
      const {status} = await removeContact(contactId)
      if(status!==200){
        setContacts(copyContacts)
        setFillteredContacts(copyContacts)
      }
    }catch(e:any){
      console.log(e)
      setContacts(copyContacts)
      setFillteredContacts(copyContacts)
    }
  }

  const confirmDelete = (contactId:any, contactFullname:any) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <h1 style={{ color: YELLOW }}>پاک کردن مخاطب</h1>
            <p style={{ color: FOREGROUND }}>
              مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی ؟
            </p>
            <button
              onClick={() => {
                deleteContact(contactId);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: PURPLE }}
            >
              مطمئن هستم
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: COMMENT }}
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };

  const contactSearch = _.debounce((query)=>{
    if(query=='') return setFillteredContacts([...contacts])
    setFillteredContacts(contacts.filter(
      (con)=>{
        return con.fullname.includes(query)
      }
    ))
  },1000)

  return (
    <ContactContext.Provider value={{
      loading,
      setLoading,
      errors,
      contact,
      setContacts,
      groups,
      contacts,
      filteredContacts,
      setFillteredContacts,
      onContactChange,
      deleteContact:confirmDelete,
      createContact:createContactForm,
      contactSearch,
    }}>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to='/contacts' />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path='/contacts/:contactId' element={<ViewContact />} />
        <Route path='/contacts/edit/:contactId' element={<EditContact />} />
        <Route path='/contacts/add' element={<AddContact />} />
      </Routes>
    </div>
    </ContactContext.Provider>
  )
}

export default App;