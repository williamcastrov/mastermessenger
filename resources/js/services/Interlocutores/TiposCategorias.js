import url from "../../components/Url";
const baseUrl = `${url}/api/tiposcategorias`;   
import axios from "axios";
const tiposcategorias = {};

tiposcategorias.save = async (data) => {
    const urlSave = baseUrl + "/create"
    const res = await axios.post(urlSave, data)
        .then(response => { return response.data })
        .catch(error => { return error; })
    return res;
}

tiposcategorias.listtiposcategorias = async () => {
    const urlList = baseUrl+"/listar_tiposcategorias"
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

tiposcategorias.listunacategoria = async (id_tcg) => {
    const urlList = baseUrl+"/get/"+id_tcg
    const res = await axios.get(urlList)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

tiposcategorias.update = async (data) => {
    const urlUpdate = baseUrl+"/update/"+data.id_tcg
    const res = await axios.put(urlUpdate, data)
    .then(response=>{ return response.data; })
    .catch(error=>{ return error; })
   
    return res;
}

tiposcategorias.delete = async (id_tcg) => {
    const urlDelete = baseUrl+"/delete/"+id_tcg
    const res = await axios.delete(urlDelete)
    .then(response=> { return response.data })
    .catch(error =>{ return error })

    return res;
}
  
export default tiposcategorias;