import url from "../../components/Url";
const baseUrl = `${url}/api/pedidos`;
import axios from "axios";
const pedidos = {};

pedidos.save = async (data) => {
    console.log("DATA : ", data)
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

pedidos.listpedidos = async () => {
    const urlList = baseUrl+"/listar_pedidos"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

pedidos.listpedidosasignar = async () => {
    const urlList = baseUrl+"/listar_pedidosasignar"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

pedidos.listpedidosasignados = async () => {
    const urlList = baseUrl+"/listar_pedidosasignados"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

pedidos.listpedidosporasignar = async () => {
    const urlList = baseUrl+"/listar_pedidosporasignar"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

pedidos.listpedidosterminar = async () => {
    const urlList = baseUrl+"/listar_pedidosterminar"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

pedidos.leerpedido = async (id_ped) => {
    const urlList = baseUrl+"/get/"+id_ped
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

pedidos.leerpedidosmensajeros = async (mensajero) => {
    console.log("DATA SERVICES : ",mensajero)
    const urlList = baseUrl+"/leerpedidosmensajeros/"+mensajero
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

pedidos.leerestadoctamensajero = async (mensajero) => {
    console.log("DATA SERVICES : ",mensajero)
    const urlList = baseUrl+"/leerestadoctamensajero/"+mensajero
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

pedidos.update = async (data) => {
    const urlUpdate = baseUrl+"/update/"+data.id_ped
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

pedidos.delete = async (id_ped) => {
    const urlDelete = baseUrl+"/delete/"+id_ped
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default pedidos;