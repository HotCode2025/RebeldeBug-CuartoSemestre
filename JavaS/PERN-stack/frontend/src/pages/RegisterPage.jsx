import {button, card, input, label} from '../components/ui';
import {useForm} from "react-hook-form";
import {axios} from "axios";
import {link} from "react-router-dom";


function RegisterPage() {

  const {register, handleSubmit, formState:{errors}} = useForm();

  const onSubmit = handleSubmit(async(data) => {
    const res = await axios.post("http://localhost:3000/api/signup", data, {
      withCrendentials: true,
    })
      console.log(res);
  });

  return (


    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <card>
        
        <h3 className="text-4xl font-bold my-2">Registro</h3>
        <form onSubmit={onSubmit}>
          
          <label htmlFor='name'>Nombre</label>
          <input placeholder="Ingrese su nombre"
          {...register("name",{required:true})}> </input>

          {
            errors.name && <p className='text-red-500'>Este campo es requerido</p>
          }

          <label htmlFor='email'>Email</label>
          <input type="email" placeholder="Ingrese su mail"
          {...register("email",{required:true})}></input>
          {
            errors.email && <p className='text-red-500'>Este campo es requerido</p>
          }

          <label htmlFor='password'>Contraseña</label>
          <input type="password" placeholder="Ingrese su contraseña"
          {...register("paswoord",{required:true})}></input>
          {
            errors.password && <p className='text-red-500'>Este campo es requerido</p>
          }
          
          <button>Registrarse</button>

        </form>

        <div className='flex justify-between my-4'>
          <p>¿Ya tienes cuenta?</p>
          <link to='/login'>Iniciar sesion</link>
        </div>

      </card>
    </div>
  )
}

export default RegisterPage