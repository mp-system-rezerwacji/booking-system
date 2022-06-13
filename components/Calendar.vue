<template>
  <v-container>
    <v-row class="text-center">
      <v-col col="12">
        <v-sheet height="400">
          <v-calendar
            ref="calendar"
            :now="today"
            :value="today"
            :events="events"
            color="primary"
            type="week"
          ></v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",
  data: () => ({
    today: "2020-01-08",
    events: [
      {
        name: "eat",
        start: "2020-01-07 09:00",
        end: "2020-01-07 10:00",
      },
      {
        name: "drink",
        start: "2020-01-10",
      },
      {
        name: "sleep",
        start: "2020-01-09 12:30",
        end: "2020-01-09 15:30",
      },
    ],
    mounted() {
      this.$refs.calendar.scrollToTime("08:00");
    },
  }),
};
</script>