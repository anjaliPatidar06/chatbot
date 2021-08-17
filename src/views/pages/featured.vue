<template>
  <div id="demo-basic-card">
    <div class="vx-row">
      <div class="vx-col w-full sm:w-1/2 lg:w-1/3 mb-base">
        <vx-card>
          <div slot="no-body">
            <img src="" alt="content-img" class="responsive card-img-top" />
          </div>
          <h5 class="mb-2">Restaurant Bot</h5>
          <p class="text-grey">Automate taking orders & making reservations.</p>
          <p class="text-grey">Support customers 24/7.</p>
          <div class="flex justify-between flex-wrap">
            <vs-button
              class="mt-4 mr-2 shadow-lg"
              type="gradient"
              gradient-color-secondary="#CE9FFC"
              >Import Bot</vs-button
            >
          </div>
        </vx-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // card 1
      card_1: {},
    };
  },
};
</script>
