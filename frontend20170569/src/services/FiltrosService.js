export async function filterUsuarios (records, setRecordsFiltered, filters) {
    let original = [...records]
    //console.log(records)
    filters.forEach(filter => {
      switch(filter.tipo.idTipo){
        case 1:
          if (filter.estado === undefined){           
            if(filter.operadorFecha.idOperador === '<=')
              original = original.filter(usuario => usuario.listUsuarioEnfermedad.some(usuarioenfermedad => usuarioenfermedad.enfermedad.idEnfermedad === filter.objeto.idEnfermedad && new Date(usuarioenfermedad.fechaDiagnostico) <= filter.fecha))
            else if(filter.operadorFecha.idOperador === '=')
              original = original.filter(usuario => usuario.listUsuarioEnfermedad.some(usuarioenfermedad => usuarioenfermedad.enfermedad.idEnfermedad === filter.objeto.idEnfermedad && usuarioenfermedad.fechaDiagnostico === filter.fecha.format('YYYY-MM-DD')))
            else if(filter.operadorFecha.idOperador === '>=')
              original = original.filter(usuario => usuario.listUsuarioEnfermedad.some(usuarioenfermedad => usuarioenfermedad.enfermedad.idEnfermedad === filter.objeto.idEnfermedad && new Date(usuarioenfermedad.fechaDiagnostico) >= filter.fecha))
          }
          else{
            if(filter.operadorFecha.idOperador === '<=')
              original = original.filter(usuario => usuario.listUsuarioEnfermedad.some(usuarioenfermedad => usuarioenfermedad.enfermedad.idEnfermedad === filter.objeto.idEnfermedad && usuarioenfermedad.estado === (filter.estado === 'true') && new Date(usuarioenfermedad.fechaDiagnostico) <= filter.fecha))
            else if(filter.operadorFecha.idOperador === '=')
              original = original.filter(usuario => usuario.listUsuarioEnfermedad.some(usuarioenfermedad => usuarioenfermedad.enfermedad.idEnfermedad === filter.objeto.idEnfermedad && usuarioenfermedad.estado === (filter.estado === 'true') && usuarioenfermedad.fechaDiagnostico === filter.fecha.format('YYYY-MM-DD')))
            else if(filter.operadorFecha.idOperador === '>=')
              original = original.filter(usuario => usuario.listUsuarioEnfermedad.some(usuarioenfermedad => usuarioenfermedad.enfermedad.idEnfermedad === filter.objeto.idEnfermedad && usuarioenfermedad.estado === (filter.estado === 'true') && new Date(usuarioenfermedad.fechaDiagnostico) >= filter.fecha))
          }            
          break;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
        case 2:
          if (filter.numero === ''){
            if(filter.operadorFecha.idOperador === '<=')
              original = original.filter(usuario => usuario.listUsuarioFarmaco.some(usuariofarmaco => usuariofarmaco.farmaco.idFarmaco === filter.objeto.idFarmaco && new Date(usuariofarmaco.fechaInicio) <= filter.fecha) )
            else if(filter.operadorFecha.idOperador === '=')
              original = original.filter(usuario => usuario.listUsuarioFarmaco.some(usuariofarmaco => usuariofarmaco.farmaco.idFarmaco === filter.objeto.idFarmaco && usuariofarmaco.fechaInicio === filter.fecha.format('YYYY-MM-DD')) )
            else if(filter.operadorFecha.idOperador === '>=')
              original = original.filter(usuario => usuario.listUsuarioFarmaco.some(usuariofarmaco => usuariofarmaco.farmaco.idFarmaco === filter.objeto.idFarmaco && new Date(usuariofarmaco.fechaInicio) >= filter.fecha) )
          }
          else{
            if(filter.operadorFecha.idOperador === '<='){
              if (filter.operadorNumero.idOperador === '<=')
                original = original.filter(usuario => usuario.listUsuarioFarmaco.some(usuariofarmaco => usuariofarmaco.farmaco.idFarmaco === filter.objeto.idFarmaco && new Date(usuariofarmaco.fechaInicio) <= filter.fecha && usuariofarmaco.dosis <= filter.numero))
              else if (filter.operadorNumero.idOperador === '=')
                original = original.filter(usuario => usuario.listUsuarioFarmaco.some(usuariofarmaco => usuariofarmaco.farmaco.idFarmaco === filter.objeto.idFarmaco && new Date(usuariofarmaco.fechaInicio) <= filter.fecha && usuariofarmaco.dosis === parseInt(filter.numero)))
              else if (filter.operadorNumero.idOperador === '>=')
                original = original.filter(usuario => usuario.listUsuarioFarmaco.some(usuariofarmaco => usuariofarmaco.farmaco.idFarmaco === filter.objeto.idFarmaco && new Date(usuariofarmaco.fechaInicio) <= filter.fecha && usuariofarmaco.dosis >= filter.numero))
            }
            else if(filter.operadorFecha.idOperador === '='){
              if (filter.operadorNumero.idOperador === '<=')
                original = original.filter(usuario => usuario.listUsuarioFarmaco.some(usuariofarmaco => usuariofarmaco.farmaco.idFarmaco === filter.objeto.idFarmaco && usuariofarmaco.fechaInicio === filter.fecha.format('YYYY-MM-DD') && usuariofarmaco.dosis <= filter.numero))
              else if (filter.operadorNumero.idOperador === '=')
                original = original.filter(usuario => usuario.listUsuarioFarmaco.some(usuariofarmaco => usuariofarmaco.farmaco.idFarmaco === filter.objeto.idFarmaco && usuariofarmaco.fechaInicio === filter.fecha.format('YYYY-MM-DD') && usuariofarmaco.dosis === parseInt(filter.numero)))
              else if (filter.operadorNumero.idOperador === '>=')
                original = original.filter(usuario => usuario.listUsuarioFarmaco.some(usuariofarmaco => usuariofarmaco.farmaco.idFarmaco === filter.objeto.idFarmaco && usuariofarmaco.fechaInicio === filter.fecha.format('YYYY-MM-DD') && usuariofarmaco.dosis >= filter.numero))
            }
            else if(filter.operadorFecha.idOperador === '>='){
              if (filter.operadorNumero.idOperador === '<=')
                original = original.filter(usuario => usuario.listUsuarioFarmaco.some(usuariofarmaco => usuariofarmaco.farmaco.idFarmaco === filter.objeto.idFarmaco && new Date(usuariofarmaco.fechaInicio) >= filter.fecha && usuariofarmaco.dosis <= filter.numero))
              else if (filter.operadorNumero.idOperador === '=')
                original = original.filter(usuario => usuario.listUsuarioFarmaco.some(usuariofarmaco => usuariofarmaco.farmaco.idFarmaco === filter.objeto.idFarmaco && new Date(usuariofarmaco.fechaInicio) >= filter.fecha && usuariofarmaco.dosis === parseInt(filter.numero)))
              else if (filter.operadorNumero.idOperador === '>=')
                original = original.filter(usuario => usuario.listUsuarioFarmaco.some(usuariofarmaco => usuariofarmaco.farmaco.idFarmaco === filter.objeto.idFarmaco && new Date(usuariofarmaco.fechaInicio) >= filter.fecha && usuariofarmaco.dosis >= filter.numero))
            }
          }
          break;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
        case 3:
          if (filter.frecuencia.idFrecuencia === 0)
            original = original.filter(usuario => usuario.listUsuarioDeporte.some(usuariodeporte => usuariodeporte.deporte.idDeporte === filter.objeto.idDeporte) )
          else 
            original = original.filter(usuario => usuario.listUsuarioDeporte.some(usuariodeporte => usuariodeporte.deporte.idDeporte === filter.objeto.idDeporte && usuariodeporte.frecuencia.idFrecuencia === filter.frecuencia.idFrecuencia) )
          break;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
        case 4:
          if (filter.numero === '')
            original = original.filter(usuario => usuario.listUsuarioAlimento.some(usuarioalimento => usuarioalimento.alimento.idAlimento === filter.objeto.idAlimento) )
          else {
            if(filter.operadorNumero.idOperador === '<=')
            original = original.filter(usuario => usuario.listUsuarioAlimento.some(usuarioalimento => usuarioalimento.alimento.idAlimento === filter.objeto.idAlimento && usuarioalimento.cantidad <= filter.numero) )
            else if(filter.operadorNumero.idOperador === '=')
              original = original.filter(usuario => usuario.listUsuarioAlimento.some(usuarioalimento => usuarioalimento.alimento.idAlimento === filter.objeto.idAlimento && usuarioalimento.cantidad === parseInt(filter.numero) ) )
            else if(filter.operadorNumero.idOperador === '>=')
              original = original.filter(usuario => usuario.listUsuarioAlimento.some(usuarioalimento => usuarioalimento.alimento.idAlimento === filter.objeto.idAlimento && usuarioalimento.cantidad >= filter.numero) )
          }
          break;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
        case 5:
          original = original.filter(usuario => usuario.nacionalidad.idPais === filter.objeto.idPais)
          break;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
        case 6:
          original = original.filter(usuario => usuario.sexo === filter.sexo)
          break;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
        case 7:
          if (filter.operadorNumero.idOperador === '<=')
            original = original.filter(usuario => calcularEdad(usuario.fechaNacimiento) <= filter.numero )
          else if (filter.operadorNumero.idOperador === '=')
            original = original.filter(usuario => determinarIgual(usuario.fechaNacimiento, filter.numero) )
          else if (filter.operadorNumero.idOperador === '>=')
            original = original.filter(usuario => calcularEdad(usuario.fechaNacimiento) >= filter.numero )
          break;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
        case 8: 
          if (filter.operadorNumero.idOperador === '<=')
            original = original.filter(usuario => usuario.listPeso[usuario.listPeso.length-1].cantidad <= filter.numero )
          else if (filter.operadorNumero.idOperador === '=')
            original = original.filter(usuario => usuario.listPeso[usuario.listPeso.length-1].cantidad === parseInt(filter.numero) )
          else if (filter.operadorNumero.idOperador === '>=')
            original = original.filter(usuario => usuario.listPeso[usuario.listPeso.length-1].cantidad >= filter.numero )
          break;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
        case 9: 
          if (filter.operadorNumero.idOperador === '<=')
            original = original.filter(usuario => usuario.listTalla[usuario.listTalla.length-1].cantidad <= filter.numero )
          else if (filter.operadorNumero.idOperador === '=')
            original = original.filter(usuario => parseInt(usuario.listTalla[usuario.listTalla.length-1].cantidad) === parseInt(filter.numero) )
          else if (filter.operadorNumero.idOperador === '>=')
            original = original.filter(usuario => usuario.listTalla[usuario.listTalla.length-1].cantidad >= filter.numero )
          break;
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
      }
    });
    setRecordsFiltered(original)

}

export async function filterUsuariosEstudios (records, setRecordsFiltered, filters) {
  let original = [...records]
  //console.log(records)
  filters.forEach(filter => {
    switch(filter.tipo.idTipo){
      case 1:
        if (filter.estado === undefined){           
          if(filter.operadorFecha.idOperador === '<=')
            original = original.filter(usuario => usuario.usuario.listUsuarioEnfermedad.some(usuarioenfermedad => usuarioenfermedad.enfermedad.idEnfermedad === filter.objeto.idEnfermedad && new Date(usuarioenfermedad.fechaDiagnostico) <= filter.fecha))
          else if(filter.operadorFecha.idOperador === '=')
            original = original.filter(usuario => usuario.usuario.listUsuarioEnfermedad.some(usuarioenfermedad => usuarioenfermedad.enfermedad.idEnfermedad === filter.objeto.idEnfermedad && usuarioenfermedad.fechaDiagnostico === filter.fecha.format('YYYY-MM-DD')))
          else if(filter.operadorFecha.idOperador === '>=')
            original = original.filter(usuario => usuario.usuario.listUsuarioEnfermedad.some(usuarioenfermedad => usuarioenfermedad.enfermedad.idEnfermedad === filter.objeto.idEnfermedad && new Date(usuarioenfermedad.fechaDiagnostico) >= filter.fecha))
        }
        else{
          if(filter.operadorFecha.idOperador === '<=')
            original = original.filter(usuario => usuario.usuario.listUsuarioEnfermedad.some(usuarioenfermedad => usuarioenfermedad.enfermedad.idEnfermedad === filter.objeto.idEnfermedad && usuarioenfermedad.estado === (filter.estado === 'true') && new Date(usuarioenfermedad.fechaDiagnostico) <= filter.fecha))
          else if(filter.operadorFecha.idOperador === '=')
            original = original.filter(usuario => usuario.usuario.listUsuarioEnfermedad.some(usuarioenfermedad => usuarioenfermedad.enfermedad.idEnfermedad === filter.objeto.idEnfermedad && usuarioenfermedad.estado === (filter.estado === 'true') && usuarioenfermedad.fechaDiagnostico === filter.fecha.format('YYYY-MM-DD')))
          else if(filter.operadorFecha.idOperador === '>=')
            original = original.filter(usuario => usuario.usuario.listUsuarioEnfermedad.some(usuarioenfermedad => usuarioenfermedad.enfermedad.idEnfermedad === filter.objeto.idEnfermedad && usuarioenfermedad.estado === (filter.estado === 'true') && new Date(usuarioenfermedad.fechaDiagnostico) >= filter.fecha))
        }            
        break;
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
      case 2:
        if (filter.numero === ''){
          if(filter.operadorFecha.idOperador === '<=')
            original = original.filter(usuario => usuario.usuario.listUsuarioFarmaco.some(usuariofarmaco => usuariofarmaco.farmaco.idFarmaco === filter.objeto.idFarmaco && new Date(usuariofarmaco.fechaInicio) <= filter.fecha) )
          else if(filter.operadorFecha.idOperador === '=')
            original = original.filter(usuario => usuario.usuario.listUsuarioFarmaco.some(usuariofarmaco => usuariofarmaco.farmaco.idFarmaco === filter.objeto.idFarmaco && usuariofarmaco.fechaInicio === filter.fecha.format('YYYY-MM-DD')) )
          else if(filter.operadorFecha.idOperador === '>=')
            original = original.filter(usuario => usuario.usuario.listUsuarioFarmaco.some(usuariofarmaco => usuariofarmaco.farmaco.idFarmaco === filter.objeto.idFarmaco && new Date(usuariofarmaco.fechaInicio) >= filter.fecha) )
        }
        else{
          if(filter.operadorFecha.idOperador === '<='){
            if (filter.operadorNumero.idOperador === '<=')
              original = original.filter(usuario => usuario.usuario.listUsuarioFarmaco.some(usuariofarmaco => usuariofarmaco.farmaco.idFarmaco === filter.objeto.idFarmaco && new Date(usuariofarmaco.fechaInicio) <= filter.fecha && usuariofarmaco.dosis <= filter.numero))
            else if (filter.operadorNumero.idOperador === '=')
              original = original.filter(usuario => usuario.usuario.listUsuarioFarmaco.some(usuariofarmaco => usuariofarmaco.farmaco.idFarmaco === filter.objeto.idFarmaco && new Date(usuariofarmaco.fechaInicio) <= filter.fecha && usuariofarmaco.dosis === parseInt(filter.numero)))
            else if (filter.operadorNumero.idOperador === '>=')
              original = original.filter(usuario => usuario.usuario.listUsuarioFarmaco.some(usuariofarmaco => usuariofarmaco.farmaco.idFarmaco === filter.objeto.idFarmaco && new Date(usuariofarmaco.fechaInicio) <= filter.fecha && usuariofarmaco.dosis >= filter.numero))
          }
          else if(filter.operadorFecha.idOperador === '='){
            if (filter.operadorNumero.idOperador === '<=')
              original = original.filter(usuario => usuario.usuario.listUsuarioFarmaco.some(usuariofarmaco => usuariofarmaco.farmaco.idFarmaco === filter.objeto.idFarmaco && usuariofarmaco.fechaInicio === filter.fecha.format('YYYY-MM-DD') && usuariofarmaco.dosis <= filter.numero))
            else if (filter.operadorNumero.idOperador === '=')
              original = original.filter(usuario => usuario.usuario.listUsuarioFarmaco.some(usuariofarmaco => usuariofarmaco.farmaco.idFarmaco === filter.objeto.idFarmaco && usuariofarmaco.fechaInicio === filter.fecha.format('YYYY-MM-DD') && usuariofarmaco.dosis === parseInt(filter.numero)))
            else if (filter.operadorNumero.idOperador === '>=')
              original = original.filter(usuario => usuario.usuario.listUsuarioFarmaco.some(usuariofarmaco => usuariofarmaco.farmaco.idFarmaco === filter.objeto.idFarmaco && usuariofarmaco.fechaInicio === filter.fecha.format('YYYY-MM-DD') && usuariofarmaco.dosis >= filter.numero))
          }
          else if(filter.operadorFecha.idOperador === '>='){
            if (filter.operadorNumero.idOperador === '<=')
              original = original.filter(usuario => usuario.usuario.listUsuarioFarmaco.some(usuariofarmaco => usuariofarmaco.farmaco.idFarmaco === filter.objeto.idFarmaco && new Date(usuariofarmaco.fechaInicio) >= filter.fecha && usuariofarmaco.dosis <= filter.numero))
            else if (filter.operadorNumero.idOperador === '=')
              original = original.filter(usuario => usuario.usuario.listUsuarioFarmaco.some(usuariofarmaco => usuariofarmaco.farmaco.idFarmaco === filter.objeto.idFarmaco && new Date(usuariofarmaco.fechaInicio) >= filter.fecha && usuariofarmaco.dosis === parseInt(filter.numero)))
            else if (filter.operadorNumero.idOperador === '>=')
              original = original.filter(usuario => usuario.usuario.listUsuarioFarmaco.some(usuariofarmaco => usuariofarmaco.farmaco.idFarmaco === filter.objeto.idFarmaco && new Date(usuariofarmaco.fechaInicio) >= filter.fecha && usuariofarmaco.dosis >= filter.numero))
          }
        }
        break;
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
      case 3:
        if (filter.frecuencia.idFrecuencia === 0)
          original = original.filter(usuario => usuario.usuario.listUsuarioDeporte.some(usuariodeporte => usuariodeporte.deporte.idDeporte === filter.objeto.idDeporte) )
        else 
          original = original.filter(usuario => usuario.usuario.listUsuarioDeporte.some(usuariodeporte => usuariodeporte.deporte.idDeporte === filter.objeto.idDeporte && usuariodeporte.frecuencia.idFrecuencia === filter.frecuencia.idFrecuencia) )
        break;
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
      case 4:
        if (filter.numero === '')
          original = original.filter(usuario => usuario.usuario.listUsuarioAlimento.some(usuarioalimento => usuarioalimento.alimento.idAlimento === filter.objeto.idAlimento) )
        else {
          if(filter.operadorNumero.idOperador === '<=')
          original = original.filter(usuario => usuario.usuario.listUsuarioAlimento.some(usuarioalimento => usuarioalimento.alimento.idAlimento === filter.objeto.idAlimento && usuarioalimento.cantidad <= filter.numero) )
          else if(filter.operadorNumero.idOperador === '=')
            original = original.filter(usuario => usuario.usuario.listUsuarioAlimento.some(usuarioalimento => usuarioalimento.alimento.idAlimento === filter.objeto.idAlimento && usuarioalimento.cantidad === parseInt(filter.numero) ) )
          else if(filter.operadorNumero.idOperador === '>=')
            original = original.filter(usuario => usuario.usuario.listUsuarioAlimento.some(usuarioalimento => usuarioalimento.alimento.idAlimento === filter.objeto.idAlimento && usuarioalimento.cantidad >= filter.numero) )
        }
        break;
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
      case 5:
        original = original.filter(usuario => usuario.usuario.nacionalidad.idPais === filter.objeto.idPais)
        break;
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
      case 6:
        original = original.filter(usuario => usuario.usuario.sexo === filter.sexo)
        break;
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
      case 7:
        if (filter.operadorNumero.idOperador === '<=')
          original = original.filter(usuario => calcularEdad(usuario.usuario.fechaNacimiento) <= filter.numero )
        else if (filter.operadorNumero.idOperador === '=')
          original = original.filter(usuario => determinarIgual(usuario.usuario.fechaNacimiento, filter.numero) )
        else if (filter.operadorNumero.idOperador === '>=')
          original = original.filter(usuario => calcularEdad(usuario.usuario.fechaNacimiento) >= filter.numero )
        break;
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
      case 8: 
        if (filter.operadorNumero.idOperador === '<=')
          original = original.filter(usuario => usuario.usuario.listPeso[usuario.usuario.listPeso.length-1].cantidad <= filter.numero )
        else if (filter.operadorNumero.idOperador === '=')
          original = original.filter(usuario => usuario.usuario.listPeso[usuario.usuario.listPeso.length-1].cantidad === parseInt(filter.numero) )
        else if (filter.operadorNumero.idOperador === '>=')
          original = original.filter(usuario => usuario.usuario.listPeso[usuario.usuario.listPeso.length-1].cantidad >= filter.numero )
        break;
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
      case 9: 
        if (filter.operadorNumero.idOperador === '<=')
          original = original.filter(usuario => usuario.usuario.listTalla[usuario.usuario.listTalla.length-1].cantidad <= filter.numero )
        else if (filter.operadorNumero.idOperador === '=')
          original = original.filter(usuario => parseInt(usuario.usuario.listTalla[usuario.usuario.listTalla.length-1].cantidad) === parseInt(filter.numero) )
        else if (filter.operadorNumero.idOperador === '>=')
          original = original.filter(usuario => usuario.usuario.listTalla[usuario.usuario.listTalla.length-1].cantidad >= filter.numero )
        break;
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
      case 10:
        original = original.filter(usuario => usuario.codigoMuestra && usuario.codigoMuestra.includes(filter.texto))
        break;
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
      case 11:
        if (filter.operadorFecha.idOperador === '<=')
          original = original.filter(usuario => usuario.fechaMuestreo && new Date(usuario.fechaMuestreo) <= filter.fecha )
        else if (filter.operadorFecha.idOperador === '=')
          original = original.filter(usuario => usuario.fechaMuestreo &&  usuario.fechaMuestreo ===  filter.fecha.format('YYYY-MM-DD') )
        else if (filter.operadorFecha.idOperador === '>=')
          original = original.filter(usuario => usuario.fechaMuestreo &&  new Date(usuario.fechaMuestreo) >= filter.fecha )
        break;
    }
  });
  setRecordsFiltered(original)

}


function determinarIgual(fecha, numero){
  let edad = calcularEdad(fecha);
  let boolean = parseInt(edad) === parseInt(numero)
  console.log(boolean)
  return boolean;
}


function calcularEdad(fecha) {
  var hoy = new Date();
  var cumpleanos = new Date(fecha);
  var edad = hoy.getFullYear() - cumpleanos.getFullYear();
  var m = hoy.getMonth() - cumpleanos.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
  }
  return edad;
}

