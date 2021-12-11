import { Alert } from "react-native";

export function compararSenhas(senha, confirmarSenha){
    if(senha == confirmarSenha){
        return true;
    }else{
        mostrarErro("os campos 'senha' e 'comfirmar senha' devem ser iguais!!!");
        return false;
    }
}

export function verificarNulos(user){
    let semNulo = false;
    
    for (const campo in user) {
        if (Object.hasOwnProperty.call(user, campo)) {
            const element = user[campo];
            
            if(element == '' && typeof(element) == String){
                semNulo = false;
                mostrarErro("campo = '': O campo '" + campo + "' = " + element + ", portanto, deve ser preenchido!!!");
                break;
            }else if(element == null && typeof(element) == String){
                semNulo = false;
                mostrarErro("campo = null: O campo '" + campo + "' = " + element + ", portanto, deve ser preenchido!!!");
                break;
            }else{
                semNulo = true;
            }
        }
    }
    return semNulo;
}

export function mostrarErro(mensagem){
    console.log("ERRO: " + mensagem);
    Alert.alert("ERRO: ", mensagem, [
        {text: 'ok', onPress: ()=>{console.log('alert closed!!')} }
    ]);
}