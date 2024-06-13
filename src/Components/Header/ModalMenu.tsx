import { Link } from "react-router-dom"
import iconWhite from '../../assets/icon-white.png'
import { IoClose } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { RiFacebookCircleLine } from "react-icons/ri";

import { useContext } from "react";
import { ModalContext } from "../../Contexts/ModalContext";

export default function ModalMenu() {
    const {modalClick, setModalClick} = useContext(ModalContext)
    
    if(modalClick) {
        return (
            <div className=" flex w-full items-center absolute flex-col bg-doak-black top-0 z-50 h-screen">
                <img className=" justify-center h-24 mt-24 mb-12" src={iconWhite} alt="" />
                <div className="flex flex-col items-center justify-center gap-4 ">
                    <Link onClick={() => setModalClick(!modalClick)} to="/" className="bg-doak-white  text-doak-black rounded h-12 w-72 flex justify-center items-center  hover:bg-doak-grey hover:text-doak-white transition-all duration-500">
                        <div 
                            className="font-custom font-bold text-2xl">
                                Início
                        </div>
                    </Link>
                    
                    <Link onClick={() => setModalClick(!modalClick)} to="/about" className="bg-doak-white rounded h-12 w-72 flex justify-center items-center   hover:bg-doak-grey hover:text-doak-white transition-all  duration-500">
                        <div 
                            className="font-custom font-bold  text-2xl">
                                Sobre
                        </div>
                    </Link>
                    <Link onClick={() => setModalClick(!modalClick)} to="/contact" className="bg-doak-white rounded h-12 w-72 flex justify-center items-center  hover:bg-doak-grey hover:text-doak-white transition-all  duration-500">
                        <div 
                            className="font-custom font-bold  text-2xl">
                                Contatos
                        </div>
                    </Link>
                    
                    <IoClose onClick={() => setModalClick(!modalClick)} className="absolute top-0 right-0 m-4 cursor-pointer" size={30} color="white"/>
                    
                    <div className="flex gap-4 mt-10">
                        <li className=" flex justify-center items-center bg-doak-white h-12 w-12 rounded-full hover:bg-doak-grey transition-all  duration-500"><a href=""><FaWhatsapp className=" hover:fill-doak-white transition-all duration-500" size={35} color="black"/></a></li>
                        <li className=" flex justify-center items-center bg-doak-white h-12 w-12 rounded-full hover:bg-doak-grey transition-all  duration-500"><a href=""><FaInstagram className=" hover:fill-doak-white transition-all duration-500" size={35} color="black"/></a></li>
                        <li className=" flex justify-center items-center  bg-doak-white h-12 w-12 rounded-full hover:bg-doak-grey transition-all  duration-500"><a href=""><RiFacebookCircleLine className=" hover:fill-doak-white transition-all duration-500" size={35} color="black"/></a></li>
                    </div>
                </div>
            </div>
        )
    }
   
}