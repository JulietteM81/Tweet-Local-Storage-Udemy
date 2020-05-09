const tweetList = document.getElementById('tweet-list');
eventListeners();
function eventListeners(){
    document.querySelector('#form').addEventListener('submit', newTweet);
    tweetList.addEventListener('click', removeTweet);


    //document
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}

function newTweet(e){//we pass the event e first to prevent the default
   e.preventDefault();
    const tweet = document.getElementById('tweet').value;

    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent ='X';
    
    const li = document.createElement('li');
    li.textContent = tweet;
    li.appendChild(removeBtn);
    tweetList.appendChild(li);
    addTweetLocalStorage(tweet);


    //Create an alert
    alert('Tweet added');
    this.reset();//clean the form when click on save tweet
}
    function removeTweet(e){
        if(e.target.classList.contains('remove-tweet')){
            e.target.parentElement.remove();//remove-tweet is in an anchor which is in a li, the parentElemnt
        }
        
        //remove tweets from storage
        removeTweetLocalStorage(e.target.parentElement.textContent);
    }
    function addTweetLocalStorage(tweet){//you have to pass the content
        let tweets;
       tweets = Array.from(getTweetsFromStorage());
        tweets.push(tweet);
       localStorage.setItem('tweets', JSON.stringify(tweets));
    }

    function getTweetsFromStorage(){//can be used in other functions
        let tweets;
       const tweetsLS = localStorage.getItem('tweets');
        if(tweetsLS === null){
            tweets = [];
        }else{
            tweets = JSON.parse(tweetsLS);
        }
        return tweets;
    }

    //prints Local Storage Tweets on load
    function localStorageOnLoad(){//create the JSON.parse==> this is an array
        let tweets = getTweetsFromStorage();
        console.log(tweets);
        //loop through storage and print the value
        tweets.forEach(function(tweet){
            const removeBtn = document.createElement('a');
             removeBtn.classList = 'remove-tweet';
             removeBtn.textContent ='X';
    
             const li = document.createElement('li');
             li.textContent = tweet;
             li.appendChild(removeBtn);
             tweetList.appendChild(li);
        });
    }

        //remove the tweet from local storage
    function removeTweetLocalStorage(tweet){
        let tweets = getTweetsFromStorage();//use for the third times
        //remove the x from the tweet
        const tweetDelete = tweet.substring(0, tweet.length-1); //tweet.length -1 will remove the last character
        //loop through the tweets and remove the tweet with equals
        tweets.forEach(function(tweetLS, index){//tweets= access the array tweet == access individual value
            //pass the index to to the index of the tweet in the array to delete
          
            if(tweetDelete === tweetLS){
                // we are not sur which element the user gonna use ==> use splice
                deleteConfirm();
                tweets.splice(index, 1);   
            }
        });
        //save the data
        localStorage.setItem('tweets', JSON.stringify(tweets));
    }

    function deleteConfirm(){
        confirm("Are you sure?");
    }

