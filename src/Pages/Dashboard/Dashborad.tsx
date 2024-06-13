import { useState, useEffect, useContext } from "react";
import Container from "../../Components/Container/Container";
import PainelHeader from "../../Components/PainelHeader/PainelHeader";
import { FiTrash2 } from "react-icons/fi";
import { collection, getDocs, where, query, doc, deleteDoc} from "firebase/firestore";
import { db,storage } from "../../Services/firebaseConnection";
import { AuthContext } from "../../Contexts/AuthContext";
import { ref, deleteObject } from "firebase/storage";



interface ProductProps{
    id:string;
    name:string;
    price:string | number;
    images:ImageProductProps | any;
    uid: string;
    description: string;
    category: string;
}

interface ImageProductProps{
    name: string;
    uid: string;
    url: string;
}


export default function Dashboard() {
    const [products, setProducts] = useState<ProductProps[]>([])
    const {user} = useContext(AuthContext)


    useEffect(() => {
        function loadProducts() {
            if(!user?.uid) {
                return;
            }

          const productsRef = collection(db, "products")
          const queryRef = query(productsRef, where("uid", "==", user.uid))
  
  
          getDocs(queryRef)
          .then((snapshot) => {
            let listProducts = [] as ProductProps[];
  
  
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
  
        loadProducts()
      }, [user])



      async function handleDeleteProduct(product:ProductProps){
            const itemProduct = product;

           const docRef = doc(db, "products", itemProduct.id)
           await deleteDoc(docRef)

           itemProduct.images.map( async (image:ImageProductProps) => {
                const imagePath = `images/${image.uid}/${image.name}`
                const imageRef = ref(storage, imagePath)

               try {
                 await deleteObject(imageRef)
                 setProducts(products.filter(product => product.id !== product.id ))
               }catch(error){
                console.log(error)
               }
           })
           
      }


    return (
        <Container>
            <div className="pt-20">
                 <PainelHeader/>

                <main className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                  {products.map( product => (
                      <section key={product.id} className="w-full bg-doak-whiteff rounded-lg relative">
                      <button 
                          onClick={ () => handleDeleteProduct(product)}
                          className="absolute bg-doak-white w-10 h-10 rounded-full flex items-center justify-center right-2 top-2 drop-shadow hover:bg-doak-grey hover:text-doak-whiteff transition-all">
                          <FiTrash2 size={20}/>
                      </button>
                      <img
                          className="w-full rounded-lg mb-2 max-h-70  object-cover max-h-96" 
                          src={product.images[0].url}
                       />
                    
                    <div className="w-full flex flex-col gap-1 ">
                      <h2 className="mt-1 px-4 font-custom font-bold ">{product.name}</h2>
                        <p className="mt-1 px-4 font-custom  text-sm font-medium text-doak-grey/50">{product.category}</p>
                        <div className="bg-gray-100 flex items-center justify-center ">
                                <div className="bg-white p-4 w-96 h-20 shad rounded-lg overflow-y-auto ">
                                    <p className=" font-custom text-xs font-light overflow-y-auto" >{product.description}</p>
                                </div>
                        </div>
                        <p className="mt-1 pb-4 px-4 font-custom text-1xl font-extrabold flex">R$ {product.price}</p>
                      </div>
                  </section>
                  ))}
                </main>
                
            </div>
        </Container>
    )
}