
import history from "./history";

async function GET(url) {
    let token = localStorage.getItem('token');
    try {
        const  response =   await fetch(url, {
            method: 'GET',
            cache: 'no-cache',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
            referrer: 'no-referrer'
        });
        if (response.status == 401){
            history.push("/login")
        } else{
            return response;
        }
    }catch (e) {
        history.push("/login")
    }

}

async function POST(url, data, sendToken) {
    let headers = {
        'Content-Type': 'application/json'
    }
    if(sendToken == true){
        let token = localStorage.getItem('token');
        headers['Authorization'] = token;
    }
   const response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        headers: headers,
        referrer: 'no-referrer',
        body: JSON.stringify(data)
    });
   if (response.status == 401){
       history.push("/login")
   }
   else {
       return response;
   }
}

async function DELETE (url) {
    let token = localStorage.getItem('token');

    const response = await fetch(url, {
        method: 'DELETE',
        cache: 'no-cache',
        headers: {'Content-Type': 'application/json',
            'Authorization': token},
        referrer: 'no-referrer'
    });
    if (response.status == 401){
        history.push("/login")
    }else{
        return response;
    }
}
async function UPDATE(url) {
    let token = localStorage.getItem('token');

    const response = await fetch(url, {
        method: 'PATCH',
        cache: 'no-cache',
        headers: {'Content-Type': 'application/json',
            'Authorization': token},
        referrer: 'no-referrer'
    });
    if (response.status == 401){
        history.push("/login")
    }else{
        return response;
    }
}

export default {
    GET,
    POST,
    DELETE,
    UPDATE
};