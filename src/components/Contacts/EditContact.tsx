import { useContext, useEffect, useState } from "react";
import takingNoteImg from '../../assets/images/man-taking-note.png'
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  getContact,
  updateContact,
} from "../../services/contactService";
import { Spinner } from "../";
import { COMMENT, ORANGE, PURPLE } from "../../helpers/colors";
import { ContactContext } from "../../context/contactContext";

const EditContact = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();

  const {loading , setLoading , contacts , setContacts, groups , setFillteredContacts}:any = useContext(ContactContext)
  const [contact, setContact]:any = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const { status, data: contactData } = await getContact(contactId);
        if(status===200 && contactData){
          setContact(contactData)
          setLoading(false)
        }
      } catch (err) {
        console.log(err);
        setLoading(false)
      }
    };

    fetchData();
  }, []);

  const onContactChange = (event) => {
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = async (event:any) => {
    event.preventDefault();
    try {
      setLoading(true)
      const { data , status } = await updateContact(contactId,contact);
      if (status===200) {
        setContact({})
        const contactIndex = contacts.findIndex(con=>con.id == contactId)
        const allContacts = contacts;
        allContacts[contactIndex] = data;
        setContacts([...allContacts])
        setFillteredContacts([...allContacts])
        setLoading(false)
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  };


  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: ORANGE }}>
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: ORANGE }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <div className="col-md-8">
                  <form onSubmit={submitForm}>
                    <div className="mb-2">
                      <input
                        name="fullname"
                        type="text"
                        className="form-control"
                        value={contact.fullname}
                        onChange={onContactChange}
                        required={true}
                        placeholder="نام و نام خانوادگی"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="photo"
                        type="text"
                        value={contact.photo}
                        onChange={onContactChange}
                        className="form-control"
                        required={true}
                        placeholder="آدرس تصویر"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="mobile"
                        type="number"
                        className="form-control"
                        value={contact.mobile}
                        onChange={onContactChange}
                        required={true}
                        placeholder="شماره موبایل"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        value={contact.email}
                        onChange={onContactChange}
                        required={true}
                        placeholder="آدرس ایمیل"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="job"
                        type="text"
                        className="form-control"
                        value={contact.job}
                        onChange={onContactChange}
                        required={true}
                        placeholder="شغل"
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        name="group"
                        value={contact.group}
                        onChange={onContactChange}
                        required={true}
                        className="form-control"
                      >
                        <option value="">انتخاب گروه</option>
                        {groups.length > 0 &&
                          groups.map((group) => (
                            <option key={group.id} value={group.id}>
                              {group.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn"
                        style={{ backgroundColor: PURPLE }}
                        value="ویرایش مخاطب"
                      />
                      <Link
                        to={"/contacts"}
                        className="btn mx-2"
                        style={{ backgroundColor: COMMENT }}
                      >
                        انصراف
                      </Link>
                    </div>
                  </form>
                </div>
                <div className="col-md-4">
                  <img
                    src={contact.photo}
                    className="img-fluid rounded w-100 h-100"
                    style={{ border: `1px solid ${PURPLE}` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-1">
              <img
                src={takingNoteImg}
                height="300px"
                style={{ opacity: "60%" }}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default EditContact;
