import React from 'react'
import { card, input, button } from '../components/ui';
import {label} from '../components/ui/label';
import { useForm } from 'react-hook-form';

function LoginPage() {
  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit ((data) => {
    console.log(data);
  })
  return (
    <div className='h-[calc(100vh-64px)] flex items-center justify-center'>
      <card>
        <h1 className='text-4x1 font-bold my-2 text-center'>Iniciar sesión</h1>

        <form onSubmit={onSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder='Ingrese su email'{...register("email",{
            required:true,
          })}></input>


          <label htmlFor="password"></label>
          <input type="password" placeholder='Ingrese su contraseña'{...register("password", {
            required:true,
          })}></input>
          <button>Ingresar</button>
        </form>

        <div className='flex justify-between my-4'>
          <p>¿No tienes cuenta?</p>
          <link to='/register'>Registrate</link>
        </div>
      </card>
    </div>
  )
}

export default LoginPage