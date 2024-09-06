import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';


const Registrar = () => {
    const [ nombre, setNombre] = useState('');
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');
    const [ repetirPassword, setRepetirPassword] = useState('');
    const [ alerta, setAlerta ] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        if([ nombre, email, password, repetirPassword].includes('')) {
            setAlerta({msg: 'Todos los campos son obligatorios', error: true})
            return
        }
        if(password !== repetirPassword) {
            setAlerta({msg: 'Los Password tienen que ser iguales', error: true})
            return
        }
        if(password < 6) {
            setAlerta({msg: 'Password muy corto, agrega 6 caracteres minimo', error: true})
            return
        }
        setAlerta({});

        // Crear el usuario en la api
        try {
            await clienteAxios.post("/veterinarios", { nombre, email, password })
            setAlerta({
                msg: "Creado Correctamente, revisa tu email",
                error: false
            })
            setTimeout(() => {
              setAlerta({})
              setNombre('')
              setEmail('')
              setPassword('')
              setRepetirPassword('')
            }, 2000);
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 2000);
        }
        
    }
    const {msg} = alerta;

    return (
      <>
          <div>
              <h1 className="text-indigo-600 font-black text-6xl">Crea tu Cuenta y Administra tus <span className="text-black">Pacientes</span></h1>
          </div>
          <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-lg bg-white'>
                {msg && <Alerta alerta={alerta} />}
                <form onSubmit={handleSubmit}>

                  <div className="my-5">
                      <label className="uppercase text-gray-600 block text-xl font-bold">
                            Nombre
                      </label>
                      <input type="text" placeholder="Tu Nombre" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={nombre} onChange={e => setNombre(e.target.value)}/>
                  </div>

                  <div className="my-5">
                      <label className="uppercase text-gray-600 block text-xl font-bold">
                            Email
                      </label>
                      <input type="email" placeholder="Email de Registro" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={email} onChange={e => setEmail(e.target.value)}/>
                  </div>

                  <div className="my-5">
                      <label className="uppercase text-gray-600 block text-xl font-bold">
                            Tu Password
                      </label>
                      <input type="password" placeholder="Tu Password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={password} onChange={e => setPassword(e.target.value)}/>
                  </div>

                  <div className="my-5">
                      <label className="uppercase text-gray-600 block text-xl font-bold">
                            Repetir Password
                      </label>
                      <input type="password" placeholder="Repite tu Password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)}/>
                  </div>


                  <input type="submit" value="Registrar" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-2 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
                </form>

                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link className='block text-center my-5 text-gray-500' to="/">Ya tienes una cuenta? Inicia sesion</Link>
                    <Link className='block text-center my-5 text-gray-500' to="/olvide-password">Olvide mi Password</Link>
                </nav>
          </div>
      </>
    )
  }
  
  export default Registrar