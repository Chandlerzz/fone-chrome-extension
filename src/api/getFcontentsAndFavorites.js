import { post } from "../utils/request.js";
export default data => post(`api/FContent/getFContentsAndFavorites`,data);