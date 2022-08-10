

function upload1(){
    //get your image
    var image=document.getElementById('image').files[0];
    //get your image highlight
    var post=document.getElementById('post').value;
    //setting my Website name   
    var Website=document.getElementById('website').value;
    //get image name
    var imageName=image.name;
    //get button status
    var heading=document.getElementById('heading').value;
    //firebase storage reference
    var storageRef=firebase.storage().ref(`images/Sponsers/${imageName}`);
    //upload image to selected storage reference
    //make sure you pass image here
    var uploadTask=storageRef.put(image);
    //to get the state of image uploading....
    uploadTask.on('state_changed',function(snapshot){
         //get task progress by following code
         var progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
         console.log("upload is "+progress+" done");
    },function(error){
      //handle error here
      console.log(error.message);
    },function(){
        //handle successfull upload here..
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
           //get your image download url here and upload it to databse
           //our path where data is stored ...push is used so that every post have unique id
           firebase.database().ref('sponsers/').push().set({
                 text:post,
                 Website:Website,
                 heading:heading,
                 imageURL:downloadURL
           },function(error){
               if(error){
                   alert("Error while uploading");
               }else{
                   alert("Successfully uploaded");
                   //now reset your form
                   document.getElementById('post-form').reset();
                   getdata();
               }
           });
        });
    });

}

window.onload=function(){
    this.getdata();
}


function getdata(){
    firebase.database().ref('sponsers/').once('value').then(function(snapshot){
      //get your posts div
      var posts_div=document.getElementById('posts');
      
      //remove all remaining data in that div
      posts.innerHTML="";
      //get data from firebase
      var data=snapshot.val();
      console.log(data);
      //now pass this data to our posts div
      //we have to pass our data to for loop to get one by one
      //we are passing the key of that post to delete it from database
      for(let[key,value] of Object.entries(data)){
        posts_div.innerHTML=
        "<a class='image featured'>"+
        "<img src='"+value.imageURL+"' >"+
        "<div ><h3 >"+value.heading+"</h3>"+
        "<div ><p >"+value.text+"</p>"+
         "<button  onclick=window.open('"+value.Website+"') style='margin-bottom:30px'>Learn more</button>"+
          //  "<button class='hidden2' id='"+key+"' onclick='delete_post(this.id)' style='margin-bottom:30px'>Delete</button>"+
       
        "</div></div></a>"+posts_div.innerHTML;
      }
    
    });
    
}

function delete_post(key){
  firebase.database().ref('sponsers/'+key).remove();
  getdata();

}










