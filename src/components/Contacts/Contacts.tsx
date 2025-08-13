import {
  Spinner,
  Contact
} from '../'

import { CURRENTLINE, ORANGE, PINK } from "../../helpers/colors";
import NotFound from '../../assets/images/no-found.gif'
import type { ContactProp } from '../../helpers/contact.interface';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ContactContext } from '../../context/contactContext';

interface Props {
  contacts:ContactProp[],
  loading:boolean,
  confirmDelete:()=>void
}

const Contacts = () => {
  const {contacts,loading,deleteContact,filteredContacts} = useContext(ContactContext)
  return (
    <>
      <section className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3 float-end mt-3">
                <Link to='/contacts/add' className="btn mx-2" style={{ backgroundColor: PINK }}>
                  ساخت مخاطب جدید
                  <i className="fa fa-plus-circle mx-2" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
      {
        loading ? <Spinner /> : (
        <section className="container">
            <div className="row">
            {/* Contact */}
            {
                filteredContacts.length ?
                filteredContacts.map((c:ContactProp)=>( <Contact key={c.id} contact={c} deleteContact={()=> deleteContact(c.id,c.fullname)}/> ))
                : (
                    <div
                        className="text-center py-5"
                        style={{ backgroundColor: CURRENTLINE }}
                    >
                        <p className="h3" style={{ color: ORANGE }}>
                        مخاطب یافت نشد ...
                        </p>
                        <img
                        src={NotFound}
                        alt="پیدا نشد"
                        className="w-25"
                        />
                    </div>
                )
            }
            </div>
        </section>
        )
      }
    </>
  );
};

export default Contacts;
