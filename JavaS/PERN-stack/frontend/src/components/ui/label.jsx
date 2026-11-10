export function label ({ children, htmlFor}) {
    return(
        <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor={htmlFor}>
            {children}
        </label>
    )
}

function label() {
  return (
    <div>label</div>
  )
}
S
export default label