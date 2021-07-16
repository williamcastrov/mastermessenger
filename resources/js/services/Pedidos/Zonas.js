import url from "../../components/Url";
const baseUrl = `${url}/api/zonas`;
import axios from "axios";
const zonas = {};

zonas.save = async (data) => {
    console.log("DATA : ", data)
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

zonas.listzonas = async () => {
    const urlList = baseUrl+"/listar_zonas"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

zonas.leertipotarifa = async (id_zon) => {
    const urlList = baseUrl+"/get/"+id_zon
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

zonas.update = async (data) => {
    const urlUpdate = baseUrl+"/update/"+data.id_zon
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

zonas.delete = async (id_zon) => {
    const urlDelete = baseUrl+"/delete/"+id_zon
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default zonas;