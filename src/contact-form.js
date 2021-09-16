{
    const butGo = document.querySelector('.button--go');

    butGo.addEventListener('click', userSubscribe);

    function userSubscribe() {
        const inputVal = document.querySelector('.input').value;

        fetch('https://httpbin.org/post', {
            method: 'POST',
            body: inputVal
        }).then(response => {
            if (response.status === 200) return response.json();
            else throw new Error('Can`t post your data');
        }).then(result => {
            alert("Successfully! Your email: " + result.data);
        }).catch(error => alert(error));
    }
}