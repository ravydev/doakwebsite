import Container from "../../Components/Container/Container"
import logoImg from '../../assets/icon-black.png'

export default function About() {
    return (
        <div className="pt-20 w-full flex gap-4">
            <Container>
                <div>
                    <h1 className="font-custom font-bold text-4xl text-center mt-10">Sobre nós</h1>
                </div>

                <div className="flex mt-16 pl-32 ">
                    <img 
                        className="h-72"
                        src={logoImg} 
                        alt="" 
                    />
                </div>

                <div className="flex mt-10">
                    
                </div>
            </Container>
        </div>
    )
}