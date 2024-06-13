import Container from "../../Components/Container/Container"
import { useState, useEffect } from "react"
import { collection, query, getDocs, orderBy, where } from "firebase/firestore"
import { db } from "../../Services/firebaseConnection"
import { Link } from "react-router-dom"
import { Fade } from "react-awesome-reveal"


interface ProductsProps {
  id: string;
  name: string;
  uid: string;
  description: string;
  price: string | number;
  category: string;
  images: ProductImageProps[];
}

interface ProductImageProps {
  name: string;
  uid: string;
  url: string;
}


export default function Home() {
    const [products, setProducts] = useState<ProductsProps[]>([])
    const [loadImages, setLoadImages] = useState<string[]>([])
    const [input, setInput] = useState<any>("")
    useEffect(() => {
      loadProducts()
    }, [])

    function loadProducts() {
      const productsRef = collection(db, "products")
      const queryRef = query(productsRef, orderBy("created", "desc"))


      getDocs(queryRef)
      .then((snapshot) => {
        let listProducts = [] as ProductsProps[];


        snapshot.forEach(doc => {
          listProducts.push({
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            price: doc.data().price,
            images: doc.data().images,
            uid: doc.data().uid,
            category: doc.data().category
          })
        })

        setProducts(listProducts);

      })
    }


    function handleImageLoad(id: string) {
      setLoadImages( (prevImageLoaded) => [...prevImageLoaded, id])
    }

    async function handleSearchProducts() {
        if(input === "") {
          loadProducts();
          return;
        }

        setProducts([]);
        setLoadImages([]);

        const q = query(collection(db, "products"), 
        where("name", ">=", input.toUpperCase()),
        where("name", "<=", input.toUpperCase() + "\uf8ff")
      )

      const querySnapshot = await getDocs(q)
        let listProducts = [] as ProductsProps[];

        querySnapshot.forEach((doc) => {
          listProducts.push({
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            price: doc.data().price,
            images: doc.data().images,
            uid: doc.data().uid,
            category: doc.data().category
          })
        })

        setProducts(listProducts)
    }


    return (
   
        <Container>
        
            <div className="pt-20"></div>

            <Fade triggerOnce={true} direction="right" cascade damping={2.0}>
              <section className=" bg-doak-whiteff p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-2">
                  <input 
                      className="w-full font-custom text-xs border-2 rounded-lg h-9 px-3 outline-none"
                    placeholder="Digite o nome do carro..."
                    value={input}
                    onChange={ (e) => setInput(e.target.value)}
                  />
                  <button
                      className="bg-doak-black h-9 px-8 rounded-lg text-doak-whiteff font-custom text-sm font-medium"
                      onClick={handleSearchProducts}
                  >
                      Buscar
                  </button>
                </section> 
            </Fade>

              <h1 className="font-custom font-light text-center text-xl mb-4 mt-6">
                <strong className="font-bold">D'oak</strong>, seu estilo se faz aqui!
              </h1>


              <main className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      
              {products.map( product => (
                <Fade direction="left" triggerOnce={true} cascade damping={2.0} >
               <Link key={product.id} to={`/productdetail/${product.id}`}>
                     <section  className=" w-full bg-doak-whiteff rounded-lg  min-h-80 md:min-h-96 lg:min-h-96">
                    <Fade>
                    <div 
                          className="w-full h-72 rounded-lg bg-doak-whiteff"
                          style={{display:loadImages.includes(product.id) ? "none" : "block"}}
                          ></div>
                          <img 
                              className=" rounded-lg mb-2  hover:scale-105 transition-all object-cover"
                              src={product.images[0].url} 
                              alt={product.name}
                              onLoad={ () => handleImageLoad(product.id)}
                              style={{display: loadImages.includes(product.id) ? "block" : "none"}}
                          />
                    </Fade>
                        <div className="w-full flex flex-col gap-0 ">
                          <h2 className="mt-1 px-4 font-custom font-bold ">{product.name}</h2>
                            <p className="mt-1 px-4 font-custom text-sm font-medium text-doak-grey/50">{product.category}</p>
                            <div className="bg-gray-100 flex items-center justify-center ">
                                    <div className="bg-white px-4 pt-1 pb-2 w-96 h-20 shad rounded-lg overflow-y-auto ">
                                        <p className=" font-custom text-xs font-light overflow-y-auto" >{product.description}</p>
                                    </div>
                            </div>
                            <p className="mt-2 pb-2 px-4 pt-2 font-custom text-1xl font-extrabold flex">R$ {product.price}</p>
                          </div>
                 </section>
               </Link>
               </Fade>
              ))}
              
              </main>



        </Container>
    )
}

