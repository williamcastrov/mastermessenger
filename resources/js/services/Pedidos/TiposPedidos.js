import url from "../../components/Url";
const baseUrl = `${url}/api/tipospedidos`;
import axios from "axios";
const tipospedidos = {};

tipospedidos.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

tipospedidos.listtipospedidos = async () => {
    const urlList = baseUrl+"/listar_tipospedidos"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

tipospedidos.leertipopedido = async (id_tpd) => {
    const urlList = baseUrl+"/leer_tipopedido/"+id_tpd
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

tipospedidos.update = async (data) => {
    const urlUpdate = baseUrl+"/update/"+data.id_tpd
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

tipospedidos.delete = async (id_tpd) => {
    const urlDelete = baseUrl+"/delete/"+id_tpd
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default tipospedidos;