import url from "../../components/Url";
const baseUrl = `${url}/api/descuentosvolumen`;   
import axios from "axios";
const descuentosvolumen = {};

descuentosvolumen.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

descuentosvolumen.listdescuentosvolumen = async () => {
    const urlList = baseUrl+"/listar_descuentosvolumen"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

descuentosvolumen.listundescuento = async (id_dvo) => {
    const urlList = baseUrl+"/get/"+id_dvo
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

descuentosvolumen.update = async (data) => {
    const urlUpdate = baseUrl+"/update/"+data.id_dvo
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

descuentosvolumen.delete = async (id_dvo) => {
    const urlDelete = baseUrl+"/delete/"+id_dvo
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default descuentosvolumen;