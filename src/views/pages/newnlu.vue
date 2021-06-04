import Vue from "vue";
import vSelect from "vue-select";

Vue.component("v-select", vSelect);

<template>
  <div class="vx-row">
    
    <!-- MULTIPLE COLUMNS-->
    <div class="vx-col w-full mb-base">
      <vx-card title="chat module">
        <div class="vx-row">
            <div class="vx-col sm:w-1/3 w-full mb-2">
            <div class="no_message">
          <h1 style='color: #ccc' id="messageh1">Messages</h1>
           <div class="message_holder"  id="mes"></div>
         
         
         
          
        </div>
</div>

                   </div>

        
        
      </vx-card>

    </div>
     <div class="vx-col w-full mb-base">
      <vx-card title="chat message" >
       
        <h6 >User Name</h6>
<vs-input class="w-full" label="" v-model="username" />
	<h6>Message</h6>
<vs-input class="w-full" label="" v-model="message" />
 	<div class="vx-col sm:w-1/3 w-full">
<vs-button class="mr-3 mt-4" @click="sendMessage" >send</vs-button>

</div>

       
        
     </vx-card>
    
    </div>
  
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
            user_name : this.username,
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
        if( typeof msg.user_name !== 'undefined' && msg.message.length >= 1 ) {  
        document.getElementById("messageh1").style.display="none";
        var div = document.getElementById('mes');

         div.innerHTML +="<b>"+msg.user_name +":</b> "+msg.message ;

        

         //document.getElementById("mes").appendChild("745896")
        //$( '.message_holder' ).append ("sakshis")
       
           
      }
      })
        
          
   
     
            
         
            
      

      

</script>
<style>
 div.msg_bbl {
        background-color: #ddd;
        padding: 5px 10px;
        border-radius: 10px;
        color: #555;
        margin-bottom: 5px;
      }
</style>