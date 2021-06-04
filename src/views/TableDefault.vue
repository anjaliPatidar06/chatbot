
<template>
	<div id="grid-demo">
		<h2>All Subscription</h2>
		<ag-grid-table>
		</ag-grid-table>
		
	</div>
	
</template>


<script>
import AgGridTable from './ag-grid-table/TableAllSubscription.vue'
import axios from 'axios'
import {Base_URL, API_List} from './../../api.config'

export default{
  components: {
    AgGridTable,
  },
  methods:{
    allsubscription(){

    // axios.get('http://127.0.0.1:5000/allsubscription', {
    axios.get(Base_URL.Actual_URL+'allsubscription', {

  })
  
	.then((response) => {
       
    console.log(response)

    if(localStorage.getItem('email')=='superadmin@gmail.com'){
      window.location.href = '/AllSubscription'
    }
    else{
      window.location.href = '/AddSubscription'
    }
    })

	}
  }
}
</script>