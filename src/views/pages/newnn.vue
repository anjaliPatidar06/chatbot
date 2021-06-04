<template>
  <div class="vx-row">
    

     <div class="vx-col md:w-1/3 w-full mb-base">
      <vx-card title="Chats" >
        <div class="vx-row mb-6">
          
        </div>
        <div class="vx-row mb-6">
         
         
        </div>
        <div class="vx-row mb-6">
          
        </div>
        <div class="vx-row mb-6">
          
          <div class="vx-col sm:w-2/3 w-full">
            
          </div>
        </div>
        
         
       
      </vx-card>
     </div>
     <div class="vx-col md:w-2/3 w-full mb-base">
      <vx-card title="Chat Module" >
        <div class="vx-row mb-6 border border-solid d-theme-border-grey-light rounded relative overflow-hidden">
             <div class="vx-row">
            <div class="vx-col sm:w-1/3 w-full mb-2">
            <div class="no_message">
          <h1 style='color: #ccc' id="messageh1">Messages</h1>
           <div class="message_holder"  id="mes"></div>
        </div>
</div>

                   </div>
                   <vs-input class="w-full" label="" v-model="message" />
 	<div class="vx-col sm:w-1/3 w-full">
<vs-button class="mr-3 mt-4" @click="sendMessage" >send</vs-button>

</div>
        </div>    
       
        
         
       
      </vx-card>
     </div>

    <!-- MULTIPLE COLUMNS-->
   
     
  
  </div>
  
 
</template>
<script src="/socket.io/socket.io.js"></script>

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<script>
import io from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
export default {
    methods: {
        sendMessage:function() {
            
              socket.emit( 'my event', {
            //user_name : this.username,
           message:this.message,
          
          } )
        
        } 
      },
  data () {
    return {
      messages: [],
        message: '',
        username: '',

msg:[],
    }
  },
}

      var socket = io( 'localhost:7000')
      // broadcast a message
      socket.on( 'connect', function() {
        socket.emit( 'my event', {
          data: 'User 4555555 vue connnect'
        } );

        socket.emit('join_room', {
            username: "Pankaj",
            room: "Room_1"
        });
      });
      socket.on( 'my response', function( msg ) {
          console.log(msg)
        if( msg.message.length >= 1 ) {  
        document.getElementById("messageh1").style.display="none";
        var div = document.getElementById('mes');

         div.innerHTML +="<b>"+msg.user_name +":</b> "+msg.message ;

        

         //document.getElementById("mes").appendChild("745896")
        //$( '.message_holder' ).append ("sakshis")
       
           
      }
      })
        
          
   
     
            
         
            
      

      

</script>
<style lang="scss">
@import "@/assets/scss/vuexy/apps/chat.scss";

 div.msg_bbl {
        background-color: #ddd;
        padding: 5px 10px;
        border-radius: 10px;
        color: #555;
        margin-bottom: 5px;
      }
</style>
