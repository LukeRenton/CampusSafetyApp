import React, { useState } from 'react'
import Menu from './Menu'
import '../styles/EmergencyInfoMenu.css'
import Slider from './Slider'
import EmergencyInfoBox from './EmergencyInfoBox'
import Spinner from './Spinner'
import emergency_contacts from '../common/EmergencyContacts'

export default function EmergencyInfoMenu( props ) {

  const [contacts_shown, set_contacts_shown] = useState('wits');
  const [loading_contacts, set_loading_contacts] = useState(false);

  /* 
    Function: handle_slider_click

    Description:
      Handles on click event of slider to show relevant EmergencyInfoBox by setting react hook

    Arguments: N/A

    Returns: N/A
  */
  const handle_slider_click = (slider_position) => {
    set_loading_contacts(true);
    setTimeout(() => {
      if (slider_position === 'left') {
        set_contacts_shown('wits');
      } else {
        set_contacts_shown('external');
      }
    set_loading_contacts(false);

    },1500)
  }

  /* 
    Function: render_wits_contacts

    Description:
      Maps each contact card specifically from the wits_contacts of the emergency contacts object

    Arguments: N/A

    Returns:
      Mapped Emergency Boxes for each contact group with specific contacts
  */
  const render_wits_contacts = () => {
    return emergency_contacts['wits_contacts'].map((contact_group) => {
        return <EmergencyInfoBox header={contact_group.contact_group_name} content={contact_group.contacts}></EmergencyInfoBox> 
    })
  }

  /* 
    Function: render_external_contacts

    Description:
      Maps each contact card specifically from the external_contacts of the emergency contacts object

    Arguments: N/A

    Returns:
      Mapped Emergency Boxes for each contact group with specific contacts
  */
  const render_external_contacts = () => {
    return emergency_contacts['external_contacts'].map((contact_group) => {
        return <EmergencyInfoBox header={contact_group.contact_group_name} content={contact_group.contacts}></EmergencyInfoBox> 
    })
  }

  /* 
    Function: render_contacts

    Description:
      Driver function to render the correct emergency info content

    Arguments: N/A

    Returns:
      Mapped Emergency Boxes within a content along with scroll-bottom for better ux
  */
  const render_contacts = () => {
    if (contacts_shown == 'wits') {
      return (
        <section className='emergency-info-menu-content'>
          {render_wits_contacts()}
          <div className='emergency-info-menu-scroll-bottom'></div>
        </section>
      )
    } else { 
      return (
        <section className='emergency-info-menu-content'>
          {render_external_contacts()}
          <div className='emergency-info-menu-scroll-bottom'></div>
        </section>
      )
    }
  }

  return (
    <Menu menu_header={"Emergency Information"} close={props.close_menu}>
      <section className='emergency-info-menu-container'>
        <h2 className='emergency-info-menu-subheading'>Remember to stay calm so we can best understand you. You’ve got this</h2>
        <div className='emergency-info-header-slider'>
          <Slider click_event={handle_slider_click} left_option={'Wits Contacts'} right_option={'External Contacts'} ></Slider>
        </div>
        { loading_contacts ? <section className='emergency-info-menu-spinner-container'><Spinner size={80} /></section> : render_contacts()}
      </section>
    </Menu>
  )
}
