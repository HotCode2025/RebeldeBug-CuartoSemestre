import {button, card, input} from './component/ui'

function RegisterPage() {
  return (

    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <card>
      <form>
        <h3 className="text-2x1 font-bold">Registro</h3>
        <input placeholder="Ingrese su nombre"> </input>
        <input type="email" placeholder="Ingrese su mail"></input>
        <input type="password" placeholder="Ingrese su contraseña"></input>

      <button>Registrarse</button>

      </form>
      </card>
      
    </div>
  )
}

export default RegisterPage