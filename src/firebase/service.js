import { child, get, onValue, ref } from "firebase/database";
import database from "./init_firebase";




const getThongBao = async (username) => {
    const dbRef = ref(database, `/thongbao/${username}`);
    let rs = null;
    await onValue(dbRef, (snapshot) => {
        let data = snapshot.val();

        rs = data
    });

    return rs;

}

export {
    getThongBao
}