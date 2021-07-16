import url from "../../components/Url";
const baseUrl = `${url}/api/tipostiquetera`;   
import axios from "axios";
const tipostiquetera = {};

tipostiquetera.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

tipostiquetera.listtipostiquetera = async () => {
    const urlList = baseUrl+"/listar_tipostiquetera"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

tipostiquetera.listunatiquetera = async (id_ttk) => {
    const urlList = baseUrl+"/get/"+id_ttk
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

tipostiquetera.update = async (data) => {
    const urlUpdate = baseUrl+"/update/"+data.id_ttk
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

tipostiquetera.delete = async (id_ttk) => {
    const urlDelete = baseUrl+"/delete/"+id_ttk
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default tipostiquetera;