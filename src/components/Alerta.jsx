
function Alerta({alerta}) {
  return (
    <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600'} bg-gradient-to-r rounded-xl uppercase text-sm mb-10 font-bold text-white text-center p-3`}>
        {alerta.msg}
    </div>
  )
}

export default Alerta