import {button, card, input} from './component/ui';
import {useForm} from "react-hook-form";


function RegisterPage() {
  const {register, handleSubmit, formState:{errors}} = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (


    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <card>
        
        <h3 className="text-2x1 font-bold">Registro</h3>
        <form onSubmit={onSubmit}>
          
          <input placeholder="Ingrese su nombre"
          {...register("name",{required:true})}> </input>

          {
            errors.name && <p className='text-red-500'>Este campo es requerido</p>
          }
          <input type="email" placeholder="Ingrese su mail"
          {...register("email",{required:true})}></input>
          {
            errors.email && <p className='text-red-500'>Este campo es requerido</p>
          }
          <input type="password" placeholder="Ingrese su contraseña"
          {...register("paswoord",{required:true})}></input>
          {
            errors.password && <p className='text-red-500'>Este campo es requerido</p>
          }
          
          <button>Registrarse</button>

        </form>
      </card>
    </div>
  )
}

export default RegisterPage