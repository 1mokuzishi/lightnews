import axios from "axios";
export const setHttpHeaders=(header,value)=>{
    axios.defaults.headers.common[header]=value;
};
const util={
    setItem(key,value){
        if(typeof value=='object') value=JSON.stringify(value);
        localStorage.setItem(key,value);
    },
    getItem(key){
        let temp=localStorage.getItem(key);
        let res=null;
        try {
            if (res = JSON.parse(temp)) return res;
        }
        catch(e){
            return temp;
        }
    },
    removeItem(key){
        localStorage.removeItem(key);
    },
    clear(){
        setHttpHeaders("access-token","");
        localStorage.clear();
    }
}
export default util;