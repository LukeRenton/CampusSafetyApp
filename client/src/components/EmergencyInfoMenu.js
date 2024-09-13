import React from 'react'
import Menu from './Menu'
import '../styles/EmergencyInfoMenu.css'

export default function EmergencyInfoMenu( props ) {
  return (
    <Menu menu_header={"Emergency Information"} close={props.close_menu}>
      <section className='emergency-info-menu-content'>
        <section className='emergency-info-menu-container'>
            <h2 className='emergency-info-menu-subheading'>Remember to stay calm so we can best understand you. You’ve got this</h2>
          <section className='emergency-info-menu-content'>
            
          </section>
        </section>
      </section>
    </Menu>
  )
}
