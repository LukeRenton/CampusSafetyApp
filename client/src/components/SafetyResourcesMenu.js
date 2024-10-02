/**
 * File: SafetyResourcesMenu.js
 * 
 * Author: Mitchell
 * 
 * Description:
 *  Menu to display all safety resources
 */


import React, { useEffect, useState } from 'react'
import '../styles/SafetyResourcesMenu.css'
// import safety_resources from '../common/SafetyResources'
import Menu from './Menu'
import SafetyResource from './SafetyResource'
import search_icon from '../icons/search.svg'
import { fetch_safety_resources } from '../services/SafetyResourceService'
import Spinner from './Spinner'

export default function SafetyResourcesMenu( { set_error, close_menu } ) {

    const [search, set_search] = useState("");

    const [safety_resources, set_safety_resources] = useState([]);
    const [loading, set_loading] = useState(true);

    /*
        Function: render_safety_resources

        Description:
            Renders the safety resources based on what is being searched by user
        
        Parameters: N/A

        Returns:
            Mapped list of SafetyResource objects in list items (li)
    */
    const render_safety_resources = () => {
        if (safety_resources.length > 0) {
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
        } else {
            return <></>
        }

    }

    /*
        Function: get_safety_resources

        Description:
            Driver function to fetch safety resources

        Parameters: N/A

        Returns: N/A
    */
    const get_safety_resources = async () => {
        const res = await fetch_safety_resources()
        .then((safety_resources) => {
            if (!safety_resources) {
                // Handle case of null return
                set_error({
                    message: "Error fetching safety resources"
                })
                return []
            } else if (safety_resources.error) {
                // Handle case of error present
                set_error({
                    message: "Error fetching safety resources"
                });
                return []
            } else {
                // Success case
                return safety_resources;
            }
        })
        .catch(err => {
            // Handle case of error return from fetch
            set_error({
                message: "Error fetching safety resources"
            });
            return []
        });
        
        set_safety_resources(res);
        set_loading(false);
    } 

    useEffect(() => {
        set_loading(true);
        get_safety_resources();
    },[])

  return (
    <Menu menu_header={"Safety Resources"} close={close_menu}>
      <section className='safety-resources-menu-container'>
        <section className='safety-resources-menu-subcountainer'>
            <section className='safety-resources-menu-search-container'>
                <img className='safety-resources-menu-search-icon' alt="search icon" src={search_icon}></img>
                <input className='safety-resources-menu-search' placeholder='Search for a safety resource' value={search} onChange={(e) => set_search(e.target.value)}></input>
            </section>
        </section>
        {loading ? <Spinner size={40} report_type={'medical'}></Spinner> : <></>}
        <ul className='safety-resources-menu-items'>
            {render_safety_resources()}
        </ul>
      </section>
    </Menu>
  )
}
