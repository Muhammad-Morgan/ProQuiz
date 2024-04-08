import { useEffect, useRef, useState } from 'react'
import { faAngleDown, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
const Side = () => {
    const linksContainer1 = useRef(null)
    const link1 = useRef(null)
    const linksContainer2 = useRef(null)
    const link2 = useRef(null)
    const sidebar = useRef(null)
    const [showLinks1, setShowLinks1] = useState(false)
    const [showLinks2, setShowLinks2] = useState(false)
    const [closeSidebar, setCloseSidebar] = useState(false)
    useEffect(() => {
        if (showLinks1) {
            const linksHeight1 = link1.current.getBoundingClientRect().height;
            linksContainer1.current.style.height = `${linksHeight1}px`
        }
        else {
            linksContainer1.current.style.height = `0px`
        }
    }, [showLinks1]);
    useEffect(() => {
        if (showLinks2) {
            const linksHeight2 = link2.current.getBoundingClientRect().height;
            linksContainer2.current.style.height = `${linksHeight2}px`
        }
        else {
            linksContainer2.current.style.height = `0px`
        }
    }, [showLinks2]);
    useEffect(() => {
        if (closeSidebar) {
            sidebar.current.style.width = `302px`
            sidebar.current.style.opacity = `1`
        } else {
            sidebar.current.style.opacity = `0`
            sidebar.current.style.width = `0px`
        }
    }, [closeSidebar]);
    return (
        <aside className='my-sidebar'
            ref={sidebar}
        >
            <header className='d-flex justify-content-between align-items-center px-2'>
                <h2 className='m-0'>Sidebar</h2>

                <button
                    onClick={() => setCloseSidebar(false)}
                    type="button" class="btn btn-default">
                    <FontAwesomeIcon className='my-xmark fa-lg' icon={faXmark} />
                </button>
            </header>

            <div className='sidebar-center'>
                <section>
                    <ul class="list-group">
                        <a class="list-group-item">Item 1</a>
                        <a class="list-group-item">Item 2</a>
                        <a class="list-group-item">Item 3</a>
                        <li
                            onClick={()=> setShowLinks1(!showLinks1)}
                            className='list-group-dropdown d-flex justify-content-between'><p className='m-0'>dropdown</p>
                            <span>
                                <FontAwesomeIcon icon={faAngleDown} />
                            </span>
                        </li>
                        <div className='links-container' ref={linksContainer1}>
                            <ul
                                className="my-list-group"
                                ref={link1}
                            >
                                <li
                                    class="my-list-group-item">Item 1</li>
                                <li
                                    class="my-list-group-item">Item 2</li>
                                <li
                                    class="my-list-group-item">Item 3</li>
                            </ul>
                        </div>
                        <li
                            onClick={()=> setShowLinks2(!showLinks2)}
                            className='list-group-dropdown d-flex justify-content-between'><p className='m-0'>dropdown</p>
                            <span>
                                <FontAwesomeIcon icon={faAngleDown} />
                            </span>
                        </li>
                        <div className='links-container' ref={linksContainer2}>
                            <ul
                                className="my-list-group"
                                ref={link2}
                            >
                                <li
                                    class="my-list-group-item">Item 1</li>
                                <li
                                    class="my-list-group-item">Item 2</li>
                                <li
                                    class="my-list-group-item">Item 3</li>
                            </ul>
                        </div>
                    </ul>
                </section>
            </div>
        </aside>
    )
}

export default Side