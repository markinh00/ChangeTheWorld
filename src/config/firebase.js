import * as firebase from 'firebase';
import 'firebase/storage';
import uuid from 'react-native-uuid';

const firebaseConfig = {
    apiKey: "AIzaSyDkpVMngAWcK_-oGCcHFczXCbaISU_sOys",
    authDomain: "change-the-world-745f6.firebaseapp.com",
    projectId: "change-the-world-745f6",
    storageBucket: "change-the-world-745f6.appspot.com",
    messagingSenderId: "567343427040",
    appId: "1:567343427040:web:ed12276d3ae6199dc1cf85",
    measurementId: "G-MM2X7DQYRS"
  };

  firebase.initializeApp(firebaseConfig);

export const database = firebase.firestore();

const convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
        return {
            ...obj,
            [item[key]]: item,
        };
    }, initialValue);
};

export function getUsuario(uid){
    return new Promise((resolve, reject) =>{
        try {
            database.collection('usuarios')
            .doc(uid)
            .onSnapshot(docSnapshot => {
            resolve(docSnapshot.data());
            });
        } catch (error) {
            reject(error);
        }
    });
}

export function getDemandas(user){
    return new Promise((resolve, reject) =>{
        let demandas = [];
        try {
            database.collection('demandas')
            .where("idCriadorDemanda", "==", user.uid)
            .orderBy("dataCriacao")
            .get()
            .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                demandas.push({...doc.data()});
            });
            
            const demandasObj = convertArrayToObject(demandas.reverse(), 'id');
            resolve(demandasObj);
            });      
        } catch (error) {
            reject(error);
        }
    });
}

export function createDemanda(demanda, uid){
    return new Promise((resolve, reject) =>{
        const idDemanda = uuid.v4();
        const newDemanda = {
            titulo: demanda.titulo,
            descricao: demanda.descricao,
            statusDemanda: 'open',
            idCriadorDemanda: uid,
            idRespostas: [],
            id: idDemanda,
            dataCriacao: new Date(),
        }

        database.collection('demandas')
        .doc(idDemanda)
        .set(newDemanda).then(() => {
            updateDemandasUsuario(idDemanda, uid).then((message) =>{
            console.log(message);
            resolve(message);
            }).catch((err) => {
            reject(err);
            });
        }).catch((err) =>{
            reject(err);
        });
    });
};

function updateDemandasUsuario(idDemanda, uid){
    return new Promise((resolve, reject) =>{
        firebase.firestore().collection('usuarios')
        .doc(uid).update({
            idLista: firebase.firestore.FieldValue.arrayUnion(idDemanda),
        }).then(() => {
            resolve("demanda criada com sucesso!!");
        }).catch((error) => {
            reject("Error updating document: ", error);
        });
    });
};

export function getRespostas(demanda){
    return new Promise((resolve, reject) => {
    let respostas =[];
    try {
        database.collection('respostas')
        .where("idDemanda", "==", demanda.id)
        .orderBy("dataCriacao")
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                respostas.push({...doc.data()});
            });
            
            const respostasObj = convertArrayToObject(respostas.reverse(), 'id');
            resolve(respostasObj);
        }); 
    } catch (error) {
        reject(error);
    }
    });
};

export function getTodasDemandas(){
    return new Promise((resolve, reject) => {
        let demandas =[];
        try {
            database.collection('demandas')
            .orderBy("dataCriacao")
            .get()
            .then( querySnapshot => {
                querySnapshot.forEach( doc => {
                    demandas.push(doc.data());
                });

                const demandasObj = convertArrayToObject(demandas.reverse(), 'id');
                resolve(demandasObj);
            });
        } catch (error) {
            reject(error);
        }
    });
}