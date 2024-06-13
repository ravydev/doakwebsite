import logoImg from '../../assets/logo-white.png'
import {FiUser, FiLogIn } from 'react-icons/fi'
import { IoMenuOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';


import ModalMenu from './ModalMenu';

import { useContext } from "react";
import { ModalContext } from "../../Contexts/ModalContext";
import { AuthContext } from '../../Contexts/AuthContext';

import { Fade } from "react-awesome-reveal"

export default function Header() {
    const {modalClick, setModalClick} = useContext(ModalContext)
    const {signed, loadingAuth} = useContext(AuthContext)
 

    return (
        <div className=' w-full flex items-center justify-center fixed h-14 bg-doak-black drop-shadow z-40 shadow-md'>
           
            <header className=' flex w-full max-w-7xl items-center justify-between px-4 mx-auto'>
               <Fade >
                <Link to="/">
                        <img className='h-7' src={logoImg} alt="" />
                    </Link>
               </Fade>

               <Fade  direction="right" cascade damping={1.0}>
                  <nav className='flex gap-5 mobile:hidden lg:flex pl-52 '>
                            <Link to="/" className='text-doak-white font-custom font-bold'>Início</Link>
                            <Link to="/about" className='text-doak-white font-custom font-bold'>Sobre</Link>
                            <Link to="/contact" className='text-doak-white font-custom font-bold'>Contatos</Link>
                    </nav>
                    </Fade>
                
                <Fade>
                    {!loadingAuth && signed && (
                        <Link to="/dashboard">
                            <div className='border-2 rounded-full p-1 border-doak-white'>
                                <FiUser size={22} color='#CCD0CF'/>
                            </div>
                        </Link>
                    )}
                </Fade>

                

                {!loadingAuth && !signed && (
                  <Link to="/login">
                     <div className='border-2 rounded-full p-1 border-doak-white'>
                        <FiLogIn size={22} color='#CCD0CF'/>
                     </div>
                  </Link>
                )}
           
            </header>

            
            <nav className='lg:hidden'>
                <IoMenuOutline onClick={() => setModalClick(!modalClick)} className='mr-4 ml-3 cursor-pointer' size={30} color='#CCD0CF'/>
            </nav>
    
            <ModalMenu/>

              
        </div>
    )
}