import url from "../../components/Url";
const baseUrl = `${url}/api/tiquetera`;   
import axios from "axios";
const tiquetera = {};

tiquetera.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

tiquetera.listtiquetera = async () => {
    const urlList = baseUrl+"/listar_tiquetera"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

tiquetera.listunatiquetera = async (id_tik) => {
    const urlList = baseUrl+"/get/"+id_tik
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

tiquetera.leertiqueteracliente = async (cliente) => {
    const urlList = baseUrl+"/leertiqueteracliente/"+cliente
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

tiquetera.update = async (data) => {
    const urlUpdate = baseUrl+"/update/"+data.id_tik
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

tiquetera.delete = async (id_tik) => {
    const urlDelete = baseUrl+"/delete/"+id_tik
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default tiquetera;