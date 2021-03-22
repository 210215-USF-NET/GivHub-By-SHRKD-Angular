function GetCharityAjax()
{
    console.log("ahhh");
    //Creating the object that sends the request and receives the response from the pokeapi
    let xhr = new XMLHttpRequest();
    // XMLHttpRequest.prototype.open = (function(open) {
    //     return function(method,url,async) {
    //         url = ;
    //         console.log('the outgoing url is ',url);
    //         open.apply(this,arguments);
    //       };
    //   })(XMLHttpRequest.prototype.open);
    let charity2search = document.querySelector('#charity2Search').value;
    xhr.open('GET', "http://data.orghunter.com/v1/charitysearch?user_key=153f832c549a150e74121c7c7c40667e&searchTerm=${charity2Search}", true);
    xhr.onload = function () {
    console.log(xhr.responseURL);
    };
    //send the request
    xhr.send();
    //the onreadystate just describes the state of your request 
    // 0 - uninitialized
    // 1 - loading (server connection established) the open method has been invoked
    // 2 - loaded (request received by server) send has been called
    // 3 - interactive (processing request) response body is being received
    // 4 - complete (response received) 
    xhr.onreadystatechange = function () {
        // checks if response has been received and if the operation was successful by checking if the status
        // codes are within the 2xxs
        console.log(this.readyState);
        console.log(this.status);
        if (this.readyState == 4 && this.status > 199 && this.status < 300)
        {
            //deserializing the json response body of the httpresponse
            charity = JSON.parse(xhr.responseText);
            //using combinator selectors I'm getting the img element that belongs to a tag with class pokemonResult
            //document.querySelector('.pokemonResult img').setAttribute('src', pokemon.sprites.front_default);
            //clean out previous captions, gets all child captions of the tag that belongs to the class pokemonResult
            // foreach child, remove them 
            document.querySelector('.charityResult name').forEach(name => name.remove());
            document.querySelector('.charityResult foundation').forEach(article => article.remove());
            // creates a caption element
            // <caption> </caption>
            let caption = document.createElement('name');
            // create a text node to add as value of caption element
            // floating pokemonName
            let pokemonName = document.createTextNode(charity[0].name);
            //Because the caption would contain the text node
             // <caption> pokemonName </caption>
            caption.appendChild(pokemonName);
            //this is where you append the caption element you just created to the DOM of the page
            document.querySelector('.charityResult').appendChild(caption);
            let foundation = document.createElement('foundation');
            foundation.appendChild(document.createTextNode(charity[1].foundation));
            document.querySelector('.charityResult'.appendChild(foundation));

            document.querySelector('#charity2Search').value = '';
        }
    }
}
