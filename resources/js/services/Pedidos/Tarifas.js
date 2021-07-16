import url from "../../components/Url";
const baseUrl = `${url}/api/tarifas`;
import axios from "axios";
const tarifas = {};

tarifas.save = async (data) => {
    console.log("DATA : ", data)
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

tarifas.listtarifas = async () => {
    const urlList = baseUrl+"/listar_tarifas"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

tarifas.leetarifa = async (codigotarifa_tar) => {
    const urlList = baseUrl+"/leetarifa/"+codigotarifa_tar
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

tarifas.leertipotarifa = async (id_tar) => {
    const urlList = baseUrl+"/leer_tipotarifa/"+id_tar
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

tarifas.update = async (data) => {
    const urlUpdate = baseUrl+"/update/"+data.id_tar
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

tarifas.delete = async (id_tar) => {
    const urlDelete = baseUrl+"/delete/"+id_tar
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default tarifas;