/**
 * File: FirstAidMenu.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Menu for the first aid information
 */
import React, { useState } from 'react'
import Menu from './Menu'
import '../styles/FirstAidMenu.css'
import FirstAidOption from './FirstAidOption'
import medical from '../icons/medical.svg'
import cpr from '../icons/cpr.svg'
import unconcious from '../icons/unconcious.svg'
import FirstAidGuide from './FirstAidGuide'
import general_health_assistance from '../common/FirstAid'


export default function FirstAidMenu( props ) {

    const [current_first_aid_guide, set_current_first_aid_guide] = useState("general_health_assistance");

    /* 
      Function: close
  
      Description:
          Closes the current guide
  
      Arguments: N/A
  
      Returns: N/A
    */
    const close = () => {
        set_current_first_aid_guide("none");
    }

    /* 
      Function: render_first_aid_guide
  
      Description:
          Renders the guide that is currently open
  
      Arguments: N/A
  
      Returns:
        FirstAidGuide object
    */
    const render_first_aid_guide = () => {
        switch (current_first_aid_guide) {
            case "none":
                return <></>
            
            case "general_health_assistance":
                return <FirstAidGuide guide_name={'General health assistance'} icon={medical} icon_size={35} close={close} steps={general_health_assistance.steps}></FirstAidGuide>
        
            default:
                break;
        }
    }

  return (
    <Menu menu_header={"First Aid"} close={props.close_menu}>
      <section className='first-aid-menu-container'>
        <h2 className='first-aid-menu-subheading'>Stay calm and focus. You can help save a life.</h2>
        <section className='first-aid-menu-content'>
            <FirstAidOption click={() => set_current_first_aid_guide('general_health_assistance')} header={'General health assistance'} icon={medical} icon_size={25}></FirstAidOption>
            <FirstAidOption click={() => set_current_first_aid_guide('cpr')} header={'CPR'} icon={cpr} icon_size={35}></FirstAidOption>
            <FirstAidOption click={() => set_current_first_aid_guide('unconcious')} header={'Unconcious Patient'} icon={unconcious} icon_size={35}></FirstAidOption>
        </section>
        {render_first_aid_guide()}
      </section>
    </Menu>
  )
}
