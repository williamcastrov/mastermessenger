import url from "../../components/Url";
const baseUrl = `${url}/api/direccionrecogida`;
import axios from "axios";
const direccionrecogida = {};

direccionrecogida.save = async (data) => {
    console.log("DATA : ",data)
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

direccionrecogida.listdireccionrecogida = async () => {
    const urlList = baseUrl+"/listar_direccionrecogida"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
    return res;
}

direccionrecogida.listunadireccionrecogida = async (id_drc) => {
    const urlList = baseUrl+"/get/"+id_drc
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
    return res;
}

direccionrecogida.direccionrecogidaclientes = async (cliente_drc) => {
    console.log("DATA : ",cliente_drc)
    const urlList = baseUrl+"/direccionrecogidaclientes/"+cliente_drc
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
    return res;
}

direccionrecogida.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_drc
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
    return res;
}

direccionrecogida.delete = async (id_drc) => {
    const urlDelete = baseUrl+"/delete/"+id_drc
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default direccionrecogida;