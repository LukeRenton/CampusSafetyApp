import React, { useState } from 'react'
import '../styles/SafetyResourcesMenu.css'
import safety_resources from '../common/SafetyResources'
import Menu from './Menu'
import SafetyResource from './SafetyResource'
import search_icon from '../icons/search.svg'

export default function SafetyResourcesMenu( { close_menu } ) {

    const [search, set_search] = useState("");

    const render_safety_resources = () => {

        const resources = search === "" ? safety_resources : safety_resources.filter((resource) => {
            return resource.title.toLowerCase().includes(search.toLowerCase());
        })

        return resources.map((resource) => {
            return (
                <li className='safety-resources-menu-item'>
                    <SafetyResource resource={resource}></SafetyResource>
                </li>
            )
        })
    }

  return (
    <Menu menu_header={"Safety Resources"} close={close_menu}>
      <section className='safety-resources-menu-container'>
        <section className='safety-resources-menu-subcountainer'>
            <section className='safety-resources-menu-search-container'>
                <img className='safety-resources-menu-search-icon' src={search_icon}></img>
                <input className='safety-resources-menu-search' placeholder='Search for a safety resource' value={search} onChange={(e) => set_search(e.target.value)}></input>
            </section>
        </section>
        <ul className='safety-resources-menu-items'>
            {render_safety_resources()}
        </ul>
      </section>
    </Menu>
  )
}
