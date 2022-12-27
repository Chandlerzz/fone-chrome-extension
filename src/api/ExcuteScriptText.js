import { post } from "../utils/request.js";
export default data => post(`api/Script/ExcuteScriptText`,data);