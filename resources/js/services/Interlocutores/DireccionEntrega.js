import url from "../../components/Url";
const baseUrl = `${url}/api/direccionentrega`;
import axios from "axios";
const direccionentrega = {};

direccionentrega.save = async (data) => {
    console.log(data)
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

direccionentrega.listdireccionentrega = async () => {
    const urlList = baseUrl+"/listar_direccionentrega"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
    return res;
}

direccionentrega.listunadireccionentrega = async (id_den) => {
    const urlList = baseUrl+"/get/"+id_den
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
    return res;
}

direccionentrega.direccionentregaclientes = async (cliente_den) => {
    console.log("DATA : ",cliente_den)
    const urlList = baseUrl+"/direccionentregaclientes/"+cliente_den
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
    return res;
}

direccionentrega.update = async (data) => {
    console.log(data);
    const urlUpdate = baseUrl+"/update/"+data.id_den
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
    return res;
}

direccionentrega.delete = async (id_den) => {
    const urlDelete = baseUrl+"/delete/"+id_den
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default direccionentrega;