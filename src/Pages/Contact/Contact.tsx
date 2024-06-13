import Container from "../../Components/Container/Container"
import { FaWhatsapp,FaInstagram, FaFacebook  } from "react-icons/fa"
import { Fade } from "react-awesome-reveal"


export default function Contact() {
    return (
     <div className="pt-40 ">
        <Fade>
         <Container>
            
            <div className="w-full bg-doak-white flex flex-col lg:flex-row justify-center items-center gap-10">
            <Fade direction="left">
            <div className="w-full max-w-96 h-96">
                    <h1 className="font-custom font-black text-2xl pb-2">Redes Sociais</h1>
                    <p className="font-medium">Não perca as últimas novidades e promoções exclusivas! Siga a D'OAK nas redes sociais e fique por dentro de tudo! #DOAK #Novidades #Promoções"
                        Se precisar de alguma personalização ou outro estilo, sinta-se à vontade para me avisar!</p>
                    <h1 className="font-custom font-black text-xl mt-5">Siga-nos</h1>
                    <div className="flex gap-6 mt-5 w-full">
                        <a className="bg-doak-black text-doak-white rounded-full h-12 w-12 flex justify-center items-center hover:bg-doak-grey transition-all" href=""><FaWhatsapp size={30}/></a>
                        <a className="bg-doak-black text-doak-white rounded-full h-12 w-12 flex justify-center items-center hover:bg-doak-grey transition-all"href=""><FaInstagram size={30}/></a>
                        <a className="bg-doak-black text-doak-white rounded-full h-12 w-12 flex justify-center items-center hover:bg-doak-grey transition-all" href=""><FaFacebook size={30}/></a>
                    </div>  
                    <p className="text-doak-black/60 mt-5">© Copyright 2024</p>  
                </div>
                </Fade>

                <Fade direction="right" >
                <form  className="bg-doak-black w-96 max-w-96 h-96 rounded p-4 flex flex-col">
                    <div className="">
                        <h1 className="text-doak-whiteff font-custom font-normal mb-1 roude">Nome:</h1>
                        <input 
                            className="w-full pl-2 h-10 rounded"
                            placeholder="João..."
                            type="text" 
                        />
                    </div>
                    <div className="">
                        <h1 className="text-doak-whiteff font-custom font-normal mb-1 mt-2 ">Email:</h1>
                        <input 
                            className="w-full pl-2 h-10 rounded"
                            placeholder="joaoribeiro@gmail.com..."
                            type="email" 
                        />
                    </div>
                    <div className="">
                        <h1 className="text-doak-whiteff font-custom font-normal mb-1 mt-2 ">Assunto:</h1>
                        <textarea
                            className="rounded w-full h-28 p-2"
                             name="" 
                             id=""
                        ></textarea>
                    </div>
                    <button className="text-doak-whiteff w-full flex justify-center items-center bg-doak-grey h-12 mt-3 rounded font-custom font-bold hover:bg-doak-white hover:text-doak-black transition-all">Enviar</button>
                </form>
                </Fade>

                
            </div>
      </Container>
      </Fade>
     </div>
    )
}