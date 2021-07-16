import url from "../../components/Url";
const baseUrl = `${url}/api/mensajeros`;   
import axios from "axios";
const mensajeros = {};

mensajeros.save = async (data) => {
    console.log(data)
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

mensajeros.listmensajeros = async () => {
    const urlList = baseUrl+"/listar_mensajeros"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

mensajeros.listmensajerosOT = async () => {
    const urlList = baseUrl+"/listar_mensajerosOT"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

mensajeros.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_men
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

mensajeros.delete = async (id_men) => {
    const urlDelete = baseUrl+"/delete/"+id_men
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default mensajeros;